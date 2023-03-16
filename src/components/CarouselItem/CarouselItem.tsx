import * as React from "react";
import CarouselCard from "../CarouselCard/CarouselCard";
import { useAppSelector } from "../../store/store";

function CarouselItem(props: any) {

  const products = useAppSelector(state => state.products);
  return (
   <></>
  );
}

export default CarouselItem;