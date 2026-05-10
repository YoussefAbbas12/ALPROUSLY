import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Navbar } from '../components/Navbar'
import { Footer } from '../components/Footer'
import { getCart, getProductById, clearCart, saveOrder } from '../lib/storage'
import { CircleCheck, ArrowLeft, CreditCard, ShieldCheck, Truck } from 'lucide-react'
import { toast } from 'sonner'

export function Checkout() {
  const navigate = useNavigate()
  const [cartItems, setCartItems] = useState([])
  const [formData, setFormData] = useState({ fullName: '', address: '', phone: '', email: '', notes: '' })
  const [isProcessing, setIsProcessing] = useState(false)
  const [orderConfirmed, setOrderConfirmed] = useState(false)
  const [result, setResult] = useState("")

  useEffect(() => {
    const items = getCart()
    const withDetails = items.map(item => ({ ...item, product: getProductById(item.productId) })).filter(i => i.product)
    if (withDetails.length === 0 && !orderConfirmed) navigate('/cart')
    else setCartItems(withDetails)
  }, [navigate, orderConfirmed])
  
  const subtotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  const shippingPrice = 60
  const total = subtotal + shippingPrice

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.fullName || !formData.address || !formData.phone || !formData.email) {
      toast.error('Please fill all required fields')
      return
    }

    setIsProcessing(true)

    // 1. Send Email via Web3Forms
    const mailData = new FormData()
    mailData.append("access_key", "f2a15f72-fcdc-40b2-906d-46527f184208")
    mailData.append("name", formData.fullName)
    mailData.append("email", formData.email)
    mailData.append("phone", formData.phone)
    mailData.append("address", formData.address)
    mailData.append("message", `New Order Total: $${total.toFixed(2)}\nNotes: ${formData.notes}\nItems: ${cartItems.map(i => `${i.product.name} (Size: ${i.size}) x${i.quantity}`).join(', ')}`)

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: mailData
      })
      const data = await response.json()
      
      if (data.success) {
        // 2. Save Order to Storage
        saveOrder({ 
          id: Math.random().toString(36).substr(2, 9).toUpperCase(), 
          ...formData, 
          total, 
          items: cartItems, 
          createdAt: new Date().toISOString() 
        })
        
        // 3. UI Update
        clearCart()
        setOrderConfirmed(true)
        toast.success('Order placed and confirmation sent!')
      } else {
        toast.error('Something went wrong with the email service.')
      }
    } catch (error) {
      toast.error('Error submitting order.')
    } finally {
      setIsProcessing(false)
    }
  }

  if (orderConfirmed) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4">
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="max-w-xl w-full glass rounded-[3rem] p-8 md:p-12 text-center border border-white/10 shadow-2xl">
          <div className="w-20 h-20 md:w-24 md:h-24 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-8 glow-primary">
            <CircleCheck size={48} className="text-green-400" />
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-white mb-4 uppercase tracking-tighter">Order Confirmed!</h1>
          <p className="text-slate-400 mb-10 text-lg">Your gear is on the way. We've sent a confirmation to {formData.email}.</p>
          <button onClick={() => navigate('/')} className="w-full py-6 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-2xl text-xl transition-all glow-primary">
            Back to Store
          </button>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <Navbar />
      <main className="pt-32 pb-24 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-12">
           <button onClick={() => navigate(-1)} className="p-4 bg-slate-900 rounded-2xl hover:bg-slate-800 transition-colors">
              <ArrowLeft size={24} />
           </button>
           <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter uppercase">Checkout</h1>
        </div>

        <form onSubmit={handleSubmit} className="grid lg:grid-cols-12 gap-8 md:gap-16">
          <div className="lg:col-span-7 space-y-8">
            <div className="glass rounded-[2.5rem] p-6 md:p-10 space-y-8 border border-white/5">
              <h3 className="text-2xl font-black text-white uppercase flex items-center gap-3">
                <Truck className="text-blue-500" /> Shipping Details
              </h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                   <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-2">Full Name</label>
                   <input 
                    type="text" 
                    required
                    placeholder="e.g. John Doe" 
                    value={formData.fullName} 
                    onChange={e => setFormData({ ...formData, fullName: e.target.value })} 
                    className="w-full px-6 py-4 bg-slate-950 border border-white/5 rounded-2xl focus:border-blue-500 outline-none transition-all" 
                   />
                </div>
                <div className="space-y-2">
                   <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-2">Email</label>
                   <input 
                    type="email" 
                    required
                    placeholder="e.g. john@example.com" 
                    value={formData.email} 
                    onChange={e => setFormData({ ...formData, email: e.target.value })} 
                    className="w-full px-6 py-4 bg-slate-950 border border-white/5 rounded-2xl focus:border-blue-500 outline-none transition-all" 
                   />
                </div>
              </div>

              <div className="space-y-2">
                 <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-2">Delivery Address</label>
                 <input 
                  type="text" 
                  required
                  placeholder="Street, City, Country" 
                  value={formData.address} 
                  onChange={e => setFormData({ ...formData, address: e.target.value })} 
                  className="w-full px-6 py-4 bg-slate-950 border border-white/5 rounded-2xl focus:border-blue-500 outline-none transition-all" 
                 />
              </div>

              <div className="space-y-2">
                 <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-2">Phone</label>
                 <input 
                  type="tel" 
                  required
                  placeholder="+1 (555) 000-0000" 
                  value={formData.phone} 
                  onChange={e => setFormData({ ...formData, phone: e.target.value })} 
                  className="w-full px-6 py-4 bg-slate-950 border border-white/5 rounded-2xl focus:border-blue-500 outline-none transition-all" 
                 />
              </div>

              <div className="space-y-2">
                 <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-2">Notes (Optional)</label>
                 <textarea 
                  placeholder="Gate code, special instructions..." 
                  value={formData.notes} 
                  onChange={e => setFormData({ ...formData, notes: e.target.value })} 
                  className="w-full px-6 py-4 bg-slate-950 border border-white/5 rounded-2xl focus:border-blue-500 outline-none transition-all h-32 resize-none" 
                 />
              </div>
            </div>

            <div className="glass rounded-[2.5rem] p-6 md:p-10 border border-white/5 flex items-center gap-4">
               <div className="w-12 h-12 bg-blue-600/10 rounded-xl flex items-center justify-center">
                  <CreditCard className="text-blue-500" />
               </div>
               <div>
                  <p className="font-black text-white">Cash on Delivery</p>
                  <p className="text-sm text-slate-500 uppercase tracking-widest font-bold">Secure Payment</p>
               </div>
            </div>

            <button 
              disabled={isProcessing} 
              className="w-full py-8 bg-white text-slate-950 font-black rounded-[2.5rem] text-2xl glow-primary hover:bg-blue-500 hover:text-white transition-all disabled:opacity-50"
            >
              {isProcessing ? 'Processing Order...' : 'Complete Purchase'}
            </button>
          </div>

          <div className="lg:col-span-5">
            <div className="glass rounded-[2.5rem] p-6 md:p-10 sticky top-32 border border-white/5">
              <h3 className="text-2xl font-black text-white mb-8 uppercase">Order Summary</h3>
              <div className="space-y-6 mb-10 max-h-[400px] overflow-y-auto pr-2 scrollbar-hide">
                 {cartItems.map((item) => (
                   <div key={`${item.productId}-${item.size}`} className="flex gap-4">
                      <div className="relative w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0 bg-slate-800">
                        <img src={item.product.images[0].path} alt="" className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-white line-clamp-1">{item.product.name}</h4>
                        <p className="text-xs text-slate-500 font-black uppercase mt-1">{item.size} • x{item.quantity}</p>
                        <p className="text-blue-400 font-black mt-1">{(item.product.price * item.quantity).toFixed(2)}EGP</p>
                      </div>
                   </div>
                 ))}
              </div>
              
              <div className="space-y-4 pt-6 border-t border-white/10">
                <div className="flex justify-between text-slate-500 font-bold uppercase tracking-widest text-xs">
                  <span>Subtotal</span>
                  <span className="text-white">{subtotal.toFixed(2)} EGP</span>
                </div>
                <div className="flex justify-between text-slate-500 font-bold uppercase tracking-widest text-xs">
                  <span>Shipping</span>
                  <span className="text-white">{shippingPrice} EGP</span>
                </div>
                <div className="pt-6 border-t border-white/10 flex justify-between items-center">
                  <span className="text-xl font-black text-white uppercase">Total</span>
                  <span className="text-4xl font-black text-blue-400">{total.toFixed(2)}EGP</span>
                </div>
              </div>

              <div className="mt-10 flex items-center gap-3 text-slate-600 text-xs font-bold uppercase tracking-widest p-4 bg-slate-950/50 rounded-2xl border border-white/5">
                 <ShieldCheck size={18} className="text-green-500" />
                 Secure Checkout Guarantee
              </div>
            </div>
          </div>
        </form>
      </main>
      <Footer />
    </div>
  )
}
