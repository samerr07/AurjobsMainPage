import { useState } from "react";
import {
    MoreVertical,
    Edit,
    Trash2,
    Eye,
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
    StarHalf
} from 'lucide-react';

export function ApplicantTable() {
    const [applicants, setApplicants] = useState([
        {
            id: 1,
            name: 'John Doe',
            email: 'john.doe@example.com',
            phone: '(555) 123-4567',
            job: 'Senior Frontend Developer',
            applied: '2025-04-28',
            experience: '5 years',
            education: 'BS Computer Science',
            status: 'New',
            rating: 4.5,
            resume: '#',
            coverLetter: '#',
            notes: 'Excellent React experience, worked at top tech companies'
        },
        {
            id: 2,
            name: 'Jane Smith',
            email: 'jane.smith@example.com',
            phone: '(555) 987-6543',
            job: 'Product Manager',
            applied: '2025-04-27',
            experience: '7 years',
            education: 'MBA',
            status: 'Screening',
            rating: 4,
            resume: '#',
            coverLetter: '#',
            notes: 'Strong background in SaaS products'
        },
        {
            id: 3,
            name: 'Michael Johnson',
            email: 'michael.j@example.com',
            phone: '(555) 234-5678',
            job: 'UX Designer',
            applied: '2025-04-26',
            experience: '3 years',
            education: 'BFA Graphic Design',
            status: 'Interview',
            rating: 3.5,
            resume: '#',
            coverLetter: '#',
            notes: 'Creative portfolio, experience with design systems'
        },
        {
            id: 4,
            name: 'Emily Davis',
            email: 'emily.d@example.com',
            phone: '(555) 345-6789',
            job: 'DevOps Engineer',
            applied: '2025-04-25',
            experience: '4 years',
            education: 'BS Information Technology',
            status: 'Technical Test',
            rating: 5,
            resume: '#',
            coverLetter: null,
            notes: 'Strong AWS expertise, contributor to open source'
        },
        {
            id: 5,
            name: 'David Wilson',
            email: 'david.w@example.com',
            phone: '(555) 456-7890',
            job: 'Marketing Specialist',
            applied: '2025-04-24',
            experience: '2 years',
            education: 'BA Marketing',
            status: 'New',
            rating: 3,
            resume: '#',
            coverLetter: '#',
            notes: 'Experience with digital marketing campaigns'
        },
        {
            id: 6,
            name: 'Sarah Brown',
            email: 'sarah.b@example.com',
            phone: '(555) 567-8901',
            job: 'Backend Developer',
            applied: '2025-04-23',
            experience: '6 years',
            education: 'MS Computer Engineering',
            status: 'Offer',
            rating: 4.5,
            resume: '#',
            coverLetter: '#',
            notes: 'Expert in Node.js and distributed systems'
        },
        {
            id: 7,
            name: 'Alex Turner',
            email: 'alex.t@example.com',
            phone: '(555) 678-9012',
            job: 'Backend Developer',
            applied: '2025-04-22',
            experience: '8 years',
            education: 'PhD Computer Science',
            status: 'Rejected',
            rating: 3.5,
            resume: '#',
            coverLetter: '#',
            notes: 'Strong academically but limited industry experience'
        }
    ]);

    const [currentPage, setCurrentPage] = useState(1);
    const [sortField, setSortField] = useState('applied');
    const [sortDirection, setSortDirection] = useState('desc');
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    const [jobFilter, setJobFilter] = useState('All');

    const itemsPerPage = 5;

    // Get unique job titles
    const jobTitles = ['All', ...new Set(applicants.map(a => a.job))];

    // Sort and filter applicants
    const filteredApplicants = applicants.filter(applicant => {
        // Filter by search term
        const matchesSearch =
            applicant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            applicant.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            applicant.job.toLowerCase().includes(searchTerm.toLowerCase());

        // Filter by status
        const matchesStatus = statusFilter === 'All' || applicant.status === statusFilter;

        // Filter by job
        const matchesJob = jobFilter === 'All' || applicant.job === jobFilter;

        return matchesSearch && matchesStatus && matchesJob;
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

    // Paginate applicants
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentApplicants = filteredApplicants.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredApplicants.length / itemsPerPage);

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

    const handleStatusChange = (id, newStatus) => {
        setApplicants(applicants.map(applicant =>
            applicant.id === id ? { ...applicant, status: newStatus } : applicant
        ));
    };

    // Function to render star rating
    const renderRating = (rating) => {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;

        return (
            <div className="flex">
                {[...Array(fullStars)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                ))}
                {hasHalfStar && <StarHalf className="h-4 w-4 text-yellow-400 fill-current" />}
            </div>
        );
    };

    // Status options for dropdown
    const statusOptions = ['New', 'Screening', 'Technical Test', 'Interview', 'Offer', 'Hired', 'Rejected'];

    return (
        <div className="bg-white rounded-xl shadow-sm">
            {/* Table Header and Filters */}
            <div className="p-4 border-b border-gray-200">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                    <h2 className="text-lg font-bold text-gray-800 mb-3 sm:mb-0">Applicants</h2>
                    <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                        <div className="relative">
                            <Search className="h-4 w-4 absolute left-3 top-3 text-gray-400" />
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Search applicants..."
                                className="pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full sm:w-64"
                            />
                        </div>
                        <div className="flex space-x-2">
                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            >
                                <option value="All">All Status</option>
                                {statusOptions.map(status => (
                                    <option key={status} value={status}>{status}</option>
                                ))}
                            </select>
                            <select
                                value={jobFilter}
                                onChange={(e) => setJobFilter(e.target.value)}
                                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            >
                                {jobTitles.map(title => (
                                    <option key={title} value={title}>{title}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                <button
                                    className="flex items-center space-x-1 focus:outline-none"
                                    onClick={() => handleSort('name')}
                                >
                                    <span>Applicant</span>
                                    <ArrowUpDown className="h-3 w-3" />
                                </button>
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                <button
                                    className="flex items-center space-x-1 focus:outline-none"
                                    onClick={() => handleSort('job')}
                                >
                                    <span>Job Position</span>
                                    <ArrowUpDown className="h-3 w-3" />
                                </button>
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                <button
                                    className="flex items-center space-x-1 focus:outline-none"
                                    onClick={() => handleSort('applied')}
                                >
                                    <span>Applied Date</span>
                                    <ArrowUpDown className="h-3 w-3" />
                                </button>
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                <button
                                    className="flex items-center space-x-1 focus:outline-none"
                                    onClick={() => handleSort('experience')}
                                >
                                    <span>Experience</span>
                                    <ArrowUpDown className="h-3 w-3" />
                                </button>
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                <button
                                    className="flex items-center space-x-1 focus:outline-none"
                                    onClick={() => handleSort('rating')}
                                >
                                    <span>Rating</span>
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
                        {currentApplicants.map(applicant => (
                            <tr key={applicant.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {/* <div className="flex items-center">
                                        <div className="flex-shrink-0 h-10 w-10 relative">
                                            <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                                                <span className="text-indigo-800 font-medium">
                                                    {applicant.name.split(' ').map(n => n[0]).join('')}
                                                </span>
                                            </div>
                                        </div>
                                    </div> */}
                                    <div className="ml-4">
                                        <div className="text-sm font-medium text-gray-900">{applicant.name}</div>
                                        <div className="flex items-center text-xs text-gray-500">
                                            <Mail className="h-3 w-3 mr-1" />
                                            {applicant.email}
                                        </div>
                                        <div className="flex items-center text-xs text-gray-500">
                                            <Phone className="h-3 w-3 mr-1" />
                                            {applicant.phone}
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {applicant.job}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    <div className="flex items-center">
                                        <Calendar className="h-4 w-4 mr-1 text-gray-400" />
                                        {new Date(applicant.applied).toLocaleDateString()}
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900">{applicant.experience}</div>
                                    <div className="text-xs text-gray-500">{applicant.education}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {renderRating(applicant.rating)}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <select
                                        value={applicant.status}
                                        onChange={(e) => handleStatusChange(applicant.id, e.target.value)}
                                        className={`text-xs font-medium rounded-full px-2 py-1 border ${applicant.status === 'New' ? 'bg-blue-50 text-blue-700 border-blue-100' :
                                                applicant.status === 'Screening' ? 'bg-purple-50 text-purple-700 border-purple-100' :
                                                    applicant.status === 'Technical Test' ? 'bg-indigo-50 text-indigo-700 border-indigo-100' :
                                                        applicant.status === 'Interview' ? 'bg-yellow-50 text-yellow-700 border-yellow-100' :
                                                            applicant.status === 'Offer' ? 'bg-green-50 text-green-700 border-green-100' :
                                                                applicant.status === 'Hired' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                                                                    'bg-red-50 text-red-700 border-red-100'
                                            }`}
                                    >
                                        {statusOptions.map(status => (
                                            <option key={status} value={status}>{status}</option>
                                        ))}
                                    </select>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <div className="relative group">
                                        <button className="bg-white rounded-md p-1 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 focus:outline-none">
                                            <MoreVertical className="h-5 w-5" />
                                        </button>
                                        <div className="hidden group-hover:block absolute right-0 z-10 w-36 bg-white rounded-md shadow-lg">
                                            <div className="py-1">
                                                <a href="#" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                                    <Eye className="h-4 w-4 mr-2" /> View Profile
                                                </a>
                                                <a href="#" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                                    <Download className="h-4 w-4 mr-2" /> Resume
                                                </a>
                                                {applicant.coverLetter && (
                                                    <a href="#" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                                        <Download className="h-4 w-4 mr-2" /> Cover Letter
                                                    </a>
                                                )}
                                                <a href="#" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                                    <MessageSquare className="h-4 w-4 mr-2" /> Notes
                                                </a>
                                                <a href="#" className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100">
                                                    <Trash2 className="h-4 w-4 mr-2" /> Delete
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        ))}

                        {currentApplicants.length === 0 && (
                            <tr>
                                <td colSpan="7" className="px-6 py-10 text-center text-sm text-gray-500">
                                    No applicants found matching your search criteria
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="px-4 py-3 border-t border-gray-200 flex items-center justify-between">
                <div className="text-sm text-gray-700">
                    Showing <span className="font-medium">{indexOfFirstItem + 1}</span> to <span className="font-medium">
                        {Math.min(indexOfLastItem, filteredApplicants.length)}
                    </span> of <span className="font-medium">{filteredApplicants.length}</span> applicants
                </div>
                <div className="flex space-x-1">
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className={`inline-flex items-center px-3 py-1 border border-gray-300 rounded-md text-sm font-medium ${currentPage === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-50'
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
                        className={`inline-flex items-center px-3 py-1 border border-gray-300 rounded-md text-sm font-medium ${currentPage === totalPages ? 'text-gray-300 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-50'
                            }`}
                    >
                        <ChevronRight className="h-4 w-4" />
                    </button>
                </div>
            </div>
        </div>
    );
}

