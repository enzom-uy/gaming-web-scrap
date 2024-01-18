import type { Request, Response } from 'express'

interface ReqParams {
    articleUrl: string
}

export const getArticle = async (req: Request, res: Response) => {
    try {
        const queryParams = req.query as unknown as ReqParams
        const articleUrl = queryParams.articleUrl
        const validUrl = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i
        const allowedDomains = [
            'polygon.com',
            'ign.com',
            'eurogamer.net',
            'rockpapershotgun.com',
        ]
        const url = new URL(articleUrl)
        const domain = url.hostname

        if (!allowedDomains.includes(domain) || !validUrl.test(articleUrl)) {
            res.status(400).json({
                error: 'Invalid article url. Check the provided domain.',
            })
            return
        }

        res.json({ articleUrl })
    } catch (error) {
        console.log(error)
        res.json(JSON.stringify(error))
    }
}
