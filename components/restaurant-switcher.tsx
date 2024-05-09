"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Check,
  ChevronsUpDown,
  PlusCircle,
  StoreIcon,
} from "lucide-react";
import { Restaurant } from "@prisma/client";
import { useRestaurantModal } from "@/hooks/use-restaurant-modal";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type PopoverTriggerProps = React.ComponentPropsWithoutRef<
  typeof PopoverTrigger
>;

interface RestaurantSwitcherProps
  extends PopoverTriggerProps {
  items: Restaurant[];
}

const RestaurantSwitcher = ({
  className,
  items = [],
}: RestaurantSwitcherProps) => {
  const MAX_LENGTH = 20;

  const restauRantModal = useRestaurantModal();
  const params = useParams();
  const router = useRouter();

  const sliceName = (name: string) => {
    return name.length > MAX_LENGTH
      ? `${name.slice(0, MAX_LENGTH)}...`
      : name;
  };

  const formattedItems = items.map((item) => ({
    label: item.name,
    value: item.slug,
  }));

  const currentRestaurant = formattedItems.find(
    (item) => item.value === params.slug
  );

  const [open, setOpen] = useState(false);

  const onRestaurantSelect = (restaurant: {
    value: string;
    label: string;
  }) => {
    setOpen(false);
    router.push(`/admin/${restaurant.value}/dashboard`);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          role="combobox"
          aria-expanded={open}
          aria-label="Select a restaurant"
          className={cn(
            "w-[200px] justify-between text-[13px]",
            className
          )}
        >
          <StoreIcon className="mr-2 h-4 w-4" />
          {sliceName(currentRestaurant?.label!)}
          <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandList>
            <CommandInput
              placeholder="Search restaurant..."
              className="text-[13px]"
            />
            <CommandEmpty>
              No restaurant found.
            </CommandEmpty>
            <CommandGroup heading="Restaurants">
              {formattedItems.map((restaurant) => (
                <CommandItem
                  key={restaurant.value}
                  onSelect={() =>
                    onRestaurantSelect(restaurant)
                  }
                  className="text-[13px]"
                >
                  <StoreIcon className="mr-2 h-4 w-4" />
                  {restaurant.label}
                  <Check
                    className={cn(
                      "ml-auto h-4 w-4",
                      currentRestaurant?.value ===
                        restaurant.value
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
          <CommandSeparator />
          <CommandList>
            <CommandGroup>
              <CommandItem
                onSelect={() => {
                  setOpen(false);
                  restauRantModal.onOpen();
                }}
                className="text-[13px]"
              >
                <PlusCircle className="mr-2 h-5 w-5" />
                Create Store
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default RestaurantSwitcher;
