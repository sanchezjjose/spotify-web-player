import Image from 'next/image';
import styles from 'styles/Home.module.scss';

export default function Header() {
  return (
    <div className='Header'>
      <Image className={styles.spotifyLogo} src='/spotify.svg' width={32} height={32} alt='Spotify Logo' />
      <h1 className={styles.title}>Minimalist Spotify</h1>
    </div>
  );
}
