import ChatPanel from '../components/ChatPanel';

const ChatApp: React.FC = () => {
  return (
    <div className="flex h-full w-full flex-col gap-4">
      <div className="flex h-full w-full">
        <ChatPanel
          channelUrl={'sendbird_group_channel_259664809_d555323ffd6d18c5d3bc55a21d200f219f9386c2'}
        />
      </div>
    </div>
  );
};

export default ChatApp;
