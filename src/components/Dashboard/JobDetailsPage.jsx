import { useState } from 'react';
import { Search, Filter, ChevronDown, ChevronUp, Briefcase, MapPin, Calendar, Clock, Users, MoreVertical, Star, Mail, Phone, Download, XCircle, CheckCircle, ArrowUpDown } from 'lucide-react';
import useFetchJobData from './useFetchJobData';
import JobApplicantsTable from './JobApplicantTable';
import { useParams } from 'react-router-dom';

export default function JobDetailsPage() {
  const [activeTab, setActiveTab] = useState('applicants');
  const {jobId} = useParams()
  console.log(jobId)
  
  const [selectedApplicants, setSelectedApplicants] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  // Mock data
  const jobDetails = {
    title: "Senior Frontend Developer",
    department: "Engineering",
    location: "San Francisco, CA",
    type: "Full-time",
    postedDate: "Apr 15, 2025",
    expiryDate: "May 15, 2025",
    applicants: 24,
    views: 453,
    salary: "$120,000 - $150,000",
    description: "We are looking for a Senior Frontend Developer who is proficient with React.js and modern frontend technologies to join our team. The ideal candidate should have at least 5 years of experience in frontend development.",
    requirements: [
      "5+ years experience with JavaScript/TypeScript and React",
      "Experience with modern CSS frameworks like Tailwind CSS",
      "Strong understanding of responsive design principles",
      "Familiarity with RESTful APIs and GraphQL",
      "Experience with state management solutions like Redux or Context API"
    ],
    responsibilities: [
      "Develop new user-facing features using React.js",
      "Build reusable components and frontend libraries",
      "Optimize components for maximum performance",
      "Collaborate with back-end developers and designers",
      "Maintain code quality, organization, and automatization"
    ]
  };

  // const applicants = [
  //   { id: 1, name: "Michael Johnson", rating: 4.5, status: "Reviewed", appliedDate: "Apr 20, 2025", experience: "7 years", skills: ["React", "TypeScript", "Tailwind CSS"], education: "MSc Computer Science, Stanford", email: "michael.j@example.com", phone: "+1 (555) 123-4567", location: "San Francisco, CA" },
  //   { id: 2, name: "Sarah Williams", rating: 4.8, status: "Interview", appliedDate: "Apr 19, 2025", experience: "6 years", skills: ["React", "Redux", "Node.js"], education: "BSc Computer Science, MIT", email: "sarah.w@example.com", phone: "+1 (555) 987-6543", location: "Oakland, CA" },
  //   { id: 3, name: "David Chen", rating: 4.2, status: "New", appliedDate: "Apr 22, 2025", experience: "5 years", skills: ["React", "JavaScript", "CSS3"], education: "BSc Software Engineering, Berkeley", email: "david.c@example.com", phone: "+1 (555) 234-5678", location: "San Jose, CA" },
  //   { id: 4, name: "Emily Garcia", rating: 4.7, status: "Shortlisted", appliedDate: "Apr 18, 2025", experience: "8 years", skills: ["React", "TypeScript", "GraphQL"], education: "MSc Web Development, Columbia", email: "emily.g@example.com", phone: "+1 (555) 345-6789", location: "San Francisco, CA" },
  //   { id: 5, name: "Robert Patel", rating: 3.9, status: "Rejected", appliedDate: "Apr 21, 2025", experience: "4 years", skills: ["Angular", "JavaScript", "CSS"], education: "BSc Computer Engineering, UCLA", email: "robert.p@example.com", phone: "+1 (555) 456-7890", location: "Palo Alto, CA" },
  // ];

  const { job, loading,applicants=[] } = useFetchJobData(jobId);

  console.log(job)
  
  // State declarations - MUST be at the top level and in the same order every render
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    experience: 'all',
    location: 'all',
    gender: 'all',
    score: 'all'
  });
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: 'ascending'
  });
  const [showSortMenu, setShowSortMenu] = useState(false);


  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
  
 

  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 mt-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Job not found state
  if (!job) {
    return (
      <div className="p-6 text-center mt-20 bg-white rounded-lg shadow-sm">
        <h3 className="text-xl text-gray-700 mb-4">Job not found</h3>
        <p className="text-gray-500 mb-6">The job you're looking for doesn't exist or has been removed.</p>
        <button
          onClick={() => navigate('/employer_dashboard')}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all shadow-md hover:shadow-lg"
        >
          Back to Dashboard
        </button>
      </div>
    );
  }

  // Calculate experience in years for each applicant
  const calculateExperience = (experiences) => {
    if (!experiences || experiences.length === 0) return 0;
    
    let totalExperience = 0;
    
    experiences.forEach(exp => {
      const startDate = new Date(exp.candidate_start_date);
      const endDate = new Date(exp.candidate_end_date);
      const diffTime = Math.abs(endDate - startDate);
      const diffYears = diffTime / (1000 * 60 * 60 * 24 * 365.25);
      totalExperience += diffYears;
    });
    
    return totalExperience;
  };

  // Function to check if applicant matches experience filter
  const matchesExperienceFilter = (applicant, filter) => {
    if (filter === 'all') return true;
    
    const experience = calculateExperience(applicant.experiences);
    
    switch (filter) {
      case '0-1':
        return experience >= 0 && experience <= 1;
      case '1-3':
        return experience > 1 && experience <= 3;
      case '3-5':
        return experience > 3 && experience <= 5;
      case '5+':
        return experience > 5;
      default:
        return true;
    }
  };

  // Function to check if applicant matches score filter
  const matchesScoreFilter = (applicant, filter) => {
    if (filter === 'all') return true;
    
    const score = parseInt(applicant.screening_score);
    
    switch (filter) {
      case '90+':
        return score >= 90;
      case '75-90':
        return score >= 75 && score < 90;
      case '50-75':
        return score >= 50 && score < 75;
      case '0-50':
        return score < 50;
      default:
        return true;
    }
  };

  // Function to get unique locations from applicants data
  const getUniqueLocations = () => {
    const locations = applicants?.map(applicant => applicant.candidate_location);
    return [...new Set(locations)].filter(Boolean);
  };

  // Function to sort applicants data
  const sortApplicants = (data) => {
    if (!sortConfig.key) return data;
    
    return [...data].sort((a, b) => {
      let aValue, bValue;
      
      switch (sortConfig.key) {
        case 'name':
          aValue = `${a.candidate_first_name} ${a.candidate_last_name}`.toLowerCase();
          bValue = `${b.candidate_first_name} ${b.candidate_last_name}`.toLowerCase();
          break;
        case 'role':
          aValue = a.candidate_current_role.toLowerCase();
          bValue = b.candidate_current_role.toLowerCase();
          break;
        case 'location':
          aValue = a.candidate_location.toLowerCase();
          bValue = b.candidate_location.toLowerCase();
          break;
        case 'score':
          aValue = parseInt(a.screening_score);
          bValue = parseInt(b.screening_score);
          break;
        default:
          return 0;
      }
      
      if (aValue < bValue) {
        return sortConfig.direction === 'ascending' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });
  };

  // Function to handle sorting
  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  // Filter and search applicants
  const filteredApplicants = Array.isArray(applicants) ? applicants.filter(applicant => {
    const fullName = `${applicant.candidate_first_name} ${applicant.candidate_last_name}`.toLowerCase();
    const role = (applicant.candidate_current_role || '').toLowerCase();
    const location = (applicant.candidate_location || '').toLowerCase();
    
    const matchesSearch = searchTerm === '' || 
      fullName.includes(searchTerm.toLowerCase()) ||
      role.includes(searchTerm.toLowerCase()) ||
      location.includes(searchTerm.toLowerCase());
    
    // Apply all filters
    const matchesFilters = 
      (selectedFilters.gender === 'all' || applicant.candidate_gender === selectedFilters.gender) &&
      (selectedFilters.location === 'all' || applicant.candidate_location.includes(selectedFilters.location)) &&
      matchesExperienceFilter(applicant, selectedFilters.experience) &&
      matchesScoreFilter(applicant, selectedFilters.score);
    
    return matchesSearch && matchesFilters;
  }) : [];

  // Apply sorting to filtered applicants
  const sortedApplicants = sortApplicants(filteredApplicants);

  // Handle export to CSV
  const exportToCSV = () => {
    const header = [
      'Full Name', 
      'College Name', 
      'Experience', 
      'Current Role', 
      'Location', 
      'Gender', 
      'Profile Score'
    ];
    
    const rows = sortedApplicants.map(applicant => [
      `${applicant.candidate_first_name} ${applicant.candidate_last_name}`,
      applicant.education && applicant.education.length > 0 
        ? applicant.education[0].candidate_institute 
        : "N/A",
      calculateExperience(applicant.experiences).toFixed(1) + " years",
      applicant.candidate_current_role || "N/A",
      applicant.candidate_location || "N/A",
      applicant.candidate_gender || "N/A",
      `${applicant.screening_score}%`
    ]);
    
    const csvContent = [
      header.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `applicants-${job.job_title}-${jobId}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };


  const sections = [
    { title: "Job Description", content: job?.job_description }
  ];

  // Add optional sections only if they exist
  if (job?.job_descriptions_new?.requirements) {
    sections.push({ title: "Requirements", content: job?.job_descriptions_new?.requirements });
  }

  if (job?.job_descriptions_new?.qualifications) {
    sections.push({ title: "Qualifications", content: job?.job_descriptions_new?.qualifications });
  }

  if (job?.job_descriptions_new?.benefits) {
    sections.push({ title: "Benefits", content: job?.job_descriptions_new?.benefits });
  }



  return (
    <div className="flex flex-col bg-gray-50 min-h-screen">
    

      {/* Main Content */}
      <main className=" mt-20 w-full mx-auto px-4 py-6 flex-grow">
        {/* Breadcrumb */}
        <div className="mb-6">
          <nav className="text-sm">
            <ol className="flex items-center space-x-2">
              <li><a href="#" className="text-indigo-600 hover:text-indigo-800">Dashboard</a></li>
              <li><span className="text-gray-500">/</span></li>
              <li><a href="#" className="text-indigo-600 hover:text-indigo-800">Jobs</a></li>
              <li><span className="text-gray-500">/</span></li>
              <li className="text-gray-500">{job?.job_title}</li>
            </ol>
          </nav>
        </div>

        {/* Job Details Card */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{job?.job_title}</h1>
                <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Briefcase size={16} className="mr-1" />
                    <span>{job?.department} • {job?.employment_type}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin size={16} className="mr-1" />
                    <span>{job?.job_location}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar size={16} className="mr-1" />
                    <span>Posted: {formatDate(job?.posted_at)}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock size={16} className="mr-1" />
                    <span>Expires: {job?.applicationdeadline }</span>
                  </div>
                  <div className="flex items-center">
                    <Users size={16} className="mr-1" />
                    <span>{job?.applicants_count} Applicants</span>
                  </div>
                </div>
              </div>
              {/* <div className="flex items-center space-x-2">
                <button className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">
                  Edit Job
                </button>
                <button className="p-2 text-gray-500 hover:text-gray-700">
                  <MoreVertical size={20} />
                </button>
              </div> */}
            </div>

            <div className="mt-6">
              <div className="flex border-b border-gray-200">
                <button 
                  className={`px-4 py-2 text-sm font-medium ${activeTab === 'overview' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
                  onClick={() => setActiveTab('overview')}
                >
                  Overview
                </button>
                <button 
                  className={`px-4 py-2 text-sm font-medium ${activeTab === 'applicants' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
                  onClick={() => setActiveTab('applicants')}
                >
                  Applicants ({jobDetails.applicants})
                </button>
                <button 
                  className={`px-4 py-2 text-sm font-medium ${activeTab === 'analytics' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
                  onClick={() => setActiveTab('analytics')}
                >
                  Analytics
                </button>
              </div>

              {activeTab === 'overview' && (
                <div className="mt-6">
                  {/* <div className="mb-6">
                    <h2 className="text-lg font-medium text-gray-900 mb-2">Job Description</h2>
                    <p className="text-gray-600">{job?.job_description}</p>
                  </div>  */}
                  
                  <div className="mb-6">
                    {/* <h2 className="text-lg font-medium text-gray-900 mb-2">Requirements</h2> */}
                    {/* <ul className="list-disc pl-5 text-gray-600">
                      {jobDetails.requirements.map((requirement, index) => (
                        <li key={index} className="mb-1">{requirement}</li>
                      ))}
                    </ul> */}
                     {sections.map((section, index) => {
                      // Split content by newlines to get paragraphs
                      const paragraphs = section?.content?.split('\n').filter(p => p.trim() !== '');

                      return (
                        <div key={index} className="space-y-4 mb-4">
                          <h3 className="text-lg font-semibold  ">{section.title}</h3>
                          {paragraphs?.map((paragraph, pIndex) => (
                            <p key={pIndex} className="text-gray-600 leading-relaxed">
                              {paragraph.trim()}
                            </p>
                          ))}
                        </div>
                      );
                    })}
                  </div>
                   <h3 className="text-lg font-semibold mt-4 mb-3">Required Skills</h3>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {job?.job_skills_required.map((skill, index) => (
                      <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                  
                  {/* <div>
                    <h2 className="text-lg font-medium text-gray-900 mb-2">Responsibilities</h2>
                    <ul className="list-disc pl-5 text-gray-600">
                      {jobDetails.responsibilities.map((responsibility, index) => (
                        <li key={index} className="mb-1">{responsibility}</li>
                      ))}
                    </ul>
                  </div> */}
                </div>
              )}

              {activeTab === 'applicants' && (
                <div className="mt-2">
        

<div id="applicant_table" className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-semibold text-gray-800">
            Applicants <span className="text-sm font-normal text-gray-500 ml-2">({sortedApplicants.length || 0})</span>
          </h3>
          
          <button
            onClick={exportToCSV}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center shadow-sm"
          >
            <Download className="mr-2 h-4 w-4" />
            Export to CSV
          </button>
        </div>
        
        {/* Search and Filter Bar */}
        <div className="mb-6 flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search by name, role, or location..."
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          {/* <div className="flex gap-2">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center"
            >
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </button>
            
            <button
              onClick={() => {
                // Reset filters logic
                setSelectedFilters({
                  experience: 'all',
                  location: 'all',
                  gender: 'all',
                  score: 'all'
                });
                setSearchTerm('');
                setSortConfig({ key: null, direction: 'ascending' });
              }}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Reset
            </button>
            
            <div className="relative">
              <button
                onClick={() => setShowSortMenu(!showSortMenu)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center"
              >
                <ArrowUpDown className="h-4 w-4 mr-2" />
                Sort
              </button>
              
              {showSortMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg overflow-hidden z-10 border border-gray-200">
                  <div className="py-1">
                    <button 
                      onClick={() => { handleSort('name'); setShowSortMenu(false); }}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Name {sortConfig.key === 'name' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
                    </button>
                    <button 
                      onClick={() => { handleSort('role'); setShowSortMenu(false); }}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Role {sortConfig.key === 'role' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
                    </button>
                    <button 
                      onClick={() => { handleSort('location'); setShowSortMenu(false); }}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Location {sortConfig.key === 'location' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
                    </button>
                    <button 
                      onClick={() => { handleSort('score'); setShowSortMenu(false); }}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Score {sortConfig.key === 'score' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div> */}
        </div>
        
        {/* Filter Panel - show when filters button is clicked */}
        {showFilters && (
          <div className="p-4 mb-6 bg-gray-50 rounded-lg border border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Experience</label>
                <select 
                  className="w-full border border-gray-300 rounded-md p-2"
                  value={selectedFilters.experience}
                  onChange={(e) => setSelectedFilters({...selectedFilters, experience: e.target.value})}
                >
                  <option value="all">All Experience</option>
                  <option value="0-1">0-1 year</option>
                  <option value="1-3">1-3 years</option>
                  <option value="3-5">3-5 years</option>
                  <option value="5+">5+ years</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <select 
                  className="w-full border border-gray-300 rounded-md p-2"
                  value={selectedFilters.location}
                  onChange={(e) => setSelectedFilters({...selectedFilters, location: e.target.value})}
                >
                  <option value="all">All Locations</option>
                  {getUniqueLocations().map((location, index) => (
                    <option key={index} value={location}>{location}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                <select 
                  className="w-full border border-gray-300 rounded-md p-2"
                  value={selectedFilters.gender}
                  onChange={(e) => setSelectedFilters({...selectedFilters, gender: e.target.value})}
                >
                  <option value="all">All Genders</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Profile Score</label>
                <select 
                  className="w-full border border-gray-300 rounded-md p-2"
                  value={selectedFilters.score}
                  onChange={(e) => setSelectedFilters({...selectedFilters, score: e.target.value})}
                >
                  <option value="all">All Scores</option>
                  <option value="90+">90% and above</option>
                  <option value="75-90">75% - 90%</option>
                  <option value="50-75">50% - 75%</option>
                  <option value="0-50">Below 50%</option>
                </select>
              </div>
            </div>
          </div>
        )}
        
        {/* Applicants Table with Shadow and Border */}
        <div className="overflow-hidden border border-gray-200 rounded-lg shadow-sm">
          <JobApplicantsTable applicants={sortedApplicants || []} />
        </div>
        
        {/* Pagination Controls */}
        <div className="mt-6 flex justify-between items-center">
          <div className="text-sm text-gray-500">
            Showing <span className="font-medium">{sortedApplicants.length || 0}</span> of <span className="font-medium">{applicants.length || 0}</span> applicants
          </div>
          
          <div className="flex justify-center space-x-1">
            <button className="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50" disabled>Previous</button>
            <button className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700">1</button>
            <button className="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-50">2</button>
            <button className="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-50">3</button>
            <button className="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-50">Next</button>
          </div>
        </div>
      </div>

             
                </div>
              )}

              {activeTab === 'analytics' && (
                <div className="mt-6">
                  <p className="text-gray-600">Analytics content would go here...</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function Bell(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
    </svg>
  );
}


// import { useState } from 'react';
// import { Search, Filter, ChevronDown, ChevronUp, Briefcase, MapPin, Calendar, Clock, Users, 
//   MoreVertical, Star, Mail, Phone, Download, XCircle, CheckCircle, User, Activity, Bookmark, Bell } from 'lucide-react';

// export default function JobDetailsPage() {
//   const [activeTab, setActiveTab] = useState('applicants');
//   const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'ascending' });
//   const [selectedApplicants, setSelectedApplicants] = useState([]);
//   const [selectAll, setSelectAll] = useState(false);
//   const [viewMode, setViewMode] = useState('table'); // 'table' or 'grid'
//   const [filterOpen, setFilterOpen] = useState(false);
//   const [statusFilter, setStatusFilter] = useState('all');
//   const [showApplicantDetails, setShowApplicantDetails] = useState(null);

//   // Mock data
//   const jobDetails = {
//     title: "Senior Frontend Developer",
//     department: "Engineering",
//     location: "San Francisco, CA",
//     type: "Full-time",
//     postedDate: "Apr 15, 2025",
//     expiryDate: "May 15, 2025",
//     applicants: 24,
//     views: 453,
//     salary: "$120,000 - $150,000",
//     description: "We are looking for a Senior Frontend Developer who is proficient with React.js and modern frontend technologies to join our team. The ideal candidate should have at least 5 years of experience in frontend development.",
//     requirements: [
//       "5+ years experience with JavaScript/TypeScript and React",
//       "Experience with modern CSS frameworks like Tailwind CSS",
//       "Strong understanding of responsive design principles",
//       "Familiarity with RESTful APIs and GraphQL",
//       "Experience with state management solutions like Redux or Context API"
//     ],
//     responsibilities: [
//       "Develop new user-facing features using React.js",
//       "Build reusable components and frontend libraries",
//       "Optimize components for maximum performance",
//       "Collaborate with back-end developers and designers",
//       "Maintain code quality, organization, and automatization"
//     ]
//   };

//   const applicants = [
//     { 
//       id: 1, 
//       name: "Michael Johnson", 
//       rating: 4.5, 
//       status: "Reviewed", 
//       appliedDate: "Apr 20, 2025", 
//       experience: "7 years", 
//       skills: ["React", "TypeScript", "Tailwind CSS"], 
//       education: "MSc Computer Science", 
//       college: "Stanford University",
//       email: "michael.j@example.com", 
//       phone: "+1 (555) 123-4567", 
//       location: "San Francisco, CA",
//       currentRole: "Frontend Lead",
//       gender: "Male",
//       profileScore: 92,
//       profileImage: "https://i.pravatar.cc/150?img=32",
//       resume: "michael_johnson_resume.pdf",
//       coverLetter: "I'm excited to apply for the Senior Frontend Developer position. With 7 years of experience in front-end development...",
//       about: "Passionate frontend developer with expertise in building scalable web applications using modern JavaScript frameworks."
//     },
//     { 
//       id: 2, 
//       name: "Sarah Williams", 
//       rating: 4.8, 
//       status: "Interview", 
//       appliedDate: "Apr 19, 2025", 
//       experience: "6 years", 
//       skills: ["React", "Redux", "Node.js"], 
//       education: "BSc Computer Science", 
//       college: "MIT",
//       email: "sarah.w@example.com", 
//       phone: "+1 (555) 987-6543", 
//       location: "Oakland, CA",
//       currentRole: "Senior Developer",
//       gender: "Female",
//       profileScore: 89,
//       profileImage: "https://i.pravatar.cc/150?img=5",
//       resume: "sarah_williams_resume.pdf",
//       coverLetter: "I believe my experience with React and Redux makes me an ideal candidate for this role...",
//       about: "Full-stack developer specializing in React and Node.js with a passion for clean code and user experience."
//     },
//     { 
//       id: 3, 
//       name: "David Chen", 
//       rating: 4.2, 
//       status: "New", 
//       appliedDate: "Apr 22, 2025", 
//       experience: "5 years", 
//       skills: ["React", "JavaScript", "CSS3"], 
//       education: "BSc Software Engineering", 
//       college: "UC Berkeley",
//       email: "david.c@example.com", 
//       phone: "+1 (555) 234-5678", 
//       location: "San Jose, CA",
//       currentRole: "Frontend Developer",
//       gender: "Male",
//       profileScore: 78,
//       profileImage: "https://i.pravatar.cc/150?img=11",
//       resume: "david_chen_resume.pdf",
//       coverLetter: "I'm interested in joining your team to help build innovative front-end solutions...",
//       about: "Frontend developer with 5 years of experience building responsive and accessible web applications."
//     },
//     { 
//       id: 4, 
//       name: "Emily Garcia", 
//       rating: 4.7, 
//       status: "Shortlisted", 
//       appliedDate: "Apr 18, 2025", 
//       experience: "8 years", 
//       skills: ["React", "TypeScript", "GraphQL"], 
//       education: "MSc Web Development", 
//       college: "Columbia University",
//       email: "emily.g@example.com", 
//       phone: "+1 (555) 345-6789", 
//       location: "San Francisco, CA",
//       currentRole: "Technical Lead",
//       gender: "Female",
//       profileScore: 95,
//       profileImage: "https://i.pravatar.cc/150?img=9",
//       resume: "emily_garcia_resume.pdf",
//       coverLetter: "With my background in leading frontend teams and expertise in React and GraphQL...",
//       about: "Technical lead with 8+ years of experience and a strong focus on building scalable frontend architectures."
//     },
//     { 
//       id: 5, 
//       name: "Robert Patel", 
//       rating: 3.9, 
//       status: "Rejected", 
//       appliedDate: "Apr 21, 2025", 
//       experience: "4 years", 
//       skills: ["Angular", "JavaScript", "CSS"], 
//       education: "BSc Computer Engineering", 
//       college: "UCLA",
//       email: "robert.p@example.com", 
//       phone: "+1 (555) 456-7890", 
//       location: "Palo Alto, CA",
//       currentRole: "UI Developer",
//       gender: "Male",
//       profileScore: 65,
//       profileImage: "https://i.pravatar.cc/150?img=15",
//       resume: "robert_patel_resume.pdf",
//       coverLetter: "Although my primary experience is with Angular, I'm eager to transition to React...",
//       about: "UI developer with a focus on creating beautiful and intuitive user interfaces."
//     },
//     { 
//       id: 6, 
//       name: "Jessica Taylor", 
//       rating: 4.6, 
//       status: "Shortlisted", 
//       appliedDate: "Apr 17, 2025", 
//       experience: "7 years", 
//       skills: ["React", "Vue", "UX Design"], 
//       education: "MFA Interactive Design", 
//       college: "RISD",
//       email: "jessica.t@example.com", 
//       phone: "+1 (555) 567-8901", 
//       location: "Mountain View, CA",
//       currentRole: "UX Engineer",
//       gender: "Female",
//       profileScore: 91,
//       profileImage: "https://i.pravatar.cc/150?img=20",
//       resume: "jessica_taylor_resume.pdf",
//       coverLetter: "My background in both UX design and frontend development gives me a unique perspective...",
//       about: "UX Engineer with 7 years of experience bridging the gap between design and development."
//     },
//   ];

//   // Sorting functionality
//   const requestSort = (key) => {
//     let direction = 'ascending';
//     if (sortConfig.key === key && sortConfig.direction === 'ascending') {
//       direction = 'descending';
//     }
//     setSortConfig({ key, direction });
//   };

//   // Filter applicants by status
//   const getFilteredApplicants = () => {
//     if (statusFilter === 'all') {
//       return applicants;
//     }
//     return applicants.filter(applicant => applicant.status === statusFilter);
//   };

//   const getSortedApplicants = () => {
//     const sortableApplicants = [...getFilteredApplicants()];
//     if (sortConfig.key) {
//       sortableApplicants.sort((a, b) => {
//         if (a[sortConfig.key] < b[sortConfig.key]) {
//           return sortConfig.direction === 'ascending' ? -1 : 1;
//         }
//         if (a[sortConfig.key] > b[sortConfig.key]) {
//           return sortConfig.direction === 'ascending' ? 1 : -1;
//         }
//         return 0;
//       });
//     }
//     return sortableApplicants;
//   };

//   // Handle checkbox selection
//   const handleSelectAll = () => {
//     setSelectAll(!selectAll);
//     if (!selectAll) {
//       setSelectedApplicants(applicants.map(applicant => applicant.id));
//     } else {
//       setSelectedApplicants([]);
//     }
//   };

//   const handleSelectApplicant = (id) => {
//     if (selectedApplicants.includes(id)) {
//       setSelectedApplicants(selectedApplicants.filter(applicantId => applicantId !== id));
//     } else {
//       setSelectedApplicants([...selectedApplicants, id]);
//     }
//   };

//   // Status badge colors
//   const getStatusColor = (status) => {
//     switch (status) {
//       case 'New':
//         return 'bg-blue-100 text-blue-800';
//       case 'Reviewed':
//         return 'bg-purple-100 text-purple-800';
//       case 'Shortlisted':
//         return 'bg-green-100 text-green-800';
//       case 'Interview':
//         return 'bg-yellow-100 text-yellow-800';
//       case 'Rejected':
//         return 'bg-red-100 text-red-800';
//       default:
//         return 'bg-gray-100 text-gray-800';
//     }
//   };

//   // Profile score color
//   const getScoreColor = (score) => {
//     if (score >= 90) return 'text-green-600';
//     if (score >= 75) return 'text-blue-600';
//     if (score >= 60) return 'text-yellow-600';
//     return 'text-red-600';
//   };

//   // Handle applicant status change
//   const handleStatusChange = (id, newStatus) => {
//     // In a real application, you would update the status in your database
//     console.log(`Changing applicant ${id} status to ${newStatus}`);
//   };

//   // Handle applicant details view
//   const viewApplicantDetails = (id) => {
//     setShowApplicantDetails(id);
//   };

//   // Handle download resume
//   const downloadResume = (fileName) => {
//     // In a real application, this would download the actual file
//     console.log(`Downloading resume: ${fileName}`);
//   };

//   return (
//     <div className="flex flex-col bg-gray-100 min-h-screen mt-16">
//       {/* Navigation Header */}
      

//       {/* Main Content */}
//       <main className="w-full flex-grow">
//         {/* Breadcrumb and Content Container */}
//         <div className="max-w-full px-6 py-6">
//           {/* Breadcrumb */}
//           <div className="mb-6">
//             <nav className="text-sm">
//               <ol className="flex items-center space-x-2">
//                 <li><a href="#" className="text-indigo-600 hover:text-indigo-800">Dashboard</a></li>
//                 <li><span className="text-gray-500">/</span></li>
//                 <li><a href="#" className="text-indigo-600 hover:text-indigo-800">Jobs</a></li>
//                 <li><span className="text-gray-500">/</span></li>
//                 <li className="text-gray-500">{jobDetails.title}</li>
//               </ol>
//             </nav>
//           </div>

//           {/* Job Stats Cards */}
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
//             <div className="bg-white rounded-lg shadow p-6">
//               <div className="flex items-center">
//                 <div className="p-3 rounded-full bg-blue-100 text-blue-600">
//                   <Users size={24} />
//                 </div>
//                 <div className="ml-4">
//                   <p className="text-sm font-medium text-gray-500">Total Applicants</p>
//                   <p className="text-2xl font-semibold text-gray-900">{jobDetails.applicants}</p>
//                 </div>
//               </div>
//             </div>
//             <div className="bg-white rounded-lg shadow p-6">
//               <div className="flex items-center">
//                 <div className="p-3 rounded-full bg-green-100 text-green-600">
//                   <CheckCircle size={24} />
//                 </div>
//                 <div className="ml-4">
//                   <p className="text-sm font-medium text-gray-500">Shortlisted</p>
//                   <p className="text-2xl font-semibold text-gray-900">
//                     {applicants.filter(a => a.status === 'Shortlisted').length}
//                   </p>
//                 </div>
//               </div>
//             </div>
//             <div className="bg-white rounded-lg shadow p-6">
//               <div className="flex items-center">
//                 <div className="p-3 rounded-full bg-yellow-100 text-yellow-600">
//                   <Activity size={24} />
//                 </div>
//                 <div className="ml-4">
//                   <p className="text-sm font-medium text-gray-500">In Interview</p>
//                   <p className="text-2xl font-semibold text-gray-900">
//                     {applicants.filter(a => a.status === 'Interview').length}
//                   </p>
//                 </div>
//               </div>
//             </div>
//             <div className="bg-white rounded-lg shadow p-6">
//               <div className="flex items-center">
//                 <div className="p-3 rounded-full bg-red-100 text-red-600">
//                   <XCircle size={24} />
//                 </div>
//                 <div className="ml-4">
//                   <p className="text-sm font-medium text-gray-500">Rejected</p>
//                   <p className="text-2xl font-semibold text-gray-900">
//                     {applicants.filter(a => a.status === 'Rejected').length}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Job Details Card */}
//           <div className="bg-white rounded-lg shadow-md mb-6">
//             <div className="p-6">
//               <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
//                 <div>
//                   <h1 className="text-2xl font-bold text-gray-900">{jobDetails.title}</h1>
//                   <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-gray-600">
//                     <div className="flex items-center">
//                       <Briefcase size={16} className="mr-1" />
//                       <span>{jobDetails.department} • {jobDetails.type}</span>
//                     </div>
//                     <div className="flex items-center">
//                       <MapPin size={16} className="mr-1" />
//                       <span>{jobDetails.location}</span>
//                     </div>
//                     <div className="flex items-center">
//                       <Calendar size={16} className="mr-1" />
//                       <span>Posted: {jobDetails.postedDate}</span>
//                     </div>
//                     <div className="flex items-center">
//                       <Clock size={16} className="mr-1" />
//                       <span>Expires: {jobDetails.expiryDate}</span>
//                     </div>
//                     <div className="flex items-center">
//                       <Users size={16} className="mr-1" />
//                       <span>{jobDetails.applicants} Applicants</span>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="flex items-center space-x-2 mt-4 md:mt-0">
//                   <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition shadow-sm">
//                     Edit Job
//                   </button>
//                   <button className="p-2 text-gray-500 hover:text-gray-700">
//                     <MoreVertical size={20} />
//                   </button>
//                 </div>
//               </div>

//               <div className="mt-6">
//                 <div className="flex border-b border-gray-200 overflow-x-auto">
//                   <button 
//                     className={`px-4 py-2 text-sm font-medium ${activeTab === 'overview' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
//                     onClick={() => setActiveTab('overview')}
//                   >
//                     Overview
//                   </button>
//                   <button 
//                     className={`px-4 py-2 text-sm font-medium ${activeTab === 'applicants' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
//                     onClick={() => setActiveTab('applicants')}
//                   >
//                     Applicants ({jobDetails.applicants})
//                   </button>
//                   <button 
//                     className={`px-4 py-2 text-sm font-medium ${activeTab === 'analytics' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
//                     onClick={() => setActiveTab('analytics')}
//                   >
//                     Analytics
//                   </button>
//                   <button 
//                     className={`px-4 py-2 text-sm font-medium ${activeTab === 'settings' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
//                     onClick={() => setActiveTab('settings')}
//                   >
//                     Settings
//                   </button>
//                 </div>

//                 {activeTab === 'overview' && (
//                   <div className="mt-6">
//                     {/* Top Stats */}
//                     <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
//                       <div className="p-4 border border-gray-200 rounded-lg">
//                         <h3 className="text-lg font-medium text-gray-700">Job Salary</h3>
//                         <p className="text-2xl font-bold text-indigo-600 mt-2">{jobDetails.salary}</p>
//                       </div>
//                       <div className="p-4 border border-gray-200 rounded-lg">
//                         <h3 className="text-lg font-medium text-gray-700">Job Views</h3>
//                         <p className="text-2xl font-bold text-indigo-600 mt-2">{jobDetails.views}</p>
//                       </div>
//                       <div className="p-4 border border-gray-200 rounded-lg">
//                         <h3 className="text-lg font-medium text-gray-700">Application Rate</h3>
//                         <p className="text-2xl font-bold text-indigo-600 mt-2">{Math.round((jobDetails.applicants / jobDetails.views) * 100)}%</p>
//                       </div>
//                     </div>
                    
//                     <div className="mb-6">
//                       <h2 className="text-lg font-medium text-gray-900 mb-3">Job Description</h2>
//                       <p className="text-gray-600 leading-relaxed">{jobDetails.description}</p>
//                     </div>
                    
//                     <div className="mb-6">
//                       <h2 className="text-lg font-medium text-gray-900 mb-3">Requirements</h2>
//                       <ul className="list-disc pl-5 text-gray-600 space-y-2">
//                         {jobDetails.requirements.map((requirement, index) => (
//                           <li key={index} className="leading-relaxed">{requirement}</li>
//                         ))}
//                       </ul>
//                     </div>
                    
//                     <div>
//                       <h2 className="text-lg font-medium text-gray-900 mb-3">Responsibilities</h2>
//                       <ul className="list-disc pl-5 text-gray-600 space-y-2">
//                         {jobDetails.responsibilities.map((responsibility, index) => (
//                           <li key={index} className="leading-relaxed">{responsibility}</li>
//                         ))}
//                       </ul>
//                     </div>
//                   </div>
//                 )}

//                 {activeTab === 'applicants' && (
//                   <div className="mt-6">
//                     {/* Applicant Filters and Actions */}
//                     <div className="flex flex-wrap justify-between items-center mb-6">
//                       <div className="flex flex-wrap items-center gap-3">
//                         <div className="relative">
//                           <input
//                             type="text"
//                             placeholder="Search applicants..."
//                             className="pl-9 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 w-full md:w-64"
//                           />
//                           <Search size={18} className="absolute left-3 top-2.5 text-gray-400" />
//                         </div>
//                         <button 
//                           className="flex items-center px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
//                           onClick={() => setFilterOpen(!filterOpen)}
//                         >
//                           <Filter size={16} className="mr-1" />
//                           <span>Filter</span>
//                         </button>
//                         <div className="flex items-center space-x-1 ml-1">
//                           <button 
//                             className={`p-2 ${viewMode === 'table' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-400'} rounded`}
//                             onClick={() => setViewMode('table')}
//                             title="Table View"
//                           >
//                             <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                               <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
//                               <line x1="3" y1="9" x2="21" y2="9"></line>
//                               <line x1="3" y1="15" x2="21" y2="15"></line>
//                               <line x1="9" y1="3" x2="9" y2="21"></line>
//                               <line x1="15" y1="3" x2="15" y2="21"></line>
//                             </svg>
//                           </button>
//                           <button 
//                             className={`p-2 ${viewMode === 'grid' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-400'} rounded`}
//                             onClick={() => setViewMode('grid')}
//                             title="Grid View"
//                           >
//                             <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                               <rect x="3" y="3" width="7" height="7"></rect>
//                               <rect x="14" y="3" width="7" height="7"></rect>
//                               <rect x="14" y="14" width="7" height="7"></rect>
//                               <rect x="3" y="14" width="7" height="7"></rect>
//                             </svg>
//                           </button>
//                         </div>
//                       </div>
//                       <div className="flex items-center space-x-2 mt-3 md:mt-0">
//                         <span className="text-sm text-gray-500">
//                           {selectedApplicants.length} selected
//                         </span>
//                         <div className="relative">
//                           <button className="px-3 py-2 bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 flex items-center">
//                             Bulk Actions <ChevronDown size={16} className="ml-1" />
//                           </button>
//                           {/* Dropdown menu would go here */}
//                         </div>
//                       </div>
//                     </div>

//                     {/* Status Filter */}
//                     {filterOpen && (
//                       <div className="bg-gray-50 p-4 rounded-md border border-gray-200 mb-6">
//                         <h3 className="font-medium text-gray-700 mb-3">Filter by Status</h3>
//                         <div className="flex gap-2 flex-wrap">
//                           <button 
//                             className={`px-3 py-1 rounded-md text-sm ${statusFilter === 'all' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700 border border-gray-300'}`}
//                             onClick={() => setStatusFilter('all')}
//                           >
//                             All
//                           </button>
//                           <button 
//                             className={`px-3 py-1 rounded-md text-sm ${statusFilter === 'New' ? 'bg-blue-600 text-white' : 'bg-blue-50 text-blue-700 border border-blue-200'}`}
//                             onClick={() => setStatusFilter('New')}
//                           >
//                             New
//                           </button>
//                           <button 
//                             className={`px-3 py-1 rounded-md text-sm ${statusFilter === 'Reviewed' ? 'bg-purple-600 text-white' : 'bg-purple-50 text-purple-700 border border-purple-200'}`}
//                             onClick={() => setStatusFilter('Reviewed')}
//                           >
//                             Reviewed
//                           </button>
//                           <button 
//                             className={`px-3 py-1 rounded-md text-sm ${statusFilter === 'Shortlisted' ? 'bg-green-600 text-white' : 'bg-green-50 text-green-700 border border-green-200'}`}
//                             onClick={() => setStatusFilter('Shortlisted')}
//                           >
//                             Shortlisted
//                           </button>
//                           <button 
//                             className={`px-3 py-1 rounded-md text-sm ${statusFilter === 'Interview' ? 'bg-yellow-600 text-white' : 'bg-yellow-50 text-yellow-700 border border-yellow-200'}`}
//                             onClick={() => setStatusFilter('Interview')}
//                           >
//                             Interview
//                           </button>
//                           <button 
//                             className={`px-3 py-1 rounded-md text-sm ${statusFilter === 'Rejected' ? 'bg-red-600 text-white' : 'bg-red-50 text-red-700 border border-red-200'}`}
//                             onClick={() => setStatusFilter('Rejected')}
//                           >
//                             Rejected
//                           </button>
//                         </div>
//                       </div>
//                     )}

//                     {viewMode === 'table' ? (
//                       /* Applicants Table */
//                       <div className="overflow-x-auto">
//                         <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow">
//                           <thead>
//                             <tr className="bg-gray-50">
//                               <th className="w-12 px-4 py-3 text-left">
//                                 <input
//                                   type="checkbox"
//                                   className="h-4 w-4 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500"
//                                   checked={selectAll}
//                                   onChange={handleSelectAll}
//                                 />
//                               </th>
//                               <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                                 <button 
//                                   className="flex items-center text-xs font-medium text-gray-500 uppercase tracking-wider"
//                                   onClick={() => requestSort('name')}
//                                 >
//                                   Applicant
//                                   {sortConfig.key === 'name' && (
//                                     sortConfig.direction === 'ascending' ? 
//                                     <ChevronUp size={14} className="ml-1" /> : 
//                                     <ChevronDown size={14} className="ml-1" />
//                                   )}
//                                 </button>
//                               </th>
//                               <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                                 <button 
//                                   className="flex items-center text-xs font-medium text-gray-500 uppercase tracking-wider"
//                                   onClick={() => requestSort('rating')}
//                                 >
//                                   Rating
//                                   {sortConfig.key === 'rating' && (
//                                     sortConfig.direction === 'ascending' ? 
//                                     <ChevronUp size={14} className="ml-1" /> : 
//                                     <ChevronDown size={14} className="ml-1" />
//                                   )}
//                                 </button>
//                               </th>
//                               <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
//                               <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                                 <button 
//                                   className="flex items-center text-xs font-medium text-gray-500 uppercase tracking-wider"
//                                   onClick={() => requestSort('appliedDate')}
//                                 >
//                                   Applied Date
//                                   {sortConfig.key === 'appliedDate' && (
//                                     sortConfig.direction === 'ascending' ? 
//                                     <ChevronUp size={14} className="ml-1" /> : 
//                                     <ChevronDown size={14} className="ml-1" />
//                                   )}
//                                 </button>
//                               </th>
//                               <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Skills</th>
//                               <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//                             </tr>
//                           </thead>
//                           <tbody className="divide-y divide-gray-200">
//                             {getSortedApplicants().map((applicant) => (
//                               <tr 
//                                 key={applicant.id} 
//                                 className="hover:bg-gray-50"
//                                 onClick={() => viewApplicantDetails(applicant.id)}
//                               >
//                                 <td className="px-4 py-4 whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
//                                   <input
//                                     type="checkbox"
//                                     className="h-4 w-4 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500"
//                                     checked={selectedApplicants.includes(applicant.id)}
//                                     onChange={() => handleSelectApplicant(applicant.id)}
//                                   />
//                                 </td>
//                                 <td className="px-4 py-4 whitespace-nowrap">
//                                   <div className="flex items-center">
//                                     <div className="h-10 w-10 flex-shrink-0">
//                                       <img className="h-10 w-10 rounded-full" src={applicant.profileImage} alt="" />
//                                     </div>
//                                     <div className="ml-4">
//                                       <div className="font-medium text-gray-900">{applicant.name}</div>
//                                       <div className="text-sm text-gray-500">{applicant.currentRole}</div>
//                                     </div>
//                                   </div>
//                                 </td>
//                                 <td className="px-4 py-4 whitespace-nowrap">
//                                   <div className="flex items-center">
//                                     <Star size={16} className="text-yellow-400 fill-current" />
//                                     <span className="ml-1 text-gray-900">{applicant.rating}</span>
//                                   </div>
//                                 </td>
//                                 <td className="px-4 py-4 whitespace-nowrap">
//                                   <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(applicant.status)}`}>
//                                     {applicant.status}
//                                   </span>
//                                 </td>
//                                 <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
//                                   {applicant.appliedDate}
//                                 </td>
//                                 <td className="px-4 py-4 whitespace-nowrap">
//                                   <div className="flex flex-wrap gap-1">
//                                     {applicant.skills.slice(0, 2).map((skill, index) => (
//                                       <span key={index} className="px-2 py-1 text-xs bg-gray-100 text-gray-800 rounded">
//                                         {skill}
//                                       </span>
//                                     ))}
//                                     {applicant.skills.length > 2 && (
//                                       <span className="px-2 py-1 text-xs bg-gray-100 text-gray-800 rounded">
//                                         +{applicant.skills.length - 2}
//                                       </span>
//                                     )}
//                                   </div>
//                                 </td>
//                                 <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
//                                   <div className="flex justify-end space-x-2">
//                                     <button className="p-1 text-indigo-600 hover:text-indigo-900" onClick={(e) => {
//                                       e.stopPropagation();
//                                       downloadResume(applicant.resume);
//                                     }}>
//                                       <Download size={18} />
//                                     </button>
//                                     <div className="relative" onClick={(e) => e.stopPropagation()}>
//                                       <button className="p-1 text-gray-500 hover:text-gray-700">
//                                         <MoreVertical size={18} />
//                                       </button>
//                                       {/* Dropdown menu would go here */}
//                                     </div>
//                                   </div>
//                                 </td>
//                               </tr>
//                             ))}
//                           </tbody>
//                         </table>
//                       </div>
//                     ) : (
//                       /* Applicants Grid View */
//                       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//                         {getSortedApplicants().map((applicant) => (
//                           <div 
//                             key={applicant.id} 
//                             className="bg-white border border-gray-200 rounded-lg shadow p-4 hover:shadow-md transition-shadow cursor-pointer"
//                             onClick={() => viewApplicantDetails(applicant.id)}
//                           >
//                             <div className="flex items-start justify-between">
//                               <div className="flex items-center">
//                                 <div className="flex-shrink-0">
//                                   <img className="h-12 w-12 rounded-full" src={applicant.profileImage} alt="" />
//                                 </div>
//                                 <div className="ml-3">
//                                   <h3 className="font-medium text-gray-900">{applicant.name}</h3>
//                                   <p className="text-sm text-gray-500">{applicant.currentRole}</p>
//                                 </div>
//                               </div>
//                               <div className="flex items-center">
//                                 <input
//                                   type="checkbox"
//                                   className="h-4 w-4 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500"
//                                   checked={selectedApplicants.includes(applicant.id)}
//                                   onChange={(e) => {
//                                     e.stopPropagation();
//                                     handleSelectApplicant(applicant.id);
//                                   }}
//                                   onClick={(e) => e.stopPropagation()}
//                                 />
//                                 <button className="ml-2 p-1 text-gray-500 hover:text-gray-700" onClick={(e) => e.stopPropagation()}>
//                                   <MoreVertical size={16} />
//                                 </button>
//                               </div>
//                             </div>
//                             <div className="mt-3">
//                               <div className="flex items-center justify-between text-sm">
//                                 <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(applicant.status)}`}>
//                                   {applicant.status}
//                                 </span>
//                                 <div className="flex items-center">
//                                   <Star size={16} className="text-yellow-400 fill-current" />
//                                   <span className="ml-1 text-gray-900">{applicant.rating}</span>
//                                 </div>
//                               </div>
//                               <div className="mt-2">
//                                 <div className="flex justify-between text-sm text-gray-500">
//                                   <div className="flex items-center">
//                                     <Calendar size={14} className="mr-1" />
//                                     <span>{applicant.appliedDate}</span>
//                                   </div>
//                                   <div className="flex items-center">
//                                     <Briefcase size={14} className="mr-1" />
//                                     <span>{applicant.experience}</span>
//                                   </div>
//                                 </div>
//                               </div>
//                               <div className="mt-3">
//                                 <p className="text-xs text-gray-600 mb-1">Skills:</p>
//                                 <div className="flex flex-wrap gap-1">
//                                   {applicant.skills.map((skill, index) => (
//                                     <span key={index} className="px-2 py-1 text-xs bg-gray-100 text-gray-800 rounded">
//                                       {skill}
//                                     </span>
//                                   ))}
//                                 </div>
//                               </div>
//                               <div className="mt-3 flex justify-between">
//                                 <div className={`flex items-center ${getScoreColor(applicant.profileScore)}`}>
//                                   <Activity size={14} className="mr-1" />
//                                   <span>Score: {applicant.profileScore}%</span>
//                                 </div>
//                                 <div className="flex space-x-2">
//                                   <button 
//                                     className="p-1 text-indigo-600 hover:text-indigo-900"
//                                     onClick={(e) => {
//                                       e.stopPropagation();
//                                       downloadResume(applicant.resume);
//                                     }}
//                                   >
//                                     <Download size={16} />
//                                   </button>
//                                 </div>
//                               </div>
//                             </div>
//                           </div>
//                         ))}
//                       </div>
//                     )}

//                     {/* Pagination */}
//                     <div className="flex items-center justify-between mt-6">
//                       <div className="text-sm text-gray-500">
//                         Showing <span className="font-medium">{Math.min(1, getSortedApplicants().length)}</span> to <span className="font-medium">{getSortedApplicants().length}</span> of <span className="font-medium">{applicants.length}</span> results
//                       </div>
//                       <div className="flex items-center space-x-2">
//                         <button className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50" disabled>
//                           Previous
//                         </button>
//                         <button className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50" disabled>
//                           Next
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 )}

//                 {activeTab === 'analytics' && (
//                   <div className="mt-6">
//                     <div className="bg-gray-50 p-8 rounded-lg border border-gray-200 text-center">
//                       <div className="flex justify-center">
//                         <Activity size={48} className="text-gray-400" />
//                       </div>
//                       <h3 className="text-lg font-medium text-gray-700 mt-4">Analytics Dashboard</h3>
//                       <p className="text-gray-500 mt-2">Detailed analytics for this job posting are available in the Analytics section.</p>
//                     </div>
//                   </div>
//                 )}

//                 {activeTab === 'settings' && (
//                   <div className="mt-6">
//                     <div className="bg-gray-50 p-8 rounded-lg border border-gray-200 text-center">
//                       <div className="flex justify-center">
//                         <User size={48} className="text-gray-400" />
//                       </div>
//                       <h3 className="text-lg font-medium text-gray-700 mt-4">Job Settings</h3>
//                       <p className="text-gray-500 mt-2">Configure job settings, notifications, and permissions here.</p>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </main>

//       {/* Applicant Details Drawer/Modal */}
//       {showApplicantDetails && (
//         <div className="fixed inset-0 z-20 overflow-y-auto mt-20">
//           <div className="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
//             <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" onClick={() => setShowApplicantDetails(null)}></div>
//             <span className="hidden sm:inline-block sm:h-screen sm:align-middle">&#8203;</span>
//             <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
//               {(() => {
//                 const applicant = applicants.find(a => a.id === showApplicantDetails);
//                 return (
//                   <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
//                     <div className="absolute top-0 right-0 pt-4 pr-4">
//                       <button
//                         type="button"
//                         className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
//                         onClick={() => setShowApplicantDetails(null)}
//                       >
//                         <span className="sr-only">Close</span>
//                         <XCircle size={20} />
//                       </button>
//                     </div>
//                     <div className="sm:flex sm:items-start">
//                       <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
//                         <div className="flex flex-col md:flex-row md:items-center md:justify-between">
//                           <div className="flex items-center">
//                             <img className="h-16 w-16 rounded-full" src={applicant.profileImage} alt="" />
//                             <div className="ml-4">
//                               <h3 className="text-xl font-bold text-gray-900">{applicant.name}</h3>
//                               <p className="text-lg text-gray-600">{applicant.currentRole}</p>
//                             </div>
//                           </div>
//                           <div className="mt-4 md:mt-0 flex items-center space-x-2">
//                             <span className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(applicant.status)}`}>
//                               {applicant.status}
//                             </span>
//                             <div className="relative">
//                               <button className="px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center">
//                                 Change Status <ChevronDown size={16} className="ml-1" />
//                               </button>
//                               {/* Status dropdown would go here */}
//                             </div>
//                           </div>
//                         </div>
                        
//                         <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
//                           <div className="col-span-2">
//                             <div className="bg-white p-4 rounded-lg border border-gray-200 mb-6">
//                               <h4 className="text-lg font-medium text-gray-700 mb-2">Applicant Profile</h4>
//                               <div className="space-y-4">
//                                 <div>
//                                   <h5 className="text-sm font-medium text-gray-500">About</h5>
//                                   <p className="mt-1 text-gray-800">{applicant.about}</p>
//                                 </div>
//                                 <div>
//                                   <h5 className="text-sm font-medium text-gray-500">Cover Letter</h5>
//                                   <p className="mt-1 text-gray-800">{applicant.coverLetter}</p>
//                                 </div>
//                                 <div>
//                                   <h5 className="text-sm font-medium text-gray-500">Skills</h5>
//                                   <div className="mt-1 flex flex-wrap gap-2">
//                                     {applicant.skills.map((skill, index) => (
//                                       <span key={index} className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">
//                                         {skill}
//                                       </span>
//                                     ))}
//                                   </div>
//                                 </div>
//                               </div>
//                             </div>
                            
//                             <div className="bg-white p-4 rounded-lg border border-gray-200">
//                               <h4 className="text-lg font-medium text-gray-700 mb-2">Application Timeline</h4>
//                               <div className="relative pl-8 space-y-6">
//                                 <div className="relative">
//                                   <div className="absolute -left-8 mt-1.5 h-4 w-4 rounded-full border-2 border-indigo-600 bg-white"></div>
//                                   <div className="absolute -left-6 mt-3 h-full w-0.5 bg-gray-300"></div>
//                                   <h5 className="text-sm font-medium text-gray-900">Application Received</h5>
//                                   <p className="text-xs text-gray-500 mt-1">{applicant.appliedDate}</p>
//                                 </div>
                                
//                                 {applicant.status !== 'New' && (
//                                   <div className="relative">
//                                     <div className="absolute -left-8 mt-1.5 h-4 w-4 rounded-full border-2 border-indigo-600 bg-white"></div>
//                                     <div className="absolute -left-6 mt-3 h-full w-0.5 bg-gray-300"></div>
//                                     <h5 className="text-sm font-medium text-gray-900">Application Reviewed</h5>
//                                     <p className="text-xs text-gray-500 mt-1">Apr 23, 2025</p>
//                                   </div>
//                                 )}
                                
//                                 {(applicant.status === 'Shortlisted' || applicant.status === 'Interview' || applicant.status === 'Rejected') && (
//                                   <div className="relative">
//                                     <div className="absolute -left-8 mt-1.5 h-4 w-4 rounded-full border-2 border-indigo-600 bg-white"></div>
//                                     <div className="absolute -left-6 mt-3 h-full w-0.5 bg-gray-300"></div>
//                                     <h5 className="text-sm font-medium text-gray-900">Shortlisted for Interview</h5>
//                                     <p className="text-xs text-gray-500 mt-1">Apr 25, 2025</p>
//                                   </div>
//                                 )}
                                
//                                 {(applicant.status === 'Interview' || applicant.status === 'Rejected') && (
//                                   <div className="relative">
//                                     <div className="absolute -left-8 mt-1.5 h-4 w-4 rounded-full border-2 border-indigo-600 bg-white"></div>
//                                     <div className="absolute -left-6 mt-3 h-full w-0.5 bg-gray-300"></div>
//                                     <h5 className="text-sm font-medium text-gray-900">Interview Scheduled</h5>
//                                     <p className="text-xs text-gray-500 mt-1">Apr 28, 2025</p>
//                                   </div>
//                                 )}
                                
//                                 {applicant.status === 'Rejected' && (
//                                   <div className="relative">
//                                     <div className="absolute -left-8 mt-1.5 h-4 w-4 rounded-full border-2 border-red-600 bg-white"></div>
//                                     <h5 className="text-sm font-medium text-gray-900">Application Rejected</h5>
//                                     <p className="text-xs text-gray-500 mt-1">Apr 30, 2025</p>
//                                   </div>
//                                 )}
//                               </div>
//                             </div>
//                           </div>
                          
//                           <div className="col-span-1">
//                             <div className="bg-white p-4 rounded-lg border border-gray-200 mb-6">
//                               <h4 className="text-lg font-medium text-gray-700 mb-2">Contact Information</h4>
//                               <div className="space-y-4">
//                                 <div className="flex items-center">
//                                   <Mail size={16} className="text-gray-500 mr-2" />
//                                   <span className="text-gray-800">{applicant.email}</span>
//                                 </div>
//                                 <div className="flex items-center">
//                                   <Phone size={16} className="text-gray-500 mr-2" />
//                                   <span className="text-gray-800">{applicant.phone}</span>
//                                 </div>
//                                 <div className="flex items-center">
//                                   <MapPin size={16} className="text-gray-500 mr-2" />
//                                   <span className="text-gray-800">{applicant.location}</span>
//                                 </div>
//                               </div>
//                             </div>
                            
//                             <div className="bg-white p-4 rounded-lg border border-gray-200 mb-6">
//                               <h4 className="text-lg font-medium text-gray-700 mb-2">Education</h4>
//                               <div className="space-y-2">
//                                 <p className="text-gray-800 font-medium">{applicant.education}</p>
//                                 <p className="text-gray-600">{applicant.college}</p>
//                               </div>
//                             </div>
                            
//                             <div className="bg-white p-4 rounded-lg border border-gray-200 mb-6">
//                               <h4 className="text-lg font-medium text-gray-700 mb-2">Profile Score</h4>
//                               <div className="flex items-center mt-2">
//                                 <div className="w-full bg-gray-200 rounded-full h-2.5">
//                                   <div 
//                                     className={`h-2.5 rounded-full ${
//                                       applicant.profileScore >= 90 ? 'bg-green-600' : 
//                                       applicant.profileScore >= 75 ? 'bg-blue-600' : 
//                                       applicant.profileScore >= 60 ? 'bg-yellow-600' : 'bg-red-600'
//                                     }`} 
//                                     style={{ width: `${applicant.profileScore}%` }}
//                                   ></div>
//                                 </div>
//                                 <span className={`ml-2 font-bold ${getScoreColor(applicant.profileScore)}`}>{applicant.profileScore}%</span>
//                               </div>
//                             </div>
                            
//                             <div className="bg-white p-4 rounded-lg border border-gray-200">
//                               <h4 className="text-lg font-medium text-gray-700 mb-2">Documents</h4>
//                               <div className="space-y-3">
//                                 <button 
//                                   className="w-full flex items-center justify-between p-3 border border-gray-300 rounded-md hover:bg-gray-50"
//                                   onClick={() => downloadResume(applicant.resume)}
//                                 >
//                                   <div className="flex items-center">
//                                     <div className="p-2 bg-gray-100 rounded">
//                                       <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-600">
//                                         <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
//                                         <polyline points="14 2 14 8 20 8"></polyline>
//                                         <line x1="16" y1="13" x2="8" y2="13"></line>
//                                         <line x1="16" y1="17" x2="8" y2="17"></line>
//                                         <polyline points="10 9 9 9 8 9"></polyline>
//                                       </svg>
//                                     </div>
//                                     <div className="ml-3">
//                                       <p className="text-sm font-medium text-gray-900">Resume</p>
//                                       <p className="text-xs text-gray-500">PDF, 2.3 MB</p>
//                                     </div>
//                                   </div>
//                                   <Download size={16} className="text-gray-500" />
//                                 </button>
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                     <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
//                       <button 
//                         type="button"
//                         className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
//                         onClick={() => setShowApplicantDetails(null)}
//                       >
//                         Close
//                       </button>
//                     </div>
//                   </div>
//                 );
//               })()}
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }