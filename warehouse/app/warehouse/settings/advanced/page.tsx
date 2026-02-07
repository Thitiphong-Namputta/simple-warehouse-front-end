"use client";

import { useState } from "react";
import { AppHeader } from "@/components/layouts/app-header";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Settings2,
  Database,
  Bell,
  Shield,
  Globe,
  Save,
} from "lucide-react";
import { toast } from "sonner";

export default function Advanced() {
  const [settings, setSettings] = useState({
    apiUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000",
    timeout: "30",
    retryAttempts: "3",
    enableCache: true,
    enableNotifications: true,
    enableAnalytics: false,
    language: "en",
    timezone: "UTC",
    logLevel: "info",
  });

  const handleSave = () => {
    toast.success("Settings saved successfully!");
  };

  const handleReset = () => {
    toast.info("Settings reset to default");
  };

  return (
    <div>
      <AppHeader title={"Advanced Settings"} />
      <div className="mx-auto px-4 py-4 space-y-6">
        {/* API Configuration */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              <CardTitle>API Configuration</CardTitle>
            </div>
            <CardDescription>
              Configure API endpoints and connection settings
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="apiUrl">API Base URL</Label>
              <Input
                id="apiUrl"
                value={settings.apiUrl}
                onChange={(e) =>
                  setSettings({ ...settings, apiUrl: e.target.value })
                }
                placeholder="https://api.example.com"
              />
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="timeout">Request Timeout (seconds)</Label>
                <Input
                  id="timeout"
                  type="number"
                  value={settings.timeout}
                  onChange={(e) =>
                    setSettings({ ...settings, timeout: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="retryAttempts">Retry Attempts</Label>
                <Input
                  id="retryAttempts"
                  type="number"
                  value={settings.retryAttempts}
                  onChange={(e) =>
                    setSettings({ ...settings, retryAttempts: e.target.value })
                  }
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* System Preferences */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Settings2 className="h-5 w-5" />
              <CardTitle>System Preferences</CardTitle>
            </div>
            <CardDescription>
              Manage system-wide settings and preferences
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Enable Caching</Label>
                <p className="text-sm text-muted-foreground">
                  Cache API responses for better performance
                </p>
              </div>
              <Checkbox
                checked={settings.enableCache}
                onCheckedChange={(checked) =>
                  setSettings({ ...settings, enableCache: checked as boolean })
                }
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Enable Notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Receive system notifications and alerts
                </p>
              </div>
              <Checkbox
                checked={settings.enableNotifications}
                onCheckedChange={(checked) =>
                  setSettings({
                    ...settings,
                    enableNotifications: checked as boolean,
                  })
                }
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Enable Analytics</Label>
                <p className="text-sm text-muted-foreground">
                  Collect usage data for analytics
                </p>
              </div>
              <Checkbox
                checked={settings.enableAnalytics}
                onCheckedChange={(checked) =>
                  setSettings({
                    ...settings,
                    enableAnalytics: checked as boolean,
                  })
                }
              />
            </div>
          </CardContent>
        </Card>

        {/* Localization */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              <CardTitle>Localization</CardTitle>
            </div>
            <CardDescription>
              Configure language and regional settings
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="language">Language</Label>
                <Select
                  value={settings.language}
                  onValueChange={(value) =>
                    setSettings({ ...settings, language: value })
                  }
                >
                  <SelectTrigger id="language">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Spanish</SelectItem>
                    <SelectItem value="fr">French</SelectItem>
                    <SelectItem value="de">German</SelectItem>
                    <SelectItem value="ja">Japanese</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="timezone">Timezone</Label>
                <Select
                  value={settings.timezone}
                  onValueChange={(value) =>
                    setSettings({ ...settings, timezone: value })
                  }
                >
                  <SelectTrigger id="timezone">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="UTC">UTC</SelectItem>
                    <SelectItem value="America/New_York">
                      Eastern Time
                    </SelectItem>
                    <SelectItem value="America/Chicago">
                      Central Time
                    </SelectItem>
                    <SelectItem value="America/Los_Angeles">
                      Pacific Time
                    </SelectItem>
                    <SelectItem value="Europe/London">London</SelectItem>
                    <SelectItem value="Asia/Tokyo">Tokyo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Security & Logging */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              <CardTitle>Security & Logging</CardTitle>
            </div>
            <CardDescription>
              Configure security and logging preferences
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="logLevel">Log Level</Label>
              <Select
                value={settings.logLevel}
                onValueChange={(value) =>
                  setSettings({ ...settings, logLevel: value })
                }
              >
                <SelectTrigger id="logLevel">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="error">Error</SelectItem>
                  <SelectItem value="warn">Warning</SelectItem>
                  <SelectItem value="info">Info</SelectItem>
                  <SelectItem value="debug">Debug</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-sm text-muted-foreground">
                Set the minimum level for system logs
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <Button onClick={handleSave} className="flex items-center gap-2">
            <Save className="h-4 w-4" />
            Save Changes
          </Button>
          <Button
            variant="outline"
            onClick={handleReset}
            className="flex items-center gap-2"
          >
            Reset to Default
          </Button>
        </div>
      </div>
    </div>
  );
}
