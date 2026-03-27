import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu"

export function Navbar() {
  return (
    <header className="w-full border-b bg-background">
      <NavigationMenu className="w-full max-w-full px-6 py-1">
        <NavigationMenuList className="w-full justify-between">
          <NavigationMenuItem>
            <NavigationMenuLink href="/" className="font-bold text-base">
              RPGnexus
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink href="/auth">Inscription</NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  )
}
