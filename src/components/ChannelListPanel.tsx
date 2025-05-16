// src/components/ChannelListPanel.tsx
import React from 'react';
import { GroupChannelList } from '@sendbird/uikit-react';
import type { GroupChannel } from '@sendbird/chat/groupChannel';

interface Props {
  onChannelSelect: (url: string) => void;
}

const ChannelListPanel: React.FC<Props> = ({ onChannelSelect }) => {
  return (
    <div className="w-1/3 border-r border-gray-300 h-full">
      <GroupChannelList
        onChannelSelect={(channel: GroupChannel | null) => {
          if (channel?.url) {
            onChannelSelect(channel.url);
          }
        }}
      />
    </div>
  );
};

export default ChannelListPanel;
