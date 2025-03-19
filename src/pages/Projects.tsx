
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollReveal from '@/components/ScrollReveal';
import ProjectCard from '@/components/ProjectCard';
import { fetchStarredRepositories, fetchUserRepositories, GithubRepository } from '@/utils/github';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Loader2 } from 'lucide-react';

const ProjectsPage = () => {
  const [activeTab, setActiveTab] = useState('starred');
  const [filteredProjects, setFilteredProjects] = useState<GithubRepository[]>([]);
  const [currentFilter, setCurrentFilter] = useState('all');
  
  // Fetch repositories
  const { data: starredRepos, isLoading: isLoadingStarred } = useQuery({
    queryKey: ['starredRepos'],
    queryFn: () => fetchStarredRepositories('gustavosilvabr'),
  });
  
  const { data: userRepos, isLoading: isLoadingUserRepos } = useQuery({
    queryKey: ['userRepos'],
    queryFn: () => fetchUserRepositories('gustavosilvabr'),
  });
  
  // Get unique languages from all repos
  const getAllLanguages = () => {
    const repos = activeTab === 'starred' ? starredRepos || [] : userRepos || [];
    const languages = repos
      .map(repo => repo.language)
      .filter((language): language is string => 
        Boolean(language) && language !== null
      );
    
    return ['all', ...Array.from(new Set(languages))];
  };
  
  // Filter projects based on selected language
  useEffect(() => {
    const repos = activeTab === 'starred' ? starredRepos || [] : userRepos || [];
    
    if (currentFilter === 'all') {
      setFilteredProjects(repos);
    } else {
      setFilteredProjects(
        repos.filter(repo => repo.language === currentFilter)
      );
    }
  }, [currentFilter, activeTab, starredRepos, userRepos]);
  
  // Reset filter when tab changes
  useEffect(() => {
    setCurrentFilter('all');
  }, [activeTab]);
  
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
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
                  Portfolio
                </span>
                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                  My Projects
                </h1>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  A showcase of my work, personal projects, and contributions
                </p>
              </div>
            </ScrollReveal>
          </div>
        </section>
        
        {/* Projects Section */}
        <section className="section">
          <div className="container-content">
            <ScrollReveal>
              <Tabs 
                defaultValue="starred"
                value={activeTab}
                onValueChange={setActiveTab}
                className="w-full"
              >
                <div className="flex justify-center mb-8">
                  <TabsList className="glass-card">
                    <TabsTrigger value="starred">Starred Projects</TabsTrigger>
                    <TabsTrigger value="all">All Projects</TabsTrigger>
                  </TabsList>
                </div>
                
                {/* Filter buttons */}
                <div className="flex flex-wrap justify-center gap-2 mb-10">
                  {getAllLanguages().map((language) => (
                    <Button
                      key={language}
                      variant={currentFilter === language ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCurrentFilter(language)}
                      className="rounded-full"
                    >
                      {language === 'all' ? 'All' : language}
                    </Button>
                  ))}
                </div>
                
                <TabsContent value="starred">
                  {isLoadingStarred ? (
                    <div className="flex justify-center py-20">
                      <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    </div>
                  ) : filteredProjects.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {filteredProjects.map((project, index) => (
                        <ScrollReveal key={project.id} delay={100 * index} direction="up">
                          <ProjectCard project={project} />
                        </ScrollReveal>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-10">
                      <p className="text-muted-foreground">
                        No projects found with the selected filter.
                      </p>
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="all">
                  {isLoadingUserRepos ? (
                    <div className="flex justify-center py-20">
                      <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    </div>
                  ) : filteredProjects.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {filteredProjects.map((project, index) => (
                        <ScrollReveal key={project.id} delay={100 * index} direction="up">
                          <ProjectCard project={project} />
                        </ScrollReveal>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-10">
                      <p className="text-muted-foreground">
                        No projects found with the selected filter.
                      </p>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </ScrollReveal>
          </div>
        </section>
        
        {/* Additional Info Section */}
        <section className="section bg-card">
          <div className="container-content">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <ScrollReveal direction="left">
                <div className="glass-card rounded-xl p-8">
                  <h3 className="text-2xl font-bold mb-4">Project Workflow</h3>
                  <p className="text-muted-foreground mb-6">
                    My approach to building high-quality projects involves a structured methodology:
                  </p>
                  <ul className="space-y-4">
                    <li className="flex gap-4">
                      <div className="bg-primary/10 text-primary rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                        1
                      </div>
                      <div>
                        <h4 className="font-medium">Research & Planning</h4>
                        <p className="text-sm text-muted-foreground">
                          Understanding project requirements and planning the architecture
                        </p>
                      </div>
                    </li>
                    <li className="flex gap-4">
                      <div className="bg-primary/10 text-primary rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                        2
                      </div>
                      <div>
                        <h4 className="font-medium">Design & Prototyping</h4>
                        <p className="text-sm text-muted-foreground">
                          Creating wireframes and visual designs for the user interface
                        </p>
                      </div>
                    </li>
                    <li className="flex gap-4">
                      <div className="bg-primary/10 text-primary rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                        3
                      </div>
                      <div>
                        <h4 className="font-medium">Development</h4>
                        <p className="text-sm text-muted-foreground">
                          Writing clean, efficient, and maintainable code
                        </p>
                      </div>
                    </li>
                    <li className="flex gap-4">
                      <div className="bg-primary/10 text-primary rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                        4
                      </div>
                      <div>
                        <h4 className="font-medium">Testing & Optimization</h4>
                        <p className="text-sm text-muted-foreground">
                          Ensuring quality and performance through rigorous testing
                        </p>
                      </div>
                    </li>
                    <li className="flex gap-4">
                      <div className="bg-primary/10 text-primary rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                        5
                      </div>
                      <div>
                        <h4 className="font-medium">Deployment & Maintenance</h4>
                        <p className="text-sm text-muted-foreground">
                          Deploying applications and providing ongoing support
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
              </ScrollReveal>
              
              <ScrollReveal direction="right">
                <div className="glass-card rounded-xl p-8">
                  <h3 className="text-2xl font-bold mb-4">Looking to Collaborate?</h3>
                  <p className="text-muted-foreground mb-6">
                    I'm always interested in new projects and collaborations. Whether you need a:
                  </p>
                  <ul className="space-y-4 mb-8">
                    <li className="flex gap-4">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                      <p>Responsive web application</p>
                    </li>
                    <li className="flex gap-4">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                      <p>Mobile app for Android and iOS</p>
                    </li>
                    <li className="flex gap-4">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                      <p>Backend API development</p>
                    </li>
                    <li className="flex gap-4">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                      <p>E-commerce solution</p>
                    </li>
                    <li className="flex gap-4">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                      <p>Custom business application</p>
                    </li>
                  </ul>
                  <Button className="btn-primary">
                    Contact Me for Collaboration
                  </Button>
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

export default ProjectsPage;
