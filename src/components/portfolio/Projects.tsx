import { useEffect, useMemo, useState } from 'react';
import { ExternalLink, Github } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import supabase from '@/lib/supabase';

interface UiProject {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  category: string;
  demoUrl?: string | null;
  githubUrl?: string | null;
}

const Projects = () => {
  const [projects, setProjects] = useState<UiProject[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('Tous');

  useEffect(() => {
    const fetchProjects = async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('title,description,image,technologies,category,demo_url,github_url')
        .order('created_at', { ascending: false });
      if (!error && data) {
        const uiData: UiProject[] = data.map((p: any) => ({
          title: p.title,
          description: p.description,
          image: p.image,
          technologies: p.technologies || [],
          category: p.category,
          demoUrl: p.demo_url || undefined,
          githubUrl: p.github_url || undefined,
        }));
        setProjects(uiData);
      }
    };
    fetchProjects();
  }, []);

  const categories = useMemo(() => {
    const base = ['Tous'];
    const cats = Array.from(new Set(projects.map(p => p.category)));
    return base.concat(cats);
  }, [projects]);

  const displayed = useMemo(() => {
    return selectedCategory === 'Tous' ? projects : projects.filter(p => p.category === selectedCategory);
  }, [projects, selectedCategory]);

  return (
    <section id="projects" className="py-24">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
            Mes Projets
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Découvrez une sélection de mes réalisations récentes,
            chacune démontrant une expertise technique et créative.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'default' : 'outline'}
                onClick={() => setSelectedCategory(category)}
                className={`transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-gradient-primary shadow-glow'
                    : 'hover:border-primary'
                }`}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayed.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <p className="text-xl text-muted-foreground">Aucun projet réalisé</p>
            </div>
          ) : (
            displayed.map((project, index) => (
            <Card
              key={`${project.title}-${index}`}
              className="group bg-gradient-card border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-card hover:-translate-y-2 overflow-hidden"
            >
              <div className="relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                  <div className="flex gap-3">
                    {project.demoUrl && (
                      <Button size="sm" variant="secondary" asChild>
                        <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink size={16} className="mr-2" />
                          Demo
                        </a>
                      </Button>
                    )}
                    {project.githubUrl && (
                      <Button size="sm" variant="outline" asChild>
                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                          <Github size={16} className="mr-2" />
                          Code
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </div>

              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                    {project.title}
                  </CardTitle>
                  <span className="px-2 py-1 bg-secondary rounded-full text-xs text-muted-foreground">
                    {project.category}
                  </span>
                </div>
                <CardDescription className="text-muted-foreground">
                  {project.description}
                </CardDescription>
              </CardHeader>

              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, techIndex) => (
                    <span
                      key={`${project.title}-tech-${techIndex}`}
                      className="px-3 py-1 bg-secondary rounded-full text-sm text-foreground border border-border"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default Projects;
