import { Request, Response, NextFunction } from 'express';

export default function errorHandler(
    error,
    req: Request,
    res: Response,
    next: NextFunction
) {
    if (error.status && error.message)
        return res.status(error.status).send(error.message);

    if (error.details)
        return res
            .status(422)
            .send(error.details.map(({ message }) => message));

    res.send(error);
}
