import { useMediaQuery } from "react-responsive";
import MobileLayout from "./MobileLayout";
import DesktopLayout from "./DesktopLayout";

export default function MainLayout({ children }: any) {
  const isMobile = useMediaQuery({ query: "(max-width: 920px)" });
  return isMobile ? (
    <MobileLayout>{children}</MobileLayout>
  ) : (
    <DesktopLayout>{children}</DesktopLayout>
  );
}
