// src/components/ChatPanel.tsx
import React from 'react';
import { GroupChannel } from '@sendbird/uikit-react/GroupChannel';

interface Props {
  channelUrl: string | null;
}

const ChatPanel: React.FC<Props> = ({ channelUrl }) => {
  if (!channelUrl) {
    return (
      <div className="w-2/3 flex items-center justify-center">
        <p className="text-gray-500">채널을 선택해주세요.</p>
      </div>
    );
  }

  return (
    <div className="w-2/3">
      <GroupChannel channelUrl={channelUrl} />
    </div>
  );
};

export default ChatPanel;
