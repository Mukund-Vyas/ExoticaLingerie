import React, { useState, useEffect, useRef } from 'react';
import { FcLike, FcSurvey } from 'react-icons/fc';
import { GoArrowLeft } from 'react-icons/go';
import { PiUserCircleDuotone } from 'react-icons/pi';
import OtpInput from 'react-otp-input';
import toast from 'react-hot-toast';
import { auth } from '../../services/firebase';
import { RecaptchaVerifier, signInWithPhoneNumber, PhoneAuthProvider, signInWithCredential } from "firebase/auth";
import { Oval } from 'react-loader-spinner';
import NewUserRegistration from './ProfileComponents/NewUserRegistration';
import UserProfile from './ProfileComponents/UserProfile';

const ProfileLayout = () => {
    const [profileState, setProfileState] = useState('initial'); // 'initial', 'login', 'otp', 'loggedIn'
    const [useEmail, setUseEmail] = useState(true);
    const [inputValue, setInputValue] = useState('');
    const [isInputValid, setIsInputValid] = useState(false);
    const [otpValue, setOtpValue] = useState('');
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [verificationId, setVerificationId] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [resendTimer, setResendTimer] = useState(30); // 150 seconds = 2.5 minutes
    const [isResendDisabled, setIsResendDisabled] = useState(false);
    const recaptchaVerifierRef = useRef(null);
    const [isUser, setIsUser] = useState(false);
    const [authToken, setAuthToken] = useState(localStorage.getItem('authToken'));

    useEffect(() => {
        if ((profileState === 'login' || profileState === 'otp') && !useEmail) {
            if (!recaptchaVerifierRef.current) {
                recaptchaVerifierRef.current = new RecaptchaVerifier(auth, 'recaptcha-container', {
                    'size': 'invisible',
                    'callback': (response) => {
                        console.log("Recaptcha verified");
                    }
                });
            }
        }
    }, [profileState, useEmail]);

    useEffect(() => {
        setAuthToken(localStorage.getItem('authToken'));
    }, [isUser, profileState]);

    const handleLoginClick = () => {
        setProfileState('login');
    }

    const handleUserLogin = async () => {
        setIsLoading(true);
        if (!recaptchaVerifierRef.current) {
            recaptchaVerifierRef.current = new RecaptchaVerifier(auth, 'recaptcha-container', {
                'size': 'invisible',
                'callback': (response) => {
                    console.log("Recaptcha verified");
                }
            });
        }

        try {
            if (useEmail) {
                recaptchaVerifierRef.current.render().then(() => {
                    recaptchaVerifierRef.current.verify().then(recaptchaToken => {
                        if (recaptchaToken) {
                            fetch(process.env.NEXT_PUBLIC_SEND_EMAIL_OTP_API_URL, {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({ email: inputValue })
                            })
                                .then(response => {
                                    if (response.ok) {
                                        toast.success('OTP has been sent to your email!');
                                        setIsOtpSent(true);
                                        setProfileState('otp');
                                        startResendTimer();
                                    } else {
                                        toast.error('Failed to send OTP. Please try again.');
                                        console.log(response);
                                    }
                                })
                                .catch(error => {
                                    console.error('Error sending OTP:', error);
                                    toast.error('Failed to send OTP. Please try again.');
                                })
                                .finally(() => {
                                    setIsLoading(false);
                                });
                        }
                    }).catch(error => {
                        console.error('Error verifying recaptcha:', error);
                        toast.error('Failed to verify recaptcha. Please try again.');
                        setIsLoading(false);
                    });
                });

            } else {
                const phoneNumber = "+91" + inputValue;
                const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifierRef.current);
                setVerificationId(confirmationResult.verificationId);
                setIsOtpSent(true);
                setProfileState('otp');
                toast.success('OTP has been sent to your mobile!');
                setIsLoading(false);
                startResendTimer();
            }
        } catch (error) {
            if (error.code === 'auth/too-many-requests') {
                toast.error(`Too many requests. Use email instead`);
                startResendTimer();
            } else {
                console.log(error);
                toast.error('Failed to resend OTP. Please try again.');
            }
            setIsLoading(false);
        }
    }

    const handleBackClick = () => {
        setProfileState('initial');
    }

    const handleOTPBackClick = () => {
        setProfileState('login');
    }

    const toggleLoginMethod = () => {
        setInputValue(''); // Clear input when switching
        setIsInputValid(false); // Reset validation status
        setUseEmail(!useEmail);
    }

    useEffect(() => {
        if (useEmail) {
            setIsInputValid(validateEmail(inputValue));
        } else {
            setIsInputValid(validateMobile(inputValue));
        }
    }, [inputValue, useEmail]);

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    const validateMobile = (mobile) => {
        const mobileRegex = /^[6-9]\d{9}$/; // Example: Indian mobile number validation
        return mobileRegex.test(mobile);
    }

    const handleMobileInputChange = (e) => {
        const { value } = e.target;
        if (/^\d*$/.test(value) && value.length <= 10) {
            setInputValue(value);
        }
    }

    const handleOtpVerification = async () => {
        setIsLoading(true);
        if (otpValue.length === 6) {
            if (useEmail) {
                fetch(process.env.NEXT_PUBLIC_VALIDATE_EMAIL_OTP_API_URL, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email: inputValue, otp: otpValue })
                })
                    .then(response => {
                        if (response.ok) {
                            setOtpValue('')
                            toast.success('OTP Verified!');
                            setProfileState('loggedIn');
                            findUser({ email: inputValue })
                        } else {
                            toast.error('Invalid OTP. Please try again.');
                        }
                    })
                    .catch(error => {
                        console.error('Error verifying OTP:', error);
                        toast.error('An error occurred. Please try again.');
                    })
                    .finally(() => {
                        setIsLoading(false);
                    });
            } else {
                if (verificationId) {
                    try {
                        const credential = PhoneAuthProvider.credential(verificationId, otpValue);
                        await signInWithCredential(auth, credential);
                        setProfileState('loggedIn');
                        toast.success('OTP Verified!');
                        setOtpValue('')
                        setIsLoading(false);
                        findUser({ mobile: inputValue })
                    } catch (error) {
                        toast.error('Invalid OTP. Please try again.');
                        setIsLoading(false);
                    }
                } else {
                    toast.error('Please try again.');
                    setIsLoading(false);
                }
            }
        } else {
            toast.error('Please enter a valid 6-digit OTP.');
            setIsLoading(false);
        }
    }

    const handleResendOtp = async () => {
        handleUserLogin();
        startResendTimer();
    }

    const startResendTimer = () => {
        setIsResendDisabled(true);
        setResendTimer(30); // Reset timer to 150 seconds
        const interval = setInterval(() => {
            setResendTimer((prevTimer) => {
                if (prevTimer === 1) {
                    clearInterval(interval);
                    setIsResendDisabled(false);
                }
                return prevTimer - 1;
            });
        }, 1000);
    }

    const maskInput = (input, isEmail) => {
        if (isEmail) {
            const [name, domain] = input.split('@');
            return `${name.slice(0, 4)}******@${domain}`;
        } else {
            return `******${input.slice(-4)}`;
        }
    }

    // login token
    const findUser = async (identifier) => {
        setIsLoading(true);
        try {
            const response = await fetch(process.env.NEXT_PUBLIC_FATCH_LOGIN_USER, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(identifier),
            });

            if (!response.ok) {
                setIsUser(false);
                throw new Error('User not found or failed to authenticate');
            }

            // Parse the JSON response
            const data = await response.json();

            // Assuming the response contains an accessToken
            if (data.accessToken) {
                setIsUser(true);
                localStorage.setItem('authToken', data.accessToken);
            } else {
                setIsUser(false);
                console.error('Access token not found in response');
            }
        } catch (error) {
            console.error('Error during user login:', error);
            setIsUser(false);
        }
        setIsLoading(false);
    };

    const updateAuthToken = (newValue) => {
        setIsUser(true)
        setAuthToken(newValue);
    };

    const updateProfileState = (newValue) => {
        setProfileState(newValue)
    };

    return (
        <div className='w-full h-full overflow-scroll scrollbar p-6 pb-20'>
            {isLoading && (
                <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
                    <Oval color="#ff197d" secondaryColor="#ffb1d3" height={80} width={80} />
                </div>
            )}

            {!authToken && profileState === 'initial' && (
                <div>
                    <div className='flex gap-4 mb-6'>
                        <PiUserCircleDuotone className='text-6xl text-neutral-600' />
                        <div className=''>
                            <h2 className='text-lg font-bold'>Hey Gorgeous</h2>
                            <p className='text-xs text-gray-600'>Begin Your Exotic Adventure with Exotica Lingerie!</p>
                        </div>
                    </div>

                    <div className='flex flex-col items-center mb-6'>
                        <button className='w-full bg-primary text-white text-pretty font-normal py-2 px-4 rounded mb-4' onClick={handleLoginClick}>Login / Sign Up</button>
                    </div>

                    <div className='flex gap-4 text-stone-600 mb-6 text-sm'>
                        <div className='w-full flex justify-between items-center cursor-pointer border rounded-xl border-stone-400 p-2' onClick={() => setProfileState('login')}>
                            <div className='flex items-center gap-2 font-serif hover:text-primary'>
                                <span className='bg-neutral-200 rounded-md p-1'>
                                    <FcSurvey className='text-xl' />
                                </span>
                                <p>
                                    Order History
                                </p>
                            </div>
                        </div>
                        <div className='w-full flex justify-between items-center cursor-pointer border rounded-xl border-stone-400 p-2' onClick={() => setProfileState('login')}>
                            <div className='flex items-center gap-2 font-serif hover:text-primary'>
                                <span className='bg-neutral-200 rounded-md p-1'>
                                    <FcLike className='text-xl' />
                                </span>
                                <p>
                                    My Wishlist
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className='border rounded-xl border-stone-400 py-4'>
                        <div className='flex flex-col gap-3 p-5 text-pretty font-serif text-stone-600'>
                            <span className='hover:text-primary'>FAQs</span>
                            <span className='hover:text-primary'>Contact Us</span>
                            <span className='hover:text-primary'>About Us</span>
                            <span className='hover:text-primary'>Return Policy</span>
                            <span className='hover:text-primary'>Privacy Policy</span>
                            <span className='hover:text-primary'>Terms of Use</span>
                        </div>
                    </div>
                </div>
            )}

            {!authToken && profileState === 'login' && (
                <div className='flex flex-col'>
                    <div className='flex w-full items-center mb-2'>
                        <button className='flex items-center gap-2 left-2 top-2 text-lg text-primary font-bold' onClick={handleBackClick}>
                            <GoArrowLeft />
                            <span className='text-xs'>
                                back
                            </span>
                        </button>
                    </div>

                    <div className='w-full flex flex-col gap-4 items-center'>
                        <div className='w-full flex flex-col gap-2'>
                            <label className='w-full text-left mb-2 text-sm font-semibold'>
                                Enter {useEmail ? 'Email ID' : 'Mobile Number'}
                            </label>
                            <div className='flex items-center gap-1'>
                                {useEmail ? "" : <span> +91</span>}
                                <div className="relative w-full min-w-[200px] h-10">
                                    <input
                                        type={useEmail ? 'email' : 'tel'}
                                        className="peer w-full h-full bg-transparent text-slate-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-slate-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-slate-400 placeholder-shown:border-t-slate-400 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-slate-200 focus:border-primary"
                                        placeholder=" "
                                        value={inputValue}
                                        onChange={useEmail ? (e) => setInputValue(e.target.value) : handleMobileInputChange}
                                    />
                                    <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-stone-500 peer-focus:text-rose-600 before:border-blue-gray-200 peer-focus:before:!border-primary after:border-blue-gray-200 peer-focus:after:!border-primary">
                                        {useEmail ? 'Email ID' : 'Mobile Number'}
                                    </label>
                                </div>
                            </div>

                            <p className='text-xs text-gray-600 mb-4 self-end'>
                                {useEmail ? 'OTP will be sent to this email' : 'OTP will be sent to this mobile number'}
                            </p>
                        </div>

                        <button
                            className='text-rose-700 font-semibold py-2'
                            onClick={toggleLoginMethod}
                        >
                            {useEmail ? 'Use Mobile Number Instead' : 'Use Email Instead'}
                        </button>

                        <p className='text-xs text-pretty font-serif text-gray-600 leading-4'>
                            By continuing, you agree to our <a href="/terms" className='text-primary font-semibold'>Terms of Service</a> and <a href="/privacy" className='text-primary font-semibold'>Privacy Policy</a>.
                        </p>

                        <button
                            className='w-full bg-primary disabled:bg-secondary text-white py-2 px-4 rounded mb-4'
                            onClick={handleUserLogin}
                            disabled={!isInputValid}
                        >
                            Continue
                        </button>
                    </div>
                </div>
            )}

            {!authToken && profileState === 'otp' && isOtpSent && (
                <div className='flex flex-col'>
                    <div className='flex w-full items-center mb-2'>
                        <button className='flex items-center gap-2 left-2 top-2 text-lg text-primary font-bold' onClick={handleOTPBackClick}>
                            <GoArrowLeft />
                            <span className='text-xs'>
                                back
                            </span>
                        </button>
                    </div>

                    <div className='w-full flex flex-col gap-4 items-center'>
                        <div className='w-full flex items-center flex-col'>
                            <span className='w-full text-center mb-2 text-lg font-semibold'>
                                Enter OTP
                            </span>
                            <p className='w-full text-sm text-center text-gray-600 mb-4 self-end'>
                                OTP has been sent to {maskInput(inputValue, useEmail)}
                            </p>
                            <OtpInput
                                value={otpValue}
                                onChange={setOtpValue}
                                numInputs={6}
                                renderSeparator={<span> </span>}
                                renderInput={(props) => <input {...props} className="w-8 h-8 mx-2 text-lg rounded border border-stone-400 focus:border-primary focus:outline-none" />}
                                inputStyle={{
                                    width: '2rem',
                                    height: '2rem'
                                }}
                            />
                        </div>

                        <button className='text-rose-700 font-semibold py-2 disabled:text-stone-500' onClick={handleResendOtp} disabled={isResendDisabled}>
                            {isResendDisabled ? `Resend OTP in ${Math.floor(resendTimer / 60)}:${resendTimer % 60 < 10 ? '0' : ''}${resendTimer % 60}` : 'Resend OTP'}
                        </button>

                        <button
                            className='w-full bg-primary disabled:bg-secondary text-white py-2 px-4 rounded mb-'
                            onClick={handleOtpVerification}
                            disabled={otpValue.length !== 6}
                        >
                            Verify
                        </button>
                    </div>
                </div>
            )}

            {authToken && (
                <UserProfile gotoLogin={updateProfileState}/>
            )}

            {!authToken && profileState === "loggedIn" && (
                <div>
                    {authToken}
                    <NewUserRegistration inputType={useEmail ? "Email" : "Mobile"} verifyValue={inputValue} updateAuthToken={updateAuthToken} gotoLogin={updateProfileState} />
                </div>
            )}

            <div id="recaptcha-container" />
        </div>
    );
}

export default ProfileLayout;