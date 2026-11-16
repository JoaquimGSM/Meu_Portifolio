import { usePersona } from '../context/PersonaContext';
import { personas, personaIds } from '../data/personas';

export function PersonaSelector({ compact = false, onSelect }: { compact?: boolean; onSelect?: () => void }) {
  const { persona, selectPersona } = usePersona();
  return <div className={`persona-selector ${compact ? 'selector-compact' : ''}`} role="group" aria-label={compact ? 'Escolher personagem' : 'Personagem'}>
    {personaIds.map((id) => <button key={id} type="button" className="persona-option" aria-pressed={persona === id} aria-label={personas[id].name} onClick={() => { selectPersona(id); onSelect?.(); }}>
      <span className={`selector-portrait selector-${id}`}><img src={personas[id].poster} alt="" width="64" height="64" /></span>
      <span className="selector-name">{personas[id].name}</span>
      <span className="selector-check" aria-hidden="true" />
    </button>)}
  </div>;
}
