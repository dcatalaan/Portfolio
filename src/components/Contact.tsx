import { motion } from 'framer-motion'
import { FaEnvelope, FaPhone, FaGithub, FaDiscord } from 'react-icons/fa'
import { useState } from 'react'

const Contact = () => {
  const [copied, setCopied] = useState(false)
  const [copiedPhone, setCopiedPhone] = useState(false)

  const handleCopyDiscord = () => {
    const discordUsername = 'whereshegoes'
    navigator.clipboard.writeText(discordUsername)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleCopyPhone = () => {
    const phoneNumber = '+50378434730'
    navigator.clipboard.writeText(phoneNumber)
    setCopiedPhone(true)
    setTimeout(() => setCopiedPhone(false), 2000)
  }

  const contactInfo = [
    {
      icon: FaEnvelope,
      label: 'Email',
      value: 'diegocatalanf220@gmail.com',
      onClick: () => window.location.href = 'mailto:diegocatalanf220@gmail.com'
    },
    {
      icon: FaPhone,
      label: 'Teléfono',
      value: copiedPhone ? 'Copiado!' : '(503) 7843-4730',
      onClick: handleCopyPhone
    },
    {
      icon: FaGithub,
      label: 'GitHub',
      value: 'github.com/dcatalaan',
      onClick: () => window.open('https://github.com/dcatalaan', '_blank')
    },
    {
      icon: FaDiscord,
      label: 'Discord',
      value: copied ? 'Copiado!' : 'whereshegoes',
      onClick: handleCopyDiscord
    }
  ]

  return (
    <section id="contact" className="py-16 md:py-20 relative z-10">
      <div className="container mx-auto px-4 bg-white dark:bg-gray-900 rounded-lg shadow-lg py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-center text-dark dark:text-light mb-12">
            Contáctame
          </h2>

          <div className="flex flex-1 gap-4 max-w-6xl mx-auto px-4">
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-50px" }}
                className={`bg-light dark:bg-dark rounded-lg p-8 shadow-lg hover:shadow-xl transition-all border-2 border-purple-500/20 hover:border-purple-500/40 group cursor-pointer ${
                  info.onClick !== undefined ? 'hover:bg-purple-500/5' : 'hover:bg-purple-500/10'
                } flex-1`}
                onClick={info.onClick}
              >
                <div className="text-center">
                  <info.icon className="w-12 h-12 text-purple-500 mx-auto mb-3" />
                  <h3 className="text-xl font-semibold text-dark dark:text-light mb-2">
                    {info.label}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {info.value}
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

export default Contact
