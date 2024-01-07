/* eslint-disable @typescript-eslint/no-non-null-assertion */
import type { Article, ScrapperProps } from '../types'

const polygonUrl = 'https://polygon.com/gaming'

export const scrapPolygon = async ({
    page,
    browser,
}: ScrapperProps): Promise<void> => {
    try {
        console.log(`Navigating to ${polygonUrl}. Starting scrap process...`)

        await page
            .goto(polygonUrl, { waitUntil: 'networkidle0', timeout: 200 })
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
                        .getAttribute('src')
                    const url = article
                        .querySelector('h2 > a')!
                        .getAttribute('href')!

                    const polygonArticle: Article = {
                        title,
                        authors,
                        imgUrl,
                        url,
                    }

                    return polygonArticle
                } else {
                    return null
                }
            })
        })

        console.log(
            'Scrapping process done. Here are the results: \n',
            articles
        )
    } catch (err) {
        console.log('Ha ocurrido un error. Salteando el paso de Polygon.')
        console.log(err)
    }
}
