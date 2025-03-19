
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Github, Linkedin, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navigationItems = [
    { name: 'Início', path: '/' },
    { name: 'Sobre', path: '/about' },
    { name: 'Projetos', path: '/projects' },
    { name: 'Contato', path: '/contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Close mobile menu when route changes
    setIsMobileMenuOpen(false);
  }, [location]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  return (
    <header
      className={cn(
        'fixed top-0 w-full z-50 transition-all duration-300',
        isScrolled 
          ? 'bg-white/80 dark:bg-black/30 backdrop-blur-lg shadow-sm py-3' 
          : 'bg-transparent py-5'
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link 
          to="/" 
          className="text-xl font-bold text-foreground transition-all hover:text-primary"
        >
          Gustavo Silva
        </Link>
        
        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <ul className="flex space-x-8">
            {navigationItems.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.path}
                  className={cn(
                    'text-sm font-medium relative transition-all hover:text-primary',
                    'after:absolute after:bottom-[-4px] after:left-0 after:right-0 after:h-[2px] after:bg-primary after:transform after:scale-x-0 after:transition-transform after:duration-300',
                    'hover:after:scale-x-100',
                    location.pathname === item.path 
                      ? 'text-primary after:scale-x-100' 
                      : 'text-foreground'
                  )}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
          
          <div className="flex items-center space-x-3">
            <a 
              href="https://github.com/gustavosilvabr" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-foreground hover:text-primary transition-colors"
              aria-label="Perfil do GitHub"
            >
              <Github size={20} />
            </a>
            <a 
              href="https://www.linkedin.com/in/gustavo-silva69/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-foreground hover:text-primary transition-colors"
              aria-label="Perfil do LinkedIn"
            >
              <Linkedin size={20} />
            </a>
            <a 
              href="https://wa.me/5561995167585" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-foreground hover:text-primary transition-colors"
              aria-label="Contato WhatsApp"
            >
              <MessageSquare size={20} />
            </a>
          </div>
          
          <Link to="/contact">
            <Button className="btn-primary">
              Fale comigo
            </Button>
          </Link>
        </nav>
        
        {/* Mobile menu button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden text-foreground focus:outline-none"
          aria-label={isMobileMenuOpen ? "Fechar menu" : "Abrir menu"}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      {/* Mobile menu */}
      <div
        className={cn(
          'fixed inset-0 bg-background/95 backdrop-blur-md z-40 flex flex-col md:hidden px-4 pt-20 pb-8 transition-transform duration-300',
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <nav className="flex-1 flex flex-col">
          <ul className="space-y-8 mt-8">
            {navigationItems.map((item) => (
              <li key={item.name} className="text-center">
                <Link
                  to={item.path}
                  className={cn(
                    'text-xl font-medium relative transition-all',
                    location.pathname === item.path 
                      ? 'text-primary' 
                      : 'text-foreground'
                  )}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
          
          <div className="flex justify-center items-center space-x-8 mt-12">
            <a 
              href="https://github.com/gustavosilvabr" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-foreground hover:text-primary transition-colors"
              aria-label="Perfil do GitHub"
            >
              <Github size={24} />
            </a>
            <a 
              href="https://www.linkedin.com/in/gustavo-silva69/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-foreground hover:text-primary transition-colors"
              aria-label="Perfil do LinkedIn"
            >
              <Linkedin size={24} />
            </a>
            <a 
              href="https://wa.me/5561995167585" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-foreground hover:text-primary transition-colors"
              aria-label="Contato WhatsApp"
            >
              <MessageSquare size={24} />
            </a>
          </div>
          
          <div className="mt-8 flex justify-center">
            <Link to="/contact">
              <Button className="btn-primary">
                Fale comigo
              </Button>
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
