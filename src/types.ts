export type ImageFitType = 'cover' | 'contain' | 'fill'

export type LGTMConfig = {
  backgroundColor: string
  backgroundImage: string | null
  imageFit: ImageFitType
  width: number
  height: number
}

export type DownloadOptions = {
  filename?: string
  format?: 'png' | 'jpeg'
  quality?: number
}

export type EventHandler<T = Event> = (event: T) => void
