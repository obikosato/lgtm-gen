export type BackgroundType = 'color' | 'image'

export type LGTMConfig = {
  backgroundType: BackgroundType
  backgroundColor: string
  backgroundImage: string | null
  width: number
  height: number
}

export type DownloadOptions = {
  filename?: string
  format?: 'png' | 'jpeg'
  quality?: number
}

export type EventHandler<T = Event> = (event: T) => void
