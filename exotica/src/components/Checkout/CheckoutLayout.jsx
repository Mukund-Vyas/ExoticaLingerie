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

// date conversion
const formatDate = (date) => {
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    return new Intl.DateTimeFormat('en-GB', options).format(date);
};


const CheckoutLayout = () => {
    const [payOnline, setPayOnline] = useState(true);
    const { state } = useCart();
    const dispatch = useDispatch();
    const hasDispatched = useRef(false);
    const [totalPayable, setTotalPayable] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalDiscount, setTotalDiscount] = useState(0);
    const [afterDiscount, setAfterDiscount] = useState(0);
    const { authToken } = useSelector((state) => state.user);
    const [showCheckout, setShowCheckout] = useState(false);
    const {profileOpen} = useSelector((state) => state.profile);
    const [address, setAddress] = useState(null);

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
        dispatch(setCartOpen({ isOpen: true }));
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
                setShowCheckout(true);
            }
        } catch (error) {
            setShowCheckout(false);
            toggleProfile()
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
    }, [authToken]);

    const toggleProfile = () =>{
        dispatch(setProfileOpen({isOpen: !profileOpen}));
    }

    const handlePayNowClick = async () => {
        if(payOnline){
            try {
                const response = await api.post('/payment/new-payment', { price: totalPayable },{
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
                toast.error('An error occurred while processing your payment. Please try again.');
            }
        }
        // toast('We apologize for the inconvenience, but we are currently unable to process your order. Please try again later or contact our support team for assistance.', {
        //     icon: <div><BsExclamationLg className='text-6xl bg-rose-100 border border-neutral-600 rounded-full p-2' /></div>,
        //     duration: 6000,
        // })
    }

    return (
        <>
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
                                <img src="data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJMYXllcl8yIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjAiIHk9IjAiIHZpZXdCb3g9IjAgMCAxMzIgNDgiIHhtbDpzcGFjZT0icHJlc2VydmUiPjxzdHlsZT4uc3Qwe2ZpbGw6IzVmMjU5Zn08L3N0eWxlPjxjaXJjbGUgdHJhbnNmb3JtPSJyb3RhdGUoLTc2LjcxNCAxNy44NyAyNC4wMDEpIiBjbGFzcz0ic3QwIiBjeD0iMTcuOSIgY3k9IjI0IiByPSIxNy45Ii8+PHBhdGggY2xhc3M9InN0MCIgZD0iTTkwLjUgMzQuMnYtNi41YzAtMS42LS42LTIuNC0yLjEtMi40LS42IDAtMS4zLjEtMS43LjJWMzVjMCAuMy0uMy42LS42LjZoLTIuM2MtLjMgMC0uNi0uMy0uNi0uNlYyMy45YzAtLjQuMy0uNy42LS44IDEuNS0uNSAzLS44IDQuNi0uOCAzLjYgMCA1LjYgMS45IDUuNiA1LjR2Ny40YzAgLjMtLjMuNi0uNi42SDkyYy0uOSAwLTEuNS0uNy0xLjUtMS41em05LTMuOWwtLjEuOWMwIDEuMi44IDEuOSAyLjEgMS45IDEgMCAxLjktLjMgMi45LS44LjEgMCAuMi0uMS4zLS4xLjIgMCAuMy4xLjQuMi4xLjEuMy40LjMuNC4yLjMuNC43LjQgMSAwIC41LS4zIDEtLjcgMS4yLTEuMS42LTIuNC45LTMuOC45LTEuNiAwLTIuOS0uNC0zLjktMS4yLTEtLjktMS42LTIuMS0xLjYtMy42di0zLjljMC0zLjEgMi01IDUuNC01IDMuMyAwIDUuMiAxLjggNS4yIDV2Mi40YzAgLjMtLjMuNi0uNi42aC02LjN6bS0uMS0yLjJIMTAzLjJ2LTFjMC0xLjItLjctMi0xLjktMnMtMS45LjctMS45IDJ2MXptMjUuNSAyLjJsLS4xLjljMCAxLjIuOCAxLjkgMi4xIDEuOSAxIDAgMS45LS4zIDIuOS0uOC4xIDAgLjItLjEuMy0uMS4yIDAgLjMuMS40LjIuMS4xLjMuNC4zLjQuMi4zLjQuNy40IDEgMCAuNS0uMyAxLS43IDEuMi0xLjEuNi0yLjQuOS0zLjguOS0xLjYgMC0yLjktLjQtMy45LTEuMi0xLS45LTEuNi0yLjEtMS42LTMuNnYtMy45YzAtMy4xIDItNSA1LjQtNSAzLjMgMCA1LjIgMS44IDUuMiA1djIuNGMwIC4zLS4zLjYtLjYuNmgtNi4zem0tLjEtMi4ySDEyOC42di0xYzAtMS4yLS43LTItMS45LTJzLTEuOS43LTEuOSAydjF6TTY2IDM1LjdoMS40Yy4zIDAgLjYtLjMuNi0uNnYtNy40YzAtMy40LTEuOC01LjQtNC44LTUuNC0uOSAwLTEuOS4yLTIuNS40VjE5YzAtLjgtLjctMS41LTEuNS0xLjVoLTEuNGMtLjMgMC0uNi4zLS42LjZ2MTdjMCAuMy4zLjYuNi42aDIuM2MuMyAwIC42LS4zLjYtLjZ2LTkuNGMuNS0uMiAxLjItLjMgMS43LS4zIDEuNSAwIDIuMS43IDIuMSAyLjR2Ni41Yy4xLjcuNyAxLjQgMS41IDEuNHptMTUuMS04LjRWMzFjMCAzLjEtMi4xIDUtNS42IDUtMy40IDAtNS42LTEuOS01LjYtNXYtMy43YzAtMy4xIDIuMS01IDUuNi01IDMuNSAwIDUuNiAxLjkgNS42IDV6bS0zLjUgMGMwLTEuMi0uNy0yLTItMnMtMiAuNy0yIDJWMzFjMCAxLjIuNyAxLjkgMiAxLjlzMi0uNyAyLTEuOXYtMy43em0tMjIuMy0xLjdjMCAzLjItMi40IDUuNC01LjYgNS40LS44IDAtMS41LS4xLTIuMi0uNHY0LjVjMCAuMy0uMy42LS42LjZoLTIuM2MtLjMgMC0uNi0uMy0uNi0uNlYxOS4yYzAtLjQuMy0uNy42LS44IDEuNS0uNSAzLS44IDQuNi0uOCAzLjYgMCA2LjEgMi4yIDYuMSA1LjZ2Mi40ek01MS43IDIzYzAtMS42LTEuMS0yLjQtMi42LTIuNC0uOSAwLTEuNS4zLTEuNS4zdjYuNmMuNi4zLjkuNCAxLjYuNCAxLjUgMCAyLjYtLjkgMi42LTIuNFYyM3ptNjguMiAyLjZjMCAzLjItMi40IDUuNC01LjYgNS40LS44IDAtMS41LS4xLTIuMi0uNHY0LjVjMCAuMy0uMy42LS42LjZoLTIuM2MtLjMgMC0uNi0uMy0uNi0uNlYxOS4yYzAtLjQuMy0uNy42LS44IDEuNS0uNSAzLS44IDQuNi0uOCAzLjYgMCA2LjEgMi4yIDYuMSA1LjZ2Mi40em0tMy42LTIuNmMwLTEuNi0xLjEtMi40LTIuNi0yLjQtLjkgMC0xLjUuMy0xLjUuM3Y2LjZjLjYuMy45LjQgMS42LjQgMS41IDAgMi42LS45IDIuNi0yLjRWMjN6Ii8+PHBhdGggZD0iTTI2IDE5LjNjMC0uNy0uNi0xLjMtMS4zLTEuM2gtMi40bC01LjUtNi4zYy0uNS0uNi0xLjMtLjgtMi4xLS42bC0xLjkuNmMtLjMuMS0uNC41LS4yLjdsNiA1LjdIOS41Yy0uMyAwLS41LjItLjUuNXYxYzAgLjcuNiAxLjMgMS4zIDEuM2gxLjR2NC44YzAgMy42IDEuOSA1LjcgNS4xIDUuNyAxIDAgMS44LS4xIDIuOC0uNXYzLjJjMCAuOS43IDEuNiAxLjYgMS42aDEuNGMuMyAwIC42LS4zLjYtLjZWMjAuOGgyLjNjLjMgMCAuNS0uMi41LS41di0xem0tNi40IDguNmMtLjYuMy0xLjQuNC0yIC40LTEuNiAwLTIuNC0uOC0yLjQtMi42di00LjhoNC40djd6IiBmaWxsPSIjZmZmIi8+PC9zdmc+" alt="phonepe logo" className='h-5' />
                            </div>
                        </div>
                        {/* Rigth Side */}
                        <div className='w-2/6 h-fit flex flex-col gap-2 max-lg:w-full'>
                            {/* Address */}
                            <div className='border bg-white border-slate-400 rounded-md px-3'>
                                <div className='py-2 border-b-[1px] border-gray-400 flex justify-between items-center'>
                                    <span className='font-medium'>Deliver To</span>
                                    <button className='text-primary font-light text-sm font-serif hover:underline' title='Change your deliver address'>
                                        Change
                                    </button>
                                </div>
                                <div className='py-1'>
                                    {address?.map((add, index) => (
                                        <div key={"Address" + index} className='w-full min-h-28 bg-zinc-50 flex flex-col justify-center my-2 p-2 border border-pink-200 text-sm rounded-md'>
                                            <span className='font-medium flex justify-between'>
                                                {add?.firstName} {add?.lastName}
                                            </span>
                                            <span className='text-wrap'>{add?.street}</span>
                                            <span>{add?.city}, {add?.state} - {add?.pinCode}</span>
                                            <span>{add?.country}</span>
                                            <span className='font-medium'>Contact No: 9978605400</span>
                                        </div>
                                    ))}
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
                            <button className='w-full bg-primary rounded-md text-white font-semibold py-2' onClick={()=>handlePayNowClick()}>
                                Pay Now
                            </button>
                        </div>
                    </div>)}
                </div>
            )}
            {!showCheckout && (
                <div className=' flex flex-col items-center justify-center gap-4 min-h-96 bg-pink-50'>
                    <RiUserUnfollowFill className='text-5xl text-primary'/>
                    <p className='text-lg'>Please log in first to continue.</p>
                    <button className='bg-primary py-2 px-5 rounded-md font-medium text-white' onClick={()=>toggleProfile()}>Click here to Log in!</button>
                </div>
            )}
        </>
    )
}

export default CheckoutLayout