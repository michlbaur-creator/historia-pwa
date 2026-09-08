import type { Metadata } from 'next';
import HistoriaPlayer from '../HistoriaPlayer';
import { historiaEpisode2Scenes } from '../episode2-data';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Episode 2 – Kaiser Kreuzfahrer und Revolutionäre | Historia',
  description:
    '16 kompakte Schlüsselszenen von der Hidschra bis zur Niederlage Napoleons.',
};

export default function EpisodeTwoPage() {
  return (
    <HistoriaPlayer
      scenes={historiaEpisode2Scenes}
      episodeNumber={2}
      episodeTitle="Kaiser Kreuzfahrer und Revolutionäre"
      timelineLabels={['622', '1000', '1300', '1500', '1815']}
    />
  );
}
