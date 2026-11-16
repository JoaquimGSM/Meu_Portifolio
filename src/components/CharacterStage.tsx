import { useEffect, useRef, useState } from 'react';
import { usePersona } from '../context/PersonaContext';
import { personas, personaIds } from '../data/personas';
import type { PersonaId } from '../data/personas';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { PauseIcon } from './Icons';
import { WorldScenery } from './WorldScenery';

function CharacterImage({ id, animated }: { id: PersonaId; animated: boolean }) {
  const [ready, setReady] = useState(false);
  const item = personas[id];
  useEffect(() => {
    if (!animated) return;
    const image = new Image();
    image.onload = () => setReady(true);
    image.src = item.gif;
    return () => { image.onload = null; };
  }, [animated, item.gif]);
  return <img className="character-image" src={animated && ready ? item.gif : item.poster} width={item.width} height={item.height} alt={`Joaquim em pixel art como ${item.name.toLowerCase()}.`} data-animated={animated && ready} draggable="false" />;
}

export function CharacterStage() {
  const { persona, paused, togglePause } = usePersona();
  const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
  const [visible, setVisible] = useState(true);
  const [pageVisible, setPageVisible] = useState(true);
  const stage = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    if (stage.current) observer.observe(stage.current);
    const onVisibility = () => setPageVisible(!document.hidden);
    document.addEventListener('visibilitychange', onVisibility);
    return () => { observer.disconnect(); document.removeEventListener('visibilitychange', onVisibility); };
  }, []);
  return <div className="character-stage" ref={stage}>
    <div className="character-scene"><WorldScenery /><div className="character-window">{personaIds.map((id) => <div className={`character-layer character-${id}`} key={id} aria-hidden={persona !== id} data-active={persona === id}>
      <CharacterImage key={`${id}-${persona === id && !paused && !reducedMotion && visible && pageVisible}`} id={id} animated={persona === id && !paused && !reducedMotion && visible && pageVisible} />
    </div>)}</div></div>
    <div className="character-meta"><span>Animação</span>{!reducedMotion ? <button className="character-pause" type="button" aria-pressed={paused} aria-label={paused ? 'Reproduzir personagem' : 'Pausar personagem'} onClick={togglePause}><PauseIcon paused={paused} /><span>{paused ? 'Reproduzir' : 'Pausar'}</span></button> : <span>Movimento reduzido</span>}</div>
  </div>;
}
