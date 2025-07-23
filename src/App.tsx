import React, { useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { 
  Instagram, 
  Send, 
  MapPin, 
  Calendar,
  Star,
  ArrowRight,
  X,
  Check
} from 'lucide-react'

function App() {
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [showWaitlistModal, setShowWaitlistModal] = useState(false)
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])

  const handleWaitlistSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setIsSubmitted(true)
      setTimeout(() => {
        setShowWaitlistModal(false)
        setIsSubmitted(false)
        setEmail('')
      }, 2000)
    }
  }

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Sticky Waitlist Button */}
      <motion.button
        onClick={() => setShowWaitlistModal(true)}
        className="sticky-waitlist bg-gradient-to-r from-orange-400 to-orange-500 text-white px-6 py-3 rounded-full font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center gap-2"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <span className="hidden sm:inline">Join the Waitlist</span>
        <span className="sm:hidden">Join Waitlist</span>
        <ArrowRight className="w-4 h-4" />
      </motion.button>

      {/* Hero Section - Travel Content → Bookable Trip */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
        {/* Background Elements */}
        <motion.div 
          style={{ y }}
          className="absolute inset-0 opacity-5"
        >
          <div className="absolute top-20 left-10 w-32 h-32 bg-orange-200 rounded-full animate-float" />
          <div className="absolute top-40 right-20 w-24 h-24 bg-orange-300 rounded-full animate-float" style={{ animationDelay: '2s' }} />
          <div className="absolute bottom-40 left-1/4 w-20 h-20 bg-orange-100 rounded-full animate-float" style={{ animationDelay: '4s' }} />
        </motion.div>

        <div className="container mx-auto px-6 text-center relative z-10">
          {/* Main Headline */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-12"
          >
            <h1 className="text-5xl md:text-7xl font-light text-gray-900 mb-6 leading-tight">
              Your saved travel content,
              <br />
              <span className="bg-gradient-to-r from-orange-400 to-orange-500 bg-clip-text text-transparent font-medium">
                organized beautifully.
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 font-light">
              From reels to real itineraries.
            </p>
          </motion.div>

          {/* Content Flow Animation */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 max-w-4xl mx-auto"
          >
            {/* Instagram Reel */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="bg-gradient-to-br from-pink-50 to-purple-50 p-6 rounded-2xl"
            >
              <div className="flex items-center gap-3 mb-4">
                <Instagram className="w-6 h-6 text-pink-500" />
                <span className="text-sm font-medium text-gray-700">Instagram Reel</span>
              </div>
              <div className="bg-white rounded-lg p-4 mb-4">
                <div className="w-full h-32 bg-gradient-to-br from-orange-200 to-orange-300 rounded-lg mb-3 flex items-center justify-center">
                  <span className="text-orange-700 font-medium">Lisbon Café</span>
                </div>
                <p className="text-sm text-gray-600">Hidden gem in Alfama district</p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="w-full bg-orange-500 text-white py-2 rounded-lg font-medium flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                Send to Verso
              </motion.button>
            </motion.div>

            {/* TikTok */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
              className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-2xl"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">T</span>
                </div>
                <span className="text-sm font-medium text-gray-700">TikTok</span>
              </div>
              <div className="bg-white rounded-lg p-4 mb-4">
                <div className="w-full h-32 bg-gradient-to-br from-blue-200 to-teal-300 rounded-lg mb-3 flex items-center justify-center">
                  <span className="text-teal-700 font-medium">Bali Beach</span>
                </div>
                <p className="text-sm text-gray-600">Secret sunset spot</p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="w-full bg-orange-500 text-white py-2 rounded-lg font-medium flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                Send to Verso
              </motion.button>
            </motion.div>

            {/* Travel Blog */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-2xl"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">B</span>
                </div>
                <span className="text-sm font-medium text-gray-700">Travel Blog</span>
              </div>
              <div className="bg-white rounded-lg p-4 mb-4">
                <div className="w-full h-32 bg-gradient-to-br from-red-200 to-pink-300 rounded-lg mb-3 flex items-center justify-center">
                  <span className="text-red-700 font-medium">Tokyo Guide</span>
                </div>
                <p className="text-sm text-gray-600">Best ramen spots</p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="w-full bg-orange-500 text-white py-2 rounded-lg font-medium flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                Send to Verso
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Arrow Down */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            className="mb-8"
          >
            <div className="flex justify-center">
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="text-orange-500"
              >
                ↓
              </motion.div>
            </div>
          </motion.div>

          {/* Verso Dashboard Preview */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8, duration: 0.8 }}
            className="bg-white rounded-2xl shadow-2xl p-8 max-w-4xl mx-auto"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-gradient-to-r from-orange-400 to-orange-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">V</span>
              </div>
              <span className="font-medium text-gray-900">Verso Dashboard</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-orange-50 p-4 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-2">Lisbon Trip</h3>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <span>3 locations saved</span>
                </div>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-2">Bali Adventure</h3>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <span>5 locations saved</span>
                </div>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-2">Tokyo Food Tour</h3>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <span>8 locations saved</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Chaos → Calm Section */}
      <section className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Before - Chaos */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <h2 className="text-3xl font-light text-gray-900 mb-8">
                <span className="text-red-500">Scattered.</span> Forgotten. Stressful.
              </h2>
              
              <div className="relative">
                {/* Chaotic collage */}
                <div className="grid grid-cols-3 gap-2 transform rotate-2">
                  <div className="bg-pink-200 p-3 rounded-lg transform -rotate-3">
                    <Instagram className="w-6 h-6 text-pink-600 mb-2" />
                    <div className="h-16 bg-pink-300 rounded"></div>
                  </div>
                  <div className="bg-gray-200 p-3 rounded-lg transform rotate-2">
                    <div className="w-6 h-6 bg-black rounded-full mb-2"></div>
                    <div className="h-16 bg-gray-300 rounded"></div>
                  </div>
                  <div className="bg-blue-200 p-3 rounded-lg transform -rotate-1">
                    <div className="w-6 h-6 bg-blue-600 rounded mb-2"></div>
                    <div className="h-16 bg-blue-300 rounded"></div>
                  </div>
                  <div className="bg-green-200 p-3 rounded-lg transform rotate-3">
                    <div className="w-6 h-6 bg-green-600 rounded mb-2"></div>
                    <div className="h-16 bg-green-300 rounded"></div>
                  </div>
                  <div className="bg-purple-200 p-3 rounded-lg transform -rotate-2">
                    <div className="w-6 h-6 bg-purple-600 rounded mb-2"></div>
                    <div className="h-16 bg-purple-300 rounded"></div>
                  </div>
                  <div className="bg-yellow-200 p-3 rounded-lg transform rotate-1">
                    <div className="w-6 h-6 bg-yellow-600 rounded mb-2"></div>
                    <div className="h-16 bg-yellow-300 rounded"></div>
                  </div>
                </div>
                
                {/* Scattered elements */}
                <div className="absolute -top-4 -right-4 bg-red-200 p-2 rounded transform rotate-12">
                  <span className="text-xs text-red-700">Link saved</span>
                </div>
                <div className="absolute -bottom-4 -left-4 bg-orange-200 p-2 rounded transform -rotate-12">
                  <span className="text-xs text-orange-700">Screenshot</span>
                </div>
              </div>
            </motion.div>

            {/* After - Calm */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-center"
            >
              <h2 className="text-3xl font-light text-gray-900 mb-8">
                <span className="text-green-500">Organized.</span> Bookable. Effortless.
              </h2>
              
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 bg-gradient-to-r from-orange-400 to-orange-500 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">V</span>
                  </div>
                  <span className="font-medium text-gray-900">Your Trips</span>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 bg-orange-50 rounded-lg">
                    <div className="w-12 h-12 bg-orange-200 rounded-lg"></div>
                    <div className="flex-1 text-left">
                      <h3 className="font-medium text-gray-900">Europe Adventure</h3>
                      <p className="text-sm text-gray-600">12 saved locations</p>
                    </div>
                    <Calendar className="w-5 h-5 text-orange-500" />
                  </div>
                  
                  <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-lg">
                    <div className="w-12 h-12 bg-blue-200 rounded-lg"></div>
                    <div className="flex-1 text-left">
                      <h3 className="font-medium text-gray-900">Southeast Asia</h3>
                      <p className="text-sm text-gray-600">8 saved locations</p>
                    </div>
                    <Calendar className="w-5 h-5 text-blue-500" />
                  </div>
                  
                  <div className="flex items-center gap-4 p-4 bg-green-50 rounded-lg">
                    <div className="w-12 h-12 bg-green-200 rounded-lg"></div>
                    <div className="flex-1 text-left">
                      <h3 className="font-medium text-gray-900">Japan Food Tour</h3>
                      <p className="text-sm text-gray-600">15 saved locations</p>
                    </div>
                    <Calendar className="w-5 h-5 text-green-500" />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Smart Itinerary Building */}
      <section className="min-h-screen flex items-center justify-center bg-white">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">
              You save. <span className="text-orange-500 font-medium">We plan.</span>
            </h2>
            <p className="text-xl text-gray-600 font-light">
              Every reel becomes a real stop.
            </p>
          </motion.div>

          {/* Interactive Demo */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="max-w-6xl mx-auto"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left - Saved Content */}
              <div className="space-y-6">
                <h3 className="text-2xl font-medium text-gray-900 mb-6">Your Saved Content</h3>
                
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-2xl cursor-pointer"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 bg-orange-200 rounded-xl flex items-center justify-center">
                      <span className="text-orange-700 font-medium">☕</span>
                    </div>
                    <div className="flex-1 text-left">
                      <h4 className="font-medium text-gray-900">Hidden Café in Lisbon</h4>
                      <p className="text-sm text-gray-600">From Instagram reel</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-orange-600">
                    <MapPin className="w-4 h-4" />
                    <span>Alfama District</span>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-2xl cursor-pointer"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 bg-blue-200 rounded-xl flex items-center justify-center">
                      <span className="text-blue-700 font-medium">🏖️</span>
                    </div>
                    <div className="flex-1 text-left">
                      <h4 className="font-medium text-gray-900">Secret Beach Spot</h4>
                      <p className="text-sm text-gray-600">From TikTok</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-blue-600">
                    <MapPin className="w-4 h-4" />
                    <span>Cascais</span>
                  </div>
                </motion.div>
              </div>

              {/* Right - Generated Itinerary */}
              <div className="bg-white rounded-2xl shadow-2xl p-8">
                <h3 className="text-2xl font-medium text-gray-900 mb-6">Generated Itinerary</h3>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                    <div className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-medium">
                      1
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">Morning Coffee</h4>
                      <p className="text-sm text-gray-600 mb-2">Hidden Café in Alfama</p>
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span>9:00 AM</span>
                        <span>•</span>
                        <span>30 min walk from hotel</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                    <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-medium">
                      2
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">Beach Time</h4>
                      <p className="text-sm text-gray-600 mb-2">Secret spot in Cascais</p>
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span>2:00 PM</span>
                        <span>•</span>
                        <span>25 min train ride</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 bg-green-50 rounded-lg">
                    <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-medium">
                      +
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">Nearby Suggestions</h4>
                      <p className="text-sm text-gray-600">2 restaurants, 1 viewpoint</p>
                    </div>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  className="w-full mt-6 bg-gradient-to-r from-orange-400 to-orange-500 text-white py-3 rounded-lg font-medium"
                >
                  Book This Itinerary
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Social Proof + Final CTA */}
      <section className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">
              Be first to use Verso.
            </h2>
            <p className="text-xl text-gray-600 font-light">
              Built for travelers who scroll.
            </p>
          </motion.div>

          {/* Testimonials */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 max-w-6xl mx-auto"
          >
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 mb-6 italic">
                "Verso turned my 50+ reels into the perfect Italy trip."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-pink-200 to-pink-300 rounded-full"></div>
                <div className="text-left">
                  <p className="font-medium text-gray-900">Sarah Chen</p>
                  <p className="text-sm text-gray-600">Travel Blogger</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 mb-6 italic">
                "I didn't need to start from scratch this time."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-200 to-blue-300 rounded-full"></div>
                <div className="text-left">
                  <p className="font-medium text-gray-900">Marcus Johnson</p>
                  <p className="text-sm text-gray-600">Digital Nomad</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 mb-6 italic">
                "Finally a way to make use of all my saved Bali posts."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-green-200 to-green-300 rounded-full"></div>
                <div className="text-left">
                  <p className="font-medium text-gray-900">Emma Rodriguez</p>
                  <p className="text-sm text-gray-600">Content Creator</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Final Waitlist Form */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="max-w-md mx-auto"
          >
            <form onSubmit={handleWaitlistSubmit} className="flex gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                required
              />
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-orange-400 to-orange-500 text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg transition-all duration-300"
              >
                Join Waitlist
              </motion.button>
            </form>
            <p className="text-sm text-gray-600 mt-3">
              Get early access before launch.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Waitlist Modal */}
      {showWaitlistModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={() => setShowWaitlistModal(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-2xl p-8 max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-medium text-gray-900">Join the Waitlist</h3>
              <button
                onClick={() => setShowWaitlistModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {!isSubmitted ? (
              <form onSubmit={handleWaitlistSubmit}>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    required
                  />
                </div>
                
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-orange-400 to-orange-500 text-white py-3 rounded-lg font-medium hover:shadow-lg transition-all duration-300"
                >
                  Get Early Access
                </motion.button>
                
                <p className="text-sm text-gray-600 mt-4 text-center">
                  Be among the first to transform your travel inspiration into reality.
                </p>
              </form>
            ) : (
              <div className="text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
                >
                  <Check className="w-8 h-8 text-green-600" />
                </motion.div>
                <h4 className="text-xl font-medium text-gray-900 mb-2">You're on the list!</h4>
                <p className="text-gray-600">
                  We'll notify you as soon as Verso is ready.
                </p>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}

export default App