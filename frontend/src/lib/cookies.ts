import Cookies from 'universal-cookie';

const cookies = new Cookies();

export const getToken = (): string => cookies.get('@kel4/token');

export const setToken = (token: string) => {
  cookies.set('@kel4/token', token, { path: '/' });
};

export const removeToken = () => cookies.remove('@kel4/token', { path: '/' });
