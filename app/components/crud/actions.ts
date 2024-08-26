import prisma from "@/prisma/lib/prisma";
import { SpectralAstralProduct } from "./product-definitions";

export async function filterDataByID(id: number): Promise<SpectralAstralProduct | null> {
    try {
        const data = await prisma.user.findUnique({
            where: {
                id,
            },
        });

        if (!data) {
            throw new Error(`User with ID ${id} not found`);
        }

        return data;
    } catch (error) {
        console.error(`Error fetching user with ID ${id}:`, error);
        throw error;
    }
}
