import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Separator } from '@/components/ui/separator.jsx'
import { 
  Award, 
  FileText, 
  Wrench, 
  Mail, 
  Linkedin, 
  Phone,
  Download,
  ExternalLink,
  Settings,
  BarChart3,
  Cog,
  Menu,
  X
} from 'lucide-react'
import productionLineImg from './assets/production-line.jpg'
import leanManufacturingImg from './assets/lean-manufacturing.jpg'
import industrialEngineeringImg from './assets/industrial-engineering.jpg'
import './App.css'

function App() {
  const [activeSection, setActiveSection] = useState('accueil')
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId)
    setIsMenuOpen(false)
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.5 }
    )

    const sections = document.querySelectorAll('section[id]')
    sections.forEach((section) => observer.observe(section))

    return () => observer.disconnect()
  }, [])

  return (
    <div className="min-h-screen bg-background minimal-gradient">
      {/* Navigation minimaliste */}
      <nav className="nav-minimal">
        <div className="nav-left">
          <span>PORTFOLIO</span>
        </div>
        <div className="nav-right hidden md:block">
          <span>PERSONAL WORKS • 2018 - 2025</span>
        </div>
        <button 
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Menu mobile */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 bg-white/95 backdrop-blur-lg md:hidden">
          <div className="flex flex-col items-center justify-center h-full space-y-8">
            {[
              { id: 'accueil', label: 'Accueil' },
              { id: 'apropos', label: 'À Propos' },
              { id: 'certifications', label: 'Certifications' },
              { id: 'whitepapers', label: 'White Papers' },
              { id: 'projets', label: 'Projets' },
              { id: 'contact', label: 'Contact' }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-lg font-light tracking-wider uppercase hover:text-accent transition-colors"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Section Accueil */}
      <section id="accueil" className="min-h-screen flex items-center justify-center relative">
        <div className="text-center">
          <h1 className="hero-title-large text-gradient mb-8 fade-in">
            PORTFOLIO
          </h1>
          <p className="text-muted-foreground text-lg font-light tracking-wide fade-in stagger-1">
            我 的 设 计 作 品 集
          </p>
        </div>
        
        {/* Informations de contact en bas à gauche */}
        <div className="contact-info fade-in stagger-2">
          <div>Phone: 0664823867</div>
          <div>Email: quentinbourgois@gmail.com</div>
        </div>
      </section>

      {/* Navigation cachée pour les sections suivantes */}
      <div className="hidden md:fixed md:top-1/2 md:right-8 md:transform md:-translate-y-1/2 md:z-50 md:flex md:flex-col md:space-y-4">
        {[
          { id: 'apropos', label: 'À Propos' },
          { id: 'certifications', label: 'Certifications' },
          { id: 'whitepapers', label: 'White Papers' },
          { id: 'projets', label: 'Projets' },
          { id: 'contact', label: 'Contact' }
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => scrollToSection(item.id)}
            className={`w-3 h-3 rounded-full border transition-all ${
              activeSection === item.id 
                ? 'bg-foreground border-foreground' 
                : 'border-muted-foreground hover:border-foreground'
            }`}
            title={item.label}
          />
        ))}
      </div>

      <div className="section-divider-minimal"></div>

      {/* Section À Propos */}
      <section id="apropos" className="py-20">
        <div className="container mx-auto px-8 max-w-4xl">
          <h2 className="section-title text-3xl mb-16 text-center fade-in">À Propos</h2>
          <Card className="minimal-card fade-in stagger-1">
            <CardContent className="p-12">
              <p className="text-lg leading-relaxed mb-8 font-light">
                Fort d'une solide expertise en ingénierie industrielle, je suis un professionnel passionné par 
                l'optimisation des processus, l'amélioration continue et la conception de solutions innovantes 
                pour relever les défis complexes du monde industriel.
              </p>
              <p className="text-lg leading-relaxed mb-8 font-light">
                Mon parcours est jalonné de succès dans la mise en œuvre de méthodologies Lean et Six Sigma, 
                la gestion de projets complexes et le développement de systèmes de production performants.
              </p>
              <p className="text-lg leading-relaxed font-light">
                Mon approche est axée sur l'analyse rigoureuse, la résolution créative de problèmes et la 
                collaboration interdisciplinaire. Je m'engage à transformer les opérations industrielles en 
                maximisant l'efficacité, en réduisant les coûts et en garantissant une qualité irréprochable.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <div className="section-divider-minimal"></div>

      {/* Section Certifications */}
      <section id="certifications" className="py-20">
        <div className="container mx-auto px-8 max-w-6xl">
          <h2 className="section-title text-3xl mb-16 text-center fade-in">Certifications</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: "Lean Six Sigma Black Belt",
                description: "Certification validant ma capacité à diriger des projets d'amélioration complexes et à utiliser des outils statistiques avancés pour l'optimisation des processus.",
                icon: <Award className="h-5 w-5" />
              },
              {
                title: "Project Management Professional (PMP)",
                description: "Certification PMI confirmant ma compétence à gérer des projets de manière efficace, couvrant les cinq groupes de processus et dix domaines de connaissances.",
                icon: <Settings className="h-5 w-5" />
              },
              {
                title: "Certified Supply Chain Professional (CSCP)",
                description: "Certification ASCM attestant de ma compréhension globale de la gestion de la chaîne d'approvisionnement, de la planification stratégique à la logistique.",
                icon: <BarChart3 className="h-5 w-5" />
              },
              {
                title: "ISO 9001 Lead Auditor",
                description: "Qualification pour auditer les systèmes de management de la qualité selon la norme ISO 9001, garantissant la conformité et l'amélioration continue.",
                icon: <Cog className="h-5 w-5" />
              }
            ].map((cert, index) => (
              <Card key={index} className={`minimal-card fade-in stagger-${index + 1}`}>
                <CardHeader>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 text-muted-foreground">
                      {cert.icon}
                    </div>
                    <Badge className="minimal-badge">
                      Certifié
                    </Badge>
                  </div>
                  <CardTitle className="text-xl font-light">{cert.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground font-light leading-relaxed">{cert.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider-minimal"></div>

      {/* Section White Papers */}
      <section id="whitepapers" className="py-20">
        <div className="container mx-auto px-8 max-w-6xl">
          <h2 className="section-title text-3xl mb-16 text-center fade-in">White Papers</h2>
          <div className="space-y-6">
            {[
              {
                title: "L'Impact de l'Industrie 4.0 sur l'Optimisation de la Chaîne d'Approvisionnement",
                description: "Analyse des technologies IoT, IA et Big Data dans la transformation de la gestion logistique moderne."
              },
              {
                title: "Méthodologies Lean et Six Sigma : Synergies pour l'Excellence Opérationnelle",
                description: "Exploration de la complémentarité des approches Lean et Six Sigma avec un cadre intégré de mise en œuvre."
              },
              {
                title: "La Maintenance Prédictive dans les Environnements de Production",
                description: "Application des technologies de maintenance prédictive et stratégies de déploiement en milieu industriel."
              },
              {
                title: "L'Ergonomie au Poste de Travail : Un Levier de Performance et de Bien-être",
                description: "Impact des facteurs ergonomiques sur la productivité et la santé des employés en environnement industriel."
              }
            ].map((paper, index) => (
              <Card key={index} className={`minimal-card fade-in stagger-${index + 1}`}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-xl font-light mb-3">{paper.title}</CardTitle>
                      <CardDescription className="text-base font-light leading-relaxed">
                        {paper.description}
                      </CardDescription>
                    </div>
                    <div className="flex gap-3 ml-6">
                      <Button size="sm" className="minimal-button text-xs">
                        <Download className="h-3 w-3 mr-2" />
                        PDF
                      </Button>
                      <Button size="sm" className="minimal-button text-xs">
                        <ExternalLink className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider-minimal"></div>

      {/* Section Projets */}
      <section id="projets" className="py-20">
        <div className="container mx-auto px-8 max-w-6xl">
          <h2 className="section-title text-3xl mb-16 text-center fade-in">Projets Personnels</h2>
          <div className="grid lg:grid-cols-2 gap-12">
            {[
              {
                title: "Optimisation du Flux de Production",
                description: "Réduction des temps de cycle et des goulots d'étranglement sur une ligne d'assemblage de composants électroniques. Augmentation de 25% de la productivité et réduction de 15% des défauts.",
                skills: ["VSM", "Simulation", "Lean Manufacturing"],
                image: productionLineImg
              },
              {
                title: "Système de Gestion des Stocks Intelligent",
                description: "Développement d'un prototype de système de gestion des stocks basé sur des algorithmes prédictifs pour PME. Optimisation des recommandations d'approvisionnement.",
                skills: ["Python", "Modélisation prédictive", "Analyse de données"],
                image: leanManufacturingImg
              },
              {
                title: "Amélioration de l'Efficacité Énergétique",
                description: "Analyse approfondie de la consommation énergétique d'un site de production. Estimation d'une réduction de 10% de la consommation annuelle et diminution de l'empreinte carbone.",
                skills: ["Audit énergétique", "Modélisation", "Développement durable"],
                image: industrialEngineeringImg
              }
            ].map((project, index) => (
              <Card key={index} className={`minimal-card overflow-hidden fade-in stagger-${index + 1}`}>
                <div className="aspect-video overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover project-image"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-xl font-light">{project.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground font-light leading-relaxed mb-6">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.skills.map((skill, skillIndex) => (
                      <Badge key={skillIndex} className="minimal-badge">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider-minimal"></div>

      {/* Section Contact */}
      <section id="contact" className="py-20">
        <div className="container mx-auto px-8 max-w-4xl text-center">
          <h2 className="section-title text-3xl mb-16 fade-in">Contact</h2>
          <p className="text-lg text-muted-foreground mb-16 font-light leading-relaxed fade-in stagger-1">
            N'hésitez pas à me contacter pour toute question, opportunité de collaboration 
            ou pour discuter de vos projets.
          </p>
          <Card className="minimal-card fade-in stagger-2">
            <CardContent className="p-12">
              <div className="grid md:grid-cols-3 gap-12">
                <div className="flex flex-col items-center">
                  <div className="p-4 text-muted-foreground mb-4">
                    <Mail className="h-6 w-6" />
                  </div>
                  <h3 className="font-light mb-3 tracking-wide uppercase text-sm">Email</h3>
                  <p className="text-muted-foreground font-light">quentinbourgois@gmail.com</p>
                </div>
                <div className="flex flex-col items-center">
                  <div className="p-4 text-muted-foreground mb-4">
                    <Linkedin className="h-6 w-6" />
                  </div>
                  <h3 className="font-light mb-3 tracking-wide uppercase text-sm">LinkedIn</h3>
                  <p className="text-muted-foreground font-light">Votre profil LinkedIn</p>
                </div>
                <div className="flex flex-col items-center">
                  <div className="p-4 text-muted-foreground mb-4">
                    <Phone className="h-6 w-6" />
                  </div>
                  <h3 className="font-light mb-3 tracking-wide uppercase text-sm">Téléphone</h3>
                  <p className="text-muted-foreground font-light">+33 6 64 82 38 67</p>
                </div>
              </div>
              <Separator className="my-12 bg-border" />
              <p className="text-muted-foreground font-light leading-relaxed">
                Je suis disponible pour échanger sur la manière dont mes compétences en 
                ingénierie industrielle peuvent contribuer à la réussite de vos initiatives.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer minimaliste */}
      <footer className="py-12 text-center">
        <p className="text-muted-foreground font-light text-sm tracking-wide">
          © 2025 Portfolio Ingénieur Industriel
        </p>
      </footer>
    </div>
  )
}

export default App

