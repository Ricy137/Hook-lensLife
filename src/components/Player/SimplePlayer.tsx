import { useState, useCallback, useEffect, useReducer } from 'react';
import Progress from '@components/Progress';
import { dfAudioState, audioReducer, dfAudioLastTmState, audioLastTmReducer } from '@utils/audio';
import './index.css';

export const SimplePlayer: React.FC<{ url: string }> = ({ url }) => {
  const [playing, setPlaying] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [lastTime, lastTimeDispatch] = useReducer(audioLastTmReducer, dfAudioLastTmState);
  const [audioState, audioStateDispatch] = useReducer(audioReducer, dfAudioState);
  const initialSource = useCallback(async () => {
    try {
      const audioCtx = new AudioContext();
      const arrayBuffer = await fetch(url).then((res) => res.arrayBuffer());
      const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);
      audioStateDispatch({
        type: 'initial',
        newState: {
          audioCtx,
          audioBuffer,
          audioSource: null,
        },
      });
    } catch (err) {
      console.log('err', err);
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
      newSource?.start(0, elapsedTime);
      lastTimeDispatch({
        type: 'setLastStartTime',
        newStartTime: audioState.audioCtx.currentTime,
      });
      audioStateDispatch({
        type: 'setAudioSource',
        newSource: newSource,
      });
    },
    [audioState]
  );

  const stop = useCallback(() => {
    if (!audioState.audioCtx || !audioState.audioSource) {
      return;
    }
    audioState.audioSource?.stop();
    const elapsedTime = lastTime.lastElapsedTime + audioState.audioCtx.currentTime - lastTime.lastStartTime;
    lastTimeDispatch({
      type: 'setLastElapsedTime',
      newLastElapsedTime: elapsedTime,
    });
    audioStateDispatch({
      type: 'setAudioSource',
      newSource: null,
    });
  }, [audioState]);

  const handleJump = (percent: number) => {
    if (!audioState.audioCtx) {
      return;
    }
    if (audioState.audioSource) {
      audioState.audioSource.stop();
    }
    const newElapsedTime = (percent / 100) * audioState.audioBuffer!.duration;
    setElapsedTime(newElapsedTime);
    setPlaying(true);
    play(newElapsedTime);
  };

  useEffect(() => {
    initialSource();
  }, []);

  // update elapsedTime
  useEffect(() => {
    if (!audioState.audioCtx || !audioState.audioSource || !audioState.audioBuffer) {
      return;
    }
    const intervalAudio = setInterval(() => {
      if (!audioState.audioCtx || !audioState.audioSource) {
        clearInterval(intervalAudio);
        return;
      } else {
        setElapsedTime(() => {
          if (audioState.audioCtx) {
            const newElapsedTime = lastTime.lastElapsedTime + audioState.audioCtx.currentTime - lastTime.lastStartTime;
            return newElapsedTime;
          }
          return 0;
        });
      }
    }, 1000);
    return () => {
      clearInterval(intervalAudio);
    };
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
          onChange={(e) => {
            e.target.checked ? play(elapsedTime) : stop();
          }}
        />
        <span className="burger" />
      </label>
    </div>
  );
};
