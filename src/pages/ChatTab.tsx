function ChatTab() {
  return (
    <div>
      <div className="flex flex-col gap-[10px] mt-[20px]">
        <div className="flex flex-row gap-[10px] px-[23px]">
          <img
            src="https://www.studiopeople.kr/common/img/default_profile.png"
            alt="프로필 사진"
            className="w-[50px] h-[50px] rounded-full"
          />
          <div className="flex flex-col mr-[10px]">
            <span className="text-sm font-bold">홍제 정육 식당</span>
            <span className="text-xs text-gray-500">안녕하세요</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatTab;
