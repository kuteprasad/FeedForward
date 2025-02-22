export const getNavbarItems = (user) => [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Profile", href: "/profile" },
    { name: "Home", href: "/home" },
    { name: "About Us", href: "/about" }
  ];
  
  export const getSidebarItems = (user) => {
    if (!user) return [];
  
    if (user.role === "ADMIN") {
      return [
        { name: "Dashboard", href: "/dashboard" },
        { name: "Users", href: "/admin/users" },
        // { name: "Settings", href: "/admin/settings" },
      ];
    }
  
    if (user.role === "NGO") {
      return [
        { name: "Dashboard", href: "/dashboard" },
        { name: "View available donations", href: "/availabledonations" },
        { name: "Profile", href: "/profile" },
        { name: "Notifications", href: "/notifications" }
        
      ];
    }
  
    return [
      { name: "Dashboard", href: "/dashboard" },
      { name: "Active Postings", href: "/postings" },
      { name: "Profile", href: "/profile" },
      { name: "Notifications", href: "/notifications" },
      { name: "History", href: "/history"}
    ];
  };