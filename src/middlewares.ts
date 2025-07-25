import { NextFunction, Request, Response } from 'express'

export function logginMiddleware(req: Request, res: Response, next: NextFunction) {
    const start = Date.now()

    res.on('finish', () => {
        const duration = Date.now() - start
        const log = [`${req.method} ${req.originalUrl}`, res.statusCode, `${duration}ms`]

        console.log(log.join(' | '))
    })

    next()
}
