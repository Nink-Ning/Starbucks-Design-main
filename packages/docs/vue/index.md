---
layout: home

hero:
  name: 'Starbucks UI'
  text: ''
  tagline: 基于 Arco Design 的星巴克主题组件库，支持 React 和 Vue
  actions:
    - theme: brand
      text: 开始使用
      link: /guide/getting-started
    - theme: alt
      text: Vue 组件
      link: /components/general/button
---

<section class="home-section">
  <h2 class="home-section-title">选择你的技术栈</h2>
  <div class="home-stack-cards">
    <a
      class="home-stack-card"
      href="/kning/starbucks-design-main/docs/components/general/button"
      onclick="if (location.hostname === 'localhost' && location.port === '3001') { event.preventDefault(); location.href = 'http://localhost:3000/kning/starbucks-design-main/docs/components/general/button'; }"
    >
      <div class="home-stack-icon">⚛️</div>
      <div class="home-stack-title">React</div>
      <div class="home-stack-desc">
        @sbux/starbucks-design-react<br>
        基于 Arco Design Web React
      </div>
    </a>
    <a class="home-stack-card" href="./components/general/button.html">
      <div class="home-stack-icon">💚</div>
      <div class="home-stack-title">Vue</div>
      <div class="home-stack-desc">
        @sbux/starbucks-design-vue<br>
        基于 Arco Design Web Vue
      </div>
    </a>
  </div>
</section>

<section class="home-section home-section-muted">
  <h2 class="home-section-title">快速安装</h2>
  <div class="home-install-code">
    <div class="home-code-comment"># React</div>
    <div>npm i @sbux/starbucks-design-react</div>
    <div class="home-code-comment home-code-spaced"># Vue</div>
    <div>npm i @sbux/starbucks-design-vue</div>
  </div>
</section>

<section class="home-section">
  <h2 class="home-section-title">设计令牌 · 色板</h2>
  <div class="home-color-palette">
    <div class="home-color-swatch tone-light" style="background-color:#E6F7EE"><strong>50</strong><span>#E6F7EE</span></div>
    <div class="home-color-swatch tone-light" style="background-color:#B3E8D4"><strong>100</strong><span>#B3E8D4</span></div>
    <div class="home-color-swatch tone-light" style="background-color:#80D9BA"><strong>200</strong><span>#80D9BA</span></div>
    <div class="home-color-swatch tone-light" style="background-color:#4DCAA0"><strong>300</strong><span>#4DCAA0</span></div>
    <div class="home-color-swatch tone-light" style="background-color:#26BB86"><strong>400</strong><span>#26BB86</span></div>
    <div class="home-color-swatch" style="background-color:#00A66E"><strong>500</strong><span>#00A66E</span></div>
    <div class="home-color-swatch" style="background-color:#00754A"><strong>600</strong><span>#00754A</span></div>
    <div class="home-color-swatch" style="background-color:#005E3B"><strong>700</strong><span>#005E3B</span></div>
    <div class="home-color-swatch" style="background-color:#00472C"><strong>800</strong><span>#00472C</span></div>
    <div class="home-color-swatch" style="background-color:#00301D"><strong>900</strong><span>#00301D</span></div>
  </div>
</section>
