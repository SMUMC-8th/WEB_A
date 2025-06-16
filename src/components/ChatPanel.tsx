// src/components/ChatPanel.tsx
import React from 'react';
import { GroupChannel } from '@sendbird/uikit-react/GroupChannel';

interface Props {
  channelUrl: string | null;
}

const ChatPanel: React.FC<Props> = ({ channelUrl }) => {
  if (!channelUrl) {
    return (
      <div className="flex items-center justify-center">
        <p className="text-black">채널을 선택해주세요.</p>
      </div>
    );
  }

  return (
    <div className="fixed w-full h-[85vh] mt-[90px]">
      <GroupChannel channelUrl={channelUrl} />
    </div>
  );
};

export default ChatPanel;
