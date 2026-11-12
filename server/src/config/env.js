import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Resolves .env located in server/ directory regardless of where node was launched
dotenv.config({ path: path.resolve(__dirname, '../../.env') });
// Also fallback to root .env if present
dotenv.config();

export default process.env;

