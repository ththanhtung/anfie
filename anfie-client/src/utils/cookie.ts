import { setCookie, getCookie, deleteCookie } from "cookies-next";
type TSetCookie = {
  name: string;
  value: string;
};
export const setDomainCookie = async ({ name, value }: TSetCookie) =>
  setCookie(name, value, {});
export const getCookieValue = ({ name }: Omit<TSetCookie, "value">) =>
  getCookie(name);
export const deleteCookieValue = ({ name }: Omit<TSetCookie, "value">) =>
  deleteCookie(name);
