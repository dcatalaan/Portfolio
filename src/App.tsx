import { useState, useEffect } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Experience from './components/Experience'
import ParticlesBackground from './components/ParticlesBackground'
import AudioPlayer from './components/AudioPlayer'
import './styles/particles.css'
import './styles/glow.css'
import './styles/global.css'

function App() {
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  return (
    <div className="relative min-h-screen">
      <ParticlesBackground />
      <div className="relative z-10">
        <Header darkMode={darkMode} setDarkMode={setDarkMode} />
        <main className="space-y-16">
          <Hero />
          <About />
          <Skills />
          <Experience />
          <Projects />
          <Contact />
        </main>
      </div>
      <AudioPlayer />
    </div>
  )
}

export default App
