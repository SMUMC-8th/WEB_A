interface AlertProps {
  open: boolean;
  onClose: () => void;
}

const Alert = ({ open, onClose }: AlertProps) => {
  if (!open) return null;

  return (
    <>
      {/* 반투명 배경 */}
      <div className="fixed inset-0 bg-black bg-opacity-40 z-40" onClick={onClose} />

      {/* 팝업 메뉴 본체 */}
      <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 w-72 bg-white rounded-xl shadow-xl p-4 space-y-3">
        <button className="w-full py-2 bg-gray-100 rounded text-sm hover:bg-gray-200">
          수정하기
        </button>
        <button className="w-full py-2 bg-gray-100 rounded text-sm hover:bg-gray-200">
          삭제하기
        </button>
        <button className="w-full py-2 bg-gray-100 rounded text-sm hover:bg-gray-200">
          공유하기
        </button>
        <button className="w-full py-2 bg-gray-100 rounded text-sm hover:bg-gray-200">
          신고하기
        </button>
      </div>
    </>
  );
};

export default Alert;
