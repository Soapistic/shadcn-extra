"use client";
import { Code, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ComponentDisplayProps {
  component: {
    id: string;
    name: string;
    description: string;
    requirement: string;
  };
}

export function ComponentDisplay({ component }: ComponentDisplayProps) {
  return (
    <div className="flex h-full flex-col">
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-6">
        <SidebarTrigger className="-ml-3" />
        <Separator orientation="vertical" className="mx-2 h-4" />
        <h1 className="text-xl font-semibold">{component.name}</h1>
      </header>
      <div className="flex-1 overflow-auto p-6">
        <div className="mb-6">
          <p className="text-muted-foreground">{component.description}</p>
          <p className="text-bold text-sm">{component.requirement}</p>
        </div>

        <Tabs defaultValue="preview">
          <TabsList>
            <TabsTrigger value="preview">Preview</TabsTrigger>
            <TabsTrigger value="code">Code</TabsTrigger>
          </TabsList>
          <TabsContent value="preview" className="mt-4">
            <div className="flex min-h-[300px] items-center justify-center rounded-lg border p-10">
              <ComponentPreview id={component.id} />
            </div>
          </TabsContent>
          <TabsContent value="code" className="mt-4">
            <div className="rounded-lg border">
              <div className="flex items-center justify-between border-b bg-muted/40 px-4 py-2">
                <div className="flex items-center gap-2">
                  <Code className="h-4 w-4" />
                  <span className="text-sm font-medium">
                    component-code.tsx
                  </span>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
              <pre className="overflow-auto p-4">
                <code className="text-sm text-muted-foreground">
                  {getComponentCode(component.id)}
                </code>
              </pre>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

function ComponentPreview({ id }: { id: string }) {
  switch (id) {
    case "price-input":
      return <PriceInput />;
    case "double-combobox":
      return <DoubleCombobox />;
    default:
      return <div>Component not found</div>;
  }
}

function getComponentCode(id: string): string {
  switch (id) {
    case "gradient-button":
      return `import { ButtonHTMLAttributes } from "react"
import { cn } from "@/lib/utils"

interface GradientButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary"
}

export function GradientButton({
  children,
  className,
  variant = "primary",
  ...props
}: GradientButtonProps) {
  return (
    <button
      className={cn(
        "relative inline-flex h-10 items-center justify-center overflow-hidden rounded-md px-4 py-2 font-medium text-white shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2",
        variant === "primary" 
          ? "bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 focus:ring-purple-500" 
          : "bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 focus:ring-orange-500",
        className
      )}
      {...props}
    >
      <span className="relative">{children}</span>
    </button>
  )
}`;
    case "price-input":
      return `"use client";

import { useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const currencies = [
  { value: "usd", label: "USD", icon: "🇺🇸", symbol: "$" },
  { value: "eur", label: "EUR", icon: "🇪🇺", symbol: "€" },
  { value: "mad", label: "MAD", icon: "🇲🇦", symbol: "DH" },
];

export function PriceInput() {
  const [open, setOpen] = useState(false);
  const [currency, setCurrency] = useState("eur");
  const [amount, setAmount] = useState("");

  const selectedCurrency = currencies.find((c) => c.value === currency);

  return (
    <div
      className={cn(
        "flex items-center rounded-md border bg-background text-sm shadow-sm ring-offset-background transition-colors focus-within:ring-2 focus-within:ring-ring/50 focus-within:ring-offset-2"
      )}
    >
      <span className="pl-3 pr-1 text-muted-foreground">
        {selectedCurrency?.symbol}
      </span>
      <input
        type="text"
        placeholder="0.00"
        inputMode="decimal"
        value={amount}
        onChange={(e) => setAmount(e.target.value.replace(/[^\d.]/g, ""))}
        className="h-9 w-[100px] bg-transparent py-1 text-sm outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
      />
      <div className="h-5 w-px bg-border mx-1" />
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button
            type="button"
            className="flex h-9 items-center gap-2 px-3 text-sm focus:outline-none"
          >
            <span className="flex items-center gap-2">
              <span>{selectedCurrency?.icon}</span>
              {selectedCurrency?.label}
            </span>
            <ChevronsUpDown className="h-4 w-4 opacity-50" />
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-[180px] p-0">
          <Command>
            <CommandInput placeholder="Search currency..." />
            <CommandList>
              <CommandEmpty>No currency found.</CommandEmpty>
              <CommandGroup>
                {currencies.map((c) => (
                  <CommandItem
                    key={c.value}
                    value={c.value}
                    onSelect={(val) => {
                      setCurrency(val);
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        currency === c.value ? "opacity-100" : "opacity-0"
                      )}
                    />
                    <span className="mr-2">{c.icon}</span>
                    {c.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
      `;
    case "double-combobox":
      return `"use client";

import { useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const currencies = [
  { value: "btc", label: "Bitcoin", icon: "/btc.svg", symbol: "BTC" },
  { value: "eth", label: "Ethereum", icon: "/eth.svg", symbol: "ETH" },
  { value: "usdt", label: "TetherUSD", icon: "/usdt.svg", symbol: "USDT" },
];
const options = [
  { value: "buy", label: "Buy" },
  { value: "sell", label: "Sell" },
  { value: "exchange", label: "Exchange" },
];

export function DoubleCombobox() {
  const [firstOpen, setFirstOpen] = useState(false);
  const [secondOpen, setSecondOpen] = useState(false);
  const [option, setOption] = useState("buy");
  const [currency, setCurrency] = useState("btc");

  const firstSelected = options.find((c) => c.value === option);
  const secondSelected = currencies.find((c) => c.value === currency);

  return (
    <div
      className={cn(
        "flex items-center rounded-md border bg-background text-sm shadow-sm ring-offset-background transition-colors focus-within:ring-2 focus-within:ring-ring/50 focus-within:ring-offset-2"
      )}
    >
      {/* From Currency Button */}
      <Popover open={firstOpen} onOpenChange={setFirstOpen}>
        <PopoverTrigger asChild>
          <button
            type="button"
            className="flex h-9 items-center gap-2 px-3 text-sm focus:outline-none"
          >
            <span className="flex items-center gap-2">
              {firstSelected?.label}
            </span>
            <ChevronsUpDown className="h-4 w-4 opacity-50" />
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-[180px] p-0">
          <Command>
            <CommandList>
              <CommandEmpty>No currency found.</CommandEmpty>
              <CommandGroup>
                {options.map((o) => (
                  <CommandItem
                    key={o.value}
                    value={o.value}
                    onSelect={(val) => {
                      setFirstOpen(false);
                      setOption(val);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        option === o.value ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {o.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {/* Divider */}
      <div className="h-5 w-px bg-border mx-1" />

      {/* To Currency Button */}
      <Popover open={secondOpen} onOpenChange={setSecondOpen}>
        <PopoverTrigger asChild>
          <button
            type="button"
            className="flex h-9 items-center gap-2 px-3 text-sm focus:outline-none"
          >
            <span className="flex items-center gap-2">
              <img src={secondSelected?.icon} className="h-4 w-4" alt="" />
              {secondSelected?.label}
            </span>
            <ChevronsUpDown className="h-4 w-4 opacity-50" />
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-[180px] p-0">
          <Command>
            <CommandInput placeholder="Currency..." />
            <CommandList>
              <CommandEmpty>No currency found.</CommandEmpty>
              <CommandGroup>
                {currencies.map((c) => (
                  <CommandItem
                    key={c.value}
                    value={c.value}
                    onSelect={(val) => {
                      setCurrency(val);
                      setSecondOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        currency === c.value ? "opacity-100" : "opacity-0"
                      )}
                    />
                    <img
                      src={c.icon}
                      className="h-4 w-4"
                      alt=""
                    />
                    {c.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
      `;
    default:
      return "// Component code not available";
  }
}

// Import SidebarTrigger to avoid TypeScript error
import { SidebarTrigger } from "@/components/ui/sidebar";
import { PriceInput } from "./custom/price-input";
import { DoubleCombobox } from "./custom/double-combobox";
