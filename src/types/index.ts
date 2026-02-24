export interface User {
  id: string;
  name: string;
  username: string;
  avatar: string;
  bio: string;
  followers: number;
  following: number;
  recipes: string[];
}

export interface Comment {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  text: string;
  createdAt: string;
}

export interface Recipe {
  id: string;
  title: string;
  description: string;
  image: string;
  ingredients: string[];
  instructions: string[];
  tags: string[];
  authorId: string;
  authorName: string;
  authorAvatar: string;
  likes: number;
  comments: Comment[];
  cookTime: string;
  servings: number;
  createdAt: string;
}

export type RecipeFormData = Omit<Recipe, 'id' | 'authorId' | 'authorName' | 'authorAvatar' | 'likes' | 'comments' | 'createdAt'>;
