'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'sonner'
import { v4 as uuid } from 'uuid'
import { FaBoxes, FaSearch, FaPlus, FaEdit, FaTrash, FaFilter, FaPills, FaTools, FaFirstAid } from 'react-icons/fa'

type InventoryItem = {
  id: string
  name: string
  category: string
  quantity: number
  lowStock?: boolean
}

const categories = [
  { name: 'Consumables', icon: FaPills, color: 'from-green-600 to-emerald-600' },
  { name: 'Supplies', icon: FaFirstAid, color: 'from-purple-600 to-violet-600' },
  { name: 'Equipments', icon: FaTools, color: 'from-orange-600 to-amber-600' }
]

export default function InventoryPage() {
  const [items, setItems] = useState<InventoryItem[]>([])
  const [form, setForm] = useState({ name: '', quantity: '', category: categories[0].name })
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [editingItemId, setEditingItemId] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem('inventory')
    if (stored) {
      const parsedItems = JSON.parse(stored).map((item: InventoryItem) => ({
        ...item,
        lowStock: item.quantity <= 10
      }))
      setItems(parsedItems)
    }
  }, [])

  const saveToLocalStorage = (data: InventoryItem[]) => {
    localStorage.setItem('inventory', JSON.stringify(data))
  }

  const handleSave = () => {
    if (!form.name.trim() || !form.quantity) {
      toast.error('Please fill all required fields')
      return
    }

    if (editingItemId) {
      const updated = items.map(item =>
        item.id === editingItemId
          ? { ...item, name: form.name, quantity: +form.quantity, category: form.category, lowStock: +form.quantity <= 10 }
          : item
      )
      setItems(updated)
      saveToLocalStorage(updated)
      setEditingItemId(null)
      toast.success('Item updated successfully!')
    } else {
      const newItem: InventoryItem = {
        id: uuid(),
        name: form.name,
        category: form.category,
        quantity: +form.quantity,
        lowStock: +form.quantity <= 10
      }
      const updated = [...items, newItem]
      setItems(updated)
      saveToLocalStorage(updated)
      toast.success('Item added successfully!')
    }

    setForm({ name: '', quantity: '', category: categories[0].name })
    setShowForm(false)
  }

  const handleEdit = (item: InventoryItem) => {
    setForm({ name: item.name, quantity: item.quantity.toString(), category: item.category })
    setEditingItemId(item.id)
    setShowForm(true)
  }

  const handleDelete = (id: string) => {
    const updated = items.filter(item => item.id !== id)
    setItems(updated)
    saveToLocalStorage(updated)
    toast.success('Item deleted successfully')
  }

  const handleCancel = () => {
    setForm({ name: '', quantity: '', category: categories[0].name })
    setEditingItemId(null)
    setShowForm(false)
  }

  const filteredItems = items.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase())
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const getCategoryStats = () => {
    return categories.map(cat => ({
      ...cat,
      count: items.filter(item => item.category === cat.name).length,
      lowStockCount: items.filter(item => item.category === cat.name && item.lowStock).length
    }))
  }

  const totalItems = items.length
  const lowStockItems = items.filter(item => item.lowStock).length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-sky-600 rounded-xl flex items-center justify-center">
              <FaBoxes className="text-white text-xl" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-sky-600 bg-clip-text text-transparent">
                Inventory Management
              </h1>
              <p className="text-gray-600">
                {totalItems > 0 ? `Managing ${totalItems} items` : 'Add your first inventory item to get started'}
                {lowStockItems > 0 && (
                  <span className="ml-2 text-red-600 font-medium">• {lowStockItems} low stock items</span>
                )}
              </p>
            </div>
          </div>
          
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-sky-600 text-white rounded-2xl hover:from-blue-700 hover:to-sky-700 transition-all duration-300 shadow-lg hover:shadow-xl font-medium"
          >
            <FaPlus className="text-sm" />
            <span>Add Item</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Total Items */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 p-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-sky-600 rounded-xl flex items-center justify-center">
              <FaBoxes className="text-white" />
            </div>
            <div>
              <p className="text-gray-600 text-sm">Total Items</p>
              <p className="text-2xl font-bold text-gray-800">{totalItems}</p>
            </div>
          </div>
        </div>

        {/* Category Stats */}
        {getCategoryStats().map((cat) => {
          const IconComponent = cat.icon
          return (
            <div key={cat.name} className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 p-6">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 bg-gradient-to-r ${cat.color} rounded-xl flex items-center justify-center`}>
                  <IconComponent className="text-white" />
                </div>
                <div>
                  <p className="text-gray-600 text-sm">{cat.name}</p>
                  <p className="text-2xl font-bold text-gray-800">
                    {cat.count}
                    {cat.lowStockCount > 0 && (
                      <span className="text-sm text-red-600 ml-2">({cat.lowStockCount} low)</span>
                    )}
                  </p>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Search and Filter */}
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 p-6">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search inventory items..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
            />
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-2">
            <FaFilter className="text-gray-400" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-3 border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white"
            >
              <option value="All">All Categories</option>
              {categories.map(cat => (
                <option key={cat.name} value={cat.name}>{cat.name}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Add/Edit Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
          <motion.div
            className="bg-white rounded-3xl shadow-2xl w-full max-w-md"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            {/* Form Header */}
            <div className="bg-gradient-to-r from-blue-600 to-sky-600 p-6 text-white rounded-t-3xl">
              <h2 className="text-xl font-bold">
                {editingItemId ? 'Edit Item' : 'Add New Item'}
              </h2>
              <p className="text-blue-100 text-sm">Enter item information</p>
            </div>

            {/* Form */}
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Item Name *</label>
                <input
                  type="text"
                  placeholder="Enter item name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Category *</label>
                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                >
                  {categories.map(cat => (
                    <option key={cat.name} value={cat.name}>{cat.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Quantity *</label>
                <input
                  type="number"
                  placeholder="Enter quantity"
                  value={form.quantity}
                  onChange={(e) => setForm({ ...form, quantity: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  min="0"
                />
              </div>

              <p className="text-xs text-gray-500">* Required fields</p>

              {/* Form Actions */}
              <div className="flex gap-3 pt-4">
                <button
                  onClick={handleCancel}
                  className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 rounded-2xl hover:bg-gray-200 transition-all duration-300 font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-2xl hover:from-green-700 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl font-medium"
                >
                  {editingItemId ? 'Update Item' : 'Save Item'}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Inventory Table */}
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-sky-600 bg-clip-text text-transparent">
            Inventory Items
          </h2>
          <p className="text-gray-600 text-sm mt-1">
            {filteredItems.length} items {search || selectedCategory !== 'All' ? 'found' : 'total'}
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-blue-50 to-sky-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Item Name</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Category</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Quantity</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredItems.length > 0 ? (
                filteredItems.map((item, index) => {
                  const category = categories.find(cat => cat.name === item.category)
                  const IconComponent = category?.icon || FaBoxes
                  
                  return (
                    <motion.tr
                      key={item.id}
                      className="hover:bg-blue-50/50 transition-colors duration-200"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 bg-gradient-to-r ${category?.color || 'from-gray-600 to-gray-700'} rounded-lg flex items-center justify-center`}>
                            <IconComponent className="text-white text-xs" />
                          </div>
                          <span className="font-medium text-gray-800">{item.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-600">{item.category}</td>
                      <td className="px-6 py-4">
                        <span className={`font-semibold ${
                          item.lowStock ? 'text-red-600' : 'text-gray-800'
                        }`}>
                          {item.quantity}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        {item.lowStock ? (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                            Low Stock
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            In Stock
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleEdit(item)}
                            className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors duration-200"
                            title="Edit item"
                          >
                            <FaEdit className="text-sm" />
                          </button>
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors duration-200"
                            title="Delete item"
                          >
                            <FaTrash className="text-sm" />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  )
                })
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                        <FaBoxes className="text-gray-400 text-xl" />
                      </div>
                      <div>
                        <p className="text-gray-500 font-medium">No items found</p>
                        <p className="text-gray-400 text-sm mt-1">
                          {search || selectedCategory !== 'All' 
                            ? 'Try adjusting your search or filter' 
                            : 'Add your first inventory item to get started'
                          }
                        </p>
                      </div>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
