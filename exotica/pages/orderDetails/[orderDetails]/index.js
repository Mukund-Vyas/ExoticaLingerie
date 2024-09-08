import OrderDetailsLayout from '@/src/components/OrderDetails/OrderDetailsLayout';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

const Index = () => {
    const router = useRouter();
    const { orderDetails } = router.query;

    if (!orderDetails) {
        return <div>Loading...</div>;  // Optionally show a loading state while waiting for the order number
    }

    return (
        <div>
            <OrderDetailsLayout orderNumber={orderDetails} />
        </div>
    );
}

export default Index;
