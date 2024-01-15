/* eslint-disable @typescript-eslint/no-misused-promises */
import 'dotenv/config.js'
import cors from 'cors'
import { initBrowser } from './components/browser'
import { scrapEurogamer } from './components/eurogamer'
import { scrapIgn } from './components/ign'
import { scrapPolygon } from './components/polygon'
import { scrapRockPaperShotgun } from './components/rockpapershotgun'
import { scrapArticleContent } from './features/scrapArticleContent'
import express, { type Response, type Request } from 'express'
import bodyParser from 'body-parser'
import { jwtAuth } from './components/middlewares/auth'

const app = express()
const port = 3000

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(jwtAuth)
console.log('testing')

app.get('/', (req: Request, res: Response) => {
    res.send('Hello world.')
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})

// await (async () => {
//     const start = async (): Promise<void> => {
//         const { browser, page } = await initBrowser()
//         await page.setViewport({ height: 4000, width: 320 })
//         await scrapArticleContent({
//             articleUrl:
//                 'https://www.ign.com/articles/horizon-forbidden-west-pc-port-supports-dlss-3',
//             website: 'ign',
//             page,
//         })

//         await browser.close()
//         return

//         await scrapPolygon({ page, browser })

//         console.log('Hola yo voy después de Polygon :).')
//         await scrapIgn({ page, browser })
//         await scrapRockPaperShotgun({ page, browser })
//         await scrapEurogamer({ page, browser })
//         await browser.close()
//     }
//     await start()
// })()
