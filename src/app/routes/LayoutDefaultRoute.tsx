import MainLayout from "../layouts/MainLayout";

export default function LayoutDefaultRoute({ element: Element, ...rest }: any) {
  return (
    <MainLayout>
      <Element {...rest} />
    </MainLayout>
  );
}
