import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react'
import heroData from '../data/hero.json'

export function HeroCarousel() {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => move(1), 10000)
    return () => clearInterval(timer)
  }, [current])

  const move = (step) => {
    setDirection(step)
    setCurrent((prev) => (prev + step + heroData.length) % heroData.length)
  }

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 30 : -30,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      x: direction < 0 ? 30 : -30,
      opacity: 0
    })
  }

  return (
    <div className="relative min-h-[90vh] md:h-[85vh] w-full bg-slate-950 flex items-center justify-center overflow-hidden mt-20 md:mt-[100px]">
      {/* Background Decorative Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/5 blur-[150px] rounded-full pointer-events-none"></div>
      
      <div className="max-w-[1200px] mx-auto px-6 md:px-8 w-full h-full flex items-center justify-center py-12 md:pt-16">
        <div className="relative w-full flex items-center min-h-[500px] md:min-h-[600px]">
          
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={current}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col md:flex-row items-center gap-10 md:gap-20 w-full"
            >
              {/* Image Section */}
              <div className="relative w-full max-w-[280px] md:max-w-[400px] mx-auto lg:mx-0 h-[300px] md:h-[460px] shrink-0">
                <div className="absolute -inset-6 bg-blue-500/10 blur-[80px] rounded-[4rem]"></div>
                <motion.div 
                  className="relative h-full w-full rounded-[2.5rem] overflow-hidden border border-white/5 shadow-2xl"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <img 
                    src={heroData[current].image} 
                    alt="" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent"></div>
                </motion.div>
              </div>

              {/* Text Section */}
              <div className="flex-1 flex flex-col items-center md:items-center text-center space-y-6 md:space-y-8 pb-10 md:pb-0">
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="flex flex-col items-center"
                >
                  <span className="inline-block px-5 py-1.5 bg-blue-600/10 text-blue-400 rounded-full text-[10px] font-black uppercase tracking-[0.3em] border border-blue-500/20 mb-4">
                    ELITE COLLECTION
                  </span>
                  <h1 className="text-4xl md:text-7xl font-black text-white leading-tight md:leading-[0.95] tracking-tighter uppercase max-w-2xl">
                    {heroData[current].title}
                  </h1>
                </motion.div>

                <motion.p
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-sm md:text-xl text-slate-400 max-w-md font-medium leading-relaxed px-4 md:px-0"
                >
                  {heroData[current].description}
                </motion.p>

                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <Link 
                    to="/products"
                    className="px-8 py-4 md:px-10 md:py-5 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-2xl flex items-center gap-3 transition-all glow-primary group text-base md:text-lg shadow-2xl"
                  >
                    {heroData[current].buttonText} <ArrowRight size={22} className="group-hover:translate-x-3 transition-transform" />
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls - Hidden on very small screens or moved for better UX */}
          <div className="absolute top-[40%] md:top-1/2 -translate-y-1/2 left-0 md:-left-20 z-30">
             <button 
              onClick={() => move(-1)} 
              className="p-3 md:p-6 text-white/20 hover:text-white transition-all rounded-full group active:scale-90"
             >
                <ChevronLeft size={32} className="md:w-12 md:h-12 group-hover:-translate-x-2 transition-transform" />
             </button>
          </div>
          <div className="absolute top-[40%] md:top-1/2 -translate-y-1/2 right-0 md:-right-20 z-30">
             <button 
              onClick={() => move(1)} 
              className="p-3 md:p-6 text-white/20 hover:text-white transition-all rounded-full group active:scale-90"
             >
                <ChevronRight size={32} className="md:w-12 md:h-12 group-hover:translate-x-2 transition-transform" />
             </button>
          </div>

          {/* Indicators */}
          <div className="absolute -bottom-6 md:-bottom-10 left-1/2 -translate-x-1/2 flex gap-3 md:gap-4 z-30">
            {heroData.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-1 md:h-1.5 transition-all duration-700 rounded-full ${
                  current === i ? 'w-10 md:w-12 bg-blue-500' : 'w-3 md:w-4 bg-white/10 hover:bg-white/30'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
