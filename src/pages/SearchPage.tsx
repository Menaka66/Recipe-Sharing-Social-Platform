import { useState } from "react";
import { useApp } from "@/context/AppContext";
import { allTags } from "@/data/mockData";
import RecipeCard from "@/components/RecipeCard";
import { Search as SearchIcon, X } from "lucide-react";
import { motion } from "framer-motion";

const SearchPage = () => {
  const { searchRecipes } = useApp();
  const [query, setQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const results = searchRecipes(query, selectedTags);

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]);
  };

  return (
    <main className="mx-auto max-w-5xl px-4 py-8">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-display text-3xl font-bold text-foreground mb-6">Search Recipes</h1>

        <div className="relative mb-6">
          <SearchIcon className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search by recipe, ingredient, or chef..."
            className="w-full rounded-xl border border-input bg-background py-3 pl-11 pr-10 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
          {query && (
            <button onClick={() => setQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        <div className="mb-8 flex flex-wrap gap-2">
          {allTags.map(tag => (
            <button
              key={tag}
              onClick={() => toggleTag(tag)}
              className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                selectedTags.includes(tag)
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </motion.div>

      <p className="mb-4 text-sm text-muted-foreground">{results.length} recipe{results.length !== 1 ? "s" : ""} found</p>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {results.map((r, i) => <RecipeCard key={r.id} recipe={r} index={i} />)}
      </div>

      {results.length === 0 && (
        <div className="mt-12 text-center">
          <p className="text-lg text-muted-foreground">No recipes match your search.</p>
          <p className="text-sm text-muted-foreground mt-1">Try different keywords or tags.</p>
        </div>
      )}
    </main>
  );
};

export default SearchPage;
