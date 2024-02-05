/* eslint-disable @typescript-eslint/no-floating-promises */
import { Router, type Request, type Response } from 'express'
import { prisma } from '../../config/prisma'
import * as getHeadlinesControllers from '../controllers/getHeadlines.controller'

const getHeadlines = Router()

getHeadlines.get('/api/get-headlines', getHeadlinesControllers.getHeadlines)

export default getHeadlines
