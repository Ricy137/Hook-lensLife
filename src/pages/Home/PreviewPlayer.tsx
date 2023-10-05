import { useAtomValue } from 'jotai';
import Img from '@components/Img';
import { SimplePlayer } from '@components/Player';
import { searchedAudioAtom } from '@services/posts';
import { W3S_PREFIX } from '@utils/constants';

const PreviewPlayer: React.FC = () => {
  const audio = useAtomValue(searchedAudioAtom);
  if (!audio) return <></>;

  return (
    <div className="flex flex-col gap-y-24px">
      <Img src={audio.coverUrl ?? 'https://i.imgur.com/2nCt3Sbl.jpg'} alt="cover" className="w-400px h-400px" />
      <p>{audio.name}</p>
      <SimplePlayer url={`${W3S_PREFIX}${audio.mediaUrl}`} />
    </div>
  );
};

export default PreviewPlayer;
