
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';
import { Link as ScrollLink } from 'react-scroll';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  const [typedText, setTypedText] = useState('');
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);
  
  const phrases = [
    'Desenvolvedor Full Stack',
    'Especialista em React',
    'Desenvolvedor Mobile',
    'Militar da Força Aérea',
    'Entusiasta de Tecnologia'
  ];

  useEffect(() => {
    const handleTyping = () => {
      const currentPhrase = phrases[currentPhraseIndex];
      const shouldDelete = isDeleting;
      
      if (!shouldDelete && typedText === currentPhrase) {
        // Wait before starting to delete
        setIsDeleting(true);
        setTypingSpeed(2000); // Pause at the end
        return;
      }
      
      if (shouldDelete && typedText === '') {
        // Move to the next phrase
        setIsDeleting(false);
        setCurrentPhraseIndex((currentPhraseIndex + 1) % phrases.length);
        setTypingSpeed(200);
        return;
      }
      
      const nextText = shouldDelete
        ? currentPhrase.substring(0, typedText.length - 1)
        : currentPhrase.substring(0, typedText.length + 1);
      
      setTypedText(nextText);
      setTypingSpeed(shouldDelete ? 50 : 100);
    };
    
    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [typedText, currentPhraseIndex, isDeleting, typingSpeed, phrases]);

  const scrollToNextSection = () => {
    const nextSection = document.getElementById('about-section');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative pt-20 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/5 z-0"></div>
      
      <div className="container mx-auto px-4 z-10">
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4">
              Gustavo Pereira da Silva
            </h1>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="h-12 mb-6 mono"
          >
            <h2 className="text-2xl md:text-3xl text-primary font-medium">
              <span className="text-gray-400">&lt;</span> 
              {typedText}
              <span className="inline-block w-[3px] h-7 bg-primary ml-1 cursor-blink"></span>
              <span className="text-gray-400"> /&gt;</span>
            </h2>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-8 max-w-2xl"
          >
            <div className="code-block text-left mb-6 text-sm md:text-base">
              <p className="comment">// Desenvolvedor Full Stack</p>
              <p><span className="keyword">const</span> <span className="function">apresentação</span> = () =&gt; {'{'}</p>
              <p className="ml-4"><span className="keyword">return</span> {'{'}</p>
              <p className="ml-8"><span className="tag">nome</span>: <span className="string">"Gustavo Pereira da Silva"</span>,</p>
              <p className="ml-8"><span className="tag">especialidade</span>: <span className="string">"Aplicações web e mobile modernas"</span>,</p>
              <p className="ml-8"><span className="tag">tecnologias</span>: [<span className="string">"React"</span>, <span className="string">"React Native"</span>, <span className="string">"Node.js"</span>, <span className="string">"TypeScript"</span>]</p>
              <p className="ml-4">{'}'}</p>
              <p>{'}'}</p>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link to="/projects">
              <Button className="btn-primary min-w-[180px]">
                Ver Meus Projetos
              </Button>
            </Link>
            <Link to="/contact">
              <Button className="btn-secondary min-w-[180px]">
                Entre em Contato
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
      
      {/* Scroll down indicator */}
      <motion.div 
        className="absolute bottom-10 left-0 right-0 flex justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1 }}
      >
        <ScrollLink 
          to="about-section" 
          smooth={true} 
          duration={500} 
          className="cursor-pointer flex flex-col items-center text-muted-foreground hover:text-primary transition-colors"
          onClick={scrollToNextSection}
        >
          <span className="text-sm mono mb-2">Rolar para baixo</span>
          <ChevronDown size={24} className="animate-bounce" />
        </ScrollLink>
      </motion.div>
    </section>
  );
};

export default HeroSection;
