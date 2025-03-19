
import { MessageCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

const WhatsAppButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <a
      href="https://wa.me/5561995167585"
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "fixed bottom-6 right-6 bg-green-500 text-white p-3 rounded-full shadow-lg z-50 transition-all duration-300 transform hover:scale-110",
        isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
      )}
      aria-label="Contato WhatsApp"
    >
      <MessageCircle size={28} />
    </a>
  );
};

export default WhatsAppButton;
