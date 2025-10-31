import axios from "axios";
import ProductList from "../../Components/ProductList";
import Hero from "../../Components/Hero";
import PreloaderWrapper from "../../Components/Preloaderwrapper"; // ✅ import wrapper

const API = process.env.NEXT_PUBLIC_BACKEND_LINK;

// ✅ Generate dynamic metadata for SEO
export async function generateMetadata({ params }) {
  const { category } =  await params;

  try {
    const res = await axios.get(`${API}/api/shop/${category}`);
    const products = res.data;

    return {
      title: `${category} | BOTTEGA9`,
      description: `Explore premium ${category} products at BOTTEGA9. Total ${products.length} items.`,
    };
  } catch (err) {
    return {
      title: `${category} | BOTTEGA9`,
      description: `Discover our ${category} collection at BOTTEGA9.`,
    };
  }
}

// ✅ Page component
const CategoryPage = async ({ params }) => {
  const { category } = params;

  let products = [];
  let categories = [];

  try {
    // ✅ Fetch category products
    const resProducts = await axios.get(`${API}/api/shop/${category}`);
    products = resProducts.data;

    // ✅ Fetch all categories for sidebar/filter
    const resCategories = await axios.get(`${API}/api/categories`);
    categories = resCategories.data;
  } catch (err) {
    console.error("Error fetching category data:", err);
  }

  return (
    <PreloaderWrapper>
      {/* Hero section */}
      <Hero Page={category} />

      {/* Product list with filters/sorting */}
      <ProductList
        initialProducts={products}
        categories={categories}
        category={category}
      />
    </PreloaderWrapper>
  );
};

export default CategoryPage;
