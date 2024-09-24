import supabase from "@/supabase";
import { useEffect, useState } from "react";

const useSession = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);

  const checkAuth = async () => {
    setLoading(true);
    const check = await supabase.auth.getSession();

    if (check && check.data && check.data.session) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }

    setLoading(false);
  };
  useEffect(() => {
    checkAuth();
  }, []);
  return { isAuthenticated, loading, checkAuth };
};

export default useSession;
