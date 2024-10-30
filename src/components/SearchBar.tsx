import React from 'react'
import { Input } from '@/components/ui/input'
import { useRecipeStore } from '@/store/recipeStore'

export function SearchBar() {
  const { searchQuery, setSearchQuery } = useRecipeStore()

  return (
    <div className="w-full max-w-xl mx-auto">
      <Input
        type="text"
        placeholder="Search recipes..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full"
      />
    </div>
  )
}