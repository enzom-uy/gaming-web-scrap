/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import * as getArticleControllers from '../controllers/getArticle.controller'

const getArticle = Router()

getArticle.get('/api/get-article', getArticleControllers.getArticle)

export default getArticle
