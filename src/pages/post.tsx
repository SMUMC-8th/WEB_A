import { PostSelect } from '../components/post/PostSelect';
import { PostWrite } from '../components/post/PostWrite';
import { usePost } from '../hooks/usePost';

export const Post = () => {
  const { step } = usePost();

  return <>{step === 1 ? <PostSelect /> : <PostWrite />}</>;
};
