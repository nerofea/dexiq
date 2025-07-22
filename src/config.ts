import dotenv from 'dotenv';
dotenv.config();

export const OPENAI_API_KEY = process.env.OPENAI_API_KEY || '';
export const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY || '';
export const YOUTUBE_CLIENT_ID = process.env.YOUTUBE_CLIENT_ID || '';
export const YOUTUBE_CLIENT_SECRET = process.env.YOUTUBE_CLIENT_SECRET || '';
export const YOUTUBE_REDIRECT_URI = process.env.YOUTUBE_REDIRECT_URI || '';
export const YOUTUBE_REFRESH_TOKEN = process.env.YOUTUBE_REFRESH_TOKEN || '';
