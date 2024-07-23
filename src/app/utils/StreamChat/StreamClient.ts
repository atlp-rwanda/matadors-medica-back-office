import { StreamChat } from 'stream-chat';

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;

export const StreamClient = StreamChat.getInstance(`${apiKey}`);