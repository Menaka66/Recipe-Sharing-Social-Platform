import React, { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { Recipe, Comment } from "@/types";
import { recipes as initialRecipes, users as initialUsers } from "@/data/mockData";
import type { User } from "@/types";

interface AppState {
  recipes: Recipe[];
  users: User[];
  currentUser: User;
  likedRecipes: Set<string>;
  savedRecipes: Set<string>;
  followedUsers: Set<string>;
  darkMode: boolean;
}

interface AppContextType extends AppState {
  toggleLike: (recipeId: string) => void;
  toggleSave: (recipeId: string) => void;
  toggleFollow: (userId: string) => void;
  addComment: (recipeId: string, text: string) => void;
  addRecipe: (recipe: Omit<Recipe, "id" | "authorId" | "authorName" | "authorAvatar" | "likes" | "comments" | "createdAt">) => void;
  toggleDarkMode: () => void;
  searchRecipes: (query: string, tags?: string[]) => Recipe[];
}

const AppContext = createContext<AppContextType | null>(null);

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
};

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [recipes, setRecipes] = useState<Recipe[]>(initialRecipes);
  const [users] = useState<User[]>(initialUsers);
  const [likedRecipes, setLikedRecipes] = useState<Set<string>>(new Set());
  const [savedRecipes, setSavedRecipes] = useState<Set<string>>(new Set());
  const [followedUsers, setFollowedUsers] = useState<Set<string>>(new Set());
  const [darkMode, setDarkMode] = useState(false);

  const currentUser = users[0]; // Sofia as default user

  const toggleLike = useCallback((recipeId: string) => {
    setLikedRecipes(prev => {
      const next = new Set(prev);
      if (next.has(recipeId)) {
        next.delete(recipeId);
        setRecipes(r => r.map(recipe => recipe.id === recipeId ? { ...recipe, likes: recipe.likes - 1 } : recipe));
      } else {
        next.add(recipeId);
        setRecipes(r => r.map(recipe => recipe.id === recipeId ? { ...recipe, likes: recipe.likes + 1 } : recipe));
      }
      return next;
    });
  }, []);

  const toggleSave = useCallback((recipeId: string) => {
    setSavedRecipes(prev => {
      const next = new Set(prev);
      next.has(recipeId) ? next.delete(recipeId) : next.add(recipeId);
      return next;
    });
  }, []);

  const toggleFollow = useCallback((userId: string) => {
    setFollowedUsers(prev => {
      const next = new Set(prev);
      next.has(userId) ? next.delete(userId) : next.add(userId);
      return next;
    });
  }, []);

  const addComment = useCallback((recipeId: string, text: string) => {
    const comment: Comment = {
      id: `c${Date.now()}`,
      userId: currentUser.id,
      userName: currentUser.name,
      userAvatar: currentUser.avatar,
      text,
      createdAt: new Date().toISOString().split("T")[0],
    };
    setRecipes(prev => prev.map(r => r.id === recipeId ? { ...r, comments: [...r.comments, comment] } : r));
  }, [currentUser]);

  const addRecipe = useCallback((data: Omit<Recipe, "id" | "authorId" | "authorName" | "authorAvatar" | "likes" | "comments" | "createdAt">) => {
    const newRecipe: Recipe = {
      ...data,
      id: `r${Date.now()}`,
      authorId: currentUser.id,
      authorName: currentUser.name,
      authorAvatar: currentUser.avatar,
      likes: 0,
      comments: [],
      createdAt: new Date().toISOString().split("T")[0],
    };
    setRecipes(prev => [newRecipe, ...prev]);
  }, [currentUser]);

  const toggleDarkMode = useCallback(() => {
    setDarkMode(prev => {
      const next = !prev;
      document.documentElement.classList.toggle("dark", next);
      return next;
    });
  }, []);

  const searchRecipes = useCallback((query: string, tags?: string[]) => {
    const q = query.toLowerCase();
    return recipes.filter(r => {
      const matchesQuery = !q || r.title.toLowerCase().includes(q) || r.description.toLowerCase().includes(q) || r.authorName.toLowerCase().includes(q);
      const matchesTags = !tags?.length || tags.some(t => r.tags.includes(t));
      return matchesQuery && matchesTags;
    });
  }, [recipes]);

  return (
    <AppContext.Provider value={{ recipes, users, currentUser, likedRecipes, savedRecipes, followedUsers, darkMode, toggleLike, toggleSave, toggleFollow, addComment, addRecipe, toggleDarkMode, searchRecipes }}>
      {children}
    </AppContext.Provider>
  );
};
