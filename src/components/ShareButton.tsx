import { useState } from "react";

interface ShareButtonProps {
  url: string;
  className?: string;
}

export default function ShareButton({ url, className }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);

  async function handleShare() {
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      // Fallback para navegadores sem permissão de clipboard
      const ta = document.createElement("textarea");
      ta.value = url;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand("copy");
      } catch {
        /* silencioso */
      }
      document.body.removeChild(ta);
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2200);
  }

  return (
    <button
      onClick={handleShare}
      className={`rounded-xl border border-flash/40 bg-flash/10 px-5 py-3 font-bold text-flash transition hover:bg-flash/20 active:scale-[0.98] ${
        className ?? ""
      }`}
    >
      {copied ? "✓ Link copiado!" : "🔗 Compartilhar time"}
    </button>
  );
}
