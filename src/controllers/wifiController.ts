import { Request, Response } from 'express';
import wifiService, { CreateWifiData } from '../services/wifiService.js';

export async function createWifi(req: Request, res: Response) {
    const wifi: CreateWifiData = req.body;
    const { id } = res.locals.user;

    await wifiService.createWifi({ ...wifi, userId: id });
    return res.sendStatus(201);
}

export async function getAllWifis(req: Request, res: Response) {
    const { id } = res.locals.user;
    const wifis = await wifiService.getWifis(parseInt(id));
    return res.status(200).send(wifis);
}

export async function getWifi(req: Request, res: Response) {
    const wifiId = req.params.id;
    const { id } = res.locals.user;
    const wifi = await wifiService.getWifi(parseInt(id), parseInt(wifiId));
    return res.status(200).send(wifi);
}

export async function deleteWifi(req: Request, res: Response) {
    const wifiId = req.params.id;
    const { id } = res.locals.user;
    await wifiService.deleteWifi(parseInt(id), parseInt(wifiId));
    return res.sendStatus(200);
}
