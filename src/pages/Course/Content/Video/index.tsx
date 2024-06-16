import { VideoProps } from './types';
import styles from './styles.module.scss';

export const Video = ({ component }: VideoProps) => {
  return (
    <section className={styles.video}>
      <iframe
        src={component.source}
        title='video'
        frameBorder='0'
        allow='autoplay; fullscreen; picture-in-picture; encrypted-media;'
        allowFullScreen
        className={styles['video-player']}
      />
    </section>
  );
};
