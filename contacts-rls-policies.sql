-- Supprimer les anciennes politiques si elles existent
DROP POLICY IF EXISTS "Public can insert contacts" ON public.contacts;
DROP POLICY IF EXISTS "Admins can view all contacts" ON public.contacts;
DROP POLICY IF EXISTS "Admins can update contacts" ON public.contacts;
DROP POLICY IF EXISTS "Admins can delete contacts" ON public.contacts;

-- Activer RLS sur la table contacts
ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;

-- Politique 1: Permettre à tout le monde d'insérer des contacts (formulaire public)
CREATE POLICY "Public can insert contacts"
ON public.contacts
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Politique 2: Les admins peuvent voir tous les contacts
CREATE POLICY "Admins can view all contacts"
ON public.contacts
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Politique 3: Les admins peuvent mettre à jour tous les contacts
CREATE POLICY "Admins can update contacts"
ON public.contacts
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Politique 4: Les admins peuvent supprimer tous les contacts
CREATE POLICY "Admins can delete contacts"
ON public.contacts
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));
