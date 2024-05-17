import { Request, Response } from "express";
import { User } from "../models/user.model";
import { io } from "../index";

export const getAll = async (req: Request, res: Response) => {
    const user = await User.findAll();
    res.send(user)
}

export const getOne = async (req: Request, res: Response) => {
    const user = await User.findByPk(req.params.id);

    if (user) {
        res.send(user)
    } else {
        res.status(404).send({ message: "User not found" });
    }

}

export const create = async (req: Request, res: Response) => {
    try {
        const user = await User.create(req.body);
        io.emit("update users", { message: "" });
        res.status(201).send(user);
    } catch (error) {
        res.status(400).send(error);
    }
}

export const update = async (req: Request, res: Response) => {
    const user = await User.findByPk(req.params.id);
    if (user) {
        await user.update(req.body);
        io.emit("update users", { message: "" });
        res.status(200).send(user);
    } else {
        res.status(404).send({ message: "User not found" });
    }
}

export const remove = async (req: Request, res: Response) => {
    const user = await User.findByPk(req.params.id);
    if (user) {
        await user.destroy();
        io.emit("update users", { message: "" });
        res.status(200).send({ message: "User deleted" });
    } else {
        res.status(404).send({ message: "User not found" });
    }
}