import prisma from '@/prisma/lib/prisma'; // Adjust the path to your prisma.ts file
import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

// Handler for GET requests
export async function GET() {
  try {
    const data = await prisma.user.findMany(); // Replace 'user' with your actual model name
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch data' });
  }
}
// Handler for PUT requests
export async function PUT(req: NextRequest) {
  try {
    const { id, name, age } = await req.json();
    const updatedUser = await prisma.user.update({
      where: { id: Number(id) },
      data: { name, age: Number(age), },
    });
    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json({ error: 'Failed to update data' }, { status: 500 });
  }
}

