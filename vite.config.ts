import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Ensure Vite always loads and inlines our public env vars.
  // This prevents runtime issues where `import.meta.env.VITE_*` can be undefined
  // in some preview/build environments.
  const env = loadEnv(mode, process.cwd(), "VITE_");

  return {
    server: {
      host: "::",
      port: 8080,
      hmr: {
        overlay: false,
      },
    },
    define: {
      "import.meta.env.VITE_SUPABASE_URL": JSON.stringify(env.VITE_SUPABASE_URL ?? ""),
      "import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY": JSON.stringify(
        env.VITE_SUPABASE_PUBLISHABLE_KEY ?? ""
      ),
      "import.meta.env.VITE_SUPABASE_PROJECT_ID": JSON.stringify(env.VITE_SUPABASE_PROJECT_ID ?? ""),
    },
    plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
