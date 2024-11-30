import express from "express";

const messagesRouter = express.Router();

messagesRouter.get('/', (req, res) => {
    res.send('Все сообщения');
});

messagesRouter.post('/create', (req, res) => {
    res.send('Создание сообщений');
});

export default messagesRouter;

