import { useRouter } from 'next/router';
import Link from 'next/link';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import useAdminAuth from '@/src/hooks/useAdminAuth'; // Adjust the path as needed
import { logout } from '@/Redux/Reducers/adimnAuthSlice';

const AdminLayout = ({ children }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  // Use admin auth hook to check for token
  useAdminAuth();

  const handleLogout = () => {
    // Call logout action (assuming you have one)
    dispatch(logout());
    router.push('/admin/login'); // Redirect to login page after logout
  };

  const adminRoutes = [
    { path: '/admin/blog', label: 'Add New Blog' },
    { path: '/admin/addproduct', label: 'Add New Product' },
    { path: '/admin/sitevisits', label: 'Site Visits' },
    // Add more routes as needed
  ];

  return (
    <div className="flex h-screen">
      <aside className="w-64 bg-pink-400 text-white">
        <div className="flex items-center justify-between p-4">
          <div className="text-xl font-bold">Admin Panel</div>
          <button onClick={handleLogout} className="text-sm">
            Logout
          </button>
        </div>
        <nav className="mt-4">
          <ul>
            {adminRoutes.map(route => (
              <li key={route.path}>
                <Link href={route.path}>
                  <p
                    className={`block p-4 hover:bg-pink-600 ${
                      router.pathname === route.path ? 'bg-pink-600 font-bold' : ''
                    }`}
                  >
                    {route.label}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
      <main className="flex-1 p-4 bg-pink-50 overflow-y-scroll">
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
