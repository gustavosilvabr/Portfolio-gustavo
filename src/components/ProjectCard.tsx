
import { useState, useEffect } from 'react';
import { Star, GitFork, ExternalLink, Github, Code } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProjectCardProps {
  project: {
    id: number;
    name: string;
    html_url: string;
    description: string;
    homepage?: string;
    stargazers_count: number;
    forks_count: number;
    language: string;
    topics: string[];
  };
  delay?: number;
}

const ProjectCard = ({ project, delay = 0 }: ProjectCardProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Language colors mapping
  const languageColors: Record<string, string> = {
    JavaScript: 'bg-yellow-300',
    TypeScript: 'bg-blue-400',
    HTML: 'bg-orange-500',
    CSS: 'bg-indigo-400',
    Python: 'bg-blue-500',
    Java: 'bg-red-600',
    'C#': 'bg-green-600',
    PHP: 'bg-indigo-600',
    Go: 'bg-blue-300',
    Ruby: 'bg-red-500',
    Dart: 'bg-cyan-500',
    Swift: 'bg-orange-600',
    Kotlin: 'bg-purple-500',
    Rust: 'bg-orange-700',
  };

  // Simulating image loading with project name
  useEffect(() => {
    const timer = setTimeout(() => {
      setImageLoaded(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // Animate entry
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  // Format the repository name by removing dashes and capitalizing
  const formatName = (name: string) => {
    return name
      .replace(/-/g, ' ')
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  // Generate image url based on name (could be replaced with actual image API)
  const getImageUrl = (name: string) => {
    const encodedName = encodeURIComponent(name.replace(/[-_]/g, '+'));
    return `https://raw.githubusercontent.com/gustavosilvabr/${name}/main/screenshot.png, https://ui-avatars.com/api/?name=${encodedName}&background=0D8ABC&color=fff&size=250`;
  };

  // Determinar a cor de fundo do cartão com base na linguagem do projeto
  const getCardBackground = () => {
    const language = project.language || 'JavaScript';
    const baseClasses = 'group glass-card rounded-xl overflow-hidden transition-all duration-700 transform border border-zinc-800/20 dark:border-zinc-100/10';
    
    if (isVisible) {
      return `${baseClasses} opacity-100 translate-y-0`;
    } else {
      return `${baseClasses} opacity-0 translate-y-10`;
    }
  };

  return (
    <div className={getCardBackground()}>
      <div className="relative aspect-video overflow-hidden bg-zinc-900/20">
        {!imageLoaded && (
          <div className="absolute inset-0 bg-card animate-pulse flex items-center justify-center">
            <Code size={32} className="text-primary/40" />
          </div>
        )}
        <div className={cn(
          'w-full h-full flex items-center justify-center',
          imageLoaded ? 'opacity-100' : 'opacity-0'
        )}>
          <Code size={48} className="text-primary/40" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <div className="flex justify-between">
            <a 
              href={project.html_url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white bg-primary/80 hover:bg-primary rounded-full p-2 transition-colors"
              aria-label="Ver Repositório"
            >
              <Github size={18} />
            </a>
            {project.homepage && (
              <a 
                href={project.homepage} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white bg-primary/80 hover:bg-primary rounded-full p-2 transition-colors"
                aria-label="Visitar Demo do Projeto"
              >
                <ExternalLink size={18} />
              </a>
            )}
          </div>
        </div>
      </div>
      
      <div className="p-5">
        <h3 className="font-medium text-xl mb-2 truncate mono">{formatName(project.name)}</h3>
        
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2 h-10">
          {project.description || "Um projeto de Gustavo Silva"}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {project.topics.slice(0, 3).map((topic, index) => (
            <span 
              key={index} 
              className="inline-block bg-secondary/50 border border-zinc-800/10 text-xs px-2 py-1 rounded-full mono"
            >
              {topic}
            </span>
          ))}
          {project.topics.length > 3 && (
            <span className="inline-block bg-secondary/50 border border-zinc-800/10 text-xs px-2 py-1 rounded-full mono">
              +{project.topics.length - 3}
            </span>
          )}
        </div>
        
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Star size={16} className="text-yellow-500" />
              <span>{project.stargazers_count}</span>
            </div>
            <div className="flex items-center gap-1">
              <GitFork size={16} className="text-muted-foreground" />
              <span>{project.forks_count}</span>
            </div>
          </div>
          
          {project.language && (
            <div className="flex items-center gap-1.5">
              <span 
                className={cn(
                  "w-3 h-3 rounded-full", 
                  languageColors[project.language] || "bg-gray-500"
                )}
              ></span>
              <span className="text-muted-foreground mono">{project.language}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
