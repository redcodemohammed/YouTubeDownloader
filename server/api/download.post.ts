import youtubeDl from 'youtube-dl-exec'
import ytdl from 'ytdl-core'
import { humanFileSize } from '@/composables/humanFileSize'

export default defineEventHandler(async (event) => {
  const body = await readBody<DownloadRequest>(event)
  if (!ytdl.validateURL(body.url)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'invalid download url'
    })
  }
  const output = await youtubeDl(body.url, {
    dumpSingleJson: true,
    noCheckCertificates: true,
    noWarnings: true,
    addHeader: ['referer:youtube.com', 'user-agent:googlebot']
  })

  const results = output.formats
    .map((ytFormat) => {
      return {
        ext: ytFormat.ext,
        resolution: `${ytFormat.width}x${ytFormat.height}`,
        isAudio: ytFormat.width === null || ytFormat.width < 200,
        fps: ytFormat.fps,
        // @ts-ignore
        hasSound: ytFormat.audio_channels !== null,
        filesize: humanFileSize(ytFormat.filesize || 0),
        url: ytFormat.url
      }
    })
    .reduce(
      (prev, current) => {
        if (current.ext === 'mhtml') return prev
        if (current.isAudio) prev.audio.push(current)
        else prev.video.push(current)
        return prev
      },
      { audio: [] as VideoResult[], video: [] as VideoResult[] }
    )

  return {
    art: output.thumbnail,
    title: output.title,
    results
  }
})
