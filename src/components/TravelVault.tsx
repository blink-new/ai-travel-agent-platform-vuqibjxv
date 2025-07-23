import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Search, 
  Filter, 
  Grid3X3, 
  List, 
  MapPin, 
  Calendar, 
  Tag, 
  Heart, 
  Share2, 
  ExternalLink,
  Instagram,
  Twitter,
  MessageCircle,
  Sparkles,
  TrendingUp,
  Clock,
  Eye,
  Bookmark,
  MoreHorizontal,
  Download,
  Star
} from 'lucide-react'
import { Button } from './ui/button'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Input } from './ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu'
import { blink } from '../blink/client'

interface VaultContent {
  id: string
  platform: 'instagram' | 'twitter' | 'whatsapp'
  postUrl: string
  imageUrl?: string
  caption: string
  location?: string
  tags: string[]
  savedAt: string
  originalCreator: string
  aiAnalysis: {
    sentiment: 'positive' | 'negative' | 'neutral'
    category: string
    confidence: number
    insights: string[]
  }
  engagement: {
    likes: number
    comments: number
    shares: number
  }
  isBookmarked: boolean
}

interface VaultStats {
  totalSaved: number
  thisWeek: number
  topDestination: string
  avgSentiment: number
}

export function TravelVault() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedPlatform, setSelectedPlatform] = useState('all')
  const [sortBy, setSortBy] = useState('recent')

  const [vaultStats] = useState<VaultStats>({
    totalSaved: 127,
    thisWeek: 24,
    topDestination: 'Greece',
    avgSentiment: 4.2
  })

  const [vaultContent] = useState<VaultContent[]>([
    {
      id: '1',
      platform: 'instagram',
      postUrl: 'https://instagram.com/p/example1',
      imageUrl: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=400&h=300&fit=crop',
      caption: 'Amazing sunset at Santorini! The colors were absolutely breathtaking 🌅 Perfect spot for photography',
      location: 'Santorini, Greece',
      tags: ['sunset', 'greece', 'photography', 'luxury', 'romantic'],
      savedAt: '2024-01-15T10:30:00Z',
      originalCreator: '@greektravelpro',
      aiAnalysis: {
        sentiment: 'positive',
        category: 'scenic',
        confidence: 95,
        insights: [
          'Perfect for sunset photography',
          'Romantic destination',
          'Best visited April-October'
        ]
      },
      engagement: {
        likes: 1247,
        comments: 89,
        shares: 34
      },
      isBookmarked: true
    },
    {
      id: '2',
      platform: 'instagram',
      postUrl: 'https://instagram.com/p/example2',
      imageUrl: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=300&fit=crop',
      caption: 'Best pasta I\'ve ever had in Rome! This little trattoria is a hidden gem 🍝 Authentic Italian flavors',
      location: 'Rome, Italy',
      tags: ['food', 'italy', 'restaurant', 'authentic', 'pasta'],
      savedAt: '2024-01-14T15:45:00Z',
      originalCreator: '@italianfoodie',
      aiAnalysis: {
        sentiment: 'positive',
        category: 'culinary',
        confidence: 92,
        insights: [
          'Authentic local cuisine',
          'Hidden gem restaurant',
          'Must-try pasta dishes'
        ]
      },
      engagement: {
        likes: 892,
        comments: 156,
        shares: 67
      },
      isBookmarked: false
    },
    {
      id: '3',
      platform: 'whatsapp',
      postUrl: '',
      imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
      caption: 'Incredible hiking trail in the Swiss Alps! The views were worth every step 🏔️',
      location: 'Swiss Alps, Switzerland',
      tags: ['hiking', 'mountains', 'adventure', 'switzerland', 'nature'],
      savedAt: '2024-01-13T09:20:00Z',
      originalCreator: '@alpineadventurer',
      aiAnalysis: {
        sentiment: 'positive',
        category: 'adventure',
        confidence: 88,
        insights: [
          'Challenging hiking trail',
          'Best for experienced hikers',
          'Stunning mountain views'
        ]
      },
      engagement: {
        likes: 0,
        comments: 0,
        shares: 0
      },
      isBookmarked: true
    },
    {
      id: '4',
      platform: 'twitter',
      postUrl: 'https://twitter.com/user/status/example',
      imageUrl: 'https://images.unsplash.com/photo-1539650116574-75c0c6d73c6e?w=400&h=300&fit=crop',
      caption: 'Tokyo street food scene is absolutely incredible! Every corner has something delicious 🍜',
      location: 'Tokyo, Japan',
      tags: ['food', 'japan', 'street-food', 'culture', 'urban'],
      savedAt: '2024-01-12T18:15:00Z',
      originalCreator: '@tokyofoodie',
      aiAnalysis: {
        sentiment: 'positive',
        category: 'culinary',
        confidence: 90,
        insights: [
          'Diverse street food options',
          'Cultural food experience',
          'Budget-friendly dining'
        ]
      },
      engagement: {
        likes: 567,
        comments: 43,
        shares: 89
      },
      isBookmarked: false
    }
  ])

  const [filteredContent, setFilteredContent] = useState(vaultContent)

  useEffect(() => {
    let filtered = vaultContent

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(content => 
        content.caption.toLowerCase().includes(searchQuery.toLowerCase()) ||
        content.location?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        content.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    }

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(content => content.aiAnalysis.category === selectedCategory)
    }

    // Platform filter
    if (selectedPlatform !== 'all') {
      filtered = filtered.filter(content => content.platform === selectedPlatform)
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'recent':
          return new Date(b.savedAt).getTime() - new Date(a.savedAt).getTime()
        case 'oldest':
          return new Date(a.savedAt).getTime() - new Date(b.savedAt).getTime()
        case 'popular':
          return b.engagement.likes - a.engagement.likes
        case 'bookmarked':
          return Number(b.isBookmarked) - Number(a.isBookmarked)
        default:
          return 0
      }
    })

    setFilteredContent(filtered)
  }, [searchQuery, selectedCategory, selectedPlatform, sortBy, vaultContent])

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'instagram': return Instagram
      case 'twitter': return Twitter
      case 'whatsapp': return MessageCircle
      default: return Bookmark
    }
  }

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case 'instagram': return 'text-pink-500'
      case 'twitter': return 'text-blue-500'
      case 'whatsapp': return 'text-green-500'
      default: return 'text-gray-500'
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'scenic': return 'bg-blue-100 text-blue-800'
      case 'culinary': return 'bg-orange-100 text-orange-800'
      case 'adventure': return 'bg-green-100 text-green-800'
      case 'culture': return 'bg-purple-100 text-purple-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const toggleBookmark = (id: string) => {
    // In a real app, this would update the backend
    console.log('Toggle bookmark for:', id)
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">Travel Inspiration Vault</h1>
              <p className="text-muted-foreground">
                Your personal collection of travel inspiration from across social media
              </p>
            </div>
            <Button>
              <Download className="w-4 h-4 mr-2" />
              Export Vault
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Bookmark className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-2xl font-bold">{vaultStats.totalSaved}</p>
                    <p className="text-sm text-muted-foreground">Total Saved</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5 text-accent" />
                  <div>
                    <p className="text-2xl font-bold">{vaultStats.thisWeek}</p>
                    <p className="text-sm text-muted-foreground">This Week</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-5 h-5 text-blue-500" />
                  <div>
                    <p className="text-2xl font-bold">{vaultStats.topDestination}</p>
                    <p className="text-sm text-muted-foreground">Top Destination</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Star className="w-5 h-5 text-yellow-500" />
                  <div>
                    <p className="text-2xl font-bold">{vaultStats.avgSentiment}/5</p>
                    <p className="text-sm text-muted-foreground">Avg Rating</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Filters and Controls */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search your vault..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="scenic">Scenic</SelectItem>
                <SelectItem value="culinary">Culinary</SelectItem>
                <SelectItem value="adventure">Adventure</SelectItem>
                <SelectItem value="culture">Culture</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedPlatform} onValueChange={setSelectedPlatform}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Platform" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Platforms</SelectItem>
                <SelectItem value="instagram">Instagram</SelectItem>
                <SelectItem value="twitter">Twitter</SelectItem>
                <SelectItem value="whatsapp">WhatsApp</SelectItem>
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recent">Most Recent</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
                <SelectItem value="popular">Most Popular</SelectItem>
                <SelectItem value="bookmarked">Bookmarked</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex items-center border rounded-md">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <Grid3X3 className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Content Grid/List */}
        <AnimatePresence mode="wait">
          {viewMode === 'grid' ? (
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {filteredContent.map((content) => {
                const Icon = getPlatformIcon(content.platform)
                return (
                  <motion.div
                    key={content.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Card className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
                      {content.imageUrl && (
                        <div className="relative aspect-video overflow-hidden">
                          <img
                            src={content.imageUrl}
                            alt={content.caption}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute top-2 left-2">
                            <Icon className={`w-4 h-4 ${getPlatformColor(content.platform)} bg-white rounded-full p-1`} />
                          </div>
                          <div className="absolute top-2 right-2">
                            <Button
                              size="sm"
                              variant="ghost"
                              className="bg-white/80 hover:bg-white"
                              onClick={() => toggleBookmark(content.id)}
                            >
                              <Heart className={`w-4 h-4 ${content.isBookmarked ? 'fill-red-500 text-red-500' : ''}`} />
                            </Button>
                          </div>
                        </div>
                      )}
                      
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <Badge className={getCategoryColor(content.aiAnalysis.category)}>
                            {content.aiAnalysis.category}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {new Date(content.savedAt).toLocaleDateString()}
                          </span>
                        </div>

                        <p className="text-sm mb-3 line-clamp-2">{content.caption}</p>

                        {content.location && (
                          <div className="flex items-center space-x-1 mb-2">
                            <MapPin className="w-3 h-3 text-muted-foreground" />
                            <span className="text-xs text-muted-foreground">{content.location}</span>
                          </div>
                        )}

                        <div className="flex flex-wrap gap-1 mb-3">
                          {content.tags.slice(0, 3).map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              #{tag}
                            </Badge>
                          ))}
                          {content.tags.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{content.tags.length - 3}
                            </Badge>
                          )}
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="text-xs text-muted-foreground">
                            by {content.originalCreator}
                          </span>
                          <div className="flex items-center space-x-1">
                            <Button size="sm" variant="ghost">
                              <Eye className="w-3 h-3" />
                            </Button>
                            <Button size="sm" variant="ghost">
                              <Share2 className="w-3 h-3" />
                            </Button>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button size="sm" variant="ghost">
                                  <MoreHorizontal className="w-3 h-3" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent>
                                <DropdownMenuItem>
                                  <ExternalLink className="w-3 h-3 mr-2" />
                                  View Original
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Sparkles className="w-3 h-3 mr-2" />
                                  AI Insights
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Calendar className="w-3 h-3 mr-2" />
                                  Add to Itinerary
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )
              })}
            </motion.div>
          ) : (
            <motion.div
              key="list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-4"
            >
              {filteredContent.map((content) => {
                const Icon = getPlatformIcon(content.platform)
                return (
                  <motion.div
                    key={content.id}
                    layout
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Card className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-start space-x-4">
                          {content.imageUrl && (
                            <div className="relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                              <img
                                src={content.imageUrl}
                                alt={content.caption}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          )}
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center space-x-2">
                                <Icon className={`w-4 h-4 ${getPlatformColor(content.platform)}`} />
                                <Badge className={getCategoryColor(content.aiAnalysis.category)}>
                                  {content.aiAnalysis.category}
                                </Badge>
                                <span className="text-sm text-muted-foreground">
                                  {content.originalCreator}
                                </span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <span className="text-xs text-muted-foreground">
                                  {new Date(content.savedAt).toLocaleDateString()}
                                </span>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => toggleBookmark(content.id)}
                                >
                                  <Heart className={`w-4 h-4 ${content.isBookmarked ? 'fill-red-500 text-red-500' : ''}`} />
                                </Button>
                              </div>
                            </div>

                            <p className="text-sm mb-2 line-clamp-2">{content.caption}</p>

                            {content.location && (
                              <div className="flex items-center space-x-1 mb-2">
                                <MapPin className="w-3 h-3 text-muted-foreground" />
                                <span className="text-xs text-muted-foreground">{content.location}</span>
                              </div>
                            )}

                            <div className="flex items-center justify-between">
                              <div className="flex flex-wrap gap-1">
                                {content.tags.slice(0, 4).map((tag) => (
                                  <Badge key={tag} variant="outline" className="text-xs">
                                    #{tag}
                                  </Badge>
                                ))}
                                {content.tags.length > 4 && (
                                  <Badge variant="outline" className="text-xs">
                                    +{content.tags.length - 4}
                                  </Badge>
                                )}
                              </div>

                              <div className="flex items-center space-x-1">
                                <Button size="sm" variant="ghost">
                                  <Eye className="w-3 h-3" />
                                </Button>
                                <Button size="sm" variant="ghost">
                                  <Share2 className="w-3 h-3" />
                                </Button>
                                <Button size="sm" variant="ghost">
                                  <ExternalLink className="w-3 h-3" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )
              })}
            </motion.div>
          )}
        </AnimatePresence>

        {filteredContent.length === 0 && (
          <div className="text-center py-12">
            <Bookmark className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No content found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search or filters, or start saving content by tagging @VersoBot on social media!
            </p>
          </div>
        )}
      </div>
    </div>
  )
}