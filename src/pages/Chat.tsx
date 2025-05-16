import ChatTab from './ChatTab';
function Chat() {
  return (
    <div>
      <button className="px-[17px] py-[6px] rounded-2xl text-gray-400 outline-1 cursor-pointer">
        미참여 채팅방만 보기
      </button>
      <ChatTab />
      <ChatTab />
      <ChatTab />
      <ChatTab />
      <ChatTab />
      <ChatTab />
    </div>
  );
}

export default Chat;
