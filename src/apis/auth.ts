import axios from 'axios';
import { BASE_URL } from '../apis/api';

/**
 * 로그인 요청 함수
 */
export async function loginAPI(loginId: string, password: string) {
  try {
    const response = await axios.post(
      `${BASE_URL}/api/auth/login`,
      {
        loginId,
        password,
      },
      {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      },
    );

    const data = response.data;

    if (!data.isSuccess) {
      throw new Error(data.message || 'Login failed');
    }

    return data.result;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const msg = (error.response?.data as { message?: string })?.message;
      throw new Error(msg || 'Login request failed');
    }

    if (error instanceof Error) {
      throw new Error(error.message);
    }

    throw new Error('Unknown error during login');
  }
}

/**
 * 회원가입 요청 함수
 */
export async function signupAPI(formData: FormData) {
  try {
    const response = await axios.post(`${BASE_URL}/api/auth/signup`, formData, {
      withCredentials: true,
    });

    const data = response.data;

    if (!data.isSuccess) {
      throw new Error(data.message || 'Signup failed');
    }

    return data.result;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const msg = (error.response?.data as { message?: string })?.message;
      throw new Error(msg || 'Signup request failed');
    }

    if (error instanceof Error) {
      throw new Error(error.message);
    }

    throw new Error('Unknown error during signup');
  }
}

export default signupAPI;
