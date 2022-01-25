import Script from 'next/script';
import SpotifyWebPlayer from './SpotifyWebPlayer';
import { useAppDispatch } from 'redux/hooks';
import { updateDeviceId } from 'redux/reducers/deviceIdSlice';
import { playerState } from 'redux/reducers/playerStateSlice';

export default function SpotifyPlayer({ credentials, setPlayer }: any) {
  const dispatch = useAppDispatch();

  return (
    <Script
      src="https://sdk.scdn.co/spotify-player.js"
      onLoad={async () => {
        async function playerStateChangedCallback(state: any) {
          console.log('playerStateChangedCallback...');
          dispatch(playerState(state));
        }

        const player = new SpotifyWebPlayer('Minimalist Spotify Web Player', credentials.access_token);
        try {
          const deviceId = await player.connect(playerStateChangedCallback);
          dispatch(updateDeviceId(deviceId));
          setPlayer(player);
        } catch (e) {
          console.error('There was a problem connecting to the spotify web player.', e);
        }
      }}
    />
  );
}
