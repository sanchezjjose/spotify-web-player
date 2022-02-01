import Header from './Header';
import styles from 'styles/Home.module.scss';

export default function Login() {
  return (
    <div className={styles.Login}>
      <form action='/api/spotify/authorize'>
        <button className={styles.loginButton} type='submit'>Login to Spotify</button>
      </form>
    </div>
  );
}
