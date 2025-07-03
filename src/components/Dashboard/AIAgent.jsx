

import { useState, useRef, useEffect } from 'react';
import {
  Bot,
  Send,
 Loader2,
  Cpu,
  User,
  Sparkles,
  Zap,
  FileText,
  Mic,
  MicOff,
  Copy,
  ThumbsUp,
  ThumbsDown,
  RefreshCw,
  Target,
  TrendingUp,
  CheckCircle,
  Award,
  Brain,
  BarChart3,
  Briefcase,
  MapPin,
  Calendar,
  DollarSign,
  Clock,
  Loader,
  ArrowRight,
  Shield,
  Database,
  FileSearch,
  TestTube,
  PenTool,
  Headphones,
  UserCheck,
  Activity,
  Users,
  Download,
  Share2,
  Building,
  Heart,
  HelpCircle,
  Star,
  Cloud,
  HardDrive,
  Plus,
  Check,
  X,
  Eye,
  Play,
  Upload,
  Paperclip,
  FileUp,
  Trash2,
  Edit3,
  ChevronRight,
  Rocket,
  CloudLightning,
  Globe,
  Filter,
  Search,
  MessageSquare,
  History,
  ChevronLeft,
  Settings,
  Menu,
  Linkedin,
  Crown,
  Mail,
  Phone,
  AlertCircle
} from 'lucide-react';

export default function AIRecruitmentChat() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: "👋 Welcome! I'm your AI Recruitment Assistant. Let's find your perfect candidate!",
      timestamp: new Date(),
      showOptions: true,
      options: [
        { id: 'start', text: '🚀 Start Hiring', action: 'start' },
        { id: 'learn', text: '✨ Features', action: 'learn' }
      ]
    }
  ]);
  const [uploadedJD, setUploadedJD] = useState(null);
  const [isProcessingFile, setIsProcessingFile] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [extractedContent, setExtractedContent] = useState('');

  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [currentFlow, setCurrentFlow] = useState('welcome');
  const [showJobDescModal, setShowJobDescModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [jobDescription, setJobDescription] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [showSidebar, setShowSidebar] = useState(true);
  const [showDashboard, setShowDashboard] = useState(false);
  const [activeView, setActiveView] = useState('chat'); // 'chat' or 'dashboard'
  const [showAILoader, setShowAILoader] = useState(false);
  const [activeScreeningChatId, setActiveScreeningChatId] = useState(null);
  const [chatHistory, setChatHistory] = useState([
    { id: 1, title: 'Senior Developer Search', date: '2 hours ago', preview: 'Found 28 candidates for React Developer role...' },
    { id: 2, title: 'Marketing Manager Hunt', date: 'Yesterday', preview: 'Screened 156 profiles for digital marketing...' },
    { id: 3, title: 'Data Scientist Quest', date: '2 days ago', preview: 'AI matched 15 ML specialists with 94% accuracy...' },
    { id: 4, title: 'UX Designer Search', date: '1 week ago', preview: 'Portfolio analysis completed for 45 designers...' }
  ]);
  const [activeChat, setActiveChat] = useState(null);
  const [selectedServices, setSelectedServices] = useState([]);
  // console.log(selectedServices)
  const [screeningProgress, setScreeningProgress] = useState({

    isActive: false,
    isComplete: false,
    currentStep: 0,
    // stepProgress: [0, 0, 0, 0, 0]
  });
  const [resumeUrl, setResumeUrl] = useState()
  const [userContext, setUserContext] = useState({
    selectedServices: {
      0: false,
      1: false,
      2: false,
      3: false,
      4: false
    },
    roleInput: '',
    jobDescription: '',
    selectedDatabase: '',
    screeningInProgress: false,
    screeningComplete: false,
    resumes: resumeUrl,
  });
  const [jDUrl, setJdUrl] = useState()
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const fileInputRef = useRef(null);


  console.log(userContext)

  const services = [
    {
      id: '0',
      name: '⚡ Profile Screening',
      desc: 'AI resume analysis with 95% accuracy',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: '1',
      name: '🧪 Pre screening call candidates',
      desc: 'Technical & behavioral evaluation',
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: '2',
      name: '✍️ Assesment to all Candidates',
      desc: 'SEO-optimized job descriptions',
      color: 'from-green-500 to-emerald-500'
    },
    {
      id: '3',
      name: '🎤 Video Interview to all Candidates',
      desc: 'AI questions & candidate insights',
      color: 'from-orange-500 to-red-500'
    },
    {
      id: '4',
      name: '🔍 All (Complete Recruitement)',
      desc: 'Real-time hiring metrics',
      color: 'from-indigo-500 to-purple-500'
    },
  ];

  const screeningSteps = [
    { id: 'parse', title: 'Parse Resumes', icon: Bot, color: 'from-purple-500 to-pink-500' },
    { id: 'analyze', title: 'Skill Analysis', icon: Brain, color: 'from-blue-500 to-purple-500' },
    { id: 'match', title: 'AI Matching', icon: Cpu, color: 'from-green-500 to-blue-500' },
    { id: 'rank', title: 'Smart Ranking', icon: TrendingUp, color: 'from-orange-500 to-red-500' },
    { id: 'validate', title: 'Quality Check', icon: Star, color: 'from-pink-500 to-purple-500' }
  ];



  //   // Mock analytics data
  const analyticsData = {
    overview: {
      totalCandidates: 1247,
      matchedCandidates: 186,
      avgCompatibility: 87,
      processingTime: "2.3s"
    },
    topCandidates: [
      {
        id: 1,
        name: 'Sarah Chen',
        role: 'Senior React Developer',
        experience: '5+ years',
        location: 'San Francisco, CA',
        salary: '$120-140k',
        compatibility: 98,
        skills: ['React', 'TypeScript', 'Node.js', 'AWS', 'Leadership'],
        avatar: '👩‍💻',
        status: 'Available',
        contact: { email: 'sarah.chen@email.com', phone: '+1-555-0123', linkedin: 'linkedin.com/in/sarahchen' }
      },
      {
        id: 2,
        name: 'Michael Rodriguez',
        role: 'Full Stack Developer',
        experience: '4+ years',
        location: 'Austin, TX',
        salary: '$100-120k',
        compatibility: 96,
        skills: ['React', 'Python', 'Django', 'PostgreSQL', 'Docker'],
        avatar: '👨‍💻',
        status: 'Available',
        contact: { email: 'michael.r@email.com', phone: '+1-555-0124', linkedin: 'linkedin.com/in/michaelrod' }
      },
      {
        id: 3,
        name: 'Emily Johnson',
        role: 'Frontend Specialist',
        experience: '3+ years',
        location: 'Remote',
        salary: '$90-110k',
        compatibility: 94,
        skills: ['React', 'Vue.js', 'CSS', 'Figma', 'Agile'],
        avatar: '👩‍🎨',
        status: 'Available',
        contact: { email: 'emily.j@email.com', phone: '+1-555-0125', linkedin: 'linkedin.com/in/emilyjohnson' }
      }
    ],
    skillsDistribution: [
      { skill: 'React', count: 24, percentage: 86 },
      { skill: 'JavaScript', count: 28, percentage: 100 },
      { skill: 'TypeScript', count: 18, percentage: 64 },
      { skill: 'Node.js', count: 16, percentage: 57 },
      { skill: 'Python', count: 12, percentage: 43 },
      { skill: 'AWS', count: 14, percentage: 50 }
    ],
    locationDistribution: [
      { location: 'San Francisco', count: 8, percentage: 29 },
      { location: 'New York', count: 6, percentage: 21 },
      { location: 'Austin', count: 4, percentage: 14 },
      { location: 'Seattle', count: 5, percentage: 18 },
      { location: 'Remote', count: 5, percentage: 18 }
    ],
    experienceDistribution: [
      { level: '1-2 years', count: 3, percentage: 11 },
      { level: '3-5 years', count: 15, percentage: 54 },
      { level: '5-8 years', count: 8, percentage: 29 },
      { level: '8+ years', count: 2, percentage: 7 }
    ]
  };

  const totalCredits = 100;
  const usedCredits = 35;
  const remainingCredits = totalCredits - usedCredits;
  const creditsPercentage = (remainingCredits / totalCredits) * 100;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, screeningProgress]);

  // Screening progress effect

  useEffect(() => {

    if (!screeningProgress.isActive || screeningProgress.isComplete) {
      return; // Don't start interval if not active or already complete
    }
    const interval = setInterval(() => {
      setScreeningProgress(prev => {
        if (prev.isComplete) return prev;

        const currentStep = prev.currentStep;
        const currentProgress = prev.stepProgress[currentStep] || 0;

        if (currentProgress < 100) {
          return {
            ...prev,
            stepProgress: {
              ...prev.stepProgress,
              [currentStep]: Math.min(100, currentProgress + Math.random() * 15)
            }
          };
        } else if (currentStep < screeningSteps.length - 1) {
          return {
            ...prev,
            currentStep: currentStep + 1,
            stepProgress: {
              ...prev.stepProgress,
              [currentStep + 1]: 0
            }
          };
        } else {
          return {
            ...prev,
            isActive: false,
            isComplete: true
          };
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [screeningProgress.isActive]);


  const addMessage = (type, content, options = null, showTyping = true, isScreeningProgress = false, isServicesSelection = false) => {
    if (showTyping && !isScreeningProgress && !isServicesSelection) {
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        setMessages(prev => [...prev, {
          id: Date.now(),
          type,
          content,
          timestamp: new Date(),
          options,
          showOptions: !!options,
          isScreeningProgress,
          isServicesSelection

        }]);
      }, 800 + Math.random() * 500);
    } else {
      setMessages(prev => [...prev, {
        id: Date.now(),
        type,
        content,
        timestamp: new Date(),
        options,
        showOptions: !!options,
        isScreeningProgress,
        isServicesSelection
      }]);
    }
  };


  const ServicesSelectionComponent = () => (

    <div className="w-full max-w-4xl mx-auto bg-gradient-to-br from-slate-800/50 via-purple-800/30 to-slate-800/50 backdrop-blur-sm rounded-xl border border-purple-500/20 shadow-2xl">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 border-b border-purple-500/30 px-4 py-2">
        <div className="flex items-center justify-center space-x-2">
          <Settings className="w-4 h-4 text-purple-300" />
          <h3 className="text-sm font-semibold text-purple-100">Select AI Services</h3>
          <Sparkles className="w-4 h-4 text-purple-300" />
        </div>
      </div>

      {/* Services List */}
      <div className="p-4 space-y-2">
        {services.map((service) => (
          <div
            key={service.id}
            className={`rounded-lg border transition-all duration-200 cursor-pointer ${selectedServices.includes(service.id)
              ? 'border-purple-400/50 bg-gradient-to-r from-purple-900/40 to-pink-900/30 shadow-lg shadow-purple-500/20'
              : 'border-slate-600/30 bg-gradient-to-r from-slate-800/30 to-slate-700/20 hover:border-purple-500/40'
              }`}
            onClick={() => handleServiceToggle(service.id)}
          >
            <div className="px-4 py-2.5 flex items-center space-x-3">
              {/* Compact Checkbox */}
              <div className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-all ${selectedServices.includes(service.id)
                ? 'bg-gradient-to-br from-purple-500 to-pink-500 border-purple-400'
                : 'border-slate-500 bg-slate-700/50'
                }`}>
                {selectedServices.includes(service.id) && (
                  <Check className="w-2.5 h-2.5 text-white" />
                )}
              </div>

              {/* Service Icon - smaller */}
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm transition-all ${selectedServices.includes(service.id)
                ? `bg-gradient-to-br ${service.color} shadow-md`
                : 'bg-slate-700 text-slate-400'
                }`}>
                {service.name.split(' ')[0]}
              </div>

              {/* Compact Service Details */}
              <div className="flex-1 min-w-0">
                <h4 className={`font-medium text-sm truncate ${selectedServices.includes(service.id) ? 'text-purple-100' : 'text-slate-300'
                  }`}>
                  {service.name.substring(2)} {/* Remove emoji from title */}
                </h4>
                <p className={`text-xs truncate ${selectedServices.includes(service.id) ? 'text-purple-200' : 'text-slate-400'
                  }`}>
                  {service.desc}
                </p>
              </div>

              {/* Compact Selection Indicator */}
              {selectedServices.includes(service.id) && (
                <Zap className="w-3 h-3 text-purple-300 flex-shrink-0" />
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Compact Action Footer */}
      <div className="border-t border-purple-500/20 bg-gradient-to-r from-slate-900/50 to-purple-900/30 px-4 py-2.5">
        <div className="flex items-center justify-between">
          <span className="text-xs text-purple-200">
            {selectedServices.length} selected
          </span>
          <div className="flex space-x-2">
            <button
              onClick={() => setSelectedServices([])}
              className="px-2.5 py-1 text-xs text-slate-400 hover:text-slate-200 transition-colors rounded"
            >
              Clear
            </button>
            <button
              onClick={proceedWithServices}
              disabled={selectedServices.length === 0}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${selectedServices.length > 0
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 shadow-md shadow-purple-500/25'
                : 'bg-slate-700 text-slate-400 cursor-not-allowed'
                }`}
            >
              Continue ({selectedServices.length})
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    setMessages(prev => [...prev, {
      id: Date.now(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    }]);

    processUserInput(inputValue);
    setInputValue('');
  };

  const handleOptionClick = (action, optionText) => {
    setMessages(prev => [...prev, {
      id: Date.now(),
      type: 'user',
      content: optionText,
      timestamp: new Date()
    }]);

    processUserInput(action);
  };



  const processUserInput = (input) => {
    const lowerInput = input.toLowerCase();

    switch (currentFlow) {
      case 'welcome':
        if (input === 'start' || lowerInput.includes('start') || lowerInput.includes('begin')) {
          setCurrentFlow('role');
          addMessage('bot', "🎯 **What role are you hiring for?**\n\nBe specific for better AI matching.\n\n💡 *Examples: 'Senior React Developer', 'Marketing Manager', 'Data Scientist'*");
        } else if (input === 'learn' || lowerInput.includes('more') || lowerInput.includes('tell')) {
          addMessage('bot', "🚀 **AI-Powered Hiring Platform**\n\n✨ **Capabilities:**\n• Screen 1000+ resumes in 2 minutes\n• 98% candidate matching accuracy\n• 80% faster time-to-hire\n• Eliminate unconscious bias\n• Data-driven insights\n\n💡 Trusted by 500+ companies!", [
            { id: 'start', text: '🚀 Get Started', action: 'start' },
            // { id: 'demo', text: '🎬 Demo', action: 'demo' }
          ]);
        }
        break;

      case 'role':
        if (input.length > 2) {
          setUserContext(prev => ({ ...prev, roleInput: input }));
          setCurrentFlow('jd_options');
          addMessage('bot', `🎯 **Role: ${input}**\n\n📄 **Job Description Options:**\n\nHow would you like to handle the Job Description?`, [
            { id: 'create_jd', text: '✨ Create JD with AI', action: 'create_jd', desc: 'Generate JD using AI based on role' },
            { id: 'upload_jd', text: '📤 Upload JD File', action: 'upload_jd', desc: 'Upload PDF/DOC job description' },
            { id: 'paste_jd', text: '📝 Paste JD Text', action: 'paste_jd', desc: 'Copy-paste job description text' },
            { id: 'skip_jd', text: '⏭️ Skip for Now', action: 'skip_jd', desc: 'Continue without JD (basic matching)' }
          ]);
        }
        break;

      case 'jd_options':
        if (input.startsWith('create_jd') || input.startsWith('upload_jd') || input.startsWith('paste_jd') || input.startsWith('skip_jd')) {
          let jdMethod = input;
          setUserContext(prev => ({ ...prev, jdMethod: jdMethod }));

          // Handle different JD options
          switch (jdMethod) {
            case 'create_jd':
              addMessage('bot', `✨ **Creating AI-powered Job Description for ${userContext.roleInput}**\n\n🔄 *Processing... This may take a moment*`);
              // Simulate AI JD creation
              setTimeout(() => {
                addMessage('bot', "✅ **Job Description Created!**\n\n📋 *AI has generated a comprehensive JD based on industry standards and role requirements.*", [
                  { id: 'view_jd', text: '👀 Preview JD', action: 'view_jd' },
                  { id: 'continue_to_services', text: '➡️ Continue', action: 'continue_to_services' }
                ], false);
              }, 2000);
              break;

            case 'upload_jd':
              setCurrentFlow('jobdesc');
              setShowJobDescModal(true);
              // addMessage('bot', "📤 **Upload Job Description**\n\n📎 Please upload your JD file (PDF, DOC, DOCX)", [
              //   { id: 'file_upload', text: '📁 Choose File', action: 'file_upload' },
              //   { id: 'continue_to_services', text: '⏭️ Skip Upload', action: 'continue_to_services' }
              // ]);
              break;

            case 'paste_jd':
              setCurrentFlow('jobdesc');
              setShowJobDescModal(true);
              // addMessage('bot', "📝 **Paste Job Description**\n\n✍️ Please paste your job description text below:");
              // setCurrentFlow('jd_text_input');
              break;


          }
        } else if (input === 'continue_to_services') {
          setCurrentFlow('services');
          addMessage('bot', "🎯 **Customize your AI recruitment experience!**\n\nSelect services you'd like to use:",
            services.map(service => ({
              id: service.id,
              text: service.name,
              action: `service_${service.id}`,
              desc: service.desc,
              color: service.color
            }))
          );
        }
        break;

      case 'jd_text_input':
        if (input.length > 10) {
          setUserContext(prev => ({ ...prev, jobDescription: input }));
          addMessage('bot', "✅ **Job Description Saved!**\n\n📄 *Your JD has been processed and will be used for precise candidate matching.*", [
            { id: 'continue_to_services', text: '➡️ Continue to Services', action: 'continue_to_services' }
          ]);
        } else {
          addMessage('bot', "⚠️ **Please provide a more detailed job description**\n\n*Minimum 10 characters required for effective matching.*");
        }
        break;

      // case 'services':
      //   if (input.startsWith('service_')) {
      //     const serviceId = input.replace('service_', '');
      //     const service = services.find(s => s.id === serviceId);

      //     setUserContext(prev => ({
      //       ...prev,
      //       selectedServices: prev.selectedServices.includes(serviceId)
      //         ? prev.selectedServices.filter(id => id !== serviceId)
      //         : [...prev.selectedServices, serviceId]
      //     }));

      //     const isSelected = !userContext.selectedServices.includes(serviceId);
      //     addMessage('bot', `${isSelected ? '✅' : '❌'} ${service.name} ${isSelected ? 'added' : 'removed'}!\n\n${service.desc}`, null, false);

      //     setTimeout(() => {
      //       const updatedServices = isSelected
      //         ? [...userContext.selectedServices, serviceId]
      //         : userContext.selectedServices.filter(id => id !== serviceId);

      //       if (updatedServices.length > 0) {
      //         addMessage('bot', `🎉 **${updatedServices.length} service${updatedServices.length > 1 ? 's' : ''} selected!**\n\nReady to proceed?`, [
      //           { id: 'continue_to_database', text: '⚡ Continue', action: 'continue_to_database' },
      //           { id: 'more', text: '➕ Add More', action: 'add_more' }
      //         ], false);
      //       }
      //     }, 400);
      //   } else if (input === 'continue_to_database') {
      //     setCurrentFlow('database');
      //     addMessage('bot', "🗄️ **Database Selection**\n\nChoose your candidate source:", [
      //       { id: 'db_external', text: '🌐 Connect with Job Board', action: 'db_external', desc: '50M+ verified profiles from job portals' },
      //       { id: 'db_own', text: '📁 Upload Resumes', action: 'db_own', desc: 'Upload your own resume collection' }
      //     ]);
      //   }
      //   break;

      case 'database':
        if (input === 'db_external' || input === 'db_own') {
          const dbType = input === 'db_external' ? '🌐 Connect with Job Board' : '📁 Upload Resumes';
          setUserContext(prev => ({ ...prev, selectedDatabase: input.replace('db_', '') }));

          if (input === 'db_own') {
            setShowUploadModal(true);

          } else {
            setCurrentFlow('screening');
            addMessage('bot', `🌐 **Using ${dbType}** with 50M+ verified profiles.\n\n🎯 Ready for AI screening?`, [
              { id: 'start_screening', text: '⚡ Start Screening', action: 'start_screening' },
              { id: 'preview', text: '🔍 Preview', action: 'preview' }
            ]);
          }
        }
        break;


      case 'screening':
        if (input === 'start_screening') {
          startScreeningProcess();
        } else if (input === 'preview') {
          addMessage('bot', "🔬 **AI Screening Process:**\n\n1. Resume parsing & extraction\n2. Skills analysis\n3. Job matching\n4. Compatibility scoring\n5. Candidate ranking\n\n⏱️ *Time: 2-3 minutes*\n🎯 *Expected matches: 15-30*", [
            { id: 'start_screening', text: '🚀 Begin', action: 'start_screening' }
          ]);
        }
        break;

      // case 'results':
      //   if (input === 'new_search') {
      //     resetChat();
      //   } else if (input === 'schedule_interviews') {
      //     addMessage('bot', "📅 **Interview Hub**\n\nStreamline your interview process:", [
      //       { id: 'send_invites', text: '📧 Send Invites', action: 'send_invites' },
      //       { id: 'interview_questions', text: '🧠 Generate Questions', action: 'interview_questions' },
      //       { id: 'schedule_calendar', text: '📅 Schedule', action: 'schedule_calendar' }
      //     ]);
      //   }
      //   break;

      default:
        addMessage('bot', "🤖 **How can I help with your hiring?**", [
          { id: 'start_over', text: '🔄 Start Over', action: 'start_over' }
        ]);
    }
  };

  const handleJobDescSubmit = () => {
    if (extractedContent.length > 10) {
      setUserContext(prev => ({ ...prev, jobDescription: extractedContent }));
      setShowJobDescModal(false);
      setCurrentFlow('database');

      addMessage('bot', `✅ **Job description saved!** Role: *${userContext.roleInput}*\n\n🗃️ **Choose candidate source:**`, [
        {
          id: 'external',
          text: '🌐 Connect with Job Board',
          action: 'db_external',
          desc: '50M+ verified profiles'
        },
        {
          id: 'own',
          text: '📁 Upload Resumes',
          action: 'db_own',
          desc: 'Upload existing resumes'
        }
      ], false);
    }
  };

  const handleJDFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setUploadError('');

    // Check file type
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'text/plain'
    ];

    if (!allowedTypes.includes(file.type)) {
      setUploadError('Please upload a PDF, DOC, DOCX, or TXT file');
      return;
    }

    // Check file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      setUploadError('File size must be less than 5MB');
      return;
    }

    setIsProcessingFile(true);
    setUploadedJD(file);

    try {
      // Create FormData for API upload
      const formData = new FormData();
      formData.append('job_description', file);

      // Upload to API
      const response = await fetch('https://newai-f7erata5gtcxhse4.canadacentral-01.azurewebsites.net/upload-job-descriptions', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error(`Upload failed: ${response.status}`);
      }

      const result = await response.json();

      console.log(result)

      // Extract the uploaded JD URL
      const jdUrl = result.job_descriptions?.[0];
      if (!jdUrl) {
        throw new Error('No job description URL returned from server');
      }

      // Store the URL and file info
      setExtractedContent(`Job Description uploaded successfully: ${file.name}\nURL: ${jdUrl}`);

      // Optional: Store the URL for later use
      setJdUrl(result?.job_descriptions); // Add this state if you need to store the URL

      // console.log('JD uploaded successfully:', { file: file.name, url: jdUrl });

    } catch (error) {
      console.error('Error uploading JD file:', error);
      setUploadError('Error uploading file. Please try again.');
      setUploadedJD(null);
    } finally {
      setIsProcessingFile(false);
    }
  };

  const handleFileUpload = async (e) => {
    const files = Array.from(e.target.files);

    if (files.length === 0) return;

    // Validate files before upload
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'text/plain'
    ];

    const invalidFiles = files.filter(file => !allowedTypes.includes(file.type));
    if (invalidFiles.length > 0) {
      setUploadError(`Invalid file types: ${invalidFiles.map(f => f.name).join(', ')}`);
      return;
    }

    const oversizedFiles = files.filter(file => file.size > 5 * 1024 * 1024);
    if (oversizedFiles.length > 0) {
      setUploadError(`Files too large (>5MB): ${oversizedFiles.map(f => f.name).join(', ')}`);
      return;
    }

    setIsProcessingFile?.(true);
    setUploadError('');

    try {
      // Create FormData for API upload
      const formData = new FormData();

      // Append all files as resumes
      files.forEach(file => {
        formData.append('resumes', file);
      });

      // Upload to API
      const response = await fetch('https://newai-f7erata5gtcxhse4.canadacentral-01.azurewebsites.net/upload-resumes', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error(`Upload failed: ${response.status}`);
      }

      const result = await response.json();
      console.log(result)

      // Process the uploaded resume URLs
      const resumeUrls = result.resumes || [];

      if (resumeUrls.length !== files.length) {
        console.warn('Mismatch between uploaded files and returned URLs');
      }

      // Create file objects with URLs
      const newFiles = files.map((file, index) => ({
        id: Date.now() + Math.random(),
        name: file.name,
        size: (file.size / 1024 / 1024).toFixed(2) + ' MB',
        type: file.type,
        url: resumeUrls[index] || null, // Store the S3 URL
        uploaded: true
      }));

      setUploadedFiles(prev => [...prev, ...newFiles]);
      setResumeUrl(result?.resumes)
      setUserContext(prev => ({
      ...prev,
      resumes: result?.resumes.length
    }));

    } catch (error) {
      console.error('Error uploading resume files:', error);
      setUploadError('Error uploading files. Please try again.');
    } finally {
      setIsProcessingFile?.(false);
    }
  };



  const clearUpload = () => {
    setUploadedJD(null);
    setExtractedContent('');
    setUploadError('');
  };


  // console.log(uploadedFiles);

  const removeFile = (fileId) => {
    setUploadedFiles(prev => prev.filter(file => file.id !== fileId));
  };

  const handleUploadComplete = () => {
    if (uploadedFiles.length > 0) {
      setShowUploadModal(false);
      setCurrentFlow('services_selection');


      // ], false);
      addMessage('bot', `📁 **${uploadedFiles.length} resumes uploaded!**\n\n🎯 **Select AI Services** you'd like to use for candidate processing:`,
        null, // No options here since we'll use checkboxes
        false
      );

      // Add the services selection message with checkboxes
      setTimeout(() => {
        addMessage('bot', '', null, false, false, true); // Add flag for services selection
      }, 500)
    }
  };

  const handleServiceToggle = (serviceId) => {
    setSelectedServices(prev =>
      prev.includes(serviceId)
        ? prev.filter(id => id !== serviceId)
        : [...prev, serviceId]
    );
    setUserContext(prev => ({
      ...prev,
      selectedServices: {
        ...prev.selectedServices,
        [serviceId]: !prev.selectedServices[serviceId]
      }
    }));
  };

  // Add this function to proceed with selected services
  const proceedWithServices = () => {
    if (selectedServices.length === 0) {
      addMessage('bot', "⚠️ **Please select at least one service** to continue with candidate processing.");
      return;
    }

    startScreeningProcess()
    // setCurrentFlow('screening');
    // const serviceNames = selectedServices.map(id =>
    //   services.find(s => s.id === id)?.name
    // ).join(', ');

    // addMessage('bot', `✅ **${selectedServices.length} services selected!**\n\n🔧 **Active Services:** ${serviceNames}\n\n🎯 Ready to start processing candidates?`, [
    //   { id: 'start_screening', text: '⚡ Start Processing', action: 'start_screening' },
    //   { id: 'preview', text: '🔍 Preview Setup', action: 'preview' }
    // ], false);
  };

  const startScreeningProcess = async () => {
    // Show AI loader popup immediately
    setShowAILoader(true);
    setUserContext(prev => ({ ...prev, screeningInProgress: true }));

    try {
      // Debug logging to see what we're actually sending
      console.log('resumeUrl type:', typeof resumeUrl);
      console.log('resumeUrl value:', resumeUrl);
      console.log('jDUrl type:', typeof jDUrl);
      console.log('jDUrl value:', jDUrl);

      const requestBody = {
        resumes: resumeUrl, // Should already be an array
        job_descriptions: [jDUrl],
        voice_interview_threshold: 3.0
      };

      console.log('Final request body:', JSON.stringify(requestBody, null, 2));

      const response = await fetch('https://newai-f7erata5gtcxhse4.canadacentral-01.azurewebsites.net/screen-candidates-from-urls/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
      });

      // console.log('Response status:', response.status);
      // console.log('Response headers:', response.headers);

      if (!response.ok) {
        // Get the full error response
        const errorText = await response.text();
        console.error('Full error response:', errorText);

        let errorData;
        try {
          errorData = JSON.parse(errorText);
        } catch (e) {
          errorData = { detail: errorText };
        }

        console.error('Parsed error data:', errorData);
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorData.detail || errorText}`);
      }

      const data = await response.json();
      console.log('Screening started successfully:', data);

      // Continue with the existing timeout logic
      setTimeout(() => {
        setShowAILoader(false);
        showDashboardView();
        addMessage('bot', '', null, false, true);

        setScreeningProgress({
          isActive: true,
          currentStep: 0,
          stepProgress: { 0: 0 },
          isComplete: false
        });

      }, 4000);

    } catch (error) {
      console.error('Detailed error information:');
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
      console.error('Error object:', error);

      setShowAILoader(false);
      setUserContext(prev => ({ ...prev, screeningInProgress: false }));

      // Show detailed error to user
      addMessage('bot', `Error starting screening: ${error.message}`, null, false, false);
    }
  };

  //   const startScreeningProcess = () => {
  //   // Show AI loader popup immediately
  //   setShowAILoader(true);
  //   setUserContext(prev => ({ ...prev, screeningInProgress: true }));


  //   setTimeout(() => {
  //     setShowAILoader(false);
  //     showDashboardView();
  //     // Now add the screening progress message and start actual screening
  //     addMessage('bot', '', null, false, true); // This adds the screening progress component

  //     // Initialize screening progress
  //     setScreeningProgress({
  //       isActive: true,
  //       currentStep: 0,
  //       stepProgress: { 0: 0 },
  //       isComplete: false
  //     });

  //   }, 4000); // Show loader popup for 4 seconds
  // };

  const AILoaderPopup = () => {
    const [currentMessage, setCurrentMessage] = useState(0);
    const [progress, setProgress] = useState(0);

    const loadingMessages = [
      "🧠 Initializing AI neural networks...",
      "🔍 Calibrating candidate matching algorithms...",
      "⚡ Optimizing screening parameters...",
      "🎯 Preparing intelligent analysis..."
    ];

    useEffect(() => {
      // Cycle through loading messages
      const messageInterval = setInterval(() => {
        setCurrentMessage(prev => (prev + 1) % loadingMessages.length);
      }, 800);

      // Simulate progress
      const progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 95) return 95; // Stop at 95% until actual completion
          return prev + Math.random() * 10;
        });
      }, 300);



      return () => {
        clearInterval(messageInterval);
        clearInterval(progressInterval);
      };
    }, []);

    // Complete progress when popup is about to close
    useEffect(() => {
      const timer = setTimeout(() => {
        setProgress(100);
      }, 3500); // Complete progress 500ms before popup closes

      return () => clearTimeout(timer);
    }, []);

    return (
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">
        <div className="bg-gradient-to-br from-slate-800/95 via-purple-900/95 to-slate-800/95 backdrop-blur-sm p-8 rounded-2xl border border-purple-500/30 shadow-2xl max-w-lg w-full mx-4 animate-scaleIn">

          {/* AI Brain Animation */}
          <div className="text-center mb-8">
            <div className="relative w-24 h-24 mx-auto mb-6">
              {/* Outer rotating ring */}
              <div className="absolute inset-0 rounded-full border-4 border-purple-500/20"></div>
              <div className="absolute inset-0 rounded-full border-4 border-purple-500 border-t-transparent animate-spin"></div>

              {/* Inner pulsing core */}
              <div className="absolute inset-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 animate-pulse flex items-center justify-center">
                <div className="absolute inset-1 rounded-full bg-slate-800/80 flex items-center justify-center">
                  <Bot className="w-8 h-8 text-purple-400 animate-bounce" />
                </div>
              </div>

              {/* Floating particles */}
              <div className="absolute -top-2 -right-2 w-3 h-3 bg-cyan-400 rounded-full animate-ping"></div>
              <div className="absolute -bottom-2 -left-2 w-2 h-2 bg-pink-400 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
              <div className="absolute top-1/2 -left-4 w-2 h-2 bg-purple-400 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
            </div>

            <h2 className="text-2xl font-bold text-white mb-2">
              🤖 AI Engine Initializing
            </h2>
            <p className="text-purple-200 text-sm mb-6">
              Preparing advanced recruitment intelligence...
            </p>
          </div>

          {/* Dynamic Loading Messages */}
          <div className="mb-6">
            <div className="bg-slate-800/50 rounded-lg p-4 border border-purple-500/20">
              <div className="flex items-center space-x-3">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-pink-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
                <span className="text-slate-200 text-sm font-medium animate-fadeIn" key={currentMessage}>
                  {loadingMessages[currentMessage]}
                </span>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-purple-200 text-sm font-medium">AI Initialization</span>
              <span className="text-purple-300 text-sm font-bold">{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-slate-700/50 rounded-full h-3 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 rounded-full transition-all duration-500 ease-out relative"
                style={{ width: `${progress}%` }}
              >
                <div className="absolute inset-0 bg-white/20 animate-shimmer"></div>
              </div>
            </div>
          </div>

          {/* Status Indicators */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="flex items-center space-x-2 text-green-400">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span>Neural Networks: Active</span>
            </div>
            <div className="flex items-center space-x-2 text-blue-400">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '0.3s' }}></div>
              <span>Algorithms: Calibrated</span>
            </div>
            <div className="flex items-center space-x-2 text-purple-400">
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '0.6s' }}></div>
              <span>Matching Engine: Ready</span>
            </div>
            <div className="flex items-center space-x-2 text-cyan-400">
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" style={{ animationDelay: '0.9s' }}></div>
              <span>Analytics: Online</span>
            </div>
          </div>
        </div>
      </div>
    );
  };







  const showDashboardView = () => {
    setActiveView('dashboard');
    setUserContext(prev => ({ ...prev, screeningInProgress: false, screeningComplete: true }));

    // Update chat history with current search
    const newChat = {
      id: Date.now(),
      title: `${userContext.roleInput} Search`,
      date: 'Just completed',
      preview: `Found ${analyticsData.overview.matchedCandidates} candidates with ${analyticsData.overview.avgCompatibility}% avg compatibility`,
      status: 'completed'
    };

    setChatHistory(prev => [newChat, ...prev]);
    setActiveChat(newChat.id);
  };


 

  // const ScreeningProgressComponent = () => {
  //   if (!screeningProgress.isActive && !screeningProgress.isComplete) return null;

  //   return (
  //     <div className="bg-gradient-to-br from-slate-800/50 via-purple-800/30 to-slate-800/50 backdrop-blur-sm rounded-xl border border-purple-500/20 shadow-2xl overflow-hidden">
  //       {/* Header */}
  //       <div className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 border-b border-purple-500/30 px-4 py-3">
  //         <div className="flex items-center justify-center space-x-2">
  //           <Bot className="w-5 h-5 text-purple-300" />
  //           <h3 className="text-sm font-bold text-purple-100">AI Screening in Progress</h3>
  //           <Activity className="w-4 h-4 text-purple-300 animate-pulse" />
  //         </div>
  //       </div>

  //       {/* Progress Steps Grid */}
  //       <div className="p-4 grid grid-cols-1 md:grid-cols-5 gap-3">
  //         {screeningSteps.map((step, index) => {
  //           const status = getStepStatus(index);
  //           const progress = screeningProgress.stepProgress[index] || 0;
  //           const Icon = step.icon;

  //           return (
  //             <div
  //               key={step.id}
  //               className={`rounded-lg border transition-all duration-500 ${status === 'completed'
  //                   ? 'border-green-400/50 bg-gradient-to-br from-green-900/30 to-emerald-900/20'
  //                   : status === 'active'
  //                     ? 'border-purple-400/50 bg-gradient-to-br from-purple-900/40 to-pink-900/30 shadow-lg shadow-purple-500/20'
  //                     : 'border-slate-600/30 bg-gradient-to-br from-slate-800/30 to-slate-700/20'
  //                 }`}
  //             >
  //               <div className="p-3">
  //                 <div className="flex flex-col items-center space-y-2">
  //                   <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${status === 'completed'
  //                       ? 'bg-gradient-to-br from-green-500 to-emerald-600 text-white shadow-lg shadow-green-500/30'
  //                       : status === 'active'
  //                         ? `bg-gradient-to-br ${step.color} text-white shadow-lg shadow-purple-500/40`
  //                         : 'bg-slate-700 text-slate-400'
  //                     }`}>
  //                     {status === 'completed' ? (
  //                       <Check className="w-5 h-5" />
  //                     ) : (
  //                       <Icon className={`w-5 h-5 ${status === 'active' ? 'animate-pulse' : ''}`} />
  //                     )}
  //                   </div>

  //                   <div className="text-center">
  //                     <h4 className={`text-xs font-medium ${status === 'completed'
  //                         ? 'text-green-300'
  //                         : status === 'active'
  //                           ? 'text-purple-200'
  //                           : 'text-slate-400'
  //                       }`}>
  //                       {step.title}
  //                     </h4>

  //                     {status === 'active' && (
  //                       <span className="text-xs font-bold text-purple-300 mt-1 block">
  //                         {Math.round(progress)}%
  //                       </span>
  //                     )}

  //                     {status === 'completed' && (
  //                       <span className="text-xs text-green-400 mt-1 block">Complete</span>
  //                     )}
  //                   </div>

  //                   <div className="w-full bg-slate-700/50 rounded-full h-1">
  //                     <div
  //                       className={`h-full transition-all duration-500 rounded-full ${status === 'completed'
  //                           ? 'bg-gradient-to-r from-green-500 to-emerald-500'
  //                           : status === 'active'
  //                             ? `bg-gradient-to-r ${step.color}`
  //                             : 'bg-slate-600'
  //                         }`}
  //                       style={{
  //                         width: status === 'completed' ? '100%' : status === 'active' ? `${progress}%` : '0%'
  //                       }}
  //                     />
  //                   </div>
  //                 </div>
  //               </div>
  //             </div>
  //           );
  //         })}
  //       </div>

  //       {/* Completion */}
  //       {screeningProgress.isComplete && (
  //         <div className="border-t border-purple-500/20 bg-gradient-to-r from-green-900/40 to-emerald-900/30 px-4 py-3">
  //           <div className="flex items-center justify-center space-x-2">
  //             <Sparkles className="w-5 h-5 text-green-400" />
  //             <span className="text-sm font-bold text-green-300">Screening Complete! Top matches identified</span>
  //             <Zap className="w-4 h-4 text-yellow-400" />
  //           </div>
  //         </div>
  //       )}
  //     </div>
  //   );
  // };


  // useEffect(() => {
  //   if (!screeningProgress.isActive || screeningProgress.isComplete) {
  //       return; // Don't start interval if not active or already complete
  //     }
  //     const interval = setInterval(() => {
  //       setScreeningProgress(prev => {
  //         if (prev.isComplete) return prev;

  //         const currentStepProgress = prev.stepProgress[prev.currentStep] || 0;
  //         if (currentStepProgress >= 100) {
  //           if (prev.currentStep >= screeningSteps.length - 1) {
  //             return { ...prev, isComplete: true };
  //           }
  //           return {
  //             ...prev,
  //             currentStep: prev.currentStep + 1,
  //             stepProgress: prev.stepProgress.map((p, i) => 
  //               i <= prev.currentStep ? 100 : 0
  //             )
  //           };
  //         }

  //         const newProgress = [...prev.stepProgress];
  //         newProgress[prev.currentStep] = Math.min(100, currentStepProgress + 2);

  //         return { ...prev, stepProgress: newProgress };
  //       });
  //     }, 100);

  //     return () => clearInterval(interval);
  //   }, [screeningProgress.isActive]);


  // const ScreeningProgressComponent = () => {
  //   const canvasRef = useRef(null);
  //   const animationRef = useRef(null);
  //   const [hoveredStep, setHoveredStep] = useState(null);


  //   const screeningSteps = [
  //     { id: 'parse', title: 'Resume Parsing', icon: Search, color: 'from-blue-500 to-cyan-500' },
  //     { id: 'analyze', title: 'Skills Analysis', icon: Brain, color: 'from-purple-500 to-pink-500' },
  //     { id: 'match', title: 'AI Matching', icon: Target, color: 'from-green-500 to-emerald-500' },
  //     { id: 'score', title: 'Compatibility Score', icon: Activity, color: 'from-orange-500 to-red-500' },
  //     { id: 'rank', title: 'Final Ranking', icon: Sparkles, color: 'from-pink-500 to-purple-500' }
  //   ];

  //   const getStepStatus = (index) => {
  //     if (index < screeningProgress.currentStep) return 'completed';
  //     if (index === screeningProgress.currentStep) return 'active';
  //     return 'pending';
  //   };

  //   useEffect(() => {
  //     const canvas = canvasRef.current;
  //     if (!canvas) return;

  //     const ctx = canvas.getContext('2d');
  //     let animationTime = 0;

  //     const resizeCanvas = () => {
  //       const rect = canvas.getBoundingClientRect();
  //       canvas.width = rect.width * window.devicePixelRatio;
  //       canvas.height = rect.height * window.devicePixelRatio;
  //       ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
  //       canvas.style.width = rect.width + 'px';
  //       canvas.style.height = rect.height + 'px';
  //     };

  //     resizeCanvas();
  //     window.addEventListener('resize', resizeCanvas);

  //     const drawArrow = (x1, y1, x2, y2, progress, isActive) => {
  //       const angle = Math.atan2(y2 - y1, x2 - x1);
  //       const length = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
  //       const progressLength = length * progress;

  //       // Create gradient
  //       const gradient = ctx.createLinearGradient(x1, y1, x2, y2);
  //       if (isActive) {
  //         gradient.addColorStop(0, '#8b5cf6');
  //         gradient.addColorStop(0.5, '#ec4899');
  //         gradient.addColorStop(1, '#06b6d4');
  //       } else {
  //         gradient.addColorStop(0, '#10b981');
  //         gradient.addColorStop(1, '#059669');
  //       }

  //       ctx.strokeStyle = gradient;
  //       ctx.lineWidth = 3;
  //       ctx.lineCap = 'round';

  //       // Draw main line with progress
  //       ctx.beginPath();
  //       ctx.moveTo(x1, y1);
  //       ctx.lineTo(x1 + Math.cos(angle) * progressLength, y1 + Math.sin(angle) * progressLength);
  //       ctx.stroke();

  //       // Draw animated particles on active arrows
  //       if (isActive && progress > 0) {
  //         const particleCount = 3;
  //         for (let i = 0; i < particleCount; i++) {
  //           const particleProgress = ((animationTime * 0.01 + i * 0.3) % 1);
  //           const particleX = x1 + Math.cos(angle) * progressLength * particleProgress;
  //           const particleY = y1 + Math.sin(angle) * progressLength * particleProgress;

  //           ctx.beginPath();
  //           ctx.arc(particleX, particleY, 2, 0, Math.PI * 2);
  //           ctx.fillStyle = '#fbbf24';
  //           ctx.fill();
  //         }
  //       }

  //       // Draw arrowhead if progress is complete
  //       if (progress >= 0.95) {
  //         const arrowSize = 8;
  //         const arrowX = x1 + Math.cos(angle) * progressLength;
  //         const arrowY = y1 + Math.sin(angle) * progressLength;

  //         ctx.beginPath();
  //         ctx.moveTo(arrowX, arrowY);
  //         ctx.lineTo(
  //           arrowX - Math.cos(angle - Math.PI / 6) * arrowSize,
  //           arrowY - Math.sin(angle - Math.PI / 6) * arrowSize
  //         );
  //         ctx.moveTo(arrowX, arrowY);
  //         ctx.lineTo(
  //           arrowX - Math.cos(angle + Math.PI / 6) * arrowSize,
  //           arrowY - Math.sin(angle + Math.PI / 6) * arrowSize
  //         );
  //         ctx.stroke();
  //       }
  //     };

  //     const drawStep = (x, y, step, index, isHovered) => {
  //       const status = getStepStatus(index);
  //       const radius = isHovered ? 35 : 30;
  //       const pulseRadius = radius + Math.sin(animationTime * 0.05) * 3;

  //       // Outer glow for active steps
  //       if (status === 'active') {
  //         ctx.beginPath();
  //         ctx.arc(x, y, pulseRadius, 0, Math.PI * 2);
  //         const glowGradient = ctx.createRadialGradient(x, y, 0, x, y, pulseRadius);
  //         glowGradient.addColorStop(0, 'rgba(139, 92, 246, 0.4)');
  //         glowGradient.addColorStop(1, 'rgba(139, 92, 246, 0)');
  //         ctx.fillStyle = glowGradient;
  //         ctx.fill();
  //       }

  //       // Main circle
  //       ctx.beginPath();
  //       ctx.arc(x, y, radius, 0, Math.PI * 2);

  //       let gradient;
  //       if (status === 'completed') {
  //         gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
  //         gradient.addColorStop(0, '#10b981');
  //         gradient.addColorStop(1, '#059669');
  //       } else if (status === 'active') {
  //         gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
  //         gradient.addColorStop(0, '#8b5cf6');
  //         gradient.addColorStop(1, '#ec4899');
  //       } else {
  //         gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
  //         gradient.addColorStop(0, '#374151');
  //         gradient.addColorStop(1, '#1f2937');
  //       }

  //       ctx.fillStyle = gradient;
  //       ctx.fill();

  //       // Border
  //       ctx.strokeStyle = status === 'completed' ? '#10b981' : status === 'active' ? '#8b5cf6' : '#4b5563';
  //       ctx.lineWidth = 2;
  //       ctx.stroke();

  //       // Progress arc for active step
  //       if (status === 'active') {
  //         const progress = screeningProgress.stepProgress[index] || 0;
  //         const progressAngle = (progress / 100) * Math.PI * 2 - Math.PI / 2;

  //         ctx.beginPath();
  //         ctx.arc(x, y, radius + 5, -Math.PI / 2, progressAngle);
  //         ctx.strokeStyle = '#fbbf24';
  //         ctx.lineWidth = 3;
  //         ctx.stroke();
  //       }
  //     };

  //     const animate = () => {
  //       const rect = canvas.getBoundingClientRect();
  //       ctx.clearRect(0, 0, rect.width, rect.height);

  //       const centerY = rect.height / 2;
  //       const stepWidth = rect.width / (screeningSteps.length + 1);

  //       // Draw connections and arrows
  //       for (let i = 0; i < screeningSteps.length - 1; i++) {
  //         const x1 = stepWidth * (i + 1);
  //         const x2 = stepWidth * (i + 2);
  //         const status1 = getStepStatus(i);
  //         const status2 = getStepStatus(i + 1);

  //         let arrowProgress = 0;
  //         if (status1 === 'completed') {
  //           arrowProgress = 1;
  //         } else if (status1 === 'active') {
  //           arrowProgress = (screeningProgress.stepProgress[i] || 0) / 100;
  //         }

  //         drawArrow(x1 + 30, centerY, x2 - 30, centerY, arrowProgress, status1 === 'active');
  //       }

  //       // Draw steps
  //       screeningSteps.forEach((step, index) => {
  //         const x = stepWidth * (index + 1);
  //         const isHovered = hoveredStep === index;
  //         drawStep(x, centerY, step, index, isHovered);
  //       });

  //       animationTime++;
  //       animationRef.current = requestAnimationFrame(animate);
  //     };

  //     animate();

  //     return () => {
  //       window.removeEventListener('resize', resizeCanvas);
  //       if (animationRef.current) {
  //         cancelAnimationFrame(animationRef.current);
  //       }
  //     };
  //   }, [screeningProgress, hoveredStep]);

  //   const handleCanvasClick = (event) => {
  //     const canvas = canvasRef.current;
  //     const rect = canvas.getBoundingClientRect();
  //     const x = event.clientX - rect.left;
  //     const y = event.clientY - rect.top;

  //     const centerY = rect.height / 2;
  //     const stepWidth = rect.width / (screeningSteps.length + 1);

  //     screeningSteps.forEach((step, index) => {
  //       const stepX = stepWidth * (index + 1);
  //       const distance = Math.sqrt((x - stepX) ** 2 + (y - centerY) ** 2);

  //       if (distance <= 35) {
  //         // Simulate step activation for demo
  //         if (index < screeningProgress.currentStep) return;

  //         setScreeningProgress(prev => ({
  //           ...prev,
  //           currentStep: index,
  //           stepProgress: prev.stepProgress.map((p, i) =>
  //             i < index ? 100 : i === index ? 0 : 0
  //           )
  //         }));
  //       }
  //     });
  //   };

  //   const handleCanvasMouseMove = (event) => {
  //     const canvas = canvasRef.current;
  //     const rect = canvas.getBoundingClientRect();
  //     const x = event.clientX - rect.left;
  //     const y = event.clientY - rect.top;

  //     const centerY = rect.height / 2;
  //     const stepWidth = rect.width / (screeningSteps.length + 1);

  //     let hoveredIndex = null;
  //     screeningSteps.forEach((step, index) => {
  //       const stepX = stepWidth * (index + 1);
  //       const distance = Math.sqrt((x - stepX) ** 2 + (y - centerY) ** 2);

  //       if (distance <= 35) {
  //         hoveredIndex = index;
  //       }
  //     });

  //     setHoveredStep(hoveredIndex);
  //     canvas.style.cursor = hoveredIndex !== null ? 'pointer' : 'default';
  //   };



  //   return (
  //     <div className="bg-gradient-to-br from-slate-800/50 via-purple-800/30 to-slate-800/50 backdrop-blur-sm rounded-xl border border-purple-500/20 shadow-2xl overflow-hidden">
  //       {/* Header */}
  //       <div className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 border-b border-purple-500/30 px-4 py-3">
  //         <div className="flex items-center justify-center space-x-2">
  //           <Bot className="w-5 h-5 text-purple-300" />
  //           <h3 className="text-sm font-bold text-purple-100">AI Screening Pipeline</h3>
  //           <Activity className="w-4 h-4 text-purple-300 animate-pulse" />
  //         </div>
  //       </div>

  //       {/* Interactive Canvas */}
  //       <div className="relative h-40 p-4">
  //         <canvas
  //           ref={canvasRef}
  //           className="w-full h-full"
  //           onClick={handleCanvasClick}
  //           onMouseMove={handleCanvasMouseMove}
  //         />
  //       </div>

  //       {/* Step Details */}
  //       <div className="px-4 pb-4">
  //         <div className="grid grid-cols-5 gap-2 text-center">
  //           {screeningSteps.map((step, index) => {
  //             const status = getStepStatus(index);
  //             const Icon = step.icon;

  //             return (
  //               <div key={step.id} className="flex flex-col items-center space-y-1">
  //                 <div className={`text-xs font-medium transition-colors duration-200 ${status === 'completed' ? 'text-green-300' :
  //                     status === 'active' ? 'text-purple-200' : 'text-slate-400'
  //                   }`}>
  //                   {step.title}
  //                 </div>
  //                 {status === 'active' && (
  //                   <div className="text-xs text-purple-300 font-bold">
  //                     {Math.round(screeningProgress.stepProgress[index] || 0)}%
  //                   </div>
  //                 )}
  //                 {status === 'completed' && (
  //                   <div className="text-xs text-green-400">✓ Complete</div>
  //                 )}
  //               </div>
  //             );
  //           })}
  //         </div>
  //       </div>

  //       {/* Completion */}
  //       {screeningProgress.isComplete && (
  //         <div className="border-t border-purple-500/20 bg-gradient-to-r from-green-900/40 to-emerald-900/30 px-4 py-3">
  //           <div className="flex items-center justify-center space-x-2">
  //             <Sparkles className="w-5 h-5 text-green-400" />
  //             <span className="text-sm font-bold text-green-300">Screening Complete! Top matches identified</span>
  //             <Zap className="w-4 h-4 text-yellow-400" />
  //           </div>
  //         </div>
  //       )}
  //     </div>
  //   );
  // };

  const ScreeningProgressComponent = () => {
  // const [screeningProgress, setScreeningProgress] = useState({
  //   currentStep: 0,
  //   isComplete: false
  // });

  const screeningSteps = [
    { 
      id: 'parse', 
      title: 'Resume Parsing', 
      subtitle: 'Extracting key information',
      icon: Search, 
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-500/20',
      borderColor: 'border-blue-500/40',
      glowColor: 'shadow-blue-500/30'
    },
    { 
      id: 'analyze', 
      title: 'Skills Analysis', 
      subtitle: 'Evaluating competencies',
      icon: Brain, 
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-500/20',
      borderColor: 'border-purple-500/40',
      glowColor: 'shadow-purple-500/30'
    },
    { 
      id: 'match', 
      title: 'AI Matching', 
      subtitle: 'Comparing with requirements',
      icon: Target, 
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-500/20',
      borderColor: 'border-green-500/40',
      glowColor: 'shadow-green-500/30'
    },
    { 
      id: 'score', 
      title: 'Compatibility Score', 
      subtitle: 'Calculating match percentage',
      icon: Activity, 
      color: 'from-orange-500 to-red-500',
      bgColor: 'bg-orange-500/20',
      borderColor: 'border-orange-500/40',
      glowColor: 'shadow-orange-500/30'
    },
    { 
      id: 'rank', 
      title: 'Final Ranking', 
      subtitle: 'Generating candidate list',
      icon: Sparkles, 
      color: 'from-pink-500 to-purple-500',
      bgColor: 'bg-pink-500/20',
      borderColor: 'border-pink-500/40',
      glowColor: 'shadow-pink-500/30'
    }
  ];

  const getStepStatus = (index) => {
    if (index < screeningProgress.currentStep) return 'completed';
    if (index === screeningProgress.currentStep) return 'active';
    return 'pending';
  };

  // Auto-progress simulation
  useEffect(() => {
    if (screeningProgress.isComplete) return;

    const timer = setTimeout(() => {
      setScreeningProgress(prev => {
        if (prev.currentStep < screeningSteps.length - 1) {
          return {
            ...prev,
            currentStep: prev.currentStep + 1
          };
        } else {
          return {
            ...prev,
            isComplete: true
          };
        }
      });
    }, 3000); // Each step takes 3 seconds

    return () => clearTimeout(timer);
  }, [screeningProgress.currentStep, screeningProgress.isComplete]);

  const handleStepClick = (index) => {
    if (index <= screeningProgress.currentStep) {
      setScreeningProgress(prev => ({
        ...prev,
        currentStep: index,
        isComplete: false
      }));
    }
  };

  return (
    <div className="bg-gradient-to-br from-slate-900/90 via-purple-900/40 to-slate-900/90 backdrop-blur-xl rounded-2xl border border-purple-500/30 shadow-2xl overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-900/60 to-pink-900/50 border-b border-purple-500/30 px-6 py-4">
        <div className="flex items-center justify-center space-x-3">
          <Bot className="w-6 h-6 text-purple-300" />
          <h3 className="text-lg font-bold bg-gradient-to-r from-purple-200 to-pink-200 bg-clip-text text-transparent">
            AI Screening Pipeline
          </h3>
          <Activity className="w-5 h-5 text-purple-300 animate-pulse" />
        </div>
      </div>

      {/* Progress Steps */}
      <div className="p-6">
        <div className="relative">
          {/* Progress Line */}
          <div className="absolute top-16 left-0 right-0 h-1 bg-slate-700/50 rounded-full">
            <div 
              className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-1000 ease-out"
              style={{ 
                width: `${((screeningProgress.currentStep + (screeningProgress.isComplete ? 1 : 0)) / screeningSteps.length) * 100}%` 
              }}
            />
          </div>

          {/* Steps */}
          <div className="grid grid-cols-5 gap-4">
            {screeningSteps.map((step, index) => {
              const status = getStepStatus(index);
              const Icon = step.icon;

              return (
                <div 
                  key={step.id} 
                  className={`relative flex flex-col items-center cursor-pointer group transition-all duration-300 ${
                    status !== 'pending' ? 'hover:scale-105' : ''
                  }`}
                  onClick={() => handleStepClick(index)}
                >
                  {/* Step Circle */}
                  <div className={`relative w-16 h-16 rounded-full border-2 transition-all duration-500 ${
                    status === 'completed' 
                      ? 'bg-gradient-to-br from-green-500 to-emerald-600 border-green-400 shadow-lg shadow-green-500/30' 
                      : status === 'active' 
                        ? `bg-gradient-to-br ${step.color} border-white/50 shadow-xl ${step.glowColor} animate-pulse`
                        : 'bg-slate-700/50 border-slate-600 hover:border-slate-500'
                  } flex items-center justify-center`}>
                    
                    {/* Loading Spinner for Active Step */}
                    {status === 'active' && (
                      <div className="absolute inset-0 rounded-full">
                        <div className="w-full h-full border-4 border-transparent border-t-white/80 border-r-white/60 rounded-full animate-spin" />
                      </div>
                    )}

                    {/* Icon */}
                    {status === 'completed' ? (
                      <CheckCircle className="w-8 h-8 text-white" />
                    ) : status === 'active' ? (
                      <Icon className="w-7 h-7 text-white animate-bounce" />
                    ) : (
                      <Icon className={`w-6 h-6 ${status === 'pending' ? 'text-slate-400' : 'text-white'}`} />
                    )}

                    {/* Step Number */}
                    <div className={`absolute -top-2 -right-2 w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center ${
                      status === 'completed' 
                        ? 'bg-green-500 text-white' 
                        : status === 'active'
                          ? 'bg-white text-purple-600'
                          : 'bg-slate-600 text-slate-300'
                    }`}>
                      {index + 1}
                    </div>
                  </div>

                  {/* Step Info */}
                  <div className="mt-4 text-center space-y-1">
                    <h4 className={`font-semibold text-sm transition-colors duration-300 ${
                      status === 'completed' 
                        ? 'text-green-300' 
                        : status === 'active' 
                          ? 'text-white' 
                          : 'text-slate-400'
                    }`}>
                      {step.title}
                    </h4>
                    <p className={`text-xs transition-colors duration-300 ${
                      status === 'completed' 
                        ? 'text-green-400/80' 
                        : status === 'active' 
                          ? 'text-purple-200' 
                          : 'text-slate-500'
                    }`}>
                      {step.subtitle}
                    </p>
                  </div>

                  {/* Status Indicator */}
                  <div className="mt-2 flex items-center space-x-1">
                    {status === 'completed' && (
                      <div className="flex items-center space-x-1 text-green-400">
                        <CheckCircle className="w-3 h-3" />
                        <span className="text-xs font-medium">Complete</span>
                      </div>
                    )}
                    {status === 'active' && (
                      <div className="flex items-center space-x-1 text-purple-300">
                        <Loader2 className="w-3 h-3 animate-spin" />
                        <span className="text-xs font-medium">Processing...</span>
                      </div>
                    )}
                    {status === 'pending' && (
                      <div className="flex items-center space-x-1 text-slate-500">
                        <Clock className="w-3 h-3" />
                        <span className="text-xs">Waiting</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Completion Banner */}
      {screeningProgress.isComplete && (
        <div className="border-t border-purple-500/20 bg-gradient-to-r from-green-900/50 to-emerald-900/40 px-6 py-4 animate-fadeIn">
          <div className="flex items-center justify-center space-x-3">
            <Sparkles className="w-6 h-6 text-green-400 animate-bounce" />
            <span className="text-lg font-bold bg-gradient-to-r from-green-300 to-emerald-300 bg-clip-text text-transparent">
              🎉 Screening Complete! Top candidates identified
            </span>
            <Zap className="w-5 h-5 text-yellow-400 animate-pulse" />
          </div>
          <div className="mt-2 text-center">
            <button className="px-6 py-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
              View Results
            </button>
          </div>
        </div>
      )}

     
    </div>
  );
};






  const CandidateCard = ({ candidate }) => (
    <div className="bg-gradient-to-br from-slate-800/50 via-purple-800/20 to-slate-800/50 backdrop-blur-sm rounded-xl border border-purple-500/20 p-4 hover:shadow-xl hover:shadow-purple-500/20 transition-all duration-300 hover:scale-105">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-xl shadow-lg">
            {candidate.avatar}
          </div>
          <div>
            <h3 className="font-semibold text-white">{candidate.name}</h3>
            <p className="text-sm text-purple-200">{candidate.role}</p>
            <div className="flex items-center space-x-2 mt-1">
              <MapPin className="w-3 h-3 text-purple-300" />
              <span className="text-xs text-purple-300">{candidate.location}</span>
              <Clock className="w-3 h-3 text-purple-300 ml-2" />
              <span className="text-xs text-purple-300">{candidate.experience}</span>
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className="flex items-center space-x-1">
            <div className={`w-3 h-3 rounded-full ${candidate.compatibility >= 95 ? 'bg-green-500' : candidate.compatibility >= 90 ? 'bg-yellow-500' : 'bg-red-500'} shadow-lg`}></div>
            <span className="text-sm font-bold text-white">{candidate.compatibility}%</span>
          </div>
          <p className="text-xs text-purple-300 mt-1">AI Match</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-3">
        {candidate.skills.slice(0, 4).map((skill, index) => (
          <span key={index} className="px-2 py-1 bg-gradient-to-r from-purple-600/50 to-pink-600/50 text-purple-100 text-xs rounded-full border border-purple-400/30">
            {skill}
          </span>
        ))}
        {candidate.skills.length > 4 && (
          <span className="px-2 py-1 bg-slate-700/50 text-slate-300 text-xs rounded-full border border-slate-600/30">
            +{candidate.skills.length - 4} more
          </span>
        )}
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-1">
          <DollarSign className="w-3 h-3 text-green-400" />
          <span className="text-xs text-green-300 font-medium">{candidate.salary}</span>
        </div>
        <div className="flex space-x-1">
          <button className="p-1.5 text-purple-300 hover:text-purple-100 hover:bg-purple-600/30 rounded-lg transition-colors">
            <Mail className="w-4 h-4" />
          </button>
          <button className="p-1.5 text-purple-300 hover:text-purple-100 hover:bg-purple-600/30 rounded-lg transition-colors">
            <Phone className="w-4 h-4" />
          </button>
          <button className="p-1.5 text-purple-300 hover:text-purple-100 hover:bg-purple-600/30 rounded-lg transition-colors">
            <Globe className="w-4 h-4" />
          </button>
          <button className="p-1.5 text-green-400 hover:text-green-300 hover:bg-green-600/30 rounded-lg transition-colors">
            <Eye className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );


  const DashboardView = () => (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-y-auto">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">AI Talent Analytics</h1>
                <p className="text-purple-200">Intelligent candidate screening powered by AI</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-purple-300">
              <Target className="w-4 h-4" />
              <span className="text-sm">Role: {userContext.roleInput}</span>
            </div>
          </div>
          <div className="flex space-x-3">
            <button className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 flex items-center space-x-2 shadow-lg shadow-purple-500/25 transition-all duration-200">
              <Download className="w-4 h-4" />
              <span>Export Report</span>
            </button>
            <button onClick={() => setActiveView('chat')} className="px-4 py-2 bg-slate-800/50 border border-purple-500/30 text-purple-200 rounded-lg hover:bg-slate-700/50 flex items-center space-x-2 transition-all duration-200">
              <ArrowRight className="w-4 h-4 rotate-180" />
              <span>Back to Chat</span>
            </button>
          </div>
        </div>

        {/* Screening Progress */}
        <div className="mb-8">
          <ScreeningProgressComponent />
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gradient-to-br from-slate-800/50 via-purple-800/20 to-slate-800/50 backdrop-blur-sm p-6 rounded-xl border border-purple-500/20 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-purple-300">Total Candidates</p>
                <p className="text-3xl font-bold text-white">{analyticsData.overview.totalCandidates}</p>
                <p className="text-xs text-green-400 mt-1">↑ 23% vs last search</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-slate-800/50 via-green-800/20 to-slate-800/50 backdrop-blur-sm p-6 rounded-xl border border-green-500/20 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-300">AI Matched</p>
                <p className="text-3xl font-bold text-white">{analyticsData.overview.matchedCandidates}</p>
                <p className="text-xs text-green-400 mt-1">High-quality matches</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                <Target className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-slate-800/50 via-orange-800/20 to-slate-800/50 backdrop-blur-sm p-6 rounded-xl border border-orange-500/20 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-orange-300">Avg. Compatibility</p>
                <p className="text-3xl font-bold text-white">{analyticsData.overview.avgCompatibility}%</p>
                <p className="text-xs text-orange-400 mt-1">AI-powered scoring</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
                <Award className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-slate-800/50 via-pink-800/20 to-slate-800/50 backdrop-blur-sm p-6 rounded-xl border border-pink-500/20 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-pink-300">Processing Time</p>
                <p className="text-3xl font-bold text-white">{analyticsData.overview.processingTime}</p>
                <p className="text-xs text-pink-400 mt-1">Lightning fast AI</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-purple-500 rounded-xl flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Top Candidates */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <h2 className="text-2xl font-bold text-white">Top AI Matches</h2>
              <div className="px-3 py-1 bg-gradient-to-r from-purple-600/50 to-pink-600/50 text-purple-100 text-xs rounded-full border border-purple-400/30">
                Smart Ranked
              </div>
            </div>
            <div className="flex space-x-2">
              <button className="p-2 bg-slate-800/50 border border-purple-500/30 rounded-lg hover:bg-slate-700/50 text-purple-200 transition-colors">
                <Filter className="w-4 h-4" />
              </button>
              <button className="p-2 bg-slate-800/50 border border-purple-500/30 rounded-lg hover:bg-slate-700/50 text-purple-200 transition-colors">
                <Search className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {analyticsData.topCandidates.map((candidate) => (
              <CandidateCard key={candidate.id} candidate={candidate} />
            ))}
          </div>
        </div>

        {/* Analytics Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-slate-800/50 via-purple-800/20 to-slate-800/50 backdrop-blur-sm p-6 rounded-xl border border-purple-500/20 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Skills Intelligence</h3>
              <BarChart3 className="w-5 h-5 text-purple-300" />
            </div>
            <div className="space-y-4">
              {analyticsData.skillsDistribution.map((skill, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm font-medium text-purple-200">{skill.skill}</span>
                  <div className="flex items-center space-x-3">
                    <div className="w-32 bg-slate-700/50 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${skill.percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-purple-300 w-8 text-right">{skill.count}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-slate-800/50 via-blue-800/20 to-slate-800/50 backdrop-blur-sm p-6 rounded-xl border border-blue-500/20 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Geographic Distribution</h3>
              <Globe className="w-5 h-5 text-blue-300" />
            </div>
            <div className="space-y-4">
              {analyticsData.locationDistribution.map((location, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm font-medium text-blue-200">{location.location}</span>
                  <div className="flex items-center space-x-3">
                    <div className="w-32 bg-slate-700/50 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${location.percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-blue-300 w-8 text-right">{location.count}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );


  const resetChat = () => {
    setCurrentFlow('welcome');
    setScreeningProgress({
      isActive: false,
      currentStep: -1,
      stepProgress: {},
      isComplete: false
    });
    setUserContext({
      selectedServices: [],
      roleInput: '',
      jobDescription: '',
      selectedDatabase: '',
      screeningInProgress: false,
      screeningComplete: false
    });
    setJobDescription('');
    setUploadedFiles([]);

    setMessages([
      {
        id: 1,
        type: 'bot',
        content: "👋 **Welcome back!** Ready to find your next star employee?",
        timestamp: new Date(),
        showOptions: true,
        options: [
          { id: 'start', text: '🚀 Start Search', action: 'start' },
          { id: 'learn', text: '✨ Features', action: 'learn' }
        ]
      }
    ]);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatMessage = (content) => {
    const parts = content.split('\n');
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <div key={index} className="font-bold text-white-900 mt-1 mb-1 text-sm">{part.slice(2, -2)}</div>;
      } else if (part.startsWith('*') && part.endsWith('*') && !part.startsWith('**')) {
        return <div key={index} className="italic text--600 font-medium text-xs">{part.slice(1, -1)}</div>;
      } else if (part.startsWith('•')) {
        return <div key={index} className="ml-2 text--700 flex items-start text-xs"><span className="mr-1">•</span><span>{part.slice(2)}</span></div>;
      } else if (part.trim() === '') {
        return <div key={index} className="h-1"></div>;
      } else {
        return <div key={index} className="text--700 text-xs">{part}</div>;
      }
    });
  };

  const startNewChat = () => {
    const newChatId = Date.now();
    const newTitle = `New Search ${chatHistory.length + 1}`;

    setChatHistory(prev => [
      { id: newChatId, title: newTitle, date: 'Just now', preview: 'Starting new recruitment search...' },
      ...prev
    ]);
    setActiveChat(newChatId);
    setActiveScreeningChatId(newChatId);
    setActiveView('chat');
    resetChat();
  };

  const selectChat = (chatId) => {
    setActiveChat(chatId);
    // setActiveView('dashboard');
    if (chatId === activeScreeningChatId && !userContext.screeningComplete) {
    // This is an ongoing screening - show chat interface
    setActiveView('chat');
  } else {
    // This is completed chat history - show dashboard
    setActiveView('dashboard');
     const selectedChat = chatHistory.find(chat => chat.id === chatId);
    
    //  if (selectedChat && selectedChat.dashboardData) {
     if (selectedChat) {

    // Set all dashboard-specific states
    // setDashboardData(selectedChat.dashboardData);
    
    // // Update individual dashboard states
    // setJobInfo(selectedChat.dashboardData.jobInfo);
    // setScreeningStats(selectedChat.dashboardData.screeningStats);
    // setTopCandidates(selectedChat.dashboardData.topCandidates);
    // setSkillsAnalysis(selectedChat.dashboardData.skillsAnalysis);
    // setAnalytics(selectedChat.dashboardData.analytics);
    // setRecommendations(selectedChat.dashboardData.recommendations);
    
    // Update user context for consistency
    setUserContext(prev => ({ ...prev, roleInput: selectedChat.title }));
  }
  }
    // In a real app, you'd load the chat history here
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Sidebar */}

      <div className={`${showSidebar ? 'w-72' : 'w-0'} transition-all duration-300 overflow-hidden bg-white/5 backdrop-blur-md border-r border-white/10 flex flex-col`}>
        {/* Sidebar Header */}
        <div className="p-3 border-b border-white/10">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <History className="h-4 w-4" />
              Hiring History
            </h2>
            <button
              onClick={startNewChat}
              className="p-1.5 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
            >
              <Plus className="h-3 w-3 text-white" />
            </button>
          </div>
          <button
            onClick={startNewChat}
            className="w-full p-2 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 rounded-lg text-white text-xs font-medium transition-all"
          >
            + New Hiring
          </button>
        </div>

        {/* Chat History List */}
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {chatHistory.map((chat) => (
            <button
              key={chat.id}
              onClick={() => selectChat(chat.id)}
              className={`w-full text-left p-2 rounded-lg transition-all hover:bg-white/10 ${activeChat === chat.id ? 'bg-white/10 border border-white/20' : ''
                }`}
            >
              <div className="text-xs font-medium text-white mb-1 truncate">
                {chat.title}
              </div>
              <div className="text-xs text-white/60 mb-1">
                {chat.date}
              </div>
              <div className="text-xs text-white/40 truncate">
                {chat.preview}
              </div>
            </button>
          ))}
        </div>

        {/* Upgrade Section */}
       {/*} <div className="p-3 border-t border-white/10">


          <div className="bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-lg p-3 border border-purple-500/20">
            <div className="flex items-center gap-2 mb-2">
              <Crown className="h-4 w-4 text-yellow-400" />
              <span className="text-sm font-bold text-white">Go Pro</span>
            </div>
            <p className="text-xs text-white/60 mb-3">
              Unlock unlimited hiring power with advanced AI features
            </p>
            <button className="w-full py-2 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 rounded-lg text-white text-xs font-medium transition-all">
              Upgrade Now
            </button>
          </div>

        </div>*/}
        <div className="p-3 border-t border-white/10">
      <div className="bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 rounded-lg p-3 border border-emerald-500/20">
        <div className="flex items-center gap-2 mb-3">
          <Zap className="h-4 w-4 text-emerald-400" />
          <span className="text-sm font-bold text-white">AI Hiring Credits</span>
        </div>
        
        {/* Credits Progress Bar */}
        <div className="mb-3">
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs text-white/60">Credits Remaining</span>
            <span className="text-xs font-medium text-white">{remainingCredits}/{totalCredits}</span>
          </div>
          <div className="w-full bg-white/10 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-emerald-400 to-cyan-400 h-2 rounded-full transition-all duration-300"
              style={{ width: `${creditsPercentage}%` }}
            ></div>
          </div>
        </div>

        {/* Usage Stats */}
        <div className="grid grid-cols-2 gap-2 mb-3">
          <div className="bg-white/5 rounded-lg p-2">
            <div className="flex items-center gap-1 mb-1">
              <Users className="h-3 w-3 text-blue-400" />
              <span className="text-xs text-white/60">Used</span>
            </div>
            <span className="text-sm font-semibold text-white">{usedCredits}</span>
          </div>
          <div className="bg-white/5 rounded-lg p-2">
            <div className="flex items-center gap-1 mb-1">
              <TrendingUp className="h-3 w-3 text-emerald-400" />
              <span className="text-xs text-white/60">Left</span>
            </div>
            <span className="text-sm font-semibold text-white">{remainingCredits}</span>
          </div>
        </div>

        {/* Action Button */}
        <button className="w-full py-2 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 rounded-lg text-white text-xs font-medium transition-all">
          Get More Credits
        </button>
      </div>
    </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col relative">
        {/* Header */}
        <div className="p-4 border-b border-white/10 bg-white/5 backdrop-blur-md">

          <div className="flex items-center justify-between ">
            {/* Left Section - Menu & Logo */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowSidebar(!showSidebar)}
                className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
              >
                <Menu className="h-4 w-4 text-white" />
              </button>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                  <Bot className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h1 className="text-white font-bold text-sm">
                    {activeView === 'dashboard' ? 'Dashboard' : 'AI Recruitment Assistant'}
                  </h1>
                  <p className="text-white/60 text-xs">Powered by Aurjobs</p>
                </div>
              </div>
            </div>

            {/* Right Section - Status & Dashboard Button */}
            <div className="flex items-center gap-4">
              {/* Online Status */}
              <div className="flex items-center gap-2">
                <div className="bg-green-500 w-2 h-2 rounded-full animate-pulse"></div>
                <span className="text-white/60 text-xs">Online</span>
              </div>

              {/* Dashboard Button */}
              <button
                onClick={() => setActiveView("dashboard")}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${activeView === 'dashboard'
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/25'
                  : 'bg-white/10 hover:bg-white/20 text-white border border-white/20 hover:border-white/30'
                  }`}
              >
                {/* {activeView === 'dashboard' ? 'Dashboard' : 'View Dashboard'} */}
                {activeView === 'dashboard'
                  ? 'Dashboard'
                  : (activeView === 'chat' && userContext.screeningComplete ? 'View Dashboard' : null)
                }
              </button>
            </div>
          </div>

        </div>

        {/* Messages */}
        {
          activeView === 'dashboard' ? <DashboardView /> : (
            <>
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md ${message.type === 'user'
                        ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-l-2xl rounded-tr-2xl'
                        : 'bg-white/10 backdrop-blur-md text-white rounded-r-2xl rounded-tl-2xl border border-white/20'
                        } p-3 shadow-lg`}
                    >
                      {message.isScreeningProgress ? (
                        <ScreeningProgressComponent />
                      ) : (
                        <>
                          <div className="mb-2">
                            {formatMessage(message.content)}
                          </div>

                          {message.showOptions && message.options && (
                            <div className="mt-3 space-y-2">
                              {message.options.map((option) => (
                                <button
                                  key={option.id}
                                  onClick={() => handleOptionClick(option.action, option.text)}
                                  className={`w-full text-left p-2 rounded-lg transition-all hover:scale-105 text-xs font-medium ${option.color
                                    ? `bg-gradient-to-r ${option.color} text-white`
                                    : 'bg-white/20 hover:bg-white/30 text-white border border-white/30'
                                    }`}
                                >
                                  <div className="flex items-center justify-between">
                                    <span>{option.text}</span>
                                    <ArrowRight className="h-3 w-3" />
                                  </div>
                                  {option.desc && (
                                    <div className="text-xs opacity-80 mt-1">{option.desc}</div>
                                  )}
                                </button>
                              ))}
                            </div>
                          )}
                        </>
                      )}
                      {message.isServicesSelection && <ServicesSelectionComponent />}
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-white/10 backdrop-blur-md text-white rounded-r-2xl rounded-tl-2xl border border-white/20 p-3">
                      <div className="flex items-center gap-2">
                        <Loader className="h-4 w-4 animate-spin" />
                        <span className="text-xs">AI is thinking...</span>
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="p-4 border-t border-white/10 bg-white/5 backdrop-blur-md">
                <div className="flex items-center gap-2">
                  <div className="flex-1 relative">
                    <textarea
                      ref={inputRef}
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Type your message... (Enter to send)"
                      className="w-full p-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                      rows="1"
                      style={{ minHeight: '44px', maxHeight: '120px' }}
                    />
                  </div>
                  <div className="flex gap-2">
                    <button className="p-3 bg-white/10 hover:bg-white/20 rounded-xl transition-colors">
                      <Paperclip className="h-4 w-4 text-white" />
                    </button>
                    <button
                      onClick={handleSendMessage}
                      disabled={!inputValue.trim()}
                      className="p-3 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl transition-all"
                    >
                      <Send className="h-4 w-4 text-white" />
                    </button>
                  </div>
                </div>
              </div>
            </>
          )
        }

        {showAILoader && <AILoaderPopup />}
      </div>

      {/* Job Description Modal */}

      {/* {showJobDescModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                    <FileText className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white-900">Job Description</h3>
                    <p className="text-sm text--600">For: {userContext.roleInput}</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowJobDescModal(false)}
                  className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
                >
                  <X className="h-4 w-4 text--600" />
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="mb-4">
                <label className="block text-sm font-medium text--700 mb-2">
                  📝 Describe the role in detail
                </label>
                <textarea
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  placeholder="Include responsibilities, required skills, experience level, qualifications, company culture, benefits, etc. The more detailed, the better AI matching!"
                  className="w-full h-40 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                />
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
                <div className="flex items-start gap-3">
                  <Brain className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-blue-900 mb-1">💡 AI Tip</h4>
                    <p className="text-sm text-blue-700">
                      Include specific technologies, soft skills, and experience requirements. 
                      This helps our AI find candidates with 95%+ job compatibility!
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowJobDescModal(false)}
                  className="flex-1 px-4 py-3 border border-gray-300 text--700 rounded-xl hover:bg-gray-50 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleJobDescSubmit}
                  disabled={jobDescription.length < 10}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl hover:from-blue-600 hover:to-purple-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium shadow-lg"
                >
                  ✨ Continue with AI
                </button>
              </div>
            </div>
          </div>
        </div>
      )}  */}

      {showJobDescModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                    <FileText className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Upload Job Description</h3>
                    <p className="text-sm text-gray-600">For: {userContext.roleInput}</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowJobDescModal(false)}
                  className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
                >
                  <X className="h-4 w-4 text-gray-600" />
                </button>
              </div>
            </div>

            <div className="p-6">
              {/* Upload Section */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <label className="block text-sm font-medium text-gray-700">
                    📁 Choose Job Description File
                  </label>
                  <span className="text-xs text-gray-500">PDF, DOC, DOCX, TXT • Max 5MB</span>
                </div>

                <div className="relative">
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx,.txt"
                    onChange={handleJDFileUpload}
                    className="hidden"
                    id="jd-file-upload"
                    disabled={isProcessingFile}
                  />
                  <label
                    htmlFor="jd-file-upload"

                    className={`w-full border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer transition-all ${isProcessingFile
                      ? 'opacity-50 cursor-not-allowed border-gray-300'
                      : uploadedJD
                        ? 'border-green-400 bg-green-50 hover:bg-green-100'
                        : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50'
                      }`}
                  >
                    {isProcessingFile ? (
                      <>
                        <div className="animate-spin w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full mb-3"></div>
                        <span className="text-sm font-medium text-gray-700">Processing file...</span>
                      </>
                    ) : uploadedJD ? (
                      <>
                        <CheckCircle className="h-12 w-12 text-green-600 mb-3" />
                        <span className="text-lg font-medium text-green-700 mb-1">{uploadedJD.name}</span>
                        <span className="text-sm text-gray-600 mb-2">
                          {(uploadedJD.size / 1024).toFixed(1)} KB • Uploaded successfully
                        </span>
                        <span className="text-xs text-blue-600 font-medium">Click to replace file</span>
                      </>
                    ) : (
                      <>
                        <Upload className="h-12 w-12 text-gray-400 mb-3" />
                        <span className="text-lg font-medium text-gray-700 mb-1">Drop your JD file here</span>
                        <span className="text-sm text-gray-500 mb-2">or click to browse</span>
                        <div className="flex items-center gap-4 text-xs text-gray-400">
                          <span>📄 PDF</span>
                          <span>📝 DOC/DOCX</span>
                          <span>📋 TXT</span>
                        </div>
                      </>
                    )}
                  </label>
                </div>

                {/* Error Display */}
                {uploadError && (
                  <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 text-red-600 flex-shrink-0" />
                    <span className="text-sm text-red-700">{uploadError}</span>
                  </div>
                )}

                {/* Content Preview */}
                {extractedContent && !isProcessingFile && (
                  <div className="mt-4 p-4 bg-gray-50 border border-gray-200 rounded-xl">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">📋 Extracted Content Preview</span>
                      <button
                        onClick={clearUpload}
                        className="text-xs text-red-600 hover:text-red-700 font-medium"
                      >
                        Clear & reupload
                      </button>
                    </div>
                    <div className="text-sm text-gray-600 max-h-32 overflow-y-auto">
                      {extractedContent.substring(0, 300)}
                      {extractedContent.length > 300 && '...'}
                    </div>
                    <div className="mt-2 text-xs text-gray-500">
                      {extractedContent.length} characters extracted
                    </div>
                  </div>
                )}
              </div>

              {/* Info Box */}
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
                <div className="flex items-start gap-3">
                  <FileText className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-blue-900 mb-1">💡 Upload Tips</h4>
                    <p className="text-sm text-blue-700">
                      Upload a comprehensive JD with role details, requirements, and qualifications.
                      Our AI will extract and analyze the content for optimal candidate matching!
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={() => setShowJobDescModal(false)}
                  className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleJobDescSubmit}
                  disabled={!uploadedJD || isProcessingFile || extractedContent.length < 10}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl hover:from-blue-600 hover:to-purple-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium shadow-lg"
                >
                  {isProcessingFile ? '⏳ Processing...' : '🎯 Continue AI Analysis'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}



      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl flex items-center justify-center">
                    <Upload className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white-900">Upload Resumes</h3>
                    <p className="text-sm text--600">Build your candidate database</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowUploadModal(false)}
                  className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
                >
                  <X className="h-4 w-4 text--600" />
                </button>
              </div>
            </div>

            <div className="p-6">
              {/* Upload Area */}
              <div
                className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center hover:border-blue-400 transition-colors cursor-pointer mb-6"
                onClick={() => fileInputRef.current?.click()}
              >
                <div className="flex flex-col items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center">
                    <FileUp className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white-900 mb-2">
                      Drop files here or click to upload
                    </h4>
                    <p className="text-sm text--600">
                      Supports PDF, DOC, DOCX files up to 10MB each
                    </p>
                  </div>
                  <button className="px-6 py-2 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-100 transition-colors font-medium">
                    📁 Choose Files
                  </button>
                </div>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept=".pdf,.doc,.docx"
                onChange={handleFileUpload}
                className="hidden"
              />

              {/* File List */}
              {uploadedFiles.length > 0 && (
                <div className="mb-6">
                  <h4 className="font-medium text-white-900 mb-3">
                    📄 Uploaded Files ({uploadedFiles.length})
                  </h4>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {uploadedFiles.map((file) => (
                      <div key={file.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                        <div className="flex items-center gap-3">
                          <FileText className="h-5 w-5 text-blue-600" />
                          <div>
                            <div className="font-medium text-white-900 text-sm">{file.name}</div>
                            <div className="text-xs text--500">{file.size}</div>
                          </div>
                        </div>
                        <button
                          onClick={() => removeFile(file.id)}
                          className="w-6 h-6 bg-red-100 hover:bg-red-200 rounded-full flex items-center justify-center transition-colors"
                        >
                          <Trash2 className="h-3 w-3 text-red-600" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* AI Processing Info */}
              <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-xl p-4 mb-6">
                <div className="flex items-start gap-3">
                  <Zap className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-green-900 mb-1">🚀 AI Processing</h4>
                    <p className="text-sm text-green-700">
                      Our AI will automatically extract skills, experience, education, and contact info
                      from each resume for intelligent matching.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowUploadModal(false)}
                  className="flex-1 px-4 py-3 border border-gray-300 text--700 rounded-xl hover:bg-gray-50 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUploadComplete}
                  disabled={uploadedFiles.length === 0}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-xl hover:from-green-600 hover:to-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium shadow-lg"
                >
                  🎯 Continue AI Analysis
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}










