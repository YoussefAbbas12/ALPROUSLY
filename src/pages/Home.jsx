import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Navbar } from '../components/Navbar'
import { Footer } from '../components/Footer'
import { HeroCarousel } from '../components/HeroCarousel'
import { ProductCard } from '../components/ProductCard'
import { getProducts } from '../lib/storage'
import { ArrowRight, Zap, Shield, Rocket } from 'lucide-react'

export function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([])

  useEffect(() => {
    setFeaturedProducts(getProducts().slice(0, 4))
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 overflow-x-hidden">
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <section className="relative h-screen w-full">
          <HeroCarousel />
        </section>

        {/* Featured Products */}
        <section className="py-32 px-4 sm:px-6 lg:px-8 bg-slate-900/20">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <span className="text-blue-500 font-black tracking-[0.3em] uppercase text-xs mb-4 block ml-1">Elite Collection</span>
                <h2 className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-[0.85]">
                  Top Sale
                </h2>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <Link to="/products" className="group flex items-center gap-4 text-white font-black text-2xl hover:text-blue-500 transition-all">
                  Shop All <ArrowRight size={32} className="group-hover:translate-x-3 transition-transform text-blue-500" />
                </Link>
              </motion.div>
            </div>

            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
            >
              {featuredProducts.map((product) => (
                <motion.div key={product.id} variants={itemVariants}>
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Video/Banner Section */}
        <section className="py-32 px-4">
           <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-7xl mx-auto relative h-[500px] md:h-[650px] rounded-[4rem] overflow-hidden group shadow-2xl border border-white/5"
           >
              <img 
                src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2000" 
                alt="Banner" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2000ms]"
              />
              <div className="absolute inset-0 bg-slate-950/40 group-hover:bg-slate-950/20 transition-all duration-1000"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
              <div className="absolute inset-0 flex flex-col justify-end p-10 md:p-24">
                 <motion.h2 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-5xl md:text-8xl font-black text-white mb-8 uppercase tracking-tighter max-w-4xl leading-[0.9]"
                 >
                   Not For <br /> <span className="text-blue-500 italic">Every</span>one.
                 </motion.h2>
                 <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                 >
                   <Link 
                    to="/about" 
                    className="w-fit px-12 py-6 bg-white text-slate-950 font-black rounded-2xl hover:bg-blue-600 hover:text-white transition-all glow-primary text-xl"
                   >
                     Our Philosophy
                   </Link>
                 </motion.div>
              </div>
           </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
