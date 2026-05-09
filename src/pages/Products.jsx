import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Navbar } from '../components/Navbar'
import { Footer } from '../components/Footer'
import { ProductCard } from '../components/ProductCard'
import { getProducts } from '../lib/storage'
import { Search, ListFilter } from 'lucide-react'

export function Products() {
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')

  const categories = ['All', 'Apparel', 'Footwear', 'Accessories']

  useEffect(() => {
    const all = getProducts()
    setProducts(all)
    setFilteredProducts(all)
  }, [])

  useEffect(() => {
    let result = products
    if (activeCategory !== 'All') {
      result = result.filter(p => p.category === activeCategory)
    }
    if (searchQuery) {
      result = result.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }
    setFilteredProducts(result)
  }, [searchQuery, activeCategory, products])

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <Navbar />
      
      <main className="pt-32 pb-24">
        <section className="px-4 sm:px-6 lg:px-8 mb-16">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
              <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter uppercase leading-none">Gear</h1>

              <div className="flex items-center gap-4 w-full md:w-auto">
                 <div className="relative w-full md:w-80">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
                    <input 
                      type="text" 
                      placeholder="Search items..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-12 pr-6 py-4 bg-slate-900 border border-white/5 rounded-2xl focus:outline-none focus:border-blue-500 w-full transition-all text-white font-bold"
                    />
                 </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 overflow-x-auto pb-4 scrollbar-hide">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-8 py-3 rounded-2xl font-black text-sm uppercase tracking-widest transition-all shrink-0 ${
                    activeCategory === cat
                      ? 'bg-blue-600 text-white glow-primary border-transparent'
                      : 'bg-slate-900 text-slate-400 border border-white/5 hover:border-white/20'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-12 text-slate-500 text-xs font-black uppercase tracking-[0.2em]">
               <div className="flex items-center gap-3">
                  <ListFilter size={18} className="text-blue-500" />
                  <span>{filteredProducts.length} Items Found</span>
               </div>
            </div>

            <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              <AnimatePresence mode="popLayout">
                {filteredProducts.map((product) => (
                  <motion.div 
                    key={product.id} 
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4 }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
