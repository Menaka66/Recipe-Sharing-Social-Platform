import { useParams, Link } from "react-router-dom";
import { useApp } from "@/context/AppContext";
import { Heart, Bookmark, Clock, Users, ArrowLeft, Send } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

const RecipeDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { recipes, likedRecipes, savedRecipes, toggleLike, toggleSave, addComment } = useApp();
  const recipe = recipes.find(r => r.id === id);
  const [comment, setComment] = useState("");

  if (!recipe) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-muted-foreground">Recipe not found.</p>
      </div>
    );
  }

  const isLiked = likedRecipes.has(recipe.id);
  const isSaved = savedRecipes.has(recipe.id);

  const handleComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;
    addComment(recipe.id, comment.trim());
    setComment("");
  };

  return (
    <main className="mx-auto max-w-3xl px-4 py-8">
      <Link to="/" className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
        <ArrowLeft className="h-4 w-4" /> Back to feed
      </Link>

      <motion.article initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
        <div className="overflow-hidden rounded-xl">
          <img src={recipe.image} alt={recipe.title} className="aspect-video w-full object-cover" />
        </div>

        <div className="mt-6">
          <div className="flex flex-wrap gap-2 mb-3">
            {recipe.tags.map(tag => (
              <span key={tag} className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">{tag}</span>
            ))}
          </div>

          <h1 className="font-display text-3xl font-bold text-foreground sm:text-4xl">{recipe.title}</h1>
          <p className="mt-3 text-muted-foreground leading-relaxed">{recipe.description}</p>

          <div className="mt-4 flex items-center gap-6">
            <Link to={`/profile/${recipe.authorId}`} className="flex items-center gap-2">
              <img src={recipe.authorAvatar} alt={recipe.authorName} className="h-8 w-8 rounded-full object-cover" />
              <span className="text-sm font-medium text-foreground">{recipe.authorName}</span>
            </Link>
            <span className="flex items-center gap-1 text-sm text-muted-foreground"><Clock className="h-4 w-4" />{recipe.cookTime}</span>
            <span className="flex items-center gap-1 text-sm text-muted-foreground"><Users className="h-4 w-4" />{recipe.servings} servings</span>
          </div>

          <div className="mt-4 flex gap-3">
            <button onClick={() => toggleLike(recipe.id)} className={`flex items-center gap-1.5 rounded-lg border px-4 py-2 text-sm font-medium transition-colors ${isLiked ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground hover:text-foreground"}`}>
              <Heart className={`h-4 w-4 ${isLiked ? "fill-current" : ""}`} /> {recipe.likes}
            </button>
            <button onClick={() => toggleSave(recipe.id)} className={`flex items-center gap-1.5 rounded-lg border px-4 py-2 text-sm font-medium transition-colors ${isSaved ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground hover:text-foreground"}`}>
              <Bookmark className={`h-4 w-4 ${isSaved ? "fill-current" : ""}`} /> {isSaved ? "Saved" : "Save"}
            </button>
          </div>
        </div>

        {/* Ingredients */}
        <section className="mt-8">
          <h2 className="font-display text-xl font-semibold text-foreground mb-4">Ingredients</h2>
          <ul className="space-y-2">
            {recipe.ingredients.map((ing, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-card-foreground">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                {ing}
              </li>
            ))}
          </ul>
        </section>

        {/* Instructions */}
        <section className="mt-8">
          <h2 className="font-display text-xl font-semibold text-foreground mb-4">Instructions</h2>
          <ol className="space-y-4">
            {recipe.instructions.map((step, i) => (
              <li key={i} className="flex gap-4 text-sm">
                <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold">{i + 1}</span>
                <p className="pt-1 text-card-foreground leading-relaxed">{step}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* Comments */}
        <section className="mt-10 border-t border-border pt-8">
          <h2 className="font-display text-xl font-semibold text-foreground mb-4">Comments ({recipe.comments.length})</h2>

          <form onSubmit={handleComment} className="mb-6 flex gap-2">
            <input
              value={comment}
              onChange={e => setComment(e.target.value)}
              placeholder="Add a comment..."
              className="flex-1 rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
            <button type="submit" className="rounded-lg bg-primary px-4 py-2.5 text-primary-foreground transition-colors hover:bg-primary/90">
              <Send className="h-4 w-4" />
            </button>
          </form>

          <div className="space-y-4">
            {recipe.comments.map(c => (
              <div key={c.id} className="flex gap-3">
                <img src={c.userAvatar} alt={c.userName} className="h-8 w-8 rounded-full object-cover" />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-foreground">{c.userName}</span>
                    <span className="text-xs text-muted-foreground">{c.createdAt}</span>
                  </div>
                  <p className="mt-0.5 text-sm text-card-foreground">{c.text}</p>
                </div>
              </div>
            ))}
            {recipe.comments.length === 0 && (
              <p className="text-sm text-muted-foreground">No comments yet. Be the first!</p>
            )}
          </div>
        </section>
      </motion.article>
    </main>
  );
};

export default RecipeDetail;
