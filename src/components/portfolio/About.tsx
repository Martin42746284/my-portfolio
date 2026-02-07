import { User, Award, Coffee, Heart } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

const About = () => {
  const skills = [
    { name: 'JavaScript/TypeScript', level: 95 },
    { name: 'React/Next.js', level: 90 },
    { name: 'Node.js/Express', level: 85 },
    { name: 'Python', level: 80 },
    { name: 'React Native', level: 85 },
    { name: 'PostgreSQL/MongoDB', level: 80 },
    { name: 'Docker/DevOps', level: 75 },
    { name: 'UI/UX Design', level: 70 }
  ];

  const stats = [
    { icon: Award, number: '3+', label: 'Années d\'expérience' },
    { icon: Coffee, number: '50+', label: 'Projets réalisés' },
    { icon: Heart, number: '100%', label: 'Clients satisfaits' },
    { icon: User, number: '24/7', label: 'Support disponible' }
  ];

  return (
    <section id="about" className="py-24">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
            À propos de moi
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Développeur passionné avec une approche créative et technique 
            pour résoudre les défis digitaux.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
          {/* About Content */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-semibold mb-6 text-foreground">
                Mon parcours
              </h3>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Diplômé en informatique et fort de 3+ années d'expérience, 
                  je me spécialise dans le développement d'applications modernes 
                  et performantes sur toutes les plateformes.
                </p>
                <p>
                  Ma passion pour la technologie et l'innovation me pousse à 
                  constamment apprendre et maîtriser les dernières tendances 
                  du développement logiciel.
                </p>
                <p>
                  J'accompagne mes clients de la conception à la mise en production, 
                  en garantissant des solutions robustes, scalables et centrées 
                  sur l'expérience utilisateur.
                </p>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <Card key={index} className="bg-gradient-card border-border/50 hover:border-primary/50 transition-all duration-300">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mx-auto mb-4 shadow-glow">
                      <stat.icon className="text-primary-foreground w-6 h-6" />
                    </div>
                    <div className="text-2xl font-bold text-foreground mb-2">
                      {stat.number}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {stat.label}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Skills */}
          <div>
            <h3 className="text-2xl font-semibold mb-8 text-foreground">
              Mes compétences
            </h3>
            <div className="space-y-6">
              {skills.map((skill, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-foreground font-medium">{skill.name}</span>
                    <span className="text-muted-foreground text-sm">{skill.level}%</span>
                  </div>
                  <Progress 
                    value={skill.level} 
                    className="h-2 bg-secondary"
                  />
                </div>
              ))}
            </div>

            <div className="mt-12 p-6 bg-gradient-card rounded-lg border border-border/50">
              <h4 className="font-semibold text-foreground mb-4">
                Ce qui me motive
              </h4>
              <div className="space-y-3 text-muted-foreground">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-tech-blue rounded-full"></div>
                  <span>Créer des expériences utilisateur exceptionnelles</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-tech-purple rounded-full"></div>
                  <span>Résoudre des problèmes complexes avec élégance</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-tech-cyan rounded-full"></div>
                  <span>Apprendre et adopter les nouvelles technologies</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-tech-green rounded-full"></div>
                  <span>Collaborer et partager mes connaissances</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;