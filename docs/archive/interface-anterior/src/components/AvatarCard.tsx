import { useEffect, useRef, useState } from 'react';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { socialLinks } from '../data/projects';
import { ExternalLink } from './ExternalLink';

export function AvatarCard() {
  const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(true);
  const card = useRef<HTMLDivElement>(null);
  const animated = !reducedMotion && !paused && visible;

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0 });
    if (card.current) observer.observe(card.current);
    return () => observer.disconnect();
  }, []);

  return <div className="avatar-card" ref={card}>
    <div className="avatar-card-top"><span><span className="tiny-square" />Além do código</span>{!reducedMotion ? <button className="motion-toggle" aria-label={paused ? 'Reproduzir animação do personagem' : 'Pausar animação do personagem'} aria-pressed={paused} onClick={() => setPaused((value) => !value)}><span aria-hidden="true">{paused ? '▶' : 'Ⅱ'}</span><span>{paused ? 'Reproduzir' : 'Pausar'}</span></button> : <span className="static-label">Quadro estático</span>}</div>
    <div className="avatar-stage">
      <span className="avatar-orbit" aria-hidden="true" />
      <span className="pixel-corner corner-top" aria-hidden="true" />
      <span className="pixel-corner corner-bottom" aria-hidden="true" />
      <picture>
        <source media="(prefers-reduced-motion: reduce)" srcSet="/personagem/guitarrista_pixel_estatico.png" />
        <img className="avatar-image" src={animated ? '/personagem/guitarrista_pixel_transparente.webp' : '/personagem/guitarrista_pixel_estatico.png'} width="400" height="400" alt="Personagem pixel art de Joaquim com cabelo comprido, camiseta Gojira e guitarra roxa." fetchPriority="high" />
      </picture>
    </div>
    <div className="avatar-socials"><ExternalLink href={socialLinks.github}>GitHub</ExternalLink><ExternalLink href={socialLinks.linkedin}>LinkedIn</ExternalLink></div>
  </div>;
}
