import Script from 'next/script';
import SpotifyWebPlayer from './SpotifyWebPlayer';
import { useAppDispatch } from 'redux/hooks';
import { updateDeviceId } from 'redux/reducers/deviceIdSlice';
import { playerState } from 'redux/reducers/playerStateSlice';
import { useEffect } from 'react';

export default function SpotifyPlayer({ credentials, setPlayer }: any) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://sdk.scdn.co/spotify-player.js";
    script.async = true;

    document.body.appendChild(script);

    async function playerStateChangedCallback(state: any) {
      console.log('playerStateChangedCallback...');
      console.log('DEBUGGING:', state);

      if (!state) {
        return;
      }

      dispatch(playerState(state));
    }

    async function initPlayer() {
      const player = new SpotifyWebPlayer('Minimalist Spotify Web Player', credentials.access_token);
      try {
        const deviceId = await player.connect(playerStateChangedCallback);
        dispatch(updateDeviceId(deviceId));
        setPlayer(player);
      } catch (e) {
        console.error('There was a problem connecting to the spotify web player.', e);
      }
    }

    initPlayer();
  }, []);

  return (
    <div>Player Loaded</div>
  );

  // return (
  //   <Script
  //     src="https://sdk.scdn.co/spotify-player.js"
  //     onLoad={async () => {
  //       async function playerStateChangedCallback(state: any) {
  //         console.log('playerStateChangedCallback...');

  //         console.log('DEBUGGING:', state);

  //         if (!state) {
  //           return;
  //         }

  //         dispatch(playerState(state));
  //       }

  //       const player = new SpotifyWebPlayer('Minimalist Spotify Web Player', credentials.access_token);
  //       try {
  //         const deviceId = await player.connect(playerStateChangedCallback);
  //         dispatch(updateDeviceId(deviceId));
  //         setPlayer(player);
  //       } catch (e) {
  //         console.error('There was a problem connecting to the spotify web player.', e);
  //       }
  //     }}
  //   />
  // );
}
