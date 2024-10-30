import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Recipe } from '@/types/recipe'
import { Clock, Users, Heart } from 'lucide-react'
import { useRecipeStore } from '@/store/recipeStore'
import { RecipeDetails } from './RecipeDetails'

interface RecipeCardProps {
  recipe: Recipe
}

export function RecipeCard({ recipe }: RecipeCardProps) {
  const { addToFavorites, removeFromFavorites, favorites } = useRecipeStore()
  const [showDetails, setShowDetails] = useState(false)
  const isFavorite = favorites.some((fav) => fav.id === recipe.id)

  const handleFavoriteClick = () => {
    if (isFavorite) {
      removeFromFavorites(recipe.id)
    } else {
      addToFavorites(recipe)
    }
  }

  return (
    <>
      <Card 
        className="w-full max-w-sm hover:shadow-lg transition-shadow cursor-pointer"
        onClick={() => setShowDetails(true)}
      >
        <CardHeader>
          <img
            src={recipe.image}
            alt={recipe.title}
            className="w-full h-48 object-cover rounded-t-lg"
          />
          <CardTitle>{recipe.title}</CardTitle>
          <CardDescription>{recipe.cuisine} Cuisine</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              {recipe.prepTime}
            </div>
            <div className="flex items-center">
              <Users className="w-4 h-4 mr-1" />
              {recipe.servings} servings
            </div>
          </div>
          <div className="mt-4">
            <p className="text-sm text-gray-600">
              {recipe.dietary.join(', ')}
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="flex items-center">
            <span className="text-yellow-400">★</span>
            <span className="ml-1">{recipe.rating}</span>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation()
              handleFavoriteClick()
            }}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <Heart
              className={`w-5 h-5 ${
                isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-500'
              }`}
            />
          </button>
        </CardFooter>
      </Card>
      
      <RecipeDetails
        recipe={recipe}
        isOpen={showDetails}
        onClose={() => setShowDetails(false)}
      />
    </>
  )
}