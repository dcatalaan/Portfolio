import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { FaGithub } from 'react-icons/fa'
import { Link } from 'react-scroll'

interface Project {
  id: number;
  name: string;
  description: string;
  html_url: string;
  homepage?: string;
  language: string;
  image: string;
  title: string;
  tags: string[];
}

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        setError(null);
        
        console.log('Fetching projects from GitHub...');
        
        const response = await fetch('https://api.github.com/users/dcatalaan/repos', {
          headers: {
            'Accept': 'application/vnd.github.v3+json'
          }
        });

        console.log('GitHub API response status:', response.status);
        
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(`GitHub API error: ${errorData.message || response.statusText}`);
        }

        const data = await response.json();
        console.log('Raw GitHub response:', data);
        
        if (!Array.isArray(data)) {
          throw new Error('Invalid response format from GitHub API');
        }

        const filteredProjects = data
          .filter((repo: any) => !repo.fork)
          .map((project: any) => ({
            id: project.id,
            name: project.name,
            description: project.description || 'No description provided',
            html_url: project.html_url,
            homepage: project.homepage,
            language: project.language || 'Other',
            image: '',
            title: project.name,
            tags: [project.language || 'Other']
          }));

        console.log('Filtered projects:', filteredProjects);
        setProjects(filteredProjects);
      } catch (error: any) {
        console.error('Error fetching projects:', error);
        setError(error.message || 'Failed to fetch projects');
        setProjects([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="animate-pulse">
          <div className="h-8 w-32 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
          <div className="h-4 w-64 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
          <div className="h-4 w-48 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-red-600 dark:text-red-400 mb-4">
          Error Loading Projects
        </h2>
        <p className="text-gray-600 dark:text-gray-400">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!projects || projects.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-600 dark:text-gray-400 mb-4">
          No Projects Found
        </h2>
        <p className="text-gray-600 dark:text-gray-400">No projects were found in your GitHub account.</p>
      </div>
    );
  }

  return (
    <section id="projects" className="py-16 md:py-20 relative z-10">
      <div className="container mx-auto px-4 bg-white dark:bg-gray-900 rounded-lg shadow-lg py-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center text-purple-600 dark:text-purple-400 mb-8 md:mb-12">
            Mis Proyectos
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {projects.map((project) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-all cursor-pointer relative"
                onClick={() => window.open(project.html_url, '_blank')}
              >
                <div className="relative h-40 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-purple-700/20"></div>
                  <div className="absolute bottom-0 left-0 p-4 flex items-center gap-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-tr-lg">
                    <FaGithub className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                    <div>
                      <h3 className="text-sm md:text-base font-medium text-gray-800 dark:text-white">
                        {project.title}
                      </h3>
                      <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400">
                        {project.description}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
