import { Search, Send, MoreVertical } from 'lucide-react'
import { useState } from 'react'

export default function Messages() {
  const [activeChat, setActiveChat] = useState(1)
  
  // Example messages data - replace with actual data from your backend
  const conversations = [
    {
      id: 1,
      name: "Dr. Smith",
      role: "Instructor",
      lastMessage: "Please submit your assignment by Friday",
      time: "2h ago",
      unread: 2,
      avatar: "/instructor1.jpg"
    },
    {
      id: 2,
      name: "Study Group",
      role: "Group Chat",
      lastMessage: "Let's meet tomorrow at 3 PM",
      time: "5h ago",
      unread: 0,
      avatar: "/group1.jpg"
    },
    {
      id: 3,
      name: "Prof. Johnson",
      role: "Instructor",
      lastMessage: "Your project proposal looks good",
      time: "1d ago",
      unread: 0,
      avatar: "/instructor2.jpg"
    }
  ]

  const messages = [
    {
      id: 1,
      sender: "Dr. Smith",
      content: "Hello, how can I help you today?",
      time: "10:00 AM",
      isInstructor: true
    },
    {
      id: 2,
      sender: "You",
      content: "I have a question about the upcoming assignment",
      time: "10:05 AM",
      isInstructor: false
    },
    {
      id: 3,
      sender: "Dr. Smith",
      content: "Sure, what would you like to know?",
      time: "10:10 AM",
      isInstructor: true
    }
  ]

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      {/* Conversations List */}
      <div className="w-80 border-r border-gray-200 bg-white">
        <div className="p-4 border-b border-gray-200">
          <h1 className="text-xl font-bold mb-4">Messages</h1>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search messages"
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-purple-500"
            />
          </div>
        </div>

        <div className="overflow-y-auto h-[calc(100%-7rem)]">
          {conversations.map((conversation) => (
            <div
              key={conversation.id}
              className={`p-4 border-b border-gray-200 cursor-pointer hover:bg-gray-50 ${
                activeChat === conversation.id ? 'bg-purple-50' : ''
              }`}
              onClick={() => setActiveChat(conversation.id)}
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full overflow-hidden">
                  <img src={conversation.avatar} alt={conversation.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold truncate">{conversation.name}</h3>
                    <span className="text-xs text-gray-500">{conversation.time}</span>
                  </div>
                  <p className="text-sm text-gray-600 truncate">{conversation.lastMessage}</p>
                </div>
                {conversation.unread > 0 && (
                  <div className="w-5 h-5 bg-purple-600 text-white text-xs rounded-full flex items-center justify-center">
                    {conversation.unread}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col bg-gray-50">
        {activeChat && (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-200 bg-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden">
                  <img
                    src={conversations.find(c => c.id === activeChat)?.avatar}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h2 className="font-semibold">
                    {conversations.find(c => c.id === activeChat)?.name}
                  </h2>
                  <p className="text-sm text-gray-500">
                    {conversations.find(c => c.id === activeChat)?.role}
                  </p>
                </div>
              </div>
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <MoreVertical size={20} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.isInstructor ? 'justify-start' : 'justify-end'}`}
                  >
                    <div
                      className={`max-w-[70%] p-3 rounded-lg ${
                        message.isInstructor
                          ? 'bg-white border border-gray-200'
                          : 'bg-purple-600 text-white'
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      <span className="text-xs opacity-70 mt-1 block">
                        {message.time}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-gray-200 bg-white">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Type a message..."
                  className="flex-1 p-2 border border-gray-200 rounded-lg focus:outline-none focus:border-purple-500"
                />
                <button className="p-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
                  <Send size={20} />
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
} 