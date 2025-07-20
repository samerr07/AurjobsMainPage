import { useState, useRef, useEffect } from 'react';
import {
  Bot,
  PieChart,
  Workflow,
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
  AlertCircle,
  RotateCcw,
  Pause,
  UserPlus,
  GitBranch,
  CheckSquare,
  MessageCircle,
  Video
} from 'lucide-react';
// import CreditManager from './CreditManager';

export default function AIRecruitmentChat() {
  const [isEmpty, setIsEmpty] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);
  // const [messages, setMessages] = useState([
  //   {
  //     id: 1,
  //     type: 'bot',
  //     content: "👋 Welcome! I'm your AI Recruitment Assistant. Let's find your perfect candidate!",
  //     timestamp: new Date(),
  //     showOptions: true,
  //     options: [
  //       { id: 'start', text: '🚀 Start Hiring', action: 'start' },
  //       { id: 'learn', text: '✨ Features', action: 'learn' }
  //     ]
  //   }
  // ]);
  const [messages, setMessages] = useState([])
  const [uploadedJD, setUploadedJD] = useState(null);
  const [isProcessingFile, setIsProcessingFile] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [extractedContent, setExtractedContent] = useState('');
  const chatContainerRef = useRef(null);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [currentFlow, setCurrentFlow] = useState('welcome');
  const [showJobDescModal, setShowJobDescModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(true);
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

  // const isEmpty = messages.length === 1 && messages[0].type === 'bot' && messages[0].showOptions;

  const quickActions = [
    {
      title: "Start Hiring",
      description: "👋 Welcome! I'm your AI Recruitment Assistant. Let's find your perfect candidate!",
      icon: Users,
      gradient: "from-purple-500 to-pink-500",
      action: "start_hiring"
    },
    {
      title: "Screen Candidates",
      description: "👋 Welcome! I'm your AI Recruitment Assistant. Let's find your perfect candidate!",
      icon: Search,
      gradient: "from-blue-500 to-cyan-500",
      action: "start_hiring"
    },
    {
      title: "Generate Job Description",
      description: "Create compelling job postings with AI",
      icon: FileText,
      gradient: "from-green-500 to-emerald-500",
      action: "start_hiring"
    }
  ];

  const handleQuickAction = (action, description) => {
    setIsAnimating(true);

    // Start the fade animation
    setTimeout(() => {
      setIsEmpty(false);
      // setInputValue(action);

      // Add initial message
      const initialMessage = {
        id: Date.now(),
        type: 'user',
        content: description,
        timestamp: new Date()
      };

      // setMessages([initialMessage]);

      // Simulate AI response
      setTimeout(() => {
        setIsTyping(true);
        setTimeout(() => {
          setIsTyping(false);
          const aiResponse = {
            id: Date.now() + 1,
            type: 'ai',
            content: "I'm here to help you with your recruitment needs! How can I assist you today?",
            timestamp: new Date(),
            showOptions: true,
            // options: getOptionsForAction(action)
          };
          setMessages(prev => [...prev, aiResponse]);
        }, 1500);
      }, 500);

      setIsAnimating(false);
    }, 300);
    processUserInput(action);
    setInputValue("")
  };
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

    <div className="w-full max-w-2xl bg-gray-800 rounded-lg border border-gray-600 shadow-lg mt-3">
      {/* Header */}
      <div className="bg-gray-700 border-b border-gray-600 px-3 py-2 rounded-t-lg">
        <div className="flex items-center justify-center space-x-2">
          <Settings className="w-3 h-3 text-blue-400" />
          <h3 className="text-xs font-medium text-white">Select AI Services</h3>
          <Sparkles className="w-3 h-3 text-blue-400" />
        </div>
      </div>

      {/* Services List */}
      <div className="p-3 space-y-1.5">
        {services.map((service) => (
          <div
            key={service.id}
            className={`rounded-md border transition-all duration-200 cursor-pointer ${selectedServices.includes(service.id)
              ? 'border-blue-500 bg-gray-700/80 shadow-sm'
              : 'border-gray-600 bg-gray-800/50 hover:border-gray-500 hover:bg-gray-700/50'
              }`}
            onClick={() => handleServiceToggle(service.id)}
          >
            <div className="px-2.5 py-2 flex items-center space-x-2.5">
              {/* Checkbox */}
              <div className={`w-3 h-3 rounded border flex items-center justify-center transition-all ${selectedServices.includes(service.id)
                ? 'bg-blue-500 border-blue-500'
                : 'border-gray-500 bg-gray-700'
                }`}>
                {selectedServices.includes(service.id) && (
                  <Check className="w-2 h-2 text-white" />
                )}
              </div>

              {/* Service Icon */}
              <div className={`w-6 h-6 rounded-md flex items-center justify-center text-xs transition-all ${selectedServices.includes(service.id)
                ? 'bg-blue-500 text-white shadow-sm'
                : 'bg-gray-700 text-gray-300'
                }`}>
                {service.icon}
              </div>

              {/* Service Details */}
              <div className="flex-1 min-w-0">
                <h4 className={`font-medium text-xs mb-0.5 ${selectedServices.includes(service.id) ? 'text-white' : 'text-gray-300'
                  }`}>
                  {service.name}
                </h4>
                <p className={`text-xs ${selectedServices.includes(service.id) ? 'text-gray-300' : 'text-gray-400'
                  }`}>
                  {service.desc}
                </p>
              </div>

              {/* Selection Indicator */}
              {selectedServices.includes(service.id) && (
                <Zap className="w-2.5 h-2.5 text-blue-400 flex-shrink-0" />
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Action Footer */}
      <div className="border-t border-gray-600 bg-gray-700 px-3 py-2 rounded-b-lg">
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-300">
            {selectedServices.length} selected
          </span>
          <div className="flex space-x-2">
            <button
              onClick={() => setSelectedServices([])}
              className="px-2 py-1 text-xs text-gray-400 hover:text-gray-200 transition-colors rounded hover:bg-gray-600"
            >
              Clear
            </button>
            <button
              onClick={proceedWithServices}
              disabled={selectedServices.length === 0}
              className={`px-3 py-1 text-xs font-medium rounded transition-all ${selectedServices.length > 0
                ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-sm'
                : 'bg-gray-600 text-gray-400 cursor-not-allowed'
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
        if (input === 'start' || lowerInput.includes('start') || lowerInput.includes('begin') || lowerInput.includes('start_hiring') || lowerInput.includes('screen_candidates')) {
          setCurrentFlow('role');
          addMessage('bot', "Hello! I\'m your AI Recruitment Assistant. I can help you find the perfect candidates for your open positions. What role are you hiring for ?");
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
          // addMessage('bot', `🎯 Role: ${input} \n\n📄 Job Description Options:\n\nHow would you like to handle the Job Description?`
          addMessage('bot', `Great! I see you're looking for a ${input}. Let me help you create a comprehensive job description and find the best candidates.`, [
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
      addMessage('bot', `Job description successfully processed and saved for ${userContext.roleInput} position.\n\nPlease select your preferred candidate sourcing method:`, [
        {
          id: 'external',
          text: 'Connect with Job Board',
          action: 'db_external',
          desc: 'Access 50M+ verified professional profiles'
        },
        {
          id: 'own',
          text: 'Upload Resume Database',
          action: 'db_own',
          desc: 'Upload and analyze existing candidate resumes'
        }
      ], false);

      // addMessage('bot', `✅ Job description saved! Role: ${userContext.roleInput} \n\n🗃️ Choose candidate source:**`, [
      //   {
      //     id: 'external',
      //     text: '🌐 Connect with Job Board',
      //     action: 'db_external',
      //     desc: '50M+ verified profiles'
      //   },
      //   {
      //     id: 'own',
      //     text: '📁 Upload Resumes',
      //     action: 'db_own',
      //     desc: 'Upload existing resumes'
      //   }
      // ], false);
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



      // addMessage('bot', `📁 ${uploadedFiles.length} resumes uploaded! \n\n🎯 Select AI Services you'd like to use for candidate processing:`,
      //   null, // No options here since we'll use checkboxes
      //   false
      // );

      addMessage('bot', `Successfully uploaded ${uploadedFiles.length} resume${uploadedFiles.length !== 1 ? 's' : ''} to the system.\n\nSelect the AI services you would like to apply for candidate analysis:`,
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

  };


  const startScreeningProcess = async () => {
    // Show AI loader popup immediately for visual appeal
    setShowAILoader(true);
    setUserContext(prev => ({ ...prev, screeningInProgress: true }));

    // Show loader for 3 seconds for visual appeal, then proceed
    setTimeout(async () => {
      try {
        // Debug logging
        console.log('resumeUrl type:', typeof resumeUrl);
        console.log('resumeUrl value:', resumeUrl);
        console.log('jDUrl type:', typeof jDUrl);
        console.log('jDUrl value:', jDUrl);

        const requestBody = {
          resumes: resumeUrl,
          job_descriptions: [jDUrl],
          voice_interview_threshold: 3.0
        };
        // Hide initial loader and show dashboard
        setShowAILoader(false);
        showDashboardView();
        console.log('Final request body:', JSON.stringify(requestBody, null, 2));

        // Call API
        const response = await fetch('https://newai-f7erata5gtcxhse4.canadacentral-01.azurewebsites.net/screen-candidates-from-urls/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
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



        // Add success message
        addMessage('bot', 'Screening process initiated! Monitor progress in dashboard.', null, false, true);

        // Initialize screening progress (dashboard loader will handle continuous loading)
        setScreeningProgress({
          isActive: true,
          currentStep: 0,
          stepProgress: { 0: 0 },
          isComplete: false
        });

      } catch (error) {
        console.error('Error details:', error);

        // Hide loader and show error
        setShowAILoader(false);
        setUserContext(prev => ({ ...prev, screeningInProgress: false }));
        addMessage('bot', `Error starting screening: ${error.message}`, null, false, false);
      }
    }, 3000); // Wait 3 seconds, then call API and show dashboard
  };




  const AILoaderPopup = () => {
    const [currentMessage, setCurrentMessage] = useState(0);
    const [progress, setProgress] = useState(0);

    const loadingMessages = [
      " Initializing AI neural networks...",
      " Calibrating candidate matching algorithms...",
      " Optimizing screening parameters...",
      " Preparing intelligent analysis..."
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
      <div className="fixed inset-0 bg-slate-900/90 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">
        <div className="bg-slate-800  p-8 rounded-2xl border border-cyan-500/30 shadow-2xl max-w-lg w-full mx-4 animate-scaleIn">

          {/* AI Brain Animation */}
          <div className="text-center mb-8">
            <div className="relative w-24 h-24 mx-auto mb-6">
              {/* Outer rotating ring */}
              <div className="absolute inset-0 rounded-full border-4 border-cyan-500/20"></div>
              <div className="absolute inset-0 rounded-full border-4 border-cyan-500 border-t-transparent animate-spin"></div>

              {/* Inner pulsing core */}
              <div className="absolute inset-3 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 animate-pulse flex items-center justify-center">
                <div className="absolute inset-1 rounded-full bg-slate-800/80 flex items-center justify-center">
                  <Bot className="w-8 h-8 text-cyan-400 animate-bounce" />
                </div>
              </div>

              {/* Floating particles */}
              <div className="absolute -top-2 -right-2 w-3 h-3 bg-cyan-400 rounded-full animate-ping"></div>
              <div className="absolute -bottom-2 -left-2 w-2 h-2 bg-blue-400 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
              <div className="absolute top-1/2 -left-4 w-2 h-2 bg-cyan-300 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
            </div>

            <h2 className="text-2xl font-bold text-white mb-2">
               AI Engine Initializing
            </h2>
            <p className="text-cyan-200 text-sm mb-6">
              Preparing advanced recruitment intelligence...
            </p>
          </div>

          {/* Dynamic Loading Messages */}
          <div className="mb-6">
            <div className="bg-slate-800/60 rounded-lg p-4 border border-cyan-500/20">
              <div className="flex items-center space-x-3">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
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
              <span className="text-cyan-200 text-sm font-medium">AI Initialization</span>
              <span className="text-cyan-300 text-sm font-bold">{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-slate-700/60 rounded-full h-3 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-400 rounded-full transition-all duration-500 ease-out relative"
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
            <div className="flex items-center space-x-2 text-cyan-400">
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" style={{ animationDelay: '0.3s' }}></div>
              <span>Algorithms: Calibrated</span>
            </div>
            <div className="flex items-center space-x-2 text-blue-400">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '0.6s' }}></div>
              <span>Matching Engine: Ready</span>
            </div>
            <div className="flex items-center space-x-2 text-cyan-300">
              <div className="w-2 h-2 bg-cyan-300 rounded-full animate-pulse" style={{ animationDelay: '0.9s' }}></div>
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
                    className={`relative flex flex-col items-center cursor-pointer group transition-all duration-300 ${status !== 'pending' ? 'hover:scale-105' : ''
                      }`}
                    onClick={() => handleStepClick(index)}
                  >
                    {/* Step Circle */}
                    <div className={`relative w-16 h-16 rounded-full border-2 transition-all duration-500 ${status === 'completed'
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
                      <div className={`absolute -top-2 -right-2 w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center ${status === 'completed'
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
                      <h4 className={`font-semibold text-sm transition-colors duration-300 ${status === 'completed'
                        ? 'text-green-300'
                        : status === 'active'
                          ? 'text-white'
                          : 'text-slate-400'
                        }`}>
                        {step.title}
                      </h4>
                      <p className={`text-xs transition-colors duration-300 ${status === 'completed'
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


  const DashboardView = () => {
    const [processStep, setProcessStep] = useState(0);
    const [showResults, setShowResults] = useState(false);
    const [animationComplete, setAnimationComplete] = useState(false);
    const [processingMetrics, setProcessingMetrics] = useState({
      throughput: 0,
      accuracy: 0,
      processed: 0,
      confidence: 0
    });

    const steps = [
      {
        id: 'parsing',
        title: 'Neural Document Parser',
        subtitle: 'Deep structure extraction & entity recognition',
        icon: <Brain className="w-8 h-8" />,
        metrics: { throughput: 847, accuracy: 94.2, processed: 156, confidence: 87 }
      },
      {
        id: 'analysis',
        title: 'Cognitive Skills Engine',
        subtitle: 'Multi-dimensional competency assessment',
        icon: <Target className="w-8 h-8" />,
        metrics: { throughput: 1247, accuracy: 96.8, processed: 324, confidence: 92 }
      },
      {
        id: 'matching',
        title: 'Adaptive Matching AI',
        subtitle: 'Context-aware requirement alignment',
        icon: <Cpu className="w-8 h-8" />,
        metrics: { throughput: 2156, accuracy: 98.1, processed: 478, confidence: 95 }
      },
      {
        id: 'compatibility',
        title: 'Quantum Compatibility',
        subtitle: 'Advanced probabilistic scoring matrix',
        icon: <Shield className="w-8 h-8" />,
        metrics: { throughput: 3421, accuracy: 97.3, processed: 624, confidence: 93 }
      },
      {
        id: 'ranking',
        title: 'Strategic Ranking Core',
        subtitle: 'Hierarchical candidate optimization',
        icon: <Award className="w-8 h-8" />,
        metrics: { throughput: 4892, accuracy: 99.2, processed: 847, confidence: 98 }
      }
    ];

    useEffect(() => {
      if (processStep < steps.length) {
        const timer = setTimeout(() => {
          setProcessStep(prev => prev + 1);
        }, 3000);

        // Update metrics during processing
        const metricsTimer = setInterval(() => {
          if (processStep < steps.length) {
            const currentMetrics = steps[processStep].metrics;
            setProcessingMetrics(prev => ({
              throughput: Math.min(prev.throughput + Math.random() * 200, currentMetrics.throughput),
              accuracy: Math.min(prev.accuracy + Math.random() * 5, currentMetrics.accuracy),
              processed: Math.min(prev.processed + Math.random() * 30, currentMetrics.processed),
              confidence: Math.min(prev.confidence + Math.random() * 4, currentMetrics.confidence)
            }));
          }
        }, 100);

        return () => {
          clearTimeout(timer);
          clearInterval(metricsTimer);
        };
      } else {
        setAnimationComplete(true);
        setTimeout(() => setShowResults(true), 800);
      }
    }, [processStep]);

    const currentStep = steps[Math.min(processStep, steps.length - 1)];

    return (
      <div className="min-h-0 overflow-y-auto bg-slate-900 text-white">
        {/* Header */}
        <div className="relative overflow-hidden border-b border-white/10">
          <div className="relative px-8 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                {/* <div className="relative">
                  <div className="w-10 h-10 bg-indigo-600 rounded-2xl flex items-center justify-center border border-white/20">
                    <Brain className="w-6 h-6 text-white" />
                  </div>
                </div> */}
                <div>
                  <div className="flex  flex-col ">
                    <div className="text-white text-lg">
                      React Developer
                    </div>
                    <div className="text-white/60 ">
                      {/* <span className="text-white/80 text-lg">Job URL:</span> */}
                      <a target="_blank" rel="noopener noreferrer" className="text-white hover:text-slate-300 cursor-pointer" >
                        Job Description
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                {/* <div className="px-4 py-2 bg-white/10 rounded-xl border border-white/20">
                  <span className="text-white text-sm font-medium">Senior React Developer</span>
                </div> */}
                {/* <button className="px-6 py-2 bg-white/10 hover:bg-white/20 rounded-xl transition-all duration-200 flex items-center space-x-2 font-medium border border-white/20">
                <Download className="w-4 h-4" />
                <span className="text-sm">Export Analysis</span>
              </button> */}
                <button onClick={() => setActiveView('chat')} className="px-4 py-2 bg-white/10 border border-white/20 text-white rounded-lg hover:bg-white/20 flex items-center space-x-2 transition-all duration-200">
                  <ArrowRight className="w-4 h-4 rotate-180" />
                  <span>Back to Chat</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Dashboard */}
        <div className="px-8 py-8">
          {/* Live Metrics Panel */}
          <div className="grid grid-cols-4 gap-6 mb-8">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <Activity className="w-5 h-5 text-white" />
                  <span className="text-white/70 text-sm font-medium">Throughput</span>
                </div>
                <div className="text-xs text-white/50">ops/sec</div>
              </div>
              <div className="text-2xl font-bold text-white">{Math.round(processingMetrics.throughput)}</div>
              <div className="text-xs text-white/60 mt-1">+{Math.round(processingMetrics.throughput * 0.12)}/min</div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <Target className="w-5 h-5 text-white" />
                  <span className="text-white/70 text-sm font-medium">Accuracy</span>
                </div>
                <div className="text-xs text-white/50">%</div>
              </div>
              <div className="text-2xl font-bold text-white">{processingMetrics.accuracy.toFixed(1)}</div>
              <div className="text-xs text-white/60 mt-1">+0.3% trend</div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <BarChart3 className="w-5 h-5 text-white" />
                  <span className="text-white/70 text-sm font-medium">Processed</span>
                </div>
                <div className="text-xs text-white/50">items</div>
              </div>
              <div className="text-2xl font-bold text-white">{Math.round(processingMetrics.processed)}</div>
              <div className="text-xs text-white/60 mt-1">Queue: 23</div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <Shield className="w-5 h-5 text-white" />
                  <span className="text-white/70 text-sm font-medium">Confidence</span>
                </div>
                <div className="text-xs text-white/50">%</div>
              </div>
              <div className="text-2xl font-bold text-white">{Math.round(processingMetrics.confidence)}</div>
              <div className="text-xs text-white/60 mt-1">High certainty</div>
            </div>
          </div>

          {/* AI Processing Pipeline */}
          <div className=" rounded-3xl p-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-xl font-bold text-white mb-2">AI Processing Pipeline</h2>
                <p className="text-white/60">Multi-stage intelligent candidate evaluation system</p>
              </div>
              <div className="flex items-center space-x-4">
                {/* <div className="px-4 py-2 bg-white/10 rounded-xl border border-white/20">
                  <span className="text-white text-sm">Stage {Math.min(processStep + 1, steps.length)}/{steps.length}</span>
                </div> */}
                {processStep < steps.length && (
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                    <span className="text-white text-sm">Screening...</span>
                  </div>
                )}
              </div>
            </div>

            {/* Processing Steps */}
            <div className="flex justify-between relative">

              {/* <div className="absolute top-8 left-16 right-16 h-px z-0">
               
                  <div className="absolute inset-0 border-t border-dashed border-white/20 "></div>
                  
                
                  <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-1/2 w-2 h-2 bg-white/40 rounded-full transform -translate-y-1/2 animate-flow-1"></div>
                    <div className="absolute top-1/2 w-2 h-2 bg-white/60 rounded-full transform -translate-y-1/2 animate-flow-2"></div>
                    <div className="absolute top-1/2 w-2 h-2 bg-white/80 rounded-full transform -translate-y-1/2 animate-flow-3"></div>
                    <div className="absolute top-1/2 w-1.5 h-1.5 bg-white/50 rounded-full transform -translate-y-1/2 animate-flow-4"></div>
                    <div className="absolute top-1/2 w-1.5 h-1.5 bg-white/70 rounded-full transform -translate-y-1/2 animate-flow-5"></div>
                  </div>
                </div> */}
              <div className="absolute top-8 left-16 right-16 h-px z-0">
                <div className="absolute inset-0 overflow-hidden">
                  {/* Animated dashed line */}
                  <div className="absolute inset-0 border-t border-dashed border-white/20 animate-dash-flow"></div>
                </div>

                {/* Flowing dots overlay */}
                <div className="absolute inset-0 overflow-hidden">
                  <div className="absolute top-1/2 w-2 h-2 bg-white/40 rounded-full transform -translate-y-1/2 animate-flow-1"></div>
                  <div className="absolute top-1/2 w-2 h-2 bg-white/60 rounded-full transform -translate-y-1/2 animate-flow-2"></div>
                  <div className="absolute top-1/2 w-2 h-2 bg-white/80 rounded-full transform -translate-y-1/2 animate-flow-3"></div>
                  <div className="absolute top-1/2 w-1.5 h-1.5 bg-white/50 rounded-full transform -translate-y-1/2 animate-flow-4"></div>
                  <div className="absolute top-1/2 w-1.5 h-1.5 bg-white/70 rounded-full transform -translate-y-1/2 animate-flow-5"></div>
                  <div className="absolute top-1/2 w-1 h-1 bg-white/35 rounded-full transform -translate-y-1/2 animate-flow-6"></div>
                  <div className="absolute top-1/2 w-1 h-1 bg-white/45 rounded-full transform -translate-y-1/2 animate-flow-7"></div>
                  <div className="absolute top-1/2 w-1.5 h-1.5 bg-white/55 rounded-full transform -translate-y-1/2 animate-flow-8"></div>
                  <div className="absolute top-1/2 w-1 h-1 bg-white/65 rounded-full transform -translate-y-1/2 animate-flow-9"></div>
                  <div className="absolute top-1/2 w-2 h-2 bg-white/30 rounded-full transform -translate-y-1/2 animate-flow-10"></div>
                </div>
              </div>
              {steps.map((step, index) => {
                const isActive = index <= processStep;
                const isCompleted = index < processStep;
                const isCurrent = index === processStep && !animationComplete;

                return (
                  <div key={step.id} className="flex flex-col items-center relative group z-10">
                    {/* Step Node */}
                    <div className="relative">
                      <div
                        className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-700 relative overflow-hidden ${isCompleted
                          ? 'bg-green-600/20 border-2 border-green-600'
                          : isActive
                            ? 'bg-white/10'
                            : 'bg-white/5'
                          }`}
                      >
                        {/* Animated Border Loader for Current Step */}
                        {isCurrent && (
                          <div className="absolute inset-0 rounded-full border-2 border-white/20 border-t-white animate-spin">
                            {/* <div className="absolute inset-0 rounded-full border-2 border-white/20 border-t-white animate-spin"></div> */}
                          </div>
                        )}


                        {/* Icon */}
                        <div className="relative z-10">
                          {/* {isCompleted ? (                           
                <CheckCircle className="w-8 h-8 text-green-600" />                         
              ) : (                            */}
                          <div className={`${isActive ? 'text-white' : 'text-white/50'} transition-colors duration-300`}>
                            {step.icon}
                          </div>
                          {/* )}                        */}
                        </div>
                      </div>
                    </div>

                    {/* Step Information */}
                    <div className="mt-6 text-center max-w-40">
                      <h3 className={`font-bold text-sm mb-2 transition-colors duration-300 ${isActive ? 'text-white' : 'text-white/50'
                        }`}>
                        {step.title}
                      </h3>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Results Section */}
          {showResults && (
            <div className="mt-8 space-y-6 animate-fade-in">
              {/* Success Alert */}
              <div className="bg-white/5 border border-white/20 rounded-2xl p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center border border-white/20">
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-white flex items-center space-x-2 mb-1">
                      <span>Neural Processing Complete</span>
                      <Zap className="w-4 h-4" />
                    </h3>
                    <p className="text-white/70 text-sm">
                      Successfully analyzed 847 candidates with 99.2% accuracy in 8.7 seconds
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-white">23</div>
                    <div className="text-white text-sm">Top Matches</div>
                  </div>
                </div>
              </div>

              {/* Advanced Analytics */}
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                  <h4 className="font-semibold text-white mb-4">Processing Efficiency</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-white/60">Neural Network Utilization</span>
                      <span className="text-white">94.7%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/60">Memory Optimization</span>
                      <span className="text-white">87.3%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/60">Pattern Recognition</span>
                      <span className="text-white">99.1%</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                  <h4 className="font-semibold text-white mb-4">Quality Metrics</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-white/60">False Positive Rate</span>
                      <span className="text-white">0.8%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/60">Precision Score</span>
                      <span className="text-white">96.2%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/60">Recall Performance</span>
                      <span className="text-white">94.8%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>


        <style jsx>{`
          @keyframes fade-in {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          .animate-fade-in {
            animation: fade-in 1s ease-out;
          }

          @keyframes dash-flow {
            0% {
              background-position: 0 0;
            }
            100% {
              background-position: 20px 0;
            }
          }

          .animate-dash-flow {
            background-image: linear-gradient(to right, transparent 0%, transparent 50%, rgba(255, 255, 255, 0.2) 50%, rgba(255, 255, 255, 0.2) 100%);
            background-size: 20px 1px;
            animation: dash-flow 2s linear infinite;
          }

          @keyframes flow-1 {
            0% {
              left: -8px;
              opacity: 0;
            }
            10% {
              opacity: 1;
            }
            90% {
              opacity: 1;
            }
            100% {
              left: calc(100% + 8px);
              opacity: 0;
            }
          }

          @keyframes flow-2 {
            0% {
              left: -8px;
              opacity: 0;
            }
            10% {
              opacity: 1;
            }
            90% {
              opacity: 1;
            }
            100% {
              left: calc(100% + 8px);
              opacity: 0;
            }
          }

          @keyframes flow-3 {
            0% {
              left: -8px;
              opacity: 0;
            }
            10% {
              opacity: 1;
            }
            90% {
              opacity: 1;
            }
            100% {
              left: calc(100% + 8px);
              opacity: 0;
            }
          }

          @keyframes flow-4 {
            0% {
              left: -6px;
              opacity: 0;
            }
            10% {
              opacity: 1;
            }
            90% {
              opacity: 1;
            }
            100% {
              left: calc(100% + 6px);
              opacity: 0;
            }
          }

          @keyframes flow-5 {
            0% {
              left: -6px;
              opacity: 0;
            }
            10% {
              opacity: 1;
            }
            90% {
              opacity: 1;
            }
            100% {
              left: calc(100% + 6px);
              opacity: 0;
            }
          }

          .animate-flow-1 {
            animation: flow-1 3s ease-in-out infinite;
          }

          .animate-flow-2 {
            animation: flow-2 3s ease-in-out infinite 0.6s;
          }

          .animate-flow-3 {
            animation: flow-3 3s ease-in-out infinite 1.2s;
          }

          .animate-flow-4 {
            animation: flow-4 4s ease-in-out infinite 0.3s;
          }

          .animate-flow-5 {
            animation: flow-5 4s ease-in-out infinite 1.8s;
          }

          .animate-flow-6 {
            animation: flow-1 2.5s ease-in-out infinite 0.2s;
          }

          .animate-flow-7 {
            animation: flow-2 3.5s ease-in-out infinite 0.8s;
          }

          .animate-flow-8 {
            animation: flow-3 2.8s ease-in-out infinite 1.5s;
          }

          .animate-flow-9 {
            animation: flow-4 3.2s ease-in-out infinite 2.1s;
          }

          .animate-flow-10 {
            animation: flow-5 4.5s ease-in-out infinite 0.9s;
          }
        `}</style>
      </div>
    );
  };

  const resetChat = () => {
    // setCurrentFlow('welcome');
    setIsEmpty(true);
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
      // {
      //   id: 1,
      //   type: 'bot',
      //   content: "👋 **Welcome back!** Ready to find your next star employee?",
      //   timestamp: new Date(),
      //   showOptions: true,
      //   options: [
      //     { id: 'start', text: '🚀 Start Search', action: 'start' },
      //     { id: 'learn', text: '✨ Features', action: 'learn' }
      //   ]
      // }
    ]);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleKeyPress1 = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleQuickAction("start_hiring", "👋 Welcome! I'm your AI Recruitment Assistant. Let's find your perfect candidate!")
    }
  }

  const formatMessage = (content) => {
    return content.split('\n').map((line, index) => (
      <div key={index}>
        {line}
        {index < content.split('\n').length - 1 && <br />}
      </div>
    ));
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
    <div className="flex h-screen bg-gray-900 relative ">
      {/* Sidebar */}

      <div className={`${showSidebar ? 'w-72' : 'w-0'} transition-all duration-300 overflow-hidden bg-slate-800 border-r border-slate-600/50 flex flex-col`}>
        {/* Sidebar Header */}
        <div className="p-3 border-b border-slate-600/50">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-bold text-slate-100 flex items-center gap-2">
              <History className="h-4 w-4" />
              Hiring History
            </h2>
            <button
              onClick={startNewChat}
              className="p-1.5 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors"
            >
              <Plus className="h-3 w-3 text-slate-100" />
            </button>
          </div>
          <button
            onClick={startNewChat}
            className="w-full p-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white text-xs font-medium transition-all shadow-lg"
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
              className={`w-full text-left p-2 rounded-lg transition-all hover:bg-slate-700 ${activeChat === chat.id ? 'bg-slate-600 border border-slate-500' : ''
                }`}
            >
              <div className="text-xs font-medium text-slate-100 mb-1 truncate">
                {chat.title}
              </div>
              <div className="text-xs text-slate-300 mb-1">
                {chat.date}
              </div>
              <div className="text-xs text-slate-400 truncate">
                {chat.preview}
              </div>
            </button>
          ))}
        </div>



        {/* <CreditManager/> */}
      </div>



      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col relative min-h-0">
        {/* Header */}
        <div className="p-4 border-white/10 bg-gray-900 backdrop-blur-md flex-shrink-0">
          <div className="flex items-center justify-between">
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

            {/* Right Section - Credits, Status & Dashboard Button */}
            <div className="flex items-center gap-4">
              {/* Credit System */}
              <div className="flex items-center gap-4 bg-white/5 rounded-lg px-5 py-2.5 border border-white/10 backdrop-blur-sm">
                <div className="flex items-center gap-2">
                  <Zap className="h-4 w-4 text-blue-400" />
                  <span className="text-sm font-medium text-white">Credits</span>
                </div>

                <div className="flex items-center gap-4">
                  {/* Progress Bar */}
                  <div className="flex items-center gap-3">
                    <div className="w-24 bg-slate-700/50 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-blue-400 h-full rounded-full transition-all duration-500 ease-out"
                        style={{ width: `${creditsPercentage}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium text-white whitespace-nowrap">
                      {remainingCredits}/{totalCredits}
                    </span>
                  </div>

                  {/* Credit Stats */}
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 bg-red-400 rounded-full" />
                      <span className="text-slate-300">Used: {usedCredits}</span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 bg-blue-400 rounded-full" />
                      <span className="text-slate-300">Left: {remainingCredits}</span>
                    </div>
                  </div>
                </div>
              </div>

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
                {activeView === 'dashboard'
                  ? 'Dashboard'
                  : (activeView === 'chat' && userContext.screeningComplete ? 'View Dashboard' : null)
                }
              </button>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 flex flex-col bg-gray-900 min-h-0">
          {activeView === 'dashboard' ? (
            <DashboardView />
          ) : (
            <div className={`flex-1 flex flex-col min-h-0 transition-all duration-500 ease-in-out ${isAnimating ? 'opacity-0 transform translate-y-8' : 'opacity-100 transform translate-y-0'
              }`}>
              {isEmpty ? (
                <div className="flex-1 flex flex-col items-center justify-center px-4 py-8 max-w-6xl mx-auto w-full">
                  <div className="text-center mb-8">
                    <h1 className={`text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'
                      }`}>
                      Hire talent{' '}
                      <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                        in seconds
                      </span>
                    </h1>
                    <p className={`text-lg sm:text-xl max-w-2xl mx-auto ${isDarkMode ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                      Your AI-powered recruitment assistant for screening, matching, and hiring top talent
                    </p>
                  </div>

                  {/* Input Area */}
                  <div className="w-full max-w-2xl mb-6">
                    <div className="relative">
                      <textarea
                        ref={inputRef}
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyPress={handleKeyPress1}
                        placeholder="Ask anything about hiring..."
                        className={`w-full p-4 pr-32 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent ${isDarkMode
                          ? 'bg-gray-800 border border-gray-700 text-white placeholder-gray-500'
                          : 'bg-white border border-gray-300 text-gray-900 placeholder-gray-500'
                          }`}
                        rows="1"
                        style={{ minHeight: '56px' }}
                      />
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-1">
                        <button className={`p-2 transition-colors ${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-700'
                          }`}>
                          <Paperclip className="h-4 w-4" />
                        </button>
                        <button className={`p-2 transition-colors ${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-700'
                          }`}>
                          <Plus className="h-4 w-4" />
                        </button>
                        <button className={`p-2 transition-colors ${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-700'
                          }`}>
                          <Mic className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-4xl">
                    {quickActions.map((action, index) => (
                      <button
                        key={index}
                        onClick={() => handleQuickAction(action.action, action.description)}
                        className={`p-4 rounded-xl border transition-all text-left group hover:scale-105 transform ${isDarkMode
                          ? 'bg-gray-800 hover:bg-gray-700 border-gray-700 hover:border-gray-600'
                          : 'bg-white hover:bg-gray-50 border-gray-200 hover:border-gray-300'
                          }`}
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <div className={`w-6 h-6 bg-gradient-to-r ${action.gradient} rounded-md flex items-center justify-center`}>
                            <action.icon className="h-3 w-3 text-white" />
                          </div>
                          <h3 className={`font-medium text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'
                            }`}>
                            {action.title}
                          </h3>
                          <ChevronRight className={`h-4 w-4 transition-transform group-hover:translate-x-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'
                            }`} />
                        </div>
                        <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'
                          }`}>
                          {action.description}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                /* Chat Interface */
                <div className="flex-1 flex flex-col min-h-0">
                  {/* Chat Messages Area */}
                  <div
                    ref={chatContainerRef}
                    className="flex-1 overflow-y-auto px-6 py-4 chat-scrollbar"
                    style={{
                      scrollBehavior: 'smooth',
                      minHeight: 0 // This is crucial for proper flexbox behavior
                    }}
                  >
                    <div className="max-w-5xl mx-auto">
                      {messages.map((message) => (
                        <div key={message.id} className="px-6 py-4">
                          <div className={`flex gap-4 ${message.type === 'user' ? 'justify-end' : 'justify-start'
                            }`}>
                            {message.type !== 'user' && (
                              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                                <Bot className="w-5 h-5 text-white" />
                              </div>
                            )}
                            <div className={` ${message.type === 'user' ? 'max-w-2xl ' : 'flex-1 max-w-none'}`}>


                              {/* Message content */}
                              <div className={`${message.type === 'user'
                                ? 'text-white dark:text-gray-100 bg-blue-600 rounded-2xl px-4 py-3'
                                : 'text-white dark:text-gray-100'
                                } ${message.type === 'user' ? 'rounded-2xl px-4 py-3 ml-auto' : ''}`}>
                                <div className="text-base leading-relaxed">
                                  {formatMessage(message.content)}
                                </div>
                              </div>

                              {/* Options section */}
                              {message.showOptions && message.options && (
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-4">
                                  {message.options.map((option) => (
                                    <button
                                      key={option.id}
                                      onClick={() => handleOptionClick(option.action, option.text)}
                                      className={`text-left p-3 rounded-lg transition-all duration-200 text-sm font-medium group border border-gray-600 hover:border-gray-500 ${option.color
                                        ? `bg-gradient-to-r ${option.color} text-white border-transparent hover:shadow-lg`
                                        : 'bg-gray-800 hover:bg-gray-700 text-white border-gray-600'
                                        }`}
                                    >
                                      <div className="flex items-center justify-between">
                                        <span className="flex-1">{option.text}</span>
                                        <ArrowRight className="h-4 w-4 opacity-60 group-hover:opacity-100 transition-opacity" />
                                      </div>
                                      {option.desc && (
                                        <div className="text-xs opacity-70 mt-1">
                                          {option.desc}
                                        </div>
                                      )}
                                    </button>
                                  ))}
                                </div>
                              )}

                              {/* Services selection component */}
                              {message.isServicesSelection && (
                                <div className="mt-3">
                                  <ServicesSelectionComponent />
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}

                      {/* Typing indicator */}

                      {isTyping && (
                        <div className="px-6 py-4">
                          <div className="flex gap-4">
                            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                              <Bot className="w-4 h-4 text-white" />
                            </div>
                            <div className="flex-1">
                              {/* Typing dots */}
                              <div className="flex items-center mb-3">
                                <div className="flex gap-1">
                                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                                </div>
                              </div>

                              {/* Skeleton loading lines */}
                              <div className="space-y-2">
                                <div className="h-3 bg-gray-600 rounded animate-pulse w-full"></div>
                                <div className="h-3 bg-gray-600 rounded animate-pulse w-4/5"></div>
                                <div className="h-3 bg-gray-600 rounded animate-pulse w-3/4"></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                    <div ref={messagesEndRef} />
                  </div>

                  {/* Input Area - Fixed at bottom */}

                  <div className="border-gray-700 p-4 bg-gray-900 flex-shrink-0">
                    <div className="max-w-4xl mx-auto">
                      <div className="flex items-end gap-3">
                        {/* Input Container */}
                        <div className="flex-1 relative">
                          <textarea
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Type your message... (Enter to send)"
                            className="w-full px-4 py-3 pl-12 pr-24 text-sm border border-gray-600 rounded-3xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-800 text-gray-100 placeholder-gray-400"
                            rows="3"
                            style={{
                              minHeight: '100px',
                              maxHeight: '200px',
                              height: 'auto'
                            }}
                          />

                          {/* File Upload Button */}
                          <button
                            onClick={handleFileUpload}
                            className="absolute left-2 mb-1 bottom-2 p-2 bg-gray-700 text-gray-300 rounded-full hover:bg-gray-600 transition-colors"
                            title="Upload file"
                          >
                            <Paperclip className="h-4 w-4" />
                          </button>

                          {/* Voice Button */}
                          <button
                            // onClick={handleVoiceInput}
                            className="absolute right-14 mb-1 bottom-2 p-2 bg-gray-700 text-gray-300 rounded-full hover:bg-gray-600 transition-colors"
                            title="Voice input"
                          >
                            <Mic className="h-4 w-4" />
                          </button>

                          {/* Send Button */}
                          <button
                            onClick={handleSendMessage}
                            disabled={!inputValue.trim()}
                            className="absolute right-2 mb-1 bottom-2 p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                          >
                            <Send className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {showAILoader && <AILoaderPopup />}
            </div>
          )}

          {showJobDescModal && (
            // <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            //   <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            //     <div className="p-6 border-b border-gray-200">
            //       <div className="flex items-center justify-between">
            //         <div className="flex items-center gap-3">
            //           <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
            //             <FileText className="h-5 w-5 text-white" />
            //           </div>
            //           <div>
            //             <h3 className="text-xl font-bold text-gray-900">Upload Job Description</h3>
            //             <p className="text-sm text-gray-600">For: {userContext.roleInput}</p>
            //           </div>
            //         </div>
            //         <button
            //           onClick={() => setShowJobDescModal(false)}
            //           className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
            //         >
            //           <X className="h-4 w-4 text-gray-600" />
            //         </button>
            //       </div>
            //     </div>

            //     <div className="p-6">
            //       {/* Upload Section */}
            //       <div className="mb-6">
            //         <div className="flex items-center justify-between mb-3">
            //           <label className="block text-sm font-medium text-gray-700">
            //             📁 Choose Job Description File
            //           </label>
            //           <span className="text-xs text-gray-500">PDF, DOC, DOCX, TXT • Max 5MB</span>
            //         </div>

            //         <div className="relative">
            //           <input
            //             type="file"
            //             accept=".pdf,.doc,.docx,.txt"
            //             onChange={handleJDFileUpload}
            //             className="hidden"
            //             id="jd-file-upload"
            //             disabled={isProcessingFile}
            //           />
            //           <label
            //             htmlFor="jd-file-upload"

            //             className={`w-full border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer transition-all ${isProcessingFile
            //               ? 'opacity-50 cursor-not-allowed border-gray-300'
            //               : uploadedJD
            //                 ? 'border-green-400 bg-green-50 hover:bg-green-100'
            //                 : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50'
            //               }`}
            //           >
            //             {isProcessingFile ? (
            //               <>
            //                 <div className="animate-spin w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full mb-3"></div>
            //                 <span className="text-sm font-medium text-gray-700">Processing file...</span>
            //               </>
            //             ) : uploadedJD ? (
            //               <>
            //                 <CheckCircle className="h-12 w-12 text-green-600 mb-3" />
            //                 <span className="text-lg font-medium text-green-700 mb-1">{uploadedJD.name}</span>
            //                 <span className="text-sm text-gray-600 mb-2">
            //                   {(uploadedJD.size / 1024).toFixed(1)} KB • Uploaded successfully
            //                 </span>
            //                 <span className="text-xs text-blue-600 font-medium">Click to replace file</span>
            //               </>
            //             ) : (
            //               <>
            //                 <Upload className="h-12 w-12 text-gray-400 mb-3" />
            //                 <span className="text-lg font-medium text-gray-700 mb-1">Drop your JD file here</span>
            //                 <span className="text-sm text-gray-500 mb-2">or click to browse</span>
            //                 <div className="flex items-center gap-4 text-xs text-gray-400">
            //                   <span>📄 PDF</span>
            //                   <span>📝 DOC/DOCX</span>
            //                   <span>📋 TXT</span>
            //                 </div>
            //               </>
            //             )}
            //           </label>
            //         </div>

            //         {/* Error Display */}
            //         {uploadError && (
            //           <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
            //             <AlertCircle className="h-4 w-4 text-red-600 flex-shrink-0" />
            //             <span className="text-sm text-red-700">{uploadError}</span>
            //           </div>
            //         )}

            //         {/* Content Preview */}
            //         {extractedContent && !isProcessingFile && (
            //           <div className="mt-4 p-4 bg-gray-50 border border-gray-200 rounded-xl">
            //             <div className="flex items-center justify-between mb-2">
            //               <span className="text-sm font-medium text-gray-700">📋 Extracted Content Preview</span>
            //               <button
            //                 onClick={clearUpload}
            //                 className="text-xs text-red-600 hover:text-red-700 font-medium"
            //               >
            //                 Clear & reupload
            //               </button>
            //             </div>
            //             <div className="text-sm text-gray-600 max-h-32 overflow-y-auto">
            //               {extractedContent.substring(0, 300)}
            //               {extractedContent.length > 300 && '...'}
            //             </div>
            //             <div className="mt-2 text-xs text-gray-500">
            //               {extractedContent.length} characters extracted
            //             </div>
            //           </div>
            //         )}
            //       </div>

            //       {/* Info Box */}
            //       <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
            //         <div className="flex items-start gap-3">
            //           <FileText className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
            //           <div>
            //             <h4 className="font-medium text-blue-900 mb-1">💡 Upload Tips</h4>
            //             <p className="text-sm text-blue-700">
            //               Upload a comprehensive JD with role details, requirements, and qualifications.
            //               Our AI will extract and analyze the content for optimal candidate matching!
            //             </p>
            //           </div>
            //         </div>
            //       </div>

            //       {/* Action Buttons */}
            //       <div className="flex gap-3">
            //         <button
            //           onClick={() => setShowJobDescModal(false)}
            //           className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium"
            //         >
            //           Cancel
            //         </button>
            //         <button
            //           onClick={handleJobDescSubmit}
            //           disabled={!uploadedJD || isProcessingFile || extractedContent.length < 10}
            //           className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl hover:from-blue-600 hover:to-purple-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium shadow-lg"
            //         >
            //           {isProcessingFile ? '⏳ Processing...' : '🎯 Continue AI Analysis'}
            //         </button>
            //       </div>
            //     </div>
            //   </div>
            // </div>
            <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
              <div className="bg-slate-800 border border-slate-700 rounded-3xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
                <div className="p-6 border-b border-slate-700">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                        <FileText className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white">Upload Job Description</h3>
                        <p className="text-sm text-slate-400">For: {userContext.roleInput}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setShowJobDescModal(false)}
                      className="w-8 h-8 bg-slate-700 hover:bg-slate-600 rounded-full flex items-center justify-center transition-colors"
                    >
                      <X className="h-4 w-4 text-slate-300" />
                    </button>
                  </div>
                </div>

                <div className="p-6">
                  {/* Upload Section */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-3">
                      <label className="block text-sm font-medium text-slate-200">
                        📁 Choose Job Description File
                      </label>
                      <span className="text-xs text-slate-500">PDF, DOC, DOCX, TXT • Max 5MB</span>
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
                          ? 'opacity-50 cursor-not-allowed border-slate-600'
                          : uploadedJD
                            ? 'border-blue-500 bg-blue-950/50 hover:bg-blue-900/50'
                            : 'border-slate-600 hover:border-blue-500 hover:bg-slate-750'
                          }`}
                      >
                        {isProcessingFile ? (
                          <>
                            <div className="animate-spin w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full mb-3"></div>
                            <span className="text-sm font-medium text-slate-200">Processing file...</span>
                          </>
                        ) : uploadedJD ? (
                          <>
                            <CheckCircle className="h-12 w-12 text-blue-500 mb-3" />
                            <span className="text-lg font-medium text-blue-400 mb-1">{uploadedJD.name}</span>
                            <span className="text-sm text-slate-400 mb-2">
                              {(uploadedJD.size / 1024).toFixed(1)} KB • Uploaded successfully
                            </span>
                            <span className="text-xs text-blue-400 font-medium">Click to replace file</span>
                          </>
                        ) : (
                          <>
                            <Upload className="h-12 w-12 text-slate-500 mb-3" />
                            <span className="text-lg font-medium text-slate-200 mb-1">Drop your JD file here</span>
                            <span className="text-sm text-slate-400 mb-2">or click to browse</span>
                            <div className="flex items-center gap-4 text-xs text-slate-500">
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
                      <div className="mt-3 p-3 bg-red-950/50 border border-red-800 rounded-lg flex items-center gap-2">
                        <AlertCircle className="h-4 w-4 text-red-400 flex-shrink-0" />
                        <span className="text-sm text-red-300">{uploadError}</span>
                      </div>
                    )}

                    {/* Content Preview */}
                    {extractedContent && !isProcessingFile && (
                      <div className="mt-4 p-4 bg-slate-750 border border-slate-600 rounded-xl">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-slate-200">📋 Extracted Content Preview</span>
                          <button
                            onClick={clearUpload}
                            className="text-xs text-red-400 hover:text-red-300 font-medium"
                          >
                            Clear & reupload
                          </button>
                        </div>
                        <div className="text-sm text-slate-300 max-h-32 overflow-y-auto">
                          {extractedContent.substring(0, 300)}
                          {extractedContent.length > 300 && '...'}
                        </div>
                        <div className="mt-2 text-xs text-slate-500">
                          {extractedContent.length} characters extracted
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Info Box */}
                  <div className="bg-blue-950/30 border border-blue-800/50 rounded-xl p-4 mb-6">
                    <div className="flex items-start gap-3">
                      <FileText className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium text-blue-300 mb-1">💡 Upload Tips</h4>
                        <p className="text-sm text-blue-200">
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
                      className="flex-1 px-4 py-3 border border-slate-600 text-slate-300 rounded-xl hover:bg-slate-700 transition-colors font-medium"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleJobDescSubmit}
                      disabled={!uploadedJD || isProcessingFile || extractedContent.length < 10}
                      className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium shadow-lg"
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
            // <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            //   <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            //     <div className="p-6 border-b border-gray-200">
            //       <div className="flex items-center justify-between">
            //         <div className="flex items-center gap-3">
            //           <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl flex items-center justify-center">
            //             <Upload className="h-5 w-5 text-white" />
            //           </div>
            //           <div>
            //             <h3 className="text-xl font-bold text-white-900">Upload Resumes</h3>
            //             <p className="text-sm text--600">Build your candidate database</p>
            //           </div>
            //         </div>
            //         <button
            //           onClick={() => setShowUploadModal(false)}
            //           className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
            //         >
            //           <X className="h-4 w-4 text--600" />
            //         </button>
            //       </div>
            //     </div>

            //     <div className="p-6">
            //       {/* Upload Area */}
            //       <div
            //         className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center hover:border-blue-400 transition-colors cursor-pointer mb-6"
            //         onClick={() => fileInputRef.current?.click()}
            //       >
            //         <div className="flex flex-col items-center gap-4">
            //           <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center">
            //             <FileUp className="h-8 w-8 text-white" />
            //           </div>
            //           <div>
            //             <h4 className="text-lg font-semibold text-white-900 mb-2">
            //               Drop files here or click to upload
            //             </h4>
            //             <p className="text-sm text--600">
            //               Supports PDF, DOC, DOCX files up to 10MB each
            //             </p>
            //           </div>
            //           <button className="px-6 py-2 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-100 transition-colors font-medium">
            //             📁 Choose Files
            //           </button>
            //         </div>
            //       </div>

            //       <input
            //         ref={fileInputRef}
            //         type="file"
            //         multiple
            //         accept=".pdf,.doc,.docx"
            //         onChange={handleFileUpload}
            //         className="hidden"
            //       />

            //       {/* File List */}
            //       {uploadedFiles.length > 0 && (
            //         <div className="mb-6">
            //           <h4 className="font-medium text-white-900 mb-3">
            //             📄 Uploaded Files ({uploadedFiles.length})
            //           </h4>
            //           <div className="space-y-2 max-h-40 overflow-y-auto">
            //             {uploadedFiles.map((file) => (
            //               <div key={file.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
            //                 <div className="flex items-center gap-3">
            //                   <FileText className="h-5 w-5 text-blue-600" />
            //                   <div>
            //                     <div className="font-medium text-white-900 text-sm">{file.name}</div>
            //                     <div className="text-xs text--500">{file.size}</div>
            //                   </div>
            //                 </div>
            //                 <button
            //                   onClick={() => removeFile(file.id)}
            //                   className="w-6 h-6 bg-red-100 hover:bg-red-200 rounded-full flex items-center justify-center transition-colors"
            //                 >
            //                   <Trash2 className="h-3 w-3 text-red-600" />
            //                 </button>
            //               </div>
            //             ))}
            //           </div>
            //         </div>
            //       )}

            //       {/* AI Processing Info */}
            //       <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-xl p-4 mb-6">
            //         <div className="flex items-start gap-3">
            //           <Zap className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
            //           <div>
            //             <h4 className="font-medium text-green-900 mb-1">🚀 AI Processing</h4>
            //             <p className="text-sm text-green-700">
            //               Our AI will automatically extract skills, experience, education, and contact info
            //               from each resume for intelligent matching.
            //             </p>
            //           </div>
            //         </div>
            //       </div>

            //       <div className="flex gap-3">
            //         <button
            //           onClick={() => setShowUploadModal(false)}
            //           className="flex-1 px-4 py-3 border border-gray-300 text--700 rounded-xl hover:bg-gray-50 transition-colors font-medium"
            //         >
            //           Cancel
            //         </button>
            //         <button
            //           onClick={handleUploadComplete}
            //           disabled={uploadedFiles.length === 0}
            //           className="flex-1 px-4 py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-xl hover:from-green-600 hover:to-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium shadow-lg"
            //         >
            //           🎯 Continue AI Analysis
            //         </button>
            //       </div>
            //     </div>
            //   </div>
            // </div>
            <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
              <div className="bg-slate-800 border border-slate-700 rounded-3xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
                <div className="p-6 border-b border-slate-700">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                        <Upload className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white">Upload Resumes</h3>
                        <p className="text-sm text-slate-400">Build your candidate database</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setShowUploadModal(false)}
                      className="w-8 h-8 bg-slate-700 hover:bg-slate-600 rounded-full flex items-center justify-center transition-colors"
                    >
                      <X className="h-4 w-4 text-slate-300" />
                    </button>
                  </div>
                </div>

                <div className="p-6">
                  {/* Upload Area */}
                  <div
                    className="border-2 border-dashed border-slate-600 rounded-2xl p-8 text-center hover:border-blue-500 hover:bg-slate-750 transition-colors cursor-pointer mb-6"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <div className="flex flex-col items-center gap-4">
                      <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center">
                        <FileUp className="h-8 w-8 text-white" />
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-white mb-2">
                          Drop files here or click to upload
                        </h4>
                        <p className="text-sm text-slate-400">
                          Supports PDF, DOC, DOCX files up to 10MB each
                        </p>
                      </div>
                      <button className="px-6 py-2 bg-blue-950/50 text-blue-400 rounded-xl hover:bg-blue-900/50 hover:text-blue-300 transition-colors font-medium">
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
                      <h4 className="font-medium text-white mb-3">
                        📄 Uploaded Files ({uploadedFiles.length})
                      </h4>
                      <div className="space-y-2 max-h-40 overflow-y-auto">
                        {uploadedFiles.map((file) => (
                          <div key={file.id} className="flex items-center justify-between p-3 bg-slate-750 border border-slate-600 rounded-xl">
                            <div className="flex items-center gap-3">
                              <FileText className="h-5 w-5 text-blue-400" />
                              <div>
                                <div className="font-medium text-white text-sm">{file.name}</div>
                                <div className="text-xs text-slate-400">{file.size}</div>
                              </div>
                            </div>
                            <button
                              onClick={() => removeFile(file.id)}
                              className="w-6 h-6 bg-red-900/50 hover:bg-red-800/50 rounded-full flex items-center justify-center transition-colors"
                            >
                              <Trash2 className="h-3 w-3 text-red-400" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* AI Processing Info */}
                  <div className="bg-blue-950/30 border border-blue-800/50 rounded-xl p-4 mb-6">
                    <div className="flex items-start gap-3">
                      <Zap className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium text-blue-300 mb-1">🚀 AI Processing</h4>
                        <p className="text-sm text-blue-200">
                          Our AI will automatically extract skills, experience, education, and contact info
                          from each resume for intelligent matching.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => setShowUploadModal(false)}
                      className="flex-1 px-4 py-3 border border-slate-600 text-slate-300 rounded-xl hover:bg-slate-700 transition-colors font-medium"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleUploadComplete}
                      disabled={uploadedFiles.length === 0}
                      className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium shadow-lg"
                    >
                      🎯 Continue AI Analysis
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Add this CSS to ensure proper scrolling */}
      <style jsx>{`
  .chat-scrollbar {
    scrollbar-width: thin;
    scrollbar-color: #6B7280 #374151;
  }
  
  .chat-scrollbar::-webkit-scrollbar {
    width: 12px;
  }
  
  .chat-scrollbar::-webkit-scrollbar-track {
    background: #374151;
    border-radius: 6px;
    margin: 4px;
  }
  
  .chat-scrollbar::-webkit-scrollbar-thumb {
    background: #6B7280;
    border-radius: 6px;
    border: 2px solid #374151;
  }
  
  .chat-scrollbar::-webkit-scrollbar-thumb:hover {
    background: #9CA3AF;
  }
  
  .chat-scrollbar::-webkit-scrollbar-corner {
    background: #374151;
  }
  
  /* Ensure scrollbar is always visible */
  .chat-scrollbar::-webkit-scrollbar-thumb {
    min-height: 40px;
  }
  
  /* Ensure proper flex behavior */
  .chat-scrollbar {
    flex: 1;
    min-height: 0;
    overflow-y: auto;
  }
`}</style>

    </div>


  );
};










