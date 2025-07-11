'use client';
import Heading from "./Components/Heading";
import Header from "./Components/Header";
import Hero from "./Components/Hero";
import ProductCard from "./Components/ProductCard";
import Lookbook from "./Components/Lookbook";
import Topnavbar from "./Components/TopNavbar";
import Testimonials from "./Components/Testimonials";

export default function Home() {
  return (
   <>
   <Topnavbar />
  <Header />
  <Hero/>
  <Heading tittle={"Newly Arrived"} subtittle={"See All"}/>
  <ProductCard />
  <Lookbook/>
  <Heading tittle={"Best Seller"} subtittle={"See All"}/>
  <ProductCard />
  <Heading tittle={"Dinning"} subtittle={"See All"}/>
  <ProductCard />
  <Heading tittle={"Sofas"} subtittle={"See All"}/>
  <ProductCard />
  <Testimonials/>
   </>
  );
}
