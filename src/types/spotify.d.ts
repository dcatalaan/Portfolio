declare global {
  interface Window {
    onSpotifyWebPlaybackSDKReady: () => void;
    Spotify: {
      Player: new (config: {
        name: string;
        getOAuthToken: (cb: (token: string) => void) => void;
        volume?: number;
      }) => {
        connect: () => Promise<void>;
        disconnect: () => void;
        addListener: (event: string, callback: (data: any) => void) => void;
        play: (options: { uris: string[] }) => Promise<void>;
        pause: () => Promise<void>;
        resume: () => Promise<void>;
      };
    };
  }
}

export {}; 