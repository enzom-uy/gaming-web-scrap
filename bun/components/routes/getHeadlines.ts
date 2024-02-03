import { Router } from 'express'
import { scrapAllHeadlines } from '../../features/scrapAllHeadlines'

const getHeadlines = Router()

getHeadlines.get('/api/get-headlines', (_req, res) => {
    const something = await scrapAllHeadlines()
    res.json({ data: 'Testing data' })
})

export default getHeadlines
