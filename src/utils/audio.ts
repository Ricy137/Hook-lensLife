export interface AudioState {
  audioCtx: AudioContext | null;
  audioBuffer: AudioBuffer | null;
  audioSource: AudioBufferSourceNode | null;
}

export const dfAudioState: AudioState = {
  audioCtx: null,
  audioBuffer: null,
  audioSource: null,
};

export const audioReducer = (
  state: AudioState,
  action: {
    type: 'initial' | 'setAudioSource';
    newState?: AudioState;
    newSource?: AudioBufferSourceNode | null;
  }
) => {
  switch (action.type) {
    case 'initial':
      return action.newState ?? dfAudioState;
    case 'setAudioSource':
      return { ...state, audioSource: action.newSource ?? null };
    default:
      return state;
  }
};

export interface AudioLastTmState {
  lastElapsedTime: number;
  lastStartTime: number;
}

export const dfAudioLastTmState = {
  lastElapsedTime: 0,
  lastStartTime: 0,
};

export const audioLastTmReducer = (
  state: AudioLastTmState,
  action: {
    type: 'setLastElapsedTime' | 'setLastStartTime' | 'updateLastTm';
    newStartTime?: number;
    newLastElapsedTime?: number;
  }
) => {
  switch (action.type) {
    case 'setLastElapsedTime':
      return {
        ...state,
        lastElapsedTime: action.newLastElapsedTime ?? state.lastElapsedTime,
      };
    case 'setLastStartTime':
      return {
        ...state,
        lastStartTime: action.newStartTime ?? state.lastStartTime,
      };
    case 'updateLastTm':
      return {
        lastElapsedTime: action.newLastElapsedTime ?? state.lastElapsedTime,
        lastStartTime: action.newStartTime ?? state.lastStartTime,
      };
  }
};

export const combineBuffers = (audioBuffers: AudioBuffer[], audioCtx: AudioContext) => {
  const combinedBuffer = audioBuffers.reduce((result, buffer) => {
    const newLength = result.length + buffer.length;
    const newBuffer = audioCtx.createBuffer(1, newLength, audioCtx.sampleRate);
    newBuffer.copyToChannel(result.getChannelData(0), 0);
    newBuffer.copyToChannel(buffer.getChannelData(0), 0, result.length);
    return newBuffer;
  }, audioCtx.createBuffer(1, 0, audioCtx.sampleRate));

  return combinedBuffer;
};

export const createSource = (buffer: AudioBuffer, audioCtx: AudioContext) => {
  const source = audioCtx.createBufferSource();
  // Create a gain node.
  const gainNode = audioCtx.createGain();
  source.buffer = buffer;
  // Turn on looping.
  source.loop = true;
  // Connect source to gain.
  source.connect(gainNode);
  // Connect gain to destination.
  gainNode.connect(audioCtx.destination);

  return {
    source: source,
    gainNode: gainNode,
  };
};
