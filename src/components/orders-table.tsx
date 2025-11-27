"use client";

import { useState, useMemo } from "react";
import { Order } from "../types/index";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import {
  ChevronDown,
  ChevronUp,
  FileText,
  Mail,
  Phone,
  Calendar,
  Languages,
  Download,
  Search,
  Filter,
  X,
  User,
  FileCheck,
  Clock,
  CheckCircle2,
  AlertCircle,
  Loader2,
  MessageSquare,
} from "lucide-react";
import { format, isPast, differenceInDays } from "date-fns";

interface OrdersTableProps {
  orders: Order[];
  onStatusChange: (orderId: number, newStatus: string) => void;
}

type StatusFilter = "all" | "Pending" | "WorkingON" | "Done";

export default function OrdersTable({
  orders,
  onStatusChange,
}: OrdersTableProps) {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");

  const toggleRow = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const matchesSearch =
        searchQuery === "" ||
        order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.customerEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.id.toString().includes(searchQuery);
      
      const matchesStatus =
        statusFilter === "all" || order.orderStatus === statusFilter;
      
      return matchesSearch && matchesStatus;
    });
  }, [orders, searchQuery, statusFilter]);

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      Pending: {
        variant: "outline" as const,
        className: "border-amber-500/50 text-amber-700 bg-amber-50 dark:bg-amber-950 dark:text-amber-400",
        icon: Clock,
      },
      WorkingON: {
        variant: "outline" as const,
        className: "border-blue-500/50 text-blue-700 bg-blue-50 dark:bg-blue-950 dark:text-blue-400",
        icon: Loader2,
      },
      Done: {
        variant: "outline" as const,
        className: "border-green-500/50 text-green-700 bg-green-50 dark:bg-green-950 dark:text-green-400",
        icon: CheckCircle2,
      },
    };

    const config = statusConfig[status as keyof typeof statusConfig] || {
      variant: "outline" as const,
      className: "border-gray-500/50 text-gray-700 bg-gray-50",
      icon: AlertCircle,
    };

    const Icon = config.icon;

    return (
      <Badge
        variant={config.variant}
        className={`${config.className} flex items-center gap-1.5 font-medium`}
      >
        <Icon className="h-3 w-3" />
        {status}
      </Badge>
    );
  };

  const getDaysUntilDeadline = (deadline: string) => {
    const days = differenceInDays(new Date(deadline), new Date());
    return days;
  };

  const isDeadlineApproaching = (deadline: string) => {
    const days = getDaysUntilDeadline(deadline);
    return days <= 3 && days >= 0;
  };

  const isDeadlinePast = (deadline: string) => {
    return isPast(new Date(deadline));
  };

  if (orders.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-16">
          <FileText className="h-12 w-12 text-muted-foreground mb-4" />
          <p className="text-lg font-medium text-muted-foreground">
            No orders found
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            Orders will appear here when customers submit translation requests
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Filters and Search */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, email, or order ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as StatusFilter)}>
                <SelectTrigger className="w-[180px]">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="WorkingON">In Progress</SelectItem>
                  <SelectItem value="Done">Done</SelectItem>
                </SelectContent>
              </Select>
              {(searchQuery || statusFilter !== "all") && (
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => {
                    setSearchQuery("");
                    setStatusFilter("all");
                  }}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
          {filteredOrders.length !== orders.length && (
            <p className="text-sm text-muted-foreground mt-3">
              Showing {filteredOrders.length} of {orders.length} orders
            </p>
          )}
        </CardContent>
      </Card>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.map((order) => {
          const isExpanded = expandedId === order.id;
          const isDone = order.orderStatus === "Done";
          const daysUntilDeadline = getDaysUntilDeadline(order.deadLine);
          const deadlineApproaching = !isDone && isDeadlineApproaching(order.deadLine);
          const deadlinePast = !isDone && isDeadlinePast(order.deadLine);

          return (
            <Card
              key={order.id}
              className={`transition-all duration-200 hover:shadow-md ${
                isExpanded ? "ring-2 ring-accent" : ""
              } ${
                isDone
                  ? "border-green-300 dark:border-green-800 bg-green-50/30 dark:bg-green-950/10"
                  : deadlinePast
                  ? "border-red-300 dark:border-red-800"
                  : deadlineApproaching
                  ? "border-amber-300 dark:border-amber-800"
                  : ""
              }`}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="flex items-center gap-3">
                      <div className={`flex items-center justify-center w-10 h-10 rounded-lg font-bold relative ${
                        isDone
                          ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                          : "bg-accent/10 text-accent"
                      }`}>
                        #{order.id}
                        {isDone && (
                          <CheckCircle2 className="absolute -top-1 -right-1 h-5 w-5 text-green-600 dark:text-green-400 bg-white dark:bg-background rounded-full" />
                        )}
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg flex items-center gap-2">
                          <User className="h-4 w-4 text-muted-foreground" />
                          {order.customerName}
                        </h3>
                        <div className="flex items-center gap-4 mt-1">
                          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                            <Mail className="h-3.5 w-3.5" />
                            {order.customerEmail}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    {getStatusBadge(order.orderStatus)}
                    <Select
                      value={order.orderStatus}
                      onValueChange={(value) => onStatusChange(order.id, value)}
                    >
                      <SelectTrigger className="w-[140px] h-9">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Pending">Pending</SelectItem>
                        <SelectItem value="WorkingON">In Progress</SelectItem>
                        <SelectItem value="Done">Done</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => toggleRow(order.id)}
                      className="shrink-0"
                    >
                      {isExpanded ? (
                        <ChevronUp className="h-5 w-5" />
                      ) : (
                        <ChevronDown className="h-5 w-5" />
                      )}
                    </Button>
                  </div>
                </div>
              </CardHeader>

              {/* Expanded Details */}
              {isExpanded && (
                <CardContent className="pt-0 border-t">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-6">
                    {/* Contact Information */}
                    <div className="space-y-4">
                      <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
                        Contact Information
                      </h4>
                      <div className="space-y-3">
                        <div className="flex items-start gap-3">
                          <Phone className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                          <div>
                            <p className="text-xs text-muted-foreground">Phone</p>
                            <p className="font-medium">{order.customerPhoneNumber}</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <Mail className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                          <div>
                            <p className="text-xs text-muted-foreground">Email</p>
                            <p className="font-medium break-all">{order.customerEmail}</p>
                          </div>
                        </div>
                        {order.preferredContact && (
                          <div className="flex items-start gap-3 pt-2 border-t">
                            <MessageSquare className="h-4 w-4 text-accent mt-0.5 shrink-0" />
                            <div className="flex-1">
                              <p className="text-xs text-muted-foreground">Preferred Contact Method</p>
                              <Badge variant="secondary" className="mt-1 capitalize">
                                {order.preferredContact}
                              </Badge>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Project Details */}
                    <div className="space-y-4">
                      <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
                        Project Details
                      </h4>
                      <div className="space-y-3">
                        <div className="flex items-start gap-3">
                          <FileText className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                          <div>
                            <p className="text-xs text-muted-foreground">Pages</p>
                            <p className="font-medium">{order.pageCount}</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <FileCheck className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                          <div>
                            <p className="text-xs text-muted-foreground">Words</p>
                            <p className="font-medium">{order.wordCount || "—"}</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <Languages className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                          <div>
                            <p className="text-xs text-muted-foreground">Languages</p>
                            <p className="font-medium">
                              {order.sourceLanguage || "—"} → {order.targetLanguage || "—"}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Timeline & Services */}
                    <div className="space-y-4">
                      <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
                        Timeline & Services
                      </h4>
                      <div className="space-y-3">
                        <div className="flex items-start gap-3">
                          <Calendar
                            className={`h-4 w-4 mt-0.5 shrink-0 ${
                              isDone
                                ? "text-green-500"
                                : deadlinePast
                                ? "text-red-500"
                                : deadlineApproaching
                                ? "text-amber-500"
                                : "text-muted-foreground"
                            }`}
                          />
                          <div>
                            <p className="text-xs text-muted-foreground">Deadline</p>
                            <p
                              className={`font-medium ${
                                isDone
                                  ? "text-green-600 dark:text-green-400"
                                  : deadlinePast
                                  ? "text-red-600 dark:text-red-400"
                                  : deadlineApproaching
                                  ? "text-amber-600 dark:text-amber-400"
                                  : ""
                              }`}
                            >
                              {format(new Date(order.deadLine), "PPP")}
                            </p>
                            {isDone ? (
                              <Badge className="mt-1 text-xs bg-green-100 text-green-700 border-green-300 dark:bg-green-900 dark:text-green-300">
                                Completed
                              </Badge>
                            ) : deadlinePast ? (
                              <Badge variant="destructive" className="mt-1 text-xs">
                                Overdue by {Math.abs(daysUntilDeadline)} day{Math.abs(daysUntilDeadline) !== 1 ? "s" : ""}
                              </Badge>
                            ) : deadlineApproaching ? (
                              <Badge className="mt-1 text-xs bg-amber-100 text-amber-700 border-amber-300 dark:bg-amber-900 dark:text-amber-300">
                                Due in {daysUntilDeadline} day{daysUntilDeadline !== 1 ? "s" : ""}
                              </Badge>
                            ) : (
                              <p className="text-xs text-muted-foreground mt-1">
                                {daysUntilDeadline} day{daysUntilDeadline !== 1 ? "s" : ""} remaining
                              </p>
                            )}
                          </div>
                        </div>
                        {order.createdAt && (
                          <div className="flex items-start gap-3">
                            <Calendar className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                            <div>
                              <p className="text-xs text-muted-foreground">Created</p>
                              <p className="font-medium">
                                {format(new Date(order.createdAt), "PPP")}
                              </p>
                            </div>
                          </div>
                        )}
                        {order.services && order.services.length > 0 && (
                          <div>
                            <p className="text-xs text-muted-foreground mb-2">Services</p>
                            <div className="flex flex-wrap gap-2">
                              {order.services.map((service, idx) => (
                                <Badge key={idx} variant="secondary" className="text-xs">
                                  {service}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Notes and File */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 pt-6 border-t">
                    {order.notes && (
                      <div>
                        <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide mb-3">
                          Notes
                        </h4>
                        <p className="text-sm bg-muted/50 p-4 rounded-lg border">
                          {order.notes}
                        </p>
                      </div>
                    )}
                    <div>
                      <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide mb-3">
                        Uploaded File
                      </h4>
                      {order.uploadedFilePath ? (
                        <Button
                          variant="outline"
                          asChild
                          className="w-full justify-start"
                        >
                          <a
                            href={`https://ash-translation-backend.up.railway.app${order.uploadedFilePath}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Download className="h-4 w-4 mr-2" />
                            Download File
                          </a>
                        </Button>
                      ) : (
                        <p className="text-sm text-muted-foreground bg-muted/50 p-4 rounded-lg border">
                          No file uploaded
                        </p>
                      )}
                    </div>
                  </div>
                </CardContent>
              )}
            </Card>
          );
        })}
      </div>

      {filteredOrders.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16">
            <Search className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-lg font-medium text-muted-foreground">
              No orders match your filters
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              Try adjusting your search or filter criteria
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
