import { addKeyword, EVENTS } from "@builderbot/bot";
import aiServices from "~/services/aiServices";
import { config } from "../config";
import path from "path";
import fs from "fs";

// Ruta correcta del archivo de prompts
const pathPrompt = path.join(
    process.cwd(),
    "assets/Prompts",
    "prompt_OpenAi.txt"
);

// Leer el contenido del archivo de prompt
const prompt = fs.readFileSync(pathPrompt, "utf8");

export const faqFlow = addKeyword(EVENTS.ACTION)
    .addAction(async ( ctx,{ state, endFlow, gotoFlow }) => {
        try {
            const AI = new aiServices(config.ApiKey);
            const response = await AI.chat(prompt, [{ role: "user", content: ctx.body }]);
            return endFlow(response);
        } catch (err) {
            console.error("Error al conectar OpenAI", err);
            return endFlow("ERROR");
        }
    });
