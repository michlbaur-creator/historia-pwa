import type { Metadata } from 'next';
import HistoriaPlayer from '../HistoriaPlayer';
import { historiaEpisode3Scenes } from '../episode3-data';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Episode 3 – Nationen Weltkriege und Gegenwart | Historia',
  description:
    '16 kompakte Schlüsselszenen von der Industrialisierung bis zur global vernetzten Gegenwart.',
};

export default function EpisodeThreePage() {
  return (
    <HistoriaPlayer
      scenes={historiaEpisode3Scenes}
      episodeNumber={3}
      episodeTitle="Nationen Weltkriege und Gegenwart"
      timelineLabels={['1750', '1850', '1914', '1945', 'heute']}
    />
  );
}
