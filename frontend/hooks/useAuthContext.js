import { useContext } from "react";
import { AuthContext } from "../src/context/AuthContext";

export function useAuthContext() {
  try {
    const context = useContext(AuthContext);
    if (!context) throw new Error("hook needs to be used inside AuthContext");
    return context;
  } catch (error) {
    console.log(error.message);
  }
}
