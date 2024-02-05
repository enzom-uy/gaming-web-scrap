import type { Request, Response } from 'express'
import { prisma } from '../../config/prisma'

export const getHeadlines = async (req: Request, res: Response) => {
    try {
        const queryPage = Number(req.query.page)
        const queryElementsPerPage = Number(req.query.elementsPerPage)
        if (isNaN(queryPage) || isNaN(queryElementsPerPage)) {
            return res
                .send({
                    error: 'Either queryPage or queryElementsPerPage are not number or are missing.',
                })
                .status(400)
        }
        const previousElements =
            queryPage * queryElementsPerPage - queryElementsPerPage

        prisma.headline
            .findMany({
                skip: queryPage <= 1 ? undefined : previousElements,
                take: queryElementsPerPage,
                cacheStrategy: { ttl: 60 },
            })
            .withAccelerateInfo()
            .then((response) => {
                res.send(response)
            })
    } catch (error) {
        console.log(error)
    }
}
