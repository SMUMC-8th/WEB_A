// src/components/ChatApp.tsx
import React, { useState } from 'react';
import ChatPanel from './ChatPanel';
import ChannelListPanel from '../components/ChannelListPanel';

const ChatApp: React.FC = () => {
  const [currentChannelUrl, setCurrentChannelUrl] = useState<string | null>(null);

  return (
    <div className="flex h-screen">
      <ChannelListPanel onChannelSelect={setCurrentChannelUrl} />
      <ChatPanel channelUrl={currentChannelUrl} />
    </div>
  );
};

export default ChatApp;
