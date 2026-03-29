import { createBrowserRouter } from "react-router";
import { Login } from "./pages/Login";
import { Onboarding } from "./pages/Onboarding";
import { Home } from "./pages/Home";
import { Budget } from "./pages/Budget";
import { Goals } from "./pages/Goals";
import { Simulate } from "./pages/Simulate";
import { Profile } from "./pages/Profile";
import { AddExpense } from "./pages/AddExpense";
import { AICoach } from "./pages/AICoach";
import { Insights } from "./pages/Insights";
import { Layout } from "./components/Layout";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Login,
  },
  {
    path: "/onboarding",
    Component: Onboarding,
  },
  {
    Component: Layout,
    children: [
      {
        path: "/home",
        Component: Home,
      },
      {
        path: "/budget",
        Component: Budget,
      },
      {
        path: "/goals",
        Component: Goals,
      },
      {
        path: "/simulate",
        Component: Simulate,
      },
      {
        path: "/profile",
        Component: Profile,
      },
      {
        path: "/add-expense",
        Component: AddExpense,
      },
      {
        path: "/coach",
        Component: AICoach,
      },
      {
        path: "/insights",
        Component: Insights,
      },
    ],
  },
]);
