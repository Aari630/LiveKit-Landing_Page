"use client";

import { processChatMessage, type ChatAgentResponse, type CheckoutCardPayload, type Message as AgentMessage } from "@/actions/chat-agent";
import { Check, CheckCircle2, Copy, ExternalLink, QrCode, Send, Smartphone, Sparkles, X } from "lucide-react";
import { type FormEvent, useEffect, useRef, useState } from "react";

const prompts = ["Ask for a discount on this product", "Checkout instantly with UPI"];
type Payload = CheckoutCardPayload;
type Message = { id: string; role: "user" | "model"; type: "text"; content: string } | { id: string; role: "model"; type: "checkout_card"; content: Payload };
type Props = { isOpen: boolean; onClose: () => void; storeName: string };
const initialMessages: Message[] = [{ id: "welcome", role: "model", type: "text", content: "What can I help you checkout today?" }];

export function DemoModal({ isOpen, onClose, storeName }: Props) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isPaid, setIsPaid] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showLink, setShowLink] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, isTyping]);
  useEffect(() => {
    if (!isOpen) return;
    const width = window.innerWidth - document.documentElement.clientWidth;
    const overflow = document.body.style.overflow;
    const padding = document.body.style.paddingRight;
    document.body.style.overflow = "hidden";
    if (width) document.body.style.paddingRight = `${width}px`;
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === "Escape") onClose(); };
    window.addEventListener("keydown", closeOnEscape);
    return () => { document.body.style.overflow = overflow; document.body.style.paddingRight = padding; window.removeEventListener("keydown", closeOnEscape); };
  }, [isOpen, onClose]);
  useEffect(() => {
    if (!isOpen || isPaid) return;

    const latestMessage = messages[messages.length - 1];
    if (!latestMessage || latestMessage.type !== "checkout_card") return;

    let isCancelled = false;
    const intervalId = window.setInterval(async () => {
      try {
        const response = await fetch(`/api/payment-status?qrId=${latestMessage.content.qrId}&merchantId=${latestMessage.content.merchantId}`);
        if (!response.ok) return;

        const result: unknown = await response.json();
        if (!isCancelled && typeof result === "object" && result !== null && "paid" in result && result.paid === true) {
          window.clearInterval(intervalId);
          setIsPaid(true);
        }
      } catch {
      }
    }, 3000);

    return () => {
      isCancelled = true;
      window.clearInterval(intervalId);
    };
  }, [isOpen, isPaid, messages]);

  async function submit(value: string) {
    const text = value.trim();
    if (!text || isTyping) return;
    const history: AgentMessage[] = messages.filter((message): message is Extract<Message, { type: "text" }> => message.type === "text").map(({ role, content }) => ({ role, text: content }));
    setMessages((current) => [...current, { id: `${Date.now()}-user`, role: "user", type: "text", content: text }]);
    setInput("");
    setIsTyping(true);
    try {
      const response = await processChatMessage(history, text, storeName);
      setMessages((current) => [...current, responseMessage(response, `${Date.now()}-response`)]);
    } catch {
      setMessages((current) => [...current, { id: `${Date.now()}-error`, role: "model", type: "text", content: "Unable to process the checkout request right now." }]);
    } finally { setIsTyping(false); }
  }

  function responseMessage(response: ChatAgentResponse, id: string): Message {
    if (response.success) return { id, role: "model", type: "checkout_card", content: response.payload };
    return { id, role: "model", type: "text", content: response.error };
  }

  async function copyQr(url: string) { await navigator.clipboard.writeText(url); setCopied(true); window.setTimeout(() => setCopied(false), 1200); }
  function reset() { setMessages(initialMessages); setInput(""); setIsPaid(false); setCopied(false); setShowLink(false); }
  if (!isOpen) return null;

  return <div className="fixed inset-0 z-[60] bg-black/60 p-0 sm:p-5" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <div className="ml-auto flex h-full w-full max-w-xl flex-col overflow-hidden border-l border-zinc-800 bg-zinc-950 shadow-2xl sm:rounded-2xl sm:border" role="dialog" aria-modal="true" aria-labelledby="demo-title">
        <header className="flex items-center justify-between border-b border-zinc-800 px-5 py-4"><div className="flex items-center gap-3"><div className="grid h-9 w-9 place-items-center rounded-xl bg-emerald-400 text-zinc-950"><Sparkles size={17} /></div><div><h2 id="demo-title" className="text-sm font-semibold text-zinc-100">Live checkout demo</h2><p className="text-[11px] text-zinc-500">Try the autonomous payment flow</p></div></div><button type="button" onClick={onClose} aria-label="Close live demo" className="p-2 text-zinc-500 hover:text-white"><X size={18} /></button></header>
        <div className="flex-1 overflow-y-auto p-5"><div className="space-y-4" aria-live="polite">
          {messages.map((message) => <div key={message.id} className={message.role === "user" ? "flex justify-end" : "ml-8"}>{message.type === "checkout_card" ? <PaymentCard payload={message.content} isPaid={isPaid} onPaid={() => setIsPaid(true)} showLink={showLink} setShowLink={setShowLink} copied={copied} onCopy={() => void copyQr(message.content.qrImageUrl)} /> : <div className={`max-w-[90%] rounded-2xl px-4 py-3 text-sm ${message.role === "user" ? "bg-emerald-400 text-zinc-950" : "border border-zinc-800 bg-zinc-900 text-zinc-300"}`}>{message.content}</div>}</div>)}
          {messages.length === 1 && <div className="grid gap-2">{prompts.map((prompt) => <button key={prompt} type="button" onClick={() => void submit(prompt)} className="rounded-xl border border-zinc-800 p-3 text-left text-xs text-zinc-300 hover:border-emerald-400/50">{prompt}</button>)}</div>}
          {isTyping && <div className="text-xs text-zinc-500">Agent is preparing your response...</div>}
          <div ref={endRef} />
        </div></div>
        <form onSubmit={(event: FormEvent<HTMLFormElement>) => { event.preventDefault(); void submit(input); }} className="border-t border-zinc-800 p-4"><div className="flex gap-2 rounded-xl border border-zinc-800 bg-zinc-900 p-1.5"><input value={input} onChange={(event) => setInput(event.target.value)} disabled={isTyping} placeholder="Ask about a product or checkout..." className="min-w-0 flex-1 bg-transparent px-3 py-2 text-sm text-white outline-none" /><button type="submit" disabled={!input.trim() || isTyping} className="grid h-9 w-9 place-items-center rounded-lg bg-emerald-400 text-zinc-950 disabled:opacity-40"><Send size={15} /></button></div><button type="button" onClick={reset} className="mt-3 text-xs text-zinc-500 hover:text-white">Reset demo</button></form>
      </div>
    </div>;
}

function PaymentCard({ payload, isPaid, onPaid, showLink, setShowLink, copied, onCopy }: { payload: Payload; isPaid: boolean; onPaid: () => void; showLink: boolean; setShowLink: (value: boolean) => void; copied: boolean; onCopy: () => void }) {
  return <div className="w-full overflow-hidden rounded-2xl border border-emerald-400/25 bg-zinc-900"><div className="flex items-center justify-between border-b border-zinc-800 bg-emerald-400/[0.07] px-4 py-3 text-xs uppercase tracking-[0.14em] text-emerald-300"><span><QrCode className="mr-2 inline" size={15} /> Payment request</span><span className="font-mono text-[10px] text-zinc-500">{payload.qrId}</span></div><div className="space-y-4 p-4"><div className="flex justify-between gap-4"><div><p className="text-sm text-zinc-100">{payload.productName}</p><p className="text-xs text-zinc-500">Original ₹{payload.originalPrice.toLocaleString("en-IN")}</p></div><p className="text-xl font-semibold text-white">₹{payload.finalPrice.toLocaleString("en-IN")}</p></div><div className="flex justify-between rounded-lg bg-emerald-400/10 px-3 py-2 text-xs text-emerald-300"><span>Discount applied</span><span>{payload.discountApplied}% off</span></div>{isPaid ? <div className="flex items-center gap-2 rounded-xl bg-emerald-400/10 p-4 text-sm text-emerald-300"><CheckCircle2 size={20} /> Payment Successful. Credits added to account.</div> : <><div className="flex flex-col items-center gap-2 rounded-xl bg-white p-4"><img src={payload.qrImageUrl} alt={`Payment QR for ${payload.productName}`} className="h-44 w-44" /><span className="text-[11px] text-zinc-600">Scan with any UPI app</span></div><div className="flex gap-2"><button type="button" onClick={() => setShowLink(!showLink)} className="flex-1 rounded-xl border border-zinc-700 px-3 py-3 text-xs text-zinc-300"><Smartphone className="mr-2 inline" size={14} /> {showLink ? "Hide QR link" : "Show QR link"}</button><button type="button" onClick={onCopy} aria-label="Copy Razorpay QR image URL" className="rounded-xl border border-zinc-700 px-3 text-zinc-400">{copied ? <Check size={16} /> : <Copy size={16} />}</button></div>{showLink && <a href={payload.qrImageUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 break-all text-xs text-emerald-300">{payload.qrImageUrl} <ExternalLink size={14} /></a>}<button type="button" onClick={onPaid} className="w-full rounded-xl bg-emerald-400 px-4 py-3 text-sm font-semibold text-zinc-950"><Check className="mr-2 inline" size={16} /> Simulate Bank Success</button></>}</div></div>;
}
