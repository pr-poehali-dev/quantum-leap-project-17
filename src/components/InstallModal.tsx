import { useState, useEffect, useRef } from "react"
import { X, TrendingUp, CheckCircle, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"

interface InstallModalProps {
  isOpen: boolean
  onClose: () => void
}

const LEADS_URL = "https://functions.poehali.dev/15ac1a67-c629-4575-a9f1-0102f0c18a38"

const BROKERS = [
  "Deriv / Binary.com",
  "Quotex",
  "IQ Option",
  "Pocket Option",
  "Olymp Trade",
  "Другой",
]

export default function InstallModal({ isOpen, onClose }: InstallModalProps) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [broker, setBroker] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [errorMsg, setErrorMsg] = useState("")
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    const handleOutsideClick = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose()
      }
    }

    if (isOpen) {
      window.addEventListener("keydown", handleEscape)
      document.addEventListener("mousedown", handleOutsideClick)
      document.body.style.overflow = "hidden"
    }

    return () => {
      window.removeEventListener("keydown", handleEscape)
      document.removeEventListener("mousedown", handleOutsideClick)
      document.body.style.overflow = ""
    }
  }, [isOpen, onClose])

  const handleClose = () => {
    if (status === "success") {
      setStatus("idle")
      setName("")
      setEmail("")
      setPhone("")
      setBroker("")
    }
    onClose()
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !email.trim()) {
      setErrorMsg("Введите имя и email")
      return
    }
    setErrorMsg("")
    setStatus("loading")
    try {
      const res = await fetch(LEADS_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, broker }),
      })
      if (res.ok) {
        setStatus("success")
      } else {
        setStatus("error")
        setErrorMsg("Что-то пошло не так. Попробуйте ещё раз.")
      }
    } catch {
      setStatus("error")
      setErrorMsg("Ошибка сети. Попробуйте ещё раз.")
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-start md:items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div
        ref={modalRef}
        className="relative w-full max-w-lg bg-black border border-white/10 rounded-[16px] shadow-2xl my-4 md:my-0"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-5 border-b border-white/10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#00C853] to-[#00B0FF] flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-white" strokeWidth={2.5} />
            </div>
            <h2
              className="text-xl font-semibold text-white"
              style={{ fontFamily: '"GeistSans", sans-serif', letterSpacing: "-0.03em" }}
            >
              Начать работу
            </h2>
          </div>
          <button
            onClick={handleClose}
            className="p-2 text-white/50 hover:text-white rounded-full hover:bg-white/10 transition-colors"
            aria-label="Закрыть"
          >
            <X size={18} />
          </button>
        </div>

        <div className="p-5">
          {status === "success" ? (
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <div className="w-16 h-16 rounded-full bg-[#00C853]/10 border border-[#00C853]/30 flex items-center justify-center mb-4">
                <CheckCircle className="w-8 h-8 text-[#00C853]" strokeWidth={1.5} />
              </div>
              <h3
                className="text-white text-xl font-semibold mb-2"
                style={{ fontFamily: '"GeistSans", sans-serif', letterSpacing: "-0.02em" }}
              >
                Заявка отправлена!
              </h3>
              <p
                className="text-white/60 text-sm max-w-xs"
                style={{ fontFamily: "GeistMono, monospace", lineHeight: "1.5" }}
              >
                Мы свяжемся с вами в ближайшее время и поможем подключить платформу к вашему брокеру.
              </p>
              <Button
                onClick={handleClose}
                className="mt-6 bg-white text-black hover:bg-gray-100 font-mono text-sm font-semibold tracking-wider h-11 px-6 rounded-lg"
              >
                Закрыть
              </Button>
            </div>
          ) : (
            <>
              <p
                className="text-white/60 text-sm mb-5"
                style={{ fontFamily: "GeistMono, monospace", lineHeight: "1.5" }}
              >
                Оставьте контакты — мы поможем настроить платформу под ваш брокер и стратегию.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-white/70 text-xs font-mono mb-1.5 tracking-wide uppercase">
                    Имя *
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Алексей"
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 h-11 text-white placeholder-white/30 focus:outline-none focus:border-[#00C853]/50 focus:bg-white/8 transition-colors"
                    style={{ fontFamily: '"GeistSans", sans-serif', fontSize: "15px" }}
                    disabled={status === "loading"}
                  />
                </div>

                <div>
                  <label className="block text-white/70 text-xs font-mono mb-1.5 tracking-wide uppercase">
                    Email *
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="alex@example.com"
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 h-11 text-white placeholder-white/30 focus:outline-none focus:border-[#00C853]/50 transition-colors"
                    style={{ fontFamily: '"GeistSans", sans-serif', fontSize: "15px" }}
                    disabled={status === "loading"}
                  />
                </div>

                <div>
                  <label className="block text-white/70 text-xs font-mono mb-1.5 tracking-wide uppercase">
                    Телефон
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+7 900 000 00 00"
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 h-11 text-white placeholder-white/30 focus:outline-none focus:border-[#00C853]/50 transition-colors"
                    style={{ fontFamily: '"GeistSans", sans-serif', fontSize: "15px" }}
                    disabled={status === "loading"}
                  />
                </div>

                <div>
                  <label className="block text-white/70 text-xs font-mono mb-1.5 tracking-wide uppercase">
                    Ваш брокер
                  </label>
                  <select
                    value={broker}
                    onChange={(e) => setBroker(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 h-11 text-white focus:outline-none focus:border-[#00C853]/50 transition-colors appearance-none cursor-pointer"
                    style={{ fontFamily: '"GeistSans", sans-serif', fontSize: "15px" }}
                    disabled={status === "loading"}
                  >
                    <option value="" className="bg-black text-white/50">Выберите брокера</option>
                    {BROKERS.map((b) => (
                      <option key={b} value={b} className="bg-black text-white">{b}</option>
                    ))}
                  </select>
                </div>

                {errorMsg && (
                  <p className="text-[#FF3D3D] text-sm font-mono">{errorMsg}</p>
                )}

                <Button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full bg-[#00C853] hover:bg-[#00B547] text-black font-mono text-sm font-semibold tracking-wider h-12 rounded-lg mt-2 disabled:opacity-60"
                >
                  {status === "loading" ? (
                    <span className="flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Отправляем...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4" strokeWidth={2.5} />
                      ОТПРАВИТЬ ЗАЯВКУ
                    </span>
                  )}
                </Button>
              </form>

              <p
                className="text-white/30 text-xs text-center mt-4"
                style={{ fontFamily: "GeistMono, monospace" }}
              >
                Никакого спама. Только по делу.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
