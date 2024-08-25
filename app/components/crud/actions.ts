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
export async function updateDataByID(id: number, data: SpectralAstralProduct): Promise<SpectralAstralProduct> {
    try {
        const updatedUser = await prisma.user.update({
            where: {
                id,
            },
            data,
        });
        console.log(`User with ID ${id} updated successfully.`);
        return updatedUser;
    } catch (error) {
        console.error(`Error updating user with ID ${id}:`, error);
        throw new Error(`Failed to update user with ID ${id}: ${(error as Error).message}`);
    }
}