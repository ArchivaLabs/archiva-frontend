import { Bell, Building2, Palette, UserCog } from "lucide-react";
import ComingSoonPage, {
  type ComingSoonSection,
} from "@/components/shared/ComingSoonPage";

const sections: ComingSoonSection[] = [
  {
    icon: UserCog,
    title: "Profile",
    description: "Your display name, email, and avatar.",
  },
  {
    icon: Building2,
    title: "Organisation",
    description: "Workspace name, logo, and member defaults.",
  },
  {
    icon: Bell,
    title: "Notifications",
    description: "Choose what Archiva emails you about.",
  },
  {
    icon: Palette,
    title: "Appearance",
    description: "Theme and density preferences for this device.",
  },
];

export default function SettingsPage() {
  return (
    <ComingSoonPage
      title="Settings"
      description="Account and workspace settings aren't available yet. Here's what's on the way."
      sections={sections}
    />
  );
}
