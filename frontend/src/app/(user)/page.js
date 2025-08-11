
import Hero from './Components/Hero';
import Highlights from './Components/Highilights';
import Heading from './Components/Heading';
import ProductCard from './Components/SectionCard';
import Lookbook from './Components/Lookbook';
import Testimonials from './Components/Testimonials';


 export const  metadata = {
  title: 'Bontega9',
  description: 'Welcome to Bontega, your one-stop shop for all things home decor.',
};

export default function HomePage() {
  return (
    <>
   
     
    
      <Hero Page="Home" />
      <Highlights/>
      <Heading tittle="Newly Arrived" subtittle="See All" />
      <ProductCard />
      <Lookbook />
      <Heading tittle="Best Seller" subtittle="See All" />
      <ProductCard />
      <Heading tittle="Dinning" subtittle="See All" />
      <ProductCard />
      <Heading tittle="Sofas" subtittle="See All" />
      <ProductCard />
     

      <Testimonials />
     
   
    </>
  );
}
