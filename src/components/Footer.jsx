import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Instagram, Twitter, Facebook, Youtube, Mail, MapPin, Phone, ArrowUpRight, Tiktok } from 'lucide-react'

export function Footer() {
  const currentYear = new Date().getFullYear()
  const socialLinks = ["Instagram.com", "Facebook.com" , "Tiktok.com"]
  const footerLinks = [
    {
      title: 'Shop',
      links: [
        { name: 'All Products', href: '/products' },
        { name: 'New Arrivals', href: '/products' },
      ],
    },
    {
      title: 'Contact Us',
      links: [
        { name: 'WhatsApp', href: 'href="https://wa.me/01020396397?text=Hello%20there!"' },
      ],
    },
  ]

  return (
    <footer className="bg-slate-950 pt-32 pb-12 px-4 sm:px-6 lg:px-8 border-t border-white/5 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 mb-24">
          <div className="lg:col-span-4">
            <Link to="/" className="flex items-center gap-3 mb-8 group">
              <div className="relative w-12 h-12 rounded-2xl overflow-hidden glow-primary group-hover:scale-110 transition-transform duration-500">
                <img src="/logo.png" alt="Alprously" className="w-full h-full object-cover" />
              </div>
              <span className="text-3xl font-black text-white tracking-tighter">ALPROUSLY</span>
            </Link>
            <p className="text-slate-400 text-lg leading-relaxed mb-10 max-w-sm">
              Pushing the boundaries of performance and style. Engineered for those who never settle for second best.
            </p>
            <div className="flex gap-4">
{[Instagram, Facebook , Youtube].map((Icon, i) => (
                <a
              key={i}
              href={socialLinks[i]}
              className="w-12 h-12 glass rounded-2xl flex items-center justify-center text-slate-400 hover:text-white transition-all"
            >
                  
                  {Icon==Youtube ? <i className="fa-brands fa-tiktok"></i> : <Icon size={20} />}
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {footerLinks.map((column) => (
              <div key={column.title}>
                <h3 className="text-white font-black uppercase tracking-widest text-xs mb-8">{column.title}</h3>
                <ul className="space-y-4">
                  {column.links.map((link) => (
                    <li key={link.name}>
                      <a to={link.href} className="text-slate-500 hover:text-blue-400 transition-colors flex items-center gap-1 group"></a>
                        {link.name}
                        <ArrowUpRight size={14} className="opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="lg:col-span-3">
             <h3 className="text-white font-black uppercase tracking-widest text-xs mb-8">Get in Touch</h3>
             <div className="space-y-6">
                <div className="flex items-center gap-4 group">
                   <div className="p-3 glass rounded-xl text-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-all">
                      <Mail size={20} />
                   </div>
                   <p className="text-slate-400 text-sm">alprously357@gmail.com</p>
                </div>
             </div>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-slate-600 text-xs font-medium uppercase tracking-widest"> 
            © {currentYear} InfernoDevs Team.
          </p>
        </div>
      </div>
    </footer>
  )
}
