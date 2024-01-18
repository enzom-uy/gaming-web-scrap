/* eslint-disable @typescript-eslint/no-misused-promises */
import 'dotenv/config.js'
import cors from 'cors'
import { initBrowser } from './components/browser'
import express from 'express'
import bodyParser from 'body-parser'
import { jwtAuth } from './components/middlewares/auth'

import getArticleRoute from './components/routes/getArticle'
import { scrapAllHeadlines } from './features/scrapAllHeadlines'

const app = express()
const port = 3000

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(jwtAuth)

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})

app.use(getArticleRoute)

await (async () => {
    const start = async (): Promise<void> => {
        const { browser, page } = await initBrowser()
        await page.setViewport({ height: 4000, width: 320 })

        // await scrapAllHeadlines({ page, browser })
        await browser.close()
    }
    await start()
})()
