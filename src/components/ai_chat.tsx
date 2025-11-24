"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Send, Paperclip, Sparkles, Bot, User, Globe, ImageIcon, Code, FileImage } from "lucide-react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

const SUGGESTED_PROMPTS = [
  "Which Programming course is best for a beginner?",
  "What will I learn in the Generative AI course?",
  "Prerequisites for Machine Learning with Python?",
  "Does Full-Stack Web Development cover deployment?",
]

const FEATURE_CARDS = [
  {
    icon: <Bot className="w-5 h-5" />,
    title: "Which Programming course should I start with?",
    description: "Beginner options like Python or C++",
  },
  {
    icon: <Sparkles className="w-5 h-5" />,
    title: "What will I learn in Generative AI?",
    description: "Projects, tools, and learning outcomes",
  },
  {
    icon: <ImageIcon className="w-5 h-5" />,
    title: "Prerequisites for Machine Learning with Python?",
    description: "Required skills before enrolling",
  },
  {
    icon: <Code className="w-5 h-5" />,
    title: "Does Full-Stack Web Dev include deployment?",
    description: "Scope and stack covered in the course",
  },
]

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
}

export function AnimatedAIChat() {
  const [input, setInput] = useState("")
  const [attachments, setAttachments] = useState<File[]>([])
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const messagesContainerRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Removed conflicting GSAP animations - using Framer Motion exclusively

  useEffect(() => {
    const el = messagesContainerRef.current
    if (el) {
      el.scrollTo({ top: el.scrollHeight, behavior: "smooth" })
    }
  }, [messages])

  const handleSend = async () => {
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      const backendUrl =
        process.env.NEXT_PUBLIC_BACKEND_URL ||
        (typeof window !== "undefined" && window.location.hostname.endsWith("vercel.app")
          ? "https://hexon-backend.onrender.com"
          : "http://localhost:3001")
      const response = await fetch(`${backendUrl}/api/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: input.trim(),
          messages: [...messages, userMessage].map((msg) => ({
            role: msg.role,
            content: msg.content,
          })),
        }),
      })

      if (!response.ok) {
        throw new Error(`Failed to get response: ${response.status}`)
      }

      const reader = response.body?.getReader()
      const decoder = new TextDecoder()
      let assistantContent = ""

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "",
      }

      setMessages((prev) => [...prev, assistantMessage])

      if (reader) {
        while (true) {
          const { done, value } = await reader.read()
          if (done) break

          const chunk = decoder.decode(value)
          const lines = chunk.split("\n")

          for (const line of lines) {
            if (line.startsWith("data: ")) {
              const data = line.slice(6)
              if (data === "[DONE]") continue

              try {
                const parsed = JSON.parse(data)
                if (parsed.content) {
                  assistantContent += parsed.content
                  setMessages((prev) =>
                    prev.map((msg) => (msg.id === assistantMessage.id ? { ...msg, content: assistantContent } : msg)),
                  )
                }
              } catch (e) {
                // Ignore parsing errors for partial chunks
              }
            }
          }
        }
      }
    } catch (error) {
      console.error("Chat error:", error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "Sorry, I encountered an error. Please try again.",
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    setAttachments((prev) => [...prev, ...files])
  }

  const removeAttachment = (index: number) => {
    setAttachments((prev) => prev.filter((_, i) => i !== index))
  }

  const selectPrompt = (prompt: string) => {
    setInput(prompt)
  }

  const handleFeatureClick = (question: string) => {
    setInput(question)
  }

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      

      <div className="relative z-10 flex flex-col h-screen max-w-6xl mx-auto">
        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {messages.length === 0 ? (
            /* Welcome Screen */
            <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-4xl w-full"
              >
                <h1 className="text-4xl md:text-5xl font-light mb-4">
                  Welcome to <span className="font-semibold">AI Assistant</span>
                </h1>
                <p className="text-gray-400 text-lg mb-12">
                  Uses multiple sources and tools to answer questions with citations
                </p>

                {/* Course Question Cards - glass effect */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
                  {FEATURE_CARDS.map((feature, index) => (
                    <motion.div
                      key={feature.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      onClick={() => handleFeatureClick(feature.title)}
                      className={"relative p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl shadow-lg overflow-hidden group cursor-pointer hover:scale-105 transition-transform duration-300 hover:bg-white/10"}
                    >
                      {/* Sparkle effects */}
                      <div className="absolute top-3 right-3 opacity-60">
                        <Sparkles className="w-3 h-3 text-white" />
                      </div>
                      <div className="absolute top-4 right-6 opacity-30">
                        <Sparkles className="w-2 h-2 text-white" />
                      </div>

                      <div className="relative z-10">
                        <div className="text-white mb-2">{feature.icon}</div>
                        <h3 className="text-white font-semibold mb-1 text-sm">{feature.title}</h3>
                        <p className="text-white/70 text-xs">{feature.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Suggested Prompts */}
                <div className="flex flex-wrap justify-center gap-3 mb-8">
                  {SUGGESTED_PROMPTS.map((prompt, index) => (
                    <motion.button
                      key={prompt}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
                      onClick={() => selectPrompt(prompt)}
                      className="px-4 py-2 rounded-full bg-gray-800/50 border border-gray-700/50 text-gray-300 hover:bg-gray-700/50 hover:text-white transition-all duration-200 text-sm"
                    >
                      {prompt}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            </div>
          ) : (
            /* Chat Messages */
            <div className="flex-1 overflow-y-auto p-6 space-y-6" ref={messagesContainerRef}>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex gap-4 ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {message.role === "assistant" && (
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                  )}

                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                      message.role === "user"
                        ? "bg-gray-800 text-white"
                        : "bg-gray-900/50 text-gray-100 border border-gray-800/50"
                    }`}
                  >
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      components={{
                        p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
                        h1: ({ children }) => <h1 className="text-xl font-bold mb-2">{children}</h1>,
                        h2: ({ children }) => <h2 className="text-lg font-semibold mb-2">{children}</h2>,
                        h3: ({ children }) => <h3 className="text-base font-medium mb-2">{children}</h3>,
                        ul: ({ children }) => <ul className="list-disc list-inside mb-2">{children}</ul>,
                        ol: ({ children }) => <ol className="list-decimal list-inside mb-2">{children}</ol>,
                        li: ({ children }) => <li className="mb-1">{children}</li>,
                        code: ({ children, className }) => {
                          const isInline = !className
                          return isInline ? (
                            <code className="bg-gray-800 px-1 py-0.5 rounded text-sm font-mono">{children}</code>
                          ) : (
                            <code className="block bg-gray-800 p-3 rounded-lg text-sm font-mono overflow-x-auto">
                              {children}
                            </code>
                          )
                        },
                        pre: ({ children }) => (
                          <pre className="bg-gray-800 p-3 rounded-lg overflow-x-auto mb-2">{children}</pre>
                        ),
                        blockquote: ({ children }) => (
                          <blockquote className="border-l-4 border-gray-600 pl-4 italic mb-2">{children}</blockquote>
                        ),
                        a: ({ children, href }) => (
                          <a
                            href={href}
                            className="text-blue-400 hover:text-blue-300 underline"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {children}
                          </a>
                        ),
                      }}
                    >
                      {message.content}
                    </ReactMarkdown>
                  </div>

                  {message.role === "user" && (
                    <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center flex-shrink-0">
                      <User className="w-4 h-4 text-white" />
                    </div>
                  )}
                </motion.div>
              ))}

              {isLoading && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-4 justify-start">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div className="bg-gray-900/50 border border-gray-800/50 rounded-2xl px-4 py-3">
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100" />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200" />
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>
          )}

          {/* Input Area */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            className="p-6 border-t border-gray-800/50"
          >
            <div className="max-w-4xl mx-auto">
              {/* Attachments Preview */}
              <AnimatePresence>
                {attachments.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mb-4 flex gap-2 flex-wrap"
                  >
                    {attachments.map((file, index) => (
                      <div key={index} className="flex items-center gap-2 bg-gray-800/50 rounded-lg px-3 py-2 text-sm">
                        <span className="text-gray-300">{file.name}</span>
                        <button onClick={() => removeAttachment(index)} className="text-gray-400 hover:text-white">
                          ×
                        </button>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Input Container - Removed saved prompts, voice input, and attach content */}
              <div className="relative bg-gray-900/50 border border-gray-700/50 rounded-2xl backdrop-blur-sm">
                <div className="flex items-end gap-3 p-4">
                  {/* Text Input */}
                  <div className="flex-1">
                    <textarea
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Ask me anything..."
                      className="w-full bg-transparent border-none outline-none resize-none text-white placeholder-gray-500 min-h-[24px] max-h-32"
                      rows={1}
                      style={{
                        height: "auto",
                        minHeight: "24px",
                      }}
                      onInput={(e) => {
                        const target = e.target as HTMLTextAreaElement
                        target.style.height = "auto"
                        target.style.height = target.scrollHeight + "px"
                      }}
                    />
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-2">
                    {/* File Upload */}
                    <input ref={fileInputRef} type="file" multiple onChange={handleFileUpload} className="hidden" />
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="p-2 text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-gray-800/50"
                    >
                      <Paperclip className="w-5 h-5" />
                    </button>

                    {/* Send Button */}
                    <button
                      onClick={handleSend}
                      disabled={!input.trim() || isLoading}
                      className={`p-2 rounded-lg transition-all ${
                        input.trim() && !isLoading
                          ? "bg-gradient-to-r from-violet-500 to-purple-600 text-white hover:from-violet-600 hover:to-purple-700 shadow-lg"
                          : "bg-gray-800/50 text-gray-500 cursor-not-allowed"
                      }`}
                    >
                      <Send className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
