import { useCallback } from "react";
import { useAtomValue } from "jotai";
import Img from "@components/Img";
import { searchedAudioAtom, AudioItem } from "@services/posts";
import { W3S_PREFIX } from "@utils/constants";

const Player: React.FC = () => {
  const audio = useAtomValue(searchedAudioAtom);
  console.log("audio", audio);
  const play = useCallback(async () => {
    try {
      const audioCtx = new AudioContext();
      const source = audioCtx.createBufferSource();
      const arrayBuffer = await fetch(
        `${W3S_PREFIX}${(audio as AudioItem).mediaUrl}`
      ).then((res) => res.arrayBuffer());
      const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);
      source.buffer = audioBuffer;
      source.loop = true;
      source.connect(audioCtx.destination);
      source.start();
    } catch (err) {
      console.log("err", err);
    }
  }, []);
  if (!audio) return <></>;

  return (
    <div className="flex flex-col gap-y-24px">
      {/* <button onClick={play}>Play</button> */}
      <Img
        src={audio.coverUrl ?? "https://i.imgur.com/2nCt3Sbl.jpg"}
        alt="cover"
        className="w-400px h-400px"
      />
      <p>{audio.name}</p>
      <audio controls>
        <source src={`${W3S_PREFIX}${audio.mediaUrl}`} type="audio/mpeg" />
      </audio>
    </div>
  );
};

export default Player;
