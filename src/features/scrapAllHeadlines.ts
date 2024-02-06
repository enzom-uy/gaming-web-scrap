/* eslint-disable @typescript-eslint/no-non-null-assertion */
import type { Browser, Page } from 'puppeteer'
import { scrapEurogamer } from '../components/eurogamer'
import { scrapIgn } from '../components/ign'
import { scrapPolygon } from '../components/polygon'
import { scrapRockPaperShotgun } from '../components/rockpapershotgun'
import type { Headline } from '../types'

export const scrapAllHeadlines = async ({
  page,
  browser
}: {
  page: Page
  browser: Browser
}): Promise<{ allHeadlines: Array<Headline | null> }> => {
  const allHeadlines: Array<Headline | null> = []

  await Promise.all([
    await scrapPolygon({ page, browser }).then(
      (res) => res?.map((headline) => allHeadlines.push(headline))
    ),
    await scrapIgn({ page, browser }).then(
      (res) => res?.map((headline) => allHeadlines.push(headline))
    ),
    await scrapRockPaperShotgun({ page, browser }).then(
      (res) => res?.map((headline) => allHeadlines.push(headline))
    ),
    await scrapEurogamer({ page, browser }).then(
      (res) => res?.map((headline) => allHeadlines.push(headline))
    )
  ])

  function sortByDatetime (a: Headline | null, b: Headline | null): number {
    const tieneDatetimeA = 'datetime' in a!
    const tieneDatetimeB = 'datetime' in b!

    if (tieneDatetimeA && !tieneDatetimeB) {
      return -1
    } else if (!tieneDatetimeA && tieneDatetimeB) {
      return 1
    } else {
      return 0
    }
  }

  allHeadlines.sort(sortByDatetime)
  console.log(allHeadlines)

  return { allHeadlines }
}
