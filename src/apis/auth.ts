import axios from 'axios';
import axiosInstance from './axios';

/**
 * 로그인 API
 */
export async function loginAPI(loginId: string, password: string) {
  try {
    const res = await axiosInstance.post('/api/auth/login', {
      loginId,
      password,
    });

    const data = res.data;

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
 * 회원가입 API
 */
export async function signupAPI(formData: FormData) {
  try {
    const res = await axiosInstance.post('/api/auth/signup', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    const data = res.data;

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

/**
 * 아이디 중복 확인 API
 */
export async function checkIdAPI(loginId: string) {
  try {
    const res = await axiosInstance.get(`/api/members/check-id`, {
      params: { id: loginId },
    });

    const data = res.data;

    if (!data.isSuccess) {
      throw new Error(data.message || 'ID check failed');
    }

    return data.result;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const msg = (error.response?.data as { message?: string })?.message;
      throw new Error(msg || 'ID check request failed');
    }
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error('Unknown error during ID check');
  }
}

export async function checkNicknameAPI(nickname: string) {
  try {
    const res = await axiosInstance.get(`/api/members/check-nickname`, {
      params: { nickname: nickname },
    });

    const data = res.data;

    if (!data.isSuccess) {
      throw new Error(data.message || 'nickname 중복 확인 실패');
    }

    return data.result;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const msg = (error.response?.data as { message?: string })?.message;
      throw new Error(msg || 'nickname 중복 확인 요청 실패');
    }
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error('nickname 중복 확인 중 알 수 없는 오류 발생');
  }
}

/**
 * auth API 객체
 */
const AuthAPI = {
  login: loginAPI,
  signUp: signupAPI,
  checkId: checkIdAPI,
  checkNickname: checkNicknameAPI,
};

export default AuthAPI;
