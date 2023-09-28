import Player from "@modules/Player";
import PostAddInput from "./postAddInput";

const Home: React.FC = () => {
  return (
    <div className="flex flex-col gap-y-24px">
      <PostAddInput />
      <Player />
    </div>
  );
};

export default Home;
