import { Code, PenTool, HardHat, BookOpen, Hammer, Layout, Server, PaintRollerIcon, Music, Camera } from "lucide-react";
import type { ComponentType } from "react";

export type Categories = {
  id: number;
  name: string;
  icon: ComponentType<{ className: string }>;
};

export const categories: Categories[] = [
  { id: 1, name: "Programming", icon: Code },
  { id: 2, name: "Drawing", icon: PenTool },
  { id: 3, name: "Construction", icon: HardHat },
  { id: 4, name: "Teachers", icon: BookOpen },
  { id: 5, name: "Manual Labor", icon: Hammer },
  { id: 6, name: "Web Development", icon: Layout },
  { id: 7, name: "Backend Development", icon: Server },
  { id: 8, name: "Design", icon: PaintRollerIcon },
  { id: 9, name: "Music", icon: Music },
  { id: 10, name: "Photography", icon: Camera },
];
