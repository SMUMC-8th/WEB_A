import { useSendbirdStateContext } from '@sendbird/uikit-react';

const CreateChannelButton = () => {
  const sb = useSendbirdStateContext()?.stores?.sdkStore?.sdk;

  const createChannel = async () => {
    if (!sb) return;
    const channel = await sb.groupChannel.createChannel({
      invitedUserIds: ['user2'],
      isDistinct: true,
      name: '테스트 채널',
    });
    console.log(channel);
  };

  return (
    <button onClick={createChannel} className="bg-blue-300 px-3 rounded-md ">
      채팅방 만들기
    </button>
  );
};

export default CreateChannelButton;
