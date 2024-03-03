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
          { text: '程序的间接输入（一）', link: '/how/indirect' },
          { text: '程序的间接输入（二）', link: '/how/indirect2' },
          { text: '程序的间接输入（三）', link: '/how/indirect3' },
          { text: '程序的间接输入（四）', link: '/how/indirect4' },
        ]
      },
      {
        text: '验证测试',
        items: [
          { text: '状态验证', link: '/expect/status' },
          { text: '行为验证', link: '/expect/action' },
          { text: '验证目标', link: '/expect/target' },
          { text: '可预测性', link: '/expect/predictability' },
          { text: '快速反馈', link: '/expect/quest' },
        ]
      },
      {
        text: '第三方库',
        items: [
          { text: 'flush-promises', link: '/npm/flush-promises' },
        ]
      }
    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/vuejs/vitepress" },
    ],
  },
});
