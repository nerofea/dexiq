import path from 'path';
import { getDataOracleInput } from './agents/data-oracle';
import { generateStory } from './agents/generate-story';
import { generateVoiceover } from './agents/generate-voiceover';
import { buildVideo } from './agents/video-builder';
import { uploadToYouTube } from './agents/youtube-uploader';

function logStep(step: string) {
    console.log(`[${new Date().toISOString()}] ${step}`);
}

async function main() {
    try {
        logStep('Getting sample input from data oracle...');
        const input = getDataOracleInput();
        logStep('Generating story with GPT-4...');
        const story = await generateStory(input);
        console.log('Generated Story:\n', story);

        logStep('Generating voiceover with ElevenLabs...');
        const audioPath = path.join(__dirname, 'output', 'voiceover.mp3');
        try {
            await generateVoiceover(story, audioPath);
        } catch (err) {
            console.error('Voiceover generation failed:', err);
        }
        logStep(`Voiceover saved to ${audioPath}`);

        logStep('Building video with FFmpeg...');
        const imagePath = path.join(__dirname, 'assets', 'placeholder.png');
        const videoPath = path.join(__dirname, 'output', 'final.mp4');
        await buildVideo({ imagePath, audioPath, outputPath: videoPath });
        logStep(`Video created at ${videoPath}`);

        // logStep('Uploading video to YouTube...');
        // const title = 'Crypto News Update';
        // const description = story;
        // const uploadResult = await uploadToYouTube(videoPath, title, description);
        // logStep('Video uploaded to YouTube!');
        // console.log('YouTube Upload Result:', uploadResult);
    } catch (err) {
        console.error('Pipeline failed:', err);
    }
}

main();