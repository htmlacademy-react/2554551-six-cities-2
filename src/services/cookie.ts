import { CookieOptions } from '../lib/types/api';

const TOKEN_NAME = 'authToken';

export const getCookie = (): string | undefined => {
  const matches = document.cookie.match(
    new RegExp(
      `(?:^|; )${TOKEN_NAME.replace(/([.$?*|{}()[\]\\/+^])/g, '\\$1')}=([^;]*)`
    )
  );

  return matches ? decodeURIComponent(matches[1]) : undefined;
};

export const setCookie = (token: string, options?: CookieOptions): void => {
  let updatedCookie = `${encodeURIComponent(TOKEN_NAME)}=${encodeURIComponent(
    token
  )}`;

  if (options) {
    let optionKey: keyof CookieOptions;

    for (optionKey in options) {
      updatedCookie += `; ${optionKey}=${options[optionKey]}`;
    }
  }

  document.cookie = updatedCookie;
};

/** Удаление куки
 * @param name имя куки
 */
export const deleteCookie = (): void => {
  setCookie('', {
    'max-age': -1,
  });
};
