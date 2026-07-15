import React from 'react'
import Layout from '@theme/Layout'
import Link from '@docusaurus/Link'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import styles from './index.module.css'

const GREEN_SCALE = [
  { name: '50', hex: '#E6F7EE' },
  { name: '100', hex: '#B3E8D4' },
  { name: '200', hex: '#80D9BA' },
  { name: '300', hex: '#4DCAA0' },
  { name: '400', hex: '#26BB86' },
  { name: '500', hex: '#00A66E' },
  { name: '600', hex: '#00754A' },
  { name: '700', hex: '#005E3B' },
  { name: '800', hex: '#00472C' },
  { name: '900', hex: '#00301D' }
]

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext()
  const { baseUrl } = siteConfig

  return (
    <Layout title="Starbucks UI" description="基于 Arco Design 的星巴克主题组件库">
      {/* Hero */}
      <header className={styles.hero}>
        <h1 className={styles.heroTitle}>Starbucks UI</h1>
        <p className={styles.heroSubtitle}>基于 Arco Design 的星巴克主题组件库，支持 React 和 Vue</p>
        <div className={styles.heroButtons}>
          <Link className={styles.heroButtonPrimary} to="/docs/guide/getting-started">
            开始使用
          </Link>
          <Link className={styles.heroButtonSecondary} to="/docs/components/general/button">
            React 组件
          </Link>
        </div>
      </header>

      {/* Tech Stack Cards */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>选择你的技术栈</h2>
        <div className={styles.cards}>
          <Link className={styles.card} to="/docs/components/general/button">
            <div className={styles.cardIcon}>⚛️</div>
            <div className={styles.cardTitle}>React</div>
            <div className={styles.cardDesc}>
              @sbux/starbucks-design-react
              <br />
              基于 Arco Design Web React
            </div>
          </Link>
          <a className={styles.card} href={`${baseUrl}vue/`}>
            <div className={styles.cardIcon}>💚</div>
            <div className={styles.cardTitle}>Vue</div>
            <div className={styles.cardDesc}>
              @sbux/starbucks-design-vue
              <br />
              基于 Arco Design Web Vue
            </div>
          </a>
        </div>
      </section>

      {/* Quick Install */}
      <section className={styles.section} style={{ background: 'var(--ifm-color-emphasis-100)' }}>
        <h2 className={styles.sectionTitle}>快速安装</h2>
        <div className={styles.installCode}>
          <div style={{ marginBottom: '0.5rem', color: 'var(--ifm-color-emphasis-500)' }}># React</div>
          <div>npm i @sbux/starbucks-design-react</div>
          <div style={{ margin: '1rem 0 0.5rem', color: 'var(--ifm-color-emphasis-500)' }}># Vue</div>
          <div>npm i @sbux/starbucks-design-vue</div>
        </div>
      </section>

      {/* Color Palette Preview */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>设计令牌 · 色板</h2>
        <div className={styles.colorPalette}>
          {GREEN_SCALE.map((c) => (
            <div
              key={c.name}
              className={styles.colorSwatch}
              style={{
                backgroundColor: c.hex,
                color: parseInt(c.name) > 400 ? 'white' : '#333'
              }}
            >
              <div style={{ fontSize: '1.1rem', fontWeight: 700 }}>{c.name}</div>
              <div style={{ marginTop: '0.25rem' }}>{c.hex}</div>
            </div>
          ))}
        </div>
      </section>
    </Layout>
  )
}
