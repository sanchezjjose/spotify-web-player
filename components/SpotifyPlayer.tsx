import { useState } from 'react';
import Script from 'next/script';

import { init, play } from './SpotifyPlayerInit';

export default function SpotifyPlayer({ access_token }: any) {
  const [spotifyPlayer, setSpotifyPlayer] = useState<any>(null);
  const [deviceId, setDeviceId] = useState<any>(null);

  function handleClick() {
    if (spotifyPlayer) {
      spotifyPlayer.togglePlay();
    }
  }

  function handlePlayTSU() {
    play({
      device_id: deviceId,
      spotify_uri: 'spotify:track:4s7QLoImIwmPi9L6dq1nVW',
      playerInstance: spotifyPlayer
    });
  }

  return (
    <>
      <Script
        src="https://sdk.scdn.co/spotify-player.js"
        onLoad={() => {
          init('Minimalist Spotify Web Player', access_token, setSpotifyPlayer, setDeviceId);
        }}
      />
      <button onClick={handleClick}>Toggle Play</button>
      <button onClick={handlePlayTSU}>Play TSU</button>
    </>
  );
}
