import { useParams } from "react-router-dom";
import { useApp } from "@/context/AppContext";
import RecipeCard from "@/components/RecipeCard";
import { motion } from "framer-motion";
import { UserPlus, UserCheck } from "lucide-react";

const Profile = () => {
  const { id } = useParams<{ id: string }>();
  const { users, recipes, followedUsers, toggleFollow, currentUser } = useApp();
  const user = users.find(u => u.id === id);

  if (!user) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-muted-foreground">User not found.</p>
      </div>
    );
  }

  const userRecipes = recipes.filter(r => r.authorId === user.id);
  const isFollowing = followedUsers.has(user.id);
  const isOwnProfile = user.id === currentUser.id;

  return (
    <main className="mx-auto max-w-5xl px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10 flex flex-col items-center text-center sm:flex-row sm:text-left sm:gap-8"
      >
        <img src={user.avatar} alt={user.name} className="h-24 w-24 rounded-full object-cover ring-4 ring-primary/20" />
        <div className="mt-4 sm:mt-0">
          <h1 className="font-display text-2xl font-bold text-foreground">{user.name}</h1>
          <p className="text-sm text-muted-foreground">@{user.username}</p>
          <p className="mt-2 max-w-md text-sm text-card-foreground">{user.bio}</p>
          <div className="mt-3 flex items-center gap-6 text-sm">
            <span><strong className="text-foreground">{userRecipes.length}</strong> <span className="text-muted-foreground">recipes</span></span>
            <span><strong className="text-foreground">{user.followers + (isFollowing ? 1 : 0)}</strong> <span className="text-muted-foreground">followers</span></span>
            <span><strong className="text-foreground">{user.following}</strong> <span className="text-muted-foreground">following</span></span>
          </div>
          {!isOwnProfile && (
            <button
              onClick={() => toggleFollow(user.id)}
              className={`mt-4 inline-flex items-center gap-1.5 rounded-lg px-5 py-2 text-sm font-medium transition-colors ${
                isFollowing
                  ? "border border-border text-muted-foreground hover:text-foreground"
                  : "bg-primary text-primary-foreground hover:bg-primary/90"
              }`}
            >
              {isFollowing ? <><UserCheck className="h-4 w-4" /> Following</> : <><UserPlus className="h-4 w-4" /> Follow</>}
            </button>
          )}
        </div>
      </motion.div>

      <section>
        <h2 className="font-display text-xl font-semibold text-foreground mb-6">
          {isOwnProfile ? "My Recipes" : `${user.name}'s Recipes`}
        </h2>
        {userRecipes.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {userRecipes.map((r, i) => <RecipeCard key={r.id} recipe={r} index={i} />)}
          </div>
        ) : (
          <p className="text-muted-foreground">No recipes yet.</p>
        )}
      </section>
    </main>
  );
};

export default Profile;
