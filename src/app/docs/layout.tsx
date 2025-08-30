import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { SidebarNav } from "@/components/docs/sidebar-nav"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import { docsConfig } from "@/config/docs"

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
        <aside className="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block">
          <div className="h-full overflow-y-auto py-6 pr-6 lg:py-8">
            <SidebarNav items={docsConfig.sidebarNav} />
          </div>
        </aside>
        <main className="flex-1 md:pt-6">
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  className="fixed top-20 left-4 z-50 h-8 w-8 px-0 text-base"
                >
                  <Menu className="h-4 w-4" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="pr-0">
                <div className="h-full overflow-y-auto py-6 pr-6">
                  <SidebarNav items={docsConfig.sidebarNav} />
                </div>
              </SheetContent>
            </Sheet>
          </div>
          <div className="pb-6">
            {children}
          </div>
        </main>
      </div>
      <Footer />
    </div>
  )
}