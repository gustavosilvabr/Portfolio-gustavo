
import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollReveal from '@/components/ScrollReveal';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Calendar, 
  MapPin, 
  Mail, 
  Phone, 
  Award, 
  BookOpen, 
  Code, 
  Download,
  ExternalLink
} from 'lucide-react';

const AboutPage = () => {
  // Setup intersection observer for scroll animations
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const experienceItems = [
    {
      period: '2021 - Present',
      title: 'Full Stack Developer',
      company: 'Tech Innovation Labs',
      description: 'Developing modern web applications using React, Node.js, and PostgreSQL. Implementing responsive designs and RESTful APIs for client projects.'
    },
    {
      period: '2019 - 2021',
      title: 'Frontend Developer',
      company: 'Digital Solutions Agency',
      description: 'Created responsive user interfaces using React and styled-components. Collaborated with UX designers to implement pixel-perfect designs.'
    },
    {
      period: '2018 - 2019',
      title: 'Web Developer Intern',
      company: 'Web Startup Inc.',
      description: 'Assisted in the development of web applications, focusing on HTML, CSS, and JavaScript fundamentals.'
    }
  ];

  const educationItems = [
    {
      period: '2020 - 2021',
      title: 'Full Stack Web Development Bootcamp',
      institution: 'Coding Academy',
      description: 'Intensive training in modern web development technologies including JavaScript, React, Node.js, and databases.'
    },
    {
      period: '2016 - 2020',
      title: 'Bachelor of Science in Computer Science',
      institution: 'Tech University',
      description: 'Studied computer programming, algorithms, data structures, and software engineering principles.'
    }
  ];

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
                  About Me
                </span>
                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                  Know More About Me
                </h1>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Full Stack Developer passionate about building innovative web and mobile applications
                </p>
              </div>
            </ScrollReveal>
          </div>
        </section>
        
        {/* Profile Section */}
        <section className="section">
          <div className="container-content">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <ScrollReveal direction="left">
                <div className="glass-card rounded-xl overflow-hidden aspect-square">
                  <img 
                    src="https://ui-avatars.com/api/?name=Gustavo+Silva&size=400&background=0D8ABC&color=fff" 
                    alt="Gustavo Silva" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </ScrollReveal>
              
              <ScrollReveal direction="right">
                <div className="space-y-6">
                  <h2 className="text-3xl font-bold">Gustavo Silva</h2>
                  <p className="text-xl text-primary font-medium">Full Stack Developer</p>
                  
                  <p className="text-muted-foreground">
                    I'm a passionate Full Stack Developer with expertise in JavaScript, TypeScript, React, React Native, and Node.js. 
                    With several years of experience in web and mobile development, I enjoy creating high-quality, 
                    user-friendly applications that solve real-world problems.
                  </p>
                  
                  <p className="text-muted-foreground">
                    My goal is to deliver exceptional digital experiences through clean, efficient code 
                    and intuitive user interfaces. I'm constantly learning new technologies and best practices 
                    to enhance my skills and provide better solutions.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                    <div className="flex items-center gap-3">
                      <Calendar size={18} className="text-primary" />
                      <span>5+ Years Experience</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <MapPin size={18} className="text-primary" />
                      <span>Brazil</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail size={18} className="text-primary" />
                      <a 
                        href="mailto:gutzs1212@gmail.com"
                        className="hover:text-primary transition-colors"
                      >
                        gutzs1212@gmail.com
                      </a>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone size={18} className="text-primary" />
                      <a 
                        href="https://wa.me/5561995167585"
                        className="hover:text-primary transition-colors"
                        target="_blank" 
                        rel="noopener noreferrer"
                      >
                        +55 61 99516-7585
                      </a>
                    </div>
                  </div>
                  
                  <div className="pt-6 flex flex-wrap gap-4">
                    <Button className="btn-primary">
                      <Download size={18} className="mr-2" />
                      Download CV
                    </Button>
                    <Link to="/contact">
                      <Button variant="outline">
                        <ExternalLink size={18} className="mr-2" />
                        Contact Me
                      </Button>
                    </Link>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>
        
        {/* Experience & Education Section */}
        <section className="section bg-card">
          <div className="container-content">
            <ScrollReveal>
              <div className="text-center mb-14">
                <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
                  My Journey
                </span>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Experience & Education
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  My professional background and educational qualifications
                </p>
              </div>
            </ScrollReveal>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Experience */}
              <ScrollReveal direction="left">
                <div className="space-y-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 flex items-center justify-center bg-primary/10 text-primary rounded-lg">
                      <Award size={20} />
                    </div>
                    <h3 className="text-2xl font-bold">Experience</h3>
                  </div>
                  
                  <div className="space-y-8">
                    {experienceItems.map((item, index) => (
                      <div key={index} className="glass-card rounded-lg p-6 relative">
                        <div className="absolute top-6 left-6 w-2 h-2 bg-primary rounded-full"></div>
                        <div className="pl-6 border-l-2 border-primary">
                          <span className="inline-block px-2.5 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium mb-2">
                            {item.period}
                          </span>
                          <h4 className="text-lg font-medium">{item.title}</h4>
                          <p className="text-primary">{item.company}</p>
                          <p className="text-muted-foreground mt-2 text-sm">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
              
              {/* Education */}
              <ScrollReveal direction="right">
                <div className="space-y-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 flex items-center justify-center bg-primary/10 text-primary rounded-lg">
                      <BookOpen size={20} />
                    </div>
                    <h3 className="text-2xl font-bold">Education</h3>
                  </div>
                  
                  <div className="space-y-8">
                    {educationItems.map((item, index) => (
                      <div key={index} className="glass-card rounded-lg p-6 relative">
                        <div className="absolute top-6 left-6 w-2 h-2 bg-primary rounded-full"></div>
                        <div className="pl-6 border-l-2 border-primary">
                          <span className="inline-block px-2.5 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium mb-2">
                            {item.period}
                          </span>
                          <h4 className="text-lg font-medium">{item.title}</h4>
                          <p className="text-primary">{item.institution}</p>
                          <p className="text-muted-foreground mt-2 text-sm">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>
        
        {/* Skills Section */}
        <section className="section">
          <div className="container-content">
            <ScrollReveal>
              <div className="text-center mb-14">
                <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
                  My Expertise
                </span>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Skills & Technologies
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  The tools and technologies I use to bring projects to life
                </p>
              </div>
            </ScrollReveal>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <ScrollReveal direction="up" delay={100}>
                <div className="glass-card rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 flex items-center justify-center bg-primary/10 text-primary rounded-lg">
                      <Code size={20} />
                    </div>
                    <h3 className="text-xl font-bold">Technologies</h3>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-6">
                      <div>
                        <h4 className="font-medium mb-2">JavaScript</h4>
                        <div className="h-2 bg-secondary rounded-full overflow-hidden">
                          <div className="h-full bg-primary rounded-full" style={{ width: '90%' }}></div>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-medium mb-2">TypeScript</h4>
                        <div className="h-2 bg-secondary rounded-full overflow-hidden">
                          <div className="h-full bg-primary rounded-full" style={{ width: '85%' }}></div>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-medium mb-2">React</h4>
                        <div className="h-2 bg-secondary rounded-full overflow-hidden">
                          <div className="h-full bg-primary rounded-full" style={{ width: '95%' }}></div>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-medium mb-2">React Native</h4>
                        <div className="h-2 bg-secondary rounded-full overflow-hidden">
                          <div className="h-full bg-primary rounded-full" style={{ width: '85%' }}></div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-6">
                      <div>
                        <h4 className="font-medium mb-2">Node.js</h4>
                        <div className="h-2 bg-secondary rounded-full overflow-hidden">
                          <div className="h-full bg-primary rounded-full" style={{ width: '80%' }}></div>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-medium mb-2">PostgreSQL</h4>
                        <div className="h-2 bg-secondary rounded-full overflow-hidden">
                          <div className="h-full bg-primary rounded-full" style={{ width: '75%' }}></div>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-medium mb-2">HTML & CSS</h4>
                        <div className="h-2 bg-secondary rounded-full overflow-hidden">
                          <div className="h-full bg-primary rounded-full" style={{ width: '90%' }}></div>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-medium mb-2">Git & GitHub</h4>
                        <div className="h-2 bg-secondary rounded-full overflow-hidden">
                          <div className="h-full bg-primary rounded-full" style={{ width: '85%' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
              
              <ScrollReveal direction="up" delay={200}>
                <div className="glass-card rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 flex items-center justify-center bg-primary/10 text-primary rounded-lg">
                      <BookOpen size={20} />
                    </div>
                    <h3 className="text-xl font-bold">Other Skills</h3>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      <span className="inline-block px-3 py-1.5 bg-secondary text-secondary-foreground rounded-full text-sm">
                        UI/UX Design
                      </span>
                      <span className="inline-block px-3 py-1.5 bg-secondary text-secondary-foreground rounded-full text-sm">
                        RESTful APIs
                      </span>
                      <span className="inline-block px-3 py-1.5 bg-secondary text-secondary-foreground rounded-full text-sm">
                        GraphQL
                      </span>
                      <span className="inline-block px-3 py-1.5 bg-secondary text-secondary-foreground rounded-full text-sm">
                        MongoDB
                      </span>
                      <span className="inline-block px-3 py-1.5 bg-secondary text-secondary-foreground rounded-full text-sm">
                        Redux
                      </span>
                      <span className="inline-block px-3 py-1.5 bg-secondary text-secondary-foreground rounded-full text-sm">
                        Tailwind CSS
                      </span>
                      <span className="inline-block px-3 py-1.5 bg-secondary text-secondary-foreground rounded-full text-sm">
                        Jest
                      </span>
                      <span className="inline-block px-3 py-1.5 bg-secondary text-secondary-foreground rounded-full text-sm">
                        Webpack
                      </span>
                      <span className="inline-block px-3 py-1.5 bg-secondary text-secondary-foreground rounded-full text-sm">
                        Firebase
                      </span>
                      <span className="inline-block px-3 py-1.5 bg-secondary text-secondary-foreground rounded-full text-sm">
                        Docker
                      </span>
                      <span className="inline-block px-3 py-1.5 bg-secondary text-secondary-foreground rounded-full text-sm">
                        CI/CD
                      </span>
                      <span className="inline-block px-3 py-1.5 bg-secondary text-secondary-foreground rounded-full text-sm">
                        AWS
                      </span>
                      <span className="inline-block px-3 py-1.5 bg-secondary text-secondary-foreground rounded-full text-sm">
                        Agile Methodology
                      </span>
                      <span className="inline-block px-3 py-1.5 bg-secondary text-secondary-foreground rounded-full text-sm">
                        Responsive Design
                      </span>
                      <span className="inline-block px-3 py-1.5 bg-secondary text-secondary-foreground rounded-full text-sm">
                        Figma
                      </span>
                      <span className="inline-block px-3 py-1.5 bg-secondary text-secondary-foreground rounded-full text-sm">
                        Performance Optimization
                      </span>
                    </div>
                    
                    <div className="mt-6 pt-6 border-t border-border">
                      <h4 className="font-medium mb-4">Soft Skills</h4>
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                          <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                          <span>Problem solving and critical thinking</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                          <span>Team collaboration and communication</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                          <span>Project management and organization</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                          <span>Time management and prioritization</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                          <span>Continuous learning and adaptability</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>
        
        {/* Call to Action */}
        <section className="section bg-card">
          <div className="container-content">
            <ScrollReveal>
              <div className="glass-card rounded-xl overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-blue-500/10 z-0"></div>
                <div className="relative z-10 p-8 md:p-12 text-center">
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">
                    Interested in Working Together?
                  </h2>
                  <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
                    Feel free to reach out if you're looking for a developer with my skill set and experience.
                    I'm always open to discussing new projects and opportunities.
                  </p>
                  <Link to="/contact">
                    <Button className="btn-primary">
                      Get In Touch
                    </Button>
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  );
};

export default AboutPage;
