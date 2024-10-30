import { create } from 'zustand'
import { Recipe, ShoppingListItem } from '@/types/recipe'

interface RecipeState {
  recipes: Recipe[]
  favorites: Recipe[]
  shoppingList: ShoppingListItem[]
  searchQuery: string
  addToFavorites: (recipe: Recipe) => void
  removeFromFavorites: (id: string) => void
  setSearchQuery: (query: string) => void
  addToShoppingList: (recipeId: string) => void
  removeFromShoppingList: (recipeId: string) => void
  toggleShoppingItem: (itemId: string) => void
  adjustServings: (recipeId: string, newServings: number) => void
  addNote: (recipeId: string, note: string) => void
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
      notes: []
    }
  ],
  favorites: [],
  shoppingList: [],
  searchQuery: '',
  
  addToFavorites: (recipe) =>
    set((state) => ({
      favorites: [...state.favorites, recipe],
    })),
    
  removeFromFavorites: (id) =>
    set((state) => ({
      favorites: state.favorites.filter((recipe) => recipe.id !== id),
    })),
    
  setSearchQuery: (query) => set({ searchQuery: query }),
  
  addToShoppingList: (recipeId) =>
    set((state) => {
      const recipe = state.recipes.find((r) => r.id === recipeId)
      if (!recipe) return state
      
      const newItems = recipe.ingredients.map((ing) => ({
        ...ing,
        recipeId,
        recipeTitle: recipe.title,
        checked: false,
      }))
      
      return {
        shoppingList: [...state.shoppingList, ...newItems],
      }
    }),
    
  removeFromShoppingList: (recipeId) =>
    set((state) => ({
      shoppingList: state.shoppingList.filter((item) => item.recipeId !== recipeId),
    })),
    
  toggleShoppingItem: (itemId) =>
    set((state) => ({
      shoppingList: state.shoppingList.map((item) =>
        item.name === itemId ? { ...item, checked: !item.checked } : item
      ),
    })),
    
  adjustServings: (recipeId, newServings) =>
    set((state) => ({
      recipes: state.recipes.map((recipe) =>
        recipe.id === recipeId
          ? {
              ...recipe,
              servings: newServings,
              ingredients: recipe.ingredients.map((ing) => ({
                ...ing,
                amount: (ing.amount * newServings) / recipe.servings,
              })),
            }
          : recipe
      ),
    })),
    
  addNote: (recipeId, note) =>
    set((state) => ({
      recipes: state.recipes.map((recipe) =>
        recipe.id === recipeId
          ? {
              ...recipe,
              notes: [...(recipe.notes || []), note],
            }
          : recipe
      ),
    })),
}))