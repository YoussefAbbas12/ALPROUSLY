import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, ShoppingCart } from 'lucide-react'

export function ProductCard({ product }) {
  const mainImage = product.images?.[0]?.path || '/placeholder.png'

  return (
    <motion.div
      whileHover={{ y: -10 }}
      className="group relative flex flex-col h-full bg-slate-900/40 rounded-[2.5rem] border border-white/5 overflow-hidden transition-all backdrop-blur-xl hover:border-blue-500/30 shadow-2xl"
    >
      {/* Image Container */}
      <div className="relative aspect-[4/5] overflow-hidden rounded-t-[2.5rem] bg-slate-800">
        <motion.img
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.8 }}
          src={mainImage}
          alt={product.name}
          className="w-full h-full object-cover transition-all"
        />
        
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-6">
          <Link 
            to={`/product/${product.id}`}
            className="w-full flex items-center justify-center gap-3 py-4 bg-white text-slate-950 rounded-2xl font-black translate-y-4 group-hover:translate-y-0 transition-all duration-500 shadow-2xl hover:bg-blue-500 hover:text-white"
          >
            VIEW DETAILS <ArrowRight size={20} />
          </Link>
        </div>

        {/* Badge (Top Left) - Shows Discount if available, otherwise Category */}
        <div className={`absolute top-5 left-5 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] z-10 shadow-lg border ${
          product.discount 
            ? 'bg-blue-600 text-white border-blue-400/30 glow-primary' 
            : 'bg-slate-900/80 backdrop-blur-md text-slate-400 border-white/10'
        }`}>
          {product.discount || product.category}
        </div>

        {/* Quick Add Button */}
        <button className="absolute top-5 right-5 p-3 bg-white/10 hover:bg-blue-600 backdrop-blur-md rounded-xl text-white z-10 border border-white/10 transition-all hover:scale-110">
           <ShoppingCart size={18} />
        </button>
      </div>

      {/* Content */}
      <div className="p-8 flex flex-col flex-1">
        <h3 className="text-xl font-black text-white group-hover:text-blue-400 transition-colors line-clamp-1 uppercase tracking-tighter mb-4">
          {product.name}
        </h3>
        
        <div className="flex items-center gap-4 mb-6">
           <span className="text-2xl font-black text-blue-400 tracking-tighter">${product.price}</span>
           {product.oldPrice && (
             <span className="text-lg font-bold text-slate-600 line-through decoration-blue-500/50 decoration-2 tracking-tighter italic">
               ${product.oldPrice}
             </span>
           )}
        </div>

        <div className="pt-6 border-t border-white/5 mt-auto flex items-center justify-between">
           <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{product.category}</span>
           <div className="flex gap-1">
              {[1, 2, 3].map((_, i) => (
                <div key={i} className={`w-2 h-2 rounded-full ${i === 0 ? 'bg-blue-500' : 'bg-slate-800'}`}></div>
              ))}
           </div>
        </div>
      </div>
    </motion.div>
  )
}
