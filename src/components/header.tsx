import supabase from "@/supabase";
import useSession from "@/utils/checkSession";
import { Avatar, Box, Button, Divider, Stack, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

const Header = () => {
  const router = useRouter();
  const { checkAuth, isAuthenticated } = useSession();
  const handleLogout = async () => {
    await supabase.auth.signOut();
    await checkAuth();
    router.refresh();
  };

  const goToLogin = () => {
    router.push("/login");
  };

  return (
    <>
      <Stack direction="row" justifyContent="space-between">
        <Typography mb={3} align="center" variant="h4">
          Vine Review
        </Typography>
        <Box>
          <Stack direction="row" justifyContent="flex-end">
            {isAuthenticated ? (
              <>
                <Avatar alt="Utshab" src="/static/images/avatar/1.jpg" />
                <Button onClick={handleLogout}>Logout</Button>
              </>
            ) : (
              <>
                <Button onClick={goToLogin}>Login</Button>
              </>
            )}
          </Stack>
        </Box>
      </Stack>
      <Divider sx={{ marginBottom: "35px" }} />
    </>
  );
};

export default Header;
