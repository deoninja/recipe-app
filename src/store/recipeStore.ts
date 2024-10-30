import { create } from 'zustand'
import { Recipe } from '@/types/recipe'

interface RecipeState {
  recipes: Recipe[]
  favorites: Recipe[]
  addToFavorites: (recipe: Recipe) => void
  removeFromFavorites: (id: string) => void
  searchQuery: string
  setSearchQuery: (query: string) => void
}

export const useRecipeStore = create<RecipeState>((set) => ({
  recipes: [
    {
      id: '1',
      title: 'Spaghetti Carbonara',
      cuisine: 'Italian',
      dietary: ['vegetarian'],
      servings: 4,
      prepTime: '20 mins',
      cookTime: '15 mins',
      ingredients: [
        { name: 'Spaghetti', amount: 400, unit: 'g' },
        { name: 'Eggs', amount: 4, unit: 'pieces' },
        { name: 'Pecorino Romano', amount: 100, unit: 'g' },
        { name: 'Black Pepper', amount: 2, unit: 'tsp' }
      ],
      instructions: [
        'Boil pasta in salted water',
        'Mix eggs and cheese',
        'Combine with hot pasta',
        'Season and serve'
      ],
      image: 'https://example.com/carbonara.jpg',
      rating: 4.5,
    },
    // Add more recipe examples here
  ],
  favorites: [],
  addToFavorites: (recipe) =>
    set((state) => ({
      favorites: [...state.favorites, recipe],
    })),
  removeFromFavorites: (id) =>
    set((state) => ({
      favorites: state.favorites.filter((recipe) => recipe.id !== id),
    })),
  searchQuery: '',
  setSearchQuery: (query) => set({ searchQuery: query }),
}))