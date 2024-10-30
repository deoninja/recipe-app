import React from 'react'
import { SearchBar } from '@/components/SearchBar'
import { RecipeGrid } from '@/components/RecipeGrid'

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Recipe App</h1>
          <div className="mt-4">
            <SearchBar />
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 py-6">
        <RecipeGrid />
      </main>
    </div>
  )
}

export default App