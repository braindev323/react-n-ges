/**
 * Description: Dashboard style view routes
 * Date: 12/25/2018
 */

import Dashboard from "views/dashboard/Dashboard.jsx";

import Info from "views/my_salon/info/Info.jsx";
import Services from "views/my_salon/services/Services.jsx";
import Hours from "views/my_salon/hours/Hours.jsx";

import Check from "views/my_ledger/check/Check.jsx";
import MyEmployees from "views/my_ledger/MyEmployees/MyEmployees.jsx";

import BookingAppointment from "views/booking_appointment/BookingAppointment.jsx";

import SocialMarketing from "views/social_marketing/SocialMarketing.jsx";

import MyCustomers from "views/my_customers/MyCustomers.jsx";
import CustomerProfile from "views/my_customers/CustomerProfile.jsx";

import News from "views/Intranett/News.jsx";
import Contacts from "views/Intranett/Contacts/Contacts.jsx";
import Blank from "views/B2BShop/Blank.jsx";

import Profile from "views/profile/Profile.jsx";
import CompanyInfo from "views/company_info/CompanyInfo.jsx";
import MySalon from "views/MySalon/MySalon.jsx";

import CreateSalon from "views/CreateSalon.jsx";

// @material-ui/icons
import DashboardIcon from "@material-ui/icons/Dashboard";
import Home from "@material-ui/icons/Home";
import AlarmOn from "@material-ui/icons/AlarmOn";
import NewReleases from "@material-ui/icons/NewReleases";
import Shop from "@material-ui/icons/Shop";
import LocalShipping from "@material-ui/icons/LocalShipping";
import DateRange from "@material-ui/icons/DateRange";
import TrendingUp from "@material-ui/icons/TrendingUp";
import Group from "@material-ui/icons/Group"

export var dashRoutes1 = [ 
  {
    path: "/profile",
    name: "Min Profil",
    component: Profile
  },
  {
    path: "/companyInformasjon",
    name: "Företagsinformation",
    component: CompanyInfo
  },
  {
    path: "/mySalon",
    name: "Mina Salonger",
    component: MySalon
  },
  {
    path: "/dashboard",
    name: "Översikt",
    icon: DashboardIcon,
    component: Dashboard
  },
  {
    collapse: true,
    path: "/minsalong",
    name: "Min Salong",
    state: "openMinSalong",
    icon: Home,
    views: [
      {
        path: "/minsalong/salongInformasjon",
        name: "Salongsinformation",
        mini: "SI",
        component: Info
      },
      {
        path: "/minsalong/salongService",
        name: "Salongstjänster",
        mini: "SS",
        component: Services
      },
      {
        path: "/minsalong/openingHours",
        name: "Öppettider",
        mini: "O",
        component: Hours
      }
    ]
  },
  {
    collapse: true,
    path: "/personallister",
    name: "Personalliggare",
    state: "personallister",
    icon: AlarmOn,
    views: [
      {
        path: "/personallister/checkInOut",
        name: "Checka in/ut",
        mini: "CIU",
        component: Check
      },
      {
        path: "/personallister/myEmployees",
        name: "Mina anställda",
        mini: "MA",
        component: MyEmployees
      }
    ]
  },
  {
    path: "/bookingappointment",
    name: "Bokningssytem",
    icon: DateRange,
    component: BookingAppointment,
    // isDev: true
  }, 
  {
    path: "/social-marketing",
    name: "Social Marketing",
    icon: TrendingUp,
    component: SocialMarketing,
  }, 
  {
    path: "/my-customers",
    name: "My Customers",
    icon: Group,
    component: MyCustomers,
  }, 
  {
    path: "/customer-profile",
    name: "CustomerProfile",
    icon: Group,
    component: CustomerProfile,
  }, 
  {
    path: "https://shop.geselle-one.com//logoutandredirect/?token=",
    name: "Butik",
    icon: Shop,
    component: Blank
  },
  {
    path: "https://geselle.se//logoutandredirect/?token=",
    name: "Direkt",
    icon: LocalShipping,
    component: Blank
  },
  // {
  //   collapse: true,
  //   path: "/b2bshop",
  //   name: "Butik",
  //   state: "b2bshop",
  //   icon: Shop,
  //   // isDev: true,
  //   views: [
  //     {
  //       path: "/b2bshop/products",
  //       name: "Produkter",
  //       mini: "P",
  //       component: Products
  //     },
  //     {
  //       path: "/b2bshop/cart",
  //       name: "Shopping Cart",
  //       mini: "SC",
  //       component: ShoppingCart
  //     },
  //     {
  //       path: "/b2bshop/orders",
  //       name: "Order",
  //       mini: "O",
  //       component: Orders
  //     }
  //   ]
  // },
  {
    collapse: true,
    path: "/intranett",
    name: "Intranett",
    state: "intranett",
    icon: NewReleases,
    isDev: true,
    views: [
      {
        path: "/intranett/news",
        name: "News",
        mini: "N",
        component: News
      },
      {
        path: "/intranett/faq",
        name: "FAQ",
        mini: "F",
      },
      {
        path: "/intranett/marketing",
        name: "Marketing",
        mini: "M",
      },
      {
        path: "/intranett/contacts",
        name: "Contacts",
        mini: "C",
        component: Contacts
      }
    ]
  },
  { redirect: true, path: "/", pathTo: "/dashboard", name: "Dashboard" }
];

export var dashRoutes2 = [  
  {
    path: "/createsalon",
    name: "Skapa din första salong",
    icon: Home,
    component: CreateSalon
  },
  { redirect: true, path: "/", pathTo: "/createsalon", name: "Skapa din första salong" }
]
// export default dashRoutes;
