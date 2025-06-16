// import { motion, AnimatePresence, PanInfo } from 'framer-motion';
// import { useEffect, useRef, useState } from 'react';
// import { useQuery, useMutation } from '@tanstack/react-query';
// import { fetchCommentsByPostId, postCommentByPostId } from '../../apis/Post';
// import { Heart, Reply } from 'lucide-react';

// // Props 및 타입 정의
// interface Props {
//   isOpen: boolean;
//   onClose: () => void;
//   postId: number;
// }

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

//   // 댓글 조회 useQuery
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
//   const { mutate: postComment, isPending: isPosting } = useMutation({
//     mutationFn: (content: string) => postCommentByPostId(postId, content),
//     onSuccess: () => {
//       setCommentInput('');
//       refetch();
//     },
//     onError: (error) => {
//       console.error('댓글 등록 오류:', error);
//       alert('댓글 등록에 실패했습니다.');
//     },
//   });

//   useEffect(() => {
//     document.body.style.overflow = isOpen ? 'hidden' : '';
//     return () => {
//       document.body.style.overflow = '';
//     };
//   }, [isOpen]);

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
//       newHeight = Math.max(initialHeight, Math.min(maxHeight, newHeight));
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
//       postComment(commentInput.trim());
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
//                         <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
//                           <span className="flex items-center gap-1">
//                             <Heart className="w-4 h-4" />
//                             {comment.likeCount}
//                           </span>
//                           <span className="flex items-center gap-1 cursor-pointer">
//                             <Reply className="w-4 h-4" />
//                             {comment.replyCount}
//                           </span>
//                         </div>
//                       </div>
//                     </div>
//                   ))
//                 )}
//               </div>

//               {/* 댓글 입력창 */}
//               <div className="flex-shrink-0 pt-3 border-t border-gray-200 flex items-center gap-2">
//                 <textarea
//                   ref={textareaRef}
//                   value={commentInput}
//                   onChange={(e) => setCommentInput(e.target.value)}
//                   placeholder="댓글을 입력하세요..."
//                   rows={1}
//                   disabled={isPosting}
//                   className="flex-grow px-3 py-2 text-sm border border-gray-200 rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
//                   style={{ maxHeight: '150px', overflowY: 'hidden' }}
//                 />
//                 {commentInput.trim() && (
//                   <button
//                     onClick={handleCommentSubmit}
//                     disabled={isPosting}
//                     className="text-sm font-semibold text-blue-500 hover:text-blue-600"
//                   >
//                     {isPosting ? '전송 중...' : '보내기'}
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
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import {
  fetchCommentsByPostId,
  postCommentByPostId,
  editCommentById,
  deleteCommentById,
} from '../../apis/Post';
import { Heart, Reply } from 'lucide-react';

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

  const [swipedCommentId, setSwipedCommentId] = useState<number | null>(null);

  // 수정 모드 댓글 ID 및 수정 입력 상태 관리
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [editContent, setEditContent] = useState<string>('');

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

  const { mutate: editComment } = useMutation({
    mutationFn: ({ commentId, newContent }: { commentId: number; newContent: string }) =>
      editCommentById(commentId, newContent),
    onSuccess: () => {
      alert('댓글이 수정되었습니다.');
      setEditingCommentId(null);
      setEditContent('');
      refetch();
    },
    onError: () => alert('댓글 수정 실패'),
  });

  const { mutate: removeComment } = useMutation({
    mutationFn: (commentId: number) => deleteCommentById(commentId),
    onSuccess: () => {
      alert('댓글이 삭제되었습니다.');
      refetch();
    },
    onError: () => alert('댓글 삭제 실패'),
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

  const handleSwipeEnd = (commentId: number, info: PanInfo) => {
    if (info.offset.x < -80) {
      setSwipedCommentId(commentId);
    } else {
      setSwipedCommentId(null);
    }
  };

  // 댓글 수정 시작
  const startEditing = (comment: Comment) => {
    setEditingCommentId(comment.commentId);
    setEditContent(comment.content);
    setSwipedCommentId(null); // 스와이프 메뉴 닫기
  };

  // 댓글 수정 취소
  const cancelEditing = () => {
    setEditingCommentId(null);
    setEditContent('');
  };

  // 댓글 수정 완료
  const submitEdit = () => {
    if (editingCommentId !== null && editContent.trim()) {
      editComment({ commentId: editingCommentId, newContent: editContent.trim() });
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
              setSwipedCommentId(null);
              cancelEditing();
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
                    setSwipedCommentId(null);
                    cancelEditing();
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
                  comments.map((comment) => {
                    const isSwiped = swipedCommentId === comment.commentId;
                    const isEditing = editingCommentId === comment.commentId;

                    return (
                      <div
                        key={comment.commentId}
                        className="relative bg-white overflow-hidden rounded-lg"
                      >
                        {/* 숨겨진 버튼 (오른쪽) */}
                        <div className="absolute right-0 top-0 h-full flex items-center bg-gray-100 pr-4 pl-2 z-0 space-x-2">
                          {!isEditing && (
                            <>
                              <button
                                onClick={() => startEditing(comment)}
                                className="text-gray-400 hover:underline"
                              >
                                수정
                              </button>
                              <button
                                onClick={() => removeComment(comment.commentId)}
                                className="text-gray-400 hover:underline"
                              >
                                삭제
                              </button>
                            </>
                          )}
                        </div>

                        {/* 댓글 내용 또는 수정 입력창 */}
                        <motion.div
                          className="relative z-10 bg-white px-3 py-2"
                          drag={!isEditing ? 'x' : false}
                          dragConstraints={{ left: 0, right: 0 }}
                          onDragEnd={(_, info) =>
                            !isEditing && handleSwipeEnd(comment.commentId, info)
                          }
                          animate={{ x: isSwiped ? -100 : 0 }}
                          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        >
                          <div className="flex items-start gap-2">
                            <img
                              src={
                                comment.profileUrl ||
                                'https://www.studiopeople.kr/common/img/default_profile.png'
                              }
                              alt="user"
                              className="w-8 h-8 rounded-full"
                            />
                            <div className="flex-grow">
                              <p className="text-sm font-semibold">{comment.nickname}</p>
                              {isEditing ? (
                                <div className="flex flex-col gap-1">
                                  <textarea
                                    value={editContent}
                                    onChange={(e) => setEditContent(e.target.value)}
                                    rows={2}
                                    className="w-full text-sm border border-gray-300 rounded-md p-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    style={{ maxHeight: '100px' }}
                                  />
                                  <div className="flex gap-2 justify-end">
                                    <button
                                      onClick={cancelEditing}
                                      className="text-sm px-3 py-1 rounded-md border border-gray-300 hover:bg-gray-100"
                                    >
                                      취소
                                    </button>
                                    <button
                                      onClick={submitEdit}
                                      disabled={!editContent.trim()}
                                      className={`text-sm px-3 py-1 rounded-md text-white ${
                                        editContent.trim()
                                          ? 'bg-blue-500 hover:bg-blue-600'
                                          : 'bg-blue-300 cursor-not-allowed'
                                      }`}
                                    >
                                      저장
                                    </button>
                                  </div>
                                </div>
                              ) : (
                                <p className="text-sm text-gray-700">{comment.content}</p>
                              )}

                              {!isEditing && (
                                <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                                  <span className="flex items-center gap-1">
                                    <Heart className="w-4 h-4" />
                                    {comment.likeCount}
                                  </span>
                                  <span className="flex items-center gap-1 cursor-pointer">
                                    <Reply className="w-4 h-4" />
                                    {comment.replyCount}
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      </div>
                    );
                  })
                )}
              </div>

              {/* 댓글 입력창 */}
              <div className="flex-shrink-0 pt-3 border-t border-gray-200 flex items-center gap-2">
                <textarea
                  ref={textareaRef}
                  value={commentInput}
                  onChange={(e) => setCommentInput(e.target.value)}
                  placeholder="댓글을 입력하세요..."
                  rows={1}
                  disabled={isPosting}
                  className="flex-grow px-3 py-2 text-sm border border-gray-200 rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
                  style={{ maxHeight: '150px', overflowY: 'hidden' }}
                />
                <button
                  onClick={handleCommentSubmit}
                  disabled={isPosting || !commentInput.trim()}
                  className="text-sm font-semibold text-blue-500 hover:text-blue-600 disabled:text-blue-300"
                >
                  {isPosting ? '전송 중...' : '보내기'}
                </button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CommentModal;
