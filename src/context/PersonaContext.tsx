import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { isPersonaId, personas, PERSONA_STORAGE_KEY } from '../data/personas';
import type { PersonaId } from '../data/personas';

interface PersonaState {
  persona: PersonaId;
  selectPersona: (persona: PersonaId) => void;
  paused: boolean;
  togglePause: () => void;
}

const PersonaContext = createContext<PersonaState | null>(null);

export function PersonaProvider({ children }: { children: ReactNode }) {
  const [persona, setPersona] = useState<PersonaId>(() => {
    const initial = document.documentElement.dataset.persona;
    return isPersonaId(initial) ? initial : 'guitarrista';
  });
  const [paused, setPaused] = useState(false);

  const selectPersona = useCallback((id: PersonaId) => {
    document.documentElement.dataset.persona = id;
    document.documentElement.style.setProperty('--switch-duration', `${personas[id].duration}ms`);
    document.documentElement.style.setProperty('--switch-ease', personas[id].rhythm);
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', personas[id].themeColor);
    setPersona(id);
    try { localStorage.setItem(PERSONA_STORAGE_KEY, id); } catch { /* The experience works without storage. */ }
  }, []);

  useEffect(() => {
    const onStorage = (event: StorageEvent) => {
      if (event.key === PERSONA_STORAGE_KEY && isPersonaId(event.newValue)) selectPersona(event.newValue);
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, [selectPersona]);

  return <PersonaContext.Provider value={{ persona, selectPersona, paused, togglePause: () => setPaused((value) => !value) }}>{children}</PersonaContext.Provider>;
}

// Keeping provider and its hook together avoids a second state source.
// eslint-disable-next-line react-refresh/only-export-components
export function usePersona() {
  const context = useContext(PersonaContext);
  if (!context) throw new Error('PersonaProvider is required');
  return context;
}
