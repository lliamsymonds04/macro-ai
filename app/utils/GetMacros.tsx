import OpenAI from "openai";

import fetchTextFile from "./FetchTextFile";

const OPEN_AI_KEY = import.meta.env.VITE_OPEN_AI_KEY
const openai = new OpenAI({apiKey: OPEN_AI_KEY, dangerouslyAllowBrowser: true});

interface ProteinAndCalories {
    protein: number,
    calories: number,
}

function getProteinAndCalories(msg: string): ProteinAndCalories | undefined{
    if (msg.includes("Protein: ") && msg.includes("Calories: ")) {
      return {
        protein: parseInt(msg.split("Protein: ")[1]),
        calories: parseInt(msg.split("Calories: ")[1])
      }
    } else {
      return;
    }
  }


export async function getMacros(foodDescription: string) {
    const macros_prompt = await fetchTextFile('/GptPrompts/FoodMacros.txt');

    const gpt_response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [{role: "system", "content": macros_prompt}, { role: "user", content: foodDescription }],
        temperature: 0,
        max_tokens: 100,
    });

    if (gpt_response) {
        const message = gpt_response.choices[0].message.content
        console.log(message)

        if (message) {
            return getProteinAndCalories(message)
        }
    }
}

export async function describeFood(foodImageUrl: string) {
  const gpt_prompt = await fetchTextFile('/GptPrompts/DescribeFood.txt')

  const gpt_response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{"role": "system", "content": gpt_prompt},
              {"role": "user", "content": [{
                  "type": "image_url",
                  "image_url": {"url": foodImageUrl},
              }]},]
  })

  if (gpt_response) {
    return gpt_response.choices[0].message.content
  }
}