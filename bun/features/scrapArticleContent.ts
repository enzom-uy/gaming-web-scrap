/* eslint-disable @typescript-eslint/no-confusing-void-expression */
import { type Page } from 'puppeteer'

type Website = 'ign' | 'polygon' | 'rps' | 'eurogamer'

interface Props {
    website: Website
    page: Page
    articleUrl: string
}

export const scrapArticleContent = async ({
    website,
    page,
    articleUrl,
}: Props) => {
    let article
    switch (website) {
        case 'ign':
            await page.goto(articleUrl, { waitUntil: 'networkidle0' })

            article = await page.evaluate(
                ({ articleUrl }) => {
                    const title = document?.querySelector('h1')?.textContent
                    if (articleUrl.includes('.com/videos/')) {
                        const content = document?.querySelector(
                            'div[itemprop="description"]'
                        )?.innerHTML
                        return { title, content }
                    } else {
                        const paragraphs = Array.from(
                            document?.querySelectorAll('p')
                        )
                            .map((p) => p.innerHTML)
                            .filter((p) => p !== '')

                        return { title, paragraphs }
                    }
                },
                { articleUrl }
            )
            console.log(article)

            break

        default:
            break
    }
}
