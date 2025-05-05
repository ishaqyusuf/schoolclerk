import { ProfileInitializer } from "@/components/profile-initializer";

export default function Layout({ params, children }) {
  return (
    <div className="h-screen bg-emerald-500">
      {children}
      <ProfileInitializer />
    </div>
  );
}
