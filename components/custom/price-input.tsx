"use client";

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
import { Input } from "../ui/input";

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
      <Input
        type="text"
        placeholder="0.00"
        inputMode="decimal"
        value={amount}
        onChange={(e) => setAmount(e.target.value.replace(/[^\d.]/g, ""))}
        className="border-0 h-9 w-[100px] bg-transparent py-1 text-sm outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
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
