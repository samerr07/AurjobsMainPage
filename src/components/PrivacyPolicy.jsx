import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="bg-gray-50 py-12 mt-20">
      <div className="container mx-auto px-4 md:px-0 max-w-3xl">
        {/* Header Section */}
        <div className="bg-[#040736] text-white text-center py-5 rounded-md">
          <h1 className="text-3xl font-bold">Privacy Policy</h1>
        </div>

        {/* Effective Date */}
        <div className="text-gray-700 my-6 text-center">
          <p className="text-sm font-semibold">Effective Date: February 20, 2025</p>
          <p className="text-sm">Our Privacy Policy has been updated.</p>
        </div>

        {/* Your Privacy Matters Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Your Privacy Matters</h2>
          <p className="text-gray-700">
            Aurjobs respects your privacy and is committed to protecting it. This policy outlines how we collect, use, store, and protect your data.
          </p>
          <p className="text-gray-700">
            We are committed to being transparent about the data we collect about you, how it is used, and with whom it is shared.
          </p>
        </section>

        {/* Introduction */}
        <section id="introduction" className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">1. Introduction</h2>
          <p className="text-gray-700">
            AUREDGE AURJOBS PRIVATE LIMITED ("Aurjobs", "we", "us", or "our") respects your privacy and is committed to protecting it through this Privacy Policy.
          </p>
        </section>

        {/* Information We Collect */}
        <section id="info-we-collect" className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">2. Information We Collect</h2>
          <ul className="list-disc pl-5 text-gray-700">
            <li>Personal Information (e.g., Name, Email, Phone Number, Resume, Job Preferences)</li>
            <li>Account Information (e.g., Login Credentials)</li>
            <li>Cookies and Tracking Data</li>
          </ul>
        </section>

        {/* How We Use Your Data */}
        <section id="how-we-use" className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">3. How We Use Your Data</h2>
          <ul className="list-disc pl-5 text-gray-700">
            <li>To facilitate job matching and recruitment services</li>
            <li>To enhance user experience and platform functionality</li>
            <li>To process payments securely</li>
            <li>To ensure compliance with legal obligations</li>
          </ul>
        </section>

        {/* Data Sharing */}
        <section id="data-sharing" className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">4. Data Sharing</h2>
          <p className="text-gray-700">We do not share your data with any third party unless required by law.</p>
        </section>

        {/* Data Retention and Deletion */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">5. Data Retention and Deletion</h2>
          <p className="text-gray-700">Users can update or delete their personal data at any time through their account settings.</p>
        </section>

        {/* Security Measures */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">6. Security Measures</h2>
          <p className="text-gray-700">We employ encryption and other security measures to protect user data from unauthorized access.</p>
        </section>

        {/* International Users */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">7. International Users</h2>
          <p className="text-gray-700">Aurjobs is accessible globally and complies with India's IT Act.</p>
        </section>

        {/* User Rights */}
        <section id="user-rights" className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">8. User Rights</h2>
          <p className="text-gray-700">Users have full access to their data and can request modifications or deletions.</p>
        </section>

        {/* Contact Us */}
        <section id="contact-us" className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">9. Contact Us</h2>
          <p className="text-gray-700">
            For any privacy-related concerns, you can reach us at{" "}
            <a href="mailto:info@Aurjobs.com" className="text-blue-500 hover:underline">
              info@Aurjobs.com
            </a>.
          </p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;