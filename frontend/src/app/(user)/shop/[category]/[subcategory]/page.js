import axios from "axios";
import ProductList from "../../../Components/ProductList";
import Hero from "../../../Components/Hero";

const API = process.env.NEXT_PUBLIC_BACKEND_LINK;

// ✅ Generate dynamic metadata for SEO
export async function generateMetadata({ params }) {
  const awaitedParams = await params; // ✅ must await
  const { category, subcategory } = awaitedParams;

  try {
    const res = await axios.get(`${API}/api/shop/${category}/${subcategory}`);
    const products = res.data;

    return {
      title: `${subcategory} | BOTTEGA9`,
      description: `Explore premium ${subcategory} products under ${category} at BOTTEGA9. Total ${products.length} items.`,
    };
  } catch (err) {
    return {
      title: `${subcategory} | BOTTEGA9`,
      description: `Discover our ${subcategory} collection under ${category} at BOTTEGA9.`,
    };
  }
}

// ✅ Page component
const SubCategoryPage = async ({ params }) => {
  const awaitedParams = await params; // ✅ must await
  const { category, subcategory } = awaitedParams;

  let products = [];
  let categories = [];

  try {
    // ✅ Fetch subcategory products
    const resProducts = await axios.get(
      `${API}/api/shop/${category}/${subcategory}`
    );
    products = resProducts.data;

    // ✅ Fetch all categories for sidebar/filter
    const resCategories = await axios.get(`${API}/api/categories`);
    categories = resCategories.data;
  } catch (err) {
    console.error("Error fetching subcategory data:", err);
  }

  return (
    <>
      {/* Hero section */}
      <Hero Page={`${category}-${subcategory}`} />

      {/* Product list with filters/sorting */}
      <ProductList
        initialProducts={products}
        categories={categories}
        category={category}
        subcategory={subcategory}
      />
    </>
  );
};

export default SubCategoryPage;
