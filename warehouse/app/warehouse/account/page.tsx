"use client";

import { useSession } from "next-auth/react";
import { AppHeader } from "@/components/layouts/app-header";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  CircleUserRound,
  Mail,
  Shield,
  KeyRound,
  Trash2,
  CalendarDays,
} from "lucide-react";

export default function AccountPage() {
  const { data: session } = useSession();

  const user = session?.user;
  const initials = user?.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "??";

  return (
    <div>
      <AppHeader title="Account" />
      <div className="mx-auto px-4 py-4 space-y-6 max-w-3xl">

        {/* Profile Header Card */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16 rounded-xl">
                <AvatarImage src={user?.image ?? ""} alt={user?.name ?? ""} />
                <AvatarFallback className="rounded-xl text-lg font-semibold">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-semibold">{user?.name ?? "—"}</h2>
                  <Badge variant="secondary">Admin</Badge>
                </div>
                <p className="text-sm text-muted-foreground">{user?.email ?? "—"}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Personal Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <CircleUserRound className="size-4" />
              Personal Information
            </CardTitle>
            <CardDescription>Your account details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground uppercase tracking-wide">Full Name</p>
                <p className="text-sm font-medium">{user?.name ?? "—"}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground uppercase tracking-wide">Role</p>
                <p className="text-sm font-medium">Administrator</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground uppercase tracking-wide">Email</p>
                <div className="flex items-center gap-1.5">
                  <Mail className="size-3.5 text-muted-foreground" />
                  <p className="text-sm font-medium">{user?.email ?? "—"}</p>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground uppercase tracking-wide">Member Since</p>
                <div className="flex items-center gap-1.5">
                  <CalendarDays className="size-3.5 text-muted-foreground" />
                  <p className="text-sm font-medium">January 2025</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Security */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Shield className="size-4" />
              Security
            </CardTitle>
            <CardDescription>Manage your password and security settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <KeyRound className="size-4 text-muted-foreground" />
                  <p className="text-sm font-medium">Password</p>
                </div>
                <p className="text-xs text-muted-foreground pl-6">Last changed 3 months ago</p>
              </div>
              <Button variant="outline" size="sm" disabled>
                Change Password
              </Button>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <p className="text-sm font-medium">Two-Factor Authentication</p>
                <p className="text-xs text-muted-foreground">Add an extra layer of security</p>
              </div>
              <Badge variant="outline" className="text-muted-foreground">Not enabled</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Danger Zone */}
        <Card className="border-destructive/40">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base text-destructive">
              <Trash2 className="size-4" />
              Danger Zone
            </CardTitle>
            <CardDescription>Irreversible actions for your account</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <p className="text-sm font-medium">Delete Account</p>
                <p className="text-xs text-muted-foreground">
                  Permanently remove your account and all data
                </p>
              </div>
              <Button variant="destructive" size="sm" disabled>
                Delete Account
              </Button>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
