import { Request, Response } from "express";
import { loadItem, saveItem } from "../utils/fileUtils";
import { Item, PartialItem } from "../models/item";

export const getItem = (req: Request, res: Response) => {
    const items = loadItem();
    res.status(201).json(items);
};

export const updateItem = (req: Request, res: Response) => {
    const { id } = req.params;
    const { onCart } = req.body as PartialItem;

    const items = loadItem();
    const itemIndex = items.findIndex(item => item.id === parseInt(id));

    if (itemIndex === -1) {
        return res.status(404).json({ message: 'Item not found' });
    }

    if (onCart !== undefined) {
        items[itemIndex].onCart = onCart;
    }

    saveItem(items);
    res.status(200).json({ message: 'Item updated', item: items[itemIndex] });
};