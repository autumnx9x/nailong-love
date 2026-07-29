import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import fs from 'fs'
import path from 'path'

function preloadImagesPlugin() {
  return {
    name: 'preload-images',
    closeBundle() {
      const distDir = path.resolve('dist')
      const htmlPath = path.join(distDir, 'index.html')
      const assetsDir = path.join(distDir, 'assets')

      if (!fs.existsSync(htmlPath) || !fs.existsSync(assetsDir)) return

      // 找到所有 PNG 资源
      const files = fs.readdirSync(assetsDir)
      const heroPng = files.find((f) => f.startsWith('hero-') && f.endsWith('.png'))
      const idlePngs = files.filter((f) => f.startsWith('idle-') && f.endsWith('.png'))

      // 构建 preload / prefetch 标签
      const preloadTags = []
      // hero.png 高优先级预加载
      if (heroPng) {
        preloadTags.push(
          `<link rel="preload" as="image" href="/nailong-love/assets/${heroPng}" fetchpriority="high">`
        )
      }
      // 四个 idle.png 低优先级预取
      idlePngs.forEach((png) => {
        preloadTags.push(
          `<link rel="prefetch" as="image" href="/nailong-love/assets/${png}">`
        )
      })

      if (preloadTags.length === 0) return

      // 注入到 </head> 之前
      let html = fs.readFileSync(htmlPath, 'utf-8')
      html = html.replace('</head>', `  ${preloadTags.join('\n  ')}\n</head>`)
      fs.writeFileSync(htmlPath, html)

      console.log(`  ✓ 注入 ${preloadTags.length} 条图片预加载 (1 preload + ${idlePngs.length} prefetch)`)
    },
  }
}

export default defineConfig({
  base: '/nailong-love/',
  plugins: [react(), tailwindcss(), preloadImagesPlugin()],
})
