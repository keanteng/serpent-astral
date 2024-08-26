import { NextRequest } from 'next/server';
import prisma from '@/prisma/lib/prisma';
import { NextResponse } from 'next/server';

// Handler for DELETE requests
export async function DELETE(req: NextRequest) {
    try {
        const id  = req.nextUrl.pathname.split('/').pop()

        if (!id) {
            return NextResponse.json({ error: 'ID is required' }, { status: 400 });
        }
        const deletedProduct = await prisma.user.delete({
            where: {
                id: Number(id),
            },
        });
        return NextResponse.json(deletedProduct);
    } catch (error) {
        console.error('Error deleting product:', error);
        return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 });
    }
}