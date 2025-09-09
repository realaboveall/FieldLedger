import { IconCirclePlusFilled, IconMail } from "@tabler/icons-react";

import { Button } from "@/components/ui/button"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
// import { FaWpforms } from "react-icons/fa6";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile } from "@fortawesome/free-regular-svg-icons";
import { faFileArchive, faRobot, faSquarePollHorizontal } from "@fortawesome/free-solid-svg-icons";

export function NavMain({
  items, setPage, page
}) {
  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2 mt-5">
        <SidebarMenu>

          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Form" onClick={() => setPage("Form")} className={page === 'Form' && "bg-[#9eb38d]"}>
              <FontAwesomeIcon icon={faFileArchive} />
              <span>Form</span>
            </SidebarMenuButton>
          </SidebarMenuItem>

          {/* <SidebarMenuItem>
            <SidebarMenuButton tooltip="Chatbot" onClick={() => setPage("Chatbot")} className={page === 'Chatbot' && "bg-[#9eb38d]"} >
              <FontAwesomeIcon icon={faRobot} />
              <span>AI Chatbot</span>
            </SidebarMenuButton>
          </SidebarMenuItem> */}

          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Transactions" onClick={() => setPage("Transactions")} className={page === 'Transactions' && "bg-[#9eb38d]"}>
              <FontAwesomeIcon icon={faSquarePollHorizontal} />
              <span>Previous Transactions</span>
            </SidebarMenuButton>
          </SidebarMenuItem>





        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
