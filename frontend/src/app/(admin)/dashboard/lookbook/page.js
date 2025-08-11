  export async function generateMetadata() {
  return {
    title: 'Lookbook Management',
    description: 'Manage your lookbooks effectively',
  };
}
 export default function LookbookLayout({ children }) {
  return (
    <div className="lookbook-layout">
      <h1 className="text-center my-4">Lookbook Management</h1>
      <div className="container">
        {children}
      </div>
    </div>
  );
}