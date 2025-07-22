import fs from 'fs';
import path from 'path';
import { google } from 'googleapis';
import {
    YOUTUBE_CLIENT_ID,
    YOUTUBE_CLIENT_SECRET,
    YOUTUBE_REDIRECT_URI,
    YOUTUBE_REFRESH_TOKEN,
} from '../config';

const youtube = google.youtube('v3');

export async function uploadToYouTube(videoPath: string, title: string, description: string) {
    const oauth2Client = new google.auth.OAuth2(
        YOUTUBE_CLIENT_ID,
        YOUTUBE_CLIENT_SECRET,
        YOUTUBE_REDIRECT_URI
    );
    oauth2Client.setCredentials({ refresh_token: YOUTUBE_REFRESH_TOKEN });

    const fileSize = fs.statSync(videoPath).size;
    const result = await youtube.videos.insert({
        auth: oauth2Client,
        part: ['snippet', 'status'],
        requestBody: {
            snippet: {
                title,
                description,
            },
            status: {
                privacyStatus: 'private',
            },
        },
        media: {
            body: fs.createReadStream(videoPath),
        },
    }, {
        // @ts-ignore
        maxBodyLength: Infinity,
        maxContentLength: Infinity,
        onUploadProgress: evt => {
            if (evt.bytesRead && fileSize) {
                const progress = (evt.bytesRead / fileSize) * 100;
                console.log(`Upload progress: ${progress.toFixed(2)}%`);
            }
        },
    });
    return (result as any).data;
}
