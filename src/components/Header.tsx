export default function Header() {
  return (
    <header
      style={{
        paddingTop: 'env(safe-area-inset-top)',
        backgroundColor: 'white',
        padding: '160px 0 20px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <img
        src="/image/SMP.png"
        alt="사이트 로고"
        style={{ height: '80px', objectFit: 'contain' }} // 필요 시 너비/높이 조정 가능
      />
    </header>
  );
}
