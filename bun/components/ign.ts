/* eslint-disable @typescript-eslint/no-non-null-assertion */
import type { Article, ScrapperProps } from '../types'

const ignUrls = [
    'https://ign.com/pc',
    'https://ign.com/playstation',
    'https://ign.com/xbox',
    'https://ign.com/nintendo',
]

const removeDuplicates = (array: Article[], prop: 'title'): Article[] => {
    const seen = new Set()
    return array.filter((item: Article) => {
        const value = item[prop]
        if (!seen.has(value)) {
            seen.add(value)
            return true
        }
        return false
    })
}

export const scrapIgn = async ({
    page,
    browser,
}: ScrapperProps): Promise<Article[] | undefined> => {
    console.log(`Navigating to https://ign.com/. Starting scrap process...`)
    for (const url of ignUrls) {
        try {
            await page.goto(url, { waitUntil: 'networkidle0', timeout: 200 })

            const articles: Article[] = await page.evaluate(() => {
                const articles = document.querySelectorAll('.content-item')

                return Array.from(articles).map((article) => {
                    const title =
                        article.querySelector('.item-title')!.innerHTML
                    const url = `https://ign.com${article
                        .querySelector('a.item-body')
                        ?.getAttribute('href')}`
                    const imgUrl = article
                        .querySelector('div.item-thumbnail span img')
                        ?.getAttribute('src')
                        ?.replace('width=282', 'width=1920')
                        .replace(/(width=1920).*$/, '$1')

                    const authors = article
                        .querySelector('object[title="Author Link"]')
                        ?.textContent?.trim()

                    const ignArticle: Article = {
                        title,
                        url,
                        imgUrl,
                        authors,
                    }

                    return ignArticle
                })
            })

            const uniqueArticles = removeDuplicates(articles, 'title')
            console.log(uniqueArticles)
            return uniqueArticles
        } catch (err) {
            console.log(`An error occurred when trying to scrap Ign.`, err)
        }
    }
}