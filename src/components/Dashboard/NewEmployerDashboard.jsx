import { useState } from 'react';
import {
  Users,
  Briefcase, Search, Bell, MessageSquare, Home, LogOut,
  Calendar,
  PieChart,

  Settings,

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
Menu,
  Clock,
  AlertCircle,
  Eye,
  Share2,
  Edit,
  BarChart2,
  ChevronRight,
  User,
  MoreVertical,
  Brain
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartPieChart, Pie, Cell } from 'recharts';
import CompanyProfile from './CompanyProfile';
import { JobTable } from './JobTable';
import { ApplicantTable } from './ApplicantTable';
import AIScreening from './AIScreening';
import PostJob from './PostJob';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
// import AurjobsLogo from "../../assets/Aurjobs_LogoRemBack.png"
import { toast } from 'react-toastify';
import { getEmployerProfile, setEmployerAuthentication } from '../../redux/employerSlice';
import SourcingPortal from './SourcingPortal';
import axios from 'axios';
import AIAgent from './AIAgent';

export default function NewEmployerDashboard() {
  const [selectedSection, setSelectedSection] = useState('overview');
  const [showDropdown, setShowDropdown] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);
  const employerData = useSelector((state) => state.employer?.employerProfile);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const toggleDropdown = () => setShowDropdown(!showDropdown);
  const toggleSidebar = () => setSidebarCollapsed(!sidebarCollapsed);


  const handleLogout = () => {

    dispatch(getEmployerProfile(null));
    dispatch(setEmployerAuthentication(false));
    toast.success('Logout successfully!', {
      duration: 4000,
      position: 'top-right',

    });
    navigate("/");
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  // Sample data for dashboard
  const applicationData = [
    { name: 'Jan', count: 45 },
    { name: 'Feb', count: 52 },
    { name: 'Mar', count: 68 },
    { name: 'Apr', count: 72 },
    { name: 'May', count: 56 },
    { name: 'Jun', count: 65 },
    { name: 'Jul', count: 75 },
  ];

  const jobsByDepartment = [
    { name: 'Engineering', value: 12 },
    { name: 'Marketing', value: 8 },
    { name: 'Sales', value: 10 },
    { name: 'HR', value: 4 },
    { name: 'Design', value: 6 },
  ];

  const COLORS = ['#4F46E5', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

  const activeJobs = [
    {
      id: 1,
      title: "Senior Frontend Developer",
      department: "Engineering",
      location: "Remote",
      applicants: 24,
      datePosted: "July 10, 2025",
      status: "active"
    },
    {
      id: 2,
      title: "Marketing Manager",
      department: "Marketing",
      location: "New York",
      applicants: 18,
      datePosted: "July 8, 2025",
      status: "active"
    },
    {
      id: 3,
      title: "UX Designer",
      department: "Design",
      location: "San Francisco",
      applicants: 16,
      datePosted: "July 5, 2025",
      status: "active"
    },
    {
      id: 4,
      title: "Sales Representative",
      department: "Sales",
      location: "Chicago",
      applicants: 12,
      datePosted: "July 2, 2025",
      status: "active"
    },
  ];

  const recentApplicants = [
    { id: 1, name: "Alex Johnson", position: "Senior Frontend Developer", status: "New", date: "Today" },
    { id: 2, name: "Sarah Williams", position: "Marketing Manager", status: "Reviewed", date: "Yesterday" },
    { id: 3, name: "Michael Chen", position: "UX Designer", status: "Interview", date: "Jul 21" },
  ];


  


  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
    
      <div 
      onMouseEnter={() => setSidebarCollapsed(false)}  // Collapse on hover
  onMouseLeave={() => setSidebarCollapsed(true)}
      className={`${sidebarCollapsed ? 'w-16' : 'w-64'} bg-slate-900 text-white transition-all duration-300 ease-in-out flex flex-col`}>
       
        <div className="p-4 mb-2">
          <div className="flex items-center justify-between">
            {!sidebarCollapsed && (
              <div className="flex items-center space-x-2">
                <Briefcase className="h-6 w-6" />
                <h1 className="text-xl font-bold">Aurjobs</h1>
              </div>
            )}
            {sidebarCollapsed && (
              <div className="flex justify-center w-full">
                <Briefcase className="h-6 w-6" />
              </div>
            )}
          </div>
        </div>

        
        <nav className="flex-1 px-4 space-y-1">
          <SidebarItem
            icon={<BarChart2 className='h-4 w-4'  />}
            text="Dashboard"
            active={selectedSection === 'overview'}
            onClick={() => setSelectedSection('overview')}
            collapsed={sidebarCollapsed}
          />
          <SidebarItem
            icon={<Brain className='h-4 w-4' />}
            text="AI Agent"
            active={selectedSection === 'aiAgent'}
            onClick={() => setSelectedSection('aiAgent')}
            collapsed={sidebarCollapsed}
          />
          <SidebarItem
            icon={<User className='h-4 w-4' />}
            text="Company Profile"
            active={selectedSection === 'companyProfile'}
            onClick={() => setSelectedSection('companyProfile')}
             collapsed={sidebarCollapsed}
          />
          <SidebarItem
            icon={<Plus className='h-4 w-4' />}
            text="Post Job"
            active={selectedSection === 'postJob'}
            onClick={() => setSelectedSection('postJob')}
            collapsed={sidebarCollapsed}
          />
          <SidebarItem
            icon={<Briefcase className='h-4 w-4' />}
            text="Jobs"
            active={selectedSection === 'jobs'}
            onClick={() => setSelectedSection('jobs')}
            collapsed={sidebarCollapsed}
          />
          <SidebarItem
            icon={<Users className='h-4 w-4' />}
            text="Applicants"
            active={selectedSection === 'applicants'}
            onClick={() => setSelectedSection('applicants')}
             collapsed={sidebarCollapsed}
          />
          <SidebarItem
            icon={<Brain className='h-4 w-4' />}
            text="AI Screening"
            active={selectedSection === 'aiscreening'}
            onClick={() => setSelectedSection('aiscreening')}
            collapsed={sidebarCollapsed}
          />
          <SidebarItem
            icon={<Globe className='h-4 w-4'  />}
            text="Talent ATS"
            active={selectedSection === 'sourcing'}
            onClick={() => setSelectedSection('sourcing')}
            collapsed={sidebarCollapsed}
          />
          {/* <SidebarItem
            icon={<Calendar  />}
            text="Interviews"
            active={selectedSection === 'interviews'}
            onClick={() => setSelectedSection('interviews')}
          /> */}
          <SidebarItem
            icon={<TrendingUp className='h-4 w-4' />}
            text="Analytics"
            active={selectedSection === 'analytics'}
            onClick={() => setSelectedSection('analytics')}
            collapsed={sidebarCollapsed}
          />

          {/* <SidebarItem
            icon={<MessageSquare />}
            text="Messages"
            active={selectedSection === 'messages'}
            onClick={() => setSelectedSection('messages')}
          /> */}
          {/* <SidebarItem
            icon={<Settings />}
            text="Settings"
            active={selectedSection === 'settings'}
            onClick={() => setSelectedSection('settings')}
          /> */}
        </nav>

    
        <div className="p-4">
          <div className="bg-slate-600 rounded-lg p-1">
            {!sidebarCollapsed ? (
              <div className="flex items-center">
                <img
                  src={employerData?.company_logo}
                  alt="Company Logo"
                  className="rounded-full h-10 w-10"
                />
                <div className="ml-3">
                  <p className="font-medium text-sm">{employerData?.company_display_name}</p>
                  <p className="text-indigo-200 text-xs">Enterprise Plan</p>
                </div>
              </div>
            ) : (
              <div className="flex justify-center">
                <img
                  src={employerData?.company_logo}
                  alt="Company Logo"
                  className=" h-8 w-8 rounded-full"
                  title={employerData?.company_display_name}
                />
              </div>
            )}
          </div>
        </div>
      </div>
     

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Top Header */}

        {
          selectedSection !== 'aiAgent' && (
            <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="flex justify-between items-center px-6 py-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search jobs, applicants..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div className="flex items-center space-x-4">
              <button className="relative p-2 text-gray-500 hover:text-gray-700">
                <Bell className="h-6 w-6" />
                <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
              </button>
              <button className="relative p-2 text-gray-500 hover:text-gray-700">
                <MessageSquare className="h-6 w-6" />
                <span className="absolute top-1 right-1 h-2 w-2 bg-indigo-500 rounded-full"></span>
              </button>
              <div className="relative">
                <button
                  className="flex items-center"
                  onClick={toggleDropdown}
                  onMouseEnter={() => setShowDropdown(true)}
                >
                  <img
                    src={employerData?.company_logo}
                    alt="Profile"
                    className="rounded-full h-8 w-8"
                  />
                </button>

                {showDropdown && (
                  <div
                    className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-200"
                    onMouseLeave={() => setShowDropdown(false)}
                  >
                    <Link to={"/"} className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      <Home className="h-4 w-4 mr-2" />
                      Home
                    </Link>
                    <a href="#" onClick={handleLogout} className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>
          )
        }

        {/* Dashboard Content */}
        {
          selectedSection === 'overview' && (
            <main className="p-6">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">Employer Dashboard</h2>
                  <p className="text-gray-600">Manage your job postings and applicants</p>
                </div>
                {/* <button className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors">
                  <Plus className="h-5 w-5" />
                  <span>Post New Job</span>
                </button> */}
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                <StatCard
                  icon={<Briefcase className="h-6 w-6 text-indigo-600" />}
                  title="Active Jobs"
                  value="14"
                  change="+3 this month"
                  positive={true}
                />
                <StatCard
                  icon={<Users className="h-6 w-6 text-green-600" />}
                  title="Total Applicants"
                  value="287"
                  change="+42 this month"
                  positive={true}
                />
                <StatCard
                  icon={<Eye className="h-6 w-6 text-blue-600" />}
                  title="Job Views"
                  value="4,856"
                  change="+12% from last month"
                  positive={true}
                />
                <StatCard
                  icon={<UserCheck className="h-6 w-6 text-purple-600" />}
                  title="Hired"
                  value="8"
                  change="+2 this month"
                  positive={true}
                />
              </div>

              {/* Charts and Data Sections */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                {/* Applications Chart */}
                <div className="bg-white p-6 rounded-xl shadow-sm lg:col-span-2">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-gray-800">Application Trends</h3>
                    <select className="text-sm border border-gray-300 rounded-md p-1">
                      <option>Last 6 Months</option>
                      <option>Last Year</option>
                      <option>All Time</option>
                    </select>
                  </div>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={applicationData}>
                        <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.1} />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} />
                        <YAxis axisLine={false} tickLine={false} />
                        <Tooltip />
                        <Line
                          type="monotone"
                          dataKey="count"
                          stroke="#4F46E5"
                          strokeWidth={2}
                          dot={{ r: 4 }}
                          activeDot={{ r: 6, stroke: "#4F46E5", strokeWidth: 2, fill: "white" }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Jobs by Department */}
                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <h3 className="font-bold text-gray-800 mb-4">Jobs by Department</h3>
                  <div className="h-52">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartPieChart>
                        <Pie
                          data={jobsByDepartment}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          fill="#8884d8"
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {jobsByDepartment.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </RechartPieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="grid grid-cols-2 gap-2 mt-4">
                    {jobsByDepartment.map((item, index) => (
                      <div key={index} className="flex items-center">
                        <div
                          className="h-3 w-3 rounded-sm mr-2"
                          style={{ backgroundColor: COLORS[index % COLORS.length] }}
                        ></div>
                        <span className="text-xs text-gray-600">{item.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Active Jobs */}
              <div className="bg-white rounded-xl shadow-sm mb-6">
                <div className="p-6 border-b border-gray-100">
                  <div className="flex justify-between items-center">
                    <h3 className="font-bold text-gray-800">Active Job Listings</h3>
                    <button className="text-indigo-600 text-sm hover:text-indigo-800">View All</button>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-left text-xs text-gray-500 bg-gray-50">
                        <th className="px-6 py-3 font-medium">Job Title</th>
                        <th className="px-6 py-3 font-medium">Department</th>
                        <th className="px-6 py-3 font-medium">Location</th>
                        <th className="px-6 py-3 font-medium">Applicants</th>
                        <th className="px-6 py-3 font-medium">Posted Date</th>
                        <th className="px-6 py-3 font-medium">Status</th>
                        <th className="px-6 py-3 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {activeJobs.map(job => (
                        <tr key={job.id} className="text-sm text-gray-800 hover:bg-gray-50">
                          <td className="px-6 py-4 font-medium">{job.title}</td>
                          <td className="px-6 py-4">{job.department}</td>
                          <td className="px-6 py-4">{job.location}</td>
                          <td className="px-6 py-4">{job.applicants}</td>
                          <td className="px-6 py-4">{job.datePosted}</td>
                          <td className="px-6 py-4">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              {job.status}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex space-x-2">
                              <button className="p-1 text-gray-500 hover:text-indigo-600">
                                <Edit className="h-4 w-4" />
                              </button>
                              <button className="p-1 text-gray-500 hover:text-indigo-600">
                                <Eye className="h-4 w-4" />
                              </button>
                              <button className="p-1 text-gray-500 hover:text-indigo-600">
                                <Share2 className="h-4 w-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Bottom Section */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Applicants */}
                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-gray-800">Recent Applicants</h3>
                    <button className="text-indigo-600 text-sm hover:text-indigo-800">View All</button>
                  </div>
                  <div className="space-y-4">
                    {recentApplicants.map(applicant => (
                      <div key={applicant.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center">
                          <img
                            src="/api/placeholder/40/40"
                            alt={applicant.name}
                            className="rounded-full h-10 w-10"
                          />
                          <div className="ml-3">
                            <p className="font-medium text-gray-800">{applicant.name}</p>
                            <p className="text-sm text-gray-500">{applicant.position}</p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <span className={`px-2 py-1 rounded-md text-xs font-medium mr-2 ${applicant.status === 'New' ? 'bg-blue-100 text-blue-800' :
                            applicant.status === 'Reviewed' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-green-100 text-green-800'
                            }`}>
                            {applicant.status}
                          </span>
                          <span className="text-xs text-gray-500">{applicant.date}</span>
                          <ChevronRight className="h-4 w-4 text-gray-400 ml-2" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <h3 className="font-bold text-gray-800 mb-4">Quick Actions</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <ActionButton
                      icon={<Briefcase className="h-5 w-5" />}
                      text="Post New Job"
                    />
                    <ActionButton
                      icon={<Users className="h-5 w-5" />}
                      text="Review Applicants"
                    />
                    <ActionButton
                      icon={<FileText className="h-5 w-5" />}
                      text="Create Job Template"
                    />
                    <ActionButton
                      icon={<Calendar className="h-5 w-5" />}
                      text="Schedule Interviews"
                    />
                    <ActionButton
                      icon={<TrendingUp className="h-5 w-5" />}
                      text="View Analytics"
                      className="col-span-2"
                    />
                  </div>
                </div>
              </div>
            </main>
          )

        }
        {
          selectedSection === 'companyProfile' && (

            <CompanyProfile />
          )
        }
        {
          selectedSection === 'aiAgent' && (

            <AIAgent />
          )
        }
        {
          selectedSection === 'jobs' && (
            <JobTable />
          )
        }
        {
          selectedSection === "applicants" && (
            <ApplicantTable />
          )
        }
        {
          selectedSection === "aiscreening" && (
            <AIScreening />
          )
        }
        {
          selectedSection === "postJob" && (
            <PostJob />
          )
        }
        {
          selectedSection === "sourcing" && (
            <SourcingPortal />
          )
        }
      </div>
    </div>
  );
}

// Component for sidebar items
function SidebarItem({ icon, text, active, onClick, collapsed }) {
  return (
    <button
      // className={`flex items-center space-x-3 w-full py-3 px-4 rounded-lg mb-1 transition-colors ${active ? 'bg-indigo-700 text-white' : 'text-indigo-100 hover:bg-indigo-700/50'
      //   }`}
      className={`flex items-center space-x-3 w-full px-3 py-2 rounded-lg transition-colors ${
      active ? 'bg-slate-600 text-white' : 'text-indigo-100 hover:bg-slate-600'
    } ${collapsed ? 'justify-center' : ''}`}
    title={collapsed ? text : ''}
      onClick={onClick}
    >
      <div className="flex-shrink-0">{icon}</div>
    {!collapsed && <span className="text-sm font-medium">{text}</span>}
    </button>
  );
}

// Component for stats cards
function StatCard({ icon, title, value, change, positive }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-gray-500 text-sm">{title}</p>
          <p className="text-2xl font-bold text-gray-800 mt-1">{value}</p>
        </div>
        <div className="bg-gray-100 p-2 rounded-lg">
          {icon}
        </div>
      </div>
      <div className={`text-xs mt-2 ${positive ? 'text-green-600' : 'text-red-500'}`}>
        {change}
      </div>
    </div>
  );
}

// Component for action buttons
function ActionButton({ icon, text, className = "" }) {
  return (
    <button className={`flex items-center space-x-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors ${className}`}>
      <div className="p-2 bg-indigo-100 rounded-lg text-indigo-600">
        {icon}
      </div>
      <span className="text-sm text-gray-700">{text}</span>
    </button>
  );
}


function InfoItem({ label, value }) {
  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      <p className="text-sm text-gray-500 mb-1">{label}</p>
      <p className="font-medium text-gray-900">{value}</p>
    </div>
  );
}