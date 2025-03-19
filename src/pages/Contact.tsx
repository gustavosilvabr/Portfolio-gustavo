
import { useState, FormEvent } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollReveal from '@/components/ScrollReveal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Github, 
  Linkedin, 
  Send,
  Loader2,
  CheckCircle2
} from 'lucide-react';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    // Form validation
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: 'Missing information',
        description: 'Please fill in all required fields.',
        variant: 'destructive',
      });
      return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: 'Invalid email',
        description: 'Please enter a valid email address.',
        variant: 'destructive',
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      toast({
        title: 'Message sent!',
        description: 'Thanks for reaching out. I\'ll get back to you soon.',
      });
      
      // Reset form after successful submission
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      
      // Reset submission status after a delay
      setTimeout(() => {
        setIsSubmitted(false);
      }, 3000);
    }, 1500);
  };
  
  return (
    <>
      <Navbar />
      
      <main className="pt-20">
        {/* Header Section */}
        <section className="bg-card py-16 md:py-20">
          <div className="container-content">
            <ScrollReveal>
              <div className="text-center">
                <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
                  Contact
                </span>
                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                  Get In Touch
                </h1>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Have a project in mind or want to discuss a potential collaboration? 
                  Feel free to reach out!
                </p>
              </div>
            </ScrollReveal>
          </div>
        </section>
        
        {/* Contact Information */}
        <section className="section">
          <div className="container-content">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              <ScrollReveal delay={100}>
                <div className="glass-card rounded-xl p-6 text-center">
                  <div className="w-12 h-12 mx-auto flex items-center justify-center bg-primary/10 text-primary rounded-full mb-4">
                    <Mail size={24} />
                  </div>
                  <h3 className="text-lg font-medium mb-2">Email</h3>
                  <a 
                    href="mailto:gutzs1212@gmail.com" 
                    className="text-primary hover:underline transition-all"
                  >
                    gutzs1212@gmail.com
                  </a>
                </div>
              </ScrollReveal>
              
              <ScrollReveal delay={200}>
                <div className="glass-card rounded-xl p-6 text-center">
                  <div className="w-12 h-12 mx-auto flex items-center justify-center bg-primary/10 text-primary rounded-full mb-4">
                    <Phone size={24} />
                  </div>
                  <h3 className="text-lg font-medium mb-2">Phone / WhatsApp</h3>
                  <a 
                    href="https://wa.me/5561995167585" 
                    className="text-primary hover:underline transition-all"
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    +55 61 99516-7585
                  </a>
                </div>
              </ScrollReveal>
              
              <ScrollReveal delay={300}>
                <div className="glass-card rounded-xl p-6 text-center">
                  <div className="w-12 h-12 mx-auto flex items-center justify-center bg-primary/10 text-primary rounded-full mb-4">
                    <MapPin size={24} />
                  </div>
                  <h3 className="text-lg font-medium mb-2">Location</h3>
                  <p className="text-muted-foreground">
                    Brazil
                  </p>
                </div>
              </ScrollReveal>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <ScrollReveal direction="left">
                <div className="glass-card rounded-xl p-8">
                  <h2 className="text-2xl font-bold mb-6">Send me a message</h2>
                  <form onSubmit={handleSubmit}>
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium mb-1">
                          Name <span className="text-primary">*</span>
                        </label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Your name"
                          className="bg-secondary/50"
                          required
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium mb-1">
                          Email <span className="text-primary">*</span>
                        </label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="your.email@example.com"
                          className="bg-secondary/50"
                          required
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="subject" className="block text-sm font-medium mb-1">
                          Subject
                        </label>
                        <Input
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          placeholder="What is this regarding?"
                          className="bg-secondary/50"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="message" className="block text-sm font-medium mb-1">
                          Message <span className="text-primary">*</span>
                        </label>
                        <Textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          placeholder="Your message here..."
                          className="bg-secondary/50"
                          rows={5}
                          required
                        />
                      </div>
                      
                      <Button 
                        type="submit" 
                        className="btn-primary w-full"
                        disabled={isSubmitting || isSubmitted}
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Sending...
                          </>
                        ) : isSubmitted ? (
                          <>
                            <CheckCircle2 className="mr-2 h-4 w-4" />
                            Sent!
                          </>
                        ) : (
                          <>
                            <Send className="mr-2 h-4 w-4" />
                            Send Message
                          </>
                        )}
                      </Button>
                    </div>
                  </form>
                </div>
              </ScrollReveal>
              
              {/* Connect & Links */}
              <ScrollReveal direction="right">
                <div className="space-y-8">
                  <div className="glass-card rounded-xl p-8">
                    <h2 className="text-2xl font-bold mb-6">Connect with me</h2>
                    <div className="space-y-6">
                      <a 
                        href="https://github.com/gustavosilvabr"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center p-4 bg-secondary/50 rounded-lg hover:bg-secondary transition-all"
                      >
                        <div className="w-10 h-10 flex items-center justify-center bg-secondary text-foreground rounded-full mr-4">
                          <Github size={20} />
                        </div>
                        <div>
                          <h3 className="font-medium">GitHub</h3>
                          <p className="text-sm text-muted-foreground">
                            github.com/gustavosilvabr
                          </p>
                        </div>
                      </a>
                      
                      <a 
                        href="https://www.linkedin.com/in/gustavo-silva69/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center p-4 bg-secondary/50 rounded-lg hover:bg-secondary transition-all"
                      >
                        <div className="w-10 h-10 flex items-center justify-center bg-secondary text-foreground rounded-full mr-4">
                          <Linkedin size={20} />
                        </div>
                        <div>
                          <h3 className="font-medium">LinkedIn</h3>
                          <p className="text-sm text-muted-foreground">
                            linkedin.com/in/gustavo-silva69
                          </p>
                        </div>
                      </a>
                      
                      <a 
                        href="https://wa.me/5561995167585"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center p-4 bg-secondary/50 rounded-lg hover:bg-secondary transition-all"
                      >
                        <div className="w-10 h-10 flex items-center justify-center bg-secondary text-foreground rounded-full mr-4">
                          <Phone size={20} />
                        </div>
                        <div>
                          <h3 className="font-medium">WhatsApp</h3>
                          <p className="text-sm text-muted-foreground">
                            +55 61 99516-7585
                          </p>
                        </div>
                      </a>
                    </div>
                  </div>
                  
                  <div className="glass-card rounded-xl p-8">
                    <h2 className="text-2xl font-bold mb-6">Availability</h2>
                    <p className="text-muted-foreground mb-4">
                      I'm currently open to:
                    </p>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                        <span>Freelance projects</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                        <span>Consulting opportunities</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                        <span>Full-time positions</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                        <span>Collaborative projects</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  );
};

export default ContactPage;
