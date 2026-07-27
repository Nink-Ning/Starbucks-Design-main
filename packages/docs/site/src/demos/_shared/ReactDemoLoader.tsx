import { Component, lazy, Suspense } from 'react';
import type { ErrorInfo, ReactNode } from 'react';

interface Props {
  /** Demo name relative to src/demos, e.g. "button/basic" */
  name: string;
}

// Non-eager glob: each entry is a dynamic import() loader, code-split per demo.
// This lets the actual demo module resolution happen client-side (inside this
// island's own hydration bundle) instead of requiring Astro's compiler to
// statically match a `client:only` tag to a top-level import statement, which
// is impossible when the demo path is only known at runtime via `name`.
const modules = import.meta.glob<{ default: any }>('../**/*.tsx');

// Error boundary so one broken demo degrades to a note instead of throwing up
// the tree and blanking the whole React island (and, with it, the page region).
// Catches both render-time throws in the demo and rejected lazy() load promises
// (React surfaces a lazy loader rejection as an error to the nearest boundary).
class DemoErrorBoundary extends Component<
  { name: string; children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error(`[demo] React demo "${this.props.name}" failed:`, error, info);
  }
  render() {
    if (this.state.failed) {
      return <div className="sb-demo-error">该示例渲染失败</div>;
    }
    return this.props.children;
  }
}

export default function ReactDemoLoader({ name }: Props) {
  const key = `../${name}.tsx`;
  const loader = modules[key];
  if (!loader) return null;
  const LazyDemo = lazy(loader);
  return (
    <DemoErrorBoundary name={name}>
      <Suspense fallback={null}>
        <LazyDemo />
      </Suspense>
    </DemoErrorBoundary>
  );
}
