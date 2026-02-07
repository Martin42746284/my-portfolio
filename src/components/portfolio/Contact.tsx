import { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import supabase from '@/lib/supabase';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('contacts')
        .insert([{
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          status: 'new'
        }]);

      if (error) throw error;

      toast({
        title: "Message envoyé !",
        description: "Je vous répondrai dans les plus brefs délais.",
      });

      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: "Impossible d'envoyer le message. Veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      value: 'martinmanampisoa5@gmail.com',
      link: 'mailto:martinmanampisoa5@gmail.com'
    },
    {
      icon: Phone,
      title: 'Téléphone',
      value: '+261 38 69  856 54',
      link: 'tel:+261386985654'
    },
    {
      icon: MapPin,
      title: 'Localisation',
      value: 'Antananarivo, Madagascar',
      link: '#'
    }
  ];

  return (
    <section id="contact" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
            Contactez-moi
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Vous avez un projet en tête ? Discutons ensemble de vos besoins 
            et donnons vie à vos idées.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-semibold mb-6 text-foreground">
                Restons en contact
              </h3>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Je suis toujours intéressé par de nouveaux défis et opportunités. 
                Que ce soit pour un projet freelance, une collaboration ou simplement 
                pour échanger sur la tech, n'hésitez pas à me contacter.
              </p>
            </div>

            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center shadow-glow">
                    <info.icon className="text-primary-foreground w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">{info.title}</h4>
                    <a 
                      href={info.link}
                      className="text-muted-foreground hover:text-primary transition-colors duration-300"
                    >
                      {info.value}
                    </a>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-8">
              <h4 className="font-semibold text-foreground mb-4">Disponibilité</h4>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-tech-green rounded-full animate-pulse"></div>
                <span className="text-muted-foreground">Disponible pour de nouveaux projets</span>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <Card className="bg-gradient-card border-border/50 shadow-card">
            <CardHeader>
              <CardTitle className="text-foreground">Envoyez-moi un message</CardTitle>
              <CardDescription>
                Remplissez le formulaire ci-dessous et je vous répondrai rapidement.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Input
                      name="name"
                      placeholder="Votre nom"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="bg-secondary border-border focus:border-primary"
                    />
                  </div>
                  <div>
                    <Input
                      name="email"
                      type="email"
                      placeholder="Votre email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="bg-secondary border-border focus:border-primary"
                    />
                  </div>
                </div>
                
                <Input
                  name="subject"
                  placeholder="Sujet"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="bg-secondary border-border focus:border-primary"
                />
                
                <Textarea
                  name="message"
                  placeholder="Votre message..."
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="bg-secondary border-border focus:border-primary resize-none"
                />
                
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-gradient-primary hover:shadow-glow transition-all duration-300 font-semibold"
                >
                  {isSubmitting ? (
                    'Envoi en cours...'
                  ) : (
                    <>
                      <Send size={16} className="mr-2" />
                      Envoyer le message
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Contact;