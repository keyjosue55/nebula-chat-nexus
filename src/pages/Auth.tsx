
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      if (isLogin) {
        // Connexion
        const { data, error } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        });

        if (error) throw error;

        toast({
          title: "Connexion réussie",
          description: "Bienvenue dans SabaOngeya",
          variant: "default",
        });

        navigate('/messages');
      } else {
        // Validation du formulaire d'inscription
        if (formData.password !== formData.confirmPassword) {
          toast({
            title: "Erreur",
            description: "Les mots de passe ne correspondent pas",
            variant: "destructive",
          });
          setLoading(false);
          return;
        }
        
        // Inscription
        const { data, error } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
          options: {
            data: {
              first_name: formData.name.split(' ')[0] || '',
              last_name: formData.name.split(' ').slice(1).join(' ') || '',
            }
          }
        });

        if (error) throw error;

        toast({
          title: "Inscription réussie",
          description: "Veuillez vérifier votre email pour confirmer votre compte",
          variant: "default",
        });
        
        // Afficher le formulaire de connexion après l'inscription
        setIsLogin(true);
      }
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message || "Une erreur est survenue",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
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
