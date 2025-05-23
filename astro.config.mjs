import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import vue from "@astrojs/vue";
import preact from '@astrojs/preact';


// https://astro.build/config
export default defineConfig({
  integrations: [
    tailwind(),
    vue(),
    preact({
      include: ['**/preact/*', 'src/components/preact/*'],
    }),
  ]
});