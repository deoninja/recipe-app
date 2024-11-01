export interface Ingredient {
  name: string
  amount: number
  unit: string
}

export interface Recipe {
  id: string
  title: string
  cuisine: string
  dietary: string[]
  servings: number
  prepTime: string
  cookTime: string
  ingredients: Ingredient[]
  instructions: string[]
  image: string
  rating: number
  notes?: string[]
}

export interface ShoppingListItem extends Ingredient {
  recipeId: string
  recipeTitle: string
  checked: boolean
}