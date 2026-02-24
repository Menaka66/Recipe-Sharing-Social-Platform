import { useApp } from "@/context/AppContext";
import RecipeCard from "@/components/RecipeCard";
import { motion } from "framer-motion";
import { TrendingUp, Sparkles } from "lucide-react";

const Index = () => {
  const { recipes } = useApp();

  const trending = [...recipes].sort((a, b) => b.likes - a.likes).slice(0, 3);
  const latest = [...recipes].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  return (
    <main className="mx-auto max-w-5xl px-4 py-8">
      {/* Hero */}
      <motion.section
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-12 text-center"
      >
        <h1 className="font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          Discover & Share<br />
          <span className="text-primary">Delicious Recipes</span>
        </h1>
        <p className="mx-auto mt-4 max-w-lg text-muted-foreground">
          Join a community of food lovers. Share your creations, find inspiration, and cook something amazing today.
        </p>
      </motion.section>

      {/* Trending */}
      <section className="mb-12">
        <div className="mb-6 flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-primary" />
          <h2 className="font-display text-2xl font-semibold text-foreground">Trending Now</h2>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {trending.map((recipe, i) => (
            <RecipeCard key={recipe.id} recipe={recipe} index={i} />
          ))}
        </div>
      </section>

      {/* Latest */}
      <section>
        <div className="mb-6 flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          <h2 className="font-display text-2xl font-semibold text-foreground">Latest Recipes</h2>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {latest.map((recipe, i) => (
            <RecipeCard key={recipe.id} recipe={recipe} index={i} />
          ))}
        </div>
      </section>
    </main>
  );
};

export default Index;
