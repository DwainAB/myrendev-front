import { useEffect } from "react";
import { useCarousel } from "../../helpers/CarouselContext";
import { StyledSliders } from "./styles/Sliders.styled";

function Sliders() {
  const [carouselState, setCarouselState] = useCarousel();

  useEffect(() => {
    const interval = setInterval(() => {
      if (carouselState.page == 1) {
        setCarouselState({ page: 2 });
      }
      if (carouselState.page == 2) {
        setCarouselState({ page: 3 });
      }
      if (carouselState.page == 3) {
        setCarouselState({ page: 1 });
      }
    }, 2500);

    return () => {
      clearInterval(interval);
    };
  }, [carouselState]);

  return (
    <>
      <StyledSliders activepage={carouselState.page}>
        <div
          className="slider"
          onClick={() => setCarouselState({ page: 1 })}
        ></div>
        <div
          className="slider"
          onClick={() => setCarouselState({ page: 2 })}
        ></div>
        <div
          className="slider"
          onClick={() => setCarouselState({ page: 3 })}
        ></div>
      </StyledSliders>
    </>
  );
}

export default Sliders;
