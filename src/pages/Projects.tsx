
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollReveal from '@/components/ScrollReveal';
import ProjectCard from '@/components/ProjectCard';
import { fetchStarredRepositories, fetchUserRepositories, GithubRepository } from '@/utils/github';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Loader2, Code, GitBranch, GitPullRequest, Database } from 'lucide-react';

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
                <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4 mono">
                  Portfolio
                </span>
                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                  Meus Projetos
                </h1>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Uma amostra dos meus trabalhos, projetos pessoais e contribuições
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
                    <TabsTrigger value="starred" className="mono">Projetos Favoritos</TabsTrigger>
                    <TabsTrigger value="all" className="mono">Todos os Projetos</TabsTrigger>
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
                      className={`rounded-md mono text-xs ${currentFilter === language ? '' : 'border-zinc-200 dark:border-zinc-800'}`}
                    >
                      {language === 'all' ? 'Todos' : language}
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
                      <p className="text-muted-foreground mono">
                        Nenhum projeto encontrado com o filtro selecionado.
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
                      <p className="text-muted-foreground mono">
                        Nenhum projeto encontrado com o filtro selecionado.
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
                  <h3 className="text-2xl font-bold mb-4">Fluxo de Trabalho</h3>
                  <p className="text-muted-foreground mb-6">
                    Minha abordagem para construir projetos de alta qualidade envolve uma metodologia estruturada:
                  </p>
                  <div className="space-y-4">
                    <div className="flex gap-4 items-start">
                      <div className="bg-primary/10 text-primary rounded-md w-8 h-8 flex items-center justify-center flex-shrink-0 mono">
                        01
                      </div>
                      <div>
                        <h4 className="font-medium mono">Pesquisa & Planejamento</h4>
                        <p className="text-sm text-muted-foreground">
                          Compreender os requisitos do projeto e planejar a arquitetura
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-4 items-start">
                      <div className="bg-primary/10 text-primary rounded-md w-8 h-8 flex items-center justify-center flex-shrink-0 mono">
                        02
                      </div>
                      <div>
                        <h4 className="font-medium mono">Design & Prototipagem</h4>
                        <p className="text-sm text-muted-foreground">
                          Criação de wireframes e designs visuais para a interface
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-4 items-start">
                      <div className="bg-primary/10 text-primary rounded-md w-8 h-8 flex items-center justify-center flex-shrink-0 mono">
                        03
                      </div>
                      <div>
                        <h4 className="font-medium mono">Desenvolvimento</h4>
                        <p className="text-sm text-muted-foreground">
                          Escrita de código limpo, eficiente e de fácil manutenção
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-4 items-start">
                      <div className="bg-primary/10 text-primary rounded-md w-8 h-8 flex items-center justify-center flex-shrink-0 mono">
                        04
                      </div>
                      <div>
                        <h4 className="font-medium mono">Testes & Otimização</h4>
                        <p className="text-sm text-muted-foreground">
                          Garantia de qualidade e desempenho através de testes rigorosos
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-4 items-start">
                      <div className="bg-primary/10 text-primary rounded-md w-8 h-8 flex items-center justify-center flex-shrink-0 mono">
                        05
                      </div>
                      <div>
                        <h4 className="font-medium mono">Implantação & Manutenção</h4>
                        <p className="text-sm text-muted-foreground">
                          Implantação de aplicações e suporte contínuo
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
              
              <ScrollReveal direction="right">
                <div className="glass-card rounded-xl p-8">
                  <h3 className="text-2xl font-bold mb-4">Vamos Colaborar?</h3>
                  <p className="text-muted-foreground mb-6">
                    Estou sempre interessado em novos projetos e colaborações. Precisa de:
                  </p>
                  <ul className="space-y-4 mb-8">
                    <li className="flex gap-3 items-start">
                      <Code size={18} className="text-primary mt-0.5" />
                      <p>Aplicação web responsiva</p>
                    </li>
                    <li className="flex gap-3 items-start">
                      <GitBranch size={18} className="text-primary mt-0.5" />
                      <p>Aplicativo mobile para Android e iOS</p>
                    </li>
                    <li className="flex gap-3 items-start">
                      <GitPullRequest size={18} className="text-primary mt-0.5" />
                      <p>Desenvolvimento de API backend</p>
                    </li>
                    <li className="flex gap-3 items-start">
                      <Database size={18} className="text-primary mt-0.5" />
                      <p>Solução de aplicação personalizada</p>
                    </li>
                  </ul>
                  <Button className="btn-primary">
                    Entre em Contato
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
