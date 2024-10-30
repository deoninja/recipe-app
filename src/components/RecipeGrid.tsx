import React from 'react'
import { RecipeCard } from '@/components/RecipeCard'
import { useRecipeStore } from '@/store/recipeStore'

export function RecipeGrid() {
  const { recipes, searchQuery } = useRecipeStore()

  const filteredRecipes = recipes.filter((recipe) =>
    recipe.title.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {filteredRecipes.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </div>
  )
}