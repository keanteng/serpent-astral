import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const users = await prisma.user.findMany();
    res.json(users);
  } else if (req.method === 'POST') {
    const { name, email, age } = req.body;
    const user = await prisma.user.create({
      data: { name, email, age },
    });
    res.status(201).json(user);
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}