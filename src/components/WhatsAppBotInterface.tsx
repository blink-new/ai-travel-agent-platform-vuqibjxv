import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  MessageCircle, 
  Send, 
  Paperclip, 
  Smile, 
  Phone, 
  Video, 
  MoreVertical,
  ArrowLeft,
  Check,
  CheckCheck,
  Clock,
  Image,
  MapPin,
  Calendar,
  Sparkles,
  Bot,
  User,
  Link,
  Download
} from 'lucide-react'
import { Button } from './ui/button'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Input } from './ui/input'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Separator } from './ui/separator'

interface Message {
  id: string
  type: 'text' | 'image' | 'link' | 'system'
  content: string
  imageUrl?: string
  linkPreview?: {
    title: string
    description: string
    imageUrl: string
    url: string
  }
  sender: 'user' | 'bot'
  timestamp: string
  status: 'sending' | 'sent' | 'delivered' | 'read'
  aiAnalysis?: {
    category: string
    location?: string
    tags: string[]
    insights: string[]
  }
}

export function WhatsAppBotInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'system',
      content: 'Welcome to Verso Travel Bot! 🌍 Forward any travel content or links and I\'ll help organize them in your vault.',
      sender: 'bot',
      timestamp: '2024-01-15T09:00:00Z',
      status: 'read'
    },
    {
      id: '2',
      type: 'text',
      content: 'Hi! I found this amazing post about Santorini',
      sender: 'user',
      timestamp: '2024-01-15T10:30:00Z',
      status: 'read'
    },
    {
      id: '3',
      type: 'link',
      content: 'https://instagram.com/p/santorini-sunset',
      linkPreview: {
        title: 'Amazing sunset at Santorini!',
        description: 'The colors were absolutely breathtaking 🌅 Perfect spot for photography',
        imageUrl: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=400&h=300&fit=crop',
        url: 'https://instagram.com/p/santorini-sunset'
      },
      sender: 'user',
      timestamp: '2024-01-15T10:31:00Z',
      status: 'read'
    },
    {
      id: '4',
      type: 'text',
      content: '✅ Saved to your Greece vault! 🇬🇷\\n\\n🔍 AI Analysis:\\n• Category: Scenic\\n• Best for: Photography, Romantic trips\\n• Season: April-October\\n\\n💡 Based on your 4 other sunset posts, you LOVE golden hour destinations! This Santorini spot is perfect for sunset photography.\\n\\n📸 Credit: @greektravelpro',
      sender: 'bot',
      timestamp: '2024-01-15T10:32:00Z',
      status: 'read',
      aiAnalysis: {
        category: 'scenic',
        location: 'Santorini, Greece',
        tags: ['sunset', 'photography', 'romantic', 'greece'],
        insights: [
          'Perfect for sunset photography',
          'Romantic destination',
          'Best visited April-October'
        ]
      }
    },
    {
      id: '5',
      type: 'text',
      content: 'That\'s perfect! Can you show me similar sunset spots?',
      sender: 'user',
      timestamp: '2024-01-15T10:35:00Z',
      status: 'read'
    },
    {
      id: '6',
      type: 'text',
      content: '🌅 Here are similar sunset spots from your vault:\\n\\n1. **Mykonos Windmills** - Greece\\n   • Iconic sunset views\\n   • Less crowded than Santorini\\n\\n2. **Positano Cliffs** - Italy\\n   • Dramatic coastal sunsets\\n   • Perfect for couples\\n\\n3. **Dubrovnik Walls** - Croatia\\n   • Historic sunset views\\n   • Great for photography\\n\\nWant me to create an itinerary combining these spots? 🗺️',
      sender: 'bot',
      timestamp: '2024-01-15T10:36:00Z',
      status: 'read'
    }
  ])

  const [newMessage, setNewMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const sendMessage = () => {
    if (!newMessage.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'text',
      content: newMessage,
      sender: 'user',
      timestamp: new Date().toISOString(),
      status: 'sending'
    }

    setMessages(prev => [...prev, userMessage])
    setNewMessage('')
    setIsTyping(true)

    // Simulate bot response
    setTimeout(() => {
      setIsTyping(false)
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'text',
        content: 'I\'d be happy to help! Could you share more details about what you\'re looking for? 🤖',
        sender: 'bot',
        timestamp: new Date().toISOString(),
        status: 'sent'
      }
      setMessages(prev => [...prev, botResponse])
    }, 2000)

    // Update message status
    setTimeout(() => {
      setMessages(prev => 
        prev.map(msg => 
          msg.id === userMessage.id 
            ? { ...msg, status: 'delivered' as const }
            : msg
        )
      )
    }, 1000)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'sending':
        return <Clock className="w-3 h-3 text-muted-foreground" />
      case 'sent':
        return <Check className="w-3 h-3 text-muted-foreground" />
      case 'delivered':
        return <CheckCheck className="w-3 h-3 text-muted-foreground" />
      case 'read':
        return <CheckCheck className="w-3 h-3 text-blue-500" />
      default:
        return null
    }
  }

  const formatMessageContent = (content: string) => {
    return content.split('\\n').map((line, index) => (
      <div key={index}>
        {line}
        {index < content.split('\\n').length - 1 && <br />}
      </div>
    ))
  }

  return (
    <div className="max-w-md mx-auto bg-background border rounded-lg overflow-hidden shadow-lg">
      {/* WhatsApp Header */}
      <div className="bg-green-600 text-white p-4">
        <div className="flex items-center space-x-3">
          <Button variant="ghost" size="sm" className="text-white hover:bg-green-700">
            <ArrowLeft className="w-4 h-4" />
          </Button>
          
          <Avatar className="w-10 h-10">
            <AvatarImage src="/bot-avatar.png" />
            <AvatarFallback className="bg-green-500">
              <Bot className="w-5 h-5" />
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1">
            <h3 className="font-semibold">Verso Travel Bot</h3>
            <p className="text-xs text-green-100">
              {isTyping ? 'typing...' : 'online'}
            </p>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" className="text-white hover:bg-green-700">
              <Video className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" className="text-white hover:bg-green-700">
              <Phone className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" className="text-white hover:bg-green-700">
              <MoreVertical className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="h-96 overflow-y-auto p-4 space-y-4 bg-gray-50">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-xs ${message.sender === 'user' ? 'order-2' : 'order-1'}`}>
                {message.sender === 'bot' && (
                  <div className="flex items-center space-x-2 mb-1">
                    <Avatar className="w-6 h-6">
                      <AvatarFallback className="bg-green-500 text-white text-xs">
                        <Bot className="w-3 h-3" />
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-xs text-muted-foreground">Verso Bot</span>
                  </div>
                )}
                
                <div
                  className={`rounded-lg p-3 ${
                    message.sender === 'user'
                      ? 'bg-green-500 text-white'
                      : message.type === 'system'
                      ? 'bg-yellow-100 text-yellow-800 border border-yellow-200'
                      : 'bg-white border'
                  }`}
                >
                  {message.type === 'text' && (
                    <div className="text-sm">
                      {formatMessageContent(message.content)}
                    </div>
                  )}
                  
                  {message.type === 'link' && message.linkPreview && (
                    <div className="space-y-2">
                      <p className="text-sm">{message.content}</p>
                      <div className="border rounded-lg overflow-hidden bg-white">
                        <img
                          src={message.linkPreview.imageUrl}
                          alt={message.linkPreview.title}
                          className="w-full h-32 object-cover"
                        />
                        <div className="p-3">
                          <h4 className="font-semibold text-sm text-gray-900">
                            {message.linkPreview.title}
                          </h4>
                          <p className="text-xs text-gray-600 mt-1">
                            {message.linkPreview.description}
                          </p>
                          <div className="flex items-center space-x-1 mt-2">
                            <Link className="w-3 h-3 text-blue-500" />
                            <span className="text-xs text-blue-500">
                              {new URL(message.linkPreview.url).hostname}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {message.type === 'system' && (
                    <div className="flex items-center space-x-2">
                      <Sparkles className="w-4 h-4" />
                      <span className="text-sm">{message.content}</span>
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs opacity-70">
                      {new Date(message.timestamp).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                    {message.sender === 'user' && (
                      <div className="ml-2">
                        {getStatusIcon(message.status)}
                      </div>
                    )}
                  </div>
                </div>
                
                {message.aiAnalysis && (
                  <div className="mt-2 p-2 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-center space-x-1 mb-1">
                      <Sparkles className="w-3 h-3 text-blue-500" />
                      <span className="text-xs font-medium text-blue-700">AI Analysis</span>
                    </div>
                    <div className="space-y-1">
                      <div className="flex flex-wrap gap-1">
                        {message.aiAnalysis.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            #{tag}
                          </Badge>
                        ))}
                      </div>
                      {message.aiAnalysis.location && (
                        <div className="flex items-center space-x-1">
                          <MapPin className="w-3 h-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">
                            {message.aiAnalysis.location}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {isTyping && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-start"
          >
            <div className="flex items-center space-x-2">
              <Avatar className="w-6 h-6">
                <AvatarFallback className="bg-green-500 text-white text-xs">
                  <Bot className="w-3 h-3" />
                </AvatarFallback>
              </Avatar>
              <div className="bg-white border rounded-lg p-3">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t">
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm">
            <Smile className="w-4 h-4" />
          </Button>
          
          <div className="flex-1 relative">
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              className="pr-10"
            />
            <Button
              variant="ghost"
              size="sm"
              className="absolute right-1 top-1/2 transform -translate-y-1/2"
            >
              <Paperclip className="w-4 h-4" />
            </Button>
          </div>
          
          <Button
            onClick={sendMessage}
            disabled={!newMessage.trim()}
            className="bg-green-500 hover:bg-green-600"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="p-4 bg-gray-50 border-t">
        <div className="text-xs text-muted-foreground mb-2">Quick Actions:</div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" className="text-xs">
            <Calendar className="w-3 h-3 mr-1" />
            Create Itinerary
          </Button>
          <Button variant="outline" size="sm" className="text-xs">
            <MapPin className="w-3 h-3 mr-1" />
            View Vault
          </Button>
          <Button variant="outline" size="sm" className="text-xs">
            <Download className="w-3 h-3 mr-1" />
            Export
          </Button>
        </div>
      </div>
    </div>
  )
}