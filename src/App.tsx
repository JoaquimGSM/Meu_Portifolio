import { PersonaProvider } from './context/PersonaContext';
import { Navigation } from './components/Navigation';
import { PersonalWorld } from './components/PersonalWorld';
import { ProjectGallery } from './components/ProjectGallery';
import { PersonalNote } from './components/PersonalNote';
import { PersonalFooter } from './components/PersonalFooter';

export default function App() {
  return <PersonaProvider><a href="#conteudo" className="skip-link">Pular para o conteúdo</a><Navigation /><main id="conteudo" tabIndex={-1}><PersonalWorld /><ProjectGallery /><PersonalNote /></main><PersonalFooter /></PersonaProvider>;
}
