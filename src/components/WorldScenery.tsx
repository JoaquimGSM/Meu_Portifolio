export function WorldScenery({ small = false }: { small?: boolean }) {
  return <div className={`world-scenery ${small ? 'scenery-small' : ''}`} aria-hidden="true">
    <div className="scene scene-sound"><span className="sound-cutout" /><svg className="sound-wave" viewBox="0 0 1000 500" fill="none"><path d="M-80 320 180 320 255 190 320 370 398 110 470 320 555 235 630 320 1080 180" /><path d="M-80 338 180 338 255 208 320 388 398 128 470 338 555 253 630 338 1080 198" /></svg><span className="sound-stamp">SOUND</span></div>
    <div className="scene scene-impact"><span className="impact-paper" /><span className="impact-rule" /><svg className="impact-lines" viewBox="0 0 800 600" fill="none"><path d="m80 150 160 70m-55-180 80 150M720 450l-160-70m55 180-80-150" /><path d="M110 390V90h300m280 120v300H390" /></svg><span className="impact-stamp">IMPACT</span></div>
    <div className="scene scene-court"><svg className="court-lines" viewBox="0 0 800 600" fill="none"><path d="M130 500V260a270 270 0 0 1 540 0v240zM230 500V260a170 170 0 0 1 340 0v240M130 365h540M400 95v405" /><path className="court-flight" d="M20 500C100 60 660 20 780 300" /><circle cx="732" cy="225" r="12" /></svg><svg className="court-leaf" viewBox="0 0 100 100"><path d="M9 89C-8 35 38 4 93 8 94 65 59 99 9 89Z" /><path d="M12 88 79 22" fill="none" /></svg><span className="court-stamp">COURT</span></div>
  </div>;
}
