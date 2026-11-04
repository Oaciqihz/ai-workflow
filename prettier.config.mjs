/** @type {import("prettier").Config} */
const config = {
  // 与项目现有代码风格保持一致：双引号 + 分号 + 2 空格缩进
  semi: true,
  singleQuote: false,
  tabWidth: 2,
  useTabs: false,
  printWidth: 80,
  trailingComma: "all",
  arrowParens: "always",
  bracketSpacing: true,
  endOfLine: "lf",
};

export default config;
