import { ComboboxDropdown } from "@school-clerk/ui/combobox-dropdown";

export function SelectTag({
  headless,
  onChange,
  selectedId,
  data,
}: {
  headless?: boolean;
  onChange: (selected: { id: string; label: string; slug: string }) => void;
  selectedId?: string;
  data;
}) {
  // const t = useI18n();

  // const data = TAGS.map((tag) => ({
  //     id: tag,
  //     label: t(`tags.${tag}`),
  //     slug: tag,
  // }));

  return (
    <ComboboxDropdown
      headless={headless}
      placeholder="Select tags"
      selectedItem={data.find((tag) => tag.id === selectedId)}
      searchPlaceholder="Search tags"
      items={data}
      onSelect={(item) => {
        onChange(item);
      }}
    />
  );
}
