const API_SERVER_DOMAIN = 'https://api-smp.shop';

export async function loginAPI(loginId: string, password: string) {
  const loginResponse = await fetch(`${API_SERVER_DOMAIN}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ loginId, password }),
  });

  const data = await loginResponse.json();
  console.log(' 서버 응답:', data); // 여기에 실제 구조 찍힘

  if (!loginResponse.ok || !data.isSuccess) {
    throw new Error(data.message || 'Login failed');
  }

  return data.result;
}

export default async function SignupAPI(formData: FormData) {
  formData.forEach((value, key) => {
    console.log(`[FormData] ${key}: ${value}`);
  });

  const signupResponse = await fetch(`${API_SERVER_DOMAIN}/api/auth/signup`, {
    method: 'POST',
    body: formData,
  });

  if (!signupResponse.ok) {
    const errorText = await signupResponse.text();
    throw new Error(errorText || 'Signup failed');
  }

  return await signupResponse.json();
}
