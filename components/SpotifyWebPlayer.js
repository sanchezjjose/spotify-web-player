export default class SpotifyWebPlayer {

  constructor(name, accessToken) {
    this.name = name;
    this.accessToken = accessToken;
    this.player = null;
    this.deviceId = null;
  }

  async connect(playerStateChangedCallback) {
    return new Promise((resolve, reject) => {

      console.log('DEBUGGING:', 'About to call window.onSpotifyWebPlaybackSDKReady...');
      console.log('window undefined? ', window === undefined);
      console.log('window.onSpotifyWebPlaybackSDKReady undefined? ', window.onSpotifyWebPlaybackSDKReady === undefined);
      console.log('what now?');

      window.onSpotifyWebPlaybackSDKReady = () => {
        this.player = new Spotify.Player({
          name: this.name,
          volume: 0.3,
          getOAuthToken: cb => { cb(this.accessToken); },
        });

        this.player.addListener('ready', ({ device_id }) => {
            console.log('Ready with Device ID', device_id);
            this.deviceId = device_id;
            resolve(device_id);
        });

        this.player.addListener('not_ready', ({ device_id }) => {
            console.log('Device ID has gone offline', device_id);
        });

        this.player.addListener('initialization_error', ({ message }) => {
            console.error(message);
        });
    
        this.player.addListener('authentication_error', ({ message }) => {
            // debugger;
            console.error(message);
        });

        this.player.addListener('account_error', ({ message }) => {
            console.error(message);
        });

        this.player.addListener('player_state_changed', playerStateChangedCallback);

        this.player.connect();
      }
    });
  }

  async play(deviceId, spotify_uri) {
    return fetch(`https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`, {
      method: 'PUT',
      body: JSON.stringify({ uris: [spotify_uri] }),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.accessToken}`
      },
    });
  }

  async pause() {
    return await this.player.pause();
  }

  async resume() {
    return await this.player.resume();
  }
}
