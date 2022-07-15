import { Request, Response } from 'express';

import userService, { CreateUserData } from '../services/userService.js';

export async function singup(req: Request, res: Response) {
    const user: CreateUserData = req.body;
    await userService.insertUser(user);
    return res.sendStatus(201);
}

export async function login(req: Request, res: Response) {
    const user: CreateUserData = req.body;
    const token = await userService.login(user);

    return res.send({ token }).status(200);
}
