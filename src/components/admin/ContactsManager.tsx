import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import supabase from '@/lib/supabase';
import { Contact } from '@/types/admin';
import { Mail, Calendar, User, MessageSquare, Trash2, Eye, Send } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

const ContactsManager = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [replyMessage, setReplyMessage] = useState('');
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const [openReplyDialog, setOpenReplyDialog] = useState<string | null>(null);
  const { toast } = useToast();

  const predefinedSubjects: Record<string, string> = {
    'Demande de devis': 'RE: Demande de devis - Proposition',
    'Question technique': 'RE: Question technique - Réponse',
    'Demande d\'information': 'RE: Demande d\'information',
    'Collaboration': 'RE: Collaboration - Intéressé',
    'Support': 'RE: Support technique',
    'Autre': 'RE: Votre message',
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const { data, error } = await supabase
        .from('contacts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setContacts(data || []);
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: "Impossible de charger les contacts",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const updateContactStatus = async (id: string, status: Contact['status']) => {
    try {
      const { error } = await supabase
        .from('contacts')
        .update({ status })
        .eq('id', id);

      if (error) throw error;

      setContacts(prev => 
        prev.map(contact => 
          contact.id === id ? { ...contact, status } : contact
        )
      );

      toast({
        title: "Statut mis à jour",
        description: `Contact marqué comme ${status}`,
      });
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: "Impossible de mettre à jour le statut",
        variant: "destructive",
      });
    }
  };

  const deleteContact = async (id: string) => {
    try {
      const { error } = await supabase
        .from('contacts')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setContacts(prev => prev.filter(contact => contact.id !== id));

      toast({
        title: "Contact supprimé",
        description: "Le contact a été supprimé avec succès",
      });
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: "Impossible de supprimer le contact",
        variant: "destructive",
      });
    }
  };

  const sendReplyEmail = async (contact: Contact) => {
    if (!replyMessage.trim()) {
      toast({
        title: "Erreur",
        description: "Veuillez écrire un message",
        variant: "destructive",
      });
      return;
    }

    setIsSendingEmail(true);
    try {
      const subject = predefinedSubjects[contact.subject] || `RE: ${contact.subject}`;
      
      const { error } = await supabase.functions.invoke('send-reply-email', {
        body: {
          to: contact.email,
          subject: subject,
          message: replyMessage,
          clientName: contact.name,
        },
      });

      if (error) throw error;

      await updateContactStatus(contact.id, 'replied');

      toast({
        title: "Email envoyé",
        description: `Votre réponse a été envoyée à ${contact.name}`,
      });

      setReplyMessage('');
      setOpenReplyDialog(null);
    } catch (error: any) {
      console.error('Error sending email:', error);
      toast({
        title: "Erreur",
        description: "Impossible d'envoyer l'email. Vérifiez votre configuration Resend.",
        variant: "destructive",
      });
    } finally {
      setIsSendingEmail(false);
    }
  };

  const getStatusColor = (status: Contact['status']) => {
    switch (status) {
      case 'new': return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      case 'read': return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
      case 'replied': return 'bg-green-500/10 text-green-500 border-green-500/20';
      default: return 'bg-gray-500/10 text-gray-500 border-gray-500/20';
    }
  };

  if (isLoading) {
    return <div className="text-center py-8">Chargement des contacts...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Gestion des Contacts</h2>
          <p className="text-muted-foreground">
            {contacts.length} contact{contacts.length > 1 ? 's' : ''} au total
          </p>
        </div>
      </div>

      <div className="grid gap-4">
        {contacts.length === 0 ? (
          <Card>
            <CardContent className="text-center py-8">
              <Mail className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">Aucun contact pour le moment</p>
            </CardContent>
          </Card>
        ) : (
          contacts.map((contact) => (
            <Card key={contact.id} className="relative">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <User className="h-4 w-4 text-primary" />
                      <CardTitle className="text-lg">{contact.name}</CardTitle>
                      <Badge className={getStatusColor(contact.status)}>
                        {contact.status}
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <Mail className="h-3 w-3" />
                      <span>{contact.email}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      <span>{new Date(contact.created_at).toLocaleDateString('fr-FR')}</span>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>{contact.subject}</DialogTitle>
                          <DialogDescription>
                            De {contact.name} ({contact.email}) - {new Date(contact.created_at).toLocaleDateString('fr-FR')}
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-medium mb-2">Message :</h4>
                            <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                              {contact.message}
                            </p>
                          </div>
                          <div className="flex space-x-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => updateContactStatus(contact.id, 'read')}
                            >
                              Marquer comme lu
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => updateContactStatus(contact.id, 'replied')}
                            >
                              Marquer comme répondu
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                    
                    {/* Reply Dialog */}
                    <Dialog open={openReplyDialog === contact.id} onOpenChange={(open) => setOpenReplyDialog(open ? contact.id : null)}>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" className="text-primary">
                          <Send className="h-4 w-4 mr-1" />
                          Répondre
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>Répondre à {contact.name}</DialogTitle>
                          <DialogDescription>
                            Email: {contact.email} | Sujet: {contact.subject}
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="subject" className="text-sm font-medium">Objet de l'email</Label>
                            <div className="mt-1 p-3 bg-muted rounded-md text-sm">
                              {predefinedSubjects[contact.subject] || `RE: ${contact.subject}`}
                            </div>
                          </div>
                          <div>
                            <Label htmlFor="message" className="text-sm font-medium">Message original</Label>
                            <div className="mt-1 p-3 bg-muted/50 rounded-md text-sm border">
                              <p className="text-muted-foreground whitespace-pre-wrap">{contact.message}</p>
                            </div>
                          </div>
                          <div>
                            <Label htmlFor="reply" className="text-sm font-medium">Votre réponse</Label>
                            <Textarea
                              id="reply"
                              placeholder="Écrivez votre réponse ici..."
                              value={replyMessage}
                              onChange={(e) => setReplyMessage(e.target.value)}
                              className="mt-1 min-h-[200px]"
                            />
                          </div>
                          <div className="flex justify-end space-x-2">
                            <Button 
                              variant="outline" 
                              onClick={() => {
                                setOpenReplyDialog(null);
                                setReplyMessage('');
                              }}
                              disabled={isSendingEmail}
                            >
                              Annuler
                            </Button>
                            <Button 
                              onClick={() => sendReplyEmail(contact)}
                              disabled={isSendingEmail || !replyMessage.trim()}
                            >
                              {isSendingEmail ? 'Envoi...' : 'Envoyer'}
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => deleteContact(contact.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <MessageSquare className="h-4 w-4 text-primary" />
                    <span className="font-medium">{contact.subject}</span>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {contact.message}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default ContactsManager;