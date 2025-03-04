// src/data/skills.ts
export interface Skill {
  name: string;
  category: string;
  icon?: string; // Path to SVG/PNG or null for emoji
}

export const skills: Skill[] = [
  // Frontend
  { name: "HTML", category: "Frontend" },
  { name: "CSS", category: "Frontend" },
  { name: "JavaScript", category: "Frontend" },
  { name: "React", category: "Frontend" },
  { name: "Vue", category: "Frontend" },
  { name: "jQuery", category: "Frontend" },
  { name: "Tailwind", category: "Frontend" },
  { name: "Astro", category: "Frontend" },
  
  // Backend
  { name: "PHP", category: "Backend" },
  { name: "Laravel", category: "Backend", icon: "/assets/icons/laravel.png" },
  { name: "CodeIgniter", category: "Backend", icon: "/assets/icons/codeigniter.svg" },
  { name: "Node.js", category: "Backend" },
  { name: "Python Flask", category: "Backend", icon: "/assets/icons/flask.svg" },
  { name: "FastAPI", category: "Backend", icon: "/assets/icons/fastapi.svg" },
  
  // Database/Storage
  { name: "Firebase", category: "Database/Storage" },
  { name: "Firestore", category: "Database/Storage", icon: "/assets/icons/firestore.svg" },
  
  // APIs & Integration
  { name: "OpenAI API", category: "APIs & Integration", icon: "/assets/icons/openai.svg" },
  { name: "Telegram API", category: "APIs & Integration", icon: "/assets/icons/telegram.svg" },
  { name: "Stripe", category: "APIs & Integration", icon: "/assets/icons/stripe.svg" },
  { name: "Lekirpay", category: "APIs & Integration", icon: "/assets/icons/lekirpay.png" },
  { name: "Billplz", category: "APIs & Integration", icon: "/assets/icons/billplz.svg" },
  { name: "Paydip", category: "APIs & Integration", icon: "/assets/icons/paydip.png" },
  { name: "Web3", category: "APIs & Integration", icon: "/assets/icons/web3.svg" }
];

// Group skills by category
export function getSkillsByCategory() {
  return skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);
}

export function getSkillIconPath(skillName: string): string | undefined {
  const skill = skills.find(s => s.name === skillName);
  return skill?.icon;
}
