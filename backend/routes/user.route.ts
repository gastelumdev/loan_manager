import { Router } from "express";
import { getAll, getOne, create, update, remove } from "../controllers/user.controller";

const router = Router();

router.get('/users', getAll);
router.get('/users/:id', getOne);
router.post('/users', create);
router.put('/users/:id', update);
router.delete('/users/:id', remove);

export default router;