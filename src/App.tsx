import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  MessageCircle, 
  Instagram, 
  MapPin, 
  Calendar, 
  Users, 
  Sparkles,
  ArrowRight,
  Play,
  Check,
  Globe,
  Zap,
  Heart,
  Bot,
  BarChart3,
  Bookmark
} from 'lucide-react'
import { Button } from './components/ui/button'
import { Card, CardContent } from './components/ui/card'
import { Badge } from './components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs'
import { SocialMediaIntegration } from './components/SocialMediaIntegration'
import { TravelVault } from './components/TravelVault'
import { WhatsAppBotInterface } from './components/WhatsAppBotInterface'
import { BotAnalytics } from './components/BotAnalytics'
import { InteractiveDemo } from './components/InteractiveDemo'
import { blink } from './blink/client'

function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = blink.auth.onAuthStateChanged((state) => {
      setUser(state.user)
      setLoading(state.isLoading)
    })
    return unsubscribe
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (user) {
    return (
      <div className="min-h-screen bg-background">
        {/* Navigation */}
        <nav className="fixed top-0 w-full z-50 glass-effect">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-primary to-accent rounded-lg flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-semibold">Verso</span>
              </div>
              
              <div className="flex items-center space-x-4">
                <span className="text-sm text-muted-foreground">Welcome, {user.email}</span>
                <Button onClick={() => blink.auth.logout()}>Sign Out</Button>
              </div>
            </div>
          </div>
        </nav>

        {/* Main App Content */}
        <div className="pt-16">
          <Tabs defaultValue="bots" className="w-full">
            <div className="border-b">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <TabsList className="grid w-full grid-cols-4 max-w-md">
                  <TabsTrigger value="bots" className="flex items-center space-x-2">
                    <Bot className="w-4 h-4" />
                    <span className="hidden sm:inline">Bots</span>
                  </TabsTrigger>
                  <TabsTrigger value="vault" className="flex items-center space-x-2">
                    <Bookmark className="w-4 h-4" />
                    <span className="hidden sm:inline">Vault</span>
                  </TabsTrigger>
                  <TabsTrigger value="whatsapp" className="flex items-center space-x-2">
                    <MessageCircle className="w-4 h-4" />
                    <span className="hidden sm:inline">WhatsApp</span>
                  </TabsTrigger>
                  <TabsTrigger value="analytics" className="flex items-center space-x-2">
                    <BarChart3 className="w-4 h-4" />
                    <span className="hidden sm:inline">Analytics</span>
                  </TabsTrigger>
                </TabsList>
              </div>
            </div>

            <TabsContent value="bots" className="mt-0">
              <SocialMediaIntegration />
            </TabsContent>

            <TabsContent value="vault" className="mt-0">
              <TravelVault />
            </TabsContent>

            <TabsContent value="whatsapp" className="mt-0">
              <div className="p-6">
                <div className="max-w-4xl mx-auto">
                  <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold mb-2">WhatsApp Bot Interface</h1>
                    <p className="text-muted-foreground">
                      Experience how users interact with your travel bot on WhatsApp
                    </p>
                  </div>
                  <div className="flex justify-center">
                    <WhatsAppBotInterface />
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="analytics" className="mt-0">
              <BotAnalytics />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 glass-effect">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-primary to-accent rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-semibold">Verso</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">Features</a>
              <a href="#how-it-works" className="text-muted-foreground hover:text-foreground transition-colors">How it Works</a>
              <a href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors">Pricing</a>
            </div>

            <div className="flex items-center space-x-4">
              <Button onClick={() => blink.auth.login()}>Get Started</Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-16 hero-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge className="mb-6 bg-primary/10 text-primary border-primary/20">
                <Sparkles className="w-3 h-3 mr-1" />
                AI-Powered Travel Intelligence
              </Badge>
              
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                Your Personal
                <span className="gradient-text block">Travel Agent</span>
                in Your Pocket
              </h1>
              
              <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
                Transform how you discover, plan, and experience travel. Verso captures inspiration from Instagram, 
                organizes it intelligently, and creates personalized itineraries with seamless booking integration.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                <Button size="lg" className="text-lg px-8 py-6" onClick={() => blink.auth.login()}>
                  Start Planning Free
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                
                <Button variant="outline" size="lg" className="text-lg px-8 py-6" onClick={() => {
                  document.getElementById('demo-section')?.scrollIntoView({ behavior: 'smooth' })
                }}>
                  <Play className="mr-2 w-5 h-5" />
                  Watch Demo
                </Button>
              </div>
            </motion.div>

            {/* Hero Visual */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative max-w-4xl mx-auto"
            >
              <div className="relative bg-white rounded-2xl shadow-2xl p-8 animate-float">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card className="border-0 shadow-lg">
                    <CardContent className="p-6">
                      <Instagram className="w-8 h-8 text-pink-500 mb-4" />
                      <h3 className="font-semibold mb-2">Capture Inspiration</h3>
                      <p className="text-sm text-muted-foreground">Tag @Verso on Instagram posts to save travel inspiration</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-0 shadow-lg">
                    <CardContent className="p-6">
                      <Sparkles className="w-8 h-8 text-primary mb-4" />
                      <h3 className="font-semibold mb-2">AI Organization</h3>
                      <p className="text-sm text-muted-foreground">Smart categorization by destination and activity type</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-0 shadow-lg">
                    <CardContent className="p-6">
                      <Calendar className="w-8 h-8 text-accent mb-4" />
                      <h3 className="font-semibold mb-2">Perfect Itineraries</h3>
                      <p className="text-sm text-muted-foreground">Generate detailed plans with booking integration</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Interactive Demo Section */}
      <section id="demo-section" className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              See Verso in
              <span className="gradient-text"> Action</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Experience how Verso transforms scattered travel inspiration into organized, bookable experiences
            </p>
          </div>
          
          <InteractiveDemo />
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Everything You Need for
              <span className="gradient-text"> Perfect Trips</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              From inspiration to booking, Verso handles every aspect of your travel planning journey
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-gradient-to-r from-primary to-accent rounded-lg flex items-center justify-center mb-4">
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                    <p className="text-muted-foreground mb-4">{feature.description}</p>
                    <ul className="space-y-2">
                      {feature.benefits.map((benefit, i) => (
                        <li key={i} className="flex items-center text-sm">
                          <Check className="w-4 h-4 text-accent mr-2 flex-shrink-0" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              How Verso
              <span className="gradient-text"> Transforms</span>
              Your Travel Planning
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Three simple steps to go from inspiration to your perfect trip
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="text-center"
              >
                <div className="relative mb-8">
                  <div className="w-20 h-20 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-4">
                    <step.icon className="w-10 h-10 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-accent rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {index + 1}
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-4">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Transform Your
              <span className="gradient-text"> Travel Experience?</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join thousands of travelers who've discovered the future of trip planning
            </p>
            <Button size="lg" className="text-lg px-12 py-6" onClick={() => blink.auth.login()}>
              Start Your Journey
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted/30 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-r from-primary to-accent rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-semibold">Verso</span>
            </div>
            <p className="text-muted-foreground text-center">
              © 2024 Verso. Transforming travel, one trip at a time.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

const features = [
  {
    icon: Instagram,
    title: "Social Media Integration",
    description: "Capture travel inspiration directly from Instagram, TikTok, and YouTube with simple tagging.",
    benefits: [
      "Tag @Verso on any travel post",
      "Auto-organize by destination",
      "WhatsApp bot integration",
      "Cross-platform content sync"
    ]
  },
  {
    icon: Sparkles,
    title: "AI Travel Vault",
    description: "Your personal travel knowledge base that learns and grows with every trip you plan.",
    benefits: [
      "Smart content categorization",
      "Personalized recommendations",
      "Trip history tracking",
      "Intelligent search & retrieval"
    ]
  },
  {
    icon: MapPin,
    title: "Interactive Planning",
    description: "Visual itinerary builder with interactive maps and real-time collaboration tools.",
    benefits: [
      "Drag-and-drop itinerary builder",
      "Interactive map integration",
      "Collaborative planning",
      "Real-time synchronization"
    ]
  },
  {
    icon: Globe,
    title: "Booking Integration",
    description: "Seamless integration with Booking.com, Expedia, Klook, and other major travel platforms.",
    benefits: [
      "One-click booking",
      "Price comparison",
      "Real-time availability",
      "Booking management"
    ]
  },
  {
    icon: Users,
    title: "Group Coordination",
    description: "Plan trips with friends and family using collaborative tools and shared itineraries.",
    benefits: [
      "Shared planning workspace",
      "Group chat integration",
      "Voting on activities",
      "Bill splitting tools"
    ]
  },
  {
    icon: Zap,
    title: "In-Trip Assistant",
    description: "Real-time assistance during your travels with instant access to your planned activities.",
    benefits: [
      "Offline access to plans",
      "Real-time notifications",
      "Emergency assistance",
      "Local recommendations"
    ]
  }
]

const steps = [
  {
    icon: Heart,
    title: "Capture Inspiration",
    description: "Tag @Verso on Instagram posts or share content via WhatsApp to build your travel inspiration vault."
  },
  {
    icon: Sparkles,
    title: "AI Organization",
    description: "Our AI automatically categorizes and organizes your saved content by destination, activity type, and preferences."
  },
  {
    icon: Calendar,
    title: "Perfect Itineraries",
    description: "Generate detailed, personalized itineraries with integrated booking options and collaborative planning tools."
  }
]

export default App