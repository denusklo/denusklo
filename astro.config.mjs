import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import vue from "@astrojs/vue";
import preact from '@astrojs/preact';
import sitemap from '@astrojs/sitemap';


// https://astro.build/config
export default defineConfig({
  // SEO: Your site URL is required for sitemap generation and canonical URLs
  site: 'https://www.denusklo.com',
  integrations: [
    // Base styles are imported by BaseLayout so the new portfolio pages stay free of Tailwind's reset.
    tailwind({ applyBaseStyles: false }),
    vue(),
    preact({
      include: ['**/preact/*', 'src/components/preact/*'],
    }),
    // SEO: Automatically generates sitemap.xml at build time
    sitemap(),
  ]
});