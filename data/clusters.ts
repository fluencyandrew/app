export const contactCluster = {
  name: "CONTACT",
  senses: [
    {
      id: "contact",
      fullForm: "contact them",
      isPlaceholder: true,
    },
    {
      id: "chase-up",
      fullForm: "chase them up",
      isPlaceholder: false,
    },
    {
      id: "reach-out",
      fullForm: "reach out to them",
      isPlaceholder: false,
    },
  ],
};

export interface Sense {
  id: string;
  label: string;
  frameDescription: string;
  basicSenseDefinition: string;
}

export interface SensePill {
  sense: Sense;
  pill: string;
  chunks: string[];
  roleHierarchy?: string;
  emotionalTemperature?: string;
}

export const contactSenses: Record<string, SensePill> = {
  "reach-out": {
    sense: {
      id: "contact",
      label: "contact",
      frameDescription: "A initiates exchange with B",
      basicSenseDefinition:
        "To enter into communication or direct contact with; to reach out to establish connection",
    },
    pill: "Low-Pressure Relational Initiation",
    chunks: ["reach out to you"],
    roleHierarchy: "Peer or lower-status initiation",
    emotionalTemperature: "Warm, non-imposing",
  },
  "chase-up": {
    sense: {
      id: "contact",
      label: "contact",
      frameDescription: "A initiates exchange with B",
      basicSenseDefinition:
        "To enter into communication or direct contact with; to reach out to establish connection",
    },
    pill: "Delayed Response Recovery",
    chunks: ["chase them up", "chase them up again"],
    roleHierarchy: "Accountability pressure",
    emotionalTemperature: "Direct, persistent",
  },
};


