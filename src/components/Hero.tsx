import { motion } from 'framer-motion'
import { Link } from 'react-scroll'
import { useEffect, useRef } from 'react'
import '../styles/hero.css'

const Hero = () => {
  const titleRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    const updateTitleColor = () => {
      const isDarkMode = document.documentElement.classList.contains('dark')
      if (titleRef.current) {
        titleRef.current.style.color = isDarkMode ? '#ffffff' : '#000000'
      }
    }

    // Configurar el MutationObserver para detectar cambios en las clases
    const observer = new MutationObserver(updateTitleColor)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    })

    // Actualizar el color inicial
    updateTitleColor()

    // Limpiar el observer cuando el componente se desmonte
    return () => observer.disconnect()
  }, [])

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center pt-16 pb-8 md:pb-16 relative z-10">
      <div className="container mx-auto px-4 bg-white dark:bg-gray-900 rounded-lg shadow-lg py-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 
            ref={titleRef}
            className="text-3xl md:text-4xl lg:text-6xl font-bold mb-4 md:mb-6"
          >
            Diego Catalán
          </h1>
          <h2 className="text-xl md:text-2xl lg:text-3xl text-purple-600 dark:text-purple-400 mb-4 md:mb-6">
            Full Stack Developer
          </h2>
          <p className="text-base md:text-lg lg:text-xl text-purple-600/70 dark:text-purple-400/70 max-w-2xl mx-auto mb-6 md:mb-8">
            Desarrollador full stack con una ambición de superación en cuanto a conocimiento 
            y experiencias nuevas. Busco crear y dar a saber al mundo sobre mis proyectos y mis capacidades.
          </p>
          <div className="flex justify-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="projects"
                smooth={true}
                duration={500}
                className="bg-purple-600 text-white px-6 py-2 md:px-8 md:py-3 rounded-lg hover:bg-purple-700 transition-colors animate-glow cursor-pointer"
              >
                Proyectos
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero
