import { Request, Response } from "express";
import prisma from "../config/database";

export const getProjects = async (req: Request, res: Response) => {
    try {
        const projects = await prisma.project.findMany({
            orderBy: { createdAt: 'desc' }
        });
        res.json({ success: true, data: projects });
    } catch (error) {
        console.error('Error fetching projects:', error);
        res.status(500).json({ success: false, error: 'Error fetching projects' });
    }
};

export const getProjectById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const project = await prisma.project.findUnique({
            where: { id: parseInt(id) }
        });

        if (!project) {
            return res.status(404).json({ success: false, error: 'Project not found' });
        }

        res.json({ success: true, data: project });
    } catch (error) {
        console.error('Error fetching project:', error);
        res.status(500).json({ success: false, error: 'Error fetching project' });
    }
};

export const addProject = async (req: Request, res: Response) => {
    try {
        const { title, description, repoUrl, liveUrl } = req.body;

        if (!title || !description) {
            return res.status(400).json({
                success: false,
                error: 'Title and description are required'
            });
        }

        const project = await prisma.project.create({
            data: {
                title,
                description,
                repoUrl: repoUrl || null,
                liveUrl: liveUrl || null
            },
        });

        res.status(201).json({ success: true, data: project });
    } catch (error) {
        console.error('Error creating project:', error);
        res.status(500).json({ success: false, error: 'Error creating project' });
    }
};

export const updateProject = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { title, description, repoUrl, liveUrl } = req.body;

        const project = await prisma.project.update({
            where: { id: parseInt(id) },
            data: {
                title,
                description,
                repoUrl: repoUrl || null,
                liveUrl: liveUrl || null
            },
        });

        res.json({ success: true, data: project });
    } catch (error: any) {
        if (error.code === 'P2025') {
            return res.status(404).json({ success: false, error: 'Project not found' });
        }
        console.error('Error updating project:', error);
        res.status(500).json({ success: false, error: 'Error updating project' });
    }
};

export const deleteProject = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        await prisma.project.delete({
            where: { id: parseInt(id) }
        });

        res.json({ success: true, message: 'Project deleted successfully' });
    } catch (error: any) {
        if (error.code === 'P2025') {
            return res.status(404).json({ success: false, error: 'Project not found' });
        }
        console.error('Error deleting project:', error);
        res.status(500).json({ success: false, error: 'Error deleting project' });
    }
};