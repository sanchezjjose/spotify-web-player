import Script from 'next/script';

import { useAppSelector, useAppDispatch } from 'redux/hooks';
import { updateDeviceId, selectDeviceId } from 'redux/reducers/deviceIdSlice';

import { init } from './SpotifyPlayerInit';

export default function SpotifyPlayer({ access_token, player, setPlayer }: any) {
  const dispatch = useAppDispatch();
  const deviceId = useAppSelector(selectDeviceId)

  function handleClick() {
    if (player) {
      player.togglePlay();
    }
  }

  return (
    <>
      <Script
        src="https://sdk.scdn.co/spotify-player.js"
        onLoad={() => {
          init(
            'Minimalist Spotify Web Player',
            access_token,
            setPlayer,
            dispatch,
            updateDeviceId
          );
        }}
      />
      <button onClick={handleClick}>Toggle Play</button>
    </>
  );
}
