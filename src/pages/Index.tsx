
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import HeroSection from '@/components/HeroSection';
import ScrollReveal from '@/components/ScrollReveal';
import ProjectCard from '@/components/ProjectCard';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { fetchStarredRepositories, GithubRepository } from '@/utils/github';
import { ChevronRight, Code, Database, Server, Github, ExternalLink, Send } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const HomePage = () => {
  // Fetch starred repositories
  const { data: starredRepos } = useQuery({
    queryKey: ['starredRepos'],
    queryFn: () => fetchStarredRepositories('gustavosilvabr'),
  });

  const skills = [
    { 
      category: 'Frontend', 
      items: ['JavaScript', 'TypeScript', 'React', 'HTML5', 'CSS3', 'Tailwind CSS', 'Redux'] 
    },
    { 
      category: 'Backend', 
      items: ['Node.js', 'Express', 'PostgreSQL', 'MongoDB', 'REST API', 'GraphQL'] 
    },
    { 
      category: 'Mobile', 
      items: ['React Native', 'Expo', 'Android', 'iOS'] 
    },
    { 
      category: 'Tools', 
      items: ['Git', 'GitHub', 'VS Code', 'Figma', 'Webpack', 'Docker'] 
    }
  ];

  // Setup intersection observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach((element) => {
      observer.observe(element);
    });

    return () => {
      document.querySelectorAll('.reveal').forEach((element) => {
        observer.unobserve(element);
      });
    };
  }, []);

  return (
    <>
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <HeroSection />
        
        {/* About Section */}
        <section id="about-section" className="section bg-card">
          <div className="container-content">
            <ScrollReveal>
              <div className="text-center mb-14">
                <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
                  About Me
                </span>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Full Stack Developer
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Specialized in creating modern, high-performance web and mobile applications 
                  with clean code and exceptional user experiences.
                </p>
              </div>
            </ScrollReveal>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <ScrollReveal delay={100} direction="up">
                <div className="glass-card rounded-xl p-6 h-full">
                  <div className="w-12 h-12 flex items-center justify-center bg-primary/10 text-primary rounded-lg mb-5">
                    <Code size={24} />
                  </div>
                  <h3 className="text-xl font-medium mb-3">Frontend Development</h3>
                  <p className="text-muted-foreground mb-5">
                    Creating responsive and interactive user interfaces with modern JavaScript frameworks.
                  </p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center">
                      <ChevronRight size={16} className="text-primary mr-2" />
                      React & React Native
                    </li>
                    <li className="flex items-center">
                      <ChevronRight size={16} className="text-primary mr-2" />
                      TypeScript & JavaScript
                    </li>
                    <li className="flex items-center">
                      <ChevronRight size={16} className="text-primary mr-2" />
                      HTML5 & CSS3
                    </li>
                    <li className="flex items-center">
                      <ChevronRight size={16} className="text-primary mr-2" />
                      Tailwind CSS & Styled Components
                    </li>
                  </ul>
                </div>
              </ScrollReveal>
              
              <ScrollReveal delay={200} direction="up">
                <div className="glass-card rounded-xl p-6 h-full">
                  <div className="w-12 h-12 flex items-center justify-center bg-primary/10 text-primary rounded-lg mb-5">
                    <Server size={24} />
                  </div>
                  <h3 className="text-xl font-medium mb-3">Backend Development</h3>
                  <p className="text-muted-foreground mb-5">
                    Building robust server-side applications and APIs for seamless data management.
                  </p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center">
                      <ChevronRight size={16} className="text-primary mr-2" />
                      Node.js & Express
                    </li>
                    <li className="flex items-center">
                      <ChevronRight size={16} className="text-primary mr-2" />
                      RESTful APIs
                    </li>
                    <li className="flex items-center">
                      <ChevronRight size={16} className="text-primary mr-2" />
                      Authentication & Authorization
                    </li>
                    <li className="flex items-center">
                      <ChevronRight size={16} className="text-primary mr-2" />
                      Serverless Functions
                    </li>
                  </ul>
                </div>
              </ScrollReveal>
              
              <ScrollReveal delay={300} direction="up">
                <div className="glass-card rounded-xl p-6 h-full">
                  <div className="w-12 h-12 flex items-center justify-center bg-primary/10 text-primary rounded-lg mb-5">
                    <Database size={24} />
                  </div>
                  <h3 className="text-xl font-medium mb-3">Database Management</h3>
                  <p className="text-muted-foreground mb-5">
                    Designing efficient database schemas and implementing data persistence solutions.
                  </p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center">
                      <ChevronRight size={16} className="text-primary mr-2" />
                      PostgreSQL
                    </li>
                    <li className="flex items-center">
                      <ChevronRight size={16} className="text-primary mr-2" />
                      MongoDB
                    </li>
                    <li className="flex items-center">
                      <ChevronRight size={16} className="text-primary mr-2" />
                      Database Optimization
                    </li>
                    <li className="flex items-center">
                      <ChevronRight size={16} className="text-primary mr-2" />
                      Data Modeling
                    </li>
                  </ul>
                </div>
              </ScrollReveal>
            </div>
            
            <ScrollReveal delay={400} className="mt-16 text-center">
              <Link to="/about">
                <Button className="btn-secondary">
                  More About Me
                </Button>
              </Link>
            </ScrollReveal>
          </div>
        </section>
        
        {/* Skills Section */}
        <section className="section">
          <div className="container-content">
            <ScrollReveal>
              <div className="text-center mb-14">
                <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
                  Skills
                </span>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  My Technical Skills
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  A comprehensive list of technologies and tools I use to build applications.
                </p>
              </div>
            </ScrollReveal>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {skills.map((skillGroup, index) => (
                <ScrollReveal key={skillGroup.category} delay={100 * index} direction="up">
                  <div className="glass-card rounded-xl p-6">
                    <h3 className="text-xl font-medium mb-4">{skillGroup.category}</h3>
                    <div className="flex flex-wrap gap-2">
                      {skillGroup.items.map((skill) => (
                        <span
                          key={skill}
                          className="px-3 py-1.5 bg-secondary text-secondary-foreground rounded-full text-xs"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
        
        {/* Featured Projects Section */}
        <section className="section bg-card">
          <div className="container-content">
            <ScrollReveal>
              <div className="text-center mb-14">
                <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
                  Portfolio
                </span>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Featured Projects
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Check out some of my recent work and GitHub projects.
                </p>
              </div>
            </ScrollReveal>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {starredRepos?.slice(0, 3).map((project, index) => (
                <ScrollReveal key={project.id} delay={100 * index} direction="up">
                  <ProjectCard project={project} />
                </ScrollReveal>
              ))}
            </div>
            
            <ScrollReveal delay={400} className="mt-12 text-center">
              <Link to="/projects">
                <Button className="btn-secondary">
                  View All Projects
                </Button>
              </Link>
            </ScrollReveal>
          </div>
        </section>
        
        {/* Call to Action Section */}
        <section className="section">
          <div className="container-content">
            <ScrollReveal>
              <div className="glass-card rounded-xl overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-blue-500/10 z-0"></div>
                <div className="relative z-10 p-8 md:p-12 text-center">
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">
                    Ready to Work Together?
                  </h2>
                  <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
                    Looking for a reliable and skilled developer for your next project?
                    Let's collaborate to bring your ideas to life.
                  </p>
                  <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <Link to="/contact">
                      <Button className="btn-primary">
                        <Send size={18} className="mr-2" />
                        Contact Me
                      </Button>
                    </Link>
                    <a 
                      href="https://github.com/gustavosilvabr" 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      <Button variant="outline" className="flex items-center gap-2">
                        <Github size={18} />
                        GitHub
                      </Button>
                    </a>
                    <a 
                      href="https://www.linkedin.com/in/gustavo-silva69/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      <Button variant="outline" className="flex items-center gap-2">
                        <ExternalLink size={18} />
                        LinkedIn
                      </Button>
                    </a>
                  </div>
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

export default HomePage;
