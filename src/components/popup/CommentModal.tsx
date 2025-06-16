// import { motion, AnimatePresence, PanInfo } from 'framer-motion';
// import { useEffect, useRef, useState } from 'react';
// import { useMutation, useQuery } from '@tanstack/react-query';
// import { fetchCommentsByPostId, postCommentByPostId } from '../../apis/Post';

// type Props = {
//   isOpen: boolean;
//   onClose: () => void;
//   postId: number;
// };

// interface Comment {
//   commentId: number;
//   nickname: string;
//   profileUrl: string;
//   content: string;
//   likeCount: number;
//   replyCount: number;
// }

// const CommentModal = ({ isOpen, onClose, postId }: Props) => {
//   const windowHeight = typeof window !== 'undefined' ? window.innerHeight : 800;
//   const initialHeight = windowHeight * 0.5;
//   const maxHeight = windowHeight * 0.95;

//   const [height, setHeight] = useState(initialHeight);
//   const startYRef = useRef<number | null>(null);
//   const prevHeightRef = useRef<number>(initialHeight);

//   const [commentInput, setCommentInput] = useState('');
//   const textareaRef = useRef<HTMLTextAreaElement>(null);

//   const {
//     data: comments = [],
//     isLoading,
//     isError,
//     refetch,
//   } = useQuery<Comment[]>({
//     queryKey: ['comments', postId],
//     queryFn: () => fetchCommentsByPostId(postId),
//     enabled: isOpen,
//     staleTime: 1000 * 60,
//   });

//   // 댓글 작성 useMutation
//   const { mutate: postComment, isLoading: isPosting } = useMutation({
//     mutationFn: (content: string) => postCommentByPostId(postId, content),
//     onSuccess: () => {
//       setCommentInput('');
//       refetch();
//     },
//     onError: (error) => {
//       alert('댓글 등록에 실패했습니다.');
//     },
//   });

//   useEffect(() => {
//     if (isOpen) {
//       document.body.style.overflow = 'hidden';
//     } else {
//       document.body.style.overflow = '';
//     }
//     return () => {
//       document.body.style.overflow = '';
//     };
//   }, [isOpen]);

//   // textarea 자동 높이 조절
//   const adjustTextareaHeight = () => {
//     const el = textareaRef.current;
//     if (el) {
//       el.style.height = 'auto';
//       el.style.height = el.scrollHeight + 'px';
//     }
//   };

//   useEffect(() => {
//     adjustTextareaHeight();
//   }, [commentInput]);

//   const handleDragStart = (_: unknown, info: PanInfo) => {
//     startYRef.current = info.point.y;
//     prevHeightRef.current = height;
//   };

//   const handleDrag = (_: unknown, info: PanInfo) => {
//     if (startYRef.current !== null) {
//       const delta = startYRef.current - info.point.y;
//       let newHeight = prevHeightRef.current + delta;

//       if (newHeight < initialHeight) newHeight = initialHeight;
//       if (newHeight > maxHeight) newHeight = maxHeight;

//       setHeight(newHeight);
//     }
//   };

//   const handleDragEnd = (_: unknown, info: PanInfo) => {
//     if (info.offset.y > 100) {
//       onClose();
//       setHeight(initialHeight);
//     }
//   };

//   const handleCommentSubmit = () => {
//     if (commentInput.trim()) {
//       alert(`보낸 댓글: ${commentInput}`);
//       setCommentInput('');
//       refetch(); // 댓글 새로고침
//     }
//   };

//   return (
//     <AnimatePresence>
//       {isOpen && (
//         <>
//           <motion.div
//             className="fixed inset-0 bg-opacity-20 z-[9998]"
//             onClick={() => {
//               onClose();
//               setHeight(initialHeight);
//             }}
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//           />

//           <div
//             className="fixed inset-x-0 bottom-0 z-[9999] flex justify-center"
//             style={{ pointerEvents: 'none' }}
//           >
//             <motion.div
//               className="bg-white rounded-t-2xl p-4 w-full max-w-md flex flex-col"
//               style={{ height: `${height}px`, pointerEvents: 'auto' }}
//               initial={{ y: 300 }}
//               animate={{ y: 0 }}
//               exit={{ y: 600, transition: { duration: 0.3, ease: 'easeIn' } }}
//               transition={{ type: 'spring', stiffness: 300, damping: 30 }}
//               drag="y"
//               dragConstraints={{ top: 0, bottom: 0 }}
//               dragElastic={0.1}
//               onDragStart={handleDragStart}
//               onDrag={handleDrag}
//               onDragEnd={handleDragEnd}
//               whileTap={{ cursor: 'grabbing' }}
//             >
//               {/* 핸들 + 제목 */}
//               <div>
//                 <div
//                   className="mx-auto mb-3 w-20 h-1.5 bg-gray-300 rounded-full cursor-pointer"
//                   onClick={() => {
//                     onClose();
//                     setHeight(initialHeight);
//                   }}
//                 />
//                 <h2 className="text-lg font-bold mb-2">댓글</h2>
//               </div>

//               {/* 댓글 리스트 */}
//               <div className="flex-grow overflow-y-auto pr-1 space-y-3">
//                 {isLoading ? (
//                   <p className="text-sm text-gray-500">댓글 불러오는 중...</p>
//                 ) : isError ? (
//                   <p className="text-sm text-red-500">댓글을 불러오는 중 오류가 발생했습니다.</p>
//                 ) : comments.length === 0 ? (
//                   <p className="text-sm text-gray-400 text-center">아직 댓글이 없습니다.</p>
//                 ) : (
//                   comments.map((comment) => (
//                     <div key={comment.commentId} className="flex items-start gap-2">
//                       <img
//                         src={
//                           comment.profileUrl ||
//                           'https://www.studiopeople.kr/common/img/default_profile.png'
//                         }
//                         alt="user"
//                         className="w-8 h-8 rounded-full"
//                       />
//                       <div>
//                         <p className="text-sm font-semibold">{comment.nickname}</p>
//                         <p className="text-sm text-gray-700">{comment.content}</p>
//                       </div>
//                     </div>
//                   ))
//                 )}
//               </div>

//               {/* 댓글 입력창 */}
//               <div className="flex-shrink-0 pt-3 border-t flex items-center gap-2">
//                 <textarea
//                   ref={textareaRef}
//                   value={commentInput}
//                   onChange={(e) => setCommentInput(e.target.value)}
//                   placeholder="댓글을 입력하세요..."
//                   rows={1}
//                   className="flex-grow px-3 py-2 text-sm border rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
//                   style={{ maxHeight: '150px', overflowY: 'hidden' }}
//                 />
//                 {commentInput.trim() && (
//                   <button
//                     onClick={handleCommentSubmit}
//                     className="text-sm font-semibold text-blue-500 hover:text-blue-600"
//                   >
//                     보내기
//                   </button>
//                 )}
//               </div>
//             </motion.div>
//           </div>
//         </>
//       )}
//     </AnimatePresence>
//   );
// };

// export default CommentModal;

// CommentModal.tsx
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { fetchCommentsByPostId, postCommentByPostId } from '../../apis/Post';

// Props 및 타입 정의
interface Props {
  isOpen: boolean;
  onClose: () => void;
  postId: number;
}

interface Comment {
  commentId: number;
  nickname: string;
  profileUrl: string;
  content: string;
  likeCount: number;
  replyCount: number;
}

const CommentModal = ({ isOpen, onClose, postId }: Props) => {
  const windowHeight = typeof window !== 'undefined' ? window.innerHeight : 800;
  const initialHeight = windowHeight * 0.5;
  const maxHeight = windowHeight * 0.95;

  const [height, setHeight] = useState(initialHeight);
  const startYRef = useRef<number | null>(null);
  const prevHeightRef = useRef<number>(initialHeight);

  const [commentInput, setCommentInput] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // 댓글 조회 useQuery
  const {
    data: comments = [],
    isLoading,
    isError,
    refetch,
  } = useQuery<Comment[]>({
    queryKey: ['comments', postId],
    queryFn: () => fetchCommentsByPostId(postId),
    enabled: isOpen,
    staleTime: 1000 * 60,
  });

  // 댓글 작성 useMutation
  const { mutate: postComment, isPending: isPosting } = useMutation({
    mutationFn: (content: string) => postCommentByPostId(postId, content),
    onSuccess: () => {
      setCommentInput('');
      refetch();
    },
    onError: (error) => {
      console.error('댓글 등록 오류:', error);
      alert('댓글 등록에 실패했습니다.');
    },
  });

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const adjustTextareaHeight = () => {
    const el = textareaRef.current;
    if (el) {
      el.style.height = 'auto';
      el.style.height = el.scrollHeight + 'px';
    }
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [commentInput]);

  const handleDragStart = (_: unknown, info: PanInfo) => {
    startYRef.current = info.point.y;
    prevHeightRef.current = height;
  };

  const handleDrag = (_: unknown, info: PanInfo) => {
    if (startYRef.current !== null) {
      const delta = startYRef.current - info.point.y;
      let newHeight = prevHeightRef.current + delta;
      newHeight = Math.max(initialHeight, Math.min(maxHeight, newHeight));
      setHeight(newHeight);
    }
  };

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.y > 100) {
      onClose();
      setHeight(initialHeight);
    }
  };

  const handleCommentSubmit = () => {
    if (commentInput.trim()) {
      postComment(commentInput.trim());
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-opacity-20 z-[9998]"
            onClick={() => {
              onClose();
              setHeight(initialHeight);
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <div
            className="fixed inset-x-0 bottom-0 z-[9999] flex justify-center"
            style={{ pointerEvents: 'none' }}
          >
            <motion.div
              className="bg-white rounded-t-2xl p-4 w-full max-w-md flex flex-col"
              style={{ height: `${height}px`, pointerEvents: 'auto' }}
              initial={{ y: 300 }}
              animate={{ y: 0 }}
              exit={{ y: 600, transition: { duration: 0.3, ease: 'easeIn' } }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              drag="y"
              dragConstraints={{ top: 0, bottom: 0 }}
              dragElastic={0.1}
              onDragStart={handleDragStart}
              onDrag={handleDrag}
              onDragEnd={handleDragEnd}
              whileTap={{ cursor: 'grabbing' }}
            >
              {/* 핸들 + 제목 */}
              <div>
                <div
                  className="mx-auto mb-3 w-20 h-1.5 bg-gray-300 rounded-full cursor-pointer"
                  onClick={() => {
                    onClose();
                    setHeight(initialHeight);
                  }}
                />
                <h2 className="text-lg font-bold mb-2">댓글</h2>
              </div>

              {/* 댓글 리스트 */}
              <div className="flex-grow overflow-y-auto pr-1 space-y-3">
                {isLoading ? (
                  <p className="text-sm text-gray-500">댓글 불러오는 중...</p>
                ) : isError ? (
                  <p className="text-sm text-red-500">댓글을 불러오는 중 오류가 발생했습니다.</p>
                ) : comments.length === 0 ? (
                  <p className="text-sm text-gray-400 text-center">아직 댓글이 없습니다.</p>
                ) : (
                  comments.map((comment) => (
                    <div key={comment.commentId} className="flex items-start gap-2">
                      <img
                        src={
                          comment.profileUrl ||
                          'https://www.studiopeople.kr/common/img/default_profile.png'
                        }
                        alt="user"
                        className="w-8 h-8 rounded-full"
                      />
                      <div>
                        <p className="text-sm font-semibold">{comment.nickname}</p>
                        <p className="text-sm text-gray-700">{comment.content}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* 댓글 입력창 */}
              <div className="flex-shrink-0 pt-3 border-t flex items-center gap-2">
                <textarea
                  ref={textareaRef}
                  value={commentInput}
                  onChange={(e) => setCommentInput(e.target.value)}
                  placeholder="댓글을 입력하세요..."
                  rows={1}
                  disabled={isPosting}
                  className="flex-grow px-3 py-2 text-sm border rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
                  style={{ maxHeight: '150px', overflowY: 'hidden' }}
                />
                {commentInput.trim() && (
                  <button
                    onClick={handleCommentSubmit}
                    disabled={isPosting}
                    className="text-sm font-semibold text-blue-500 hover:text-blue-600"
                  >
                    {isPosting ? '전송 중...' : '보내기'}
                  </button>
                )}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CommentModal;
