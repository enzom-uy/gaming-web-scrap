/* eslint-disable @typescript-eslint/no-non-null-assertion */
import type { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

export const jwtAuth = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const token = req.headers.authorization?.split('Bearer ')[1]
    const signedToken = jwt.sign({}, process.env.SECRET_TOKEN!)

    try {
        console.log('Token del cliente:', token)
        console.log('Token del secret:', process.env.SECRET_TOKEN)
        jwt.verify(signedToken, process.env.SECRET_TOKEN!)
        next()
    } catch (error) {
        console.log(error)
        return res.status(401).json({ error: 'Unauthorized.' })
    }
}
