import { NextRequest } from 'next/server';
import prisma from '@/prisma/lib/prisma';
import { NextResponse } from 'next/server';

// Handler for POST requests
export async function POST(req: NextRequest) {
    try {
        const { id, name, age, email } = await req.json();
        const newUser = await prisma.user.create({
            data: {
                id: Number(id),
                name,
                age: Number(age),
                email,
            },
        });
        return NextResponse.json(newUser);
    } catch (error) {
        console.error('Error creating user:', error);
        return NextResponse.json({ error: 'Failed to create user' }, { status: 500 });
    }
}