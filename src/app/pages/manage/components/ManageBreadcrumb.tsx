import {
  BreadcrumbDivider,
  BreadcrumbItem,
  Breadcrumb,
} from "@fluentui/react-breadcrumb-preview";

export default function ManageBreadcrumb({ items }: any) {
  return (
    <Breadcrumb aria-label="Manage breadcrumb">
      {items.map((item: any) => {
        return (
          <>
            <BreadcrumbItem>{item}</BreadcrumbItem>
            <BreadcrumbDivider />
          </>
        )
      })}
    </Breadcrumb>
  );
}