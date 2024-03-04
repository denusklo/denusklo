import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import preact from "@astrojs/preact";
import react from '@astrojs/react';
import vue from "@astrojs/vue";


// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), preact(), vue(), react()]
});