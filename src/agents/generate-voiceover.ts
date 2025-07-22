import axios from 'axios';
import fs from 'fs';
import path from 'path';
import { ELEVENLABS_API_KEY } from '../config';

const VOICE_ID = 'RCQHZdatZm4oG3N6Nwme';

export async function generateVoiceover(text: string, outPath: string): Promise<string> {
    if (!ELEVENLABS_API_KEY) {
        throw new Error('ELEVENLABS_API_KEY is not set');
    }

    console.log(`Generating voiceover for text: "${text.substring(0, 50)}..."`);
    console.log(`Output path: ${outPath}`);

    try {
        const url = `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`;
        const response = await axios.post(url, {
            text,
            model_id: 'eleven_monolingual_v1',
            voice_settings: { stability: 0.5, similarity_boost: 0.5 },
        }, {
            headers: {
                'xi-api-key': ELEVENLABS_API_KEY,
                'Content-Type': 'application/json',
                'Accept': 'audio/mpeg',
            },
            responseType: 'arraybuffer',
        });

        const outputDir = path.dirname(outPath);
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }
        fs.writeFileSync(outPath, response.data);
        console.log(`Voiceover file created successfully at: ${outPath}`);
        return outPath;
    } catch (error) {
        console.error('Error generating voiceover:', error);
        if (axios.isAxiosError(error)) {
            console.error('Response status:', error.response?.status);
            // Try to decode the error response
            try {
                const errorData = JSON.parse(Buffer.from(error.response?.data || '').toString());
                console.error('Error details:', errorData);
            } catch (e) {
                console.error('Could not parse error response');
            }
        }
        throw error;
    }
}
