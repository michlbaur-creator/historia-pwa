import EpisodeChallenge from '../../episode-1/challenge/EpisodeChallenge';
import { historiaEpisode3Scenes } from '../../episode3-data';

export const metadata = { title: 'Episode-3-Challenge · Historia' };

export default function Page() {
  return <EpisodeChallenge episode={3} scenes={historiaEpisode3Scenes} />;
}
