import { prisma } from '../config/database.js';
import { CreateWifiData } from '../services/wifiService.js';

export async function insert(createWifiData: CreateWifiData) {
    await prisma.wifi.create({
        data: createWifiData,
    });
}

export async function findWifis(id: number) {
    return await prisma.wifi.findMany({
        where: {
            userId: id,
        },
    });
}

export async function findWifiById(id: number) {
    const wifi = await prisma.wifi.findMany({
        where: {
            id: id,
        },
    });
    return wifi[0];
}

export async function deleteWifi(id: number) {
    await prisma.wifi.deleteMany({
        where: {
            id: id,
        },
    });
}

const wifiRepository = {
    insert,
    findWifis,
    findWifiById,
    deleteWifi,
};

export default wifiRepository;
