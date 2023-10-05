import PostSearcher from '@modules/PostSearcher';
import PreviewPlayer from './PreviewPlayer';

const Home: React.FC = () => {
  return (
    <div className="flex flex-col gap-y-24px">
      <PostSearcher />
      <PreviewPlayer />
    </div>
  );
};

export default Home;
