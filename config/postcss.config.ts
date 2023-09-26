import type { Config } from "postcss-load-config";

export default {
  plugins: {
    tailwindcss: { config: "config/tailwind.config.ts" },
    autoprefixer: {},
    cssnano: {},
  },
} satisfies Config;
