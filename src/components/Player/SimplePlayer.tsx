import { useState, useCallback, useEffect, useReducer } from "react";
import Progress from "@components/Progress";
import { dfAudioState, audioReducer } from "@utils/audio";
import "./index.css";

export const SimplePlayer: React.FC<{ url: string }> = ({ url }) => {
  const [playing, setPlaying] = useState(false);
  //TODO: replace with useReducer and an alternative way to manage these states may exist
  const [lastElapsedTime, setLastElapsedTime] = useState(0);
  const [lastStartTime, setLastStartTime] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [audioState, dispatch] = useReducer(audioReducer, dfAudioState);
  const initialSource = useCallback(async () => {
    try {
      const audioCtx = new AudioContext();
      const arrayBuffer = await fetch(url).then((res) => res.arrayBuffer());
      const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);
      dispatch({
        type: "initial",
        newState: {
          audioCtx,
          audioBuffer,
          audioSource: null,
        },
      });
    } catch (err) {
      console.log("err", err);
    }
  }, []);

  //play music according to elapsedTime
  const play = useCallback(
    (elapsedTime: number) => {
      if (!audioState.audioCtx) {
        return;
      }
      const newSource = audioState.audioCtx?.createBufferSource();
      newSource.buffer = audioState.audioBuffer;
      newSource.connect(audioState.audioCtx.destination);
      newSource.loop = false;
      newSource?.start(0, elapsedTime);
      setLastStartTime(audioState.audioCtx.currentTime);
      dispatch({
        type: "setAudioSource",
        newSource: newSource,
      });
    },
    [audioState]
  );

  //stop music playing, clear audioSource and record lastElapsedTime
  const stop = useCallback(() => {
    if (!audioState.audioCtx || !audioState.audioSource) {
      return;
    }
    audioState.audioSource?.stop();
    setLastElapsedTime(elapsedTime);
    dispatch({
      type: "setAudioSource",
      newSource: null,
    });
  }, [audioState]);

  const handlePlay = useCallback(
    (checked: boolean) => {
      if (checked) {
        play(elapsedTime);
      } else {
        stop();
      }
      setPlaying(checked);
    },
    [audioState, elapsedTime]
  );

  const handleJump = (percent: number) => {
    if (!audioState.audioCtx) {
      return;
    }
    if (audioState.audioSource) {
      stop();
    }
    const newElapsedTime = (percent / 100) * audioState.audioBuffer!.duration;
    setLastElapsedTime(newElapsedTime);
    setElapsedTime(newElapsedTime);
    setPlaying(true);
    play(newElapsedTime);
  };

  useEffect(() => {
    initialSource();
  }, []);

  useEffect(() => {
    if (
      audioState.audioCtx &&
      audioState.audioSource &&
      audioState.audioSource.buffer
    ) {
      const intervalAudio = setInterval(() => {
        if (!audioState.audioCtx || !audioState.audioSource) {
          clearInterval(intervalAudio);
          return;
        } else {
          setElapsedTime(() => {
            if (audioState.audioCtx) {
              const newElapsedTime =
                lastElapsedTime +
                audioState.audioCtx.currentTime -
                lastStartTime;
              return newElapsedTime;
            }
            return 0;
          });
        }
      }, 1000);
      return () => {
        clearInterval(intervalAudio);
      };
    }
  }, [audioState]);

  return (
    <div className="flex flex-col gap-y-24px">
      <Progress
        initialValue={elapsedTime}
        totalValue={audioState.audioBuffer?.duration ?? 0}
        handleProgressChange={handleJump}
      />
      <label className="burger-container ml-20px" htmlFor="burger-check">
        <input
          className="burger-check"
          id="burger-check"
          type="checkbox"
          checked={playing}
          onChange={(e) => handlePlay(e.target.checked)}
        />
        <span className="burger" />
      </label>
    </div>
  );
};
