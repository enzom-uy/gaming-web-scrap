/* eslint-disable @typescript-eslint/no-non-null-assertion */
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
  articleUrl
}: Props): Promise<void> => {
  let article
  switch (website) {
    case 'ign':
      await page.goto(articleUrl, { waitUntil: 'networkidle0' })

      article = await page.evaluate(
        ({ articleUrl }) => {
          const cleanHtml = (html: string): string => {
            const cleanedHtml = html.replace(/ class="[^"]*"/g, '')

            return cleanedHtml
          }
          const title = document?.querySelector('h1')?.textContent
          const articleIsAVideo = articleUrl.includes('.com/videos/')

          if (articleIsAVideo) {
            const content = cleanHtml(
              document.querySelector('div[itemprop="description"]')!.innerHTML
            )
            return { title, content }
          } else {
            const paragraphs = Array.from(document?.querySelectorAll('p'))
              .map((p) => cleanHtml(p.innerHTML))
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
