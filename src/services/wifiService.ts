import { Wifi } from '@prisma/client';
import wifiRepository from '../repositories/wifiRepository.js';
import { encrypt } from '../utils/encryptUtils.js';

export type CreateWifiData = Omit<Wifi, 'id'>;

async function createWifi(wifi: CreateWifiData) {
    const passwordEncrypted = encrypt(wifi.password);
    wifi.password = passwordEncrypted;
    await wifiRepository.insert(wifi);
}

async function getWifis(id: number) {
    const wifis = await wifiRepository.findWifis(id);
    return wifis;
}

async function getWifi(id: number, wifiId: number) {
    const wifi = await wifiRepository.findWifiById(wifiId);
    if (!wifi) {
        throw {
            status: 404,
            message: `Wifi not found`,
        };
    }
    if (wifi.userId != id) {
        throw {
            status: 401,
            message: `Wifi does not belong to the user `,
        };
    }

    return wifi;
}

async function deleteWifi(id: number, wifiId: number) {
    const wifi = await getWifi(id, wifiId);
    await wifiRepository.deleteWifi(wifi.id);
}

const wifiService = {
    createWifi,
    getWifis,
    getWifi,
    deleteWifi,
};

export default wifiService;
