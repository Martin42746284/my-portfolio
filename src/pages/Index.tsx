import Header from '@/components/portfolio/Header';
import Hero from '@/components/portfolio/Hero';
import About from '@/components/portfolio/About';
import Services from '@/components/portfolio/Services';
import Projects from '@/components/portfolio/Projects';
import Contact from '@/components/portfolio/Contact';
import ScrollProgress from '@/components/portfolio/ScrollProgress';
import AnimatedBackground from '@/components/portfolio/AnimatedBackground';

const Index = () => {
  return (
    <div className="min-h-screen bg-background relative">
      <AnimatedBackground />
      <ScrollProgress />
      <Header />
      <main className="relative z-10">
        <Hero />
        <About />
        <Services />
        <Projects />
        <Contact />
      </main>
      
      
      {/* Footer */}
      <footer className="bg-card/80 backdrop-blur-sm py-8 border-t border-border relative z-10">
        <div className="container mx-auto px-6 text-center">
          <p className="text-muted-foreground">
©             {new Date().getFullYear()} Martin Manampisoa. Tous droits réservés.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
