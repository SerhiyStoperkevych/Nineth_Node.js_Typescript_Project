import { Router } from "express";
import { getItem, updateItem } from '../controllers/itemController';

const router = Router();

router.get('/items', getItem);
router.patch('/items/:id', updateItem);

export default router;