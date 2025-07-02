import { createContextFactory } from "@/utils/context-factory";
import { isArrayParser } from "@/utils/nuq-is-array";
import { timeout } from "@/utils/timeout";
import { parseAsArrayOf, parseAsString, useQueryStates } from "nuqs";
import { useEffect, useState } from "react";

interface Props {
  filterSchema?: Partial<Record<string, any>>;
}
export const {
  Provider: SearchFilterProvider,
  useContext: useSearchFilterContext,
} = createContextFactory(({ filterSchema }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [filters, setFilters] = useQueryStates(filterSchema, {
    shallow: false,
  });
  const [hasFilter, setHasFilter] = useState(false);
  useEffect(() => {
    timeout(1000).then((e) => {
      setHasFilter(
        Object.entries(filters).some(
          ([a, b]) => ["search"].every((c) => c !== a) && b,
        ),
      );
    });
  }, []);
  const shouldFetch = isOpen || isFocused || hasFilter;
  function optionSelected(qk, { label, value }) {
    console.log(filterSchema?.[qk]);
    const isArray = isArrayParser(filterSchema?.[qk]);

    setFilters({
      [qk]: !isArray
        ? value
        : filters?.[qk]?.includes(value)
          ? filters?.[qk].filter((s) => s !== value)
          : [...(filters?.[qk] ?? []), value],
    });
  }
  return {
    shouldFetch,
    optionSelected,
    isFocused,
    setIsFocused,
    isOpen,
    setIsOpen,
    filters,
    setFilters,
  };
});
