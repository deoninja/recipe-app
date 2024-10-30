import React from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { useRecipeStore } from '@/store/recipeStore'
import { Trash2 } from 'lucide-react'

interface ShoppingListProps {
  isOpen: boolean
  onClose: () => void
}

export function ShoppingList({ isOpen, onClose }: ShoppingListProps) {
  const { shoppingList, toggleShoppingItem, removeFromShoppingList } = useRecipeStore()

  const groupedItems = shoppingList.reduce((acc, item) => {
    if (!acc[item.recipeTitle]) {
      acc[item.recipeTitle] = []
    }
    acc[item.recipeTitle].push(item)
    return acc
  }, {} as Record<string, typeof shoppingList>)

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Shopping List</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {Object.entries(groupedItems).map(([recipeTitle, items]) => (
            <div key={recipeTitle} className="space-y-2">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold">{recipeTitle}</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeFromShoppingList(items[0].recipeId)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <ul className="space-y-2">
                {items.map((item) => (
                  <li key={item.name} className="flex items-center gap-2">
                    <Checkbox
                      checked={item.checked}
                      onCheckedChange={() => toggleShoppingItem(item.name)}
                    />
                    <span className={item.checked ? 'line-through' : ''}>
                      {item.amount} {item.unit} {item.name}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}