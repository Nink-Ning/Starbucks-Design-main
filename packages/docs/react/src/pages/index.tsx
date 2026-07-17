import React, { useEffect } from 'react'
import Head from '@docusaurus/Head'
import Link from '@docusaurus/Link'
import useBaseUrl from '@docusaurus/useBaseUrl'
import Layout from '@theme/Layout'

export default function Home(): JSX.Element {
  const targetUrl = useBaseUrl('/docs/guide/getting-started')

  useEffect(() => {
    window.location.replace(targetUrl)
  }, [targetUrl])

  return (
    <Layout title="进入安装文档" description="Starbucks Design 安装文档">
      <Head>
        <meta httpEquiv="refresh" content={`0;url=${targetUrl}`} />
      </Head>
      <main
        style={{
          display: 'grid',
          minHeight: 'calc(100vh - var(--ifm-navbar-height))',
          placeItems: 'center',
          padding: 24,
          textAlign: 'center'
        }}
      >
        <div>
          <p style={{ marginBottom: 16 }}>正在进入安装文档...</p>
          <Link className="button button--primary" to="/docs/guide/getting-started">
            打开安装文档
          </Link>
        </div>
      </main>
    </Layout>
  )
}
