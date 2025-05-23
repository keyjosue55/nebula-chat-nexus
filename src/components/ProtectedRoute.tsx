
import React, { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading, session } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    // If user becomes null after initial load (e.g., token expired)
    if (!loading && !user) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);

  if (loading) {
    // Afficher un indicateur de chargement pendant la vérification de l'authentification
    return (
      <div className="flex items-center justify-center min-h-screen bg-dark cyber-grid-bg">
        <div className="animate-pulse flex space-x-2">
          <div className="w-3 h-3 bg-neon-blue rounded-full"></div>
          <div className="w-3 h-3 bg-neon-purple rounded-full"></div>
          <div className="w-3 h-3 bg-neon-orange rounded-full"></div>
        </div>
      </div>
    );
  }

  // Rediriger vers la page d'authentification si l'utilisateur n'est pas connecté
  if (!session) {
    return <Navigate to="/auth" replace />;
  }

  // Afficher le contenu protégé si l'utilisateur est connecté
  return <>{children}</>;
};

export default ProtectedRoute;
