
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

const Auth = () => {
  const { toast } = useToast();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simuler une requête d'authentification
    setTimeout(() => {
      if (isLogin) {
        // Simuler une connexion réussie
        toast({
          title: "Connexion réussie",
          description: "Bienvenue dans SabaOngeya",
          variant: "default",
        });
        // Rediriger vers la page des messages
        window.location.href = '/messages';
      } else {
        // Valider le formulaire d'inscription
        if (formData.password !== formData.confirmPassword) {
          toast({
            title: "Erreur",
            description: "Les mots de passe ne correspondent pas",
            variant: "destructive",
          });
          setLoading(false);
          return;
        }
        
        // Simuler une inscription réussie
        toast({
          title: "Inscription réussie",
          description: "Veuillez vérifier votre email pour confirmer votre compte",
          variant: "default",
        });
        
        // Afficher le formulaire de connexion après l'inscription
        setIsLogin(true);
      }
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col bg-dark cyber-grid-bg py-12 px-4 sm:px-6 lg:px-8">
      <div className="animate-float mb-8 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-white font-cyber">
          <span className="text-neon-blue text-glow">Saba</span>
          <span className="text-neon-purple text-glow">Ongeya</span>
        </h1>
        <p className="mt-3 text-gray-400">Messagerie du futur</p>
      </div>
      
      <div className="max-w-md w-full mx-auto glass-panel p-8 animate-entrance">
        <h2 className="text-xl font-bold mb-6 text-center text-white">
          {isLogin ? 'Connexion' : 'Créer un compte'}
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label htmlFor="name" className="block text-sm text-gray-400 mb-1">Nom</label>
              <Input
                id="name"
                name="name"
                type="text"
                required={!isLogin}
                className="bg-dark-light border-neon-blue/30 focus:border-neon-blue"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
          )}
          
          <div>
            <label htmlFor="email" className="block text-sm text-gray-400 mb-1">Email</label>
            <Input
              id="email"
              name="email"
              type="email"
              required
              className="bg-dark-light border-neon-blue/30 focus:border-neon-blue"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm text-gray-400 mb-1">Mot de passe</label>
            <Input
              id="password"
              name="password"
              type="password"
              required
              className="bg-dark-light border-neon-blue/30 focus:border-neon-blue"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          
          {!isLogin && (
            <div>
              <label htmlFor="confirmPassword" className="block text-sm text-gray-400 mb-1">Confirmer le mot de passe</label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required={!isLogin}
                className="bg-dark-light border-neon-blue/30 focus:border-neon-blue"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>
          )}
          
          <Button
            type="submit"
            className="w-full cyber-button"
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <span className="animate-pulse">Chargement...</span>
              </span>
            ) : (
              isLogin ? 'Se connecter' : 'S\'inscrire'
            )}
          </Button>
        </form>
        
        <div className="mt-6 text-center">
          <button
            type="button"
            className="text-neon-blue hover:underline text-sm"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? 'Créer un compte' : 'J\'ai déjà un compte'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
