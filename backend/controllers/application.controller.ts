import { Request, Response } from "express";
import { Application } from "../models/application.model";
import { io } from "../index";
import { User } from "../models/user.model";

export const getAll = async (req: Request, res: Response) => {
    const applications = await Application.findAll();
    res.send(applications)
}

export const getAllForUser = async (req: Request, res: Response) => {
    const user = await User.findByPk(req.params.id);

    if (user) {
        const application = await Application.findAll({ where: { organization: req.params.id } });
        res.send(application)
    } else {
        res.status(404).send({ message: "User not found" });
    }

}

export const create = async (req: Request, res: Response) => {
    try {
        const application = await Application.create(req.body);
        io.emit("update applications", { message: "" });
        res.status(201).send(application);
    } catch (error) {
        res.status(400).send(error);
    }
}

export const update = async (req: Request, res: Response) => {
    const application = await Application.findByPk(req.params.id);
    if (application) {
        await application.update(req.body);
        io.emit("update applications", { message: "" });
        res.status(200).send(application);
    } else {
        res.status(404).send({ message: "Application not found" });
    }
}

export const remove = async (req: Request, res: Response) => {
    const application = await Application.findByPk(req.params.id);
    if (application) {
        await application.destroy();
        io.emit("update applications", { message: "" });
        res.status(200).send({ message: "Application deleted" });
    } else {
        res.status(404).send({ message: "Application not found" });
    }
}