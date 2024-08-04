import React, { useCallback, useEffect, useState } from 'react';
import { BiCurrentLocation, BiSolidPhoneCall, BiSolidUser } from "react-icons/bi";
import axios from "axios";
import toast from 'react-hot-toast';
import PropTypes from 'prop-types';

function AddAddress({goBack}) {
    const [pinCode, setPinCode] = useState("");
    const [area, setArea] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [isInputValid, setIsInputValid] = useState(false);
    const [contact, setContact] = useState('');
    const [addressLine1, setAddressLine1] =  useState('');
    const [addressLine2, setAddressLine2] =  useState('');
    const [selectedArea, setSelectedArea] = useState('');

    // Input Validation
    useEffect(() => {
        setIsInputValid(validateMobile(contact) && validateFields() && selectedArea);
    }, [firstName, lastName, addressLine1, addressLine2, contact, pinCode, selectedArea]);

    const handleMobileInputChange = (e) => {
        const { value } = e.target;
        if (/^\d*$/.test(value) && value.length <= 10) {
            setContact(value);
        }
    }

    const validateMobile = (mobile) => {
        const mobileRegex = /^[6-9]\d{9}$/; // Example: Indian mobile number validation
        return mobileRegex.test(mobile);
    };

    const validateFields = () => {
        return firstName.trim() !== '' && lastName.trim() !== '' && addressLine1.trim() !== '' && addressLine2.trim() !== '';
    };

    const handleInputChange = (e, setter) => {
        setter(e.target.value);
    };

    const handleAreaChange = (event) => {
        setSelectedArea(event.target.value);
    };

    // Set Valid Pincode
    const handlePinChange = (e) => {
        let pin = e.target.value;
        setPinCode(pin);
    };

    // Call Post.gov.in data set API
    const getLocation = useCallback(async (pincode) => {
        await axios
            .get(
                `https://api.data.gov.in/resource/6176ee09-3d56-4a3b-8115-21841576b2f6?api-key=579b464db66ec23bdd0000015a1f9704e6044cc575e0494fbe2e5a15&format=json&filters%5Bpincode%5D=${pincode}`
            )
            .then((data) => {
                if (data.data.records.length > 0) {
                    const AreaList = data.data.records.map((item) => {
                        return item.officename;
                    });

                    setCity(data.data.records[0].districtname);
                    setState(data.data.records[0].statename);
                    setArea(AreaList.map(filterArea));
                } else {
                    console.log("Invalid Pincode");
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    // Call postal dataset when state change
    useEffect(() => {
        if (pinCode.length === 6) {
            getLocation(pinCode);
        }
    }, [pinCode, getLocation]);

    const filterArea = (inputArea) => {
        return inputArea
            .split(" ") // split by space
            .map((element) => {
                // remove Dot(.) and braces("()") contained words
                let dot = element.split(".");
                let braces = element.split("(");

                if (dot.length > 1 || braces.length > 1) {
                    return null;
                } else {
                    return element;
                }
            })
            .filter((element) => {
                return element !== null;
            }) // remove null values from array
            .join(" "); //join array with space(" ")
    };

    // Save Data to database
    const handleSaveAddress = async () => {
        const token = localStorage.getItem('authToken');
        const addressData = {
            firstName,
            lastName,
            street: addressLine1 + ", " + addressLine2 + ", "+ selectedArea,
            city: city,
            state,
            pinCode,
            country: 'India',
            mobile: contact
        };

        try {
            const response = await axios.post(process.env.NEXT_PUBLIC_ADD_ADDRESS, addressData, {
                headers: {
                    'x-auth-token': `${token}`,
                    'Content-Type': 'application/json',
                }
            });

            if (response.status === 200) {
                toast.success('Address saved successfully!');
            }
        } catch (error) {
            console.error('Error saving address:', error);
            toast.error('Failed to save address. Please try again.');
        }
        goBack('profile')
    };

    return (
        <div>
            <div className='w-full'>
                {/* Name */}
                <span className="flex items-center gap-1 text-sm font-medium mb-4"><BiSolidUser />Name</span>
                <div className='flex w-full gap-2'>
                    <div className='w-1/2'>
                        <div className="relative w-full h-10">
                            <input
                                className="peer w-full h-full bg-transparent text-slate-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-slate-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-slate-400 placeholder-shown:border-t-slate-400 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-slate-400 focus:border-primary"
                                placeholder=" "
                                value={firstName}
                                onChange={(e) => handleInputChange(e, setFirstName)}
                            />
                            <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-sm peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-stone-500 peer-focus:text-rose-600 before:border-slate-400 peer-focus:before:!border-primary after:border-slate-400 peer-focus:after:!border-primary">
                                First Name *
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
                                Last Name *
                            </label>
                        </div>
                    </div>
                </div>

                {/* Address */}
                <span className="flex items-center gap-1 text-sm font-medium my-4"><BiCurrentLocation /> Address</span>
                <div className='w-full flex flex-col gap-4'>
                    <div className="relative w-full h-10">
                        <input
                            className="peer w-full h-full bg-transparent text-slate-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-slate-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-slate-400 placeholder-shown:border-t-slate-400 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-slate-400 focus:border-primary"
                            placeholder=" "
                            value={addressLine1}
                            onChange={(e) => handleInputChange(e, setAddressLine1)}
                        />
                        <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-sm peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-stone-500 peer-focus:text-rose-600 before:border-slate-400 peer-focus:before:!border-primary after:border-slate-400 peer-focus:after:!border-primary">
                            House No / Building Name *
                        </label>
                    </div>

                    <div className="relative w-full h-10">
                        <input
                            className="peer w-full h-full bg-transparent text-slate-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-slate-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-slate-400 placeholder-shown:border-t-slate-400 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-slate-400 focus:border-primary"
                            placeholder=" "
                            value={addressLine2}
                            onChange={(e) => handleInputChange(e, setAddressLine2)}
                        />
                        <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-sm peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-stone-500 peer-focus:text-rose-600 before:border-slate-400 peer-focus:before:!border-primary after:border-slate-400 peer-focus:after:!border-primary">
                        Area / Road Name / Colony *
                        </label>
                    </div>

                    <div className='flex gap-4'>
                        <div>
                            <label htmlFor="pincode" className="mb-2">
                                Pincode *
                            </label>
                            <div className="relative w-full h-10">
                                <input
                                    className="peer w-full h-full bg-transparent text-slate-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-slate-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-slate-400 placeholder-shown:border-t-slate-400 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-slate-400 focus:border-primary"
                                    placeholder=" "
                                    value={pinCode}
                                    minLength={6}
                                    maxLength={6}
                                    onChange={(e) => handlePinChange(e)}
                                />
                                <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-sm peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-stone-500 peer-focus:text-rose-600 before:border-slate-400 peer-focus:before:!border-primary after:border-slate-400 peer-focus:after:!border-primary">
                                    Pin Code *
                                </label>
                            </div>
                        </div>

                        <div>
                            <label htmlFor="area" className="mb-2">
                                Area *
                            </label>
                            <select
                                type="text"
                                id="area"
                                name="area"
                                className={`w-full overflow-y-scroll max-w-lg rounded-lg ${!area && "bg-transparent cursor-not-allowed"
                                    } border border-slate-400 px-3 py-2 hover:border-primary focus:border focus:border-primary active:border-primary max-sm:text-xs`}
                                required
                                value={selectedArea}
                                onChange={(e) => handleAreaChange(e)}
                            >
                                <option value="" className='bg-transparent'>--Select--</option>
                                {area &&
                                    area.map((item, index) => {
                                        return (
                                            <option key={"option" + index} value={item} className='bg-transparent text-wrap'>
                                                {item}
                                            </option>
                                        );
                                    })}
                            </select>
                        </div>
                    </div>

                    {/* District & State */}
                    <div className="flex w-full gap-4">
                        {/* District */}
                        <div>
                            <label htmlFor="city" className="mb-2">
                                District
                            </label>
                            <input
                                type="text"
                                id="city"
                                name="city"
                                className="w-full max-w-lg rounded-lg border bg-gray-200 border-slate-200 px-3 py-2 hover:border-primary focus:border focus:border-primary active:border-primary cursor-not-allowed max-sm:text-xs"
                                value={city}
                                readOnly
                            />
                        </div>
                        {/* State */}
                        <div>
                            <label htmlFor="state" className="mb-2">
                                State
                            </label>
                            <input
                                type="text"
                                id="state"
                                name="state"
                                className="w-full max-w-lg rounded-lg border bg-gray-200 border-slate-200 px-3 py-2 hover:border-primary focus:border focus:border-primary active:border-primary cursor-not-allowed max-sm:text-xs"
                                value={state}
                                readOnly
                            />
                        </div>
                    </div>
                </div>
                
                {/* Contect Detail */}
                <span className="flex items-center gap-1 text-sm font-medium my-4"><BiSolidPhoneCall /> Contact Details</span>
                <div className='w-full flex gap-2 items-center mb-6'>
                    <span> +91</span>
                    <div className="relative w-full min-w-[200px] h-10">
                        <input
                            type='tel'
                            className="peer w-full h-full bg-transparent text-slate-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-slate-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-slate-400 placeholder-shown:border-t-slate-400 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-slate-400 focus:border-primary"
                            placeholder=" "
                            value={contact}
                            onChange={(e) => handleMobileInputChange(e)}
                        />
                        <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-stone-500 peer-focus:text-rose-600 before:border-slate-400 peer-focus:before:!border-primary after:border-slate-400 peer-focus:after:!border-primary">
                            Mobile Number *
                        </label>
                    </div>
                </div>

                {/* Save button */}
                <div className='flex flex-col items-center'>
                    <button
                        className={`w-full bg-primary text-white text-pretty font-normal py-2 px-4 rounded ${isInputValid ? '' : 'opacity-50 cursor-not-allowed'}`}
                        disabled={!isInputValid}
                        onClick={()=> handleSaveAddress()}
                    >
                        Save Address
                    </button>
                    <p className='w-full text-start text-xs'>* Required Fields</p>
                </div>
            </div>
        </div>
    )
}

AddAddress.propTypes = {
    goBack: PropTypes.func.isRequired,
};

export default AddAddress