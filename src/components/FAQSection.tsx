import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"

const faqs = [
  {
    question: "Я уже торгую вручную. Зачем мне алго-платформа?",
    answer: (
      <>
        Ручная торговля подвержена эмоциям: страху, жадности, усреднению убытков.
        <br />
        <br />
        Алгоритм следует правилам строго — без исключений. Плюс он работает 24/7, пока вы спите.
        <br />
        <br />
        Бэктест покажет реальный результат стратегии до того, как вы рискнёте деньгами.
      </>
    ),
  },
  {
    question: "Это работает с реальным счётом?",
    answer: (
      <>
        Да — платформа поддерживает подключение к API брокера как в демо, так и в боевом режиме.
        <br />
        <br />
        Рекомендуем сначала протестировать стратегию на демо-счёте и убедиться в стабильном winrate.
      </>
    ),
  },
  {
    question: "Нужно ли знать Python или программирование?",
    answer: (
      <>
        Нет.
        <br />
        <br />
        Платформа позволяет настраивать стратегии через интерфейс: выбирайте индикаторы, параметры и правила входа без написания кода.
        <br />
        <br />
        Для продвинутых пользователей доступен Python API для кастомных стратегий.
      </>
    ),
  },
  {
    question: "Какие инструменты и таймфреймы поддерживаются?",
    answer: (
      <>
        Поддерживаются <strong>бинарные опционы</strong> (High/Low, Touch/No-touch), Forex и криптовалюты.
        <br />
        <br />
        Таймфреймы: от тиков до 1H. Экспирации: 1, 5, 15 минут и выше.
      </>
    ),
  },
  {
    question: "Как платформа защищает мои данные и ключи API?",
    answer: (
      <>
        API-ключи брокера хранятся в зашифрованном виде и никогда не передаются третьим лицам.
        <br />
        <br />
        Все соединения защищены <strong>TLS 1.2+</strong>. Мы не храним историю сделок на серверах — только у вас локально.
      </>
    ),
  },
  {
    question: "Можно ли тестировать несколько стратегий одновременно?",
    answer: (
      <>
        Да.
        <br />
        <br />
        Запускайте параллельный бэктест нескольких стратегий с разными параметрами и сравнивайте результаты: winrate, drawdown, expectancy — на одном экране.
      </>
    ),
  },
]

interface FAQSectionProps {
  onOpenInstall?: () => void
}

export default function FAQSection({ onOpenInstall }: FAQSectionProps) {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <h2
          className="text-center mb-12 md:mb-16 font-semibold"
          style={{
            backgroundImage: "linear-gradient(rgb(245, 245, 245), rgb(245, 245, 245) 29%, rgb(153, 153, 153))",
            color: "transparent",
            fontFamily: "GeistSans, sans-serif",
            fontSize: "clamp(32px, 6vw, 52px)",
            fontWeight: 600,
            letterSpacing: "clamp(-1.5px, -0.04em, -2.08px)",
            lineHeight: "1.15",
            textAlign: "center",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
          }}
        >
          Частые вопросы о платформе
        </h2>

        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="border border-white/10 rounded-lg bg-white/5 overflow-hidden"
            >
              <AccordionTrigger className="px-5 py-4 hover:no-underline">
                <span
                  className="text-left font-medium text-white"
                  style={{
                    fontFamily: '"GeistSans", sans-serif',
                    fontSize: "18px",
                  }}
                >
                  {faq.question}
                </span>
              </AccordionTrigger>
              <AccordionContent className="px-5 pb-4 pt-0">
                <p
                  className="text-white/80"
                  style={{
                    fontFamily:
                      'GeistMono, ui-monospace, SFMono-Regular, "Roboto Mono", Menlo, Monaco, "Liberation Mono", "DejaVu Sans Mono", "Courier New", monospace',
                    fontSize: "15px",
                    lineHeight: "1.5",
                  }}
                >
                  {faq.answer}
                </p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="mt-12 md:mt-16 text-center">
          <p
            className="text-white/80 mb-6"
            style={{
              fontFamily:
                'GeistMono, ui-monospace, SFMono-Regular, "Roboto Mono", Menlo, Monaco, "Liberation Mono", "DejaVu Sans Mono", "Courier New", monospace',
              fontSize: "16px",
              lineHeight: "1.5",
            }}
          >
            Всё ещё сомневаетесь? Запустите первый бэктест за 5 минут — и посмотрите на реальные цифры своей стратегии.
          </p>

          {onOpenInstall && (
            <Button
              onClick={onOpenInstall}
              className="bg-white hover:bg-gray-100 text-black font-mono text-sm font-semibold tracking-wider py-3 px-6 rounded-lg"
              style={{
                fontFamily:
                  'GeistMono, ui-monospace, SFMono-Regular, "Roboto Mono", Menlo, Monaco, "Liberation Mono", "DejaVu Sans Mono", "Courier New", monospace',
                letterSpacing: "0.56px",
                height: "48px",
              }}
            >
              <Download className="mr-2 h-4 w-4 stroke-[2.5px]" />
              УСТАНОВИТЬ
            </Button>
          )}
        </div>
      </div>
    </section>
  )
}