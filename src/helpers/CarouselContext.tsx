import { createContext, useContext, useState } from "react";

type CarouselContextType = [
  carouselState: {
    page: number;
  },
  setCarouselState: React.Dispatch<
    React.SetStateAction<{
      page: number;
    }>
  >
];

const CarouselContext = createContext<CarouselContextType>([
  {
    page: 1,
  },
  () => {},
]);

export const CarouselProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [carouselState, setCarouselState] = useState({
    page: 1,
  });
  return (
    <CarouselContext.Provider value={[carouselState, setCarouselState]}>
      {children}
    </CarouselContext.Provider>
  );
};

export const useCarousel = () => {
  return useContext(CarouselContext);
};
