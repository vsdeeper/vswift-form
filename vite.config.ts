import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import ElementPlus from 'unplugin-element-plus/vite'
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'
import Inspect from 'vite-plugin-inspect'
import { globSync } from 'glob'

const genEntry = () => {
  try {
    const matchFiles = globSync('src/components/vs-*/index.ts')
    const entryArr = matchFiles.map(filePath => ({
      [filePath.split('/index.ts')[0].split('src/components/')[1]]: filePath,
    }))
    return Object.assign({ index: 'src/components/index.ts' }, ...entryArr)
  } catch (error) {
    console.error(error)
  }
}

// https://vitejs.dev/config/
export default defineConfig(() => {
  const { IS_BUILD_LIB } = process.env

  // 优化element-plus预加载
  const matchElementPlusPath = globSync('node_modules/element-plus/es/components/*/style')
  const optimizeDepsElementPlusIncludes = [
    ...matchElementPlusPath.map(path => `${path.replace('node_modules/', '')}/index`),
    ...matchElementPlusPath.map(path => `${path.replace('node_modules/', '')}/css`),
  ]
  return {
    plugins: [
      vue(),
      cssInjectedByJsPlugin(),
      AutoImport({
        imports: ['vue'],
        dts: './types/auto-imports.d.ts',
        resolvers: [
          ElementPlusResolver({
            importStyle: 'sass',
          }),
        ],
      }),
      Components({
        dirs: ['src/components', 'src/test'],
        dts: './types/components.d.ts',
        resolvers: [
          ElementPlusResolver({
            importStyle: 'sass',
          }),
        ],
      }),
      ElementPlus({
        ignoreComponents: ['AutoResizer'], // 解决 Table-v2 AutoResizer with manual import: failed to resolve css file
      }),
      Inspect(),
    ],
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler',
          // element-plus自定义命名空间设置
          additionalData: `@use "@/styles/element/index.scss" as *;`,
        },
      },
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    optimizeDeps: { include: [...optimizeDepsElementPlusIncludes] },
    build:
      IS_BUILD_LIB === 'true'
        ? {
            emptyOutDir: false,
            copyPublicDir: false,
            lib: {
              entry: genEntry(),
              fileName: '[name]',
            },
            rollupOptions: {
              external: ['vue', '@element-plus/icons-vue', 'element-plus', 'radash', 'nanoid'],
            },
          }
        : undefined,
  }
})
