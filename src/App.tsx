import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Wine, MapPin, Phone, Instagram, ChevronDown, Menu as MenuIcon, X, Copy, Check } from 'lucide-react';
import { MENU, EVENTS } from './constants';

const CopyButton = ({ text, children }: { text: string; children: React.ReactNode }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Falha ao copiar: ', err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="flex items-center gap-2 group cursor-pointer text-left focus:outline-none"
      aria-label={`Copiar ${text}`}
    >
      {children}
      <span className="opacity-0 group-hover:opacity-100 transition-opacity">
        {copied ? <Check size={14} className="text-green-500" /> : <Copy size={12} className="text-gold/40" />}
      </span>
    </button>
  );
};

const LegalModal = ({ type, isOpen, onClose }: { type: 'privacy' | 'terms'; isOpen: boolean; onClose: () => void }) => {
  const content = {
    privacy: {
      title: "Política de Privacidade",
      text: "No Petisco & Vinho, a sua privacidade é fundamental. Esta política descreve como recolhemos e utilizamos as suas informações quando utiliza o nosso website. Respeitamos o RGPD e garantimos que os seus dados nunca serão partilhados com terceiros para fins comerciais. Recolhemos apenas dados de navegação anónimos para melhorar a sua experiência e dados de contacto caso opte por nos contactar diretamente."
    },
    terms: {
      title: "Termos de Serviço",
      text: "Ao aceder ao website do Petisco & Vinho, concorda em cumprir estes termos de serviço. O conteúdo deste site é para fins informativos. Reservamo-nos o direito de alterar o menu e os preços sem aviso prévio. O consumo excessivo de álcool é prejudicial à saúde – beba com moderação."
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-stone-950/90 backdrop-blur-md"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative glass max-w-2xl w-full p-12 rounded-[2rem] border border-white/10 overflow-hidden"
          >
            <button onClick={onClose} className="absolute top-8 right-8 text-white/40 hover:text-white transition-colors">
              <X size={24} />
            </button>
            <h2 className="serif text-4xl mb-8 italic text-gold">{content[type].title}</h2>
            <div className="sans text-white/60 leading-loose font-light space-y-4">
               {content[type].text.split('\n').map((p, i) => <p key={i}>{p}</p>)}
            </div>
            <div className="mt-12">
              <button onClick={onClose} className="sans text-[10px] uppercase tracking-widest border border-gold/20 px-8 py-3 rounded-full hover:bg-gold hover:text-black transition-all">
                Fechar
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'A Nossa História', href: '#concept' },
    { name: 'Menu', href: '#menu' },
    { name: 'Eventos', href: '#events' },
    { name: 'Contactos', href: '#footer' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-700 ${isScrolled ? 'bg-stone-950/80 py-6 backdrop-blur-xl border-b border-white/5' : 'bg-transparent py-10'}`}>
      <div className="max-w-7xl mx-auto px-8 md:px-16 flex justify-between items-center">
        <div className="flex flex-col">
          <a href="#" className="serif text-3xl italic tracking-widest text-white hover:text-gold transition-colors uppercase">
            Petisco <span className="text-gold font-normal">&</span> Vinho
          </a>
          <p className="sans text-[9px] tracking-[0.4em] opacity-40 uppercase ml-0.5">Príncipe Real • Lisboa</p>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-10">
          <div id="google_translate_element" className="google-translate-wrapper"></div>
          <div className="flex gap-10">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} className="sans text-[11px] uppercase tracking-[0.2em] text-white/60 hover:text-white transition-all hover:border-b hover:border-gold pb-1">
                {link.name}
              </a>
            ))}
          </div>
        </div>

        {/* Mobile Toggle */}
        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-white/70" aria-label="Alternar menu">
          {isMenuOpen ? <X size={20} /> : <MenuIcon size={20} />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full glass py-12 flex flex-col items-center gap-6 md:hidden"
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="sans text-sm uppercase tracking-[0.3em] text-white/50 hover:text-white"
              >
                {link.name}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => (
  <section className="relative h-screen flex items-start pt-24 md:pt-32 px-8 md:px-16 overflow-hidden">
    <div className="absolute inset-0 z-0 overflow-hidden">
      <img
        src="https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=2070"
        alt="Ambiente do Bar de Vinhos"
        className="w-full h-full object-cover scale-110 opacity-40"
        referrerPolicy="no-referrer"
      />
      <div className="absolute inset-0 bg-[#0a0505]/40" />
      <div className="absolute inset-0 wine-gradient opacity-60" />
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#4a0e0e] rounded-full filter blur-[120px] opacity-20"></div>
    </div>

    <div className="relative z-10 max-w-4xl">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.2 }}
        className="space-y-6"
      >
        <h1 className="serif text-6xl md:text-8xl lg:text-9xl text-white leading-[0.9] tracking-tight">
          A Alma da <br/><span className="italic block font-light">Noite</span> Lisboeta.
        </h1>
        <p className="sans text-sm md:text-base font-light leading-relaxed opacity-60 max-w-xl">
          Um santuário íntimo no coração de Lisboa. Vinhos raros selecionados harmonizados com interpretações modernas de petiscos clássicos.
        </p>
        <div className="pt-10 flex flex-wrap gap-8 items-center">
          <a
            href="#menu"
            className="sans border border-gold px-12 py-5 text-[11px] tracking-[0.3em] uppercase bg-gold/5 hover:bg-gold hover:text-black transition-all duration-500"
          >
            Descobrir o Menu
          </a>
          <div className="hidden md:block glass p-5 rounded-2xl glow-red">
             <p className="sans text-[10px] uppercase tracking-widest text-gold mb-1">Destaque</p>
             <h3 className="serif text-lg italic">Fado & Syrah Sessions</h3>
          </div>
        </div>
      </motion.div>
    </div>

    <motion.div
      animate={{ y: [0, 8, 0] }}
      transition={{ repeat: Infinity, duration: 3 }}
      className="absolute bottom-12 left-1/2 -translate-x-1/2 text-gold/30"
    >
      <ChevronDown size={24} />
    </motion.div>
  </section>
);

const Concept = () => (
  <section id="concept" className="bg-[#0a0505] py-32 md:py-48 px-8 md:px-16 relative">
    <div className="absolute left-1/4 top-1/4 w-[300px] h-[300px] bg-[#4a0e0e] rounded-full filter blur-[120px] opacity-10"></div>
    <div className="max-w-6xl mx-auto grid md:grid-cols-2 items-center gap-24 relative z-10">
      <div className="space-y-10">
        <div className="space-y-4">
          <p className="sans text-[10px] uppercase tracking-[0.5em] text-gold opacity-60">A Nossa História</p>
          <h2 className="serif text-5xl md:text-6xl text-white leading-[1.1]">Nascido nas vielas de <br/><span className="italic">Príncipe Real</span></h2>
        </div>
        <div className="space-y-6">
          <p className="sans text-white/50 leading-loose text-lg font-light">
            O "Petisco & Vinho" é uma celebração da noite lisboeta. Num espaço onde as paredes de pedra contam histórias, oferecemos uma curadoria dos melhores vinhos nacionais acompanhada por reinterpretações de petiscos tradicionais.
          </p>
          <p className="sans text-white/50 leading-loose text-lg font-light italic">
            "Aqui, o tempo abranda. A luz da vela e o tilintar dos copos criam o cenário perfeito para conversas que duram até tarde."
          </p>
        </div>
      </div>
      <div className="relative group">
        <div className="absolute -inset-4 border border-gold/10 rounded-3xl -rotate-2 group-hover:rotate-0 transition-transform duration-700"></div>
        <img
          src="https://images.unsplash.com/photo-1528823331182-7aa201b13580?q=80&w=1974"
          alt="Vinho a ser servido"
          className="w-full aspect-[4/3] object-cover rounded-2xl relative z-10 opacity-70 grayscale hover:grayscale-0 transition-all duration-1000"
          referrerPolicy="no-referrer"
        />
        <div className="absolute -bottom-8 -right-8 z-20 glass p-8 rounded-2xl glow-red hidden lg:block">
          <p className="serif text-gold text-5xl leading-none italic">150+</p>
          <p className="sans text-[9px] uppercase tracking-[0.3em] text-white/40 mt-3">Rótulos Selecionados</p>
        </div>
      </div>
    </div>
  </section>
);

const MenuSection = () => {
  const [activeType, setActiveType] = useState<'petiscos' | 'vinhos'>('petiscos');

  return (
    <section id="menu" className="bg-[#0a0505] py-32 px-8 md:px-16 relative">
      <div className="absolute right-0 top-1/4 w-[400px] h-[400px] bg-[#3a0a0a] rounded-full filter blur-[150px] opacity-10"></div>
      
      <div className="max-w-4xl mx-auto text-center mb-24 relative z-10">
        <h2 className="serif text-5xl md:text-7xl mb-12 italic">A Experiência</h2>
        <div className="flex justify-center gap-12 md:gap-20">
          <button
            onClick={() => setActiveType('petiscos')}
            className={`sans text-[11px] uppercase tracking-[0.4em] pb-5 transition-all relative ${activeType === 'petiscos' ? 'text-gold' : 'text-white/30 hover:text-white/60'}`}
          >
            Petiscos
            {activeType === 'petiscos' && (
              <motion.div layoutId="underline" className="absolute bottom-0 left-0 w-full h-[1px] bg-gold" />
            )}
          </button>
          <button
            onClick={() => setActiveType('vinhos')}
            className={`sans text-[11px] uppercase tracking-[0.4em] pb-5 transition-all relative ${activeType === 'vinhos' ? 'text-gold' : 'text-white/30 hover:text-white/60'}`}
          >
            Carta de Vinhos
            {activeType === 'vinhos' && (
              <motion.div layoutId="underline" className="absolute bottom-0 left-0 w-full h-[1px] bg-gold" />
            )}
          </button>
        </div>
      </div>

      <motion.div
        key={activeType}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="max-w-6xl mx-auto grid md:grid-cols-2 gap-x-16 gap-y-12 relative z-10"
      >
        {activeType === 'petiscos' ? (
          MENU.petiscos.map((item) => (
            <div key={item.name} className="group glass p-8 rounded-3xl hover:border-gold/30 transition-all duration-500">
              <div className="flex justify-between items-end mb-4">
                <h3 className="serif text-2xl tracking-wide text-white/90 group-hover:text-gold transition-colors">{item.name}</h3>
                <span className="serif text-gold text-2xl italic opacity-80">{item.price}</span>
              </div>
              <p className="sans text-[11px] uppercase tracking-widest text-white/40 leading-relaxed font-light">{item.description}</p>
            </div>
          ))
        ) : (
          MENU.vinhos.map((item) => (
            <div key={item.name} className="group glass p-8 rounded-3xl hover:border-gold/30 transition-all duration-500">
              <div className="flex justify-between items-start mb-4">
                <div className="flex gap-4">
                  <div className="w-[1px] h-12 bg-gold/40 group-hover:bg-gold transition-colors"></div>
                  <div>
                    <h3 className="serif text-2xl tracking-wide text-white/90 group-hover:text-gold transition-colors">{item.name}</h3>
                    <p className="sans text-[10px] uppercase tracking-[0.2em] text-white/30 italic">{item.region} • {item.type}</p>
                  </div>
                </div>
                <span className="serif text-gold text-2xl italic opacity-80">{item.price}</span>
              </div>
            </div>
          ))
        )}
      </motion.div>
    </section>
  );
};

const Events = () => (
  <section id="events" className="bg-[#0a0505] py-32 px-8 md:px-16 relative">
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
        <div className="space-y-4">
          <h2 className="serif text-5xl md:text-7xl">Próximos <span className="italic">Eventos</span></h2>
        </div>
        <p className="sans text-white/40 max-w-xs text-xs uppercase tracking-[0.2em] leading-loose text-right">
          Para além de um restaurante, somos um palco para a cultura.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {EVENTS.map((event) => (
          <div key={event.title} className="group relative overflow-hidden glass p-16 rounded-[2.5rem] hover:border-gold/30 glow-red transition-all duration-700">
            <div className="relative z-10">
              <p className="sans text-[10px] text-gold uppercase tracking-[0.4em] mb-6">{event.date}</p>
              <h3 className="serif text-4xl mb-8 font-light italic">{event.title}</h3>
              <p className="sans text-white/50 text-sm leading-relaxed mb-10 font-light">{event.description}</p>
              <a 
                href="#footer"
                className="inline-block sans text-[10px] uppercase tracking-widest border border-gold/40 px-8 py-3 rounded-full hover:bg-gold hover:text-black transition-all duration-500" 
                aria-label={`Saber mais sobre ${event.title}`}
              >
                Saber Mais
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Footer = ({ onOpenLegal }: { onOpenLegal: (type: 'privacy' | 'terms') => void }) => (
  <footer id="footer" className="bg-[#0a0505] pt-32 pb-16 px-8 border-t border-white/5 relative z-10">
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-24 mb-32 items-start">
        <div className="space-y-10">
          <div className="flex flex-col">
            <h1 className="serif text-4xl italic tracking-widest text-white uppercase">
              Petisco <span className="text-gold font-normal">&</span> Vinho
            </h1>
            <p className="sans text-[10px] tracking-[0.4em] opacity-40 uppercase ml-0.5">A Alma do Bairro Alto</p>
          </div>
          <div className="space-y-5 sans text-[11px] uppercase tracking-[0.2em] text-white/40 leading-loose">
            <CopyButton text="Rua da Imprensa Nacional 12, Lisboa">
              <div className="flex gap-4 items-center">
                <MapPin size={14} className="text-gold" />
                <span>Rua da Imprensa Nacional 12, Lisboa</span>
              </div>
            </CopyButton>
            <CopyButton text="+351 210 000 000">
              <div className="flex gap-4 items-center">
                <Phone size={14} className="text-gold" />
                <span>+351 210 000 000</span>
              </div>
            </CopyButton>
          </div>
        </div>

        <div className="space-y-10">
          <h4 className="sans text-[10px] uppercase tracking-[0.5em] text-gold/60">Horário Noturno</h4>
          <div className="serif text-xl space-y-3 font-light text-white/70">
            <p>Ter — Qui: 18:00 — 00:00</p>
            <p>Sex — Sáb: 18:00 — 02:00</p>
            <p className="italic opacity-40">Segunda: Encerrado</p>
          </div>
        </div>

        <div className="space-y-10 text-right md:text-left">
          <h4 className="sans text-[10px] uppercase tracking-[0.5em] text-gold/60">Ligar</h4>
          <div className="flex md:justify-start justify-end gap-10">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-gold transition-colors" aria-label="Instagram">
              <Instagram size={20} />
            </a>
            <button className="sans text-[10px] uppercase tracking-widest text-white/40 hover:text-white border-b border-gold/30 pb-1">
              Press Kit
            </button>
          </div>
          <div className="pt-6">
            <p className="serif text-2xl italic text-gold opacity-80 leading-snug">"O primeiro copo é para a sede, o segundo para o prazer."</p>
          </div>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 opacity-30 pt-12 border-t border-white/5">
        <div className="flex gap-8 sans text-[8px] uppercase tracking-[0.5em]">
          <span>© 2026 Petisco & Vinho Lisboa</span>
          <button onClick={() => onOpenLegal('privacy')} className="hover:text-white transition-colors">Privacidade</button>
          <button onClick={() => onOpenLegal('terms')} className="hover:text-white transition-colors">Termos</button>
        </div>
        <div className="flex gap-3">
          <div className="w-2 h-2 rounded-full bg-gold"></div>
          <div className="w-2 h-2 rounded-full bg-white/20"></div>
          <div className="w-2 h-2 rounded-full bg-white/20"></div>
        </div>
      </div>
    </div>
  </footer>
);

export default function App() {
  const [legalModal, setLegalModal] = useState<{ type: 'privacy' | 'terms', isOpen: boolean }>({ type: 'privacy', isOpen: false });

  const openLegal = (type: 'privacy' | 'terms') => setLegalModal({ type, isOpen: true });
  const closeLegal = () => setLegalModal({ ...legalModal, isOpen: false });

  return (
    <div className="bg-[#0a0505] font-sans selection:bg-gold/30 selection:text-gold">
      <Navbar />
      <main>
        <Hero />
        <Concept />
        <MenuSection />
        <Events />
      </main>
      <Footer onOpenLegal={openLegal} />
      <LegalModal type={legalModal.type} isOpen={legalModal.isOpen} onClose={closeLegal} />
    </div>
  );
}
