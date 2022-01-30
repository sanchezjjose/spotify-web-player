import { useState, useEffect } from 'react';
import { useAppDispatch } from 'redux/hooks';
import { playerState } from 'redux/reducers/playerStateSlice';
import { updateDeviceId } from 'redux/reducers/deviceIdSlice';

export default function useSpotifyPlayer(name, accessToken) {
  const [player,  setPlayer] = useState(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    function loadSpotifyWebPlaybackSDK() {
      const script = document.createElement("script");
      script.src = "https://sdk.scdn.co/spotify-player.js";
      script.async = true;
      document.body.appendChild(script);
    }

    loadSpotifyWebPlaybackSDK();
  }, []);

  useEffect(() => {
    console.log('useSpotifyPlayer :: useEffect :: initializing spotify web playback sdk');

    async function initPlayer() {
      window.onSpotifyWebPlaybackSDKReady = () => {
        const player = new window.Spotify.Player({
          name: name,
          volume: 0.3,
          getOAuthToken: cb => { cb(accessToken); },
        });

        setPlayer(player);

        player.addListener('ready', ({ device_id }) => {
          console.log('Ready with Device ID', device_id);
          dispatch(updateDeviceId(device_id));
        });

        player.addListener('not_ready', ({ device_id }) => {
          console.log('Device ID has gone offline', device_id);
        });

        player.addListener('initialization_error', ({ message }) => {
          console.error(message);
        });
    
        player.addListener('authentication_error', ({ message }) => {
          // debugger;
          console.error(message);
        });

        player.addListener('account_error', ({ message }) => {
          console.error(message);
        });

        player.addListener('player_state_changed', (state) => {
          console.log('player_state_changed');
          console.log(state && state.paused);

          if (!state) {
            return;
          }

          dispatch(playerState(state));  
        });

        player.connect();
      }
    }

    initPlayer();

    return () => {
      console.log('useSpotityPlayer :: useEffect :: cleaning up');
      // TODO: Cleanup the Spotify SDK if necessary
      // window.onSpotifyWebPlaybackSDKReady = null;
      // window.Spotify = null;
    };
  }, [accessToken, dispatch, name]);

  return {
    player,
    loading: !player
  };
}
