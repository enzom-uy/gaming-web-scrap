/* eslint-disable @typescript-eslint/no-non-null-assertion */
import type { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

export const jwtAuth = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response<any, Record<string, any>> | undefined> => {
    const token = req.headers.authorization!.split('Bearer ')[1]
    const signedToken = jwt.sign({}, token)
    try {
        jwt.verify(signedToken, process.env.SECRET_TOKEN!)
        console.log('Verified')
        next()
    } catch (error) {
        // console.log(error)
        return res.status(401).json({ error: 'Unauthorized.' })
    }
}
