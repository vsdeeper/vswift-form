import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import ElementPlus from 'unplugin-element-plus/vite'
import IconsResolver from 'unplugin-icons/resolver'
import Icons from 'unplugin-icons/vite'
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'
import Inspect from 'vite-plugin-inspect'
import { globSync } from 'glob'

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
          // Auto import icon components
          // 自动导入图标组件
          IconsResolver({
            prefix: 'Icon',
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
          // Auto register icon components
          // 自动注册图标组件
          IconsResolver({
            enabledCollections: ['ep'],
          }),
        ],
      }),
      ElementPlus({
        ignoreComponents: ['AutoResizer'], // 解决 Table-v2 AutoResizer with manual import: failed to resolve css file
      }),
      Icons({
        autoInstall: true,
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
            sourcemap: true,
            commonjsOptions: { esmExternals: true },
            lib: {
              entry: 'src/components/index.ts',
              name: 'VswiftForm',
              fileName: 'index',
            },
            rollupOptions: {
              external: ['vue', '@element-plus/icons-vue', 'element-plus', 'radash', 'nanoid'],
              output: {
                globals: {
                  vue: 'Vue',
                  'element-plus': 'ElementPlus',
                  '@element-plus/icons-vue': 'IconsVue',
                  radash: 'Radash',
                  nanoid: 'Nanoid',
                },
              },
            },
          }
        : undefined,
  }
})
