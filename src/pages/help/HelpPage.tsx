import { BookOpen, MessagesSquare, LifeBuoy, Keyboard } from "lucide-react";
import ComingSoonPage, {
  type ComingSoonSection,
} from "@/components/shared/ComingSoonPage";

const sections: ComingSoonSection[] = [
  {
    icon: BookOpen,
    title: "Documentation",
    description: "Guides for capturing, indexing, and retrieving minutes.",
  },
  {
    icon: MessagesSquare,
    title: "FAQs",
    description: "Answers to the questions teams ask most often.",
  },
  {
    icon: LifeBuoy,
    title: "Contact support",
    description: "Reach the Archiva team when something isn't working.",
  },
  {
    icon: Keyboard,
    title: "Keyboard shortcuts",
    description: "Move around Archiva without leaving the keyboard.",
  },
];

export default function HelpPage() {
  return (
    <ComingSoonPage
      title="Help"
      description="Help and support resources aren't available yet. Here's what's on the way."
      sections={sections}
    />
  );
}
