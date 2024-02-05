import { prisma } from '../config/prisma'
import type { Headline } from '../types'

export const uploadHeadlinesToDb = async (
    headlines: Array<Headline | null>
): Promise<void> => {
    console.log('Uploading headlines to the database...')
    await Promise.all(
        headlines.map(async (h) => {
            if (h === null) {
                console.error(
                    'An error ocurred when trying to upload a headline to the database: Headline is null.'
                )
                return
            }
            await prisma.headline.update({
                where: { title: h.title },
                data: {
                    title: h.title,
                    url: h.url,
                    source: h.source,
                    authors: h.authors,
                    image_url: h.imgUrl,
                    published_at: h.datetime,
                },
            })
        })
    )
    console.log('Done.')
}
