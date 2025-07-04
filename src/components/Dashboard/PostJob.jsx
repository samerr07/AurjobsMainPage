import React, { useState } from 'react'
import {
  DollarSign,
  FileText,
  X,
  Clock,
  AlertCircle,
  Briefcase,
  Building,
  MapPin,
  Calendar,
  Star,
  CheckCircle,
  Loader,
  IndianRupee
} from 'lucide-react';
import { useSelector } from 'react-redux';
import { BASEURL } from '../../utility/config';
import axios from 'axios';
import { toast } from 'react-toastify';

const PostJob = () => {
  const { employerProfile } = useSelector((state) => state.employer);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);


  const departments = [
  "Engineering",
  "Design",
  "Product",
  "Sales",
  "Marketing",
  "Customer Support",
  "Human Resources",
  "Finance",
  "Legal",
  "Operations",
  "IT & Security",
  "Business Development",
  "Data & Analytics",
  "Content & Writing",
  "Quality Assurance",
  "Project Management",
  "Administration",
  "Education & Training",
  "Healthcare",
  "Manufacturing",
  "Logistics & Supply Chain",
  "Procurement",
  "Public Relations",
  "Research & Development",
  "Strategy & Consulting"
];

const industries = [
        // Technology & IT
        "Technology",
        "Information Technology (IT)",
        "Software Development",
        "Artificial Intelligence (AI) & Machine Learning",
        "Cybersecurity",
        "Cloud Computing",
        "Blockchain",
        "Big Data & Analytics",
        "Telecommunications",
        "Game Development",
        "Web Development",
        "Mobile App Development",
        "Internet of Things (IoT)",
        "Augmented Reality (AR) & Virtual Reality (VR)",

        // Finance & Banking
        "Banking & Financial Services",
        "FinTech",
        "Investment Banking",
        "Insurance",
        "Accounting & Auditing",
        "Wealth Management",
        "Real Estate & Mortgage",

        // Healthcare & Pharmaceuticals
        "Healthcare",
        "Pharmaceuticals",
        "Biotechnology",
        "Medical Devices",
        "HealthTech",
        "Telemedicine",
        "Public Health & Hospitals",
        "Medical Research",

        // Education & Research
        "Education & E-learning",
        "Higher Education",
        "EdTech",
        "Research & Development (R&D)",
        "Training & Coaching",

        // Manufacturing & Engineering
        "Manufacturing",
        "Automotive",
        "Aerospace & Defense",
        "Electronics & Electricals",
        "Industrial Automation",
        "Textiles & Apparel",
        "Chemical Industry",
        "Metallurgy & Mining",

        // Energy & Utilities
        "Energy",
        "Oil & Gas",
        "Renewable Energy",
        "Electricity & Utilities",
        "Nuclear Energy",

        // Retail & E-commerce
        "Retail",
        "E-commerce",
        "Consumer Goods",
        "Luxury & Fashion",
        "Wholesale Distribution",
        "Supply Chain & Logistics",

        // Media & Entertainment
        "Media & Entertainment",
        "Film & Television",
        "Music Industry",
        "Advertising & Marketing",
        "Publishing",
        "Digital Media",
        "Gaming Industry",

        // Travel & Hospitality
        "Tourism & Hospitality",
        "Hotels & Resorts",
        "Airlines & Aviation",
        "Cruise & Maritime",
        "Travel Agencies",
        "Event Management",

        // Government & Nonprofit
        "Government & Public Administration",
        "Nonprofit & NGOs",
        "Legal Services",
        "Law Enforcement & Security",
        "International Relations",
        "Social Work",

        // Construction & Infrastructure
        "Construction",
        "Real Estate",
        "Urban Planning",
        "Architecture & Design",
        "Civil Engineering",

        // Agriculture & Food Industry
        "Agriculture",
        "Food & Beverage",
        "Dairy & Poultry",
        "Fisheries & Aquaculture",
        "AgriTech",

        // Transportation & Logistics
        "Transportation",
        "Logistics & Supply Chain",
        "Shipping & Freight",
        "Railways",
        "Maritime & Ports",

        // Environmental & Sustainability
        "Environmental Services",
        "Sustainable Energy",
        "Recycling & Waste Management",
        "Climate Change & Conservation"
    ];

  
  const [jobForm, setJobForm] = useState({
    job_title: '',
    department: '',
    job_location: '',
    employment_type: '',
    work_mode: '',
    industry: '',
    job_experience_required: '',
    salary_range: '',
    job_description: '',
    requirements: '',
    qualifications: '',
    benefits: '',
    applicationdeadline: '',
    job_skills_required: [],
    employer_id: employerProfile?.employer_id,
  });

  const [currentSkill, setCurrentSkill] = useState('');

  const removeSkill = (index) => {
    setJobForm(prev => ({
      ...prev,
      job_skills_required: prev.job_skills_required.filter((_, i) => i !== index)
    }));
  };

  const handleSkillKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addSkill();
    }
  };

  const postJob = async (e) => {
    e.preventDefault();
    
    if (jobForm.job_skills_required.length === 0) {
      console.log("Please add at least one skill.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post(`${BASEURL}/jobs_post/create_Job_Post`, jobForm, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      console.log(jobForm)

      if (response.status === 201) {
        setJobForm({ 
          job_title: "",
          department: "",
          job_description: "",
          employment_type: "",
          work_mode: "",
          job_location: "",
          remote: false,
          salary_range: "",
          job_experience_required: "",
          job_skills_required: [],
          industry: "",
          requirements: "",
          qualifications: "",
          benefits: "",
          applicationdeadline: "",
          status: "Open",
          posted_at: new Date().toISOString().split("T")[0],
          employer_id: employerProfile?.employer_id,
        });
        setCurrentSkill("");
        setShowSuccessPopup(true);
        //  toast.success("Job posted successfully!", {
        //           duration: 4000,
        //           position: 'top-right',
        //         });
        
        // Auto-hide success popup after 5 seconds
        setTimeout(() => {
          setShowSuccessPopup(false);
        }, 5000);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Failed to create job post. Please try again.")
      
    } finally {
      setIsLoading(false);
    }
  };

  const handleJobFormChange = (e) => {
    const { name, value } = e.target;
    setJobForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const addSkill = () => {
    if (currentSkill.trim() !== '') {
      setJobForm(prev => ({
        ...prev,
        job_skills_required: [...prev.job_skills_required, currentSkill.trim()]
      }));
      setCurrentSkill('');
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 relative">
      {/* Success Popup */}
      {showSuccessPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-blur bg-opacity-30">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full m-4 animate-fade-in">
            <div className="flex items-center mb-4 text-green-600">
              <CheckCircle className="h-8 w-8 mr-3" />
              <h3 className="text-xl font-semibold">Success!</h3>
            </div>
            <p className="text-gray-700 mb-6">
              Your job has been posted successfully and is pending review.
            </p>
            <div className="flex justify-end">
              <button 
                onClick={() => setShowSuccessPopup(false)}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
              >
                Got it
              </button>
            </div>
          </div>
        </div>
      )}

      <h3 className="text-lg font-bold text-gray-800 mb-6">Post a New Job</h3>

      <div className="space-y-6">
        {/* Job Basic Info - First Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Job Title *</label>
            <div className="flex items-center">
              <Briefcase className="h-4 w-4 text-gray-400 mr-1" />
              <input
                type="text"
                name="job_title"
                required
                value={jobForm.job_title}
                onChange={handleJobFormChange}
                placeholder="e.g. Senior Frontend Developer"
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>
          {/* <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Department *</label>
            <div className="flex items-center">
              <Building className="h-4 w-4 text-gray-400 mr-1" />
              <input
                type="text"
                name="department"
                required
                value={jobForm.department}
                onChange={handleJobFormChange}
                placeholder="e.g. Engineering"
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div> */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Department *</label>
            <select
              name="department"
              required
              value={jobForm.department}
              onChange={handleJobFormChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Select Department</option>
              {
                departments.map((department, index) => (
                  <option key={index} value={department}>{department}</option>
                )
                )
              }
              
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Industry *</label>
            <select
              name="industry"
              required
              value={jobForm.industry}
              onChange={handleJobFormChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Select industry</option>
              {
                industries.map((industry, index) => ( 
                  <option key={index} value={industry}>{industry}</option>
                )
                )
              }
            </select>
          </div>
        </div>

        {/* Job Basic Info - Second Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Location *</label>
            <div className="flex items-center">
              <MapPin className="h-4 w-4 text-gray-400 mr-1" />
              <input
                type="text"
                name="job_location"
                required
                value={jobForm.job_location}
                onChange={handleJobFormChange}
                placeholder="e.g. San Francisco, CA"
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Work Mode *</label>
            <select
              name="work_mode"
              required
              value={jobForm.work_mode}
              onChange={handleJobFormChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Select work mode</option>
              <option value="On-site">On-site</option>
              <option value="Remote">Remote</option>
              <option value="Hybrid">Hybrid</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Employment Type *</label>
            <select
              name="employment_type"
              required
              value={jobForm.employment_type}
              onChange={handleJobFormChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Select type</option>
              <option value="Full-time">Full-time</option>
              {/* <option value="Part-time">Part-time</option> */}
              <option value="Contract">Contract</option>
              {/* <option value="Temporary">Temporary</option> */}
              <option value="Internship">Internship</option>
            </select>
          </div>
        </div>

        {/* Job Basic Info - Third Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Experience Years *</label>
            <div className="flex items-center">
              <Star className="h-4 w-4 text-gray-400 mr-1" />
              <input
                type="text"
                name="job_experience_required"
                required
                value={jobForm.job_experience_required}
                onChange={handleJobFormChange}
                placeholder="e.g. 3 years"
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Salary Range</label>
            <div className="flex items-center">
              <IndianRupee className="h-4 w-4 text-gray-400 mr-1" />
              <input
                type="text"
                name="salary_range"
                value={jobForm.salary_range}
                onChange={handleJobFormChange}
                placeholder="e.g. $80,000per year"
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Application Deadline *</label>
            <div className="flex items-center">
              <Calendar className="h-4 w-4 text-gray-400 mr-1" />
              <input
                type="date"
                name="applicationdeadline"
                required
                value={jobForm.applicationdeadline}
                onChange={handleJobFormChange}
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>
        </div>

        {/* Job Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Job Description *</label>
          <textarea
            name="job_description"
            required
            value={jobForm.job_description}
            onChange={handleJobFormChange}
            rows="4"
            placeholder="Provide a detailed description of the job role and responsibilities..."
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          ></textarea>
        </div>

        {/* Requirements */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Requirements </label>
          <textarea
            name="requirements"
            value={jobForm.requirements}
            onChange={handleJobFormChange}
            rows="4"
            placeholder="List the skills, abilities and experience required for this role..."
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          ></textarea>
        </div>

        {/* Qualifications */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Qualifications </label>
          <textarea
            name="qualifications"
            value={jobForm.qualifications}
            onChange={handleJobFormChange}
            rows="4"
            placeholder="List the necessary education, certifications, and credentials required for this role..."
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          ></textarea>
        </div>

        {/* Benefits */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Benefits & Perks</label>
          <textarea
            name="benefits"
            value={jobForm.benefits}
            onChange={handleJobFormChange}
            rows="3"
            placeholder="Describe the benefits and perks offered with this position..."
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          ></textarea>
        </div>

        {/* Skills */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Required Skills</label>
          <div className="flex flex-wrap gap-2 mb-2">
            {jobForm.job_skills_required.map((skill, index) => (
              <div
                key={index}
                className="flex items-center bg-indigo-100 text-indigo-800 rounded-full px-3 py-1 text-sm"
              >
                {skill}
                <button
                  type="button"
                  onClick={() => removeSkill(index)}
                  className="ml-2 text-indigo-800 hover:text-indigo-900"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
          <div className="flex">
            <input
              type="text"
              value={currentSkill}
              onChange={(e) => setCurrentSkill(e.target.value)}
              onKeyDown={handleSkillKeyDown}
              placeholder="Add a skill and press Enter"
              className="flex-1 border border-gray-300 rounded-l-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              type="button"
              onClick={addSkill}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-r-lg"
            >
              Add
            </button>
          </div>
        </div> 

        {/* Notice */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-start">
          <AlertCircle className="h-5 w-5 text-yellow-500 mt-0.5 mr-3 flex-shrink-0" />
          <p className="text-sm text-yellow-700">
            By posting this job, you confirm that this job complies with all applicable laws and regulations.
            Your job posting will be reviewed before being published.
          </p>
        </div>

        {/* Buttons */}
        <div className="flex justify-end space-x-4 pt-2">
          {/* <button
            type="button"
            disabled={isLoading}
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50"
          >
            Save as Draft
          </button> */}
          <button
            type="button"
            onClick={postJob}
            disabled={isLoading}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg flex items-center disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <Loader className="h-4 w-4 mr-2 animate-spin" />
                Posting...
              </>
            ) : (
              'Post Job'
            )}
          </button>
        </div>
      </div>

      {/* Full-page loading overlay */}
      {isLoading && (
        <div className="absolute inset-0 bg-white bg-opacity-50 flex items-center justify-center rounded-xl">
          <div className="flex flex-col items-center">
            <Loader className="h-8 w-8 text-indigo-600 animate-spin mb-2" />
            <p className="text-indigo-700 font-medium">Posting your job...</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default PostJob