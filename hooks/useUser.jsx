import { UserContext } from "@/contexts/UserContext.jsx";
import { useContext } from "react";

export default function useUser() {
  const { user } = useContext(UserContext);

  return user;
}
