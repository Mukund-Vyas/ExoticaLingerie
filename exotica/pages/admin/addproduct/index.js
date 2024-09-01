import { useState, useCallback } from 'react';
import api from '@/src/utils/api';
import * as XLSX from 'xlsx';

const UploadProducts = () => {
    const [file, setFile] = useState(null);
    const [passKey, setPassKey] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false); // Loading state

    // Handle file drop
    const handleDrop = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        const droppedFile = e.dataTransfer.files[0];
        if (droppedFile) {
            processFile(droppedFile);
        }
    }, []);

    // Handle file selection
    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            processFile(selectedFile);
        }
    };

    // Process file (convert if needed and set)
    const processFile = (file) => {
        if (file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
            file.type === 'application/vnd.ms-excel') {
            convertXlsxToCsv(file);
        } else if (file.type === 'text/csv') {
            setFile(file);
        } else {
            setMessage('Please select a valid CSV or XLSX file.');
        }
    };

    const convertXlsxToCsv = async (xlsxFile) => {
        try {
            const reader = new FileReader();
            reader.onload = (e) => {
                const data = new Uint8Array(e.target.result);
                const workbook = XLSX.read(data, { type: 'array' });
                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];
                const csv = XLSX.utils.sheet_to_csv(worksheet);

                const csvBlob = new Blob([csv], { type: 'text/csv' });
                const csvFile = new File([csvBlob], 'converted-file.csv', { type: 'text/csv' });
                setFile(csvFile);
            };
            reader.readAsArrayBuffer(xlsxFile);
        } catch (error) {
            console.error('Error converting XLSX to CSV:', error);
            setMessage('Failed to convert XLSX file to CSV.');
        }
    };

    const handlePassKeyChange = (e) => {
        setPassKey(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) {
            setMessage('Please select a CSV file to upload.');
            return;
        }

        if (!passKey) {
            setMessage('Please enter the passKey.');
            return;
        }

        setLoading(true); // Start loading
        setMessage('');
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await api.post('/products/upload-csv', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'passkey': passKey, // Pass the passKey as a header
                },
            });
            setMessage(response.data.message);
        } catch (error) {
            console.error('Error uploading file:', error);
            if (error.response && error.response.status === 403) {
                setMessage('Invalid pass key');
            } else {
                setMessage('Failed to upload the file. Please try again.');
            }

        } finally {
            setLoading(false); // End loading
        }
    };

    return (
        <div className="max-w-md mx-auto my-12 p-6 border border-gray-300 rounded-lg shadow-lg bg-white">
            <h1 className="text-2xl font-bold mb-6 text-center">Upload CSV to Add Products</h1>
            <form onSubmit={handleSubmit} className="flex flex-col items-center">
                <div
                    className="flex items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                    onDrop={handleDrop}
                    onDragOver={(e) => e.preventDefault()}
                >
                    <label
                        htmlFor="dropzone-file"
                        className="flex flex-col items-center justify-center w-full h-full"
                    >
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <svg
                                className="w-8 h-8 mb-4 text-gray-500"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 20 16"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                />
                            </svg>
                            <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                            <p className="text-xs text-gray-500">CSV or XLSX files only</p>
                        </div>
                        <input
                            id="dropzone-file"
                            type="file"
                            accept=".csv, .xlsx"
                            onChange={handleFileChange}
                            className="hidden"
                        />
                    </label>
                </div>
                {file && (
                    <div className="mt-4 p-2 border border-gray-300 rounded-md w-full text-center bg-gray-100">
                        <p className="text-gray-700"><span className="font-semibold">Selected file:</span> {file.name}</p>
                    </div>
                )}
                <input
                    type="password"
                    placeholder="Enter PassKey"
                    value={passKey}
                    onChange={handlePassKeyChange}
                    className="mt-4 p-2 border border-gray-300 rounded-md w-full"
                />
                <button
                    type="submit"
                    className="mt-4 px-4 py-2 bg-primary text-white font-semibold rounded-md hover:bg-rose-600"
                    disabled={loading} // Disable button while loading
                >
                    {loading ? 'Uploading..., this may take time' : 'Upload'}
                </button>
            </form>
            {loading && (
                <div className="flex items-center justify-center mt-4">
                    <svg
                        className="w-8 h-8 text-primary animate-spin"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                        ></circle>
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 0 1 16 0h-2a6 6 0 0 0-12 0H4z"
                        ></path>
                    </svg>
                </div>
            )}
            {message && <p className="mt-4 text-red-500 text-center">{message}</p>}
        </div>
    );
};

export default UploadProducts;

