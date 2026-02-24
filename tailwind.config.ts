import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // FluencyFrames Base Colors
        background: "#0F1115",
        surface: "#161A20",
        border: "#242933",
        foreground: "#F5F7FA",
        "text-muted": "#8A93A5",
        
        // FluencyFrames Accent Colors
        "precision-blue": "#3B82F6",
        "strategic-green": "#22C55E",
        "caution-amber": "#F59E0B",
        "authority-purple": "#8B5CF6",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["Geist Mono", "monospace"],
      },
      fontSize: {
        conversation: ["16px", { lineHeight: "1.5" }],
        "conversation-lg": ["18px", { lineHeight: "1.6" }],
        "replaceable": ["20px", { lineHeight: "1.4", fontWeight: "500" }],
        "stage-badge": ["12px", { lineHeight: "1.2", fontWeight: "700", letterSpacing: "0.05em" }],
        "pill-meta": ["13px", { lineHeight: "1.3" }],
      },
      spacing: {
        "bubble-pad": "16px",
        "panel-pad": "24px",
        "msg-gap": "20px",
        "avatar-offset": "16px",
      },
      animation: {
        "option-glow": "optionGlow 150ms ease-out",
        "panel-slide": "panelSlide 250ms ease-out",
        "timer-pulse": "timerPulse 1s ease-in-out",
      },
      keyframes: {
        optionGlow: {
          from: { boxShadow: "0 0 0 0 rgba(59, 130, 246, 0)" },
          to: { boxShadow: "0 0 12px 4px rgba(59, 130, 246, 0.3)" },
        },
        panelSlide: {
          from: { transform: "translateX(100%)", opacity: "0" },
          to: { transform: "translateX(0)", opacity: "1" },
        },
        timerPulse: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.6" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
