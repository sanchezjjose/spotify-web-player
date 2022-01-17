export const init = (name, access_token, setSpotifyPlayer, setDeviceId) => {
  window.onSpotifyWebPlaybackSDKReady = () => {
    const player = new Spotify.Player({
        name,
        getOAuthToken: cb => { cb(access_token); },
        volume: 0.3
    });

    player.addListener('ready', ({ device_id }) => {
        console.log('Ready with Device ID', device_id);
        setDeviceId(device_id);
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

    return player;
  }
}

export const play = ({ device_id, spotify_uri, playerInstance: { _options: { getOAuthToken } } }) => {
  getOAuthToken(access_token => {
    fetch(`https://api.spotify.com/v1/me/player/play?device_id=${device_id}`, {
      method: 'PUT',
      body: JSON.stringify({ uris: [spotify_uri] }),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${access_token}`
      },
    });
  });
}
