// JSON-LD for the new site. The home page owns the one Person entity; case studies point at it by @id.
const site = 'https://www.denusklo.com';
const personId = `${site}/#person`;

export const homeSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': personId,
      name: 'Den Kong',
      alternateName: ['Den', 'Kong Chak Sung', 'Chak Sung Kong'],
      url: `${site}/`,
      sameAs: ['https://github.com/denusklo', 'https://www.linkedin.com/in/chak-sung-kong/'],
      email: 'mailto:denusklo@gmail.com',
    },
    {
      '@type': 'WebSite',
      '@id': `${site}/#website`,
      name: 'Den Kong',
      url: `${site}/`,
      author: { '@id': personId },
    },
  ],
};

export const caseStudySchema = ({ name, description, path, image, repo }: { name: string; description: string; path: string; image: string; repo: string }) => ({
  '@context': 'https://schema.org',
  '@type': 'SoftwareSourceCode',
  name,
  description,
  url: `${site}${path}`,
  image: `${site}${image}`,
  codeRepository: repo,
  author: { '@id': personId },
});
