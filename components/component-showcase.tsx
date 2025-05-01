"use client";

import { useState } from "react";
import { CircleDot,  DollarSign } from "lucide-react";

import { AppSidebar } from "@/components/app-sidebar";
import { ComponentDisplay } from "@/components/component-display";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

// Sample component data
const components = [
  {
    id: "price-input",
    name: "Price Input",
    description:
      "A customized input field for price entry with currency formatting",
    requirement:
      "This component is built using a composition of the <Popover /> and the <Command /> components from shadcn.",
    category: "Inputs",
    icon: <DollarSign className="h-4 w-4" />,
  },
  {
    id: "double-combobox",
    name: "Double combobox",
    description:
      "A customized combobox component that allows for two selections",
    requirement:
      "This component is built using a composition of the <Popover /> and the <Command /> components from shadcn.",
    category: "Inputs",
    icon: <CircleDot className="h-4 w-4" />,
  }
];

export function ComponentShowcase() {
  const [selectedComponent, setSelectedComponent] = useState(components[0]);

  return (
    <SidebarProvider>
      <AppSidebar
        components={components}
        selectedComponent={selectedComponent}
        onSelectComponent={setSelectedComponent}
      />
      <SidebarInset>
        <ComponentDisplay component={selectedComponent} />
      </SidebarInset>
    </SidebarProvider>
  );
}
