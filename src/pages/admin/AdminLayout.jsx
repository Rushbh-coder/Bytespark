// import { useState } from "react";
// import Sidebar from "./Sidebar";
// import Header from "./Header";
// import DashboardView from "./Dashboard";
// import UsersView from "./Users";
// import ProductsView from "./Products";
// import UserModal from "./modals/AddUserModal";
// import ProductModal from "./modals/AddProductModel";

// const AdminLayout = () => {
//   const [currentView, setCurrentView] = useState("dashboard");
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [showUserModal, setShowUserModal] = useState(false);
//   const [showProductModal, setShowProductModal] = useState(false);

//   const [users, setUsers] = useState([
//     { id: 1, name: "Sophia Loren", email: "sophia@glow.com", role: "VIP Customer", status: "Active", avatar: "Sophia", joined: "Oct 2023" },
//     { id: 2, name: "Emma Wilson", email: "emma.w@skincare.co", role: "Member", status: "Active", avatar: "Emma", joined: "Nov 2023" },
//     { id: 3, name: "Isabella Reed", email: "isabella@beauty.com", role: "Member", status: "Inactive", avatar: "Isabella", joined: "Jan 2024" },
//   ]);

//   const [products, setProducts] = useState([
//     { id: 1, title: "Velvet Rose Serum", description: "Hydrating facial serum infused with organic rose petals and hyaluronic acid.", price: 45.0, category: "Skincare", rating: 4.9, image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=500&q=80" },
//     { id: 2, title: "Midnight Clay Mask", description: "Deep cleansing charcoal mask that detoxifies pores and revitalizes skin.", price: 32.0, category: "Treatments", rating: 4.7, image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500&q=80" },
//   ]);

//   const [newUser, setNewUser] = useState({ name: "", email: "", role: "Member" });
//   const [newProduct, setNewProduct] = useState({
//     title: "",
//     description: "",
//     price: "",
//     category: "Skincare",
//     image: "https://images.unsplash.com/photo-1596462502278-27bfad450216?w=500&q=80",
//   });

//   const handleAddUser = (e) => {
//     e.preventDefault();
//     const userEntry = {
//       ...newUser,
//       id: Date.now(),
//       status: "Active",
//       joined: new Date().toLocaleDateString("en-US", { month: "short", year: "numeric" }),
//       avatar: newUser.name,
//     };
//     setUsers([userEntry, ...users]);
//     setShowUserModal(false);
//     setNewUser({ name: "", email: "", role: "Member" });
//   };

//   const handleAddProduct = (e) => {
//     e.preventDefault();
//     const productEntry = {
//       ...newProduct,
//       id: Date.now(),
//       price: parseFloat(newProduct.price),
//       rating: 5.0,
//     };
//     setProducts([productEntry, ...products]);
//     setShowProductModal(false);
//     setNewProduct({
//       title: "",
//       description: "",
//       price: "",
//       category: "Skincare",
//       image: "https://images.unsplash.com/photo-1596462502278-27bfad450216?w=500&q=80",
//     });
//   };

//   const deleteUser = (id) => setUsers(users.filter((u) => u.id !== id));
//   const deleteProduct = (id) => setProducts(products.filter((p) => p.id !== id));
//   const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

//   return (
//     <div className="flex h-screen bg-[#fdfcfb] overflow-hidden">
//       <Sidebar
//         currentView={currentView}
//         setCurrentView={setCurrentView}
//         isSidebarOpen={isSidebarOpen}
//         toggleSidebar={toggleSidebar}
//         users={users}
//       />

//       <main className="flex-1 flex flex-col overflow-y-auto">
//         <Header toggleSidebar={toggleSidebar} />

//         <div className="p-10">
//           {currentView === "dashboard" && <DashboardView users={users} products={products} />}
//           {currentView === "users" && <UsersView users={users} deleteUser={deleteUser} setShowUserModal={setShowUserModal} />}
//           {currentView === "products" && <ProductsView products={products} deleteProduct={deleteProduct} setShowProductModal={setShowProductModal} />}
//         </div>

//         {showUserModal && (
//           <UserModal
//             newUser={newUser}
//             setNewUser={setNewUser}
//             handleAddUser={handleAddUser}
//             setShowUserModal={setShowUserModal}
//           />
//         )}

//         {showProductModal && (
//           <ProductModal
//             newProduct={newProduct}
//             setNewProduct={setNewProduct}
//             handleAddProduct={handleAddProduct}
//             setShowProductModal={setShowProductModal}
//           />
//         )}
//       </main>
//     </div>
//   );
// };

// export default AdminLayout;
import { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

const AdminLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(prev => !prev);
  };

  return (
    <div className="flex h-screen bg-[#fdfcfb] overflow-hidden">
      
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} />

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header toggleSidebar={toggleSidebar} />
        
        <div className="flex-1 overflow-y-auto p-10">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;



// import { useState } from "react";

// const AddUserModal = ({ onClose, onAdd }) => {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");

//   const submit = (e) => {
//     e.preventDefault();
//     onAdd({ id: Date.now(), name, email });
//     onClose();
//   };

//   return (
//     <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
//       <form onSubmit={submit} className="bg-white p-8 rounded-3xl w-96">
//         <h2 className="text-xl font-bold mb-4">Add User</h2>
//         <input
//           required
//           placeholder="Name"
//           className="w-full border p-3 mb-3 rounded-xl"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//         />
//         <input
//           required
//           placeholder="Email"
//           className="w-full border p-3 mb-3 rounded-xl"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
//         <button className="w-full bg-rose-500 text-white py-3 rounded-xl">
//           Save
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AddUserModal;
