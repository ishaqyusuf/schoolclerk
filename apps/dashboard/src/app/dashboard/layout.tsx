import { ProfileInitializer } from "@/components/profile-initializer";

export default async function Layout({ params, children }) {
  return (
    <div className="h-screen ">
      {children}
      <ProfileInitializer />
    </div>
  );
}
