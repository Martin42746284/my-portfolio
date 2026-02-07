import { useEffect } from 'react';
import { useState } from 'react';
import * as Icons from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import supabase from '@/lib/supabase';

interface ServiceItem {
  icon: string;
  title: string;
  description: string;
  technologies: string[];
  color: string;
}

const Services = () => {
  const [items, setItems] = useState<ServiceItem[]>([]);

  useEffect(() => {
    const fetchServices = async () => {
      const { data, error } = await supabase
        .from('services')
        .select('icon,title,description,technologies,color')
        .order('created_at', { ascending: false });
      if (!error && data) {
        setItems(data as ServiceItem[]);
      }
    };
    fetchServices();
  }, []);

  return (
    <section id="services" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
            Mes Services
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Une expertise complète pour donner vie à vos projets digitaux,
            du concept à la mise en production.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <p className="text-xl text-muted-foreground">Aucun service disponible</p>
            </div>
          ) : (
            items.map((service, index) => {
            const Icon = (Icons as any)[service.icon] ?? (Icons as any)['Code'];
            return (
              <Card
                key={`${service.title}-${index}`}
                className="group bg-gradient-card border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-card hover:-translate-y-1"
              >
                <CardHeader>
                  <div className={`w-16 h-16 rounded-lg bg-${service.color}/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className={`text-${service.color} w-8 h-8`} />
                  </div>
                  <CardTitle className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                    {service.title}
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {service.technologies.map((tech, techIndex) => (
                      <span
                        key={`${service.title}-tech-${techIndex}`}
                        className="px-3 py-1 bg-secondary rounded-full text-sm text-foreground border border-border"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
            })
          )}
        </div>
      </div>
    </section>
  );
};

export default Services;
