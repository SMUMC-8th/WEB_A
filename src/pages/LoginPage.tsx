import Header from '../components/Header';
import LoginForm from '../components/LoginForm';
import LoginFooter from '../components/LoginFooter';

export default function LoginPage() {
  return (
    <div>
      <Header />

      <div style={{ backgroundColor: 'white', padding: '10px' }}>
        <LoginForm />
      </div>

      <LoginFooter />
    </div>
  );
}
