import { Router } from "express";
import {
    getProjects,
    addProject,
    getProjectById,
    updateProject,
    deleteProject
} from "../controllers/projectsController";

const router = Router();

router.get("/", getProjects);
router.get("/:id", getProjectById);
router.post("/", addProject);
router.put("/:id", updateProject);
router.delete("/:id", deleteProject);

export default router;