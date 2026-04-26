import { TopNav } from '../_components/TopNav';
import { CartDrawer } from '../_components/CartDrawer';

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <TopNav />
      {children}
      <CartDrawer />
    </>
  );
}
