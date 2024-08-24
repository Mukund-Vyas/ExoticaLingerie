import { useCart } from '@/src/contexts/CartContext';
import React, { useEffect, useRef, useState } from 'react'
import { FcCalendar, FcMoneyTransfer } from 'react-icons/fc'
import { RiSecurePaymentFill, RiUserUnfollowFill } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import { PiCheckSquareOffsetLight } from "react-icons/pi";
import { setCartOpen } from '@/Redux/Reducers/cartSlice';
import api from '@/src/utils/api';
import toast, { Toaster } from 'react-hot-toast';
import { setProfileOpen } from '@/Redux/Reducers/profileSlice';
import Head from 'next/head';
import AddressSelectionModel from './CheckoutComponents/AddressSelectionModel';
import { Oval } from 'react-loader-spinner';
import { useRouter } from 'next/router';

// date conversion
const formatDate = (date) => {
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    return new Intl.DateTimeFormat('en-GB', options).format(date);
};


const CheckoutLayout = () => {
    const [payOnline, setPayOnline] = useState(true);
    const { state, dispatch } = useCart();
    const cartDispatch = useDispatch();
    const hasDispatched = useRef(false);
    const [totalPayable, setTotalPayable] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalDiscount, setTotalDiscount] = useState(0);
    const [afterDiscount, setAfterDiscount] = useState(0);
    const { authToken } = useSelector((state) => state.user);
    const [showCheckout, setShowCheckout] = useState(false);
    const { profileOpen } = useSelector((state) => state.profile);
    const [address, setAddress] = useState(null);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [isAddModelOpen, setIsAddModelOpen] = useState(false);
    const [isNewAdded, setIsNewAdded] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        // Compute total discount and payable amounts
        const totalAmount = state.selectedItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
        setTotalPrice(totalAmount);
        const totalDiscount = state.selectedItems.reduce((acc, item) => acc + (item.price - item.discountedPrice) * item.quantity, 0);
        setTotalDiscount(totalDiscount);
        const amountAfterDiscount = totalAmount - totalDiscount;
        setAfterDiscount(amountAfterDiscount);
        const additionalCharge = amountAfterDiscount < 999 ? 49 : 0;
        const calculatedTotalPayable = amountAfterDiscount + additionalCharge + (payOnline ? 0 : 29) + 2;
        setTotalPayable(calculatedTotalPayable);
    }, [state.selectedItems, payOnline]);

    if (state.selectedItems.length === 0 && !hasDispatched.current) {
        cartDispatch(setCartOpen({ isOpen: true }));
        hasDispatched.current = true;
    }

    const handlePaymentMethodChange = (payMethod) => {
        if (payMethod === "COD") {
            setPayOnline(false);
        }
        else {
            setPayOnline(true);
        }
    }

    const currentDate = new Date();
    const futureDate = new Date(currentDate.setDate(currentDate.getDate() + 7));

    // Format the future date
    const formattedDate = formatDate(futureDate);

    const handaleGetAddress = async () => {
        try {
            const response = await api.get('/users/addresses', {
                headers: {
                    'x-auth-token': authToken,
                },
                withCredentials: true
            });
            if (response.status === 200) {
                setAddress(response.data.addresses);
                setSelectedAddress(response.data.addresses[0])
                setShowCheckout(true);
            }
        } catch (error) {
            setShowCheckout(false);
            cartDispatch(setProfileOpen({ isOpen: true }));
            if (error.response && error.response.status === 401) {
                console.log("unautjorised");
                toast.error("Unauthorized, please loagin first")
            } else {
                console.log(error);
                toast.error('Unable to initiate payment. Please try again later.')
            }
        }
    }

    useEffect(() => {
        handaleGetAddress();
    }, [authToken, isNewAdded]);

    const toggleProfile = () => {
        cartDispatch(setProfileOpen({ isOpen: !profileOpen }));
    }

    const generateOrderNumber = () => {
        return `EXO${Date.now()}`;
    };

    const prepareOrderData = (orderNumber, orderStatus) => {
        const items = state.selectedItems.map(item => ({
            OrderItemId: item?.variation?._id,
            Sku: item?.variation?.SKU,
            productName: item?.productname,
            Quantity: item?.quantity,
            Price: item.price,
            itemDiscount: item.discountedPrice ? ((item.price - item.discountedPrice)/ item.price)*100 : 0,
        }));

        return {
            orderType: "retailorder",
            marketplaceId: 10,
            orderNumber: orderNumber,
            orderTotal: totalPayable,
            orderDate: new Date(),
            expDeliveryDate: new Date(new Date().setDate(new Date().getDate() + 7)),
            shippingCost: afterDiscount < 999 ? 49 : 0,
            discount: totalDiscount,
            walletDiscount: 0,
            promoCodeDiscount: 0,
            prepaidDiscount: 0,
            paymentMode: payOnline ? 1 : 0, // Example: 1 for online, 0 for COD
            paymentGateway: payOnline ? "Phonepe" : "NA", // Example value
            shippingMethod: 1,
            packageWeight: 250,
            packageHeight: 2,
            packageWidth: 4, 
            packageLength: 7,
            paymentTransactionId: 0,
            orderStatus,
            items,
            customer: {
                billing: {
                    name: `${selectedAddress?.firstName} ${selectedAddress?.lastName}`,
                    addressLine1: selectedAddress.street,
                    addressLine2: '',
                    postalCode: selectedAddress.pinCode,
                    city: selectedAddress.city,
                    state: selectedAddress.state,
                    country: selectedAddress.country,
                    contact: selectedAddress.mobile,
                },
                shipping: {
                    name: `${selectedAddress?.firstName} ${selectedAddress?.lastName}`,
                    addressLine1: selectedAddress.street,
                    addressLine2: '',
                    postalCode: selectedAddress.pinCode,
                    city: selectedAddress.city,
                    state: selectedAddress.state,
                    country: selectedAddress.country,
                    contact: selectedAddress.mobile,
                }
            },
        };
    };

    const handleCreateOrder = async (orderNumber, orderStatus) => {
        const orderData = prepareOrderData(orderNumber, orderStatus);

        try {
            const response = await api.post('/order/new-order', orderData, {
                headers: {
                    'x-auth-token': authToken,
                },
                withCredentials: true
            });

            if (response.status === 201) {
                dispatch({ type: 'REMOVE_SPECIFIC_ITEMS', payload: state.selectedItems });
                toast.success('Order placed successfully!');
            } else {
                toast.error('Failed to place order. Please try again.');
            }
        } catch (error) {
            console.error('Error placing order:', error);
            toast.error('An error occurred while placing your order. Please try again.');
        }
    };

    const handlePayNowClick = async () => {
        setIsLoading(true);
        const orderNumber = generateOrderNumber(); // Generate unique order number

        if (payOnline) {
            try {
                await handleCreateOrder(orderNumber, 0);
                const response = await api.post('/payment/new-payment', { price: totalPayable, orderNumber: orderNumber }, {
                    headers: {
                        'x-auth-token': authToken,
                    },
                    withCredentials: true
                });

                if (response.status === 200) {
                    window.location.href = response.data.redirectUrl;
                } else {
                    toast.error('Unable to initiate payment. Please try again later.');
                }
            } catch (error) {
                console.error('Error processing payment:', error);
                toast.error('An error occurred while processing your payment. Please try again.');
            }
        } else {
            try {
                await handleCreateOrder(orderNumber, 1); // Place the order for COD
                router.push("/checkout/Completed");
            } catch (error) {
                console.error('Error placing COD order:', error);
                toast.error('An error occurred while placing your order. Please try again.');
            }
        }
        setIsLoading(false);
    };


    // Address flow
    const handleSelectedAddress = (address) => {
        setSelectedAddress(address);
    }

    const handleAddressModelOpen = () => {
        setIsAddModelOpen(!isAddModelOpen);
    }

    const handleSetIsNewAdded = () => {
        setIsNewAdded(!isNewAdded);
    }
    return (
        <>
            <Head>
                <meta name="referrer" content="strict-origin-when-cross-origin" />
            </Head>
            {isLoading && (
                    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
                        <Oval color="#ff197d" secondaryColor="#ffb1d3" height={80} width={80} />
                    </div>
                )
            }
            {isAddModelOpen && (
                <div className='relative'>
                    <AddressSelectionModel address={address} handleSelectedAddress={handleSelectedAddress} handleAddressModelOpen={handleAddressModelOpen} handleSetIsNewAdded={handleSetIsNewAdded} />
                </div>
            )}
            {showCheckout && (
                <div className='w-full p-10 px-28 bg-pink-50 max-sm:px-4'>
                    <Toaster position='bottom-center' />
                    <h1 className='font-bold font-mono my-4 text-2xl'>Checkout</h1>
                    {state.selectedItems && state.selectedItems.length === 0 ? (<div className='flex flex-col items-center text-center'>
                        <PiCheckSquareOffsetLight className='text-3xl text-primary' />
                        Please add items to your cart before proceeding.
                    </div>) : (<div className='flex gap-4 max-lg:flex-col max-lg:items-center'>
                        <div className='w-4/6 flex flex-col gap-2 max-lg:w-full'>
                            <div className='p-4 w-full flex flex-col gap-2 border border-slate-400 rounded-md bg-white'>
                                <h1 className='font-medium flex gap-2 items-center pb-2 border-b-[1px] border-gray-400'> <FcCalendar /> Mark Your Calendar.</h1>
                                <div className='flex gap-2 flex-wrap'>
                                    {state.selectedItems?.map((item, index) => (
                                        <div key={"cart item" + index} className='border border-secondary w-fit rounded-md flex items-center min-h-12'>
                                            <img src={item?.variation?.imageUrls[0].replace('dl=0', 'raw=1')} alt="cart-item" title='cart-item-1' className='h-12 rounded-l-md' />
                                            <div className='px-4 text-xs'>
                                                <h2 className='font-sans'>Estimated Delivery By:</h2>
                                                <p className='text-primary'>{formattedDate}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                            </div>
                            <div className='p-4 w-full flex flex-col gap-2 border border-slate-400 rounded-md bg-white'>
                                <h1 className='font-medium text-lg flex gap-2 items-center pb-2 border-b-[1px] border-gray-400'> <FcMoneyTransfer /> Choose Your Preferred Payment Method.</h1>
                                <div className='flex flex-col gap-2 text-sm'>
                                    <button
                                        className='border border-pink-200 bg-slate-100 p-2 rounded-md text-start flex justify-between pr-2 items-center'
                                        onClick={() => handlePaymentMethodChange('Online')}
                                    >
                                        Pay with Online Payment Methods.
                                        <div className='flex gap-2 items-center'>
                                            {payOnline && (
                                                <div className='font-medium text-green-800'>
                                                    ₹{totalPayable.toFixed(2)}
                                                </div>
                                            )}
                                            <div className={`w-5 h-5 rounded-full ${payOnline ? 'bg-primary border-4 border-double border-pink-50' : 'border border-slate-500'}`}></div>
                                        </div>
                                    </button>
                                    <button
                                        className='p-2 border border-pink-200 rounded-md bg-slate-100 text-start'
                                        onClick={() => handlePaymentMethodChange('COD')}
                                    >
                                        <div className='flex justify-between items-center'>
                                            Cash on Delivery.
                                            <div className='flex gap-2 items-center'>
                                                {!payOnline && (
                                                    <div className='font-medium text-green-800'>
                                                        ₹{totalPayable.toFixed(2)}
                                                    </div>
                                                )}
                                                <div className={`w-5 h-5 rounded-full ${payOnline ? 'border border-slate-500 ' : 'bg-primary border-4 border-double border-pink-50'}`}></div>
                                            </div>
                                        </div>
                                        {
                                            !payOnline && (
                                                <div>
                                                    <p className='text-xs text-gray-400'>A charge of ₹29 is applicable on COD.</p>
                                                </div>
                                            )
                                        }
                                    </button>
                                </div>
                            </div>
                            <div className='w-full flex justify-center items-center gap-2 py-2'>
                                <RiSecurePaymentFill className='text-2xl' />
                                <p className='text-center'>Secure Payment : Powerd by </p>
                                <img src="https://w7.pngwing.com/pngs/345/591/png-transparent-phonepe-hd-logo.png" title='Phonepe' alt="phonepe logo" className='h-5' />
                            </div>
                        </div>
                        {/* Rigth Side */}
                        <div className='w-2/6 h-fit flex flex-col gap-2 max-lg:w-full'>
                            {/* Address */}
                            <div className='border bg-white border-slate-400 rounded-md px-3'>
                                <div className='py-2 border-b-[1px] border-gray-400 flex justify-between items-center'>
                                    <span className='font-medium'>Deliver To</span>
                                    <button className='text-primary font-light text-sm font-serif hover:underline' title='Change your deliver address' onClick={() => handleAddressModelOpen()}>
                                        Change
                                    </button>
                                </div>
                                <div className='py-1'>
                                    {selectedAddress && (
                                        <div className='w-full min-h-28 bg-zinc-50 flex flex-col justify-center my-2 p-2 border border-pink-200 text-sm rounded-md'>
                                            <span className='font-medium flex justify-between'>
                                                {selectedAddress?.firstName} {selectedAddress?.lastName}
                                            </span>
                                            <span className='text-wrap'>{selectedAddress?.street}</span>
                                            <span>{selectedAddress?.city}, {selectedAddress?.state} - {selectedAddress?.pinCode}</span>
                                            <span>{selectedAddress?.country}</span>
                                            <span className='font-medium'>Contact No: {selectedAddress?.mobile}</span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Order Details */}
                            <div className='border bg-white border-slate-400 rounded-md px-3'>
                                <div className='py-2 border-b-[1px] border-gray-400 flex justify-between items-center'>
                                    <span className='font-medium'>Order Details</span>
                                </div>
                                <div className='flex flex-col gap-1 p-2 text-sm'>
                                    <div className='flex justify-between items-center'>
                                        Cart Total
                                        <p>₹{totalPrice}</p>
                                    </div>
                                    <div className='flex justify-between items-center'>
                                        Shipping charge
                                        <p>{afterDiscount < 999 ? "+ ₹49" : "FREE"}</p>
                                    </div>
                                    <div className='flex justify-between items-center'>
                                        Convenience charges
                                        <p>+ ₹2</p>
                                    </div>
                                    {!payOnline && (
                                        <div className='flex justify-between items-center'>
                                            COD charges
                                            <p>+ ₹29</p>
                                        </div>
                                    )}
                                    <div className='flex justify-between items-center'>
                                        Cart Subtotal
                                        <p>₹{totalPrice + (afterDiscount < 999 ? 49 : 0) + 2 + (payOnline ? 0 : 29)}</p>
                                    </div>
                                    <div className='flex justify-between items-center'>
                                        Product Discount(s)
                                        <p>- ₹{totalDiscount.toFixed(2)}</p>
                                    </div>
                                </div>
                                <div className='flex justify-between items-center font-semibold text-lg p-2 border-t-[1px] border-gray-400'>
                                    Total Payable
                                    <p>₹{totalPayable}</p>
                                </div>
                            </div>

                            {/* Pay Button */}
                            <button className='w-full bg-primary rounded-md text-white font-semibold py-2' onClick={() => handlePayNowClick()} disabled={address.length === 0}>
                                {payOnline ? 'Pay Now' : 'Place Order'}
                            </button>
                        </div>
                    </div>)}
                </div>
            )}
            {!showCheckout && (
                <div className=' flex flex-col items-center justify-center gap-4 min-h-96 bg-pink-50'>
                    <RiUserUnfollowFill className='text-5xl text-primary' />
                    <p className='text-lg'>Please log in first to continue.</p>
                    <button className='bg-primary py-2 px-5 rounded-md font-medium text-white' onClick={() => toggleProfile()}>Click here to Log in!</button>
                </div>
            )}
        </>
    )
}

export default CheckoutLayout