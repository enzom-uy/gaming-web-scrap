/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { SCRAPPING_TIMEOUT } from '../config/variables'
import type { Headline, ScrapperProps, SiteUrl } from '../types'

const eurogamerUrl: SiteUrl = 'https://eurogamer.net/archive/news'

export const scrapEurogamer = async ({
    page,
}: ScrapperProps): Promise<Headline[] | undefined> => {
    console.log(`Navigating to ${eurogamerUrl}. Starting scrap process...`)

    try {
        await page.goto(eurogamerUrl, {
            waitUntil: 'networkidle0',
            timeout: SCRAPPING_TIMEOUT,
        })

        const articles: Headline[] = await page.evaluate(() => {
            const articles = document.querySelectorAll(
                'section.archive_list ul.summary_list li div.summary'
            )

            return Array.from(articles).map((article) => {
                const title = article
                    .querySelector('p.title')!
                    .textContent!.trim()

                const imgUrl = article
                    .querySelector('div.thumbnail img.thumbnail_image')!
                    .getAttribute('src')!
                    .replace('width=160', 'width=1920')
                    .replace('height=90', 'height=1080')

                const url = article
                    .querySelector('p.title a')!
                    .getAttribute('href')!

                const eurogamerHeadline: Headline = {
                    title,
                    imgUrl,
                    url,
                    source: 'eurogamer',
                }

                return eurogamerHeadline
            })
        })
        return articles
    } catch (error) {
        console.log(error)
        return
    }
}
