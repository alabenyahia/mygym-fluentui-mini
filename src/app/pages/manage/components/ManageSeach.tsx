import { SearchBox } from "@fluentui/react-search-preview";

export default function ManageSeach({ value, setValue }: any) {
  return (
    <SearchBox
      style={{ flex: 1 }}
      appearance="outline"
      value={value}
      placeholder="Search..."
      onChange={(e: any) => setValue(e.target.value as any)}
    />
  );
}
