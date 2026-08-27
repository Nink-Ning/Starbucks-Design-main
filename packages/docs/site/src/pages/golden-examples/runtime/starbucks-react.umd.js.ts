import runtimeJs from '../../../../../../../distribution/designkit-starter-v1/runtime/starbucks-react.umd.js?raw';

export const prerender = true;

export function GET() {
  return new Response(runtimeJs, {
    headers: {
      'Content-Type': 'text/javascript; charset=utf-8',
    },
  });
}
