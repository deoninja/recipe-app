import React, { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useRecipeStore } from '@/store/recipeStore'
import { Recipe } from '@/types/recipe'
import { Plus, Minus, ShoppingCart, BookmarkPlus } from 'lucide-react'

interface RecipeDetailsProps {
  recipe: Recipe
  isOpen: boolean
  onClose: () => void
}

export function RecipeDetails({ recipe, isOpen, onClose }: RecipeDetailsProps) {
  const { adjustServings, addToShoppingList, addNote } = useRecipeStore()
  const [newNote, setNewNote] = useState('')

  const handleServingChange = (increment: boolean) => {
    const newServings = increment ? recipe.servings + 1 : recipe.servings - 1
    if (newServings > 0) {
      adjustServings(recipe.id, newServings)
    }
  }

  const handleAddNote = () => {
    if (newNote.trim()) {
      addNote(recipe.id, newNote.trim())
      setNewNote('')
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{recipe.title}</DialogTitle>
        </DialogHeader>
        
        <div className="grid gap-4">
          <img
            src={recipe.image}
            alt={recipe.title}
            className="w-full h-64 object-cover rounded-lg"
          />
          
          <div className="flex items-center gap-4">
            <span>Servings:</span>
            <Button
              variant="outline"
              size="icon"
              onClick={() => handleServingChange(false)}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span>{recipe.servings}</span>
            <Button
              variant="outline"
              size="icon"
              onClick={() => handleServingChange(true)}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          
          <div>
            <h3 className="font-semibold mb-2">Ingredients</h3>
            <ul className="list-disc list-inside space-y-1">
              {recipe.ingredients.map((ing) => (
                <li key={ing.name}>
                  {ing.amount} {ing.unit} {ing.name}
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-2">Instructions</h3>
            <ol className="list-decimal list-inside space-y-2">
              {recipe.instructions.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ol>
          </div>
          
          <div className="flex gap-2">
            <Button
              onClick={() => addToShoppingList(recipe.id)}
              className="flex items-center gap-2"
            >
              <ShoppingCart className="h-4 w-4" />
              Add to Shopping List
            </Button>
          </div>
          
          <div>
            <h3 className="font-semibold mb-2">Notes</h3>
            <div className="flex gap-2 mb-2">
              <Input
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                placeholder="Add a note..."
              />
              <Button onClick={handleAddNote}>
                <BookmarkPlus className="h-4 w-4" />
              </Button>
            </div>
            <ul className="list-disc list-inside space-y-1">
              {recipe.notes?.map((note, index) => (
                <li key={index}>{note}</li>
              ))}
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default RecipeDetails;