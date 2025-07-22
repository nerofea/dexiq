import OpenAI from 'openai';
import { OPENAI_API_KEY } from '../config';

const openai = new OpenAI({ apiKey: OPENAI_API_KEY });

export async function generateStory(input: string): Promise<string> {
    const prompt = `Write a short, engaging news article (100-120 words, about 30-45 seconds when read aloud) for a general audience based on this crypto event: ${input}. Keep it informative and engaging with some context about why this matters.`;
    const response = await openai.chat.completions.create({
        model: 'gpt-4',
        messages: [
            { role: 'system', content: 'You are a financial news writer who creates engaging, informative stories.' },
            { role: 'user', content: prompt },
        ],
        max_tokens: 250,
        temperature: 0.7,
    });
    return response.choices[0].message?.content?.trim() || '';
}
