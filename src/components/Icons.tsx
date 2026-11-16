export function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" shapeRendering="crispEdges" aria-hidden="true"><path d={diagonal ? 'M6 2h12v12h-3V8h-3v3H9v3H6v3H3v-3h3v-3h3V8h3V5H6z' : 'M10 2h3v3h3v3h3v4h-3v3h-3v3h-3v-6H1V8h9V5z'} /></svg>;
}

export function PauseIcon({ paused }: { paused: boolean }) {
  return <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">{paused ? <path d="m4 2 9 6-9 6z" /> : <path d="M4 2h3v12H4zm5 0h3v12H9z" />}</svg>;
}
