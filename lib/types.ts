export interface SpotifyArtist {
  name: string
}

export interface SpotifyTrack {
  album: object,
  artists: Array<SpotifyArtist>,
  available_markets: Array<string>,
  disc_number: number,
  duration_ms: number,
  explicit: boolean,
  external_ids: Array<object>,
  external_urls: Array<object>,
  href: string,
  id: string,
  is_local: boolean,
  name: string,
  popularity: number,
  preview_url: string,
  track_number: number,
  type: string,
  uri: string
}

export interface SpotifyTopTracks {
  items: SpotifyTrack[];
};

export interface NowPlayingTrack {
  id?: string;
  album?: string;
  albumImageUrl?: string;
  artist?: string;
  isPlaying: boolean;
  songUrl?: string;
  title?: string;
};
