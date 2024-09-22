import { useEffect } from 'react';
import { useRouter } from 'next/router';

const useAdminAuth = () => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');

    if (!token) {
      router.push('/admin/login'); // Redirect to admin login if no token
    }
  }, [router]);
};

export default useAdminAuth;