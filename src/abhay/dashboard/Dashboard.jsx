import React, { useEffect, useState } from 'react'
import { useUser } from '@/auth/UserContext';
import { AppSidebar } from "@/components/app-sidebar"
import { ChartAreaInteractive } from "@/components/chart-area-interactive"
import { DataTable } from "@/components/data-table"
import { SectionCards } from "@/components/section-cards"
import { SiteHeader } from "@/components/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"

import data from "./data.json"
import ProductDetailsForm from './ProductDetailsForm';

export default function Dashboard() {
  const { user, loading, logout } = useUser();
  const [page,setPage] = useState('Form') 

  useEffect(()=>{console.log(page)},[page])

  return (
    <div className=''>
      <SidebarProvider
        style={
          {
            "--sidebar-width": "calc(var(--spacing) * 72)",
            "--header-height": "calc(var(--spacing) * 12)",
          } 
        }
      >
        <AppSidebar variant="inset" user={user} setPage={setPage} page={page}/>


        <SidebarInset>
          <SiteHeader page={page}/>
          <div className="flex flex-1 flex-col">
            <div className="@container/main flex flex-1 flex-col gap-2">
              <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 p-10">
                {page === "Form" && <ProductDetailsForm />}
              </div>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  )
}

