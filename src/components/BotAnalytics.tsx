import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  MessageCircle, 
  Instagram, 
  Twitter, 
  Zap, 
  Clock, 
  Target, 
  BarChart3, 
  PieChart, 
  Calendar,
  MapPin,
  Tag,
  Heart,
  Share2,
  Eye,
  Bot,
  Sparkles,
  AlertCircle,
  CheckCircle,
  Activity
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Progress } from './ui/progress'

interface AnalyticsData {
  overview: {
    totalTags: number
    activeUsers: number
    responseRate: number
    avgResponseTime: number
    weeklyGrowth: number
  }
  platforms: {
    instagram: { tags: number, users: number, responseRate: number }
    twitter: { tags: number, users: number, responseRate: number }
    whatsapp: { tags: number, users: number, responseRate: number }
  }
  categories: {
    name: string
    count: number
    percentage: number
    growth: number
  }[]
  destinations: {
    name: string
    saves: number
    engagement: number
  }[]
  timeData: {
    date: string
    tags: number
    users: number
  }[]
  userEngagement: {
    newUsers: number
    returningUsers: number
    avgSessionTime: number
    bounceRate: number
  }
}

export function BotAnalytics() {
  const [timeRange, setTimeRange] = useState('7d')
  
  const [analyticsData] = useState<AnalyticsData>({
    overview: {
      totalTags: 1247,
      activeUsers: 389,
      responseRate: 98.5,
      avgResponseTime: 1.2,
      weeklyGrowth: 23.5
    },
    platforms: {
      instagram: { tags: 847, users: 234, responseRate: 98.5 },
      twitter: { tags: 156, users: 89, responseRate: 96.2 },
      whatsapp: { tags: 244, users: 66, responseRate: 100 }
    },
    categories: [
      { name: 'Scenic', count: 456, percentage: 36.6, growth: 12.3 },
      { name: 'Culinary', count: 312, percentage: 25.0, growth: 8.7 },
      { name: 'Adventure', count: 234, percentage: 18.8, growth: 15.2 },
      { name: 'Culture', count: 156, percentage: 12.5, growth: 5.4 },
      { name: 'Luxury', count: 89, percentage: 7.1, growth: 22.1 }
    ],
    destinations: [
      { name: 'Greece', saves: 234, engagement: 4.8 },
      { name: 'Italy', saves: 189, engagement: 4.6 },
      { name: 'Japan', saves: 156, engagement: 4.9 },
      { name: 'France', saves: 134, engagement: 4.4 },
      { name: 'Spain', saves: 123, engagement: 4.5 }
    ],
    timeData: [
      { date: '2024-01-08', tags: 45, users: 23 },
      { date: '2024-01-09', tags: 52, users: 28 },
      { date: '2024-01-10', tags: 38, users: 19 },
      { date: '2024-01-11', tags: 67, users: 34 },
      { date: '2024-01-12', tags: 71, users: 41 },
      { date: '2024-01-13', tags: 89, users: 52 },
      { date: '2024-01-14', tags: 94, users: 58 }
    ],
    userEngagement: {
      newUsers: 156,
      returningUsers: 233,
      avgSessionTime: 4.2,
      bounceRate: 12.3
    }
  })

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

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'k'
    }
    return num.toString()
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Bot Analytics</h1>
              <p className="text-muted-foreground">
                Track performance and insights across all your travel bots
              </p>
            </div>
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="24h">Last 24h</SelectItem>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 90 days</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="platforms">Platforms</TabsTrigger>
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="insights">Insights</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Total Tags</p>
                        <p className="text-3xl font-bold">{formatNumber(analyticsData.overview.totalTags)}</p>
                        <div className="flex items-center space-x-1 mt-1">
                          <TrendingUp className="w-3 h-3 text-green-500" />
                          <span className="text-xs text-green-500">+{analyticsData.overview.weeklyGrowth}%</span>
                        </div>
                      </div>
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                        <Tag className="w-6 h-6 text-primary" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Active Users</p>
                        <p className="text-3xl font-bold">{analyticsData.overview.activeUsers}</p>
                        <div className="flex items-center space-x-1 mt-1">
                          <TrendingUp className="w-3 h-3 text-green-500" />
                          <span className="text-xs text-green-500">+15.2%</span>
                        </div>
                      </div>
                      <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                        <Users className="w-6 h-6 text-accent" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Response Rate</p>
                        <p className="text-3xl font-bold">{analyticsData.overview.responseRate}%</p>
                        <div className="flex items-center space-x-1 mt-1">
                          <CheckCircle className="w-3 h-3 text-green-500" />
                          <span className="text-xs text-green-500">Excellent</span>
                        </div>
                      </div>
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                        <Zap className="w-6 h-6 text-green-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Avg Response Time</p>
                        <p className="text-3xl font-bold">{analyticsData.overview.avgResponseTime}m</p>
                        <div className="flex items-center space-x-1 mt-1">
                          <Clock className="w-3 h-3 text-blue-500" />
                          <span className="text-xs text-blue-500">Under target</span>
                        </div>
                      </div>
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <Clock className="w-6 h-6 text-blue-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Activity Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Activity Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-end justify-between space-x-2">
                  {analyticsData.timeData.map((day, index) => (
                    <div key={day.date} className="flex-1 flex flex-col items-center">
                      <div className="w-full space-y-1">
                        <div 
                          className="bg-primary rounded-t"
                          style={{ height: `${(day.tags / 100) * 100}px` }}
                        />
                        <div 
                          className="bg-accent rounded-t"
                          style={{ height: `${(day.users / 60) * 80}px` }}
                        />
                      </div>
                      <span className="text-xs text-muted-foreground mt-2">
                        {new Date(day.date).toLocaleDateString([], { weekday: 'short' })}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-center space-x-6 mt-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-primary rounded"></div>
                    <span className="text-sm">Tags</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-accent rounded"></div>
                    <span className="text-sm">Users</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Top Destinations */}
            <Card>
              <CardHeader>
                <CardTitle>Top Destinations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analyticsData.destinations.map((destination, index) => (
                    <div key={destination.name} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                          <span className="text-sm font-semibold">{index + 1}</span>
                        </div>
                        <div>
                          <p className="font-medium">{destination.name}</p>
                          <p className="text-sm text-muted-foreground">{destination.saves} saves</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <div
                              key={i}
                              className={`w-2 h-2 rounded-full ${
                                i < Math.floor(destination.engagement) 
                                  ? 'bg-yellow-400' 
                                  : 'bg-gray-200'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {destination.engagement}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Platforms Tab */}
          <TabsContent value="platforms" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {Object.entries(analyticsData.platforms).map(([platform, data]) => {
                const Icon = getPlatformIcon(platform)
                return (
                  <motion.div
                    key={platform}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium capitalize">
                          {platform}
                        </CardTitle>
                        <Icon className={`w-5 h-5 ${getPlatformColor(platform)}`} />
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div>
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-sm text-muted-foreground">Tags</span>
                              <span className="text-sm font-medium">{data.tags}</span>
                            </div>
                            <Progress value={(data.tags / 1000) * 100} className="h-2" />
                          </div>
                          
                          <div>
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-sm text-muted-foreground">Users</span>
                              <span className="text-sm font-medium">{data.users}</span>
                            </div>
                            <Progress value={(data.users / 300) * 100} className="h-2" />
                          </div>
                          
                          <div>
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-sm text-muted-foreground">Response Rate</span>
                              <span className="text-sm font-medium">{data.responseRate}%</span>
                            </div>
                            <Progress value={data.responseRate} className="h-2" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )
              })}
            </div>

            {/* Platform Comparison */}
            <Card>
              <CardHeader>
                <CardTitle>Platform Performance Comparison</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-medium mb-3">Tags by Platform</h4>
                    <div className="space-y-2">
                      {Object.entries(analyticsData.platforms).map(([platform, data]) => {
                        const Icon = getPlatformIcon(platform)
                        const percentage = (data.tags / analyticsData.overview.totalTags) * 100
                        return (
                          <div key={platform} className="flex items-center space-x-3">
                            <Icon className={`w-4 h-4 ${getPlatformColor(platform)}`} />
                            <span className="text-sm capitalize w-20">{platform}</span>
                            <div className="flex-1">
                              <Progress value={percentage} className="h-2" />
                            </div>
                            <span className="text-sm text-muted-foreground w-12">
                              {percentage.toFixed(1)}%
                            </span>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Content Tab */}
          <TabsContent value="content" className="space-y-6">
            {/* Content Categories */}
            <Card>
              <CardHeader>
                <CardTitle>Content Categories</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analyticsData.categories.map((category) => (
                    <div key={category.name} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{category.name}</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-muted-foreground">
                            {category.count} saves
                          </span>
                          <Badge variant={category.growth > 10 ? 'default' : 'secondary'}>
                            +{category.growth}%
                          </Badge>
                        </div>
                      </div>
                      <Progress value={category.percentage} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Content Quality Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>AI Analysis Quality</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Location Detection</span>
                      <span className="text-sm font-medium">94.2%</span>
                    </div>
                    <Progress value={94.2} className="h-2" />
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Sentiment Analysis</span>
                      <span className="text-sm font-medium">91.8%</span>
                    </div>
                    <Progress value={91.8} className="h-2" />
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Category Classification</span>
                      <span className="text-sm font-medium">96.5%</span>
                    </div>
                    <Progress value={96.5} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Content Engagement</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Heart className="w-4 h-4 text-red-500" />
                        <span className="text-sm">Avg Likes</span>
                      </div>
                      <span className="text-sm font-medium">1,247</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <MessageCircle className="w-4 h-4 text-blue-500" />
                        <span className="text-sm">Avg Comments</span>
                      </div>
                      <span className="text-sm font-medium">89</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Share2 className="w-4 h-4 text-green-500" />
                        <span className="text-sm">Avg Shares</span>
                      </div>
                      <span className="text-sm font-medium">34</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2">
                    <Users className="w-5 h-5 text-blue-500" />
                    <div>
                      <p className="text-2xl font-bold">{analyticsData.userEngagement.newUsers}</p>
                      <p className="text-sm text-muted-foreground">New Users</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2">
                    <Activity className="w-5 h-5 text-green-500" />
                    <div>
                      <p className="text-2xl font-bold">{analyticsData.userEngagement.returningUsers}</p>
                      <p className="text-sm text-muted-foreground">Returning Users</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-5 h-5 text-purple-500" />
                    <div>
                      <p className="text-2xl font-bold">{analyticsData.userEngagement.avgSessionTime}m</p>
                      <p className="text-sm text-muted-foreground">Avg Session</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2">
                    <TrendingDown className="w-5 h-5 text-orange-500" />
                    <div>
                      <p className="text-2xl font-bold">{analyticsData.userEngagement.bounceRate}%</p>
                      <p className="text-sm text-muted-foreground">Bounce Rate</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* User Behavior */}
            <Card>
              <CardHeader>
                <CardTitle>User Behavior Patterns</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-3">Most Active Hours</h4>
                    <div className="space-y-2">
                      {[
                        { hour: '9-10 AM', activity: 85 },
                        { hour: '12-1 PM', activity: 92 },
                        { hour: '6-7 PM', activity: 78 },
                        { hour: '8-9 PM', activity: 95 }
                      ].map((slot) => (
                        <div key={slot.hour} className="flex items-center space-x-3">
                          <span className="text-sm w-16">{slot.hour}</span>
                          <Progress value={slot.activity} className="flex-1 h-2" />
                          <span className="text-sm text-muted-foreground w-8">
                            {slot.activity}%
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-3">User Journey</h4>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-xs font-semibold text-blue-600">1</span>
                        </div>
                        <div>
                          <p className="text-sm font-medium">First Tag</p>
                          <p className="text-xs text-muted-foreground">User discovers bot</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                          <span className="text-xs font-semibold text-green-600">2</span>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Vault Access</p>
                          <p className="text-xs text-muted-foreground">Views saved content</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                          <span className="text-xs font-semibold text-purple-600">3</span>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Regular Usage</p>
                          <p className="text-xs text-muted-foreground">Multiple tags per week</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Insights Tab */}
          <TabsContent value="insights" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Sparkles className="w-5 h-5 text-yellow-500" />
                    <span>AI Insights</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                      <div className="flex items-center space-x-2 mb-1">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span className="text-sm font-medium text-green-800">High Performance</span>
                      </div>
                      <p className="text-sm text-green-700">
                        Instagram bot is performing exceptionally well with 98.5% response rate
                      </p>
                    </div>

                    <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <div className="flex items-center space-x-2 mb-1">
                        <TrendingUp className="w-4 h-4 text-blue-600" />
                        <span className="text-sm font-medium text-blue-800">Growth Opportunity</span>
                      </div>
                      <p className="text-sm text-blue-700">
                        Scenic content shows 23% higher engagement than other categories
                      </p>
                    </div>

                    <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                      <div className="flex items-center space-x-2 mb-1">
                        <AlertCircle className="w-4 h-4 text-yellow-600" />
                        <span className="text-sm font-medium text-yellow-800">Attention Needed</span>
                      </div>
                      <p className="text-sm text-yellow-700">
                        Twitter bot activation could increase total reach by 40%
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recommendations</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-xs font-semibold text-primary">1</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Activate Twitter Bot</p>
                        <p className="text-xs text-muted-foreground">
                          Expand reach to Twitter's travel community
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-xs font-semibold text-accent">2</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Optimize Response Templates</p>
                        <p className="text-xs text-muted-foreground">
                          Focus on scenic content insights
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-xs font-semibold text-blue-600">3</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Peak Hour Optimization</p>
                        <p className="text-xs text-muted-foreground">
                          Increase monitoring during 8-9 PM
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Performance Forecast */}
            <Card>
              <CardHeader>
                <CardTitle>30-Day Forecast</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                      <TrendingUp className="w-8 h-8 text-primary" />
                    </div>
                    <p className="text-2xl font-bold">2.1k</p>
                    <p className="text-sm text-muted-foreground">Projected Tags</p>
                    <Badge variant="outline" className="mt-1">+68% growth</Badge>
                  </div>

                  <div className="text-center">
                    <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Users className="w-8 h-8 text-accent" />
                    </div>
                    <p className="text-2xl font-bold">650</p>
                    <p className="text-sm text-muted-foreground">New Users</p>
                    <Badge variant="outline" className="mt-1">+45% growth</Badge>
                  </div>

                  <div className="text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Target className="w-8 h-8 text-green-600" />
                    </div>
                    <p className="text-2xl font-bold">99.2%</p>
                    <p className="text-sm text-muted-foreground">Target Response Rate</p>
                    <Badge variant="outline" className="mt-1">+0.7% improvement</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}