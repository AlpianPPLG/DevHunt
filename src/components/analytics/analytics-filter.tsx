"use client"

import { useState } from "react"
import { 
  Sheet, 
  SheetContent, 
  SheetDescription, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger,
  SheetFooter
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { 
  Select, 
  SelectContent, 
  SelectGroup, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select"
import { Filter, ArrowDownAZ, Calendar, Target } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"

export interface AnalyticsFilterOptions {
  dateRange: string;
  productCategory?: string;
  minViews?: number;
  minVotes?: number;
  minComments?: number;
  sortBy: string;
  showOnlyActive: boolean;
  includedMetrics: string[];
}

interface AnalyticsFilterProps {
  options: AnalyticsFilterOptions;
  onChange: (options: AnalyticsFilterOptions) => void;
}

export function AnalyticsFilter({ options, onChange }: AnalyticsFilterProps) {
  const [localOptions, setLocalOptions] = useState<AnalyticsFilterOptions>(options);
  const [isOpen, setIsOpen] = useState(false);
  
  const metricOptions = [
    { id: "views", label: "Views" },
    { id: "votes", label: "Votes" },
    { id: "comments", label: "Comments" },
    { id: "clicks", label: "Clicks" },
    { id: "engagement", label: "Engagement Rate" },
  ];
  
  const handleChange = (key: keyof AnalyticsFilterOptions, value: any) => {
    setLocalOptions(prev => ({ ...prev, [key]: value }));
  };
  
  const handleMetricToggle = (metricId: string) => {
    setLocalOptions(prev => {
      const metrics = prev.includedMetrics || [];
      if (metrics.includes(metricId)) {
        return { ...prev, includedMetrics: metrics.filter(id => id !== metricId) };
      } else {
        return { ...prev, includedMetrics: [...metrics, metricId] };
      }
    });
  };
  
  const applyFilters = () => {
    onChange(localOptions);
    setIsOpen(false);
  };
  
  const resetFilters = () => {
    const defaultOptions: AnalyticsFilterOptions = {
      dateRange: "30d",
      sortBy: "performance",
      showOnlyActive: false,
      includedMetrics: ["views", "votes", "comments", "engagement"]
    };
    setLocalOptions(defaultOptions);
    onChange(defaultOptions);
    setIsOpen(false);
  };
  
  const activeFiltersCount = Object.entries(localOptions).reduce((count, [key, value]) => {
    if (key === 'dateRange' || key === 'sortBy') return count;
    if (key === 'includedMetrics' && Array.isArray(value) && value.length !== 4) return count + 1;
    if (key === 'showOnlyActive' && value === true) return count + 1;
    if (value !== undefined && value !== '' && value !== 0) return count + 1;
    return count;
  }, 0);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className="relative">
          <Filter className="h-4 w-4 mr-2" />
          Filter
          {activeFiltersCount > 0 && (
            <Badge className="ml-2 bg-primary text-white" variant="secondary">
              {activeFiltersCount}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Filter Analytics</SheetTitle>
          <SheetDescription>
            Customize your analytics view with advanced filters
          </SheetDescription>
        </SheetHeader>
        
        <div className="py-6 space-y-6">
          {/* Date Range */}
          <div className="space-y-3">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
              <Label className="font-medium">Date Range</Label>
            </div>
            <Select 
              value={localOptions.dateRange} 
              onValueChange={(value) => handleChange('dateRange', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select date range" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="7d">Last 7 Days</SelectItem>
                  <SelectItem value="30d">Last 30 Days</SelectItem>
                  <SelectItem value="90d">Last 90 Days</SelectItem>
                  <SelectItem value="6m">Last 6 Months</SelectItem>
                  <SelectItem value="1y">Last Year</SelectItem>
                  <SelectItem value="all">All Time</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          
          <Separator />
          
          {/* Product Category */}
          <div className="space-y-3">
            <div className="flex items-center">
              <Target className="h-4 w-4 mr-2 text-muted-foreground" />
              <Label className="font-medium">Product Category</Label>
            </div>
            <Select 
              value={localOptions.productCategory || "all"} 
              onValueChange={(value) => handleChange('productCategory', value === "all" ? undefined : value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="dev-tools">Development Tools</SelectItem>
                <SelectItem value="design">Design Tools</SelectItem>
                <SelectItem value="productivity">Productivity</SelectItem>
                <SelectItem value="ai">AI & Machine Learning</SelectItem>
                <SelectItem value="saas">SaaS</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {/* Metric Filters */}
          <div className="space-y-4">
            <div className="flex items-center">
              <BarChart className="h-4 w-4 mr-2 text-muted-foreground" />
              <Label className="font-medium">Minimum Metrics</Label>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="min-views" className="text-sm">Min Views</Label>
                <Input
                  id="min-views"
                  type="number"
                  min="0"
                  value={localOptions.minViews || ""}
                  onChange={(e) => handleChange('minViews', e.target.value ? Number(e.target.value) : undefined)}
                  placeholder="0"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="min-votes" className="text-sm">Min Votes</Label>
                <Input
                  id="min-votes"
                  type="number"
                  min="0"
                  value={localOptions.minVotes || ""}
                  onChange={(e) => handleChange('minVotes', e.target.value ? Number(e.target.value) : undefined)}
                  placeholder="0"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="min-comments" className="text-sm">Min Comments</Label>
                <Input
                  id="min-comments"
                  type="number"
                  min="0"
                  value={localOptions.minComments || ""}
                  onChange={(e) => handleChange('minComments', e.target.value ? Number(e.target.value) : undefined)}
                  placeholder="0"
                />
              </div>
            </div>
          </div>
          
          <Separator />
          
          {/* Metrics to Include */}
          <div className="space-y-3">
            <Label className="font-medium">Metrics to Include</Label>
            <div className="grid grid-cols-2 gap-2">
              {metricOptions.map((metric) => (
                <div key={metric.id} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`metric-${metric.id}`}
                    checked={localOptions.includedMetrics?.includes(metric.id)}
                    onCheckedChange={() => handleMetricToggle(metric.id)}
                  />
                  <Label 
                    htmlFor={`metric-${metric.id}`}
                    className="text-sm font-normal"
                  >
                    {metric.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>
          
          <Separator />
          
          {/* Sorting */}
          <div className="space-y-3">
            <div className="flex items-center">
              <ArrowDownAZ className="h-4 w-4 mr-2 text-muted-foreground" />
              <Label className="font-medium">Sort By</Label>
            </div>
            <Select 
              value={localOptions.sortBy} 
              onValueChange={(value) => handleChange('sortBy', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select sorting" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="performance">Overall Performance</SelectItem>
                  <SelectItem value="views">Most Views</SelectItem>
                  <SelectItem value="votes">Most Votes</SelectItem>
                  <SelectItem value="comments">Most Comments</SelectItem>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="oldest">Oldest First</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          
          <Separator />
          
          {/* Additional Options */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="active-only" className="font-medium">Show Only Active Products</Label>
              <Switch
                id="active-only"
                checked={localOptions.showOnlyActive}
                onCheckedChange={(checked) => handleChange('showOnlyActive', checked)}
              />
            </div>
          </div>
        </div>
        
        <SheetFooter className="sm:justify-between">
          <Button variant="ghost" onClick={resetFilters}>
            Reset All
          </Button>
          <Button onClick={applyFilters}>
            Apply Filters
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

import { BarChart } from "lucide-react"