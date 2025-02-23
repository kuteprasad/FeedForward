export const getNavbarItems = (user) => [
	// { name: "Profile", href: "/profile" },
	{ name: "Home", href: "/common/home" },
	{ name: "About Us", href: "/common/about" },
	{ name: "Disposed Food Effieciently", href: "/common/disposed" },
	{ name: "Cold Storage", href: "/common/coldStorage" },
];

export const getSidebarItems = (user) => {
	if (!user) return [];

	if (user.role === "admin") {
		return [
			{ name: "Dashboard", href: "/dashboard" },
			{ name: "Users", href: "/admin/users" },
			{ name: "confirm verification", href: "/admin/confirmVerifications" },
		];
	}

	if (user.role === "ngo") {
		return [
			{ name: "Dashboard", href: "/ngo/dashboard" },
			{ name: "Available Donations", href: "/ngo/availabledonations" },

			{ name: "Notifications", href: "/ngo/notifications" },
			{ name: "My requests", href: "/ngo/myrequests" },
			{ name: "Profile", href: "/ngo/profile" },
			// { name: "Verify NGO", href: "/ngo/verifyNgo" },
		];
	}

	return [
		{ name: "Dashboard", href: "/donor/dashboard" },
		{ name: "Profile", href: "/donor/profile" },
		{ name: "Notifications", href: "/donor/notifications" },
		{ name: "History", href: "/donor/history" },
		{ name: "My Donations", href: "/donor/Mydonations" },
		{ name: "Create Donations", href: "/donor/createDonations" },
	];
};
