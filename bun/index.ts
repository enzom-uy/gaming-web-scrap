import { initBrowser } from './components/browser'
import { scrapPolygon } from './components/polygon'

await (async () => {
    const { browser, page } = await initBrowser()

    await scrapPolygon({ page, browser })

    console.log('Hola yo voy después de Polygon :).')
    setTimeout(() => {}, 5000)
})()
