import type { Request, Response} from 'express';
import { prisma } from '@/prisma/prisma';

export const getProjects = async (
    req: Request,
    res: Response
) : Promise<void> => {
    try {
        const projects = await prisma.project.findMany();
        res.status(200).json(projects);
    } catch (error: any) {
        res.status(500).json({ message: `Error fetching projects: ${error.message}` });
    }
}