import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Instagram, 
  Twitter, 
  MessageCircle, 
  Bot, 
  Zap, 
  Settings, 
  Eye,
  Heart,
  MessageSquare,
  Share2,
  TrendingUp,
  Users,
  Calendar,
  CheckCircle,
  AlertCircle,
  Clock,
  ExternalLink,
  MapPin
} from 'lucide-react'
import { Button } from './ui/button'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Switch } from './ui/switch'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Separator } from './ui/separator'
import { blink } from '../blink/client'

interface BotStatus {
  platform: 'instagram' | 'twitter' | 'whatsapp'
  isActive: boolean
  lastActivity: string
  totalTags: number
  responseRate: number
}

interface SavedContent {
  id: string
  platform: 'instagram' | 'twitter'
  postUrl: string
  caption: string
  location?: string
  tags: string[]
  savedAt: string
  originalCreator: string
  aiAnalysis: {
    sentiment: 'positive' | 'negative' | 'neutral'
    category: string
    confidence: number
  }
}

export function SocialMediaIntegration() {
  const [botStatuses, setBotStatuses] = useState<BotStatus[]>([
    {
      platform: 'instagram',
      isActive: true,
      lastActivity: '2 minutes ago',
      totalTags: 47,
      responseRate: 98.5
    },
    {
      platform: 'twitter',
      isActive: false,
      lastActivity: 'Never',
      totalTags: 0,
      responseRate: 0
    },
    {
      platform: 'whatsapp',
      isActive: true,
      lastActivity: '15 minutes ago',
      totalTags: 23,
      responseRate: 100
    }
  ])

  const [savedContent, setSavedContent] = useState<SavedContent[]>([
    {
      id: '1',
      platform: 'instagram',
      postUrl: 'https://instagram.com/p/example1',
      caption: 'Amazing sunset at Santorini! The colors were absolutely breathtaking 🌅',
      location: 'Santorini, Greece',
      tags: ['sunset', 'greece', 'photography', 'luxury'],
      savedAt: '2024-01-15T10:30:00Z',
      originalCreator: '@greektravelpro',
      aiAnalysis: {
        sentiment: 'positive',
        category: 'scenic',
        confidence: 95
      }
    },
    {
      id: '2',
      platform: 'instagram',
      postUrl: 'https://instagram.com/p/example2',
      caption: 'Best pasta I\'ve ever had in Rome! This little trattoria is a hidden gem 🍝',
      location: 'Rome, Italy',
      tags: ['food', 'italy', 'restaurant', 'authentic'],
      savedAt: '2024-01-14T15:45:00Z',
      originalCreator: '@italianfoodie',
      aiAnalysis: {
        sentiment: 'positive',
        category: 'culinary',
        confidence: 92
      }
    }
  ])

  const [settings, setSettings] = useState({
    autoResponse: true,
    weeklyDigest: true,
    conflictDetection: true,
    creatorAttribution: true
  })

  const toggleBotStatus = (platform: string) => {
    setBotStatuses(prev => 
      prev.map(bot => 
        bot.platform === platform 
          ? { ...bot, isActive: !bot.isActive }
          : bot
      )
    )
  }

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'instagram': return Instagram
      case 'twitter': return Twitter
      case 'whatsapp': return MessageCircle
      default: return Bot
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

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Social Media Integration</h1>
              <p className="text-muted-foreground">
                Manage your AI travel bots across Instagram, Twitter, and WhatsApp
              </p>
            </div>
            <Button>
              <Settings className="w-4 h-4 mr-2" />
              Bot Settings
            </Button>
          </div>
        </div>

        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="content">Saved Content</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6">
            {/* Bot Status Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {botStatuses.map((bot) => {
                const Icon = getPlatformIcon(bot.platform)
                return (
                  <motion.div
                    key={bot.platform}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium capitalize">
                          {bot.platform} Bot
                        </CardTitle>
                        <Icon className={`w-5 h-5 ${getPlatformColor(bot.platform)}`} />
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-2">
                            <div className={`w-2 h-2 rounded-full ${bot.isActive ? 'bg-green-500' : 'bg-red-500'}`} />
                            <span className="text-sm">
                              {bot.isActive ? 'Active' : 'Inactive'}
                            </span>
                          </div>
                          <Switch 
                            checked={bot.isActive}
                            onCheckedChange={() => toggleBotStatus(bot.platform)}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Total Tags</span>
                            <span className="font-medium">{bot.totalTags}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Response Rate</span>
                            <span className="font-medium">{bot.responseRate}%</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Last Activity</span>
                            <span className="font-medium">{bot.lastActivity}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )
              })}
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="w-5 h-5 text-accent" />
                    <div>
                      <p className="text-2xl font-bold">127</p>
                      <p className="text-sm text-muted-foreground">Total Saves</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2">
                    <Users className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-2xl font-bold">89</p>
                      <p className="text-sm text-muted-foreground">Active Users</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2">
                    <Zap className="w-5 h-5 text-yellow-500" />
                    <div>
                      <p className="text-2xl font-bold">98.5%</p>
                      <p className="text-sm text-muted-foreground">Avg Response</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-5 h-5 text-blue-500" />
                    <div>
                      <p className="text-2xl font-bold">24</p>
                      <p className="text-sm text-muted-foreground">This Week</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* How to Use Section */}
            <Card>
              <CardHeader>
                <CardTitle>How to Use Your Travel Bots</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Instagram className="w-6 h-6 text-pink-500" />
                    </div>
                    <h3 className="font-semibold mb-2">Instagram</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      Tag @VersoBot in comments on travel posts you want to save
                    </p>
                    <Badge variant="outline" className="text-xs">
                      @VersoBot save this to my Greece vault! 🇬🇷
                    </Badge>
                  </div>

                  <div className="text-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Twitter className="w-6 h-6 text-blue-500" />
                    </div>
                    <h3 className="font-semibold mb-2">Twitter</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      Reply to travel tweets with @VersoBot to add to your vault
                    </p>
                    <Badge variant="outline" className="text-xs">
                      @VersoBot add to Italy collection
                    </Badge>
                  </div>

                  <div className="text-center">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <MessageCircle className="w-6 h-6 text-green-500" />
                    </div>
                    <h3 className="font-semibold mb-2">WhatsApp</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      Forward travel content to our WhatsApp bot for instant saving
                    </p>
                    <Badge variant="outline" className="text-xs">
                      +1 (555) 123-VERSO
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Saved Content Tab */}
          <TabsContent value="content" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Saved Travel Content</h2>
              <div className="flex items-center space-x-2">
                <Input placeholder="Search content..." className="w-64" />
                <Button variant="outline">Filter</Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedContent.map((content) => {
                const Icon = getPlatformIcon(content.platform)
                return (
                  <motion.div
                    key={content.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card className="hover:shadow-lg transition-shadow">
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Icon className={`w-4 h-4 ${getPlatformColor(content.platform)}`} />
                            <span className="text-sm text-muted-foreground">
                              {content.originalCreator}
                            </span>
                          </div>
                          <Badge 
                            variant={content.aiAnalysis.sentiment === 'positive' ? 'default' : 'secondary'}
                            className="text-xs"
                          >
                            {content.aiAnalysis.category}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm mb-3 line-clamp-3">{content.caption}</p>
                        
                        {content.location && (
                          <div className="flex items-center space-x-1 mb-3">
                            <MapPin className="w-3 h-3 text-muted-foreground" />
                            <span className="text-xs text-muted-foreground">{content.location}</span>
                          </div>
                        )}

                        <div className="flex flex-wrap gap-1 mb-3">
                          {content.tags.map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              #{tag}
                            </Badge>
                          ))}
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="text-xs text-muted-foreground">
                            {new Date(content.savedAt).toLocaleDateString()}
                          </span>
                          <div className="flex items-center space-x-2">
                            <Button size="sm" variant="ghost">
                              <Eye className="w-3 h-3" />
                            </Button>
                            <Button size="sm" variant="ghost">
                              <ExternalLink className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )
              })}
            </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Platform Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Instagram className="w-4 h-4 text-pink-500" />
                        <span>Instagram</span>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">47 tags</p>
                        <p className="text-sm text-muted-foreground">98.5% response</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <MessageCircle className="w-4 h-4 text-green-500" />
                        <span>WhatsApp</span>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">23 tags</p>
                        <p className="text-sm text-muted-foreground">100% response</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Twitter className="w-4 h-4 text-blue-500" />
                        <span>Twitter</span>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">0 tags</p>
                        <p className="text-sm text-muted-foreground">Not active</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Content Categories</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span>Scenic</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-20 h-2 bg-muted rounded-full">
                          <div className="w-3/4 h-2 bg-primary rounded-full"></div>
                        </div>
                        <span className="text-sm">35</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Culinary</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-20 h-2 bg-muted rounded-full">
                          <div className="w-1/2 h-2 bg-accent rounded-full"></div>
                        </div>
                        <span className="text-sm">24</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Adventure</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-20 h-2 bg-muted rounded-full">
                          <div className="w-1/3 h-2 bg-yellow-500 rounded-full"></div>
                        </div>
                        <span className="text-sm">18</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Culture</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-20 h-2 bg-muted rounded-full">
                          <div className="w-1/4 h-2 bg-blue-500 rounded-full"></div>
                        </div>
                        <span className="text-sm">12</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Bot Configuration</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Configure how your travel bots respond and behave
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="auto-response">Auto Response</Label>
                    <p className="text-sm text-muted-foreground">
                      Automatically respond to tags within 2 minutes
                    </p>
                  </div>
                  <Switch 
                    id="auto-response"
                    checked={settings.autoResponse}
                    onCheckedChange={(checked) => 
                      setSettings(prev => ({ ...prev, autoResponse: checked }))
                    }
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="weekly-digest">Weekly Digest</Label>
                    <p className="text-sm text-muted-foreground">
                      Send weekly email summaries of saved content
                    </p>
                  </div>
                  <Switch 
                    id="weekly-digest"
                    checked={settings.weeklyDigest}
                    onCheckedChange={(checked) => 
                      setSettings(prev => ({ ...prev, weeklyDigest: checked }))
                    }
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="conflict-detection">Conflict Detection</Label>
                    <p className="text-sm text-muted-foreground">
                      Warn about timing conflicts and crowded destinations
                    </p>
                  </div>
                  <Switch 
                    id="conflict-detection"
                    checked={settings.conflictDetection}
                    onCheckedChange={(checked) => 
                      setSettings(prev => ({ ...prev, conflictDetection: checked }))
                    }
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="creator-attribution">Creator Attribution</Label>
                    <p className="text-sm text-muted-foreground">
                      Always credit original content creators
                    </p>
                  </div>
                  <Switch 
                    id="creator-attribution"
                    checked={settings.creatorAttribution}
                    onCheckedChange={(checked) => 
                      setSettings(prev => ({ ...prev, creatorAttribution: checked }))
                    }
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Response Templates</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Customize how your bots respond to different types of content
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="welcome-template">Welcome Response</Label>
                  <textarea 
                    id="welcome-template"
                    className="w-full mt-1 p-3 border rounded-md resize-none"
                    rows={3}
                    defaultValue="👋 Welcome to your Travel Inspiration Vault! I've saved this amazing content. Based on initial analysis: [AI insight] Manage your vault: link.to/settings"
                  />
                </div>

                <div>
                  <Label htmlFor="save-template">Standard Save Response</Label>
                  <textarea 
                    id="save-template"
                    className="w-full mt-1 p-3 border rounded-md resize-none"
                    rows={3}
                    defaultValue="✅ Saved to your [destination] vault! [Personalized insight based on previous saves] Credit: @[original_creator]"
                  />
                </div>

                <div>
                  <Label htmlFor="conflict-template">Conflict Warning</Label>
                  <textarea 
                    id="conflict-template"
                    className="w-full mt-1 p-3 border rounded-md resize-none"
                    rows={3}
                    defaultValue="⚠️ Heads up! [Specific conflict detected] Alternative: [Suggestion from vault]"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}