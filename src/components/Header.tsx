import { FaMoon, FaSun, FaGithub, FaDiscord, FaBars, FaTimes } from 'react-icons/fa'
import { Link } from 'react-scroll'
import { useState } from 'react'

interface HeaderProps {
  darkMode: boolean
  setDarkMode: (darkMode: boolean) => void
}

const Header = ({ darkMode, setDarkMode }: HeaderProps) => {
  const navItems = [
    { name: 'Proyectos', to: 'projects' },
    { name: 'Sobre Mí', to: 'about' },
    { name: 'Contáctame', to: 'contact' }
  ]

  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="fixed w-full z-50 bg-light dark:bg-dark/80 backdrop-blur-sm">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link
            to="hero"
            smooth={true}
            className="text-xl md:text-2xl font-bold text-dark dark:text-light cursor-pointer"
          >
            DC
          </Link>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                smooth={true}
                className="text-dark dark:text-light hover:text-primary dark:hover:text-primary-light cursor-pointer transition-colors"
              >
                {item.name}
              </Link>
            ))}

            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-lg bg-light dark:bg-dark hover:ring-2 ring-primary transition-all animate-glow"
            >
              {darkMode ? (
                <FaSun className="w-5 h-5 text-yellow-500" />
              ) : (
                <FaMoon className="w-5 h-5 text-gray-600" />
              )}
            </button>

            <a
              href="https://github.com/Dryph"
              target="_blank"
              rel="noopener noreferrer"
              className="text-dark dark:text-light hover:text-gray-900 dark:hover:text-white"
            >
              <FaGithub className="w-6 h-6" />
            </a>

            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="text-dark dark:text-light hover:text-blue-600 dark:hover:text-blue-400"
            >
              <FaDiscord className="w-6 h-6" />
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg bg-light dark:bg-dark hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            {isOpen ? (
              <FaTimes className="w-6 h-6 text-gray-600 dark:text-gray-300" />
            ) : (
              <FaBars className="w-6 h-6 text-gray-600 dark:text-gray-300" />
            )}
          </button>
        </div>

        {/* Mobile menu */}
        <div
          className={`md:hidden mt-4 ${
            isOpen ? 'block' : 'hidden'
          }`}
        >
          <div className="space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                smooth={true}
                className="block w-full text-center text-dark dark:text-light hover:text-primary dark:hover:text-primary-light cursor-pointer transition-colors py-2"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}

            <div className="flex flex-col space-y-2">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="w-full p-2 rounded-lg bg-light dark:bg-dark hover:ring-2 ring-primary transition-all animate-glow"
              >
                {darkMode ? (
                  <FaSun className="w-5 h-5 text-yellow-500 mx-auto" />
                ) : (
                  <FaMoon className="w-5 h-5 text-gray-600 mx-auto" />
                )}
              </button>

              <a
                href="https://github.com/Dryph"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-center text-dark dark:text-light hover:text-gray-900 dark:hover:text-white"
              >
                <FaGithub className="w-6 h-6 mx-auto" />
              </a>

              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-center text-dark dark:text-light hover:text-blue-600 dark:hover:text-blue-400"
              >
                <FaDiscord className="w-6 h-6 mx-auto" />
              </a>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header
