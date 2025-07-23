import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Instagram, 
  Youtube, 
  MessageCircle,
  MapPin,
  Calendar,
  Bookmark,
  Sparkles,
  Clock,
  Star,
  DollarSign,
  Users,
  Check,
  ArrowRight,
  X,
  Heart,
  Share2,
  Bot
} from 'lucide-react'
import { Button } from './ui/button'
import { Card, CardContent } from './ui/card'
import { Badge } from './ui/badge'
import { Progress } from './ui/progress'

interface DemoSection {
  id: string
  title: string
  duration: number
  startTime: number
  endTime: number
}

const demoSections: DemoSection[] = [
  { id: 'hook', title: 'The Problem', duration: 10, startTime: 0, endTime: 10 },
  { id: 'problem', title: 'Platform Chaos', duration: 15, startTime: 10, endTime: 25 },
  { id: 'solution', title: 'Meet Verso', duration: 10, startTime: 25, endTime: 35 },
  { id: 'feature1', title: 'Content Capture', duration: 20, startTime: 35, endTime: 55 },
  { id: 'feature2', title: 'AI Organization', duration: 25, startTime: 55, endTime: 80 },
  { id: 'feature3', title: 'Visual Planning', duration: 30, startTime: 80, endTime: 110 },
  { id: 'closing', title: 'Your Next Verse', duration: 10, startTime: 110, endTime: 120 }
]

const platformLogos = [
  { name: 'Instagram', icon: Instagram, color: 'text-pink-500' },
  { name: 'TikTok', icon: Bot, color: 'text-black' },
  { name: 'YouTube', icon: Youtube, color: 'text-red-500' },
  { name: 'Pinterest', icon: Bookmark, color: 'text-red-600' },
  { name: 'Booking.com', icon: MapPin, color: 'text-blue-600' },
  { name: 'Airbnb', icon: Heart, color: 'text-red-500' },
  { name: 'Google Travel', icon: MapPin, color: 'text-blue-500' },
  { name: 'ChatGPT', icon: Bot, color: 'text-green-500' },
  { name: 'Reddit', icon: MessageCircle, color: 'text-orange-500' },
  { name: 'WhatsApp', icon: MessageCircle, color: 'text-green-500' },
  { name: 'Maps', icon: MapPin, color: 'text-blue-500' },
  { name: 'Reviews', icon: Star, color: 'text-yellow-500' }
]

const tokyoContent = [
  { type: 'restaurant', name: 'Tsukiji Fish Market', rating: 4.8, price: '$$', source: '@tokyofoodie' },
  { type: 'activity', name: 'Senso-ji Temple', rating: 4.9, price: 'Free', source: '@japantravel' },
  { type: 'hotel', name: 'Park Hyatt Tokyo', rating: 4.7, price: '$$$', source: '@luxurytravel' },
  { type: 'restaurant', name: 'Ramen Yokocho', rating: 4.6, price: '$', source: '@foodiegram' },
  { type: 'activity', name: 'Tokyo Skytree', rating: 4.5, price: '$$', source: '@citysights' }
]

export function InteractiveDemo() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [currentSection, setCurrentSection] = useState<DemoSection>(demoSections[0])
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentTime(prev => {
          const newTime = prev + 0.1
          if (newTime >= 120) {
            setIsPlaying(false)
            return 120
          }
          return newTime
        })
      }, 100)
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isPlaying])

  useEffect(() => {
    const section = demoSections.find(s => currentTime >= s.startTime && currentTime < s.endTime)
    if (section && section.id !== currentSection.id) {
      setCurrentSection(section)
    }
  }, [currentTime, currentSection.id])

  const handlePlay = () => setIsPlaying(!isPlaying)
  const handleReset = () => {
    setCurrentTime(0)
    setIsPlaying(false)
    setCurrentSection(demoSections[0])
  }

  const handleSectionClick = (section: DemoSection) => {
    setCurrentTime(section.startTime)
    setCurrentSection(section)
  }

  const progress = (currentTime / 120) * 100

  return (
    <div className="w-full max-w-6xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
      {/* Demo Header */}
      <div className="bg-gradient-to-r from-primary to-accent p-6 text-white">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold">Verso - Interactive Demo</h2>
            <p className="text-white/80">Experience the future of travel planning in 2 minutes</p>
          </div>
          <div className="flex items-center space-x-2">
            <Clock className="w-5 h-5" />
            <span className="font-mono text-lg">
              {Math.floor(currentTime / 60)}:{(currentTime % 60).toFixed(1).padStart(4, '0')}
            </span>
          </div>
        </div>
        
        <Progress value={progress} className="h-2 bg-white/20" />
        
        <div className="flex items-center justify-center space-x-4 mt-4">
          <Button
            variant="secondary"
            size="sm"
            onClick={handlePlay}
            className="flex items-center space-x-2"
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            <span>{isPlaying ? 'Pause' : 'Play'}</span>
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={handleReset}
            className="flex items-center space-x-2 text-white border-white/30 hover:bg-white/10"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset</span>
          </Button>
        </div>
      </div>

      {/* Section Navigation */}
      <div className="border-b bg-gray-50 p-4">
        <div className="flex flex-wrap gap-2">
          {demoSections.map((section) => (
            <Button
              key={section.id}
              variant={currentSection.id === section.id ? "default" : "outline"}
              size="sm"
              onClick={() => handleSectionClick(section)}
              className="text-xs"
            >
              {section.title}
            </Button>
          ))}
        </div>
      </div>

      {/* Demo Content */}
      <div className="p-8 min-h-[600px]">
        <AnimatePresence mode="wait">
          {currentSection.id === 'hook' && (
            <HookSection key="hook" currentTime={currentTime} />
          )}
          {currentSection.id === 'problem' && (
            <ProblemSection key="problem" currentTime={currentTime} />
          )}
          {currentSection.id === 'solution' && (
            <SolutionSection key="solution" currentTime={currentTime} />
          )}
          {currentSection.id === 'feature1' && (
            <Feature1Section key="feature1" currentTime={currentTime} />
          )}
          {currentSection.id === 'feature2' && (
            <Feature2Section key="feature2" currentTime={currentTime} />
          )}
          {currentSection.id === 'feature3' && (
            <Feature3Section key="feature3" currentTime={currentTime} />
          )}
          {currentSection.id === 'closing' && (
            <ClosingSection key="closing" currentTime={currentTime} />
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

// Hook Section (0-10 seconds)
function HookSection({ currentTime }: { currentTime: number }) {
  const sectionTime = currentTime - 0

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="text-center space-y-8"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <h1 className="text-4xl font-bold mb-4">
          You see amazing places online...
        </h1>
        <p className="text-xl text-muted-foreground mb-8">
          but turning inspiration into reality? That's where most trips die.
        </p>
      </motion.div>

      {/* Instagram scroll simulation */}
      <div className="max-w-sm mx-auto">
        <div className="bg-black rounded-2xl p-4 shadow-2xl">
          <div className="bg-white rounded-xl overflow-hidden">
            <div className="flex items-center p-3 border-b">
              <Instagram className="w-6 h-6 text-pink-500 mr-2" />
              <span className="font-semibold">Instagram</span>
            </div>
            
            <AnimatePresence>
              {sectionTime > 2 && (
                <motion.div
                  initial={{ y: 100, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="space-y-4 p-4"
                >
                  <div className="bg-gradient-to-r from-orange-400 to-pink-500 h-48 rounded-lg flex items-center justify-center text-white font-bold">
                    Tokyo Street Food
                  </div>
                  <div className="bg-gradient-to-r from-blue-400 to-purple-500 h-48 rounded-lg flex items-center justify-center text-white font-bold">
                    Bali Temples
                  </div>
                  <div className="bg-gradient-to-r from-green-400 to-blue-500 h-48 rounded-lg flex items-center justify-center text-white font-bold">
                    Paris Cafes
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {sectionTime > 7 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="text-6xl mb-4">😵‍💫</div>
          <p className="text-lg text-red-600 font-semibold">
            Overwhelmed by endless options...
          </p>
        </motion.div>
      )}
    </motion.div>
  )
}

// Problem Section (10-25 seconds)
function ProblemSection({ currentTime }: { currentTime: number }) {
  const sectionTime = currentTime - 10

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-8"
    >
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4">
          The problem isn't lack of platforms
        </h2>
        <p className="text-xl text-muted-foreground">
          It's the manual effort and noise involved while planning your trip
        </p>
      </div>

      {/* Platform Logo Wall */}
      {sectionTime > 2 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="grid grid-cols-4 gap-4 max-w-2xl mx-auto mb-8"
        >
          {platformLogos.map((platform, index) => (
            <motion.div
              key={platform.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white border rounded-lg p-4 flex flex-col items-center space-y-2 shadow-sm"
            >
              <platform.icon className={`w-8 h-8 ${platform.color}`} />
              <span className="text-xs font-medium text-center">{platform.name}</span>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Split Screen Chaos */}
      {sectionTime > 5 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Browser Tabs Chaos */}
          <Card className="p-4">
            <CardContent className="p-0">
              <h3 className="font-semibold mb-3 text-red-600">15+ Browser Tabs Open</h3>
              <div className="space-y-2">
                {[
                  'Tokyo restaurants - Google',
                  'Best hotels Tokyo - Booking.com',
                  'Things to do Tokyo - TripAdvisor',
                  'Tokyo travel guide - Lonely Planet',
                  'Tokyo weather - Weather.com',
                  'Tokyo flights - Expedia',
                  'Tokyo itinerary - Reddit',
                  '+ 8 more tabs...'
                ].map((tab, index) => (
                  <motion.div
                    key={tab}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-gray-100 p-2 rounded text-sm truncate"
                  >
                    {tab}
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* WhatsApp Group Chaos */}
          <Card className="p-4">
            <CardContent className="p-0">
              <h3 className="font-semibold mb-3 text-red-600">WhatsApp Group Chaos</h3>
              <div className="space-y-2">
                <div className="bg-green-100 p-2 rounded-lg text-sm">
                  <strong>Sarah:</strong> What about this hotel?
                </div>
                <div className="bg-blue-100 p-2 rounded-lg text-sm">
                  <strong>Mike:</strong> Too expensive! Found cheaper one
                </div>
                <div className="bg-yellow-100 p-2 rounded-lg text-sm">
                  <strong>Lisa:</strong> But the reviews are bad...
                </div>
                <div className="bg-purple-100 p-2 rounded-lg text-sm">
                  <strong>Tom:</strong> What dates again?
                </div>
                <div className="bg-red-100 p-2 rounded-lg text-sm">
                  <strong>Sarah:</strong> I'm so confused now 😵
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {sectionTime > 12 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center bg-red-50 p-6 rounded-lg border border-red-200"
        >
          <div className="text-4xl mb-2">⏰</div>
          <p className="text-lg font-semibold text-red-700">
            7 hours of research → Still no confidence in what to book
          </p>
        </motion.div>
      )}
    </motion.div>
  )
}

// Solution Section (25-35 seconds)
function SolutionSection({ currentTime }: { currentTime: number }) {
  const sectionTime = currentTime - 25

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="text-center space-y-8"
    >
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <h1 className="text-4xl font-bold mb-4">
          Verso eliminates the chaos
        </h1>
        <p className="text-xl text-muted-foreground mb-8">
          From social discovery to confident booking - all in one place
        </p>
      </motion.div>

      {sectionTime > 2 && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto"
        >
          <div className="bg-gradient-to-r from-primary to-accent p-8 rounded-2xl text-white shadow-2xl">
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <Sparkles className="w-8 h-8" />
              </div>
            </div>
            <h2 className="text-3xl font-bold mb-4">Verso</h2>
            <p className="text-xl opacity-90">Your next verse</p>
          </div>
        </motion.div>
      )}

      {sectionTime > 6 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
        >
          <Card className="p-6 text-center">
            <Instagram className="w-12 h-12 text-pink-500 mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Capture</h3>
            <p className="text-sm text-muted-foreground">From social media</p>
          </Card>
          
          <Card className="p-6 text-center">
            <Sparkles className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Organize</h3>
            <p className="text-sm text-muted-foreground">With AI intelligence</p>
          </Card>
          
          <Card className="p-6 text-center">
            <Calendar className="w-12 h-12 text-accent mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Book</h3>
            <p className="text-sm text-muted-foreground">Perfect itineraries</p>
          </Card>
        </motion.div>
      )}
    </motion.div>
  )
}

// Feature 1 Section (35-55 seconds)
function Feature1Section({ currentTime }: { currentTime: number }) {
  const sectionTime = currentTime - 35

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-8"
    >
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4">
          Your personal travel assistant lives everywhere
        </h2>
        <p className="text-xl text-muted-foreground">
          you discover content
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Instagram Demo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          <Card className="p-4">
            <CardContent className="p-0">
              <div className="flex items-center mb-3">
                <Instagram className="w-6 h-6 text-pink-500 mr-2" />
                <span className="font-semibold">Instagram</span>
              </div>
              
              <div className="bg-gradient-to-r from-orange-400 to-pink-500 h-32 rounded-lg mb-3 flex items-center justify-center text-white font-bold">
                Tokyo Foodie Reel
              </div>
              
              {sectionTime > 3 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-2"
                >
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs">
                      U
                    </div>
                    <span className="text-sm">@Verso</span>
                  </div>
                  
                  {sectionTime > 5 && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="bg-green-100 p-2 rounded-lg text-sm text-green-800"
                    >
                      ✨ Content captured to Travel Vault!
                    </motion.div>
                  )}
                </motion.div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* YouTube Demo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2 }}
        >
          <Card className="p-4">
            <CardContent className="p-0">
              <div className="flex items-center mb-3">
                <Youtube className="w-6 h-6 text-red-500 mr-2" />
                <span className="font-semibold">YouTube</span>
              </div>
              
              <div className="bg-gradient-to-r from-red-400 to-pink-500 h-32 rounded-lg mb-3 flex items-center justify-center text-white font-bold">
                Tokyo Travel Guide
              </div>
              
              {sectionTime > 8 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-2"
                >
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs">
                      U
                    </div>
                    <span className="text-sm">@Verso</span>
                  </div>
                  
                  {sectionTime > 10 && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="bg-green-100 p-2 rounded-lg text-sm text-green-800"
                    >
                      ✨ Added to Tokyo collection!
                    </motion.div>
                  )}
                </motion.div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* WhatsApp Demo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3 }}
        >
          <Card className="p-4">
            <CardContent className="p-0">
              <div className="flex items-center mb-3">
                <MessageCircle className="w-6 h-6 text-green-500 mr-2" />
                <span className="font-semibold">WhatsApp</span>
              </div>
              
              {sectionTime > 12 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-2"
                >
                  <div className="bg-blue-100 p-2 rounded-lg text-sm">
                    <strong>You:</strong> *forwards reel*
                  </div>
                  
                  {sectionTime > 14 && (
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="bg-green-100 p-2 rounded-lg text-sm"
                    >
                      <strong>Verso Bot:</strong> Added to your Tokyo collection! 🗾
                    </motion.div>
                  )}
                </motion.div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {sectionTime > 16 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center bg-primary/10 p-6 rounded-lg"
        >
          <p className="text-lg font-semibold text-primary">
            Comment @Verso anywhere you discover content
          </p>
        </motion.div>
      )}
    </motion.div>
  )
}

// Feature 2 Section (55-80 seconds)
function Feature2Section({ currentTime }: { currentTime: number }) {
  const sectionTime = currentTime - 55

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-8"
    >
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4">
          Your scattered discoveries become
        </h2>
        <p className="text-xl gradient-text font-bold">
          organized travel intelligence
        </p>
      </div>

      {/* Travel Vault Growth Animation */}
      <div className="max-w-4xl mx-auto">
        <Card className="p-6">
          <CardContent className="p-0">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold">Travel Vault</h3>
              <Badge variant="secondary">
                {sectionTime > 5 ? '30' : sectionTime > 3 ? '15' : '5'} items
              </Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {/* Tokyo Section */}
              <div className="space-y-3">
                <h4 className="font-semibold text-orange-600">🗾 Tokyo</h4>
                <AnimatePresence>
                  {tokyoContent.slice(0, sectionTime > 5 ? 5 : sectionTime > 3 ? 3 : 2).map((item, index) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.2 }}
                      className="bg-white border rounded-lg p-3"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium text-sm">{item.name}</span>
                        <div className="flex items-center space-x-1">
                          <Star className="w-3 h-3 text-yellow-500" />
                          <span className="text-xs">{item.rating}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>{item.price}</span>
                        <span>{item.source}</span>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* Bangkok Section */}
              {sectionTime > 3 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-3"
                >
                  <h4 className="font-semibold text-green-600">🇹🇭 Bangkok</h4>
                  <div className="bg-white border rounded-lg p-3">
                    <span className="font-medium text-sm">Floating Market</span>
                  </div>
                  <div className="bg-white border rounded-lg p-3">
                    <span className="font-medium text-sm">Grand Palace</span>
                  </div>
                </motion.div>
              )}

              {/* Seoul Section */}
              {sectionTime > 5 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-3"
                >
                  <h4 className="font-semibold text-purple-600">🇰🇷 Seoul</h4>
                  <div className="bg-white border rounded-lg p-3">
                    <span className="font-medium text-sm">Myeongdong</span>
                  </div>
                  <div className="bg-white border rounded-lg p-3">
                    <span className="font-medium text-sm">Bukchon Village</span>
                  </div>
                </motion.div>
              )}
            </div>

            {/* AI Analysis */}
            {sectionTime > 10 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-r from-primary/10 to-accent/10 p-4 rounded-lg"
              >
                <div className="flex items-center mb-3">
                  <Sparkles className="w-5 h-5 text-primary mr-2" />
                  <span className="font-semibold">AI Analysis</span>
                </div>
                
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-orange-600">8</div>
                    <div className="text-sm text-muted-foreground">Restaurants</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-blue-600">5</div>
                    <div className="text-sm text-muted-foreground">Activities</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-purple-600">3</div>
                    <div className="text-sm text-muted-foreground">Hotels</div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Generated Itinerary Preview */}
            {sectionTime > 17 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 bg-accent/10 p-4 rounded-lg"
              >
                <h4 className="font-semibold mb-3">✨ Generated Tokyo Itinerary</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Based on your shared content, here's your Tokyo trip:
                </p>
                
                <div className="space-y-2">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-xs font-bold">
                      1
                    </div>
                    <span className="text-sm">Morning: Tsukiji Fish Market</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-xs font-bold">
                      2
                    </div>
                    <span className="text-sm">Afternoon: Senso-ji Temple</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-xs font-bold">
                      3
                    </div>
                    <span className="text-sm">Evening: Ramen Yokocho</span>
                  </div>
                </div>
              </motion.div>
            )}
          </CardContent>
        </Card>
      </div>

      {sectionTime > 20 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center bg-accent/10 p-6 rounded-lg"
        >
          <p className="text-lg font-semibold text-accent">
            AI organizes everything you've ever been interested in
          </p>
        </motion.div>
      )}
    </motion.div>
  )
}

// Feature 3 Section (80-110 seconds)
function Feature3Section({ currentTime }: { currentTime: number }) {
  const sectionTime = currentTime - 80

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-8"
    >
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4">
          See your trip before you book it
        </h2>
        <p className="text-xl text-muted-foreground">
          with full context of why you chose each place
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Map View */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1 }}
        >
          <Card className="p-4">
            <CardContent className="p-0">
              <h3 className="font-semibold mb-4 flex items-center">
                <MapPin className="w-5 h-5 mr-2 text-primary" />
                Interactive Tokyo Map
              </h3>
              
              <div className="bg-gradient-to-br from-blue-100 to-green-100 h-64 rounded-lg relative overflow-hidden">
                {/* Map pins */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 2 }}
                  className="absolute top-16 left-20 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform"
                >
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </motion.div>
                
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 2.5 }}
                  className="absolute top-32 right-24 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform"
                >
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </motion.div>
                
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 3 }}
                  className="absolute bottom-20 left-32 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform"
                >
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </motion.div>

                {/* Hover tooltip */}
                {sectionTime > 7 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute top-8 left-16 bg-white p-3 rounded-lg shadow-lg border max-w-48"
                  >
                    <div className="text-sm font-semibold">Tsukiji Fish Market</div>
                    <div className="text-xs text-muted-foreground mb-2">⭐ 4.8 • $$</div>
                    <div className="text-xs text-blue-600">
                      You saved this from @tokyofoodie's reel
                    </div>
                  </motion.div>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Booking Integration */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.5 }}
          className="space-y-4"
        >
          <Card className="p-4">
            <CardContent className="p-0">
              <h3 className="font-semibold mb-4 flex items-center">
                <DollarSign className="w-5 h-5 mr-2 text-green-600" />
                Real-time Booking
              </h3>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm font-medium">Park Hyatt Tokyo</span>
                  <div className="text-right">
                    <div className="text-sm font-bold">$450/night</div>
                    <div className="text-xs text-green-600">Available</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Badge variant="outline" className="text-xs">Booking.com</Badge>
                  <Badge variant="outline" className="text-xs">Klook</Badge>
                  <Badge variant="outline" className="text-xs">Airbnb</Badge>
                </div>
                
                {sectionTime > 15 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <Button className="w-full" size="sm">
                      Book Now
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </motion.div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Calendar View */}
          {sectionTime > 20 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="p-4">
                <CardContent className="p-0">
                  <h3 className="font-semibold mb-4 flex items-center">
                    <Calendar className="w-5 h-5 mr-2 text-purple-600" />
                    Optimized Schedule
                  </h3>
                  
                  <div className="space-y-2">
                    <div className="flex items-center space-x-3 p-2 bg-purple-50 rounded">
                      <div className="text-xs font-bold text-purple-600">9 AM</div>
                      <span className="text-sm">Tsukiji Fish Market</span>
                    </div>
                    <div className="flex items-center space-x-3 p-2 bg-blue-50 rounded">
                      <div className="text-xs font-bold text-blue-600">2 PM</div>
                      <span className="text-sm">Senso-ji Temple</span>
                    </div>
                    <div className="flex items-center space-x-3 p-2 bg-orange-50 rounded">
                      <div className="text-xs font-bold text-orange-600">7 PM</div>
                      <span className="text-sm">Ramen Yokocho</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </motion.div>
      </div>

      {sectionTime > 25 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center bg-gradient-to-r from-primary/10 to-accent/10 p-6 rounded-lg"
        >
          <p className="text-lg font-semibold gradient-text">
            From inspiration to booking in one seamless flow
          </p>
        </motion.div>
      )}
    </motion.div>
  )
}

// Closing Section (110-120 seconds)
function ClosingSection({ currentTime }: { currentTime: number }) {
  const sectionTime = currentTime - 110

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="text-center space-y-8"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <h1 className="text-4xl font-bold mb-4">
          Never lose another travel discovery
        </h1>
        <p className="text-2xl gradient-text font-bold">
          Your next verse awaits
        </p>
      </motion.div>

      {sectionTime > 3 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
        >
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-orange-400 to-pink-500 rounded-full mx-auto mb-3 flex items-center justify-center">
              <span className="text-white text-2xl">🍜</span>
            </div>
            <p className="text-sm">Tokyo restaurant from the reel</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-blue-500 rounded-full mx-auto mb-3 flex items-center justify-center">
              <span className="text-white text-2xl">⛩️</span>
            </div>
            <p className="text-sm">Temple from YouTube video</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-teal-500 rounded-full mx-auto mb-3 flex items-center justify-center">
              <span className="text-white text-2xl">😊</span>
            </div>
            <p className="text-sm">Happy travelers living their plans</p>
          </div>
        </motion.div>
      )}

      {sectionTime > 7 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md mx-auto"
        >
          <div className="bg-gradient-to-r from-primary to-accent p-6 rounded-2xl text-white">
            <div className="flex items-center justify-center mb-4">
              <Sparkles className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Verso</h2>
            <p className="text-lg opacity-90 mb-4">Your next verse</p>
            <Button variant="secondary" className="w-full">
              Start Your Journey
            </Button>
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}