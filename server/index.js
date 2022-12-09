import { config } from "dotenv";
config()
import {  Configuration, OpenAIApi } from "openai";
import * as fs from 'fs';


const configuration = new Configuration({
    apiKey:process.env.OPEN_AI_KEY
})

const openai = new OpenAIApi(configuration)
const prompt = "A ship sailing through a river of fire in deep space"

const response = await openai.createImage({
    prompt,
    n:1,
    size:"1024x1024"
})

const url = response.data.data[0].url;
console.log(url)

const imageResult = await fetch(url)
const blob = await imageResult.blob()

const buffer = Buffer.from( await blob.arrayBuffer() )

fs.writeFileSync(`./img/${Date.now()}.png`, buffer)
