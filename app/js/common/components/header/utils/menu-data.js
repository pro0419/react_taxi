export const mainGuestLinks = [
  {
    text: "Login or Register",
    link: "/login",
    icon: "login-icon"
  },
  {
    text: "Find Parking",
    link: "/find-parking",
    icon: "find-parking-icon"
  },
  {
    text: "Drive EZly",
    link: "",
    icon: "drive-ezly-icon"
  },
  {
    text: "Other Parking Options",
    link: "",
    icon: "other-parking-icon"
  }
];

export const mainUserLinks = [
  {
    text: "Find Parking",
    link: "/find-parking",
    icon: "find-parking-icon"
  },
  {
    text: "Find My Vehicle",
    link: "/find-vehicle",
    icon: "find-vehicle-icon"
  },
  {
    text: "My Account",
    link: "",
    icon: "my-account-icon",
    subMenu: "myAccountMenuLinks"
  },
  {
    text: "Drive EZly",
    link: "",
    icon: "drive-ezly-icon",
    subMenu: "driveEzlyMenuLinks"
  },
  {
    text: "Other Parking Options",
    link: "",
    icon: "other-parking-icon"
  },
  {
    text: "Logout",
    link: "/logout",
    icon: "logout-icon"
  },
  {
    text: "Driver View",
    link: "",
    icon: "driver-view-icon"
  },
  {
    text: "Street Parking View",
    link: "",
    icon: "street-parking-icon"
  },
  {
    text: "Managed Lot View",
    link: "",
    icon: "managed-lot-icon"
  }
];

export const mainAdminLinks = (townshipCode) => {

let links = [
  {
    text: "Find Parking",
    link: "/find-parking",
    icon: "find-parking-icon"
  },
  {
    text: "Find My Vehicle",
    link: "/find-vehicle",
    icon: "find-vehicle-icon"
  },
  {
    text: "My Account",
    link: "",
    icon: "my-account-icon",
    subMenu: "myAccountMenuLinks"
  },
  {
    text: "Admin",
    link: "/admin" + townshipCode,
    icon: "my-account-icon",
  },
  {
    text: "Drive EZly",
    link: "",
    icon: "drive-ezly-icon",
    subMenu: "driveEzlyMenuLinks"
  },
  {
    text: "Other Parking Options",
    link: "",
    icon: "other-parking-icon"
  },
  {
    text: "Logout",
    link: "/logout",
    icon: "logout-icon"
  },
  {
    text: "Driver View",
    link: "",
    icon: "driver-view-icon"
  },
  {
    text: "Street Parking View",
    link: "",
    icon: "street-parking-icon"
  },
  {
    text: "Managed Lot View",
    link: "",
    icon: "managed-lot-icon"
  }
];

return links;

} 

export const myAccountMenuLinks = [
  {
    text: "My Vehicles",
    link: "/my-vehicles",
    icon: "my-vehicles-icon"
  },
  {
    text: "My Permits",
    link: "/my-permits",
    icon: "my-permits-icon"
  },
  {
    text: "My Wallet",
    link: "/my-wallet",
    icon: "my-wallet-icon"
  },
  {
    text: "My Locations",
    link: "/my-locations",
    icon: "my-locations-icon"
  },
  {
    text: "My Tickets",
    link: "/my-tickets",
    icon: "my-tickets-icon"
  },
  {
    text: "Logout",
    link: "/logout",
    icon: "logout-icon"
  },
  {
    text: "Back to ParkEZly",
    link: "",
    icon: "back-icon",
    subMenu: "mainUserLinks"
  }
];

export const driveEzlyMenuLinks = [
  {
    text: "Directions",
    link: "/directions",
    icon: "directions-icon"
  },
  {
    text: "Traffic",
    link: "/traffic",
    icon: "traffic-icon"
  },
  {
    text: "Transit",
    link: "/transit",
    icon: "transit-icon"
  },
  {
    text: "Nearby",
    link: "/nearby",
    icon: "nearby-icon"
  },
  {
    text: "Weather",
    link: "/weather",
    icon: "weather-icon"
  },
  {
    text: "Back to ParkEZly",
    link: "",
    icon: "back-icon",
    subMenu: "mainUserLinks"
  }
];