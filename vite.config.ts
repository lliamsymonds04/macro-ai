import { reactRouter } from "@react-router/dev/vite";
import autoprefixer from "autoprefixer";
import tailwindcss from "tailwindcss";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import netlifyPlugin from "@netlify/vite-plugin-react-router";

export default defineConfig({
  css: {
    postcss: {
      plugins: [tailwindcss, autoprefixer],
    },
  },
  plugins: [reactRouter(), tsconfigPaths(), netlifyPlugin()],
  // server: {
  //   host: '0.0.0.0',  // Or use your local IP, e.g., '192.168.0.2'
  //   port: 3000,  // You can choose any available port
  //   https: {
  //     key: fs.readFileSync('./path/to/private-key.pem'),
  //     cert: fs.readFileSync('./path/to/cert.pem'),
  //   },
  // },
});
