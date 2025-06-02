export default function LoginCompletePage() {
  return (
    <div
      style={{
        padding: '25px',
        maxWidth: '480px',
        margin: '0 auto',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        boxSizing: 'border-box',
      }}
    >
      <img src="/image/SMP.png" alt="SMP 로고" style={{ width: '120px', marginBottom: '40px' }} />

      <p style={{ fontSize: '20px', fontWeight: 600 }}>로그인 완료!</p>
    </div>
  );
}
