import { ModeToggle } from "./modele-toggle";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "./ui/navigation-menu";

const TopNavigationMenu = () => {
  return (
    <NavigationMenu className="w-full mt-2 max-w-full justify-center">
      <NavigationMenuList className="flex w-full justify-between">
        {/* Left-aligned menu
        <NavigationMenuItem>
          <NavigationMenuTrigger>Menu</NavigationMenuTrigger>
          <NavigationMenuContent>
            <NavigationMenuLink>Link</NavigationMenuLink>
          </NavigationMenuContent>
        </NavigationMenuItem> */}

        {/* Centered logo */}
        <div className="flex flex-1 justify-center">
          <NavigationMenuItem>
            <img
              src="/logo.png" // Remove /public from path
              alt="Logo"
              className="h-8 w-auto"
            />
          </NavigationMenuItem>
        </div>

        {/* Spacer to balance the layout */}
        <div className="flex flex-1" />
      </NavigationMenuList>
      <span className="absolute right-4">
        <ModeToggle />
      </span>
    </NavigationMenu>
  );
};

export default TopNavigationMenu;
