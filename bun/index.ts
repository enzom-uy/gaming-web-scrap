import { initBrowser } from './components/browser'
import { scrapEurogamer } from './components/eurogamer'
import { scrapIgn } from './components/ign'
import { scrapPolygon } from './components/polygon'
import { scrapRockPaperShotgun } from './components/rockpapershotgun'

await (async () => {
    const start = async () => {
        const { browser, page } = await initBrowser()
        await page.setViewport({ height: 4000, width: 320 })

        await scrapPolygon({ page, browser })

        console.log('Hola yo voy después de Polygon :).')
        await scrapIgn({ page, browser })
        await scrapRockPaperShotgun({ page, browser })
        await scrapEurogamer({ page, browser })
        await browser.close()
    }
    await start()
})()
