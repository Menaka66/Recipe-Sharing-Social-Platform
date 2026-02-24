import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "@/context/AppContext";
import { allTags } from "@/data/mockData";
import { motion } from "framer-motion";
import { Plus, Minus, Upload, ChefHat } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const CreateRecipe = () => {
  const { addRecipe } = useApp();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [ingredients, setIngredients] = useState([""]);
  const [instructions, setInstructions] = useState([""]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [cookTime, setCookTime] = useState("");
  const [servings, setServings] = useState(2);

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!title.trim()) errs.title = "Title is required";
    if (!description.trim()) errs.description = "Description is required";
    if (ingredients.filter(i => i.trim()).length === 0) errs.ingredients = "At least one ingredient required";
    if (instructions.filter(i => i.trim()).length === 0) errs.instructions = "At least one step required";
    if (!cookTime.trim()) errs.cookTime = "Cook time is required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    addRecipe({
      title: title.trim(),
      description: description.trim(),
      image: image || "https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=800&h=600&fit=crop",
      ingredients: ingredients.filter(i => i.trim()),
      instructions: instructions.filter(i => i.trim()),
      tags: selectedTags,
      cookTime,
      servings,
    });

    toast({ title: "Recipe created!", description: "Your recipe has been published." });
    navigate("/");
  };

  const addField = (setter: React.Dispatch<React.SetStateAction<string[]>>) => {
    setter(prev => [...prev, ""]);
  };

  const removeField = (setter: React.Dispatch<React.SetStateAction<string[]>>, index: number) => {
    setter(prev => prev.length > 1 ? prev.filter((_, i) => i !== index) : prev);
  };

  const updateField = (setter: React.Dispatch<React.SetStateAction<string[]>>, index: number, value: string) => {
    setter(prev => prev.map((v, i) => i === index ? value : v));
  };

  const inputClass = "w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring";
  const labelClass = "block text-sm font-medium text-foreground mb-1.5";
  const errorClass = "text-xs text-destructive mt-1";

  return (
    <main className="mx-auto max-w-2xl px-4 py-8">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="mb-8 flex items-center gap-3">
          <ChefHat className="h-8 w-8 text-primary" />
          <h1 className="font-display text-3xl font-bold text-foreground">Create Recipe</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label className={labelClass}>Title</label>
            <input value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g. Classic Margherita Pizza" className={inputClass} />
            {errors.title && <p className={errorClass}>{errors.title}</p>}
          </div>

          {/* Description */}
          <div>
            <label className={labelClass}>Description</label>
            <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Describe your recipe..." rows={3} className={inputClass} />
            {errors.description && <p className={errorClass}>{errors.description}</p>}
          </div>

          {/* Image URL */}
          <div>
            <label className={labelClass}>Image URL <span className="text-muted-foreground">(optional)</span></label>
            <div className="relative">
              <Upload className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input value={image} onChange={e => setImage(e.target.value)} placeholder="https://example.com/image.jpg" className={`${inputClass} pl-10`} />
            </div>
          </div>

          {/* Cook time & servings */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Cook Time</label>
              <input value={cookTime} onChange={e => setCookTime(e.target.value)} placeholder="e.g. 30 min" className={inputClass} />
              {errors.cookTime && <p className={errorClass}>{errors.cookTime}</p>}
            </div>
            <div>
              <label className={labelClass}>Servings</label>
              <input type="number" min={1} value={servings} onChange={e => setServings(Number(e.target.value))} className={inputClass} />
            </div>
          </div>

          {/* Ingredients */}
          <div>
            <label className={labelClass}>Ingredients</label>
            <div className="space-y-2">
              {ingredients.map((ing, i) => (
                <div key={i} className="flex gap-2">
                  <input value={ing} onChange={e => updateField(setIngredients, i, e.target.value)} placeholder={`Ingredient ${i + 1}`} className={`${inputClass} flex-1`} />
                  <button type="button" onClick={() => removeField(setIngredients, i)} className="rounded-lg border border-border p-2.5 text-muted-foreground hover:text-destructive transition-colors">
                    <Minus className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
            <button type="button" onClick={() => addField(setIngredients)} className="mt-2 inline-flex items-center gap-1 text-sm text-primary hover:text-primary/80 transition-colors">
              <Plus className="h-4 w-4" /> Add ingredient
            </button>
            {errors.ingredients && <p className={errorClass}>{errors.ingredients}</p>}
          </div>

          {/* Instructions */}
          <div>
            <label className={labelClass}>Instructions</label>
            <div className="space-y-2">
              {instructions.map((step, i) => (
                <div key={i} className="flex gap-2">
                  <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground text-xs font-bold">{i + 1}</span>
                  <input value={step} onChange={e => updateField(setInstructions, i, e.target.value)} placeholder={`Step ${i + 1}`} className={`${inputClass} flex-1`} />
                  <button type="button" onClick={() => removeField(setInstructions, i)} className="rounded-lg border border-border p-2.5 text-muted-foreground hover:text-destructive transition-colors">
                    <Minus className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
            <button type="button" onClick={() => addField(setInstructions)} className="mt-2 inline-flex items-center gap-1 text-sm text-primary hover:text-primary/80 transition-colors">
              <Plus className="h-4 w-4" /> Add step
            </button>
            {errors.instructions && <p className={errorClass}>{errors.instructions}</p>}
          </div>

          {/* Tags */}
          <div>
            <label className={labelClass}>Tags</label>
            <div className="flex flex-wrap gap-2">
              {allTags.map(tag => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => setSelectedTags(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag])}
                  className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                    selectedTags.includes(tag) ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          <button type="submit" className="w-full rounded-xl bg-primary py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90">
            Publish Recipe
          </button>
        </form>
      </motion.div>
    </main>
  );
};

export default CreateRecipe;
