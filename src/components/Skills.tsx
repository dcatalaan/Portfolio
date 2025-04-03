import { motion } from 'framer-motion'
import { 
  SiTypescript, 
  SiPhp, 
  SiCsharp,
  SiPython,
  SiMicrosoftsqlserver,
  SiReact,
  SiKotlin
} from 'react-icons/si'
import { FaJava } from 'react-icons/fa'

const Skills = () => {
  const skills = [
    { name: 'Java', icon: FaJava, color: 'text-red-600' },
    { name: 'TypeScript', icon: SiTypescript, color: 'text-blue-600' },
    { name: 'PHP', icon: SiPhp, color: 'text-purple-600' },
    { name: 'C#', icon: SiCsharp, color: 'text-blue-600' },
    { name: 'React', icon: SiReact, color: 'text-blue-400' },
    { name: 'SQL Server', icon: SiMicrosoftsqlserver, color: 'text-red-500' },
    { name: 'Python', icon: SiPython, color: 'text-yellow-500' },
    { name: 'Kotlin', icon: SiKotlin, color: 'text-purple-500' }
  ]

  const languages = [
    { name: 'Inglés', level: 'Avanzado' },
    { name: 'Español', level: 'Nativo' }
  ]

  return (
    <section id="skills" className="py-20 relative z-10">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-center text-dark dark:text-light mb-12">
            Tech Stack
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            {skills.map((skill, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                viewport={{ once: true, margin: "-50px" }}
                className={`bg-light/50 dark:bg-dark/50 rounded-lg p-6 shadow-lg hover:shadow-xl transition-all group relative overflow-hidden ${
                  skill.color === 'text-red-600' ? 'border-red-500/20 hover:border-red-500/40' :
                  skill.color === 'text-blue-600' ? 'border-blue-500/20 hover:border-blue-500/40' :
                  skill.color === 'text-blue-400' ? 'border-blue-400/20 hover:border-blue-400/40' :
                  skill.color === 'text-purple-600' ? 'border-purple-500/20 hover:border-purple-500/40' :
                  skill.color === 'text-yellow-500' ? 'border-yellow-500/20 hover:border-yellow-500/40' :
                  'border-purple-500/20 hover:border-purple-500/40'
                }`}
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${
                  skill.color === 'text-red-600' ? 'from-red-500/10 to-red-400/10' :
                  skill.color === 'text-blue-600' ? 'from-blue-500/10 to-blue-400/10' :
                  skill.color === 'text-blue-400' ? 'from-blue-400/10 to-blue-300/10' :
                  skill.color === 'text-purple-600' ? 'from-purple-500/10 to-purple-400/10' :
                  skill.color === 'text-yellow-500' ? 'from-yellow-500/10 to-yellow-400/10' :
                  'from-purple-500/10 to-purple-400/10'
                }`} />
                <div className="relative z-10 flex flex-col items-center">
                  <skill.icon className={`w-12 h-12 ${skill.color} mb-4`} />
                  <h3 className="text-lg font-semibold text-dark dark:text-light">
                    {skill.name}
                  </h3>
                </div>
              </motion.div>
            ))}
          </div>

          <h2 className="text-3xl font-bold text-center text-dark dark:text-light mb-8">
            Idiomas
          </h2>

          <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
            {languages.map((lang, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                viewport={{ once: true, margin: "-50px" }}
                className="bg-light/50 dark:bg-dark/50 rounded-lg p-8 shadow-lg hover:shadow-xl transition-all border-2 border-purple-500/20 hover:border-purple-500/40 group"
              >
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-dark dark:text-light mb-3 group-hover:text-purple-500 transition-colors">
                    {lang.name}
                  </h3>
                  <div className="w-12 h-1 bg-purple-500 mx-auto mb-3 rounded-full group-hover:w-24 transition-all duration-300 ease-in-out"></div>
                  <p className="text-lg text-purple-600 dark:text-purple-400 font-medium">{lang.level}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Skills
