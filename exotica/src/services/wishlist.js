import api from '@/src/utils/api';

export const getWishlists = async (token) => {
    try {
        const response = await api.get(`/wishlist`, {
            headers: {
                'x-auth-token': token,
            },
        });
        console.log("::: wishlist :::", response.data.wishlist)
        return response.data.wishlist;
    } catch (error) {
        console.error('Error checking wishlist status:', error);
    }
};