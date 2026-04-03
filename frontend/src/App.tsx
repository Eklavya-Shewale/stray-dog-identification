import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Dog, 
  Upload, 
  Search, 
  ShieldCheck, 
  Heart, 
  MapPin, 
  ArrowRight, 
  CheckCircle2, 
  Info,
  Github,
  Mail,
  Menu,
  X,
  PawPrint,
  Sparkles,
  Camera,
  Database,
  Activity
} from 'lucide-react';

// --- Types ---
type Page = 'landing' | 'tool';

// --- Components ---

const Navbar = ({ currentPage, setPage }: { currentPage: Page, setPage: (p: Page) => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-8 left-0 right-0 z-50 flex justify-center px-6 pointer-events-none">
      <motion.nav 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className={`glass-pill px-2 py-2 rounded-full flex items-center gap-1 pointer-events-auto transition-all duration-500 ${isScrolled ? 'scale-95 shadow-lg' : 'scale-100 shadow-md'} hover:shadow-brand-orange/20 hover:border-brand-orange/30 border border-white/40`}
      >
        <div 
          className="flex items-center gap-2 px-4 py-2 cursor-pointer group"
          onClick={() => setPage('landing')}
        >
          <div className="bg-brand-orange p-1.5 rounded-full group-hover:rotate-12 transition-transform shadow-sm">
            <Dog className="text-white w-4 h-4" />
          </div>
          <span className="text-base font-bold tracking-tight text-brand-brown-dark hidden sm:block">PawTrace AI</span>
        </div>

        <div className="h-6 w-px bg-brand-brown-light/30 mx-1" />

        <div className="flex items-center gap-1">
          <button 
            onClick={() => setPage('landing')} 
            className={`px-5 py-2 rounded-full text-sm font-bold transition-all relative overflow-hidden group ${currentPage === 'landing' ? 'text-white' : 'text-brand-brown-dark hover:text-brand-orange'}`}
          >
            {currentPage === 'landing' && (
              <motion.div layoutId="nav-bg" className="absolute inset-0 bg-brand-orange rounded-full -z-10" />
            )}
            Home
          </button>
          <button 
            onClick={() => setPage('tool')} 
            className={`px-5 py-2 rounded-full text-sm font-bold transition-all relative overflow-hidden group ${currentPage === 'tool' ? 'text-white' : 'text-brand-brown-dark hover:text-brand-orange'}`}
          >
            {currentPage === 'tool' && (
              <motion.div layoutId="nav-bg" className="absolute inset-0 bg-brand-orange rounded-full -z-10" />
            )}
            Try AI Identifier
          </button>
        </div>
      </motion.nav>
    </div>
  );
};

const Footer = ({ setPage }: { setPage: (p: Page) => void }) => (
  <footer className="bg-brand-brown-dark text-brand-cream pt-32 pb-12 relative overflow-hidden paw-bg">
    {/* Organic Top Divider */}
    <div className="absolute top-0 left-0 w-full h-24 bg-brand-cream -translate-y-1/2 scale-x-110 rounded-[0_0_50%_50%/0_0_100%_100%]" />
    
    <div className="max-w-7xl mx-auto px-6 relative z-10">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
        <div className="col-span-1 md:col-span-1">
          <div className="flex items-center gap-3 mb-8 group cursor-pointer" onClick={() => setPage('landing')}>
            <div className="bg-brand-orange p-2 rounded-xl group-hover:rotate-12 transition-transform">
              <Dog className="text-white w-6 h-6" />
            </div>
            <span className="text-2xl font-bold tracking-tight">PawTrace AI</span>
          </div>
          <p className="text-brand-brown-light leading-relaxed mb-8">
            Recognizing every stray, protecting every life. Our AI-powered system is built for safer, more compassionate communities.
          </p>
          <div className="flex gap-4">
            <a href="#" className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center hover:bg-brand-orange hover:text-white transition-all group">
              <Github size={20} className="group-hover:scale-110 transition-transform" />
            </a>
            <a href="#" className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center hover:bg-brand-orange hover:text-white transition-all group">
              <Mail size={20} className="group-hover:scale-110 transition-transform" />
            </a>
          </div>
        </div>
        
        <div>
          <h4 className="text-lg font-bold mb-8 text-white">Quick Links</h4>
          <ul className="space-y-4 text-brand-brown-light">
            <li><button onClick={() => setPage('landing')} className="hover:text-brand-orange transition-colors flex items-center gap-2 group"><ArrowRight size={14} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" /> Home</button></li>
            <li><button onClick={() => setPage('tool')} className="hover:text-brand-orange transition-colors flex items-center gap-2 group"><ArrowRight size={14} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" /> AI Tool</button></li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-bold mb-8 text-white">Community</h4>
          <ul className="space-y-4 text-brand-brown-light">
            <li><a href="#" className="hover:text-brand-orange transition-colors flex items-center gap-2 group"><ArrowRight size={14} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" /> NGO Partners</a></li>
            <li><a href="#" className="hover:text-brand-orange transition-colors flex items-center gap-2 group"><ArrowRight size={14} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" /> Rescue Teams</a></li>
            <li><a href="#" className="hover:text-brand-orange transition-colors flex items-center gap-2 group"><ArrowRight size={14} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" /> Volunteer</a></li>
          </ul>
        </div>

        <div className="bg-white/5 p-8 rounded-[2rem] border border-white/10">
          <h4 className="text-lg font-bold mb-4 text-white">Stay Updated</h4>
          <p className="text-sm text-brand-brown-light mb-6">Join our newsletter for the latest in animal welfare tech.</p>
          <div className="flex gap-2">
            <input type="email" placeholder="Email" className="bg-white/10 border-none rounded-xl px-4 py-2 text-sm w-full focus:ring-2 focus:ring-brand-orange outline-none" />
            <button className="bg-brand-orange text-white p-2 rounded-xl hover:scale-105 transition-transform"><ArrowRight size={20} /></button>
          </div>
        </div>
      </div>
      
      <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-brand-brown-light">
        <p>© 2026 PawTrace AI Identification System. All rights reserved.</p>
        <div className="flex gap-8">
          <a href="#" className="hover:text-brand-orange transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-brand-orange transition-colors">Terms of Service</a>
        </div>
      </div>
    </div>

    {/* Floating Paw Decorations */}
    <motion.div 
      animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
      transition={{ duration: 8, repeat: Infinity }}
      className="absolute bottom-10 right-10 opacity-5 pointer-events-none"
    >
      <PawPrint size={120} />
    </motion.div>
    <motion.div 
      animate={{ y: [0, 20, 0], rotate: [0, -10, 0] }}
      transition={{ duration: 10, repeat: Infinity, delay: 1 }}
      className="absolute top-20 left-10 opacity-5 pointer-events-none"
    >
      <PawPrint size={80} />
    </motion.div>
  </footer>
);

// --- Page: Landing ---

const LandingPage = ({ onStart }: { onStart: () => void }) => {
  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-brand-orange/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-brand-green/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full paw-bg opacity-40" />
        </div>

        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-brand-orange/10 text-brand-orange px-5 py-2.5 rounded-full font-bold text-sm mb-8 border border-brand-orange/20 shadow-sm"
            >
              <Sparkles size={16} className="animate-pulse" />
              <span>AI-Powered Community Protection</span>
            </motion.div>
            <h1 className="text-6xl md:text-8xl font-bold text-brand-brown-dark leading-[1.05] mb-8 tracking-tight">
              Recognizing Every <span className="text-brand-orange relative">
                Stray
                <svg className="absolute -bottom-2 left-0 w-full h-3 text-brand-orange/30" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0 5 Q 25 0, 50 5 T 100 5" fill="none" stroke="currentColor" strokeWidth="4" />
                </svg>
              </span>, <br />
              <span className="text-brand-green-dark">Protecting</span> Every Life
            </h1>
            <p className="text-xl text-brand-brown leading-relaxed mb-12 max-w-lg font-medium">
              A compassionate AI system designed to identify stray dogs, track their history, and build safer, more connected neighborhoods for everyone.
            </p>
            <div className="flex flex-wrap gap-6">
              <button 
                onClick={onStart}
                className="bg-brand-brown-dark text-white px-10 py-5 rounded-[2rem] font-bold text-lg hover:bg-brand-brown transition-all shadow-2xl shadow-brand-brown/30 flex items-center gap-3 group relative overflow-hidden"
              >
                <span className="relative z-10">Try AI Identifier</span>
                <ArrowRight className="group-hover:translate-x-2 transition-transform relative z-10" />
                <div className="absolute inset-0 bg-gradient-to-r from-brand-orange to-brand-orange/80 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
              <button className="bg-white text-brand-brown-dark px-10 py-5 rounded-[2rem] font-bold text-lg hover:bg-brand-cream transition-all border-2 border-brand-brown-light/50 flex items-center gap-2">
                Our Mission
              </button>
            </div>

            <div className="mt-12 flex items-center gap-6">
              <div className="flex -space-x-4">
                {[1, 2, 3, 4].map(i => (
                  <img 
                    key={i}
                    src={`https://picsum.photos/seed/dog${i}/100/100`} 
                    className="w-12 h-12 rounded-full border-4 border-white shadow-sm object-cover"
                    alt="User"
                    referrerPolicy="no-referrer"
                  />
                ))}
              </div>
              <p className="text-sm font-bold text-brand-brown">
                <span className="text-brand-orange">500+</span> NGOs already joined
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative"
          >
            <div className="relative z-10 rounded-[4rem] overflow-hidden shadow-[0_40px_100px_rgba(75,56,50,0.15)] border-[12px] border-white animate-float-slow">
              <img 
                src="https://images.unsplash.com/photo-1534361960057-19889db9621e?auto=format&fit=crop&q=80&w=1000" 
                alt="Happy stray dog" 
                className="w-full h-[600px] object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-brown-dark/60 via-transparent to-transparent" />
              
              <div className="absolute bottom-8 left-8 right-8 text-white">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-2 h-2 bg-brand-green rounded-full animate-ping" />
                  <span className="text-sm font-bold uppercase tracking-widest opacity-80">Live Recognition</span>
                </div>
                <h3 className="text-2xl font-bold">Identifying: Golden Retriever Mix</h3>
              </div>
            </div>
            
            {/* Floating UI Elements */}
            <motion.div 
              animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-10 -right-10 glass-pill p-5 rounded-3xl flex items-center gap-4 z-20 shadow-xl border border-white/50"
            >
              <div className="bg-brand-green p-3 rounded-2xl text-white shadow-lg shadow-brand-green/30">
                <ShieldCheck size={24} />
              </div>
              <div>
                <p className="text-xs font-bold text-brand-brown opacity-60 uppercase tracking-wider">Safety Status</p>
                <p className="text-base font-bold text-brand-green-dark">Verified Secure</p>
              </div>
            </motion.div>

            <motion.div 
              animate={{ y: [0, 20, 0], x: [0, -10, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute -bottom-10 -left-10 glass-pill p-5 rounded-3xl flex items-center gap-4 z-20 shadow-xl border border-white/50"
            >
              <div className="bg-brand-orange p-3 rounded-2xl text-white shadow-lg shadow-brand-orange/30">
                <Heart size={24} />
              </div>
              <div>
                <p className="text-xs font-bold text-brand-brown opacity-60 uppercase tracking-wider">Community Care</p>
                <p className="text-base font-bold text-brand-orange">1.2k+ Dogs Helped</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-32 bg-white relative">
        <div className="absolute top-0 left-0 w-full h-32 bg-brand-cream -translate-y-full rounded-[100%_100%_0_0/100%_100%_0_0]" />
        
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl font-bold text-brand-brown-dark mb-8 tracking-tight">The Need of the Day</h2>
              <p className="text-xl text-brand-brown leading-relaxed">Stray dog management faces critical challenges that require modern, data-driven solutions for both human safety and animal welfare.</p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {[
              { icon: Activity, title: "Rising Incidents", desc: "Increasing stray dog incidents in urban areas require immediate tracking and intervention.", delay: 0 },
              { icon: Search, title: "Identification Gap", desc: "Difficulty in identifying repeat offenders or specific dogs across different city zones.", delay: 0.1 },
              { icon: Database, title: "No Central Hub", desc: "Lack of centralized tracking for municipalities, NGOs, and local rescue teams.", delay: 0.2 },
              { icon: ShieldCheck, title: "Safety Risks", desc: "Public safety challenges without a reliable recognition system to monitor behavior.", delay: 0.3 }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: item.delay }}
                whileHover={{ y: -15, rotate: 1 }}
                className="p-10 rounded-[3rem] bg-brand-cream border border-brand-brown-light/20 hover:shadow-[0_30px_60px_rgba(75,56,50,0.1)] transition-all group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-orange/5 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-150" />
                <div className="bg-white w-16 h-16 rounded-[1.5rem] flex items-center justify-center text-brand-orange mb-8 shadow-sm group-hover:bg-brand-orange group-hover:text-white transition-all duration-500 group-hover:rotate-12">
                  <item.icon size={32} />
                </div>
                <h3 className="text-2xl font-bold text-brand-brown-dark mb-4">{item.title}</h3>
                <p className="text-brand-brown leading-relaxed font-medium">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-32 bg-brand-cream relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-32 bg-white -translate-y-full rounded-[0_0_100%_100%/0_0_100%_100%]" />
        
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl font-bold text-brand-brown-dark mb-6 tracking-tight">How It Works</h2>
              <p className="text-xl text-brand-brown max-w-2xl mx-auto">A seamless 4-step process designed to identify, record, and protect our furry friends.</p>
            </motion.div>
          </div>

          <div className="relative">
            {/* Connector Line (Desktop) */}
            <div className="hidden lg:block absolute top-1/2 left-10 right-10 h-1 bg-brand-brown-light/20 -translate-y-1/2 z-0 rounded-full" />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 relative z-10">
              {[
                { step: "01", title: "Upload Image", desc: "Capture or upload a clear photo of the dog in its environment.", icon: Camera },
                { step: "02", title: "AI Extraction", desc: "Our neural network extracts unique facial and coat patterns.", icon: Sparkles },
                { step: "03", title: "Database Match", desc: "We compare features against our global registry in real-time.", icon: Database },
                { step: "04", title: "Result Ready", desc: "Get instant identity, history, and health information.", icon: CheckCircle2 }
              ].map((item, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="text-center group"
                >
                  <div className="w-24 h-24 bg-white rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-xl border-4 border-brand-cream relative group-hover:rotate-6 transition-transform duration-500">
                    <item.icon className="text-brand-orange" size={40} />
                    <div className="absolute -top-3 -right-3 bg-brand-brown-dark text-white w-10 h-10 rounded-2xl flex items-center justify-center text-sm font-bold shadow-lg">
                      {item.step}
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-brand-brown-dark mb-4">{item.title}</h3>
                  <p className="text-brand-brown font-medium leading-relaxed px-4">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Emotional Storytelling */}
      <section className="py-32 bg-white relative">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-brand-brown-dark rounded-[4rem] p-10 md:p-20 flex flex-col lg:flex-row items-center gap-20 overflow-hidden relative shadow-[0_50px_100px_rgba(75,56,50,0.2)]"
          >
            {/* Decorative Paw Prints */}
            <div className="absolute top-10 right-10 opacity-5 rotate-12">
              <PawPrint size={200} className="text-white" />
            </div>
            <div className="absolute bottom-10 left-10 opacity-5 -rotate-12">
              <PawPrint size={150} className="text-white" />
            </div>

            <div className="w-full lg:w-1/2 relative group">
              <div className="absolute -inset-4 bg-brand-orange/20 rounded-[3rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <img 
                src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&q=80&w=1000" 
                alt="Community and dog" 
                className="rounded-[3rem] shadow-2xl w-full h-[500px] object-cover relative z-10"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="w-full lg:w-1/2 text-white relative z-10">
              <h2 className="text-5xl font-bold mb-10 leading-tight">Why This Project <br /><span className="text-brand-orange">Matters</span></h2>
              <div className="space-y-10">
                {[
                  { title: "Community Safety", desc: "Reducing fear and incidents through better tracking and understanding of local strays." },
                  { title: "Humane Handling", desc: "Enabling rescue teams to identify dogs in need without repeated stressful captures." },
                  { title: "Smart City Infrastructure", desc: "Integrating animal welfare into the digital fabric of modern urban living." }
                ].map((item, i) => (
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.2 }}
                    className="flex gap-8"
                  >
                    <div className="w-14 h-14 bg-white/10 rounded-2xl flex-shrink-0 flex items-center justify-center border border-white/10 group hover:bg-brand-orange transition-colors">
                      <CheckCircle2 className="text-brand-orange group-hover:text-white transition-colors" size={28} />
                    </div>
                    <div>
                      <h4 className="text-2xl font-bold mb-3">{item.title}</h4>
                      <p className="text-brand-brown-light text-lg leading-relaxed">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Feature Highlights */}
      <section className="py-32 bg-brand-cream relative">
        <div className="absolute top-0 left-0 w-full h-32 bg-white -translate-y-full rounded-[0_0_100%_100%/0_0_100%_100%]" />
        
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl font-bold text-brand-brown-dark mb-6 tracking-tight">Core Features</h2>
              <p className="text-xl text-brand-brown max-w-2xl mx-auto">Built with cutting-edge technology to solve real-world animal welfare challenges.</p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { title: "AI Recognition", desc: "Advanced neural networks trained specifically on diverse dog breeds and unique coat features.", color: "bg-orange-500", icon: Sparkles },
              { title: "Cloud Storage", desc: "Securely store and retrieve dog profiles from anywhere, enabling cross-city collaboration.", color: "bg-blue-500", icon: Database },
              { title: "Real-time Matching", desc: "Compare uploads against thousands of records in milliseconds for instant identification.", color: "bg-green-500", icon: Activity },
              { title: "Fast Results", desc: "Optimized processing pipeline ensures field workers get answers when they need them most.", color: "bg-purple-500", icon: CheckCircle2 },
              { title: "Scalable Design", desc: "Built to handle city-wide deployments and millions of records without performance loss.", color: "bg-red-500", icon: ShieldCheck },
              { title: "Mobile Ready", desc: "Fully responsive interface designed for field workers, citizens, and rescue organizations.", color: "bg-teal-500", icon: Camera }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -10 }}
                className="p-10 rounded-[3rem] bg-white shadow-sm hover:shadow-2xl transition-all border border-brand-brown-light/20 relative overflow-hidden group"
              >
                <div className={`absolute top-0 left-0 w-2 h-full ${item.color}`} />
                <div className="w-14 h-14 bg-brand-cream rounded-2xl flex items-center justify-center text-brand-brown mb-8 group-hover:bg-brand-orange group-hover:text-white transition-colors">
                  <item.icon size={28} />
                </div>
                <h3 className="text-2xl font-bold text-brand-brown-dark mb-4">{item.title}</h3>
                <p className="text-brand-brown leading-relaxed font-medium">{item.desc}</p>
                <div className="mt-8 flex justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-10 h-10 bg-brand-cream rounded-full flex items-center justify-center text-brand-brown hover:bg-brand-orange hover:text-white transition-colors cursor-pointer">
                    <ArrowRight size={20} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Animated Divider */}
      <div className="py-12 bg-white overflow-hidden whitespace-nowrap border-y border-brand-brown-light/20 relative">
        <motion.div 
          animate={{ x: [0, -1000] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="flex gap-24 items-center"
        >
          {[...Array(15)].map((_, i) => (
            <div key={i} className="flex items-center gap-6 text-brand-brown-light/40">
              <PawPrint size={32} />
              <span className="text-2xl font-black uppercase tracking-[0.2em]">PAWTRACE AI SYSTEM</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* CTA Section */}
      <section className="py-32 bg-white relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-brand-orange/5 rounded-full blur-3xl -z-10" />
        
        <div className="max-w-5xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-brand-brown-dark rounded-[4rem] p-12 md:p-24 border-8 border-brand-cream shadow-2xl relative overflow-hidden"
          >
            <div className="absolute inset-0 paw-bg opacity-5" />
            
            <div className="relative z-10">
              <h2 className="text-5xl md:text-7xl font-bold text-white mb-8 tracking-tight">Be Part of Smarter <br /><span className="text-brand-orange">Animal Care</span></h2>
              <p className="text-xl text-brand-brown-light mb-12 max-w-2xl mx-auto leading-relaxed">Join our community-driven effort to make our cities safer and more compassionate for every living being.</p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <button 
                  onClick={onStart}
                  className="bg-brand-orange text-white px-12 py-6 rounded-[2rem] font-bold text-xl hover:bg-brand-orange/90 transition-all shadow-2xl shadow-brand-orange/30 flex items-center justify-center gap-3 group"
                >
                  Open AI Tool
                  <ArrowRight className="group-hover:translate-x-2 transition-transform" />
                </button>
                <button className="bg-white/10 text-white px-12 py-6 rounded-[2rem] font-bold text-xl hover:bg-white/20 transition-all border border-white/20 backdrop-blur-sm">
                  Partner With Us
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

// --- Page: AI Service Page ---

const AIServicePage = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [dogName, setDogName] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const simulateIdentify = async () => {
    if (!selectedImage) return;
    setIsUploading(true);
    setResult(null);

    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 2500));

    setResult({
      name: "Buddy",
      breed: "Golden Retriever Mix",
      confidence: 94.8,
      status: "Match Found",
      lastSeen: "Downtown Central Park",
      health: "Healthy / Active",
      history: "Previously spotted near 5th Ave rescue center.",
      image: selectedImage
    });
    setIsUploading(false);
  };

  const simulateRegister = async () => {
    if (!selectedImage || !dogName) return;
    setIsUploading(true);
    
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsUploading(false);
    setDogName('');
    setSelectedImage(null);
    // In a real app, we'd show a nice success toast here
  };

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 bg-brand-cream relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 -z-10 opacity-30">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#FF8C42_0.5px,transparent_0.5px)] [background-size:32px_32px]" />
      </div>
      <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-brand-orange/5 rounded-full blur-3xl" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-brand-green/5 rounded-full blur-3xl" />

      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold text-brand-brown-dark mb-6 tracking-tight">
              AI Dog <span className="text-brand-orange">Identifier</span>
            </h1>
            <p className="text-xl text-brand-brown max-w-2xl mx-auto font-medium">
              Upload a photo to instantly identify a stray dog's history or register a new one to our community database.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Upload Card */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-5 glass-card rounded-[3rem] p-10 shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-orange/5 rounded-full -mr-16 -mt-16" />
            
            <div 
              onClick={() => fileInputRef.current?.click()}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`border-4 border-dashed rounded-[2.5rem] p-12 text-center cursor-pointer transition-all duration-500 relative group overflow-hidden ${
                selectedImage 
                  ? 'border-brand-green bg-brand-green/5' 
                  : isDragging 
                    ? 'border-brand-orange bg-brand-orange/10 scale-105' 
                    : 'border-brand-brown-light/50 hover:border-brand-orange hover:bg-brand-orange/5'
              }`}
            >
              <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                accept="image/*" 
                onChange={handleFileChange}
              />
              
              {selectedImage ? (
                <div className="relative group">
                  <motion.img 
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    src={selectedImage} 
                    alt="Selected" 
                    className="w-full h-64 object-cover rounded-[2rem] shadow-lg border-4 border-white" 
                  />
                  <div className="absolute inset-0 bg-brand-brown-dark/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-[2rem] backdrop-blur-sm">
                    <div className="bg-white text-brand-brown-dark px-6 py-3 rounded-full font-bold shadow-lg flex items-center gap-2">
                      <Camera size={18} />
                      Change Photo
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center py-10">
                  <motion.div 
                    animate={isDragging ? { scale: 1.2, rotate: 10 } : { scale: 1, rotate: 0 }}
                    className="w-24 h-24 bg-brand-orange/10 rounded-[2rem] flex items-center justify-center text-brand-orange mb-8 shadow-inner"
                  >
                    <Upload size={48} />
                  </motion.div>
                  <p className="text-2xl font-bold text-brand-brown-dark mb-3">Drop your photo here</p>
                  <p className="text-brand-brown font-medium">Or click to browse your files</p>
                  <div className="mt-8 flex gap-3">
                    <span className="px-3 py-1 bg-brand-brown-light/20 rounded-lg text-xs font-bold text-brand-brown">JPG</span>
                    <span className="px-3 py-1 bg-brand-brown-light/20 rounded-lg text-xs font-bold text-brand-brown">PNG</span>
                    <span className="px-3 py-1 bg-brand-brown-light/20 rounded-lg text-xs font-bold text-brand-brown">WEBP</span>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-10 space-y-6">
              <div className="relative group">
                <div className="absolute left-5 top-1/2 -translate-y-1/2 text-brand-brown-light group-focus-within:text-brand-orange transition-colors">
                  <Dog size={20} />
                </div>
                <input 
                  type="text" 
                  placeholder="Dog Name (optional for identification)" 
                  value={dogName}
                  onChange={(e) => setDogName(e.target.value)}
                  className="w-full bg-white/50 border-2 border-brand-brown-light/30 rounded-2xl pl-14 pr-6 py-5 focus:outline-none focus:border-brand-orange/50 focus:ring-4 focus:ring-brand-orange/5 transition-all font-bold text-brand-brown-dark placeholder:text-brand-brown-light/60"
                />
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button 
                  onClick={simulateIdentify}
                  disabled={!selectedImage || isUploading}
                  className="bg-brand-brown-dark text-white py-5 rounded-2xl font-bold text-lg hover:bg-brand-brown transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 shadow-xl shadow-brand-brown/20 group"
                >
                  {isUploading ? (
                    <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <Search size={22} className="group-hover:scale-110 transition-transform" />
                      Identify Dog
                    </>
                  )}
                </button>
                <button 
                  onClick={simulateRegister}
                  disabled={!selectedImage || !dogName || isUploading}
                  className="bg-brand-orange text-white py-5 rounded-2xl font-bold text-lg hover:bg-brand-orange/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 shadow-xl shadow-brand-orange/20 group"
                >
                  {isUploading ? (
                    <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <CheckCircle2 size={22} className="group-hover:scale-110 transition-transform" />
                      Register New
                    </>
                  )}
                </button>
              </div>
            </div>
          </motion.div>

          {/* Result Card */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-7"
          >
            <AnimatePresence mode="wait">
              {result ? (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.95 }}
                  className="glass-card rounded-[3rem] p-10 shadow-2xl border-2 border-brand-green/30 relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-40 h-40 bg-brand-green/5 rounded-full -mr-20 -mt-20" />
                  
                  <div className="flex items-center justify-between mb-10 relative z-10">
                    <div className="flex items-center gap-3">
                      <div className="bg-brand-green/20 p-2 rounded-xl text-brand-green-dark">
                        <ShieldCheck size={24} />
                      </div>
                      <h3 className="text-3xl font-bold text-brand-brown-dark">Match Found!</h3>
                    </div>
                    <div className="bg-brand-green text-white px-4 py-1.5 rounded-full text-sm font-black tracking-widest uppercase shadow-lg shadow-brand-green/20">
                      94.8% Match
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row gap-10 mb-10 relative z-10">
                    <div className="relative group">
                      <div className="absolute -inset-2 bg-brand-orange/20 rounded-[2.5rem] blur-xl opacity-50" />
                      <img src={result.image} alt="Result" className="w-full md:w-48 h-48 object-cover rounded-[2rem] shadow-xl border-4 border-white relative z-10" />
                    </div>
                    <div className="flex flex-col justify-center flex-grow">
                      <p className="text-sm text-brand-brown font-bold uppercase tracking-widest mb-1 opacity-60">Identified Profile</p>
                      <h4 className="text-5xl font-black text-brand-brown-dark mb-2">{result.name}</h4>
                      <p className="text-xl font-bold text-brand-orange mb-6">{result.breed}</p>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm font-bold text-brand-brown mb-1">
                          <span>Confidence Level</span>
                          <span>{result.confidence}%</span>
                        </div>
                        <div className="w-full bg-brand-brown-light/20 h-3 rounded-full overflow-hidden shadow-inner">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${result.confidence}%` }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="h-full bg-gradient-to-r from-brand-orange to-brand-orange-light"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10 relative z-10">
                    <div className="bg-white/60 p-6 rounded-[2rem] border border-white/50 shadow-sm">
                      <div className="flex items-center gap-3 mb-3">
                        <MapPin className="text-brand-orange" size={20} />
                        <p className="text-sm text-brand-brown font-bold uppercase tracking-wider">Last Seen</p>
                      </div>
                      <p className="text-lg font-bold text-brand-brown-dark">{result.lastSeen}</p>
                    </div>
                    <div className="bg-white/60 p-6 rounded-[2rem] border border-white/50 shadow-sm">
                      <div className="flex items-center gap-3 mb-3">
                        <Activity className="text-brand-green-dark" size={20} />
                        <p className="text-sm text-brand-brown font-bold uppercase tracking-wider">Health Status</p>
                      </div>
                      <p className="text-lg font-bold text-brand-green-dark">{result.health}</p>
                    </div>
                    <div className="md:col-span-2 bg-white/60 p-6 rounded-[2rem] border border-white/50 shadow-sm">
                      <div className="flex items-center gap-3 mb-3">
                        <Info className="text-brand-brown" size={20} />
                        <p className="text-sm text-brand-brown font-bold uppercase tracking-wider">Recent History</p>
                      </div>
                      <p className="text-brand-brown font-medium leading-relaxed">{result.history}</p>
                    </div>
                  </div>

                  <div className="flex gap-4 relative z-10">
                    <button 
                      onClick={() => setResult(null)}
                      className="flex-grow py-5 rounded-2xl border-2 border-brand-brown-light/30 font-bold text-brand-brown hover:bg-white/50 transition-all flex items-center justify-center gap-2"
                    >
                      <X size={20} />
                      Clear Result
                    </button>
                    <button className="bg-brand-brown-dark text-white px-8 rounded-2xl font-bold hover:bg-brand-brown transition-all shadow-lg">
                      Full Report
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="glass-card rounded-[3rem] p-16 text-center border-4 border-dashed border-brand-brown-light/20 flex flex-col items-center justify-center min-h-[600px] relative overflow-hidden"
                >
                  <div className="absolute inset-0 paw-bg opacity-5" />
                  
                  {isUploading ? (
                    <div className="flex flex-col items-center relative z-10">
                      <div className="relative w-32 h-32 mb-10">
                        <motion.div 
                          animate={{ rotate: 360 }}
                          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                          className="absolute inset-0 border-4 border-brand-orange/10 border-t-brand-orange rounded-full"
                        />
                        <motion.div 
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="absolute inset-0 flex items-center justify-center"
                        >
                          <Dog className="text-brand-orange" size={48} />
                        </motion.div>
                      </div>
                      <h3 className="text-3xl font-bold text-brand-brown-dark mb-4">Analyzing Features...</h3>
                      <p className="text-lg text-brand-brown font-medium max-w-xs">Our AI is scanning unique facial patterns and coat textures to find a match.</p>
                      
                      <div className="mt-10 w-48 h-2 bg-brand-brown-light/20 rounded-full overflow-hidden">
                        <motion.div 
                          animate={{ x: [-200, 200] }}
                          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                          className="w-1/2 h-full bg-brand-orange rounded-full"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center relative z-10">
                      <div className="w-24 h-24 bg-brand-brown-light/10 rounded-[2rem] flex items-center justify-center text-brand-brown-light mb-8 group-hover:rotate-12 transition-transform">
                        <Info size={48} />
                      </div>
                      <h3 className="text-3xl font-bold text-brand-brown-dark mb-4">Ready for Scan</h3>
                      <p className="text-lg text-brand-brown font-medium max-w-sm">Upload an image of a stray dog and click 'Identify' to see its history and status here.</p>
                      
                      <div className="mt-12 grid grid-cols-2 gap-4 w-full max-w-md">
                        <div className="p-4 bg-white/40 rounded-2xl border border-white/50">
                          <p className="text-2xl font-bold text-brand-orange mb-1">98%</p>
                          <p className="text-xs font-bold text-brand-brown uppercase tracking-wider">Accuracy</p>
                        </div>
                        <div className="p-4 bg-white/40 rounded-2xl border border-white/50">
                          <p className="text-2xl font-bold text-brand-green-dark mb-1">&lt; 2s</p>
                          <p className="text-xs font-bold text-brand-brown uppercase tracking-wider">Response</p>
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Feature Highlights for Tool */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: ShieldCheck, title: "Secure Data", desc: "All uploads are encrypted and stored safely in our private cloud.", color: "text-blue-500" },
            { icon: Activity, title: "Live Tracking", desc: "Real-time updates shared instantly with local rescue organizations.", color: "text-brand-green-dark" },
            { icon: MapPin, title: "Location Tagging", desc: "Automatically tag sightings for better heat-mapping of stray populations.", color: "text-brand-orange" }
          ].map((item, i) => (
            <motion.div 
              key={i} 
              whileHover={{ y: -5 }}
              className="flex items-start gap-6 p-8 glass-card rounded-[2.5rem] border border-white/50 shadow-lg"
            >
              <div className={`bg-white p-4 rounded-2xl shadow-sm ${item.color}`}>
                <item.icon size={28} />
              </div>
              <div>
                <h4 className="text-xl font-bold text-brand-brown-dark mb-2">{item.title}</h4>
                <p className="text-brand-brown font-medium leading-relaxed">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [page, setPage] = useState<Page>('landing');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar currentPage={page} setPage={setPage} />
      
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          {page === 'landing' ? (
            <motion.div
              key="landing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <LandingPage onStart={() => setPage('tool')} />
            </motion.div>
          ) : (
            <motion.div
              key="tool"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <AIServicePage />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer setPage={setPage} />
    </div>
  );
}
