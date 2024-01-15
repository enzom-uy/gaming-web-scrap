import { Router } from 'express'

const getArticle = Router()

getArticle.get('/api/get-article', (_req, res) => {
    res.send('Get article API endpoint.')
})
