// src/components/ChannelListPanel.tsx
import React, { useEffect, useState } from 'react';
import {
  GroupChannel,
  GroupChannelFilter,
  GroupChannelCollection,
} from '@sendbird/chat/groupChannel';
import { SendbirdChat } from '@sendbird/uikit-react'; // 채팅 컴포넌트는 SDK 버전에 따라 다름
import { useSendbirdStateContext } from '@sendbird/uikit-react/useSendbirdStateContext';
import { SendbirdProvider } from '@sendbird/uikit-react/SendbirdProvider';

interface ChannelListPanelProps {
  onChannelSelect: (channelUrl: string) => void;
}

const ChannelListPanel: React.FC<ChannelListPanelProps> = ({ onChannelSelect }) => {
  const [channels, setChannels] = useState<GroupChannel[]>([]);
  const sb = useSendbirdStateContext()?.stores?.sdkStore?.sdk;

  useEffect(() => {
    if (!sb) return;
    const channelCollection = sb.groupChannel.createGroupChannelCollection({
      filter: GroupChannelFilter.ALL,
      order: 'chronological',
      limit: 20,
    });

    channelCollection.on('channelChanged', () => {
      channelCollection.load().then((channels) => setChannels(channels));
    });

    channelCollection.load().then(setChannels);

    return () => {
      channelCollection.dispose();
    };
  }, [sb]);

  return (
    <div className="w-1/3 border-r border-gray-300 overflow-auto h-full">
      {channels.map((channel) => (
        <div
          key={channel.url}
          className="p-4 cursor-pointer hover:bg-gray-100"
          onClick={() => onChannelSelect(channel.url)}
        >
          {channel.name || channel.members.map((m) => m.nickname).join(', ')}
        </div>
      ))}
    </div>
  );
};

export default ChannelListPanel;
