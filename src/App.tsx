import { lazy, Suspense, useState } from 'react';
import type { Project } from './data/projects';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Projects } from './components/Projects';
import { About } from './components/About';
import { Contact } from './components/Contact';
import { useImageReveals } from './hooks/useImageReveals';

const ProjectDialog = lazy(() => import('./components/ProjectDialog'));

export default function App() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  useImageReveals();

  return <>
    <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
    <Header />
    <main id="conteudo" tabIndex={-1}><Hero /><Projects onSelect={setSelectedProject} /><About /></main>
    <Contact />
    {selectedProject ? <Suspense fallback={<div role="status" className="loading-case">Abrindo projeto…</div>}><ProjectDialog key={selectedProject.id} project={selectedProject} onClose={() => setSelectedProject(null)} /></Suspense> : null}
  </>;
}
