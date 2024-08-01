import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const NewUserRegistration = ({ inputType, verifyValue, updateAuthToken, gotoLogin }) => {
    const [isEmail, setIsEmail] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [isInputValid, setIsInputValid] = useState(false);

    useEffect(() => {
        setIsEmail(isEmail === "Email")
    }, [inputType])

    useEffect(() => {
        if (!isEmail) {
            console.log("Email validation performs");
            setIsInputValid(validateEmail(inputValue) && validateFields());
        } else {
            console.log("Mobile validation performs");
            setIsInputValid(validateMobile(inputValue) && validateFields());
        }
    }, [inputValue, isEmail, firstName, lastName]);

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validateMobile = (mobile) => {
        const mobileRegex = /^[6-9]\d{9}$/; // Example: Indian mobile number validation
        return mobileRegex.test(mobile);
    };

    const validateFields = () => {
        return firstName.trim() !== '' && lastName.trim() !== '';
    };

    const handleInputChange = (e, setter) => {
        setter(e.target.value);
    };

    const registerUser = async () => {
        const userData = {
            firstName,
            lastName,
            email: isEmail ? verifyValue : inputValue,
            mobile: isEmail ? inputValue : verifyValue,
            emailVerified: isEmail,
            mobileVerified: !isEmail,
        };

        try {
            const response = await fetch(process.env.NEXT_PUBLIC_REGESTER_USER, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            if (response.status === 409) {
                throw new Error('User with this email or mobile number already exists.');
            }

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();
            toast.success('User registered successfully!');

            // Store the token in local storage
            localStorage.setItem('authToken', result.accessToken);
            updateAuthToken(localStorage.getItem('authToken'))
            // Handle success, e.g., redirect or show a success message
        } catch (error) {
            toast.error('Error registering user: ' + error.message);
            console.error('Error registering user:', error);
            // Handle error, e.g., show an error message
        }
    };

    return (
        <div>
            <div className='flex flex-col gap-4 p-4 border border-stone-400 rounded-xl'>
                <div className='flex w-full gap-2'>
                    <div className='w-1/2'>
                        {isEmail && (<p>Email sets</p>)}
                        <div className="relative w-full h-10">
                            <input
                                className="peer w-full h-full bg-transparent text-slate-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-slate-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-slate-400 placeholder-shown:border-t-slate-400 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-slate-400 focus:border-primary"
                                placeholder=" "
                                value={firstName}
                                onChange={(e) => handleInputChange(e, setFirstName)}
                            />
                            <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-sm peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-stone-500 peer-focus:text-rose-600 before:border-slate-400 peer-focus:before:!border-primary after:border-slate-400 peer-focus:after:!border-primary">
                                First Name
                            </label>
                        </div>
                    </div>
                    <div className='w-1/2'>
                        <div className="relative w-full h-10">
                            <input
                                className="peer w-full h-full bg-transparent text-slate-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-slate-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-slate-400 placeholder-shown:border-t-slate-400 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-slate-400 focus:border-primary"
                                placeholder=" "
                                value={lastName}
                                onChange={(e) => handleInputChange(e, setLastName)}
                            />
                            <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-sm peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-stone-500 peer-focus:text-rose-600 before:border-slate-400 peer-focus:before:!border-primary after:border-slate-400 peer-focus:after:!border-primary">
                                Last Name
                            </label>
                        </div>
                    </div>
                </div>
                <div className='w-full flex gap-2 items-center mb-6'>
                    {isEmail && <span> +91</span>}
                    <div className="relative w-full min-w-[200px] h-10">
                        <input
                            type={isEmail ? 'tel' : 'email'}
                            className="peer w-full h-full bg-transparent text-slate-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-slate-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-slate-400 placeholder-shown:border-t-slate-400 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-slate-400 focus:border-primary"
                            placeholder=" "
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                        />
                        <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-stone-500 peer-focus:text-rose-600 before:border-slate-400 peer-focus:before:!border-primary after:border-slate-400 peer-focus:after:!border-primary">
                            {isEmail ? 'Mobile Number' : 'Email ID'}
                        </label>
                    </div>
                </div>
                <div className='flex flex-col items-center'>
                    <button
                        className={`w-full bg-primary text-white text-pretty font-normal py-2 px-4 rounded ${isInputValid ? '' : 'opacity-50 cursor-not-allowed'}`}
                        disabled={!isInputValid}
                        onClick={registerUser}
                    >
                        Register
                    </button>
                </div>
            </div>
            <div className='text-sm text-center py-4'>
                Already part of the <span className='text-primary font-medium'>Exotica</span> family? <button className='text-primary font-medium' onClick={() => gotoLogin('login')}>Log in</button> and discover more!
            </div>
        </div>
    );
};

export default NewUserRegistration;
