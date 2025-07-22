import ffmpeg from 'fluent-ffmpeg';
import { VideoBuildInput } from '../types';

export function buildVideo({ imagePath, audioPath, outputPath }: VideoBuildInput): Promise<void> {
    return new Promise((resolve, reject) => {
        ffmpeg()
            .addInput(imagePath)
            .loop(60)
            .addInput(audioPath)
            .outputOptions([
                '-c:v libx264',
                '-tune stillimage',
                '-c:a aac',
                '-b:a 192k',
                '-pix_fmt yuv420p',
                '-shortest',
            ])
            .save(outputPath)
            .on('end', (stdout, stderr) => resolve())
            .on('error', reject);
    });
}
