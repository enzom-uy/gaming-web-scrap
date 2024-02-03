import type { Request, Response } from 'express'
import { scrapAllHeadlines } from '../../features/scrapAllHeadlines'

export const getHeadlines = async (req: Request, res: Response) => {
    try {
        await scrapAllHeadlines()
    } catch (err) {}
}
