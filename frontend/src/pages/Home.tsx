import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { ArrowRight, Menu, X, Phone, Mail, MessageCircle, Send, CheckCircle2 } from 'lucide-react';
import { SiFacebook, SiInstagram, SiLinkedin, SiX } from 'react-icons/si';
import { useGetAllServices, useGetAllProjects, useSubmitContactMessage } from '../hooks/useQueries';

export function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('accueil');
  const [scrollY, setScrollY] = useState(0);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [hoveredProjectId, setHoveredProjectId] = useState<string | null>(null);

  const { data: services } = useGetAllServices();
  const { data: projects } = useGetAllProjects();
  const submitMessage = useSubmitContactMessage();

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);

      const sections = ['accueil', 'services', 'portfolio', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !email || !message) {
      toast.error('Veuillez remplir tous les champs');
      return;
    }

    try {
      await submitMessage.mutateAsync({ name, email, message });
      toast.success('Message envoyé avec succès !');
      setName('');
      setEmail('');
      setMessage('');
    } catch (error) {
      toast.error('Erreur lors de l\'envoi du message');
    }
  };

  const navItems = [
    { id: 'accueil', label: 'Accueil' },
    { id: 'services', label: 'Services' },
    { id: 'portfolio', label: 'Portfolio' },
    { id: 'contact', label: 'Contact' },
  ];

  const defaultServices = [
    {
      id: 'web-design',
      title: 'Web Design',
      icon: '/assets/generated/web-design-icon.dim_64x64.png',
      description: 'Création de sites web modernes, responsives et optimisés pour tous les appareils.',
      features: [
        'Design responsive et mobile-first',
        'Interface utilisateur intuitive',
        'Optimisation SEO',
        'Performance et vitesse optimales',
      ],
    },
    {
      id: 'branding',
      title: 'Logo & Branding',
      icon: '/assets/generated/branding-icon.dim_64x64.png',
      description: 'Développement d\'identités visuelles uniques qui reflètent l\'essence de votre marque.',
      features: [
        'Création de logo unique',
        'Charte graphique complète',
        'Guide de style de marque',
        'Identité visuelle cohérente',
      ],
    },
    {
      id: 'flyers',
      title: 'Flyers',
      icon: '/assets/generated/flyer-icon.dim_64x64.png',
      description: 'Conception de flyers percutants qui captent l\'attention et transmettent votre message.',
      features: [
        'Design accrocheur et professionnel',
        'Message clair et impactant',
        'Formats personnalisés',
        'Fichiers prêts pour l\'impression',
      ],
    },
    {
      id: 'business-cards',
      title: 'Cartes de visite',
      icon: '/assets/generated/business-card-icon.dim_64x64.png',
      description: 'Création de cartes de visite élégantes et professionnelles qui laissent une impression durable.',
      features: [
        'Design professionnel et élégant',
        'Formats standards et personnalisés',
        'Finitions premium disponibles',
        'Fichiers haute résolution',
      ],
    },
  ];

  const defaultProjects = [
    {
      id: 'web1',
      title: 'Site Web Moderne',
      description: 'Conception d\'un site web responsive pour une entreprise de services',
      image: '/assets/generated/portfolio-web1.dim_400x300.jpg',
    },
    {
      id: 'logo1',
      title: 'Identité de Marque',
      description: 'Création de logo et charte graphique complète',
      image: '/assets/generated/portfolio-logo1.dim_400x300.jpg',
    },
    {
      id: 'flyer1',
      title: 'Campagne Marketing',
      description: 'Design de flyers pour événement promotionnel',
      image: '/assets/generated/portfolio-flyer1.dim_400x300.jpg',
    },
    {
      id: 'card1',
      title: 'Cartes Professionnelles',
      description: 'Cartes de visite élégantes pour cabinet d\'avocats',
      image: '/assets/generated/portfolio-card1.dim_400x300.jpg',
    },
    {
      id: 'web2',
      title: 'E-commerce',
      description: 'Boutique en ligne avec système de paiement intégré',
      image: '/assets/generated/portfolio-web2.dim_400x300.jpg',
    },
  ];

  const displayServices = services && services.length > 0 ? services : defaultServices;
  const displayProjects = projects && projects.length > 0 ? projects : defaultProjects;

  const contactInfo = [
    {
      icon: Phone,
      label: 'Téléphone',
      value: '+1 (829) 438 8792',
      href: 'tel:+18294388792',
    },
    {
      icon: Mail,
      label: 'Email',
      value: 'jnobens@icloud.com',
      href: 'mailto:jnobens@icloud.com',
    },
    {
      icon: MessageCircle,
      label: 'WhatsApp',
      value: 'Contactez-nous',
      href: 'https://wa.me/18294388792',
    },
  ];

  const socialLinks = [
    { icon: SiFacebook, href: '#', label: 'Facebook' },
    { icon: SiInstagram, href: '#', label: 'Instagram' },
    { icon: SiLinkedin, href: '#', label: 'LinkedIn' },
    { icon: SiX, href: '#', label: 'X' },
  ];

  return (
    <div className="relative">
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-navy-dark/80 backdrop-blur-xl transition-all duration-300">
        <div className="container flex h-16 items-center justify-between">
          <button 
            onClick={() => scrollToSection('accueil')} 
            className="flex items-center transition-transform hover:scale-105"
          >
            <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
              <span className="text-white">ALTURA</span>
              <span className="bg-gold px-4 py-1.5 rounded-lg shadow-lg text-navy-dark">
                AGENCY
              </span>
            </h1>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex md:items-center md:gap-6">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`relative text-sm font-medium transition-colors duration-300 ${
                  activeSection === item.id ? 'text-gold' : 'text-white hover:text-gold'
                }`}
              >
                {item.label}
              </button>
            ))}
            <Button 
              onClick={() => scrollToSection('contact')}
              className="bg-gold hover:bg-gold/90 text-navy-dark font-semibold transition-all duration-300 hover:scale-105"
            >
              Contactez-nous
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white transition-transform hover:scale-110"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-white/10 bg-navy-dark/95 backdrop-blur-xl animate-in slide-in-from-top-2">
            <nav className="container flex flex-col gap-4 py-6">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-left text-sm font-medium transition-colors ${
                    activeSection === item.id ? 'text-gold' : 'text-white hover:text-gold'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <Button 
                onClick={() => scrollToSection('contact')}
                className="w-full bg-gold hover:bg-gold/90 text-navy-dark font-semibold"
              >
                Contactez-nous
              </Button>
            </nav>
          </div>
        )}
      </header>

      {/* Section Accueil - Two Column Layout with Deep Navy Background */}
      <section id="accueil" className="relative w-full overflow-hidden bg-navy-dark">
        <div className="container relative z-10 py-24 md:py-32 lg:py-40">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            {/* Left Column - Text Content */}
            <div 
              className="space-y-8 animate-in fade-in slide-in-from-left-8 duration-1000"
              style={{ animationDelay: '200ms' }}
            >
              <h1 className="text-5xl font-bold tracking-tight text-white sm:text-6xl md:text-7xl">
                Let's handle your{' '}
                <span className="text-gold inline-block animate-in fade-in slide-in-from-bottom-4 duration-1000" style={{ animationDelay: '400ms' }}>
                  projects
                </span>
              </h1>
              <p 
                className="text-xl text-white/90 md:text-2xl max-w-2xl animate-in fade-in slide-in-from-left-8 duration-1000"
                style={{ animationDelay: '600ms' }}
              >
                Transformez vos idées en réalité avec notre expertise en design web, branding, et communication visuelle.
              </p>
              <div 
                className="flex flex-col sm:flex-row gap-4 animate-in fade-in slide-in-from-left-8 duration-1000"
                style={{ animationDelay: '800ms' }}
              >
                <Button 
                  size="lg" 
                  onClick={() => scrollToSection('contact')}
                  className="bg-gold hover:bg-gold/90 text-navy-dark font-semibold text-lg px-8 transition-all duration-300 hover:scale-105"
                >
                  Contactez-nous
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  onClick={() => scrollToSection('portfolio')}
                  className="border-white/30 text-white hover:bg-white/10 hover:border-gold hover:text-gold text-lg px-8 transition-all duration-300 hover:scale-105"
                >
                  Voir nos projets
                </Button>
              </div>
            </div>

            {/* Right Column - Image */}
            <div 
              className="relative animate-in fade-in slide-in-from-right-8 duration-1000"
              style={{ animationDelay: '400ms' }}
            >
              <div className="relative overflow-hidden rounded-2xl border border-white/10 shadow-2xl">
                <img
                  src="/assets/generated/hero-workspace.dim_1200x600.jpg"
                  alt="Altura Agency Workspace"
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/30 to-transparent pointer-events-none" />
              </div>
              {/* Decorative gold accent */}
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-gold/20 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-gold/10 rounded-full blur-2xl pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Gold separator line */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gold z-10" />
      </section>

      {/* Section Services */}
      <section id="services" className="relative py-20 bg-gradient-to-b from-navy-dark to-navy-light">
        <div className="container">
          <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl mb-4">
              Nos <span className="text-gold">Services</span>
            </h2>
            <p className="text-lg text-white/70 max-w-3xl mx-auto">
              Des solutions créatives et professionnelles pour donner vie à vos projets
            </p>
          </div>

          <div className="grid gap-12 md:grid-cols-2">
            {displayServices.map((service, index) => {
              const isBackendService = 'icon' in service && typeof service.icon === 'object';
              const iconUrl = isBackendService 
                ? (service.icon as any).getDirectURL() 
                : (service as any).icon;
              
              const features = (service as any).features || [];

              return (
                <div
                  key={service.id}
                  className="group animate-in fade-in zoom-in-95 duration-700"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-8 transition-all duration-500 hover:border-gold/50 hover:bg-white/10">
                    <div className="flex items-start gap-6">
                      <div className="flex-shrink-0">
                        <div className="relative overflow-hidden rounded-xl bg-gold/10 p-4 transition-all duration-500 group-hover:bg-gold/20">
                          <img
                            src={iconUrl}
                            alt={service.title}
                            className="h-12 w-12 object-contain transition-transform duration-500 group-hover:scale-110"
                          />
                        </div>
                      </div>
                      <div className="flex-1 space-y-4">
                        <h3 className="text-2xl font-bold text-white transition-colors duration-300 group-hover:text-gold">
                          {service.title}
                        </h3>
                        <p className="text-white/70 leading-relaxed">
                          {service.description}
                        </p>
                        {features.length > 0 && (
                          <ul className="space-y-2 pt-2">
                            {features.map((feature: string, i: number) => (
                              <li 
                                key={i} 
                                className="flex items-start gap-2 text-sm"
                              >
                                <CheckCircle2 className="h-4 w-4 text-gold shrink-0 mt-0.5" />
                                <span className="text-white/60">{feature}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Gold separator line at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gold" />
      </section>

      {/* Section Portfolio */}
      <section id="portfolio" className="relative py-20 bg-gradient-to-b from-navy-light to-navy-dark">
        <div className="container">
          <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl mb-4">
              Notre <span className="text-gold">Portfolio</span>
            </h2>
            <p className="text-lg text-white/70 max-w-3xl mx-auto">
              Découvrez nos réalisations et laissez-vous inspirer par nos projets créatifs
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {displayProjects.map((project, index) => {
              const isBackendProject = 'image' in project && typeof project.image === 'object';
              const imageUrl = isBackendProject 
                ? (project.image as any).getDirectURL() 
                : (project as any).image;

              return (
                <div
                  key={project.id}
                  className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-700 hover:border-gold/50 hover:scale-105 animate-in fade-in zoom-in-95 duration-700"
                  style={{ animationDelay: `${index * 100}ms` }}
                  onMouseEnter={() => setHoveredProjectId(project.id)}
                  onMouseLeave={() => setHoveredProjectId(null)}
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={imageUrl}
                      alt={project.title}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                  <div
                    className={`absolute inset-0 bg-gradient-to-t from-navy-dark via-navy-dark/90 to-transparent transition-all duration-500 ${
                      hoveredProjectId === project.id ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <h3 className="text-xl font-semibold mb-2 transition-all duration-300 group-hover:text-gold">
                        {project.title}
                      </h3>
                      <p className="text-white/70 text-sm">{project.description}</p>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-white mb-2 transition-colors duration-300 group-hover:text-gold">
                      {project.title}
                    </h3>
                    <p className="text-white/60 text-sm">{project.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Gold separator line at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gold" />
      </section>

      {/* Section Contact */}
      <section id="contact" className="relative py-20 bg-gradient-to-b from-navy-dark to-navy-light">
        <div className="container">
          <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl mb-4">
              Contactez <span className="text-gold">Nous</span>
            </h2>
            <p className="text-lg text-white/70 max-w-3xl mx-auto">
              Prêt à démarrer votre projet ? Nous sommes là pour vous écouter et vous accompagner
            </p>
          </div>

          <div className="grid gap-12 lg:grid-cols-2 max-w-6xl mx-auto">
            {/* Contact Form */}
            <div className="animate-in fade-in slide-in-from-left-8 duration-1000">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-white">Nom complet</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Votre nom"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="h-12 bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-gold focus:ring-gold"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="votre@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="h-12 bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-gold focus:ring-gold"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-white">Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Décrivez votre projet..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    rows={6}
                    className="resize-none bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-gold focus:ring-gold"
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-gold hover:bg-gold/90 text-navy-dark font-semibold h-12 transition-all duration-300 hover:scale-105"
                  disabled={submitMessage.isPending}
                >
                  {submitMessage.isPending ? (
                    'Envoi en cours...'
                  ) : (
                    <>
                      Envoyer le message
                      <Send className="ml-2 h-5 w-5" />
                    </>
                  )}
                </Button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-1000">
              <div className="space-y-4">
                {contactInfo.map((info, index) => (
                  <a
                    key={info.label}
                    href={info.href}
                    className="flex items-start gap-4 p-5 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-300 hover:border-gold/50 hover:bg-white/10 hover:scale-105 group animate-in fade-in slide-in-from-right-4"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gold/10 text-gold shrink-0 transition-all duration-300 group-hover:bg-gold group-hover:text-navy-dark">
                      <info.icon className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="font-semibold text-white mb-1 transition-colors duration-300 group-hover:text-gold">{info.label}</p>
                      <p className="text-white/60 text-sm">{info.value}</p>
                    </div>
                  </a>
                ))}
              </div>

              <div className="pt-6">
                <h3 className="text-lg font-semibold text-white mb-4">Suivez-nous</h3>
                <div className="flex gap-3">
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      aria-label={social.label}
                      className="flex h-12 w-12 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white transition-all duration-300 hover:border-gold/50 hover:bg-gold hover:text-navy-dark hover:scale-110"
                    >
                      <social.icon className="h-5 w-5" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative border-t border-white/10 py-8 bg-navy-dark">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-white/60">
              <span>© 2025. Built with</span>
              <span className="text-gold">♥</span>
              <span>using</span>
              <a 
                href="https://caffeine.ai" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gold hover:text-gold/80 transition-colors duration-300 font-medium"
              >
                caffeine.ai
              </a>
            </div>
            <div className="flex gap-6">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="text-sm text-white/60 hover:text-gold transition-colors duration-300"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
