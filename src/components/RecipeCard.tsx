import { Link } from "react-router-dom";
import { Heart, MessageCircle, Bookmark, Clock, Users } from "lucide-react";
import { motion } from "framer-motion";
import { Recipe } from "@/types";
import { useApp } from "@/context/AppContext";

interface RecipeCardProps {
  recipe: Recipe;
  index?: number;
}

const RecipeCard = ({ recipe, index = 0 }: RecipeCardProps) => {
  const { likedRecipes, savedRecipes, toggleLike, toggleSave } = useApp();
  const isLiked = likedRecipes.has(recipe.id);
  const isSaved = savedRecipes.has(recipe.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="group overflow-hidden rounded-xl border border-border bg-card shadow-card transition-shadow hover:shadow-card-hover"
    >
      <Link to={`/recipe/${recipe.id}`} className="block">
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={recipe.image}
            alt={recipe.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 to-transparent" />
          <div className="absolute bottom-3 left-3 flex flex-wrap gap-1.5">
            {recipe.tags.slice(0, 2).map(tag => (
              <span key={tag} className="rounded-full bg-background/90 px-2.5 py-0.5 text-xs font-medium text-foreground backdrop-blur-sm">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </Link>

      <div className="p-4">
        <Link to={`/recipe/${recipe.id}`}>
          <h3 className="font-display text-lg font-semibold text-card-foreground line-clamp-1 hover:text-primary transition-colors">
            {recipe.title}
          </h3>
        </Link>
        <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{recipe.description}</p>

        <div className="mt-3 flex items-center gap-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{recipe.cookTime}</span>
          <span className="flex items-center gap-1"><Users className="h-3.5 w-3.5" />{recipe.servings} servings</span>
        </div>

        <div className="mt-3 flex items-center justify-between border-t border-border pt-3">
          <Link to={`/profile/${recipe.authorId}`} className="flex items-center gap-2">
            <img src={recipe.authorAvatar} alt={recipe.authorName} className="h-6 w-6 rounded-full object-cover" />
            <span className="text-xs font-medium text-foreground">{recipe.authorName}</span>
          </Link>

          <div className="flex items-center gap-2">
            <button
              onClick={(e) => { e.preventDefault(); toggleLike(recipe.id); }}
              className="flex items-center gap-1 text-muted-foreground transition-colors hover:text-primary"
            >
              <Heart className={`h-4 w-4 ${isLiked ? "fill-primary text-primary animate-heart-pop" : ""}`} />
              <span className="text-xs">{recipe.likes}</span>
            </button>
            <Link to={`/recipe/${recipe.id}`} className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors">
              <MessageCircle className="h-4 w-4" />
              <span className="text-xs">{recipe.comments.length}</span>
            </Link>
            <button
              onClick={(e) => { e.preventDefault(); toggleSave(recipe.id); }}
              className="text-muted-foreground transition-colors hover:text-primary"
            >
              <Bookmark className={`h-4 w-4 ${isSaved ? "fill-primary text-primary" : ""}`} />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default RecipeCard;
