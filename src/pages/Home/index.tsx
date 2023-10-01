import Player from "@modules/Player";
import PostSearcher from "@modules/PostSearcher";

const Home: React.FC = () => {
  return (
    <div className="flex flex-col gap-y-24px">
      <PostSearcher />
      <Player />
    </div>
  );
};

export default Home;
