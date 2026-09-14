import EpisodeChallenge from '../episode-1/challenge/EpisodeChallenge';
import { historiaScenes } from '../data';
import { historiaEpisode2Scenes } from '../episode2-data';
import { historiaEpisode3Scenes } from '../episode3-data';

export const metadata = { title: 'Hyper-Challenge · Historia', description: 'Zwei Blöcke mit je neun kniffligen Fragen aus allen drei Episoden – mit festlichem Abschluss und deiner Urkunde.' };
const pools = [historiaScenes, historiaEpisode2Scenes, historiaEpisode3Scenes];
export default function Page() { return <EpisodeChallenge hyperPools={pools} />; }
