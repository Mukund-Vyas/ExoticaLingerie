import React, { useState, useEffect, useMemo } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import api from '@/src/utils/api';
import { Oval } from 'react-loader-spinner';

const SiteVisitsReports = () => {
    const [dailyData, setDailyData] = useState([]);
    const [monthlyData, setMonthlyData] = useState([]);
    const [yearlyData, setYearlyData] = useState([]);
    const [dailyDataUrl, setDailyDataUrl] = useState([]);
    const [monthlyDataUrl, setMonthlyDataUrl] = useState([]);
    const [yearlyDataUrl, setYearlyDataUrl] = useState([]);
    const [last30DaysData, setLast30DaysData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null); // For handling errors

    // Function to format data for charts
    const formatDataForChart = (data) => {
        return data.map(item => ({
            page: item._id.page,
            count: item.count,
        }));
    };

    const formatData30Days = (data) => {
        return data.map(item => ({
            date: item._id.date,
            count: item.totalVisits,
        }));
    };

    // Function to fetch data, only when required
    const fetchData = async () => {
        try {
            const [dailyResUrl, monthlyResUrl, yearlyResUrl, dailyRes, monthlyRes, yearlyRes, last30DaysRes] = await Promise.all([
                api.get('/sitevisits/daily-visits-url'),
                api.get('/sitevisits/monthly-visits-url'),
                api.get('/sitevisits/yearly-visits-url'),
                api.get('/sitevisits/daily-visits'),
                api.get('/sitevisits/monthly-visits'),
                api.get('/sitevisits/yearly-visits'),
                api.get('/sitevisits/last-30-days'),
            ]);

            setDailyData(dailyRes.data);
            setMonthlyData(monthlyRes.data);
            setYearlyData(yearlyRes.data);
            setDailyDataUrl(dailyResUrl.data);
            setMonthlyDataUrl(monthlyResUrl.data);
            setYearlyDataUrl(yearlyResUrl.data);
            setLast30DaysData(last30DaysRes.data);

            setLoading(false);
        } catch (error) {
            setError("Error fetching data");
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
        const intervalId = setInterval(fetchData, 3000); // 15 seconds refresh

        return () => clearInterval(intervalId); // Cleanup on unmount
    }, []);

    // Memoizing formatted data to avoid recalculations
    const formattedDailyDataUrl = useMemo(() => formatDataForChart(dailyDataUrl), [dailyDataUrl]);
    const formattedMonthlyDataUrl = useMemo(() => formatDataForChart(monthlyDataUrl), [monthlyDataUrl]);
    const formattedYearlyDataUrl = useMemo(() => formatDataForChart(yearlyDataUrl), [yearlyDataUrl]);
    const formattedLast30DaysData = useMemo(() => formatData30Days(last30DaysData), [last30DaysData]);

    if (loading) {
        return <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
            <Oval color="#ff197d" secondaryColor="#ffb1d3" height={80} width={80} />
        </div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    const hasData = (data) => data && data.length > 0;

    return (
        <div className='py-6 max-sm:p-2 xl:px-20 md:px-16 lg:px-24 bg-pink-50 overflow-x-hidden'>
            <h1 className="text-4xl font-bold text-center my-4 font-[roboto] max-md:text-2xl">Website Visit Reports</h1>

            {/* Daily Report */}
            <section className="mt-6 w-full flex gap-4 max-sm:flex-col">
                <div className='w-1/6 flex sm:flex-col gap-4 max-sm:w-full'>
                    <div className='w-full h-full bg-white rounded-md border border-slate-500 flex flex-col p-2'>
                        <span className='h-1/3 font-bold'>Today</span>
                        <span className='h-2/3 flex justify-center items-center font-bold text-primary text-2xl'>
                            {hasData(dailyData) ? formatDataForChart(dailyData)[0].count : 'No Data'}
                        </span>
                    </div>
                    <div className='w-full h-full bg-white rounded-md border border-slate-500 flex flex-col p-2'>
                        <span className='h-1/3 font-bold'>This Month</span>
                        <span className='h-2/3 flex justify-center items-center font-bold text-primary text-2xl'>
                            {hasData(monthlyData) ? formatDataForChart(monthlyData)[0].count : 'No Data'}
                        </span>
                    </div>
                    <div className='w-full h-full bg-white rounded-md border border-slate-500 flex flex-col p-2'>
                        <span className='h-1/3 font-bold'>This Year</span>
                        <span className='h-2/3 flex justify-center items-center font-bold text-primary text-2xl'>
                            {hasData(yearlyData) ? formatDataForChart(yearlyData)[0].count : 'No Data'}
                        </span>
                    </div>
                </div>
                <div className='w-5/6 max-sm:w-full bg-white rounded-md border border-slate-500 p-2'>
                    <ResponsiveContainer width="100%" height={350}>
                        <LineChart data={hasData(last30DaysData) ? formattedLast30DaysData : []}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Line type="monotone" dataKey="count" stroke="#ff197d" dot={{ r: 5 }} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </section>

            <h2 className='my-6 text-3xl font-bold'>By URLs</h2>

            {/* Today Visits Report */}
            <section className='mt-6 flex flex-col gap-2'>
                <h2 className='font-medium text-xl'>Today ({new Date().toLocaleDateString()}) Visits Report</h2>
                <div className='bg-white rounded-md border border-slate-500 p-2'>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={hasData(dailyDataUrl) ? formattedDailyDataUrl : []}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="page" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="count" fill="#9f1239" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </section>

            {/* Monthly Report */}
            <section className='mt-6 flex flex-col gap-2'>
                <h2 className='font-medium text-xl'>This Month Visits Report</h2>
                <div className='bg-white rounded-md border border-slate-500 p-2'>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={hasData(monthlyDataUrl) ? formattedMonthlyDataUrl : []}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="page" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="count" fill="#3B1E31" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </section>

            {/* Yearly Report */}
            <section className='mt-6 flex flex-col gap-2'>
                <h2 className='font-medium text-xl'>This Year Visits Report</h2>
                <div className='bg-white rounded-md border border-slate-500 p-2'>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={hasData(yearlyDataUrl) ? formattedYearlyDataUrl : []}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="page" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="count" fill="#3A3B26" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </section>
        </div>
    );
};

export default SiteVisitsReports;
