import type { Request, Response } from 'express'
import { scrapArticleContent } from '../../features/scrapArticleContent'

interface ReqParams {
    articleUrl: string
}

export const getArticle = async (req: Request, res: Response) => {
    try {
        const queryParams = req.query as unknown as ReqParams
        const articleUrl = queryParams.articleUrl
        const articleContent = scrapArticleContent({ articleUrl, page })
        res.json({ articleUrl })
    } catch (error) {
        res.json(JSON.stringify(error))
    }
}
