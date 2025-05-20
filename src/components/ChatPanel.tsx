// // src/pages/ChatListPage.tsx
// import React from 'react';
// import { ChannelList } from '@sendbird/uikit-react';
// import { useNavigate } from 'react-router-dom';

// const ChatListPage: React.FC = () => {
//   const navigate = useNavigate();

//   return (
//     <div className="h-screen flex justify-center items-center mt-16">
//       <ChannelList
//         onChannelSelect={(channel) => {
//           if (channel && channel.url) {
//             navigate(`/chat/${channel.url}`);
//           }
//         }}
//       />
//     </div>
//   );
// };

// export default ChatListPage;
