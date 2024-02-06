/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { SCRAPPING_TIMEOUT } from '../config/variables'
import type { Headline, ScrapperProps, SiteUrl } from '../types'

const ignUrls: SiteUrl[] = [
  'https://ign.com/pc',
  'https://ign.com/playstation',
  'https://ign.com/xbox',
  'https://ign.com/nintendo'
]

const removeDuplicates = (array: Headline[], prop: 'title'): Headline[] => {
  const seen = new Set()
  return array.filter((item: Headline) => {
    const value = item[prop]
    if (!seen.has(value)) {
      seen.add(value)
      return true
    }
    return false
  })
}

export const scrapIgn = async ({
  page
}: ScrapperProps): Promise<Headline[] | undefined> => {
  console.log('Navigating to https://ign.com/. Starting scrap process...')
  for (const url of ignUrls) {
    try {
      await page.goto(url, {
        waitUntil: 'networkidle0',
        timeout: SCRAPPING_TIMEOUT
      })

      const articles: Headline[] = await page.evaluate(() => {
        const articles = document.querySelectorAll('.content-item')

        return Array.from(articles).map((article) => {
          const title = article.querySelector('.item-title')!.innerHTML
          const url = `https://ign.com${article
            .querySelector('a.item-body')
            ?.getAttribute('href')}`
          const imgUrl = article
            .querySelector('div.item-thumbnail span img')!
            .getAttribute('src')!
            .replace('width=282', 'width=1920')
            .replace(/(width=1920).*$/, '$1')

          const authors = article
            .querySelector('object[title="Author Link"]')
            ?.textContent?.trim()

          const ignArticle: Headline = {
            title,
            url,
            imgUrl,
            authors,
            source: 'ign'
          }

          return ignArticle
        })
      })

      const uniqueArticles = removeDuplicates(articles, 'title')
      return uniqueArticles
    } catch (err) {
      console.log('An error occurred when trying to scrap Ign.', err)
    }
  }
}
