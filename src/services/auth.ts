const API_SERVER_DOMAIN = 'https://api-smp.shop';

// signup.tsx
export default async function SignupAPI(formData) {
  formData.forEach((value, key) => {
    //일단무시해도됨 오류..
    console.log(key, value);
  });

  try {
    // 서버에 회원가입 요청을 보냅니다.
    const signupResponse = await fetch(API_SERVER_DOMAIN + '/api/auth/signup', {
      method: 'POST',
      body: formData,
    });

    if (!signupResponse.ok) {
      throw new Error('Signup failed');
    }
    // 회원가입이 성공하면 다음 동작을 수행합니다.
    alert('회원가입에 성공하였습니다.');
    window.location.href = '/profilephoto';
  } catch (error) {
    alert('회원가입 중 오류가 발생했습니다: ' + error);
  }
}
