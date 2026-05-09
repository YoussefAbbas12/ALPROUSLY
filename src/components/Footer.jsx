import { Link } from 'react-router-dom'
import { Instagram, Facebook, Youtube, Mail, ArrowUpRight } from 'lucide-react'

export function Footer() {
  const currentYear = new Date().getFullYear()

const footerLinks = [
  {
    title: 'Shop',
    links: [
      { name: 'All Products', href: '/products', external: false },
      { name: 'New Arrivals', href: '/products', external: false },
    ],
  },
  {
    title: 'Support',
    links: [
      { name: 'Shipping Policy', href: '#', external: false },
      { name: 'FAQ', href: '#', external: false },
    ],
  },
  {
    title: 'Follow Us',
    links: [
      { type: 'instagram', icon: Instagram, href: 'https://instagram.com', external: true },
      { type: 'facebook', icon: Facebook, href: 'https://facebook.com', external: true },
      { type: 'youtube', icon: Youtube, href: 'https://youtube.com', external: true },
      { type: 'tiktok', href: 'https://tiktok.com', external: true },
    ],
  },
]

  const socialIcons = [
    { type: 'instagram', icon: Instagram, link: 'https://instagram.com' },
    { type: 'facebook', icon: Facebook, link: 'https://facebook.com' },
    { type: 'tiktok', link: 'https://tiktok.com' },
  ]

  return (
    <footer className="bg-slate-950 pt-32 pb-12 px-4 sm:px-6 lg:px-8 border-t border-white/5 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 mb-24">
          
          {/* Logo + Description */}
          <div className="lg:col-span-4">
            <Link to="/" className="flex items-center gap-3 mb-8 group">
              <div className="relative w-12 h-12 rounded-2xl overflow-hidden group-hover:scale-110 transition-transform duration-500">
                <img src="/logo.png" alt="Alprously" className="w-full h-full object-cover" />
              </div>
              <span className="text-3xl font-black text-white tracking-tighter">ALPROUSLY</span>
            </Link>

            <p className="text-slate-400 text-lg leading-relaxed mb-10 max-w-sm">
              Pushing the boundaries of performance and style. Engineered for those who never settle for second best.
            </p>

            {/* Social Icons */}
            <div className="flex gap-4">
              {socialIcons.map((item) => (
                <a
                  key={item.type}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 glass rounded-2xl flex items-center justify-center text-slate-400 hover:text-white transition-all"
                >
                  {item.type === 'tiktok'
                    ? <i className="fa-brands fa-tiktok"></i>
                    : <item.icon size={20} />
                  }
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="lg:col-span-5 grid grid-cols-2 sm:grid-cols-3 gap-8">
           {footerLinks.map((column) => (
  <div key={column.title}>
    <h3 className="text-white font-black uppercase tracking-widest text-xs mb-8">
      {column.title}
    </h3>

    <ul className="space-y-4">
      {column.links.map((link, i) => (
        <li key={i}>
          
          {/* لو column بتاع icons */}
          {link.icon || link.type === 'tiktok' ? (
            <a
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-slate-400 hover:text-white transition-all"
            >
              {link.type === 'tiktok'
                ? <i className="fa-brands fa-tiktok text-lg"></i>
                : <link.icon size={18} />
              }
              <span className="capitalize">{link.type}</span>
            </a>
          ) : link.external ? (
            
            <a
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-500 hover:text-blue-400 transition-colors flex items-center gap-1 group"
            >
              {link.name}
              <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-all" />
            </a>

          ) : (
            
            <Link
              to={link.href}
              className="text-slate-500 hover:text-blue-400 transition-colors flex items-center gap-1 group"
            >
              {link.name}
              <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-all" />
            </Link>

          )}
        </li>
      ))}
    </ul>
  </div>
))}
          </div>

          {/* Contact */}
          <div className="lg:col-span-3">
            <h3 className="text-white font-black uppercase tracking-widest text-xs mb-8">
              Get in Touch
            </h3>

            <div className="space-y-6">
              <div className="flex items-center gap-4 group">
                <div className="p-3 glass rounded-xl text-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-all">
                  <Mail size={20} />
                </div>
                <p className="text-slate-400 text-sm">
                  alprously357@gmail.com
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-slate-600 text-xs font-medium tracking-widest">
            © {currentYear} InfernoDevs Team. ALL RIGHTS RESERVED.
          </p>
        </div>
      </div>
    </footer>
  )
}
