export const personaIds = ['guitarrista', 'boxeador', 'tenista'] as const;
export type PersonaId = typeof personaIds[number];
export const PERSONA_STORAGE_KEY = 'joaquim:persona:v1';

export const personas = {
  guitarrista: { id: 'guitarrista', name: 'Guitarrista', gif: '/personagens/guitarrista.gif', poster: '/personagens/guitarrista-poster.png', width: 414, height: 414, themeColor: '#6410c9', rhythm: 'cubic-bezier(.22,1,.36,1)', duration: 240 },
  boxeador: { id: 'boxeador', name: 'Boxeador', gif: '/personagens/boxeador.gif', poster: '/personagens/boxeador-poster.png', width: 408, height: 398, themeColor: '#f6c934', rhythm: 'cubic-bezier(.18,.9,.22,1)', duration: 200 },
  tenista: { id: 'tenista', name: 'Tenista', gif: '/personagens/tenista.gif', poster: '/personagens/tenista-poster.png', width: 413, height: 414, themeColor: '#165a40', rhythm: 'cubic-bezier(.25,.7,.2,1)', duration: 280 },
} as const;

export function isPersonaId(value: unknown): value is PersonaId {
  return typeof value === 'string' && personaIds.some((id) => id === value);
}
