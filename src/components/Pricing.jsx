import React, { useState } from 'react';

const Pricing = () => {
    const [activeTab, setActiveTab] = useState('jobPosting');
    const [showPayment, setShowPayment] = useState(false);
    const [selectedPlans, setSelectedPlans] = useState([]);
    const [preservedPlanState, setPreservedPlanState] = useState(null);

    // Create arrays for plans data for different tabs
    const jobPostingPlans = [
        {
            id: 'pay-as-you-go',
            name: 'Pay-as-You-Go (Single Credit)',
            price: 399,
            credits: 1,
            fixedCredits: true,
            description: 'Perfect for occasional hiring - No commitment required!',
            features: [
                '✅ 1 Job Post = 1 Credit',
                '✅ Job Live for: 30 Days',
                '✅ Credit Validity: 6 Months',
                '✅ AI-powered candidate matching included (🚀 Free for a limited time!)',
                '⚡ Limited-time Offer – Get started now!'
            ],
            isPopular: false,
            ctaText: 'Contact Us',
            isContactPlan: true
        },
        {
            id: 'bundle-plan',
            name: 'Bundle Plan (Best Value)',
            price: 7480,
            credits: 20,
            fixedCredits: true,
            description: '🚀 Most Popular Plan – Save ₹1,500!',
            features: [
                '✅ 20 Job Posts (20 Credits)',
                '✅ Job Live for: 30 Days Each',
                '✅ Credit Validity: 6 Months',
                '✅ Free Featured Listing for 2 Jobs (📌 Get 5X more visibility!)',
                '✅ Priority Candidate Matching (🚀 AI-suggested top profiles)',
                '🔥 Limited-time Deal – Boost Your Hiring Now!'
            ],
            isPopular: true,
            ctaText: 'Contact Us',
            isContactPlan: true
        },
        {
            id: 'enterprise-job',
            name: 'Enterprise Plan - Custom Pricing',
            price: 'Custom',
            description: '🚀 Access Top Talent Instantly!',
            features: [
                'Unlimited Candidate Profiles – Explore a vast talent pool with unrestricted access.',
                '✅ AI-Screened Profiles – Get pre-vetted candidates to save hiring time.',
                '✅ 44+ Advanced Filters – Find the perfect match with precise filtering.',
                '✅ Unlimited Resume Downloads – No limits on accessing candidate resumes.',
                '✅ Direct Contact Details – Connect with candidates instantly.',
                '✅ AI-Powered Shortlisting – Smart recommendations tailored to your needs.',
                '📞 Get Pricing & Unlock Access',
                '💡 Talk to our team & get started today!'
            ],
            isPopular: false,
            ctaText: 'Contact Us',
            isContactPlan: true
        }
    ];

    const databasePlans = [
        {
            id: 'enterprise-database',
            name: 'Enterprise Plan - Custom Pricing',
            price: 'Custom',
            description: '🚀 Access Top Talent Instantly!',
            features: [
                'Unlimited Candidate Profiles – Explore a vast talent pool with unrestricted access.',
                '✅ AI-Screened Profiles – Get pre-vetted candidates to save hiring time.',
                '✅ 44+ Advanced Filters – Find the perfect match with precise filtering.',
                '✅ Unlimited Resume Downloads – No limits on accessing candidate resumes.',
                '✅ Direct Contact Details – Connect with candidates instantly.',
                '✅ AI-Powered Shortlisting – Smart recommendations tailored to your needs.',
                '📞 Get Pricing & Unlock Access',
                '💡 Talk to our team & get started today!'
            ],
            isPopular: false,
            ctaText: 'Contact Us',
            isContactPlan: true
        }
    ];

    const [previouslySelectedPlans, setPreviouslySelectedPlans] = useState([]);

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    // const handlePlanSelection = (plan) => {
    //     if (plan.isContactPlan) {
    //         // Handle contact us action for enterprise plans
    //         window.location.href = "mailto:sales@aurjobs.com";
    //     } else {
    //         // Check if plan is already in selected plans
    //         const existingPlanIndex = selectedPlans.findIndex(p => p.id === plan.id);
            
    //         if (existingPlanIndex > -1) {
    //             // If plan exists, remove it
    //             const updatedPlans = [...selectedPlans];
    //             updatedPlans.splice(existingPlanIndex, 1);
    //             setSelectedPlans(updatedPlans);
    //         } else {
    //             // Add plan to selected plans
    //             setSelectedPlans([...selectedPlans, plan]);
    //         }
    //     }
    // };
    const handlePlanSelection = (plan) => {
        if (plan.isContactPlan) {
            // Handle contact us action for enterprise plans
            window.location.href = "mailto:sales@aurjobs.com";
            return;
        }

        // Check if plan is already in selected plans
        const existingPlanIndex = selectedPlans.findIndex(p => p.id === plan.id);
        
        let updatedPlans;
        if (existingPlanIndex > -1) {
            // If plan exists, remove it
            updatedPlans = selectedPlans.filter(p => p.id !== plan.id);
        } else {
            // Add plan to selected plans
            updatedPlans = [...selectedPlans, plan];
        }

        setSelectedPlans(updatedPlans);
    };
    // const handleProceedToPayment = () => {
    //     if (selectedPlans.length > 0) {
    //         setShowPayment(true);
    //     }
    // };
    const handleProceedToPayment = () => {
        if (selectedPlans.length > 0) {
            // Store current selected plans before moving to payment
            setPreviouslySelectedPlans(selectedPlans);
            setShowPayment(true);
        }
    };

    // const handleBackFromPayment = (paymentState) => {
    //     // You can handle any state preservation if needed
    //     setShowPayment(false);
    //     setPreservedPlanState(paymentState);
    //     // Optionally update selected plans based on payment state
    //     setSelectedPlans(paymentState.plans || []);
    // };
    const handleBackFromPayment = (paymentState) => {
        // Restore previously selected plans
        setShowPayment(false);
        
        // If payment state contains plans, update selected plans
        if (paymentState && paymentState.plan) {
            // Merge previously selected plans with any new plans from payment state
            const mergedPlans = [...previouslySelectedPlans, ...paymentState.plan].filter(
                (plan, index, self) => 
                    index === self.findIndex((p) => p.id === plan.id)
            );
            
            setSelectedPlans(mergedPlans);
        } else {
            // If no plans in payment state, restore previous selection
            setSelectedPlans(previouslySelectedPlans);
        }
    };

    // Get current plans based on active tab
    const currentPlans = activeTab === 'jobPosting' ? jobPostingPlans : databasePlans;

    // If showPayment is true, render PaymentGateway component
    if (showPayment) {
        return (
            <PaymentGateway 
                selectedPlans={selectedPlans} 
                onBackClick={handleBackFromPayment}
                initialCredits={preservedPlanState?.credits}
            />
        );
    }

    return (
        <div className="bg-gradient-to-b from-white to-blue-50 py-16 md:py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h2 className=" mt-4 top-24 right-4 text-4xl font-extrabold text-gray-900 sm:text-4xl mb-4">
                        Aurjobs Pricing Plans
                    </h2>
                    <p className="text-xl text-indigo-600 font-medium">
                        Hire Smarter, Faster!
                    </p>
                    <div className="mt-3 mx-auto w-24 h-1 bg-indigo-500 rounded-full"></div>
                </div>

                {/* Tabs */}
                <div className="mt-12 flex justify-center">
                    <div className="bg-white p-1 rounded-lg shadow-md inline-flex">
                        <button
                            className={`px-6 py-3 rounded-md text-sm font-medium transition-all duration-200 ${
                                activeTab === 'jobPosting'
                                ? 'bg-indigo-600 text-white shadow-md'
                                : 'text-gray-700 hover:bg-indigo-100'
                            }`}
                            onClick={() => handleTabClick('jobPosting')}
                        >
                            Job Posting
                        </button>
                        <button
                            className={`px-6 py-3 rounded-md text-sm font-medium transition-all duration-200 ${
                                activeTab === 'database'
                                ? 'bg-indigo-600 text-white shadow-md'
                                : 'text-gray-700 hover:bg-indigo-100'
                            }`}
                            onClick={() => handleTabClick('database')}
                        >
                            Database
                        </button>
                    </div>
                </div>

                {/* Pricing Plans Grid */}
                <div className="mt-16 grid gap-8 max-w-md mx-auto lg:grid-cols-3 lg:max-w-none">
                    {currentPlans.map((plan) => (
                        <div 
                            key={plan.id}
                            className={`flex flex-col rounded-xl overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl ${
                                plan.isPopular 
                                ? 'border-2 border-indigo-500 shadow-lg relative bg-white' 
                                : 'border border-gray-200 shadow-md bg-white'
                            }`}
                        >
                            {/* Popular Badge */}
                            {plan.isPopular && (
                                <div className="absolute top-0 right-0 bg-indigo-600 text-white py-1 px-3 rounded-bl-lg text-xs font-medium">
                                    Most Popular
                                </div>
                            )}
                            
                            {/* Plan Header */}
                            <div className="px-6 py-8 bg-gradient-to-br from-white to-indigo-50">
                                <h3 className="text-2xl font-bold text-gray-900 text-center">
                                    {plan.name}
                                </h3>
                                <p className={`mt-2 text-sm text-center ${plan.isPopular ? 'text-indigo-700 font-medium' : 'text-gray-600'}`}>
                                    {plan.description}
                                </p>
                                
                                {/* Price Display */}
                                <div className="mt-4 text-center">
                                    <span className="text-3xl font-extrabold text-gray-900">
                                        {typeof plan.price === 'number' ? `₹${plan.price.toLocaleString()}` : plan.price}
                                    </span>
                                    {typeof plan.price === 'number' && <span className="text-gray-600 ml-1">/plan</span>}
                                </div>
                            </div>
                            
                            {/* Features List */}
                            <div className="flex-grow px-6 py-4 bg-white">
                                <ul className="space-y-3">
                                    {plan.features.map((feature, index) => (
                                        <li key={index} className="flex items-start">
                                            <div className="flex-shrink-0 text-indigo-500">
                                                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                            <p className="ml-3 text-sm text-gray-700">{feature}</p>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            
                            {/* CTA Button */}
                            <div className="px-6 py-6 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
                                <button
                                    onClick={() => handlePlanSelection(plan)}
                                    className={`w-full rounded-lg py-3 font-medium transition-all duration-300 ${
                                        selectedPlans.some(p => p.id === plan.id)
                                        ? 'bg-green-500 text-white hover:bg-green-600'
                                        : (plan.isPopular 
                                            ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-md' 
                                            : 'bg-orange-500 hover:bg-orange-600 text-white')
                                    }`}
                                >
                                    {selectedPlans.some(p => p.id === plan.id) ? 'Remove' : plan.ctaText}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                
                {/* Proceed to Payment Button */}
                {selectedPlans.length > 0 && (
                    <div className="mt-8 text-center">
                        <button 
                            onClick={handleProceedToPayment}
                            className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-lg shadow-md transition duration-300 transform hover:scale-105"
                        >
                            Proceed to Payment ({selectedPlans.length} Plan{selectedPlans.length > 1 ? 's' : ''})
                        </button>
                    </div>
                )}

                {/* Additional Info */}
                <div className="mt-12 text-center">
                    <p className="text-gray-600">
                        Need a custom solution? <a href="mailto:sales@aurjobs.com" className="text-indigo-600 font-medium">Contact our sales team</a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Pricing;