import { useEffect, useState } from 'react';
import { useSendbirdStateContext } from '@sendbird/uikit-react';
import { GroupChannel } from '@sendbird/chat/groupChannel';
import { useNavigate } from 'react-router-dom';

const ChatListPage = () => {
  const state = useSendbirdStateContext();
  const sdk = state?.stores?.sdkStore?.sdk;
  const currentUser = sdk?.currentUser;
  const [channels, setChannels] = useState<GroupChannel[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!sdk || !currentUser) return;

    const fetchChannels = async () => {
      const query = sdk.groupChannel.createMyGroupChannelListQuery({});
      const channels = await query.next();
      setChannels(channels);
    };

    fetchChannels();
  }, [sdk, currentUser]);

  const handleClick = (channel: GroupChannel) => {
    if (!channel) return;
    navigate(`/chat/${channel.url}`);
  };

  return (
    <div className="pt-16 p-4">
      {' '}
      {/* pt-16으로 상단 여백 확보 */}
      <h2 className="text-xl font-bold mb-4">Chat List</h2>
      <ul>
        {channels.map((channel) => (
          <li key={channel.url} onClick={() => handleClick(channel)}>
            {channel.name || 'No Name'}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatListPage;
