import LoginForm from '../../components/LoginForm';
import LoginFooter from '../../components/LoginFooter';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-[#f9f9f9] px-6 pt-60">
      {/* SMP 로고 */}
      <img src="/image/SMP.png" alt="SMP 로고" className="h-20 mb-8 object-contain" />

      <div className="w-full max-w-sm">
        <LoginForm />
      </div>

      {/* 하단 버튼들 */}
      <div className="w-full max-w-sm mt-6">
        <LoginFooter />
      </div>
    </div>
  );
}
