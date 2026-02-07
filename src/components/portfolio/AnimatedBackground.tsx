const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Floating particles */}
      <div className="absolute inset-0">
        {/* Large floating orbs */}
        <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-tech-blue/5 animate-float blur-xl"></div>
        <div className="absolute top-40 right-20 w-24 h-24 rounded-full bg-tech-purple/8 animate-float-reverse blur-lg" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-32 left-1/4 w-28 h-28 rounded-full bg-tech-cyan/6 animate-float blur-xl" style={{animationDelay: '4s'}}></div>
        <div className="absolute top-1/3 right-1/3 w-20 h-20 rounded-full bg-tech-green/7 animate-float-reverse blur-lg" style={{animationDelay: '1s'}}></div>
        
        {/* Medium floating particles */}
        <div className="absolute top-60 left-1/2 w-16 h-16 rounded-full bg-tech-blue/10 animate-pulse-glow blur-md"></div>
        <div className="absolute bottom-40 right-10 w-12 h-12 rounded-full bg-tech-purple/12 animate-pulse-glow blur-sm" style={{animationDelay: '3s'}}></div>
        <div className="absolute top-1/4 left-20 w-14 h-14 rounded-full bg-tech-cyan/8 animate-pulse-glow blur-md" style={{animationDelay: '5s'}}></div>
        
        {/* Small floating dots */}
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-foreground/5 animate-float"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 6}s`,
              animationDuration: `${4 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      {/* Geometric shapes */}
      <div className="absolute inset-0">
        {/* Rotating squares */}
        <div className="absolute top-1/4 left-1/4 w-8 h-8 border border-tech-blue/20 animate-wave" style={{animationDuration: '25s'}}></div>
        <div className="absolute bottom-1/3 right-1/4 w-6 h-6 border border-tech-purple/25 animate-wave" style={{animationDuration: '30s', animationDelay: '5s'}}></div>
        
        {/* Diagonal sliding lines */}
        <div className="absolute top-0 left-0 w-px h-20 bg-gradient-to-b from-tech-cyan/30 to-transparent animate-slide-diagonal" style={{animationDuration: '20s'}}></div>
        <div className="absolute bottom-0 right-0 w-px h-16 bg-gradient-to-t from-tech-blue/30 to-transparent animate-slide-diagonal" style={{animationDuration: '18s', animationDelay: '3s'}}></div>
      </div>

      {/* Gradient overlays */}
      <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-tech-blue/5 via-transparent to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-96 bg-gradient-to-t from-tech-purple/5 via-transparent to-transparent"></div>
      
      {/* Side gradients */}
      <div className="absolute top-0 left-0 h-full w-96 bg-gradient-to-r from-tech-cyan/3 via-transparent to-transparent"></div>
      <div className="absolute top-0 right-0 h-full w-96 bg-gradient-to-l from-tech-green/3 via-transparent to-transparent"></div>
    </div>
  );
};

export default AnimatedBackground;