"use client"

import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu"
import { ClerkProvider, Show, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs'

import styles from "./navbar.module.scss"

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
          <div className="inline-flex gap-2 items-center">
            <Show when="signed-out">
                <SignUpButton>
                  <NavigationMenuLink>S'inscrire</NavigationMenuLink>
                </SignUpButton>
                <SignInButton>
                  <NavigationMenuLink className={styles.loginbtn}>Se connecter</NavigationMenuLink>
                </SignInButton>
              </Show>
              <Show when="signed-in">
                <UserButton />
              </Show>
          </div>
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  )
}
