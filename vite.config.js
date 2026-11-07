import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // The prerender bundle (scripts/prerender.js) includes its dependencies:
  // react-icons 4 ships ESM that plain Node can't import.
  ssr: { noExternal: true },
});
