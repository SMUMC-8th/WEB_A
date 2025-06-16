// import axiosInstance from './axios';

/**
 * 프로필 이미지 업로드 API
 */
// export const uploadProfileImage = async (formData: FormData) => {
//   console.log(1);
//   const response = await axiosInstance.post('/api/members/profile-image', formData);
//   return response.data;
// };

export const uploadProfileImage = async (formData: FormData) => {
  console.log(1);

  const response = await fetch('https://api-smp.shop' + '', {
    method: 'PATCH',
    headers: {},
    body: formData,
  }).then((response) => {
    if (!response) {
      throw new Error('Failed to post');
    }
    return response.json();
  });

  return response.data;
};
