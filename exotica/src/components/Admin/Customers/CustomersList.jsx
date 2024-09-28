import { logout } from '@/Redux/Reducers/adimnAuthSlice';
import api from '@/src/utils/api';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { MdVerified, MdClose } from 'react-icons/md';

const CustomersList = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage, setUsersPerPage] = useState(10); // Dynamic users per page
    const [totalPages, setTotalPages] = useState(1);

    const router = useRouter();
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchUsers = async () => {
            const token = localStorage.getItem('adminToken');

            try {
                const response = await api.get('/admin/get-site-users', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setUsers(response.data);
                setTotalPages(Math.ceil(response.data.length / usersPerPage));
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch users');
                setLoading(false);
                if (err.response?.status === 403 || err.response?.status === 401) {
                    dispatch(logout());
                    router.push('/admin/login');
                }
            }
        };

        fetchUsers();
    }, [router, usersPerPage]);

    // Handle dynamic change for users per page
    const handleUsersPerPageChange = (e) => {
        setUsersPerPage(Number(e.target.value));
        setCurrentPage(1); // Reset to page 1 when usersPerPage changes
    };

    // Get current users based on pagination
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Condensed pagination: Show a limited number of page buttons
    const renderPaginationButtons = () => {
        const buttons = [];
        const maxVisiblePages = 5; // Limit to 5 visible page buttons
        const half = Math.floor(maxVisiblePages / 2);
        const startPage = Math.max(currentPage - half, 1);
        const endPage = Math.min(currentPage + half, totalPages);

        for (let i = startPage; i <= endPage; i++) {
            buttons.push(
                <li key={i}>
                    <button
                        onClick={() => paginate(i)}
                        className={`px-4 py-2 border rounded ${i === currentPage ? 'bg-pink-300' : 'bg-white'} hover:bg-pink-200`}
                    >
                        {i}
                    </button>
                </li>
            );
        }

        return buttons;
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-lg font-semibold">Loading...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center text-red-600">
                <p>Error: {error}</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold text-center mb-6">Admin User List</h1>

            {/* Users per page input */}
            <div className="flex justify-end mb-4">
                <label className="mr-2">Users per page:</label>
                <input
                    type="number"
                    value={usersPerPage}
                    onChange={handleUsersPerPageChange}
                    className="border rounded px-2 py-1 w-20"
                    min="1"
                />
            </div>

            <div className="overflow-x-auto rounded-lg">
                <table className="min-w-full bg-white border border-gray-300 shadow-lg rounded-lg">
                    <thead className="bg-pink-300">
                        <tr>
                            <th className="py-3 px-6 text-left">Name</th>
                            <th className="py-3 px-6 text-left">Email</th>
                            <th className="py-3 px-6 text-left">Mobile</th>
                            <th className="py-3 px-6 text-center">Mobile Verified</th>
                            <th className="py-3 px-6 text-center">Email Verified</th>
                            <th className="py-3 px-6 text-center">Created At</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentUsers.map((user) => (
                            <tr key={user._id} className="border-t hover:bg-gray-50 transition duration-150">
                                <td className="py-3 px-6">{user.firstName} {user.lastName}</td>
                                <td className="py-3 px-6">{user.email}</td>
                                <td className="py-3 px-6">{user.mobile}</td>
                                <td className="py-3 px-6 text-center">
                                    {user.mobileVerified ? (
                                        <MdVerified className="text-green-600 text-xl" title="Verified" />
                                    ) : (
                                        <MdClose className="text-red-600 text-xl" title="Not Verified" />
                                    )}
                                </td>
                                <td className="py-3 px-6 text-center">
                                    {user.emailVerified ? (
                                        <MdVerified className="text-green-600 text-xl" title="Verified" />
                                    ) : (
                                        <MdClose className="text-red-600 text-xl" title="Not Verified" />
                                    )}
                                </td>
                                <td className="py-3 px-6 text-center">
                                    {new Date(user.createdAt).toLocaleDateString('en-GB', {
                                        day: 'numeric',
                                        month: 'short',
                                        year: 'numeric',
                                    })}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-6 space-x-2">
                {/* Previous Button */}
                {currentPage > 1 && (
                    <button onClick={() => paginate(currentPage - 1)} className="px-4 py-2 border rounded bg-white hover:bg-pink-200">
                        Previous
                    </button>
                )}
                
                {/* Page buttons */}
                <ul className="inline-flex items-center space-x-2">
                    {renderPaginationButtons()}
                </ul>

                {/* Next Button */}
                {currentPage < totalPages && (
                    <button onClick={() => paginate(currentPage + 1)} className="px-4 py-2 border rounded bg-white hover:bg-pink-200">
                        Next
                    </button>
                )}
            </div>
        </div>
    );
};

export default CustomersList;
