// src/components/ChatApp.tsx
import React from 'react';
import { useParams } from 'react-router-dom';
import { Channel } from '@sendbird/uikit-react';

const ChatApp: React.FC = () => {
  const { channelUrl } = useParams<{ channelUrl: string }>();

  if (!channelUrl) {
    return <div>채널 URL이 없습니다. 채널을 선택해주세요.</div>;
  }

  return (
    <div className="h-full">
      <Channel channelUrl={channelUrl} />
    </div>
  );
};

export default ChatApp;
