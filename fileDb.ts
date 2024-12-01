import { Message } from "./types";
import { promises as fs } from 'fs';
import path from "node:path";

const directory = './messages';

const fileDb = {
    async init() {
        try {
            await fs.mkdir(directory, {recursive: true});
        } catch (error) {
            console.error(error);
        }
    },

    async getMessages() {
        try{
            const files = await fs.readdir(directory);
            let data: Message[] = [];

            for (const file of files) {
                const filePath = path.join(directory, file);
                const fileContent = await fs.readFile(filePath);
                const message: Message = JSON.parse(fileContent.toString());
                data.push(message);
            }

            data.sort((a, b) => new Date(b.datetime).getTime() - new Date(a.datetime).getTime());
            return data.slice(0, 5);
        } catch (error){
            console.error(error);
            return [];
        }
    },

    async addMessages(item: Message) {
        const newMessage: Message = {
            message: item.message,
            datetime: new Date().toISOString()
        };

        const fileName = `${newMessage.datetime}.txt`;
        const filePath = path.join(directory, fileName);

        try{
            await fs.writeFile(filePath, JSON.stringify(newMessage));
            return newMessage;
        } catch (error){
            console.error(error);
        }
    }
};

export default fileDb;
