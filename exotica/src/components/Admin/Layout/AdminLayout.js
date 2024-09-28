import { useRouter } from 'next/router';
import Link from 'next/link';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { FaBlog, FaProductHunt, FaChartBar, FaSignOutAlt, FaUsers } from 'react-icons/fa'; // Importing icons
import useAdminAuth from '@/src/hooks/useAdminAuth'; // Adjust the path as needed
import { logout } from '@/Redux/Reducers/adimnAuthSlice';
import Image from 'next/image';
import logo from '../../../../public/Images/logo.webp'

const AdminLayout = ({ children }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  // Use admin auth hook to check for token
  useAdminAuth();

  const handleLogout = () => {
    dispatch(logout());
    router.push('/admin/login'); // Redirect to login page after logout
  };

  const adminRoutes = [
    {
      label: 'Analytics',
      icon: <FaChartBar />,
      routes: [
        { path: '/admin/sitevisits', label: 'Site Visits' },
      ],
    },
    {
      label: 'Blog',
      icon: <FaBlog />,
      routes: [
        { path: '/admin/blog/addNew', label: 'Add New Blog' },
        { path: '/admin/blog/actions', label: 'Blog Actions' },
      ],
    },
    {
      label: 'Customers',
      icon: <FaUsers />,
      routes: [
        { path: '/admin/customers', label: 'Customers List' },
      ],
    },
    {
      label: 'Products',
      icon: <FaProductHunt />,
      routes: [
        { path: '/admin/addproduct', label: 'Add New Product' },
      ],
    },
    // Add more categories and routes as needed
  ];

  const openCategoryLabel = adminRoutes.find(category =>
    category.routes.some(route => router.pathname === route.path)
  )?.label;

  const [openCategories, setOpenCategories] = useState({});

  const toggleCategory = (categoryLabel) => {
    setOpenCategories((prev) => ({
      ...prev,
      [categoryLabel]: !prev[categoryLabel],
    }));
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-64 bg-pink-500 text-white">
        <div className="flex items-center justify-between p-4">
          {/* <div className="text-xl font-bold">Admin Panel</div> */}
          <Image
            src={logo}
            alt='logo'
            height={0}
            width={0}
            style={{ width: '90px', height: "auto" }}
            className='bg-pink-50 p-2 rounded-md'
          />
          <button onClick={handleLogout} className="text-lg hover:text-gray-200">
            <FaSignOutAlt />
          </button>
        </div>
        <nav className="mt-4">
          <ul>
            {adminRoutes.map((category) => (
              <li key={category.label}>
                <div
                  className="flex items-center cursor-pointer p-4 hover:bg-pink-600"
                  onClick={() => toggleCategory(category.label)}
                >
                  {category.icon}
                  <span className="ml-2 font-bold">{category.label}</span>
                </div>
                {/* Render nested routes only if the category is open or it is the active category */}
                {openCategories[category.label] || openCategoryLabel === category.label ? (
                  <ul className="ml-4">
                    {category.routes.map((route) => (
                      <li key={route.path}>
                        <Link href={route.path}>
                          <p
                            className={`block p-2 hover:bg-pink-600 hover:rounded-s-full ${router.pathname === route.path ? 'bg-pink-700 font-bold rounded-s-full' : ''
                              }`}
                          >
                            {route.label}
                          </p>
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : null}
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
