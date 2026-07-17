import Sidebar from "./Sidebar";

function Layout({ children }) {
  return (
    <div className="flex bg-gray-950 min-h-screen">
      <Sidebar />

      <main className="flex-1">{children}</main>
    </div>
  );
}

export default Layout;
