import type { Request, Response } from "express";
import { prisma } from "@/prisma/prisma";

export const search = async (req: Request, res: Response): Promise<void> => {
  const { query } = req.query;
  const searchTerm = query as string;

  try {
    // 1. Initiate all promises concurrently
    const [tasks, projects, users] = await Promise.all([
      prisma.task.findMany({
        where: {
          OR: [
            { title: { contains: searchTerm, mode: "insensitive" } },
            { description: { contains: searchTerm, mode: "insensitive" } },
          ],
        },
      }),
      prisma.project.findMany({
        where: {
          OR: [
            { name: { contains: searchTerm, mode: "insensitive" } },
            { description: { contains: searchTerm, mode: "insensitive" } },
          ],
        },
      }),
      prisma.user.findMany({
        where: {
          OR: [{ username: { contains: searchTerm, mode: "insensitive" } }],
        },
      }),
    ]);

    // 2. Return the combined results
    res.status(200).json({ tasks, projects, users });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: `Error performing search: ${error.message}` });
  }
};
