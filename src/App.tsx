import React, { useState } from 'react'
import { SearchBar } from '@/components/SearchBar'
import { RecipeGrid } from '@/components/RecipeGrid'
import { ShoppingList } from '@/components/ShoppingList'
import { Button } from '@/components/ui/button'
import { ShoppingCart } from 'lucide-react'

function App() {
  const [showShoppingList, setShowShoppingList] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-3xl font-bold text-gray-900">Recipe App</h1>
            <Button
              onClick={() => setShowShoppingList(true)}
              className="flex items-center gap-2"
            >
              <ShoppingCart className="h-4 w-4" />
              Shopping List
            </Button>
          </div>
          <SearchBar />
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 py-6">
        <RecipeGrid />
      </main>

      <ShoppingList
        isOpen={showShoppingList}
        onClose={() => setShowShoppingList(false)}
      />
    </div>
  )
}

export default App