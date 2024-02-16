import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "unit vitest",
  description: "单元测试",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Home", link: "/" },
      { text: "Examples", link: "/markdown-examples" },
    ],

    sidebar: [
      {
        text: "why",
        items: [
          { text: "为什么要写单元测试", link: "/why/why" },
          { text: "单元测试的定义", link: "/why/what" },
          { text: "单元测试的时机", link: "/why/when" },
          { text: "不写测试的原因", link: "/why/whyNotTest" },
        ],
      },
      {
        text: "how",
        items: [
          { text: "手动和自动的区别", link: "/what/howtodo" },
          { text: "使用测试框架", link: "/what/instrument" },
          { text: "Vitest API", link: "/what/vitest-api" },
          { text: "Vitest Debug", link: "/what/vitest-debug" },
          { text: "Mini Vitest API", link: "/what/mini-vitest" },
          { text: "Vitest & Jest", link: "/what/vitestandjest" },
        ],
      },
      {
        text: '测试四部曲',
        items: [
          { text: '准备测试数据', link: '/how/to-created' },
          { text: '后门测试', link: '/how/backdoor' },
          { text: '最小数据准备原则', link: '/how/minimum' },
          { text: '间接输入', link: '/how/indirect' },
        ]
      }
    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/vuejs/vitepress" },
    ],
  },
});
