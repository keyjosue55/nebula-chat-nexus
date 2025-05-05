
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
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [showVerification, setShowVerification] = useState(false);

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
        // For login, we'll use phone OTP without password
        const { data, error } = await supabase.auth.signInWithOtp({
          phone: formData.phone,
        });

        if (error) throw error;

        toast({
          title: "Code de vérification envoyé",
          description: "Veuillez vérifier votre téléphone pour le code",
          variant: "default",
        });

        setShowVerification(true);
      } else {
        // For signup, we'll also use phone OTP
        const { data, error } = await supabase.auth.signInWithOtp({
          phone: formData.phone,
          options: {
            shouldCreateUser: true,
          }
        });

        if (error) throw error;

        toast({
          title: "Code de vérification envoyé",
          description: "Veuillez vérifier votre téléphone pour le code",
          variant: "default",
        });
        
        setShowVerification(true);
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

  const verifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const { data, error } = await supabase.auth.verifyOtp({
        phone: formData.phone,
        token: verificationCode,
        type: 'sms',
      });

      if (error) throw error;

      toast({
        title: isLogin ? "Connexion réussie" : "Inscription réussie",
        description: "Bienvenue dans SabaOngeya",
        variant: "default",
      });

      navigate('/messages');
    } catch (error: any) {
      toast({
        title: "Erreur de vérification",
        description: error.message || "Code incorrect",
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
        
        {!showVerification ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="phone" className="block text-sm text-gray-400 mb-1">Numéro de téléphone</label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                placeholder="+33612345678"
                required
                className="bg-dark-light border-neon-blue/30 focus:border-neon-blue"
                value={formData.phone}
                onChange={handleChange}
              />
              <p className="text-xs text-gray-500 mt-1">Format: +33612345678</p>
            </div>
            
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
                isLogin ? 'Recevoir le code' : 'S\'inscrire'
              )}
            </Button>
          </form>
        ) : (
          <form onSubmit={verifyOTP} className="space-y-4">
            <div>
              <label htmlFor="verificationCode" className="block text-sm text-gray-400 mb-1">Code de vérification</label>
              <Input
                id="verificationCode"
                name="verificationCode"
                type="text"
                required
                className="bg-dark-light border-neon-blue/30 focus:border-neon-blue"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
              />
            </div>
            
            <Button
              type="submit"
              className="w-full cyber-button"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <span className="animate-pulse">Vérification...</span>
                </span>
              ) : (
                'Vérifier le code'
              )}
            </Button>
          </form>
        )}
        
        <div className="mt-6 text-center">
          <button
            type="button"
            className="text-neon-blue hover:underline text-sm"
            onClick={() => {
              setIsLogin(!isLogin);
              setShowVerification(false);
            }}
          >
            {isLogin ? 'Créer un compte' : 'J\'ai déjà un compte'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
