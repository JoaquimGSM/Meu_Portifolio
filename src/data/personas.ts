export const personaIds = ['guitarrista', 'boxeador', 'tenista'] as const;
export type PersonaId = typeof personaIds[number];
export const PERSONA_STORAGE_KEY = 'joaquim:persona:v1';

export const personas = {
  guitarrista: { id: 'guitarrista', name: 'Guitarrista', label: 'Sound', interest: 'Guitarra & música', gif: '/personagens/guitarrista.gif', poster: '/personagens/guitarrista-poster.png', width: 414, height: 414, themeColor: '#21132f', rhythm: 'cubic-bezier(.22,1,.36,1)', duration: 440 },
  boxeador: { id: 'boxeador', name: 'Boxeador', label: 'Impact', interest: 'Boxe & movimento', gif: '/personagens/boxeador.gif', poster: '/personagens/boxeador-poster.png', width: 408, height: 398, themeColor: '#ead9f3', rhythm: 'cubic-bezier(.18,.9,.22,1)', duration: 300 },
  tenista: { id: 'tenista', name: 'Tenista', label: 'Court', interest: 'Tênis & cadência', gif: '/personagens/tenista.gif', poster: '/personagens/tenista-poster.png', width: 413, height: 414, themeColor: '#123c2d', rhythm: 'cubic-bezier(.25,.7,.2,1)', duration: 560 },
} as const;

export function isPersonaId(value: unknown): value is PersonaId {
  return typeof value === 'string' && personaIds.some((id) => id === value);
}
