import SBProvider from '@sendbird/uikit-react/SendbirdProvider';
import '@sendbird/uikit-react/dist/index.css';

function SendBirdChat() {
  return (
    <div className="App">
      <SBProvider
        appId="B73D82D8-F243-43E5-9379-FAFB5F1FC574"
        userId="jyujin507"
        accessToken="a56a1c433772d786a4940a9d39b122e571d6d55a"
        nickname="유진"
      >
      </SBProvider>
    </div>
  );
}

export default SendBirdChat;
