export { COOKIE_NAME, ONE_YEAR_MS } from "@shared/const";

// Clerk 登入 URL - 使用 Clerk 的 hosted pages
export const getLoginUrl = () => {
  // Return Clerk's sign-in URL or a placeholder
  // This will be handled by Clerk's SignIn component
  return "/sign-in";
};

// Clerk 登出 URL
export const getLogoutUrl = () => {
  return "/sign-out";
};
