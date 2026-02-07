import { useEffect, useState } from 'react';
import { ChevronDown, Github, Linkedin, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import profileImage from '@/assets/martin-profile.png';
import heroBackground from '@/assets/hero-background.jpg';

const Hero = () => {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  
  const texts = [
    'Développeur Web',
    'Développeur Mobile', 
    'Développeur Desktop',
    'Full-Stack Developer'
  ];

  useEffect(() => {
    const timeout = setTimeout(() => {
      const current = texts[currentIndex];
      
      if (!isDeleting) {
        setCurrentText(current.substring(0, currentText.length + 1));
        
        if (currentText === current) {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        setCurrentText(current.substring(0, currentText.length - 1));
        
        if (currentText === '') {
          setIsDeleting(false);
          setCurrentIndex((prev) => (prev + 1) % texts.length);
        }
      }
    }, isDeleting ? 50 : 100);

    return () => clearTimeout(timeout);
  }, [currentText, currentIndex, isDeleting, texts]);

  const scrollToNextSection = () => {
    const aboutSection = document.querySelector('#about');
    aboutSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src={heroBackground} 
          alt="Professional background" 
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background"></div>
      </div>
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-tech-blue/10 blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-tech-purple/10 blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 rounded-full bg-tech-cyan/5 blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            {/* Profile Image - Left Side */}
            <div className="flex-shrink-0">
              <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96">
                <img 
                  src={profileImage} 
                  alt="Martin Manampisoa" 
                  className="w-full h-full rounded-3xl object-cover border-4 border-primary shadow-2xl shadow-primary/20"
                />
                <div className="absolute inset-0 rounded-3xl bg-gradient-primary opacity-0 hover:opacity-10 transition-opacity duration-300"></div>
              </div>
            </div>
            
            {/* Content - Right Side */}
            <div className="flex-1 text-center lg:text-left">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
                Salut, je suis Martin Manampisoa
              </h1>
              
              <div className="text-xl md:text-3xl lg:text-4xl font-semibold mb-8 h-12 flex items-center justify-center lg:justify-start">
                <span className="text-foreground">
                  {currentText}
                  <span className="animate-pulse text-primary">|</span>
                </span>
              </div>
              
              <p className="text-lg md:text-xl text-muted-foreground mb-12 leading-relaxed">
                Passionné par la création d'expériences digitales innovantes, 
                je transforme vos idées en solutions technologiques performantes 
                sur web, mobile et desktop.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
            <Button 
              size="lg" 
              className="bg-gradient-primary hover:shadow-glow transition-all duration-300 text-primary-foreground font-semibold px-8 py-3"
              onClick={() => scrollToNextSection()}
            >
              Découvrir mon travail
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 px-8 py-3"
              onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Commencer un projet
            </Button>
              </div>

              <div className="flex justify-center lg:justify-start space-x-8">
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors duration-300 hover:scale-110 transform"
            >
              <Github size={28} />
            </a>
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors duration-300 hover:scale-110 transform"
            >
              <Linkedin size={28} />
            </a>
            <a 
              href="mailto:martin@example.com"
              className="text-muted-foreground hover:text-primary transition-colors duration-300 hover:scale-110 transform"
            >
              <Mail size={28} />
            </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <button onClick={scrollToNextSection} className="text-muted-foreground hover:text-primary transition-colors duration-300">
          <ChevronDown size={32} />
        </button>
      </div>
    </section>
  );
};

export default Hero;