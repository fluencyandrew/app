import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // shadcn/ui Base Theme - Dark Mode
        background: "#0F1115",
        foreground: "#F5F7FA",
        card: "#161A20",
        "card-foreground": "#F5F7FA",
        popover: "#161A20",
        "popover-foreground": "#F5F7FA",
        muted: "#8A93A5",
        "muted-foreground": "#8A93A5",
        accent: "#3B82F6",
        "accent-foreground": "#0F1115",
        destructive: "#F59E0B",
        "destructive-foreground": "#0F1115",
        border: "#242933",
        input: "#242933",
        ring: "#3B82F6",
        
        // FluencyFrames Accent Colors
        "precision-blue": "#3B82F6",
        "strategic-green": "#22C55E",
        "caution-amber": "#F59E0B",
        "authority-purple": "#8B5CF6",
        surface: "#161A20",
        "text-muted": "#8A93A5",
      },
      backgroundColor: {
        surface: "#161A20",
      },
      textColor: {
        primary: "#3B82F6",
        secondary: "#22C55E",
        destructive: "#F59E0B",
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
        "timer-pulse": "timerPulse 1s ease-in-out infinite",
        "fade-in-up": "fadeInUp 200ms ease-out",
        "fade-in-down": "fadeInDown 200ms ease-out",
        "slide-up": "slideUpFade 250ms ease-out",
        "pulse-subtle": "pulseSubtle 2s ease-in-out infinite",
      },
      keyframes: {
        optionGlow: {
          from: { boxShadow: "0 0 0 0 rgba(59, 130, 246, 0)" },
          to: { boxShadow: "0 0 12px 4px rgba(59, 130, 246, 0.2)" },
        },
        panelSlide: {
          from: { transform: "translateX(100%)", opacity: "0" },
          to: { transform: "translateX(0)", opacity: "1" },
        },
        timerPulse: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.7" },
        },
        fadeInUp: {
          from: { opacity: "0", transform: "translateY(12px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        fadeInDown: {
          from: { opacity: "0", transform: "translateY(-12px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        slideUpFade: {
          from: { opacity: "0", transform: "translateY(8px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        pulseSubtle: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.8" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
