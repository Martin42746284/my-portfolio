-- Insertion des Services
INSERT INTO services (icon, title, description, technologies, color) VALUES
('Monitor', 'Développement Web', 'Applications web modernes et responsive avec React, Vue.js, et technologies full-stack.', ARRAY['React', 'Vue.js', 'Node.js', 'TypeScript', 'Next.js'], 'tech-blue'),
('Smartphone', 'Développement Mobile', 'Applications mobiles natives et cross-platform pour iOS et Android.', ARRAY['React Native', 'Flutter', 'Swift', 'Kotlin', 'Capacitor'], 'tech-purple'),
('Laptop', 'Développement Desktop', 'Applications desktop performantes pour Windows, macOS et Linux.', ARRAY['Electron', 'Tauri', 'Qt', 'C++', 'Python'], 'tech-cyan'),
('Code', 'Architecture Logicielle', 'Conception d''architectures scalables et maintenables pour vos projets.', ARRAY['Microservices', 'Clean Architecture', 'Docker', 'Kubernetes'], 'tech-green'),
('Database', 'Backend & APIs', 'APIs RESTful et GraphQL, bases de données et services cloud.', ARRAY['PostgreSQL', 'MongoDB', 'GraphQL', 'AWS', 'Supabase'], 'tech-blue'),
('Palette', 'UI/UX Design', 'Interfaces utilisateur intuitives et expériences utilisateur optimisées.', ARRAY['Figma', 'Adobe XD', 'Tailwind CSS', 'Framer Motion'], 'tech-purple');

-- Insertion des Projets
INSERT INTO projects (title, description, image, technologies, category, demo_url, github_url) VALUES
('E-Commerce Platform', 'Plateforme e-commerce complète avec paiement intégré, gestion des stocks et analytics.', 'https://images.unsplash.com/photo-1557821552-17105176677c?w=800&h=600&fit=crop', ARRAY['React', 'Node.js', 'PostgreSQL', 'Stripe'], 'Web', '#', '#'),
('Task Management App', 'Application mobile de gestion de tâches avec synchronisation cloud et notifications.', 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&h=600&fit=crop', ARRAY['React Native', 'Firebase', 'Redux'], 'Mobile', '#', '#'),
('Analytics Dashboard', 'Dashboard desktop pour visualiser et analyser des données business en temps réel.', 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop', ARRAY['Electron', 'Chart.js', 'SQLite'], 'Desktop', '#', '#'),
('Social Media API', 'API RESTful pour une plateforme sociale avec authentification et gestion de contenu.', 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=600&fit=crop', ARRAY['Express.js', 'MongoDB', 'JWT', 'Docker'], 'Backend', '#', '#'),
('Portfolio Website', 'Site portfolio responsive avec animations et optimisation SEO.', 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&h=600&fit=crop', ARRAY['Next.js', 'Tailwind CSS', 'Framer Motion'], 'Web', '#', '#'),
('Crypto Tracker', 'Application de suivi de cryptomonnaies avec alertes et graphiques en temps réel.', 'https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=800&h=600&fit=crop', ARRAY['Vue.js', 'WebSocket', 'Chart.js', 'PWA'], 'Web', '#', '#');
