/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { SCRAPPING_TIMEOUT } from '../config/variables'
import type { Headline, ScrapperProps, SiteUrl } from '../types'

const polygonUrl: SiteUrl = 'https://polygon.com/gaming'

export const scrapPolygon = async ({
    page,
}: ScrapperProps): Promise<Array<Headline | null> | undefined> => {
    try {
        console.log(`Navigating to ${polygonUrl}. Starting scrap process...`)

        await page
            .goto(polygonUrl, {
                waitUntil: 'networkidle0',
                timeout: SCRAPPING_TIMEOUT,
            })
            .catch(async (err: string) => {
                throw new Error(err)
            })
            .then((res) => res)

        const articles = await page.evaluate(() => {
            const articles = document.querySelectorAll(
                'div.c-entry-box--compact'
            )

            return Array.from(articles).map((article) => {
                if (article !== null) {
                    const title = article.querySelector('h2 > a')!.innerHTML
                    const authors = article
                        .querySelector('span.c-byline__item')!
                        .textContent!.trim()
                    const imgUrl = article
                        .querySelector('img')!
                        .getAttribute('src')!
                    const url = article
                        .querySelector('h2 > a')!
                        .getAttribute('href')!
                    const datetime = article
                        .querySelector('time.c-byline__item')!
                        .getAttribute('datetime')!

                    const polygonArticle: Headline = {
                        title,
                        authors,
                        imgUrl,
                        url,
                        datetime,
                        source: 'polygon',
                    }

                    return polygonArticle
                } else {
                    return null
                }
            })
        })

        return articles
    } catch (err) {
        console.log('Ha ocurrido un error. Salteando el paso de Polygon.')
        console.log(err)
    }
}
