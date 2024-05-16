import { Router } from "express";
import { getAll, getAllForUser, create, update, remove } from "../controllers/application.controller";

const router = Router();

router.get('/applications', getAll);
router.get('/applications/user/:id', getAllForUser);
router.post('/applications', create);
router.put('/applications/:id', update);
router.delete('/applications/:id', remove);

export default router;