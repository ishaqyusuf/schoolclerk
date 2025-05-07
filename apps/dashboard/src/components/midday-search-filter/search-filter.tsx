"use client";

import { useEffect, useRef, useState } from "react";
import { useDebounce } from "@/hooks/use-debounce";
import { SearchParamsKeys, searchParamsParser } from "@/utils/search-params";
import { useQueryStates } from "nuqs";
import { useHotkeys } from "react-hotkeys-hook";

import { cn } from "@school-clerk/ui/cn";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@school-clerk/ui/dropdown-menu";
import { Icons } from "@school-clerk/ui/icons";
import { Input } from "@school-clerk/ui/input";

import { Icon } from "../icons";
import { SelectTag } from "../select-tag";
import { FilterList } from "./filter-list";
import { searchIcons } from "./search-icons";

interface Props {
  // filters;
  // setFilters;
  defaultSearch?;
  placeholder?;
  filterList?: {
    value: SearchParamsKeys;
    options?: {}[];
    label?: string;
  }[];
}

export function MiddaySearchFilter({
  // filters,
  placeholder,
  // setFilters,
  defaultSearch = {},
  filterList,
}: Props) {
  const queryParams = Object.fromEntries(
    Object.entries(searchParamsParser).filter(([k, v]) =>
      filterList?.find((a) => a?.value === k),
    ),
  );
  const [filters, setFilters] = useQueryStates(queryParams, {
    shallow: false,
  });
  const [prompt, setPrompt] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [streaming, setStreaming] = useState(false);

  useHotkeys(
    "esc",
    () => {
      setPrompt("");
      setFilters(defaultSearch);
      setIsOpen(false);
    },
    {
      enableOnFormTags: true,
      enabled: Boolean(prompt),
    },
  );

  useHotkeys("meta+s", (evt) => {
    evt.preventDefault();
    inputRef.current?.focus();
  });

  useHotkeys("meta+f", (evt) => {
    evt.preventDefault();
    setIsOpen((prev) => !prev);
  });

  const handleSearch = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const value = evt.target.value;

    if (value) {
      setPrompt(value);
    } else {
      setFilters(defaultSearch);
      setPrompt("");
    }
  };
  const deb = useDebounce(prompt, 1500);
  const hasMounted = useRef(false);
  useEffect(() => {
    // console.log({ value, deb });

    if (!hasMounted.current) {
      hasMounted.current = true;
      return;
    }
    setFilters({
      search: deb.length > 0 ? deb : null,
    });
  }, [deb]);
  const handleSubmit = async () => {
    // If the user is typing a query with multiple words, we want to stream the results
    console.log(prompt);
    setFilters({ search: prompt.length > 0 ? prompt : null });
  };
  const hasValidFilters =
    Object.entries(filters).filter(
      ([key, value]) => value !== null && key !== "q",
    ).length > 0;
  function optionSelected(qk, { label, value }) {
    setFilters({
      [qk]: filters?.[qk]?.includes(value)
        ? filters?.[qk].filter((s) => s !== value)
        : [...(filters?.[qk] ?? []), value],
    });
  }
  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <div className="flex items-center space-x-4">
        <form
          className="relative"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <Icons.Search className="pointer-events-none absolute left-3 top-[11px] size-4" />
          <Input
            ref={inputRef}
            placeholder={placeholder}
            className="w-full pl-9 pr-8 md:w-[350px]"
            value={prompt}
            onChange={handleSearch}
            autoComplete="off"
            autoCapitalize="none"
            autoCorrect="off"
            spellCheck="false"
          />
          <DropdownMenuTrigger asChild>
            <button
              onClick={() => setIsOpen((prev) => !prev)}
              type="button"
              className={cn(
                "absolute right-3 top-[10px] z-10 opacity-50 transition-opacity duration-300 hover:opacity-100",
                hasValidFilters && "opacity-100",
                isOpen && "opacity-100",
              )}
            >
              <Icons.Filter className="size-4" />
            </button>
          </DropdownMenuTrigger>
        </form>
        <FilterList
          loading={streaming}
          onRemove={(obj) => {
            setFilters(obj);
            const clearPrompt = Object.entries(obj).find(
              ([k, v]) => k == "search" || k == "_q",
            )?.[0];
            console.log({ clearPrompt });
            if (clearPrompt) setPrompt(null);
          }}
          filters={filters}
          filterList={filterList}
        />
      </div>
      <DropdownMenuContent
        className="w-[350px]"
        sideOffset={19}
        alignOffset={-11}
        side="bottom"
        align="end"
      >
        {filterList
          ?.filter((a) => a.value != "search")
          ?.map((f) => (
            <DropdownMenuGroup key={f.value}>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  <Icon name={searchIcons[f.value]} className={"mr-2 size-4"} />
                  <span className="capitalize">
                    {f.value?.split(".").join(" ")}
                  </span>
                </DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent
                    sideOffset={14}
                    alignOffset={-4}
                    className="p-0"
                  >
                    {f.options?.length > 20 ? (
                      <>
                        <SelectTag
                          headless
                          data={f.options?.map((opt) => ({
                            label: opt.label,
                            id: opt.value,
                          }))}
                          onChange={(selected) => {
                            optionSelected(f.value, {
                              ...selected,
                              value: selected.id,
                            });
                          }}
                        />
                      </>
                    ) : (
                      f.options?.map(({ label, value }, _i) => (
                        <DropdownMenuCheckboxItem
                          onCheckedChange={() => {
                            optionSelected(f.value, { value, label });
                          }}
                          key={_i}
                        >
                          {label}
                        </DropdownMenuCheckboxItem>
                      ))
                    )}
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
            </DropdownMenuGroup>
          ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
