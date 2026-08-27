import landingSource from './designkit-landing.html?raw';

const linkTargets = [
  ['../../public/downloads/designkit-starter-v1-r2.zip', 'downloads/designkit-starter-v1-r2.zip'],
  ['/guide/product-manager', 'guide/ai-skills-releases/'],
  ['/guide/designer', 'guide/ai-skills-starters/'],
  ['/guide/developer', 'guide/ai-skills-developer/'],
  ['/guide/team-leader', 'guide/ai-skills-starters/'],
  ['/guide', 'guide/ai-skills-guide/'],
  ['/templates', 'templates/data-list/basic-list/'],
  ['/components', 'components/general/button/'],
  ['/skills', 'guide/ai-skills-guide/'],
  ['/download', 'guide/ai-skills-starters/'],
] as const;

const roleIconTargets = [
  ['./role-icons/product-manager.svg', 'landing/role-icons/product-manager.svg'],
  ['./role-icons/designer.svg', 'landing/role-icons/designer.svg'],
  ['./role-icons/frontend-developer.svg', 'landing/role-icons/frontend-developer.svg'],
  ['./role-icons/team-lead.svg', 'landing/role-icons/team-lead.svg'],
] as const;

function normalizeBaseUrl(baseUrl: string) {
  const withLeadingSlash = baseUrl.startsWith('/') ? baseUrl : `/${baseUrl}`;
  return withLeadingSlash.endsWith('/') ? withLeadingSlash : `${withLeadingSlash}/`;
}

export function renderLandingPage(baseUrl: string) {
  const base = normalizeBaseUrl(baseUrl || '/');
  let html = landingSource
    .replaceAll('./logo.svg', `${base}landing/starbucks-wordmark.svg`)
    .replaceAll(
      './designkit-landing-assets/nink-avatar.jpg',
      `${base}landing/nink-avatar.jpg`,
    )
    .replaceAll(
      'designkit-landing-assets/nink-avatar.jpg',
      `${base}landing/nink-avatar.jpg`,
    )
    .replace(
      /\s*<link rel="stylesheet" href="\.\/designkit-landing-assets\/real-components\/dist\/designkit-input-demo\.css">/,
      '',
    )
    .replace(
      /\s*<script src="\.\/designkit-landing-assets\/real-components\/dist\/designkit-input-demo\.js" defer><\/script>/,
      '',
    );

  for (const [source, target] of linkTargets) {
    html = html.replaceAll(`href="${source}"`, `href="${base}${target}"`);
  }

  for (const [source, target] of roleIconTargets) {
    html = html.replaceAll(`src="${source}"`, `src="${base}${target}"`);
  }

  return html;
}
