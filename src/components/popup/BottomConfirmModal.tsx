import Portal from '../Portal';

interface BottomConfirmModalProps {
  isOpen: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  confirmText?: string;
  cancelText?: string;
  children: React.ReactNode;
}

export default function BottomConfirmModal({
  isOpen,
  onCancel,
  onConfirm,
  confirmText = '확인',
  cancelText = '취소',
  children,
}: BottomConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <Portal>
      <div
        className="fixed inset-0 z-[10000] bg-[#00000033] flex items-end justify-center"
        onClick={onCancel}
      >
        <div
          className="w-full max-w-sm bg-white rounded-t-2xl py-10 px-6 shadow-lg"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="text-center font-semibold text-base mb-10">{children}</div>

          <button
            className="w-full bg-blue-500 text-white py-3 rounded-full text-sm font-medium shadow-md hover:bg-blue-600 transition mb-4"
            onClick={onConfirm}
          >
            {confirmText}
          </button>
          <button className="w-full text-gray-500 py-2 text-sm" onClick={onCancel}>
            {cancelText}
          </button>
        </div>
      </div>
    </Portal>
  );
}
