import type { DownloadOptions, LGTMConfig } from '../types'

export const createDefaultConfig = (): LGTMConfig => ({
  backgroundColor: '#0000004c',
  backgroundImage: null,
  imageFit: 'cover',
  width: 400,
  height: 250,
})

export const getCanvasContext = (
  canvas: HTMLCanvasElement
): CanvasRenderingContext2D => {
  const context = canvas.getContext('2d')
  if (!context) {
    throw new Error('Canvas context is not supported')
  }
  return context
}

export const drawBackground = (
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  config: LGTMConfig
): void => {
  if (config.backgroundImage) {
    const img = new Image()
    img.onload = () => {
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
    }
    img.src = config.backgroundImage
  } else {
    // Fallback to default background color if no image
    ctx.fillStyle = config.backgroundColor
    ctx.fillRect(0, 0, canvas.width, canvas.height)
  }
}

const drawImageWithFit = (
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  canvas: HTMLCanvasElement,
  fitType: string
): void => {
  const canvasWidth = canvas.width
  const canvasHeight = canvas.height
  const imgWidth = img.naturalWidth || img.width
  const imgHeight = img.naturalHeight || img.height

  let drawWidth: number, drawHeight: number, drawX: number, drawY: number

  switch (fitType) {
    case 'cover': {
      const scale = Math.max(canvasWidth / imgWidth, canvasHeight / imgHeight)
      drawWidth = imgWidth * scale
      drawHeight = imgHeight * scale
      drawX = (canvasWidth - drawWidth) / 2
      drawY = (canvasHeight - drawHeight) / 2
      break
    }
    case 'contain': {
      const scale = Math.min(canvasWidth / imgWidth, canvasHeight / imgHeight)
      drawWidth = imgWidth * scale
      drawHeight = imgHeight * scale
      drawX = (canvasWidth - drawWidth) / 2
      drawY = (canvasHeight - drawHeight) / 2
      break
    }
    default: {
      drawWidth = canvasWidth
      drawHeight = canvasHeight
      drawX = 0
      drawY = 0
      break
    }
  }

  ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight)
}

export const drawBackgroundSync = async (
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  config: LGTMConfig
): Promise<void> => {
  return new Promise((resolve) => {
    if (config.backgroundImage) {
      const img = new Image()
      img.onload = () => {
        drawImageWithFit(ctx, img, canvas, config.imageFit)
        resolve()
      }
      img.onerror = () => {
        // Fallback to background color if image fails
        ctx.fillStyle = config.backgroundColor
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        resolve()
      }
      img.src = config.backgroundImage
    } else {
      // Fallback to background color if no image
      ctx.fillStyle = config.backgroundColor
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      resolve()
    }
  })
}

export const drawText = (
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement
): void => {
  const x = canvas.width / 2
  const y = canvas.height / 2

  // Main LGTM text
  const mainText = 'LGTM'
  const mainFontSize = 64
  ctx.font = `bold ${mainFontSize}px Arial, sans-serif`
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.letterSpacing = '0.2em'

  // Draw black outline for LGTM
  ctx.strokeStyle = '#000000'
  ctx.lineWidth = 2
  ctx.strokeText(mainText, x, y)

  // Draw white text for LGTM
  ctx.fillStyle = '#ffffff'
  ctx.fillText(mainText, x, y)

  // Subtitle text
  const subtitle = 'Looks Good To Me'
  const subtitleFontSize = 20
  ctx.font = `bold ${subtitleFontSize}px Arial, sans-serif`
  ctx.letterSpacing = '0.1em'

  const subtitleY = y + mainFontSize / 2 + 10

  // Draw black outline for subtitle
  ctx.strokeStyle = '#000000'
  ctx.lineWidth = 1
  ctx.strokeText(subtitle, x, subtitleY)

  // Draw white text for subtitle
  ctx.fillStyle = '#ffffff'
  ctx.fillText(subtitle, x, subtitleY)
}

export const generateImage = async (
  canvas: HTMLCanvasElement,
  config: LGTMConfig
): Promise<void> => {
  canvas.width = config.width
  canvas.height = config.height

  const ctx = getCanvasContext(canvas)

  await drawBackgroundSync(ctx, canvas, config)
  drawText(ctx, canvas)
}

export const clearCanvas = (canvas: HTMLCanvasElement): void => {
  const ctx = getCanvasContext(canvas)
  ctx.clearRect(0, 0, canvas.width, canvas.height)
}

export const getImageData = (canvas: HTMLCanvasElement): string => {
  return canvas.toDataURL('image/png')
}

export const downloadImage = (
  canvas: HTMLCanvasElement,
  options: DownloadOptions = {}
): void => {
  const { filename = 'lgtm-image', format = 'png', quality = 0.92 } = options

  const mimeType = format === 'jpeg' ? 'image/jpeg' : 'image/png'
  const dataURL = canvas.toDataURL(mimeType, quality)

  const link = document.createElement('a')
  link.download = `${filename}.${format}`
  link.href = dataURL

  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

export const copyImageToClipboard = async (
  canvas: HTMLCanvasElement
): Promise<void> => {
  try {
    const blob = await new Promise<Blob>((resolve) => {
      canvas.toBlob((blob) => {
        if (blob) {
          resolve(blob)
        }
      }, 'image/png')
    })

    await navigator.clipboard.write([
      new ClipboardItem({
        'image/png': blob,
      }),
    ])
  } catch (error) {
    console.error('Failed to copy image to clipboard:', error)
    throw error
  }
}
