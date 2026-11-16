type AtmosphereVariant = 'hero' | 'connections' | 'about' | 'contact';

/** Background artwork only; it never replaces project imagery or receives input. */
export function Atmosphere({ variant }: { variant: AtmosphereVariant }) {
  return <div className={`atmosphere atmosphere--${variant}`} aria-hidden="true">
    {variant !== 'about' ? <span className="atmosphere-light" /> : null}
    {variant === 'hero' || variant === 'contact' ? <span className="atmosphere-ring" /> : null}
    {variant === 'connections' ? <svg className="atmosphere-network" viewBox="0 0 1200 600" fill="none">
      <path d="M-80 420 160 290 410 350 690 140 970 220 1260 40M160 290 250 40M410 350 570 650M970 220 1150 600" />
      <circle cx="160" cy="290" r="8" /><circle cx="410" cy="350" r="5" /><circle cx="690" cy="140" r="9" /><circle cx="970" cy="220" r="6" />
    </svg> : <svg className="atmosphere-lines" viewBox="0 0 1000 1000" fill="none">
      <g transform="rotate(-34 550 500)">
        <ellipse cx="550" cy="500" rx="500" ry="260" />
        <ellipse cx="550" cy="500" rx="525" ry="285" />
        <ellipse cx="550" cy="500" rx="575" ry="335" />
      </g>
    </svg>}
  </div>;
}
