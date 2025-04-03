import { motion } from 'framer-motion'

const About = () => {
  const experiences = [
    {
      title: 'Free Lancer',
      period: '2020 - Actualidad',
      description: [
        'Integración de APIs externas',
        'Gestión de VPS y SSH',
        'Desarrollo de Bots Personalizados en Java',
        'Desarrollo con Laravel y PHP',
        'Desarrollo con XenForo',
        'Mantenimiento de Servidores'
      ]
    },
    {
      title: 'Junior Developer',
      company: 'Kiuvo S.A de C.V',
      period: '2024 - Actualidad',
      description: [
        'Desarrollo de sistemas de facturación e inventario',
        'Desarrollo de interfaces de usuario con C# y ASP.NET',
        'Implementación de bases de datos SQL Server',
        'Implementación de facturación electrónica',
        'Creación de reportes en Excel y PDF'
      ]
    }
  ]

  return (
    <section id="about" className="py-20 bg-light dark:bg-dark">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-center text-dark dark:text-light mb-12">
            Experiencia Profesional
          </h2>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                viewport={{ once: true, margin: "-50px" }}
                className="bg-light/50 dark:bg-dark/50 rounded-lg p-8 shadow-lg hover:shadow-xl transition-all border-2 border-purple-500/20 hover:border-purple-500/40 group"
              >
                <div className="relative pb-4 mb-6 border-b border-gray-200 dark:border-gray-700">
                  <h3 className="text-2xl font-bold text-dark dark:text-light mb-2 group-hover:text-purple-500 transition-colors">
                    {exp.title}
                  </h3>
                  {exp.company && (
                    <p className="text-lg text-purple-600 dark:text-purple-400 font-medium mb-2">{exp.company}</p>
                  )}
                  <p className="text-gray-600 dark:text-gray-400 font-medium">
                    <span className="inline-block bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 px-3 py-1 rounded-full text-sm">
                      {exp.period}
                    </span>
                  </p>
                </div>
                <ul className="space-y-3 text-gray-600 dark:text-gray-300">
                  {exp.description.map((item, i) => (
                    <li key={i} className="flex items-start group/item">
                      <span className="inline-block w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 group-hover/item:scale-125 transition-transform"></span>
                      <span className="flex-1 group-hover/item:text-purple-500 transition-colors">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default About
