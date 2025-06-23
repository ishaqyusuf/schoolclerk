import app from "@/api";
import { handle } from "hono/vercel";
export const GET = handle(app);
