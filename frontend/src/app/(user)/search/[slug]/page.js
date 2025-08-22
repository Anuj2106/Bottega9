"use client";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import Product from "@/app/(admin)/dashboard/products/layout";
import ProductCard from "../../Components/ProductCard";

const apiUrl = process.env.NEXT_PUBLIC_BACKEND_LINK;

export default function SearchSlugPage() {
  const { slug } = useParams();
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (slug) {
      axios
        .get(`${apiUrl}/api/search/${slug}`)
        .then((res) => setResults(res.data))
        .catch((err) => console.error("Search error:", err));
    }
  }, [slug]);

  const getImageUrl = (images) => {
    if (!images) return "/placeholder.jpg"; // fallback
    const firstImage = images.split(",")[0];
    if (!firstImage) return "/placeholder.jpg"; // no image in DB
    // ensure absolute URL
    return firstImage.startsWith("http")
      ? firstImage
      : `${apiUrl}/uploads/product_images/${firstImage}`;
  };

  return (
    <div className="container py-4">
      <h2>Search results for "{slug.replace(/-/g, " ")}"</h2>
      {results.length > 0 ? (
        <ProductCard products={results} />
      ) : (
        <p className="mt-3">No products found.</p>
      )}
    </div>
  );
}
