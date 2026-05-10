import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingCart, Menu, X, ArrowRight } from 'lucide-react'
import { getCart } from '../lib/storage'

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [cartCount, setCartCount] = useState(0)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    
    const updateCart = () => setCartCount(getCart().length)
    updateCart()
    
    window.addEventListener('cart-updated', updateCart)
    window.addEventListener('storage', updateCart)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('cart-updated', updateCart)
      window.removeEventListener('storage', updateCart)
    }
  }, [])

  useEffect(() => setIsMobileMenuOpen(false), [location.pathname])

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Products', href: '/products' },
  ]

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? 'py-2' : 'py-3 md:py-4'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className={`relative glass rounded-[1.5rem] md:rounded-[2rem] p-2 md:p-3 flex items-center justify-between transition-all duration-500 ${
          isScrolled ? 'shadow-2xl shadow-blue-500/10 border-white/10' : 'bg-slate-950/20 border-white/5'
        }`}>
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 md:gap-3 group shrink-0 ml-2">
            <div className="relative w-8 h-8 md:w-10 md:h-10 rounded-4xl md:rounded-4xl overflow-hidden glow-primary group-hover:scale-110 transition-transform duration-500">
              <img src="/logo.png" alt="Alprously" className="w-full h-full object-cover" />
            </div>
            <span className="text-lg md:text-xl font-black text-white tracking-tighter">ALPROUSLY</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1 bg-slate-950/40 rounded-xl p-1 border border-white/5">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className={`px-5 py-1.5 text-[11px] font-black uppercase tracking-widest transition-all rounded-lg ${
                  location.pathname === link.href 
                    ? 'text-white bg-blue-600 shadow-lg shadow-blue-500/20' 
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 md:gap-3 mr-1">
            <Link
              to="/cart"
              className="relative p-2 md:p-2.5 bg-white/5 hover:bg-white/10 rounded-xl text-white transition-all group"
            >
              <ShoppingCart size={18} className="group-hover:scale-110 transition-transform" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 md:w-5 md:h-5 bg-blue-500 rounded-full flex items-center justify-center text-[8px] font-black border-2 border-slate-950 glow-primary">
                  {cartCount}
                </span>
              )}
            </Link>

            <button 
              className="md:hidden p-2 text-white hover:bg-white/5 rounded-xl transition-colors" 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="md:hidden fixed inset-x-4 top-20 glass rounded-[2rem] p-6 z-40 border border-white/10 shadow-2xl"
          >
            <div className="flex flex-col gap-3">
               {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  className={`text-2xl font-black flex items-center justify-between group py-2 ${
                    location.pathname === link.href ? 'text-blue-400' : 'text-white'
                  }`}
                >
                  {link.label}
                  <ArrowRight size={20} className={`transition-all ${
                    location.pathname === link.href ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
                  } group-hover:opacity-100 group-hover:translate-x-0 text-blue-500`} />
                </Link>
              ))}
              
              <div className="h-px bg-white/10 my-2"></div>
              
              <Link 
                to="/cart" 
                className="w-full py-4 bg-white text-slate-950 rounded-xl font-black text-center text-lg"
              >
                View Bag ({cartCount})
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
