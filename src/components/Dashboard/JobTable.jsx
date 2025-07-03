import { useEffect, useState, useRef } from 'react';
import {
  MoreVertical,
  Share2,
  Edit,
  Trash2,
  Eye,
  Copy,
  Download,
  MessageSquare,
  Calendar,
  Mail,
  Phone,
  Clock,
  Filter,
  ChevronLeft,
  ChevronRight,
  Check,
  X,
  Search,
  ArrowUpDown,
  Star,
  PlusCircle,
  Users,
  Bell,
  Menu,
  BarChart2,
  Settings,
  FileText,
  MapPin,
  BriefcaseBusiness
} from 'lucide-react';
import { BASEURL } from '../../utility/config';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export function JobTable() {
  const navigate = useNavigate();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [jobs, setJobs] = useState([]);


  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState('posted');
  const [sortDirection, setSortDirection] = useState('desc');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const employerProfile = useSelector((state) => state.employer.employerProfile);
  const employerId = employerProfile?.employer_id;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  const itemsPerPage = 5;

  // Sort and filter jobs
  const filteredJobs = jobs.filter(job => {
    // Filter by search term
    const matchesSearch =
    job?.job_title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job?.department?.toLowerCase().includes(searchTerm.toLowerCase());
    // job?.job_location.toLowerCase().includes(searchTerm.toLowerCase());

    // Filter by status
     const matchesStatus = 
    statusFilter === 'All' || 
    (statusFilter === 'Active' && job.status) || 
    (statusFilter === 'Paused' && !job.status);

    return matchesSearch && matchesStatus;
  }).sort((a, b) => {
    // Sort by the selected field
    if (a[sortField] < b[sortField]) {
      return sortDirection === 'asc' ? -1 : 1;
    }
    if (a[sortField] > b[sortField]) {
      return sortDirection === 'asc' ? 1 : -1;
    }
    return 0;
  });



  // Paginate jobs
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredJobs.length / itemsPerPage);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };


  const handleDeleteJob = async (jobId) => {
    setIsLoading(true);
    try {
      const response = await axios.delete(`${BASEURL}/jobs_post/job_delete/${jobId}`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      if (response.status === 200) {
        // Success - refresh the job list
        toast.success('Job deleted successfully!');
        onRefresh();
      } else {
        throw new Error(response.data.error || 'Failed to delete job');
      }
    } catch (error) {
      alert(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
      setShowConfirmation(false);
    }
  };

  const onRefresh = () => {
    fetchJobs();
  }
 

  // Calculate job activity by dividing applicants by views and multiplying by 100
  const calculateActivity = (applicants, views) => {
    return views > 0 ? (applicants / views) * 100 : 0;
  };




  const fetchJobs = async () => {
    if (!employerId) return; // Prevent API call if employerId is undefined

    setLoading(true);
    try {
      console.log("Api calling")
      const response = await axios.get(`${BASEURL}/jobs_post/employer_jobs/${employerId}`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      console.log("APi called")
      // console.log(response)

      if (response.status === 200) {
        console.log(response.data?.data);
        setJobs(response.data?.data);
      } else {
        throw new Error(response.data.error || 'Failed to fetch jobs');
      }
    } catch (error) {
      console.log(error)
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [])


   const handleShareJob = (job) => {
    console.log('Share job:', job.job_id);
    // You can implement a sharing modal here
    const jobUrl = `https://jobs.aurjobs.com/jobs/${createSlug(job?.job_title)}/${job?.job_id}`;
    const shareData = {
      title: job.job_title,
      text: `Check out this job opportunity: ${job.job_title} at ${job.department}`,
      url: jobUrl
    };

    if (navigator.share) {
      navigator.share(shareData);
    } else {
      // Fallback - copy to clipboard or show sharing modal
      handleCopyJobLink(job);
    }
  };

  const createSlug = (text) => {
    return text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '') // Remove special characters
      .replace(/\s+/g, '-')     // Replace spaces with hyphens
      .replace(/--+/g, '-')     // Replace multiple hyphens with single hyphen
      .trim();                  // Trim leading/trailing spaces
  };

  const handleCopyJobLink = (job) => {
    const jobUrl = `https://jobs.aurjobs.com/jobs/${createSlug(job?.job_title)}/${job?.job_id}`;
    navigator.clipboard.writeText(jobUrl).then(() => {
      console.log('Job link copied to clipboard');
      // You can show a toast notification here
      alert('Job link copied to clipboard!');
    }).catch(err => {
      console.error('Failed to copy: ', err);
    });
  };

  return (
    <div className="flex h-screen bg-gray-50">

      {/* Main Content */}
      <div className="flex-1 overflow-auto">

        {/* Page Content */}
        <main className="p-6">
          <div className="mb-6 flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Job Listings</h1>
              <p className="text-gray-600">Manage your company's open positions</p>
            </div>
            {/* <button className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
              <PlusCircle className="h-5 w-5 mr-2" />
              <span>Post New Job</span>
            </button> */}
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-4 gap-6 mb-6">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-gray-500 text-sm">Total Jobs</p>
                  <h3 className="text-2xl font-bold text-gray-800 mt-1">{jobs.length}</h3>
                </div>
                <div className="p-2 bg-indigo-100 rounded-lg">
                  <FileText className="h-6 w-6 text-indigo-600" />
                </div>
              </div>
              <div className="flex items-center mt-4 text-sm">
                <span className="text-green-500 font-medium">+2</span>
                <span className="text-gray-500 ml-1">from last month</span>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-gray-500 text-sm">Active Jobs</p>
                  <h3 className="text-2xl font-bold text-gray-800 mt-1">{jobs.filter(job => job.status === 'Active').length}</h3>
                </div>
                <div className="p-2 bg-green-100 rounded-lg">
                  <Check className="h-6 w-6 text-green-600" />
                </div>
              </div>
              <div className="flex items-center mt-4 text-sm">
                <span className="text-green-500 font-medium">+1</span>
                <span className="text-gray-500 ml-1">from last month</span>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-gray-500 text-sm">Total Applicants</p>
                  <h3 className="text-2xl font-bold text-gray-800 mt-1">{jobs.reduce((sum, job) => sum + job.applicants, 0)}</h3>
                </div>
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
              </div>
              <div className="flex items-center mt-4 text-sm">
                <span className="text-green-500 font-medium">+8</span>
                <span className="text-gray-500 ml-1">from last week</span>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-gray-500 text-sm">Total Views</p>
                  <h3 className="text-2xl font-bold text-gray-800 mt-1">{jobs.reduce((sum, job) => sum + job.views, 0)}</h3>
                </div>
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Eye className="h-6 w-6 text-purple-600" />
                </div>
              </div>
              <div className="flex items-center mt-4 text-sm">
                <span className="text-green-500 font-medium">+24%</span>
                <span className="text-gray-500 ml-1">from last week</span>
              </div>
            </div>
          </div>

          {/* Table Card */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            {/* Table Header and Filters */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                <div>
                  <h2 className="text-lg font-bold text-gray-800">Current Listings</h2>
                  <p className="text-gray-500 mt-1">Manage and monitor your job postings</p>
                </div>
                <div className="flex items-center space-x-3 mt-4 sm:mt-0">
                  <div className="relative">
                    <Search className="h-4 w-4 absolute left-3 top-3 text-gray-400" />
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Search jobs..."
                      className="pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 w-64"
                    />
                  </div>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                  >
                    <option value="All">All Status</option>
                    <option value="Active">Active</option>
                    <option value="Paused">Paused</option>
                 
                  </select>
                 
                </div>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/3">
                      <button
                        className="flex items-center space-x-1 focus:outline-none"
                        onClick={() => handleSort('title')}
                      >
                        <span>Job Title</span>
                        <ArrowUpDown className="h-3 w-3" />
                      </button>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <button
                        className="flex items-center space-x-1 focus:outline-none"
                        onClick={() => handleSort('department')}
                      >
                        <span>Department</span>
                        <ArrowUpDown className="h-3 w-3" />
                      </button>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <button
                        className="flex items-center space-x-1 focus:outline-none"
                        onClick={() => handleSort('location')}
                      >
                        <span>Location</span>
                        <ArrowUpDown className="h-3 w-3" />
                      </button>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <button
                        className="flex items-center space-x-1 focus:outline-none"
                        onClick={() => handleSort('posted')}
                      >
                        <span>Posted</span>
                        <ArrowUpDown className="h-3 w-3" />
                      </button>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <button
                        className="flex items-center space-x-1 focus:outline-none"
                        onClick={() => handleSort('applicants')}
                      >
                        <span>Activity</span>
                        <ArrowUpDown className="h-3 w-3" />
                      </button>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <button
                        className="flex items-center space-x-1 focus:outline-none"
                        onClick={() => handleSort('status')}
                      >
                        <span>Status</span>
                        <ArrowUpDown className="h-3 w-3" />
                      </button>
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentJobs.map(job => {
                    const activity = calculateActivity(job.applicants, job.views);

                    return (
                      <tr key={job.id} className="hover:bg-gray-50 transition-colors" >
                        <td className="px-6 py-4 cursor-pointer" onClick={() => navigate(`/employer_dashboard/jobs/${job?.job_id}`)}>
                          <div className="flex items-center">
                            {/* <div className="flex-shrink-0 h-10 w-10 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-600 font-semibold">
                              {job.department.charAt(0)}
                            </div> */}
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{job?.job_title}</div>
                              <div className="text-xs text-gray-500">{job?.employment_type}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800">
                            {job?.department}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center text-sm text-gray-500">
                            <MapPin className="h-3 w-3 mr-1 text-gray-400" />
                            {job?.job_location}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div>{new Date(job.posted_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</div>
                          <div className="text-xs text-gray-400">
                            Expires: {new Date(job.applicationdeadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-full max-w-xs">
                              <div className="flex justify-between text-xs mb-1">
                                <span className="font-medium text-gray-700">{job?.applicants_count} applicants</span>
                                {/* <span className="text-gray-500">{job.views} views</span> */}
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                  className={`h-2 rounded-full ${activity >= 7 ? 'bg-green-500' :
                                    activity >= 4 ? 'bg-yellow-500' : 'bg-gray-400'
                                    }`}
                                  style={{ width: `${Math.min(activity * 3, 100)}%` }}
                                ></div>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${job.status === 'Active' ? 'bg-green-100 text-green-800' :
                            job.status === 'Paused' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>

                            {job.status ? <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1.5"></div> : <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full mr-1.5"></div>}
                           
                            {job.status ? "Active" : "Paused"}
                          </span>
                        </td>
                       <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex items-center justify-end gap-2">
                            <div className="relative group">
                              <button className="bg-white rounded-md p-1 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 focus:outline-none">
                                {/* <MoreVertical className="h-5 w-5" /> */}
                                <a
                                  href="#"
                                  onClick={(e) => { e.preventDefault(); handleDeleteJob(job.job_id); }}
                                  className="flex items-center px-4 py-2 text-sm text-red-600"
                                >
                                  <Trash2 className="h-4 w-4 mr-3 text-red-500" /> Delete
                                </a>
                              </button>
                            </div>

                            <JobActionsDropdown
                              onShare={() => handleShareJob(job)}
                              onCopy={() => handleCopyJobLink(job)}
                            />
                          </div>
                        </td>
                        
                      </tr>


                    );
                  })}

                  {currentJobs.length === 0 && (
                    <tr>
                      <td colSpan="7" className="px-6 py-10 text-center">
                        <div className="flex flex-col items-center justify-center">
                          <div className="bg-gray-100 p-6 rounded-full mb-4">
                            <Search className="h-8 w-8 text-gray-400" />
                          </div>
                          <h3 className="text-gray-600 font-medium text-lg">No jobs found</h3>
                          <p className="text-gray-500 mt-1">Try adjusting your search or filter criteria</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
              <div className="text-sm text-gray-700">
                Showing <span className="font-medium">{indexOfFirstItem + 1}</span> to <span className="font-medium">
                  {Math.min(indexOfLastItem, filteredJobs.length)}
                </span> of <span className="font-medium">{filteredJobs.length}</span> jobs
              </div>
              <div className="flex space-x-1">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`inline-flex items-center px-3 py-1 border rounded-md text-sm font-medium ${currentPage === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-50 border-gray-300'
                    }`}
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`inline-flex items-center px-3 py-1 border rounded-md text-sm font-medium ${currentPage === page
                      ? 'bg-indigo-600 text-white border-indigo-600'
                      : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                      }`}
                  >
                    {page}
                  </button>
                ))}
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`inline-flex items-center px-3 py-1 border rounded-md text-sm font-medium ${currentPage === totalPages ? 'text-gray-300 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-50 border-gray-300'
                    }`}
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>



          </div>
        </main>
      </div>
    </div>
  );
}





const JobActionsDropdown = ({ job, onEdit, onView, onShare, onCopy, onToggleStatus, onDelete }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleAction = (action, callback) => {
    setIsOpen(false);
    if (callback) callback(job);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-white rounded-md p-1 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
        aria-label="More options"
      >
        <MoreVertical className="h-5 w-5" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-50">
          <div className="py-1" role="menu">
            {/* View Job */}
            {/* <button
              onClick={() => handleAction('view', onView)}
              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
              role="menuitem"
            >
              <Eye className="h-4 w-4 mr-3 text-gray-500" />
              View Details
            </button>

        
            <button
              onClick={() => handleAction('edit', onEdit)}
              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
              role="menuitem"
            >
              <Edit className="h-4 w-4 mr-3 text-gray-500" />
              Edit Job
            </button> */}

            {/* Share Job */}
            <button
              onClick={() => handleAction('share', onShare)}
              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
              role="menuitem"
            >
              <Share2 className="h-4 w-4 mr-3 text-blue-500" />
              Share Job
            </button>

            {/* Copy Link */}
            <button
              onClick={() => handleAction('copy', onCopy)}
              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
              role="menuitem"
            >
              <Copy className="h-4 w-4 mr-3 text-gray-500" />
              Copy Link
            </button>

            {/* Toggle Status */}
            {/* <button
              onClick={() => handleAction('toggleStatus', onToggleStatus)}
              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
              role="menuitem"
            >
              {job.status ? (
                <>
                  <Pause className="h-4 w-4 mr-3 text-orange-500" />
                  Pause Job
                </>
              ) : (
                <>
                  <Play className="h-4 w-4 mr-3 text-green-500" />
                  Activate Job
                </>
              )}
            </button> */}

            {/* Divider */}
            <div className="border-t border-gray-100 my-1"></div>

            {/* Delete Job */}
            {/* <button
              onClick={() => handleAction('delete', onDelete)}
              className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
              role="menuitem"
            >
              <Trash2 className="h-4 w-4 mr-3 text-red-500" />
              Delete Job
            </button> */}
          </div>
        </div>
      )}
    </div>
  );
};