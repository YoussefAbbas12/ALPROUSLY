import { useState } from 'react'
import { motion } from 'framer-motion'
import { Navbar } from '../components/Navbar'
import { Footer } from '../components/Footer'
import { Rocket, Target, Users, Send } from 'lucide-react'
import { toast } from 'sonner'

export function About() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleContactSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    const formData = new FormData(e.target)
    formData.append("access_key", "f2a15f72-fcdc-40b2-906d-46527f184208")

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      })
      const data = await response.json()
      if (data.success) {
        toast.success("Message sent successfully!")
        e.target.reset()
      } else {
        toast.error("Something went wrong.")
      }
    } catch (error) {
      toast.error("Error sending message.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <Navbar />
      <main className="pt-32 pb-24">
        {/* Hero Section */}
        <section className="px-4 max-w-7xl mx-auto mb-32">
           <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-7xl md:text-9xl font-black tracking-tighter mb-12 text-white/10 select-none"
           >
            WHO WE ARE
           </motion.h1>
           <div className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
              >
                 <h2 className="text-4xl md:text-6xl font-black mb-8 leading-none uppercase tracking-tighter">
                   REDEFINING <span className="text-blue-500 italic">PERFORMANCE</span> SINCE 2026.
                 </h2>
                 <p className="text-xl text-slate-400 leading-relaxed font-light mb-10">
                  Alprously was founded on a simple principle: gear should never hold you back. We combine cutting-edge materials science with elite athletic research to create equipment that disappears while you're in the zone.
                 </p>
                 <div className="grid grid-cols-3 gap-4 md:gap-8">
                    <div>
                       <h3 className="text-3xl md:text-4xl font-black text-white">50K+</h3>
                       <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Athletes</p>
                    </div>
                    <div>
                       <h3 className="text-3xl md:text-4xl font-black text-white">12</h3>
                       <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Countries</p>
                    </div>
                    <div>
                       <h3 className="text-3xl md:text-4xl font-black text-white">100%</h3>
                       <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Quality</p>
                    </div>
                 </div>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                className="relative aspect-square rounded-[3rem] overflow-hidden"
              >
                 <img src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800" className="w-full h-full object-cover" alt="About" />
                 <div className="absolute inset-0 bg-blue-600/20 mix-blend-overlay"></div>
              </motion.div>
           </div>
        </section>

        {/* Values Section */}
        <section className="px-4 max-w-7xl mx-auto grid md:grid-cols-3 gap-8 mb-32">
           {[
            { title: 'Innovation', desc: 'Always pushing the limits of textile technology.', icon: <Rocket className="text-blue-500" /> },
            { title: 'Mission', desc: 'To empower every athlete to reach their peak potential.', icon: <Target className="text-cyan-500" /> },
            { title: 'Community', desc: 'Built by athletes, for athletes worldwide.', icon: <Users className="text-purple-500" /> },
           ].map((item) => (
             <motion.div 
               key={item.title} 
               whileHover={{ y: -10 }}
               className="glass p-10 md:p-12 rounded-[2.5rem] text-center border border-white/5"
             >
                <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-8">
                   {item.icon}
                </div>
                <h3 className="text-2xl font-black mb-4 uppercase tracking-tighter">{item.title}</h3>
                <p className="text-slate-400 font-medium leading-relaxed">{item.desc}</p>
             </motion.div>
           ))}
        </section>

        {/* Contact Form Section */}
        <section className="px-4 max-w-7xl mx-auto mb-32">
           <div className="glass rounded-[3rem] p-8 md:p-20 border border-white/10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 blur-[100px] rounded-full"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-600/10 blur-[100px] rounded-full"></div>
              
              <div className="relative z-10 grid lg:grid-cols-2 gap-16">
                 <div>
                    <h2 className="text-4xl md:text-6xl font-black mb-8 leading-none uppercase tracking-tighter">GET IN <span className="text-blue-500 italic">TOUCH</span>.</h2>
                    <p className="text-xl text-slate-400 font-light mb-12">
                      Have questions about our gear or your order? Our team of athletes is here to help you.
                    </p>
                    <div className="space-y-6">
                       <div className="flex items-center gap-4">
                          <div className="w-12 h-12 glass rounded-xl flex items-center justify-center text-blue-500">
                             <Users size={20} />
                          </div>
                          <div>
                             <p className="text-xs font-black text-slate-500 uppercase tracking-widest">Support Team</p>
                             <p className="text-white font-bold">support@alprously.com</p>
                          </div>
                       </div>
                    </div>
                 </div>

                 <form onSubmit={handleContactSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                       <input 
                        type="text" 
                        name="name" 
                        required 
                        placeholder="Full Name" 
                        className="w-full px-6 py-4 bg-slate-950 border border-white/5 rounded-2xl focus:border-blue-500 outline-none transition-all text-white"
                       />
                       <input 
                        type="email" 
                        name="email" 
                        required 
                        placeholder="Email Address" 
                        className="w-full px-6 py-4 bg-slate-950 border border-white/5 rounded-2xl focus:border-blue-500 outline-none transition-all text-white"
                       />
                    </div>
                    <input 
                      type="text" 
                      name="subject" 
                      required 
                      placeholder="Subject" 
                      className="w-full px-6 py-4 bg-slate-950 border border-white/5 rounded-2xl focus:border-blue-500 outline-none transition-all text-white"
                    />
                    <textarea 
                      name="message" 
                      required 
                      placeholder="Your Message" 
                      className="w-full px-6 py-4 bg-slate-950 border border-white/5 rounded-2xl focus:border-blue-500 outline-none transition-all text-white h-40 resize-none"
                    />
                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full py-6 bg-white text-slate-950 font-black rounded-2xl text-xl flex items-center justify-center gap-3 hover:bg-blue-500 hover:text-white transition-all glow-primary disabled:opacity-50"
                    >
                      {isSubmitting ? 'Sending...' : 'Send Message'} <Send size={20} />
                    </button>
                 </form>
              </div>
           </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
