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
  Github,
  Download,
  ExternalLink,
  Settings,
  BarChart3,
  Cog,
  Menu,
  X
} from 'lucide-react'
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
                title: "Lean Six Sigma White Belt",
                description: "Fondamentaux du Lean Six Sigma : vocabulaire, philosophie d'amélioration continue et rôle de chacun dans un projet d'optimisation.",
                icon: <Award className="h-5 w-5" />
              },
              {
                title: "Lean Six Sigma Yellow Belt",
                description: "Participation à des projets d'amélioration : cartographie des processus, outils de base de résolution de problèmes et identification des gaspillages.",
                icon: <Award className="h-5 w-5" />
              },
              {
                title: "Lean Six Sigma Green Belt",
                description: "Conduite de projets d'amélioration selon la démarche DMAIC, avec outils statistiques pour mesurer, analyser et stabiliser les gains.",
                icon: <Award className="h-5 w-5" />
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
          <h3 className="font-light tracking-wide uppercase text-sm text-center mt-16 mb-8 text-muted-foreground">En préparation</h3>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              { title: "Black Belt Lean – CESI Certification", description: "Pilotage d'ateliers d'amélioration complexes, selon NF X06-091, ISO 13053 et ISO 18404. Certification enregistrée au Répertoire spécifique de France Compétences (RS7230)." },
              { title: "ISO 9001 Lead Auditor", description: "Audit des systèmes de management de la qualité." },
              { title: "Cloud – niveau fondamental", description: "Bases du cloud, utiles pour mes projets SaaS et d'IA industrielle." },
              { title: "ISA/IEC 62443", description: "Cybersécurité des systèmes d'automatisation et de contrôle industriels." }
            ].map((c, i) => (
              <Card key={i} className="minimal-card">
                <CardHeader>
                  <Badge className="minimal-badge w-fit mb-3">En préparation</Badge>
                  <CardTitle className="text-xl font-light">{c.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground font-light leading-relaxed">{c.description}</p>
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
                title: "Copilotes IA en environnement industriel",
                description: "Fiabilité, garde-fous et validation humaine : ce qu'un copilote IA peut et ne doit pas faire à côté d'une ligne, d'un MES ou d'un jumeau numérique.",
                pdf: "/whitepapers/copilotes-ia-industrie.pdf"
              },
              {
                title: "Company brain : la connaissance de l'entreprise comme infrastructure",
                description: "Capitaliser, structurer et interroger le savoir d'une organisation (procédures, retours d'expérience, décisions) avec RAG et graphes de connaissances.",
                pdf: "/whitepapers/company-brain.pdf"
              },
              {
                title: "Second cerveau : méthode et architecture",
                description: "Notes, tâches et mémoire d'agents : comment organiser une base de connaissances personnelle durable, de la capture à l'action.",
                pdf: "/whitepapers/second-cerveau.pdf"
              },
              {
                title: "Automatisation d'ateliers et de processus",
                description: "Où automatiser, dans quel ordre et avec quels contrôles : une approche Lean de l'automatisation, des tâches administratives jusqu'au poste de travail.",
                pdf: "/whitepapers/automatisation-ateliers-processus.pdf"
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
                    <div className="ml-6">
                      {paper.pdf ? (
                        <a href={paper.pdf} target="_blank" rel="noopener noreferrer">
                          <Button size="sm" className="minimal-button text-xs">
                            <Download className="h-3 w-3 mr-2" />
                            PDF
                          </Button>
                        </a>
                      ) : (
                        <Badge className="minimal-badge">En rédaction</Badge>
                      )}
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
                title: "MirrorLine – jumeau numérique industriel avec copilote IA",
                description: "Plateforme SaaS de jumeau numérique pour l'industrie, associée à un copilote IA d'aide à l'analyse et à la décision.",
                status: "En développement",
                skills: ["TypeScript", "Digital Twin", "IA"]
              },
              {
                title: "Finnote",
                description: "Application web pour apprendre et réviser : le parcours de révision se fait directement dans le site.",
                status: "En ligne",
                link: "https://finnote.app",
                skills: ["Web", "Apprentissage", "Produit"]
              },
              {
                title: "Second cerveau",
                description: "Base de connaissances Obsidian couplée à un agent IA : capture, liste de tâches centralisée et journal de projets vérifiable.",
                status: "Usage quotidien",
                skills: ["Obsidian", "Agents IA", "Gestion des connaissances"]
              },
              {
                title: "Homelab",
                description: "Services auto-hébergés pour mon usage : bibliothèque Calibre-Web partagée avec Nextcloud, lecture multi-appareils.",
                status: "Usage quotidien",
                skills: ["Auto-hébergement", "Nextcloud", "Calibre-Web"]
              },
              {
                title: "Trading algorithmique (recherche)",
                description: "Cadre de validation stricte de stratégies, backtests puis paper trading via l'API IBKR. Projet de recherche : aucun capital réel engagé.",
                status: "Paper trading en préparation",
                skills: ["Python", "Backtesting", "IBKR"]
              },
              {
                title: "CRM pour l'automobile",
                description: "Idée de CRM dédié aux professionnels de l'automobile. Pas encore de développement : phase d'exploration du besoin.",
                status: "Idée",
                skills: ["CRM", "Produit", "Automobile"]
              },
              {
                title: "Linux sur puce Apple M4",
                description: "Idée d'étude de faisabilité autour de Linux sur Apple Silicon M4. Pas de travail engagé à ce stade.",
                status: "Idée",
                skills: ["Linux", "Apple Silicon", "Recherche"]
              }
            ].map((project, index) => (
              <Card key={index} className={`minimal-card overflow-hidden fade-in stagger-${index + 1}`}>
                <CardHeader>
                  <Badge className="minimal-badge w-fit mb-3">{project.status}</Badge>
                  <CardTitle className="text-xl font-light">
                    {project.link ? (
                      <a href={project.link} target="_blank" rel="noopener noreferrer" className="hover:underline">{project.title} ↗</a>
                    ) : project.title}
                  </CardTitle>
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
              <div className="grid md:grid-cols-2 gap-12">
                <div className="flex flex-col items-center">
                  <div className="p-4 text-muted-foreground mb-4">
                    <Mail className="h-6 w-6" />
                  </div>
                  <h3 className="font-light mb-3 tracking-wide uppercase text-sm">Email</h3>
                  <p className="text-muted-foreground font-light">quentinbourgois@gmail.com</p>
                </div>
                <div className="flex flex-col items-center">
                  <div className="p-4 text-muted-foreground mb-4">
                    <Github className="h-6 w-6" />
                  </div>
                  <h3 className="font-light mb-3 tracking-wide uppercase text-sm">GitHub</h3>
                  <a href="https://github.com/Quinnnns" target="_blank" rel="noopener noreferrer" className="text-muted-foreground font-light hover:underline">github.com/Quinnnns</a>
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

