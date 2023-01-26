export {}

declare global {
  type DownloadRequest = {
    url: string
  }

  type DownloadResponse = {
    art: string
    title: string
    results: {
      audio: VideoResult[]
      video: VideoResult[]
    }
  }

  type VideoResult = {
    ext: string
    resolution: string
    isAudio: boolean
    fps: number
    hasSound: boolean
    filesize: string
    url: string
  }
}
