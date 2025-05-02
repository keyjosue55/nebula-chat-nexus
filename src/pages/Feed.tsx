
import React, { useState, useEffect } from 'react';
import { Heart, MessageCircle, Share2, Image, Send } from 'lucide-react';
import AppLayout from '@/components/layouts/AppLayout';
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/components/ui/use-toast";

interface Post {
  id: number;
  userId: number;
  userName: string;
  userAvatar: string;
  content: string;
  image?: string;
  timestamp: string;
  likes: number;
  comments: number;
  liked: boolean;
}

const Feed = () => {
  const { toast } = useToast();
  const [posts, setPosts] = useState<Post[]>([]);
  const [newPost, setNewPost] = useState('');
  const [isPostingEnabled, setIsPostingEnabled] = useState(false);

  // Observer quand le champ de saisie du nouveau post change
  useEffect(() => {
    setIsPostingEnabled(newPost.trim().length > 0);
  }, [newPost]);

  // Simuler les données du flux
  useEffect(() => {
    const demoPosts: Post[] = [
      {
        id: 1,
        userId: 101,
        userName: "Aria Chen",
        userAvatar: "https://i.pravatar.cc/150?img=1",
        content: "Première connexion à la nouvelle interface holographique. Impressionnée par les capacités de ce nouveau système de communication quantique.",
        image: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
        timestamp: "Il y a 1 heure",
        likes: 42,
        comments: 7,
        liked: false
      },
      {
        id: 2,
        userId: 102,
        userName: "Marcus Wright",
        userAvatar: "https://i.pravatar.cc/150?img=2",
        content: "Rapport de mission : Secteur 7 sécurisé. Transmission des données en cours. Retour à la base dans T-3 heures.",
        timestamp: "Il y a 3 heures",
        likes: 18,
        comments: 4,
        liked: true
      },
      {
        id: 3,
        userId: 103,
        userName: "Nova Kaneda",
        userAvatar: "https://i.pravatar.cc/150?img=3",
        content: "Nouvelle mise à jour disponible pour vos implants neuronaux. N'oubliez pas de synchroniser avant votre prochain décollage! 🚀",
        image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
        timestamp: "Il y a 5 heures",
        likes: 76,
        comments: 12,
        liked: false
      },
      {
        id: 4,
        userId: 104,
        userName: "Lex Freeman",
        userAvatar: "https://i.pravatar.cc/150?img=4",
        content: "Les nouvelles barrières de protection quantique sont maintenant en place. Votre sécurité est notre priorité.",
        timestamp: "Il y a 12 heures",
        likes: 31,
        comments: 3,
        liked: false
      }
    ];
    
    setPosts(demoPosts);
  }, []);

  // Gérer le like d'un post
  const handleLikePost = (postId: number) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        const newLikedState = !post.liked;
        return {
          ...post,
          liked: newLikedState,
          likes: newLikedState ? post.likes + 1 : post.likes - 1
        };
      }
      return post;
    }));
  };

  // Gérer la création d'un nouveau post
  const handleCreatePost = () => {
    if (newPost.trim() === '') return;
    
    const newPostObj: Post = {
      id: Math.max(0, ...posts.map(p => p.id)) + 1,
      userId: 0,
      userName: "Julien Leroux",
      userAvatar: "https://i.pravatar.cc/300",
      content: newPost,
      timestamp: "À l'instant",
      likes: 0,
      comments: 0,
      liked: false
    };
    
    setPosts([newPostObj, ...posts]);
    setNewPost('');
    
    toast({
      title: "Publication réussie",
      description: "Votre message a été publié",
      variant: "default",
    });
  };

  return (
    <AppLayout>
      <div className="flex flex-col min-h-[calc(100vh-64px)]">
        <header className="px-4 py-3 bg-dark-lighter border-b border-neon-blue/20">
          <h1 className="text-xl font-bold text-white">Réseau</h1>
        </header>
        
        {/* Zone de création de post */}
        <div className="p-4 bg-dark-lighter border-b border-neon-blue/20">
          <div className="flex items-start space-x-4">
            <Avatar className="h-10 w-10 border-2 border-neon-blue/30">
              <img src="https://i.pravatar.cc/300" alt="Votre avatar" />
            </Avatar>
            
            <div className="flex-1">
              <Input
                placeholder="Partagez une actualité..."
                className="bg-dark-light border-neon-blue/20 mb-3"
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && isPostingEnabled) {
                    handleCreatePost();
                  }
                }}
              />
              
              <div className="flex justify-between items-center">
                <button className="text-neon-blue hover:text-neon-blue/80">
                  <Image size={20} />
                </button>
                
                <Button
                  size="sm"
                  className="bg-neon-blue hover:bg-neon-blue/80"
                  disabled={!isPostingEnabled}
                  onClick={handleCreatePost}
                >
                  <Send size={16} className="mr-2" />
                  Publier
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Liste des posts */}
        <ScrollArea className="flex-1">
          <div className="p-4 space-y-6">
            {posts.map((post) => (
              <div
                key={post.id}
                className="bg-dark-lighter rounded-lg p-4 border border-neon-blue/10 animate-entrance"
                style={{ 
                  animationDelay: `${post.id * 0.1}s`,
                  animationFillMode: 'both'
                }}
              >
                <div className="flex items-center mb-3">
                  <Avatar className="h-10 w-10 mr-3 border border-neon-blue/30">
                    <img src={post.userAvatar} alt={post.userName} />
                  </Avatar>
                  
                  <div>
                    <h3 className="font-medium text-white">{post.userName}</h3>
                    <p className="text-xs text-gray-400">{post.timestamp}</p>
                  </div>
                </div>
                
                <p className="text-white mb-4">{post.content}</p>
                
                {post.image && (
                  <div className="mb-4 rounded-md overflow-hidden">
                    <img
                      src={post.image}
                      alt="Post"
                      className="w-full h-auto object-cover"
                    />
                  </div>
                )}
                
                <div className="flex items-center justify-between text-gray-400">
                  <button
                    className={`flex items-center space-x-1 ${
                      post.liked ? 'text-red-500' : 'hover:text-white'
                    }`}
                    onClick={() => handleLikePost(post.id)}
                  >
                    <Heart size={18} className={post.liked ? 'fill-red-500' : ''} />
                    <span>{post.likes}</span>
                  </button>
                  
                  <button className="flex items-center space-x-1 hover:text-white">
                    <MessageCircle size={18} />
                    <span>{post.comments}</span>
                  </button>
                  
                  <button className="flex items-center space-x-1 hover:text-white">
                    <Share2 size={18} />
                    <span>Partager</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
    </AppLayout>
  );
};

export default Feed;
