import express from "express";
import fileDb from "../fileDb";
import {Message} from "../types";

const messagesRouter = express.Router();

messagesRouter.get('/', async (req, res) => {
    const messages = await fileDb.getMessages();
    res.send(messages);
});

messagesRouter.post('/create', async (req, res) => {
    const message: Message = {
        message: req.body.message,
        datetime: "",
    }
    const saveMessage = await fileDb.addMessages(message);
    res.send(saveMessage);
});

export default messagesRouter;

