import Calendar from "./atomes/CalendarDemo/Calendar";
import Sliders from "../Sliders/Sliders";
import { StyledFlexRow } from "../styles/FlexRow.styled";
import { StyledHero } from "./styles/Hero.styled";
import Reviews from "./atomes/ReviewsDemo/Reviews";
import Mobile from "./atomes/MobileDemo/Mobile";
import { useCarousel } from "../../helpers/CarouselContext";

function Hero() {
  const [carouselState] = useCarousel();

  const activepage = carouselState.page;

  return (
    <StyledHero>
      <div>
        {activepage == 1 ? (
          <>
            <h3>
              Gérer et surveiller l’agenda de votre entreprise à la perfection.
            </h3>{" "}
            <Calendar />
          </>
        ) : activepage == 2 ? (
          <>
            <h3>
              Prenez note des retours de vos clients pour vous améliorer chaque
              jour.
            </h3>
            <Reviews />
          </>
        ) : (
          <>
            <h3>
              Modifiez vos rendez-vous depuis votre bureau ou votre smartphone.
            </h3>
            <Mobile />
          </>
        )}

        <StyledFlexRow>
          <Sliders />
        </StyledFlexRow>
      </div>
    </StyledHero>
  );
}

export default Hero;
