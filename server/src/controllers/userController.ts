import type { Request, Response } from "express";
import { prisma } from "@/prisma/prisma";

export const getUsers = async (req: Request, res: Response): Promise<void> => {
  const { projectId } = req.query;
  try {
    const users = await prisma.user.findMany();
    res.status(200).json(users);
  } catch (error: any) {
    res.status(500).json({ message: `Error fetching users: ${error.message}` });
  }
};

