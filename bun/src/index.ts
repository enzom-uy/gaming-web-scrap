/* eslint-disable @typescript-eslint/no-misused-promises */
const dotenv = require('dotenv')
import cors from 'cors'
import { initBrowser } from './components/browser'
import express from 'express'
import bodyParser from 'body-parser'
import { jwtAuth } from './components/middlewares/auth'

import { scrapAllHeadlines } from './features/scrapAllHeadlines'
import { uploadHeadlinesToDb } from './features/uploadHeadlinesToDb'
import getHeadlines from './components/routes/getHeadlines'

const app = express()
const port = 3000

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(jwtAuth)

app.use(getHeadlines)

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})

await (async () => {
    // const start = async (): Promise<void> => {
    //     const { browser, page } = await initBrowser()
    //     await page.setViewport({ height: 4000, width: 320 })
    //     const { allHeadlines } = await scrapAllHeadlines({ page, browser })
    //     if (allHeadlines !== null) {
    //         await uploadHeadlinesToDb(allHeadlines)
    //     }
    //     await browser.close()
    // }
    // await start()
})()
