import { useState, useEffect, useRef } from 'react';
import {
  Users,
  Briefcase,
  Calendar,
  PieChart,
  Bell,
  MessageSquare,
  Settings,
  Search,
  ChevronLeft,
  Plus,
  MapPin,
  Globe,
  Linkedin,
  Twitter,
  Facebook,
  Instagram,
  Save,
  Upload,
  TrendingUp,
  Layers,
  UserCheck,
  DollarSign,
  FileText,
  X,
  Clock,
  AlertCircle,
  Eye,
  Share2,
  Edit,
  BarChart2,
  ChevronRight,
  User,
  Mail,
  Loader
} from 'lucide-react';
import PostJob from './PostJob';
import { useDispatch, useSelector } from 'react-redux';
import { updateEmployerAPI } from './updateEmployerProfile';
import { updateEmployerProfile } from '../../redux/employerSlice';
import axios from 'axios';
import { BASEURL } from '../../utility/config';


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

// Component for information items in view mode
const InfoItem = ({ label, value }) => {
  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      <p className="text-sm text-gray-500 mb-1">{label}</p>
      <p className="font-medium text-gray-900">{value}</p>
    </div>
  );
};

// Component for form fields in edit mode
const FormField = ({ label, name, value, onChange, type = "text", options = [] }) => {
  const handleChange = (e) => {
    onChange(e.target.name, e.target.value);
  };

  if (type === "select") {
    return (
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
        <select
          name={name}
          value={value || ''}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          {options.map((option, index) => (
            <option key={index} value={option}>{option}</option>
          ))}
        </select>
      </div>
    );
  }

  if (type === "textarea") {
    return (
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
        <textarea
          name={name}
          value={value || ''}
          onChange={handleChange}
          rows="4"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        ></textarea>
      </div>
    );
  }

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <input
        type={type}
        name={name}
        value={value || ''}
        onChange={handleChange}
        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
    </div>
  );
};

// Company Profile Component
const CompanyProfile = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [editMode, setEditMode] = useState(false);
  const [isImageUploading, setIsImageUploading] = useState(false);
  const [isProfileUpdating, setIsProfileUpdating] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const fileInputRef = useRef(null);
  
  // Get data from Redux store
  const dispatch = useDispatch();
  const employerData = useSelector((state) => state.employer?.employerProfile);
  
  // State for company profile - initialized as empty object
  const [companyProfile, setCompanyProfile] = useState({});

  // Update companyProfile when employerData changes from Redux
  useEffect(() => {
    if (employerData) {
      setCompanyProfile({
        ...employerData,
        
      });
      setImagePreview(employerData?.company_logo || null);
    }
  }, [employerData]);

  // Handle general profile field changes
  const handleProfileChange = (name, value) => {
    setCompanyProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle social links changes
  const handleSocialChange = (name, value) => {
    setCompanyProfile(prev => ({
      ...prev,
      socialLinks: {
        ...prev.socialLinks,
        [name]: value
      }
    }));
  };

  // Handle specialty changes
  const handleSpecialtyChange = (index, value) => {
    const newSpecialties = [...companyProfile.specialties];
    newSpecialties[index] = value;
    setCompanyProfile(prev => ({
      ...prev,
      specialties: newSpecialties
    }));
  };

  // Add a new specialty
  const addSpecialty = () => {
    setCompanyProfile(prev => ({
      ...prev,
      specialties: [...prev.specialties, '']
    }));
  };

  // Remove a specialty
  const removeSpecialty = (index) => {
    setCompanyProfile(prev => ({
      ...prev,
      specialties: prev.specialties.filter((_, i) => i !== index)
    }));
  };

  // Handle image upload button click
  const handleImageUploadClick = () => {
    fileInputRef.current.click();
  };

  // Handle image file change
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);

      // Create a preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);

      setIsImageUploading(true);

      try {
        // Create FormData and append the file
        const formData = new FormData();
        formData.append('company_logo', file);

        // Make API call to upload image
        const res = await axios.post(
          `${BASEURL}/employers/Employer_Upload_image/${employerData.employer_id}`, 
          formData, 
          {
            withCredentials: true,
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        );

        // Get the URL of the uploaded image from the response
        const imageUrl = res?.data?.imageupload;

        // Update the company_logo field with the returned URL
        handleProfileChange('company_logo', imageUrl);
      } catch (error) {
        console.error('Error uploading image:', error);
        // You might want to show an error message to the user here
      } finally {
        // Reset loading state
        setIsImageUploading(false);
      }
    }
  };

  // Handle removing the current image
  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview(null);
    handleProfileChange('company_logo', '');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Save profile changes
  const saveProfile = async () => {
    // Log the data being saved
    console.log('Saving profile:', companyProfile);
    
    setIsProfileUpdating(true);
    
    try {
      // First, make the API call
      const response = await updateEmployerAPI(employerData.employer_id, companyProfile);
      
      if (response.success) {
        // Then, update Redux using the action creator from your slice
        dispatch(updateEmployerProfile(response.updatedEmployer.employer));
        setEditMode(false);
      } else {
        // Handle error - maybe show a notification
        console.error('Failed to update profile:', response.error);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      // Reset loading state
      setIsProfileUpdating(false);
    }
  };

  // Company size options for dropdown
  const companySizeOptions = [
    "Startup (1-50)",
    "Small (51-200)",
    "Medium (201-1000)",
    "Large (1000+)",
    // "501-1000 employees",
    // "1001+ employees"
  ];

  // If no employer data is loaded yet, show loading
  if (!employerData && activeTab === 'profile') {
    return (
      <div className="flex-1 flex items-center justify-center">
        <Loader className="w-8 h-8 text-indigo-600 animate-spin" />
        <span className="ml-2 text-gray-700">Loading company profile...</span>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-auto">
      {/* Top Header */}
      <header className="bg-white shadow-sm">
        {/* Tabs */}
        <div className="flex border-b border-gray-200">
          <button
            className={`px-6 py-3 text-sm font-medium ${activeTab === 'profile'
              ? 'text-indigo-600 border-b-2 border-indigo-600'
              : 'text-gray-500 hover:text-gray-700'
              }`}
            onClick={() => setActiveTab('profile')}
          >
            Company Profile
          </button>
          <button
            className={`px-6 py-3 text-sm font-medium ${activeTab === 'postjob'
              ? 'text-indigo-600 border-b-2 border-indigo-600'
              : 'text-gray-500 hover:text-gray-700'
              }`}
            onClick={() => setActiveTab('postjob')}
          >
            Post New Job
          </button>
        </div>
      </header>

      {/* Page Content */}
      <main className="p-6">
        {activeTab === 'profile' ? (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-gray-800">Company Information</h3>
              {!editMode ? (
                <button
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center"
                  onClick={() => setEditMode(true)}
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Profile
                </button>
              ) : (
                <button
                  className={`bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center ${isProfileUpdating ? 'opacity-75 cursor-not-allowed' : ''}`}
                  onClick={saveProfile}
                  disabled={isProfileUpdating}
                >
                  {isProfileUpdating ? (
                    <>
                      <Loader className="h-4 w-4 mr-2 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </>
                  )}
                </button>
              )}
            </div>

            {!editMode ? (
              <div className="space-y-8">
                {/* Company Header */}
                <div className="flex items-start">
                  <div className="mr-6 relative">
                    <img
                      src={companyProfile.company_logo || "https://via.placeholder.com/150"}
                      alt={companyProfile.company_display_name || "Company Logo"}
                      className="h-24 w-24 rounded-lg object-cover"
                    />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">{companyProfile.company_display_name || "Company Name"}</h2>
                    <p className="text-gray-600">{companyProfile.industry || "Industry"}</p>
                    <div className="flex flex-col mt-2 text-sm text-gray-500 space-y-1">
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span>{companyProfile.headquarters || "Location"}</span>
                      </div>
                      <div className="flex items-center">
                        <Globe className="h-4 w-4 mr-1" />
                        <a href={`https://${companyProfile.company_website}`} className="text-indigo-600 hover:text-indigo-800">
                          {companyProfile.company_website || "Website"}
                        </a>
                      </div>
                      <div className="flex items-center">
                        <Mail className="h-4 w-4 mr-1" />
                        <a href={`mailto:${companyProfile.employer_email}`} className="text-indigo-600 hover:text-indigo-800">
                          {companyProfile.employer_email || "Email"}
                        </a>
                      </div>
                    </div>
                    <div className="flex space-x-2 mt-3">
                      {companyProfile?.company_linkedin && (
                        <a href={`https://linkedin.com/company/${companyProfile.company_linkedin}`} className="text-gray-500 hover:text-indigo-600">
                          <Linkedin className="h-5 w-5" />
                        </a>
                      )}
                      {companyProfile?.company_twitter && (
                        <a href={`https://twitter.com/${companyProfile.company_twitter}`} className="text-gray-500 hover:text-indigo-600">
                          <Twitter className="h-5 w-5" />
                        </a>
                      )}
                      {companyProfile?.company_facebook && (
                        <a href={`https://facebook.com/${companyProfile.company_facebook}`} className="text-gray-500 hover:text-indigo-600">
                          <Facebook className="h-5 w-5" />
                        </a>
                      )}
                      {/* {companyProfile.socialLinks?.instagram && (
                        <a href={`https://instagram.com/${companyProfile.socialLinks.instagram}`} className="text-gray-500 hover:text-indigo-600">
                          <Instagram className="h-5 w-5" />
                        </a>
                      )} */}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <InfoItem label="Company Size" value={companyProfile.company_size || "Not specified"} />
                  <InfoItem label="Founded" value={companyProfile.founded_date || "Not specified"} />
                  <InfoItem label="Industry" value={companyProfile.industry || "Not specified"} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InfoItem label="Registered Company Name" value={companyProfile.company_registered_name || "Not specified"} />
                  <InfoItem label="CIN" value={companyProfile.cin || "Not specified"} />
                </div>

                <div>
                  <h4 className="text-lg font-medium text-gray-800 mb-2">Description</h4>
                  <p className="text-gray-600 whitespace-pre-line">{companyProfile.description || "No description available."}</p>
                </div>

                <div>
                  <h4 className="text-lg font-medium text-gray-800 mb-2">Specialties</h4>
                  {companyProfile.specialties?.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {companyProfile.specialties.map((specialty, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500">No specialties listed.</p>
                  )}
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Company Logo Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Company Logo</label>
                  <div className="flex items-start">
                    <div className="relative">
                      <img
                        src={imagePreview || "https://via.placeholder.com/150"}
                        alt="Company Logo"
                        className="h-20 w-20 rounded-lg object-cover mr-4"
                      />
                      
                      {isImageUploading && (
                        <div className="absolute inset-0 bg-gray-200 bg-opacity-60 flex items-center justify-center rounded-lg">
                          <Loader className="w-5 h-5 text-indigo-600 animate-spin" />
                        </div>
                      )}
                    </div>
                    
                    <div className="flex flex-col space-y-2">
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleImageChange}
                        accept="image/*"
                        className="hidden"
                        disabled={isImageUploading}
                      />
                      
                      <button 
                        className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm flex items-center hover:bg-gray-50"
                        onClick={handleImageUploadClick}
                        disabled={isImageUploading}
                      >
                        {isImageUploading ? (
                          <>
                            <Loader className="h-4 w-4 mr-2 animate-spin" />
                            Uploading...
                          </>
                        ) : (
                          <>
                            <Upload className="h-4 w-4 mr-2" />
                            Upload New Logo
                          </>
                        )}
                      </button>
                      
                      {imagePreview && !isImageUploading && (
                        <button
                          className="bg-red-50 text-red-600 border border-red-200 px-4 py-2 rounded-lg text-sm flex items-center hover:bg-red-100"
                          onClick={handleRemoveImage}
                        >
                          <X className="h-4 w-4 mr-2" />
                          Remove Image
                        </button>
                      )}
                      
                      <p className="text-xs text-gray-500 mt-1">Recommended: 400x400px, PNG or JPG</p>
                    </div>
                  </div>
                </div>

                {/* Basic Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField 
                    label="Company Name" 
                    name="company_display_name" 
                    value={companyProfile.company_display_name} 
                    onChange={handleProfileChange} 
                  />
                  
                  <FormField 
                    label="Registered Company Name" 
                    name="company_registered_name" 
                    value={companyProfile.company_registered_name} 
                    onChange={handleProfileChange} 
                  />
                  
                  <FormField 
                    label="CIN" 
                    name="cin" 
                    value={companyProfile.cin} 
                    onChange={handleProfileChange} 
                  />
                  
                  <FormField 
                    label="Industry" 
                    name="industry" 
                    value={companyProfile.industry} 
                    onChange={handleProfileChange} 
                    type='select'
                    options={industries}
                  />
                  
                  <FormField 
                    label="Company Size" 
                    name="company_size" 
                    value={companyProfile.company_size} 
                    onChange={handleProfileChange} 
                    type="select"
                    options={companySizeOptions}
                  />
                  
                  <FormField 
                    label="Founded" 
                    name="founded_date" 
                    value={companyProfile.founded_date} 
                    onChange={handleProfileChange} 
                  />
                  
                  <FormField 
                    label="Website" 
                    name="company_website" 
                    value={companyProfile.company_website} 
                    onChange={handleProfileChange} 
                  />
                  
                  <FormField 
                    label="Headquarters" 
                    name="headquarters" 
                    value={companyProfile.headquarters} 
                    onChange={handleProfileChange} 
                  />
                  
                  <FormField 
                    label="Email" 
                    name="employer_email" 
                    value={companyProfile.employer_email} 
                    onChange={handleProfileChange} 
                    type="email"
                  />
                </div>

                {/* Social Links */}
                <div>
                  <h4 className="text-base font-medium text-gray-800 mb-2">Social Media Links</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center">
                      <Linkedin className="h-5 w-5 text-gray-400 mr-2" />
                      <input
                        type="text"
                        name="linkedin"
                        placeholder="LinkedIn URL or username"
                        value={companyProfile?.company_linkedin || ''}
                        onChange={handleProfileChange}
                        className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                    <div className="flex items-center">
                      <Twitter className="h-5 w-5 text-gray-400 mr-2" />
                      <input
                        type="text"
                        name="twitter"
                        placeholder="Twitter URL or username"
                        value={companyProfile.company_twitter || ''}
                        onChange={handleProfileChange}
                        className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                    <div className="flex items-center">
                      <Facebook className="h-5 w-5 text-gray-400 mr-2" />
                      <input
                        type="text"
                        name="facebook"
                        placeholder="Facebook URL or username"
                        value={companyProfile.company_facebook || ''}
                        onChange={handleProfileChange}
                        className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                    {/* <div className="flex items-center">
                      <Instagram className="h-5 w-5 text-gray-400 mr-2" />
                      <input
                        type="text"
                        name="instagram"
                        placeholder="Instagram URL or username"
                        value={companyProfile.socialLinks?.instagram || ''}
                        onChange={(e) => handleSocialChange(e.target.name, e.target.value)}
                        className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div> */}
                  </div>
                </div>

                {/* Description */}
                <FormField 
                  label="Description" 
                  name="description" 
                  value={companyProfile.description} 
                  onChange={handleProfileChange} 
                  type="textarea"
                />

                {/* Specialties */}
                {/* <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-sm font-medium text-gray-700">Specialties</label>
                    <button
                      type="button"
                      onClick={addSpecialty}
                      className="text-indigo-600 text-sm flex items-center hover:text-indigo-800"
                    >
                      <Plus className="h-4 w-4 mr-1" />
                      Add New
                    </button>
                  </div>
                  {companyProfile.specialties?.map((specialty, index) => (
                    <div key={index} className="flex items-center mb-2">
                      <input
                        type="text"
                        value={specialty}
                        onChange={(e) => handleSpecialtyChange(index, e.target.value)}
                        className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                      <button
                        type="button"
                        onClick={() => removeSpecialty(index)}
                        className="ml-2 p-2 text-gray-400 hover:text-red-500"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div> */}
              </div>
            )}
          </div>
        ) : (
          <PostJob />
        )}
      </main>
    </div>
  );
};

export default CompanyProfile;