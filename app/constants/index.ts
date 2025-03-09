interface NavLink {
  id: string;
  title: string;
  href: string;
}

export const navLinks: NavLink[] = [
  {
    id: "services",
    title: "Services",
    href: "#services",
  },
  {
    id: "gallery",
    title: "Gallery",
    href: "#gallery",
  },
  {
    id: "contact",
    title: "Contact",
    href: "#contact",
  },
]; 