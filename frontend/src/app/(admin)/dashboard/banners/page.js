// This file must NOT have 'use client'
export const metadata = {
  title: 'Banner Management',
  description: 'Manage your banners effectively',
};

export default function BannerLayout({ children }) {
  return <>{children}</>; // Pure wrapper, allows metadata
}
