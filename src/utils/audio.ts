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
    type: "initial" | "setAudioSource";
    newState?: AudioState;
    newSource?: AudioBufferSourceNode | null;
  }
) => {
  switch (action.type) {
    case "initial":
      return action.newState ?? dfAudioState;
    case "setAudioSource":
      return { ...state, audioSource: action.newSource ?? null };
    default:
      return state;
  }
};
