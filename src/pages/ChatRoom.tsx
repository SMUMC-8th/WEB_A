import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  MessageModel,
} from '@chatscope/chat-ui-kit-react';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';

const ChatRoom = () => {
  const incomingMessage: MessageModel = {
    message: '안녕 👋',
    direction: 'incoming',
    position: 'single',
    sentTime: 'just now',
    sender: '상대방',
  };

  const outgoingMessage: MessageModel = {
    message: '나도 안녕 😄',
    direction: 'outgoing',
    position: 'single',
    sentTime: 'just now',
    sender: '나',
  };

  return (
    <div className="flex items-center justify-center">
      <div className="w-full max-w-3xl overflow-hidden border border-gray-200 bg-white">
        <MainContainer>
          <ChatContainer>
            <MessageList
              typingIndicator={
                <span className="text-gray-400 text-sm px-4">상대방이 입력 중...</span>
              }
            >
              <Message model={incomingMessage} />
              <Message model={outgoingMessage} />
            </MessageList>
            <MessageInput placeholder="메시지를 입력하세요..." attachButton={false} />
          </ChatContainer>
        </MainContainer>
      </div>
    </div>
  );
};

export default ChatRoom;
