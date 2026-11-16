import { useEffect, useRef, useState } from 'react';
import { CloseIcon, Arrow } from './Icon';
import { containDialogFocus } from '../utils/dialogFocus';

const navigation = [{ href: '#projetos', label: 'Projetos' }, { href: '#sobre', label: 'Sobre' }, { href: '#contato', label: 'Contato' }];

export function Header() {
  const dialog = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const element = dialog.current;
    element?.showModal();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      element?.close();
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  useEffect(() => {
    const media = window.matchMedia('(min-width: 700px)');
    const closeOnDesktop = () => { if (media.matches) setOpen(false); };
    media.addEventListener('change', closeOnDesktop);
    return () => media.removeEventListener('change', closeOnDesktop);
  }, []);

  return <header className="site-header">
    <div className="container header-inner">
      <a href="#inicio" className="brand" aria-label="Joaquim Moura, início"><span className="brand-symbol" aria-hidden="true">j<span>.</span></span><span>Joaquim Moura</span></a>
      <nav className="desktop-nav" aria-label="Navegação principal">{navigation.map((item) => <a className={item.label === 'Contato' ? 'nav-contact' : ''} key={item.href} href={item.href}>{item.label}{item.label === 'Contato' ? <Arrow diagonal /> : null}</a>)}</nav>
      <button className="menu-toggle" aria-label="Abrir menu" aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen(true)}><span /><span /></button>
    </div>
    <dialog id="mobile-menu" className="mobile-menu" aria-label="Menu de navegação" ref={dialog} onKeyDown={containDialogFocus} onClose={() => setOpen(false)}>
      <div className="mobile-menu-head"><span className="brand">Joaquim Moura</span><button className="icon-button" onClick={() => setOpen(false)} aria-label="Fechar menu"><CloseIcon /></button></div>
      <nav aria-label="Navegação móvel">{navigation.map((item) => <a key={item.href} href={item.href} onClick={() => setOpen(false)}>{item.label}<Arrow diagonal /></a>)}</nav>
      <p>Desenvolvimento de software<br />& front-end.</p>
    </dialog>
  </header>;
}
