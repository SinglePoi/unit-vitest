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
        text: "理论",
        items: [
          { text: "为什么要写单元测试", link: "/theory/why" },
          { text: "单元测试的定义", link: "/theory/what" },
          { text: "单元测试的时机", link: "/theory/when" },
        ],
      },
    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/vuejs/vitepress" },
    ],
  },
});
