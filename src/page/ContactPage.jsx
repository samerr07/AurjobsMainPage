import React, { useState } from 'react'
import { MapPin, Phone, Clock, Mail } from 'lucide-react';

const ContactPage = () => {

    // Form state
    const [formData, setFormData] = useState({
        yourName: '',
        companyName: '',
        email: '',
        phone: '',
        purpose: '',
        message: ''
    });



    // Handle input changes
    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [id]: value
        }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log(formData)


    };



    const googleMapsUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15249885.318783779!2d82.75252935!3d21.0680074!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x20dc987e258cae55%3A0x39b7938d2b3f83da!2sAurjobs!5e0!3m2!1sen!2sin!4v1738157602799!5m2!1sen!2sin"
    return (

        <div className="min-h-screen bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 py-16">
            <div className="container mx-auto px-4 py-12 md:py-20">
                <div className="max-w-6xl mx-auto">
                    {/* Header Section */}
                    <div className="text-center mb-12">
                        <span className="inline-block text-sm font-semibold text-indigo-600 tracking-wider uppercase mb-2">
                            Get in Touch
                        </span>
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                            Love to hear from you
                        </h1>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Have a question or want to work together? We'd love to hear from you.
                        </p>
                    </div>

                    {/* Main Content Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                        {/* Form Section */}
                        <div className="bg-white rounded-2xl shadow-sm p-8 h-full">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Personal Information */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="yourName" className="block text-sm font-medium text-gray-700 mb-2">
                                            Your Name*
                                        </label>
                                        <input
                                            type="text"
                                            id="yourName"
                                            value={formData.yourName}
                                            onChange={handleChange}
                                            className="w-full p-3 border outline-none border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-2">
                                            Company Name*
                                        </label>
                                        <input
                                            type="text"
                                            id="companyName"
                                            value={formData.companyName}
                                            onChange={handleChange}
                                            className="w-full p-3 border outline-none border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Contact Information */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                            Email Address*
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="w-full p-3 border outline-none border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                                            Phone Number*
                                        </label>
                                        <input
                                            type="tel"
                                            id="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            className="w-full p-3 border outline-none border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Purpose Section */}
                                <div>
                                    <label htmlFor="purpose" className="block text-sm font-medium text-gray-700 mb-2">
                                        Purpose*
                                    </label>
                                    <select
                                        id="purpose"
                                        value={formData.purpose}
                                        onChange={handleChange}
                                        className="w-full p-3 border outline-none border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                                        required
                                    >
                                        <option value="">Select a purpose</option>
                                        <option value="subscription">Contact for Subscription</option>
                                        <option value="product-demo">Contact for Product Demo</option>
                                        <option value="free-demo">Contact to Get free Demo</option>
                                        <option value="sales">Contact Sales</option>
                                        <option value="general">General Queries</option>
                                        <option value="support">Contact Support</option>
                                        <option value="technical">Technical Team</option>
                                    </select>
                                </div>



                                {/* Message Section */}
                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                                        Message*
                                    </label>
                                    <textarea
                                        id="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        rows={6}
                                        className="w-full p-3 border border-gray-200 outline-none rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                                        placeholder="Tell us about your project..."
                                        required
                                    />
                                </div>

                                <button
                                    type="submit"

                                    className="w-full bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-500 transform transition-all duration-200 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Send Message
                                </button>
                            </form>
                        </div>

                        {/* Info Section */}
                        <div className="h-full flex flex-col">
                            <div className="bg-white rounded-2xl shadow-sm p-8 space-y-6 flex-grow">
                                <div className="flex items-center space-x-4">
                                    <div className="p-3 bg-emerald-100 rounded-lg">
                                        <MapPin className="text-indigo-600 w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-gray-900">Our Location</h3>
                                        <p className="text-gray-600">Bangalore, India</p>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-4">
                                    <div className="p-3 bg-emerald-100 rounded-lg">
                                        <Phone className="text-indigo-600 w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-gray-900">Phone Number</h3>
                                        <p className="text-gray-600">(+91) 8630793609</p>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-4">
                                    <div className="p-3 bg-emerald-100 rounded-lg">
                                        <Mail className="text-indigo-600 w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-gray-900">Email</h3>
                                        <p className="text-gray-600">Info@Aurjobs.com</p>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-4">
                                    <div className="p-3 bg-emerald-100 rounded-lg">
                                        <Clock className="text-indigo-600 w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-gray-900">Business Hours</h3>
                                        <p className="text-gray-600">Mon-Sat: 10 AM - 6 PM</p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 bg-white rounded-2xl shadow-sm overflow-hidden h-96">
                                <iframe
                                    src={googleMapsUrl}
                                    className="w-full h-full border-0"
                                    allowFullScreen=""
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title="Google Maps Location"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ContactPage
