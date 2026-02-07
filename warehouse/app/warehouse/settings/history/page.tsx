"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { AppHeader } from "@/components/layouts/app-header";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Clock, Activity } from "lucide-react";

interface HistoryItem {
  id: string;
  action: string;
  description: string;
  user: string;
  timestamp: Date;
  status: "success" | "warning" | "error";
}

export default function History() {
  const [history, setHistory] = useState<HistoryItem[]>([
    {
      id: "1",
      action: "Product Added",
      description: "Added new product 'Laptop Pro 15'",
      user: "John Doe",
      timestamp: new Date("2024-02-07T10:30:00"),
      status: "success",
    },
    {
      id: "2",
      action: "Order Updated",
      description: "Updated order #ORD-12345 status to shipped",
      user: "Jane Smith",
      timestamp: new Date("2024-02-07T09:15:00"),
      status: "success",
    },
    {
      id: "3",
      action: "Inventory Adjusted",
      description: "Stock level adjusted for Product #P-456",
      user: "Admin",
      timestamp: new Date("2024-02-07T08:45:00"),
      status: "warning",
    },
    {
      id: "4",
      action: "Payment Failed",
      description: "Payment processing failed for order #ORD-12340",
      user: "System",
      timestamp: new Date("2024-02-06T23:30:00"),
      status: "error",
    },
    {
      id: "5",
      action: "User Login",
      description: "User 'John Doe' logged in",
      user: "John Doe",
      timestamp: new Date("2024-02-06T18:20:00"),
      status: "success",
    },
  ]);

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(date));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "success":
        return "bg-green-500/10 text-green-700 dark:text-green-400";
      case "warning":
        return "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400";
      case "error":
        return "bg-red-500/10 text-red-700 dark:text-red-400";
      default:
        return "bg-gray-500/10 text-gray-700 dark:text-gray-400";
    }
  };

  return (
    <div>
      <AppHeader title={"History"} />
      <div className="mx-auto px-4 py-4 space-y-6">
        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Activities
              </CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{history.length}</div>
              <p className="text-xs text-muted-foreground">
                Recent activities logged
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Recent Actions
              </CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24h</div>
              <p className="text-xs text-muted-foreground">
                Last 24 hours activities
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                System Status
              </CardTitle>
              <Badge className="bg-green-500/10 text-green-700 dark:text-green-400">
                Operational
              </Badge>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">99.9%</div>
              <p className="text-xs text-muted-foreground">Uptime</p>
            </CardContent>
          </Card>
        </div>

        {/* Activity Log */}
        <Card>
          <CardHeader>
            <CardTitle>Activity Log</CardTitle>
            <CardDescription>
              Recent activities and system events
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-hidden rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Action</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>Timestamp</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {history.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">
                        {item.action}
                      </TableCell>
                      <TableCell>{item.description}</TableCell>
                      <TableCell>{item.user}</TableCell>
                      <TableCell>{formatDate(item.timestamp)}</TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={getStatusColor(item.status)}
                        >
                          {item.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
