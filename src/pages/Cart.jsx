import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Navbar } from '../components/Navbar'
import { Footer } from '../components/Footer'
import { getCart, removeFromCart, getProductById } from '../lib/storage'
import { Trash2, ArrowRight, ShoppingBag, ChevronLeft } from 'lucide-react'

export function Cart() {
  const navigate = useNavigate()
  const [cartItems, setCartItems] = useState([])

  useEffect(() => {
    loadCart()
    window.addEventListener('cart-updated', loadCart)
    return () => window.removeEventListener('cart-updated', loadCart)
  }, [])

  const loadCart = () => {
    const items = getCart()
    const withDetails = items.map(item => ({
      ...item,
      product: getProductById(item.productId)
    })).filter(i => i.product)
    setCartItems(withDetails)
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  const shipping = cartItems.length > 0 ? 10 : 0
  const total = subtotal + shipping

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <Navbar />
      <main className="pt-32 pb-24 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-12">
             <button onClick={() => navigate(-1)} className="p-4 bg-slate-900 rounded-2xl hover:bg-slate-800 transition-colors">
                <ChevronLeft size={24} />
             </button>
             <h1 className="text-5xl md:text-8xl font-black text-white tracking-tighter uppercase leading-none">Bag</h1>
          </div>

          {cartItems.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-24 md:py-32 glass rounded-[3rem] border border-white/5"
            >
              <div className="w-20 h-20 md:w-24 md:h-24 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-8">
                 <ShoppingBag size={48} className="text-slate-700" />
              </div>
              <h2 className="text-3xl font-black mb-4 uppercase tracking-tighter">Your bag is empty</h2>
              <p className="text-slate-500 mb-10 max-w-sm mx-auto font-medium">Looks like you haven't added any gear yet. Explore our latest collection.</p>
              <button 
                onClick={() => navigate('/products')} 
                className="px-10 py-5 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-2xl glow-primary transition-all hover:scale-105"
              >
                Go Shopping
              </button>
            </motion.div>
          ) : (
            <div className="grid lg:grid-cols-12 gap-12">
              <div className="lg:col-span-8 space-y-6">
                <AnimatePresence mode="popLayout">
                  {cartItems.map((item) => (
                    <motion.div
                      key={`${item.productId}-${item.size}`}
                      layout
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="group relative flex flex-col sm:flex-row gap-6 p-6 rounded-[2.5rem] bg-slate-900/40 border border-white/5 backdrop-blur-md hover:border-white/10 transition-all"
                    >
                      <div className="relative w-full sm:w-44 aspect-square rounded-2xl overflow-hidden bg-slate-800 shrink-0">
                        <img src={item.product.images[0].path} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                      </div>
                      <div className="flex-1 flex flex-col">
                        <div className="flex items-start justify-between mb-4">
                           <h3 className="text-2xl font-black text-white group-hover:text-blue-400 transition-colors uppercase tracking-tighter leading-none">{item.product.name}</h3>
                           <button 
                            onClick={() => removeFromCart(item.productId, item.size)} 
                            className="p-3 text-slate-500 hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-all"
                           >
                              <Trash2 size={22} />
                           </button>
                        </div>
                        <div className="flex flex-wrap gap-3 mb-8">
                           <div className="px-5 py-2 bg-slate-950 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 border border-white/5">
                              Size: <span className="text-white">{item.size}</span>
                           </div>
                           <div className="px-5 py-2 bg-slate-950 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 border border-white/5">
                              Qty: <span className="text-white">{item.quantity}</span>
                           </div>
                        </div>
                        <div className="mt-auto flex items-end justify-between">
                           <span className="text-3xl font-black text-blue-400 tracking-tighter">{(item.product.price * item.quantity).toFixed(2)}EGP</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              <div className="lg:col-span-4">
                <div className="glass rounded-[3rem] p-8 md:p-10 sticky top-32 border border-white/10 shadow-2xl">
                  <h3 className="text-2xl font-black mb-10 uppercase tracking-tighter">Order Summary</h3>
                  <div className="space-y-6 mb-12">
                    <div className="flex justify-between text-slate-500 font-black uppercase tracking-widest text-[10px]">
                      <span>Subtotal</span>
                      <span className="text-white">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-slate-500 font-black uppercase tracking-widest text-[10px]">
                      <span>Shipping</span>
                      <span className="text-white">${shipping.toFixed(2)}</span>
                    </div>
                    <div className="pt-8 border-t border-white/10 flex justify-between items-center">
                      <span className="text-xl font-black text-white uppercase tracking-tighter">Total</span>
                      <span className="text-4xl font-black text-blue-400 tracking-tighter">${total.toFixed(2)}</span>
                    </div>
                  </div>
                  <button 
                    onClick={() => navigate('/checkout')} 
                    className="w-full py-7 bg-white text-slate-950 font-black rounded-[2.5rem] text-xl glow-primary flex items-center justify-center gap-4 hover:bg-blue-600 hover:text-white transition-all hover:scale-[1.02]"
                  >
                    Checkout <ArrowRight size={26} />
                  </button>
                  <button 
                    onClick={() => navigate('/products')} 
                    className="w-full mt-4 py-4 text-slate-500 font-black uppercase tracking-widest text-[10px] hover:text-white transition-colors"
                  >
                    Continue Shopping
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
