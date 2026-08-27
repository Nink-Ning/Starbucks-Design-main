import runtimeCss from '../../../../../../../distribution/designkit-starter-v1/runtime/starbucks-react.css?raw';

export const prerender = true;

export function GET() {
  return new Response(runtimeCss, {
    headers: {
      'Content-Type': 'text/css; charset=utf-8',
    },
  });
}
