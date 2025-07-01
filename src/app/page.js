'use client';
import Heading from "./Components/Heading";
import Header from "./Components/Header";
import Hero from "./Components/Hero";
import ProductCard from "./Components/ProductCard";
import Lookbook from "./Components/Lookbook";

export default function Home() {
  return (
   <>
  <Header />
  <Hero/>
  <Heading tittle={"Newly Arrived"} subtittle={"See all"}/>
  <ProductCard />
  <Lookbook/>
  
   </>
  );
}
