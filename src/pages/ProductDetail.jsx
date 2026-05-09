import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Navbar } from '../components/Navbar'
import { Footer } from '../components/Footer'
import { getProductById, addToCart } from '../lib/storage'
import { ShoppingCart, Check, ChevronRight, Heart, Share2 } from 'lucide-react'
import { toast } from 'sonner'

export function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [product, setProduct] = useState(null)
  const [selectedSize, setSelectedSize] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [activeImage, setActiveImage] = useState(0)
  const [isAdding, setIsAdding] = useState(false)

  useEffect(() => {
    const p = getProductById(id)
    if (p) {
      setProduct(p)
      setSelectedSize(p.sizes[0])
    }
  }, [id])

  if (!product) return null

  const handleAddToCart = () => {
    if (!selectedSize || quantity <= 0) {
      toast.error('Please select size')
      return
    }

    setIsAdding(true)
    addToCart({ productId: product.id, size: selectedSize, quantity })
    toast.success(`${product.name} added to bag!`)
    setTimeout(() => setIsAdding(false), 1500)
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <Navbar />

      <main className="pt-32 pb-24 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-500 mb-12">
            <button onClick={() => navigate('/products')} className="hover:text-blue-500 transition-colors">Products</button>
            <ChevronRight size={14} />
            <span className="text-slate-300">{product.name}</span>
          </div>

          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
            {/* Gallery */}
            <div className="lg:col-span-7 flex flex-col-reverse md:flex-row gap-4 md:gap-6">
              <div className="flex flex-row md:flex-col gap-4 overflow-x-auto md:overflow-y-auto md:w-24 shrink-0 scrollbar-hide">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`relative aspect-square w-20 md:w-full rounded-2xl overflow-hidden border-2 transition-all flex-shrink-0 ${
                      activeImage === i ? 'border-blue-500 glow-primary scale-105' : 'border-white/5'
                    }`}
                  >
                    <img src={img.path} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>

              <div className="flex-1 relative aspect-[4/5] rounded-[2.5rem] md:rounded-[3rem] overflow-hidden bg-slate-900 border border-white/5 shadow-2xl">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeImage}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    src={product.images[activeImage].path}
                    className="w-full h-full object-cover"
                  />
                </AnimatePresence>
                <div className="absolute top-6 right-6 flex flex-col gap-3">
                   <button className="p-4 glass rounded-full text-white hover:bg-white hover:text-slate-950 transition-all shadow-xl">
                      <Heart size={20} />
                   </button>
                   <button className="p-4 glass rounded-full text-white hover:bg-white hover:text-slate-950 transition-all shadow-xl">
                      <Share2 size={20} />
                   </button>
                </div>
              </div>
            </div>

            {/* Info */}
            <div className="lg:col-span-5 flex flex-col justify-center">
              <div className="mb-10">
                <span className="inline-block px-4 py-1.5 bg-blue-600/10 text-blue-400 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-6 border border-blue-500/20">
                  {product.category}
                </span>
                <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-none tracking-tighter uppercase">
                  {product.name}
                </h1>
                <p className="text-4xl font-black text-blue-400 tracking-tighter">${product.price.toFixed(2)}</p>
              </div>

              <p className="text-xl text-slate-400 mb-12 leading-relaxed font-light">
                {product.description}
              </p>

              <div className="space-y-12 mb-12">
                <div>
                  <label className="block text-white font-black uppercase tracking-[0.2em] text-[10px] mb-6">
                    Select Size: <span className="text-blue-500">{selectedSize}</span>
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`w-16 h-16 rounded-2xl font-black transition-all border-2 flex items-center justify-center text-lg ${
                          selectedSize === size
                            ? 'bg-blue-600 border-blue-400 text-white glow-primary scale-110'
                            : 'bg-slate-900 border-white/5 text-slate-400 hover:border-white/20'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-8">
                   <div className="space-y-4">
                      <label className="block text-white font-black uppercase tracking-[0.2em] text-[10px]">Quantity</label>
                      <div className="inline-flex items-center p-2 bg-slate-900 rounded-2xl border border-white/5">
                        <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-12 h-12 flex items-center justify-center text-white font-bold text-2xl hover:text-blue-500 transition-colors"> − </button>
                        <span className="w-12 text-center font-black text-xl">{quantity}</span>
                        <button onClick={() => setQuantity(quantity + 1)} className="w-12 h-12 flex items-center justify-center text-white font-bold text-2xl hover:text-blue-500 transition-colors"> + </button>
                      </div>
                   </div>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <button
                  onClick={handleAddToCart}
                  disabled={isAdding}
                  className={`w-full py-7 rounded-[2.5rem] font-black text-2xl transition-all flex items-center justify-center gap-4 shadow-2xl ${
                    isAdding ? 'bg-green-600' : 'bg-blue-600 hover:bg-blue-700 hover:scale-[1.02]'
                  } text-white`}
                >
                  {isAdding ? <Check size={28} /> : <ShoppingCart size={28} />}
                  {isAdding ? 'Added to Bag' : 'Add to Bag'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
