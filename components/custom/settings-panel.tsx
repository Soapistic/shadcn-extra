"use client"

import type React from "react"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { cn } from "@/lib/utils"

interface SettingsSectionProps {
  title: string
  children: React.ReactNode
  defaultExpanded?: boolean
}

function SettingsSection({ title, children, defaultExpanded = false }: SettingsSectionProps) {
  const [expanded, setExpanded] = useState(defaultExpanded)

  return (
    <div className="border-b pb-4">
      <button
        className="flex w-full items-center justify-between py-2 text-left font-medium"
        onClick={() => setExpanded(!expanded)}
      >
        {title}
        {expanded ? (
          <ChevronUp className="h-4 w-4 text-muted-foreground" />
        ) : (
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        )}
      </button>
      <div
        className={cn(
          "grid transition-all duration-200",
          expanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
        )}
      >
        <div className="overflow-hidden pt-2">{children}</div>
      </div>
    </div>
  )
}

export function SettingsPanel() {
  return (
    <div className="w-full max-w-md rounded-lg border bg-card p-6 shadow-sm">
      <h2 className="mb-4 text-xl font-semibold">Settings</h2>

      <div className="space-y-4">
        <SettingsSection title="Notifications" defaultExpanded>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="email-notifs">Email notifications</Label>
              <Switch id="email-notifs" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="push-notifs">Push notifications</Label>
              <Switch id="push-notifs" />
            </div>
          </div>
        </SettingsSection>

        <SettingsSection title="Appearance">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="dark-mode">Dark mode</Label>
              <Switch id="dark-mode" />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="animations">Animations</Label>
              <Switch id="animations" defaultChecked />
            </div>
          </div>
        </SettingsSection>

        <SettingsSection title="Privacy">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="analytics">Allow analytics</Label>
              <Switch id="analytics" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="cookies">Accept cookies</Label>
              <Switch id="cookies" defaultChecked />
            </div>
          </div>
        </SettingsSection>
      </div>

      <div className="mt-6 flex justify-end space-x-2">
        <Button variant="outline">Cancel</Button>
        <Button>Save Changes</Button>
      </div>
    </div>
  )
}
