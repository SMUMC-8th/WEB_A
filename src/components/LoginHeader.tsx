export default function LoginHeader() {
  return (
    <>
      <div
        style={{
          position: 'absolute',
          top: '60px',
          left: '50%',
          transform: 'translate(-50%, 0)',
          width: '100%',
          maxWidth: '1000px',
          display: 'flex',
          justifyContent: 'center',
          zIndex: '-10',
        }}
      >
        <div
          style={{
            width: '100%',
            maxWidth: '450px',
            display: 'flex',
            justifyContent: 'space-between',
            zIndex: '-10',
          }}
        >
          <div
            style={{
              marginTop: '20px',
              width: '50%',
              height: '80px',
              borderRadius: '1171px',
              background: '#297FB8',
              filter: 'blur(110px)',
            }}
          />
          <div
            style={{
              width: '50%',
              height: '80px',
              borderRadius: '1171px',
              background: '#2CC295',
              filter: 'blur(110px)',
            }}
          />
        </div>
      </div>

      <div style={{ maxWidth: '460px', margin: '25vh auto' }}>
        <div style={{ padding: '0 20px', marginBottom: '100px' }}>
          <img src="/img/main_logo_neon.png" alt="logo" style={{ width: '100%' }} />
        </div>
      </div>
    </>
  );
}
