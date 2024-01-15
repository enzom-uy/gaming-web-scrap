import { Router } from 'express'

const getHeadlines = Router()

getHeadlines.get('/api/get-headlines', (_req, res) => {
    res.send('Get headlines API endpoint.')
})
