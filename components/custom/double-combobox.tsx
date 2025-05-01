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
