import { useState, useEffect } from 'react';

export default function SpotifyPlayer() {
  const [spotifyPlayer, setSpotifyPlayer] = useState();

  function spotifyPlayerConnect() {

    window.onSpotifyWebPlaybackSDKReady = () => {
      const token = 'BQC_6B9mXWx4amGiI2lIKWD37-RplqCVXb_tb5YVdtZut6e8XqyB59j_O0VOgf_La4AYTgBzFLUdFESrWtODW2mzWGO0YgA8B1nWMm6mmbc9sn9Rxw6v1YyVQe23dBVuEPexctNyKix4XtmfFzA76KPQKanV0nW9WYH58zzEfkY';
      const player = new Spotify.Player({
          name: 'Minimalist Web Player',
          getOAuthToken: cb => { cb(token); },
          volume: 0.5
      });

      player.addListener('ready', ({ device_id }) => {
          console.log('Ready with Device ID', device_id);
      });

      player.addListener('not_ready', ({ device_id }) => {
          console.log('Device ID has gone offline', device_id);
      });

      player.addListener('initialization_error', ({ message }) => {
          console.error(message);
      });

      player.addListener('authentication_error', ({ message }) => {
          console.error(message);
      });

      player.addListener('account_error', ({ message }) => {
          console.error(message);
      });

      player.connect();

      setSpotifyPlayer(player);
    }
  }

  function handleClick() {
    if (spotifyPlayer) {
      spotifyPlayer.togglePlay();
    }
  }

  useEffect(() => {
    spotifyPlayerConnect();
  });

  return (
    <button onClick={handleClick}>Toggle Play</button>
  );
}
