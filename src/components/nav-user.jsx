import { IconLogout } from "@tabler/icons-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import grayuser from "@/assets/grayuser.png";

// ✅ bring in hooks
import { useUser } from "@/auth/UserContext";
import { useAccount } from "wagmi";

export function NavUser() {
  const { isMobile } = useSidebar();
  const { user, logout } = useUser(); // Appwrite user
  const { address, isConnected } = useAccount(); // Wallet user

  // ✅ Pick what to display
  const displayName = user?.name
    ? user.name
    : isConnected
    ? `${address.slice(0, 6)}...${address.slice(-4)}`
    : "Guest";

  const displayEmail = user?.email
    ? user.email
    : isConnected
    ? "Wallet Connected"
    : "Not logged in";

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
          <Avatar className="h-8 w-8 rounded-lg grayscale">
            <AvatarImage src={grayuser} alt={displayName} />
            <AvatarFallback className="rounded-lg">
              {displayName.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-medium">{displayName}</span>
            <span className="text-muted-foreground truncate text-xs">
              {displayEmail}
            </span>
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>

      {/* ✅ Logout only if Appwrite user is logged in */}
      {user && (
        <SidebarMenuItem>
          <SidebarMenuButton
            onClick={logout}
            className="text-red-500 hover:text-red-700">
            <IconLogout size={16} className="mr-2" />
            Logout
          </SidebarMenuButton>
        </SidebarMenuItem>
      )}
    </SidebarMenu>
  );
}
