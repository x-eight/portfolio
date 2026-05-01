"use client"

import { useChat } from "@ai-sdk/react"
import { useState, useEffect, useRef, useCallback, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useI18n } from "@/lib/i18n-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { X, Send, Bot, Key, AlertCircle } from "lucide-react"
import { DefaultChatTransport } from "ai"

interface AIAssistantModalProps {
  isOpen: boolean
  onClose: () => void
}

type Provider = "gemini" | "openai"

export function AIAssistantModal({ isOpen, onClose }: AIAssistantModalProps) {
  const { t } = useI18n()
  const [provider, setProvider] = useState<Provider>("gemini")
  const [apiKey, setApiKey] = useState("")
  const scrollRef = useRef<HTMLDivElement>(null)

  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false)

  const credentialsRef = useRef({ provider, apiKey })

  useEffect(() => {
    credentialsRef.current = { provider, apiKey }
  }, [provider, apiKey])

  const transport = useMemo(() => new DefaultChatTransport({
    api: '/api/chat',
    headers: () => ({
      Authorization: `Bearer ${credentialsRef.current.apiKey}`,
    }),
    body: () => ({
      provider: credentialsRef.current.provider,
    }),
  }), [])

  const { messages, sendMessage, status } = useChat({ transport });

  useEffect(() => {
    if (status === "streaming") setIsLoading(true)
    else if (status === "ready") setIsLoading(false)
    else if (status === "error") setIsLoading(false)
    else if (status === "submitted") setIsLoading(true)
  }, [status])

  const handleSendMessage = (e: any) => {
    e.preventDefault();
    sendMessage({ text: input, metadata: { provider, apiKey } });
    setInput("");
  };

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="fixed inset-4 z-50 mx-auto flex max-w-2xl flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-2xl sm:inset-auto sm:left-1/2 sm:top-1/2 sm:h-[600px] sm:w-full sm:-translate-x-1/2 sm:-translate-y-1/2"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Bot className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="font-semibold text-foreground">
                    {t.aiAssistant.title}
                  </h2>
                  <p className="text-xs text-muted-foreground">
                    {t.aiAssistant.subtitle}
                  </p>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="h-5 w-5" />
                <span className="sr-only">{t.aiAssistant.close}</span>
              </Button>
            </div>

            {/* API Key Section */}
            <div className="border-b border-border bg-secondary/30 p-4">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
                <div className="flex-1 space-y-2">
                  <Label htmlFor="provider" className="text-sm">
                    {t.aiAssistant.selectProvider}
                  </Label>
                  <Select
                    value={provider}
                    onValueChange={(v) => setProvider(v as Provider)}
                  >
                    <SelectTrigger id="provider">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="gemini">
                        {t.aiAssistant.gemini}
                      </SelectItem>
                      <SelectItem value="openai">
                        {t.aiAssistant.openai}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex-[2] space-y-2">
                  <Label htmlFor="apiKey" className="text-sm">
                    {t.aiAssistant.apiKeyLabel}
                  </Label>
                  <div className="relative">
                    <Key className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="apiKey"
                      type="password"
                      placeholder={t.aiAssistant.apiKeyPlaceholder}
                      value={apiKey}
                      onChange={(e) => {
                        const val = e.target.value.trim();
                        setApiKey(val);
                      }}
                      className="pl-10"
                    />
                  </div>
                </div>
              </div>
              {!apiKey && (
                <div className="mt-3 flex items-center gap-2 text-xs text-amber-500">
                  <AlertCircle className="h-4 w-4" />
                  {t.aiAssistant.keyRequired}
                </div>
              )}
            </div>

            {/* Chat Messages */}
            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-4 scroll-smooth"
            >
              {messages.length === 0 ? (
                <div className="flex h-full items-center justify-center text-center text-muted-foreground">
                  <div>
                    <Bot className="mx-auto mb-4 h-12 w-12 opacity-50" />
                    <p className="text-sm">{t.aiAssistant.placeholder}</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {messages.map((msg) => (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"
                        }`}
                    >
                      <div
                        className={`max-w-[80%] rounded-2xl px-4 py-2 ${msg.role === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary text-foreground"
                          }`}
                      >
                        {msg.parts?.map(
                          (part, i) =>
                            part.type === "text" && (
                              <p key={`${msg.id}-${i}`} className="text-sm whitespace-pre-wrap">{part.text}</p>
                            ),
                        )}
                      </div>
                    </motion.div>
                  ))}
                  {isLoading && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex justify-start"
                    >
                      <div className="flex items-center gap-2 rounded-2xl bg-secondary px-4 py-2">
                        <div className="flex gap-1">
                          <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.3s]" />
                          <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.15s]" />
                          <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground" />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              )}
            </div>

            {/* Input Section */}
            <div className="border-t border-border p-4">
              <form
                onSubmit={handleSendMessage}
                className="flex gap-2"
              >
                <Input
                  placeholder={t.aiAssistant.placeholder}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  disabled={!apiKey || isLoading}
                  className="flex-1"
                />
                <Button
                  type="submit"
                  disabled={!apiKey || !input.trim() || isLoading}
                >
                  <Send className="h-4 w-4" />
                  <span className="sr-only">{t.aiAssistant.send}</span>
                </Button>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
