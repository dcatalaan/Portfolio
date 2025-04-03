import { motion } from 'framer-motion'

const Timeline = () => {
  const education = [
    {
      period: '2022 - Actualidad',
      institution: 'ITCA-FEPADE',
      title: 'Ingeniería en Desarrollo de Software',
      current: true
    },
    {
      period: '2023 - Actualidad',
      institution: 'Escuela Superior de Innovación y Tecnología',
      title: 'Escuela Superior de Innovación y Tecnología',
      current: true
    },
    {
      period: '2019 - 2020',
      institution: 'Avanza Formación Continua',
      title: 'Curso de Reparación y Mantenimiento de Computadoras, Sistemas y Redes Informáticas',
      current: false
    }
  ]

  return (
    <section className="py-12 md:py-20 relative z-10">
      <div className="container mx-auto px-4 bg-white dark:bg-gray-900 rounded-lg shadow-lg py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center text-gray-800 dark:text-white mb-8 md:mb-12">
            Formación
          </h2>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-blue-200 dark:bg-blue-900 z-0" />

            {/* Timeline points */}
            {education.map((_, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                viewport={{ once: true, margin: "-50px" }}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10"
              >
                <div className="w-6 h-6 bg-blue-500 rounded-full animate-pulse" />
              </motion.div>
            ))}

            {/* Timeline content */}
            {education.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                viewport={{ once: true, margin: "-50px" }}
                className={`relative mb-8 md:mb-12 ${
                  item.institution === 'Escuela Superior de Innovación y Tecnología' ? 'md:mr-auto md:pr-8' : 'md:ml-auto md:pl-8'
                } md:w-1/2`}
              >
                <div className="bg-white dark:bg-gray-900 rounded-lg p-4 md:p-6 shadow-lg hover:shadow-xl transition-all">
                  <h3 className="text-lg md:text-xl font-bold text-gray-800 dark:text-white mb-2">
                    {item.institution}
                  </h3>
                  <p className="text-blue-600 dark:text-blue-400 mb-2 text-base md:text-lg">{item.title}</p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base">
                    {item.period}
                    {item.current && (
                      <span className="ml-2 inline-block px-2 py-1 text-xs md:text-sm font-semibold text-white bg-green-500 rounded-full">
                        Actual
                      </span>
                    )}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Timeline
