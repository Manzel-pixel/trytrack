
import Link from "next/link";

export function Sidebar() {
  const nav = [
    { href: "/", label: "Dashboard" },
    { href: "/teams", label: "Teams" },
    { href: "/players", label: "Players" },
    { href: "/wellness", label: "Wellness" },
    { href: "/reports", label: "Reports" },
  ];

  return (
    <div className="h-screen w-[240px] bg-white border-r border-neutral-200 p-4 relative">
      <div className="text-2xl font-bold text-brand">TryTrack</div>
      <div className="mt-6 space-y-1">
        {nav.map(item => (
          <Link key={item.href} href={item.href} className="block px-3 py-2 rounded-lg hover:bg-neutral-100">
            {item.label}
          </Link>
        ))}
      </div>
      <div className="absolute bottom-4 left-4 right-4 text-xs text-neutral-500">
        © 2025 TryTrack
      </div>
    </div>
  );
}
<Link href="/login" className="block px-3 py-2 rounded-lg hover:bg-neutral-100">
  Login
</Link>
