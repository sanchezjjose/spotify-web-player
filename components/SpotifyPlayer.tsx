import { useState } from 'react';
import Script from 'next/script';

import { init } from './SpotifyPlayerInit';

export default function SpotifyPlayer() {
  const [spotifyPlayer, setSpotifyPlayer] = useState<any>(null);

  function handleClick() {
    if (spotifyPlayer) {
      spotifyPlayer.togglePlay();
    }
  }

  return (
    <>
      <Script
        src="https://sdk.scdn.co/spotify-player.js"
        onLoad={() => {
          init('Minimalist Spotify Web Player', setSpotifyPlayer);
        }}
      />
      <button onClick={handleClick}>Toggle Play</button>
    </>
  );
}
