import type { DownloadOptions, LGTMConfig } from '../types'

export const createDefaultConfig = (): LGTMConfig => ({
  backgroundType: 'image',
  backgroundColor: '#4CAF50',
  backgroundImage: null,
  width: 400,
  height: 200,
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

export const drawBackgroundSync = async (
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  config: LGTMConfig
): Promise<void> => {
  return new Promise((resolve) => {
    if (config.backgroundImage) {
      const img = new Image()
      img.onload = () => {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
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
  const text = 'LGTM'
  const fontSize = 48
  ctx.font = `bold ${fontSize}px Arial, sans-serif`
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'

  const x = canvas.width / 2
  const y = canvas.height / 2

  // Draw black outline
  ctx.strokeStyle = '#000000'
  ctx.lineWidth = 4
  ctx.strokeText(text, x, y)

  // Draw white text
  ctx.fillStyle = '#ffffff'
  ctx.fillText(text, x, y)
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
