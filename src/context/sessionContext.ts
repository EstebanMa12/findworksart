import { createContext, useContext } from 'react';
import { Session } from "next-auth";

interface SessionContextType {
  session: Session | null;
  setSession: React.Dispatch<React.SetStateAction<Session | null>>;
}

export const SessionContext = createContext<SessionContextType | undefined>(undefined);

export function useSession() {
  return useContext(SessionContext);
}