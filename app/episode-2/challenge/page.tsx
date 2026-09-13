import EpisodeChallenge from '../../episode-1/challenge/EpisodeChallenge';
import { historiaEpisode2Scenes } from '../../episode2-data';

export const metadata = { title: 'Episode-2-Challenge · Historia' };

export default function Page() {
  return <EpisodeChallenge episode={2} scenes={historiaEpisode2Scenes} />;
}
