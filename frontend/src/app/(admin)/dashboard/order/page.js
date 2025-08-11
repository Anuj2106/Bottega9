  export async function generateMetadata() {
  return {
    title: 'Order Management',
    description: 'Manage your orders effectively',
  };
}

export default function OrderLayout({ children }) {
  return (
  
        {children}
    
  );
}