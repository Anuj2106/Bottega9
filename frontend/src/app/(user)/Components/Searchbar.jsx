'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

const SearchBar = ({ products, onAddToCart }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const searchRef = useRef(null);

  // Filter products based on query
  useEffect(() => {
    if (query.trim() === '') {
      setSuggestions([]);
      return;
    }
    const filtered = products.filter((item) =>
      item.name.toLowerCase().includes(query.toLowerCase())
    );
    setSuggestions(filtered.slice(0, 5));
  }, [query, products]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handler = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div ref={searchRef} className="relative w-full max-w-md mx-auto p-2">
      <input
        type="text"
        placeholder="Search products..."
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setIsOpen(true);
        }}
        className="w-full border rounded-lg p-2"
      />

      {isOpen && suggestions.length > 0 && (
        <ul className="absolute top-full left-0 w-full bg-white border mt-1 rounded-lg shadow-lg z-50">
          {suggestions.map((item) => (
            <li
              key={item.id}
              className="flex justify-between items-center p-2 hover:bg-gray-100"
            >
              <Link href={`/product/${item.id}`} className="flex-1">
                {item.name}
              </Link>
              <button
                className="bg-blue-500 text-white px-2 py-1 rounded text-sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onAddToCart(item);
                }}
              >
                Add
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
