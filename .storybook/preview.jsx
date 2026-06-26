/** @type { import('@storybook/react-vite').Preview } */
const preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: "todo",
    },
  },
};
import "../src/index.css";
//      ↑ 注意路径:preview.ts 在 .storybook/ 文件夹,
//        index.css 在 src/ → 要先出去(../)再进 src/

export default preview;
