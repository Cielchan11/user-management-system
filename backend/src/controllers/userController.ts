import express from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Keep this one
export const getAllUsers = async (req: express.Request, res: express.Response): Promise<void> => {
  try {
    const users = await prisma.user.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

// Keep this one
export const createUser = async (req: express.Request, res: express.Response): Promise<void> => {
  try {
    const { name, email, role } = req.body;
    
    if (!name || !email) {
      res.status(400).json({ error: 'Name and email are required' });
      return;
    }

    const user = await prisma.user.create({
      data: {
        name,
        email,
        role: role || 'user'
      }
    });
    
    res.status(201).json(user);
  } catch (error: any) {
    if (error.code === 'P2002') {
      res.status(400).json({ error: 'Email already exists' });
    } else {
      res.status(500).json({ error: 'Failed to create user' });
    }
  }
};

// Comment out these for now
/*
export const updateUser = async (req: express.Request, res: express.Response): Promise<void> => {
  // ... code
};

export const deleteUser = async (req: express.Request, res: express.Response): Promise<void> => {
  // ... code
};
*/