import Hero from "../components/Hero/Hero";
import AuthBar from "../components/AuthBar/AuthBar";
import WhiteBackground from "../components/Atomes/WhiteBackground";
import { useNavigationContext } from "../helpers/NavigationContext";
import { useEffect } from "react";

function LoginPage() {
  const [navigateState, setNavigateState] = useNavigationContext();

  useEffect(() => {
    setNavigateState((prev) => ({ ...prev, isDisplayed: false }));
  }, []);
  return (
    <>
      <AuthBar />
      <Hero />
      {/* <WhiteBackground /> */}
    </>
  );
}

export default LoginPage;
