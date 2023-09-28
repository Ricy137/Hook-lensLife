import { useCallback } from "react";
import { useAtomValue } from "jotai";
import { audioAtom, AudioItem } from "@services/posts";
import { W3S_PREFIX } from "@utils/constants";

const Player: React.FC = () => {
  const audio = useAtomValue(audioAtom);
  console.log("audio", audio);
  const play = useCallback(async () => {
    try {
      const audioCtx = new AudioContext();
      const source = audioCtx.createBufferSource();
      const arrayBuffer = await fetch(
        `${W3S_PREFIX}${(audio as AudioItem[])[0].mediaUrl}`
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
  if (!audio?.length) return <></>;

  return (
    <>
      <button onClick={play}>Play</button>
      <audio controls>
        <source src={`${W3S_PREFIX}${audio[0].mediaUrl}`} type="audio/mpeg" />
      </audio>
    </>
  );
};

export default Player;
