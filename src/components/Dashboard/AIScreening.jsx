import { useState } from 'react';
import { Upload, File, Briefcase, X, Check, AlertCircle, ChevronRight, ChevronLeft, Search, Users, Award, Star, Clock, Laptop, Shield, FileText, CheckCircle2, BarChart, User } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function AIScreening() {
  // State for wizard steps
  const [currentStep, setCurrentStep] = useState(1);
  const [resumeFiles, setResumeFiles] = useState([]);
  const [jobDescriptionFile, setJobDescriptionFile] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(null); // null, 'success', 'error'
  const [processing, setProcessing] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [screeningData, setScreeningData] = useState();
  const navigate = useNavigate()

  const handleResumeUpload = (e) => {
    const newFiles = Array.from(e.target.files);
    const pdfFiles = newFiles.filter(file => file.type === 'application/pdf');
    setResumeFiles([...resumeFiles, ...pdfFiles]);
  };

  const handleJobDescriptionUpload = (e) => {
    const newFiles = Array.from(e.target.files);
    const pdfFiles = newFiles.filter(file => file.type === 'application/pdf');
    setJobDescriptionFile([...jobDescriptionFile, ...pdfFiles]);
  };

  const removeResumeFile = (indexToRemove) => {
    setResumeFiles(resumeFiles.filter((_, index) => index !== indexToRemove));
  };

  const removeJobDescriptionFile = (indexToRemove) => {
    setJobDescriptionFile(jobDescriptionFile.filter((_, index) => index !== indexToRemove));
  };

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (resumeFiles.length === 0 || jobDescriptionFile.length === 0) {
      setUploadStatus('error');
      return;
    }
  
    const formData = new FormData();
    resumeFiles.forEach(file => {
      formData.append('resumes', file);
    });
    jobDescriptionFile.forEach(file => {
      formData.append('job_desc', file);
    });
  
    try {
      setProcessing(true);
  
      // Start timer
      const startTime = performance.now();
  
      const res = await axios.post(`https://aurjobssourcingbackend.onrender.com/employers/Job_Filters`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      });
  
      // End timer
      const endTime = performance.now();
      const durationInSeconds = ((endTime - startTime) / 1000).toFixed(2);
      console.log(`Response received in ${durationInSeconds} seconds`);
      console.log(res);

      setScreeningData(res?.data?.results)
  
      setIsUploading(false);
      setProcessing(false);
      setCompleted(true);
      setUploadStatus('success');
    } catch (err) {
      console.log(err);
      setIsUploading(false);
      setProcessing(false);
      setCompleted(false);
      setUploadStatus('error');
    }
  };

  const renderStepIndicator = () => {
    return (
      <div className="mb-6">
        <div className="flex items-center justify-center">
          <div className="flex items-center">
            <div className={`flex items-center justify-center w-10 h-10 rounded-full shadow-md ${currentStep >= 1 ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
              1
            </div>
            <div className={`w-16 h-1 sm:w-24 ${currentStep >= 2 ? 'bg-indigo-600' : 'bg-gray-200'}`}></div>
            <div className={`flex items-center justify-center w-10 h-10 rounded-full shadow-md ${currentStep >= 2 ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
              2
            </div>
            <div className={`w-16 h-1 sm:w-24 ${currentStep >= 3 ? 'bg-indigo-600' : 'bg-gray-200'}`}></div>
            <div className={`flex items-center justify-center w-10 h-10 rounded-full shadow-md ${currentStep >= 3 ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
              3
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-2">
          <div className="flex text-xs text-gray-500 space-x-14 sm:space-x-24">
            <span className={currentStep === 1 ? 'font-semibold text-indigo-600' : ''}>Resumes</span>
            <span className={currentStep === 2 ? 'font-semibold text-indigo-600' : ''}>Job Description</span>
            <span className={currentStep === 3 ? 'font-semibold text-indigo-600' : ''}>Process</span>
          </div>
        </div>
      </div>
    );
  };

  const renderStep1 = () => {
    return (
      <div className="space-y-6">
        <div className="text-center mb-6">
          <h2 className="text-xl font-bold text-gray-800">Upload Candidate Resumes</h2>
          <p className="text-gray-600 mt-1 text-sm">Select all candidate resumes for evaluation</p>
        </div>

        <div className="border-2 border-dashed border-indigo-200 rounded-xl p-6 flex flex-col items-center justify-center bg-white shadow-sm hover:shadow-md transition-all duration-300">
          <Upload className="text-indigo-500 mb-3" size={32} />
          <p className="text-sm text-gray-600 mb-1">Drag and drop PDF files here or click to browse</p>
          <p className="text-xs text-gray-400 mb-4">Accepted file types: PDF only</p>

          <label className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 cursor-pointer transition-all duration-300 text-sm">
            <span className="font-medium">Select Resume Files</span>
            <input
              type="file"
              multiple
              accept=".pdf"
              className="hidden"
              onChange={handleResumeUpload}
            />
          </label>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg mr-3">
                <FileText className="text-blue-600" size={18} />
              </div>
              <div>
                <h3 className="font-medium text-sm text-gray-800">Resume Analysis</h3>
                <p className="text-xs text-gray-500">Extract skills & experience</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg mr-3">
                <CheckCircle2 className="text-green-600" size={18} />
              </div>
              <div>
                <h3 className="font-medium text-sm text-gray-800">Smart Matching</h3>
                <p className="text-xs text-gray-500">AI-powered job fit assessment</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg mr-3">
                <BarChart className="text-purple-600" size={18} />
              </div>
              <div>
                <h3 className="font-medium text-sm text-gray-800">Ranking System</h3>
                <p className="text-xs text-gray-500">Objective candidate comparison</p>
              </div>
            </div>
          </div>
        </div>

        {/* File List */}
        {resumeFiles.length > 0 && (
          <div className="mt-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium text-sm text-gray-800">Selected Resumes ({resumeFiles.length})</h3>
              {resumeFiles.length > 0 && (
                <button
                  className="text-xs text-indigo-600 hover:text-indigo-800"
                  onClick={() => setResumeFiles([])}
                >
                  Clear all
                </button>
              )}
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
              <ul className="space-y-2 max-h-48 overflow-y-auto">
                {resumeFiles.map((file, index) => (
                  <li key={index} className="flex items-center justify-between bg-indigo-50 px-4 py-2 rounded-lg border border-indigo-100 hover:bg-indigo-100 transition-colors">
                    <div className="flex items-center">
                      <File className="text-indigo-500 mr-2" size={16} />
                      <span className="text-xs font-medium text-gray-800 truncate max-w-xs">{file.name}</span>
                      <span className="ml-2 text-xs text-gray-500">({(file.size / 1024).toFixed(1)} KB)</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeResumeFile(index)}
                      className="text-gray-500 hover:text-red-500 p-1 bg-white rounded-full hover:bg-red-50 transition-colors"
                    >
                      <X size={14} />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        <div className="flex justify-end mt-8">
          <button
            type="button"
            onClick={nextStep}
            disabled={resumeFiles.length === 0}
            className="inline-flex items-center px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
          >
            Next Step
            <ChevronRight className="ml-1" size={16} />
          </button>
        </div>
      </div>
    );
  };

  const renderStep2 = () => {
    return (
      <div className="space-y-6">
        <div className="text-center mb-6">
          <h2 className="text-xl font-bold text-gray-800">Upload Job Description</h2>
          <p className="text-gray-600 mt-1 text-sm">Provide the job description to match against candidate resumes</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="border-2 border-dashed border-indigo-200 rounded-xl p-6 flex flex-col items-center justify-center bg-white shadow-sm hover:shadow-md transition-all duration-300">
            <Upload className="text-indigo-500 mb-3" size={32} />
            <p className="text-sm text-gray-600 mb-1">Upload job description as PDF</p>
            <p className="text-xs text-gray-400 mb-4">We'll extract requirements automatically</p>

            <label className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 cursor-pointer transition-all duration-300 text-sm">
              <span className="font-medium">Select Job Description File</span>
              <input
                type="file"
                accept=".pdf"
                className="hidden"
                onChange={handleJobDescriptionUpload}
              />
            </label>
          </div>

          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
            <h3 className="font-medium text-sm text-gray-800 mb-3">How It Works</h3>

            <ul className="space-y-3">
              <li className="flex items-start">
                <div className="flex-shrink-0 p-1 bg-indigo-100 rounded-full mt-0.5">
                  <Check className="text-indigo-600" size={12} />
                </div>
                <div className="ml-2">
                  <p className="text-xs font-medium text-gray-800">NLP Analysis</p>
                  <p className="text-xs text-gray-500">Extract key skills and qualifications</p>
                </div>
              </li>

              <li className="flex items-start">
                <div className="flex-shrink-0 p-1 bg-indigo-100 rounded-full mt-0.5">
                  <Check className="text-indigo-600" size={12} />
                </div>
                <div className="ml-2">
                  <p className="text-xs font-medium text-gray-800">Requirement Mapping</p>
                  <p className="text-xs text-gray-500">Requirements categorized by importance</p>
                </div>
              </li>

              <li className="flex items-start">
                <div className="flex-shrink-0 p-1 bg-indigo-100 rounded-full mt-0.5">
                  <Check className="text-indigo-600" size={12} />
                </div>
                <div className="ml-2">
                  <p className="text-xs font-medium text-gray-800">Intelligent Matching</p>
                  <p className="text-xs text-gray-500">Resumes analyzed against requirements</p>
                </div>
              </li>

              <li className="flex items-start">
                <div className="flex-shrink-0 p-1 bg-indigo-100 rounded-full mt-0.5">
                  <Check className="text-indigo-600" size={12} />
                </div>
                <div className="ml-2">
                  <p className="text-xs font-medium text-gray-800">Ranked Results</p>
                  <p className="text-xs text-gray-500">Candidates ranked by match percentage</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Show uploaded job description file */}
        {jobDescriptionFile.length > 0 && (
          <div className="mt-6">
            <h3 className="font-medium text-sm text-gray-800 mb-3">Selected Job Description</h3>
            <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
              {jobDescriptionFile.map((file, index) => (
                <div key={index} className="flex items-center justify-between bg-green-50 px-4 py-2 rounded-lg border border-green-100">
                  <div className="flex items-center">
                    <File className="text-green-500 mr-2" size={16} />
                    <span className="text-xs font-medium text-gray-800 truncate max-w-xs">{file.name}</span>
                    <span className="ml-2 text-xs text-gray-500">({(file.size / 1024).toFixed(1)} KB)</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeJobDescriptionFile(index)}
                    className="text-gray-500 hover:text-red-500 p-1 bg-white rounded-full hover:bg-red-50 transition-colors"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex justify-between mt-8">
          <button
            type="button"
            onClick={prevStep}
            className="inline-flex items-center px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all duration-300 text-sm"
          >
            <ChevronLeft className="mr-1" size={16} />
            Previous
          </button>

          <button
            type="button"
            onClick={nextStep}
            disabled={jobDescriptionFile.length === 0}
            className="inline-flex items-center px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
          >
            Next Step
            <ChevronRight className="ml-1" size={16} />
          </button>
        </div>
      </div>
    );
  };

  const renderStep3 = () => {
    return (
      <div className="space-y-6">
        <div className="text-center mb-6">
          <h2 className="text-xl font-bold text-gray-800">Process Files</h2>
          <p className="text-gray-600 mt-1 text-sm">Review your uploads and start the AI-powered screening process</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <h3 className="font-medium text-gray-800 mb-4 text-sm">Summary</h3>

            <div className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-gray-100">
                <div className="flex items-center">
                  <div className="p-2 bg-indigo-100 rounded-lg mr-3">
                    <Users className="text-indigo-600" size={16} />
                  </div>
                  <span className="font-medium text-sm">Candidate Resumes</span>
                </div>
                <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-xs font-medium">{resumeFiles.length} files</span>
              </div>

              <div className="flex items-center justify-between py-3">
                <div className="flex items-center">
                  <div className="p-2 bg-purple-100 rounded-lg mr-3">
                    <Briefcase className="text-purple-600" size={16} />
                  </div>
                  <span className="font-medium text-sm">Job Description</span>
                </div>
                <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-xs font-medium">{jobDescriptionFile.length} file</span>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-100">
              <h4 className="font-medium text-gray-700 mb-2 text-xs">Processing Time</h4>
              <div className="flex items-center">
                <Clock className="text-gray-400 mr-1" size={14} />
                <span className="text-gray-600 text-xs">Estimated Time: <span className="font-medium text-gray-800">~1-2 minutes</span></span>
              </div>
            </div>
          </div>

          <div className="bg-indigo-50 rounded-xl border border-indigo-100 p-6 shadow-sm">
            <h3 className="font-medium text-gray-800 mb-4 text-sm">Benefits of AI Screening</h3>

            <ul className="space-y-3">
              <li className="flex items-start">
                <div className="flex-shrink-0 p-1.5 bg-green-100 rounded-full mt-0.5">
                  <Clock className="text-green-600" size={12} />
                </div>
                <div className="ml-3">
                  <p className="font-medium text-gray-800 text-xs">Save 80% of Time</p>
                  <p className="text-xs text-gray-600">Reduce screening time from hours to minutes</p>
                </div>
              </li>

              <li className="flex items-start">
                <div className="flex-shrink-0 p-1.5 bg-blue-100 rounded-full mt-0.5">
                  <Star className="text-blue-600" size={12} />
                </div>
                <div className="ml-3">
                  <p className="font-medium text-gray-800 text-xs">Eliminate Bias</p>
                  <p className="text-xs text-gray-600">AI focuses only on skills and qualifications</p>
                </div>
              </li>

              <li className="flex items-start">
                <div className="flex-shrink-0 p-1.5 bg-purple-100 rounded-full mt-0.5">
                  <Laptop className="text-purple-600" size={12} />
                </div>
                <div className="ml-3">
                  <p className="font-medium text-gray-800 text-xs">Smart Analysis</p>
                  <p className="text-xs text-gray-600">Uncover hidden talent and skills</p>
                </div>
              </li>

              <li className="flex items-start">
                <div className="flex-shrink-0 p-1.5 bg-indigo-100 rounded-full mt-0.5">
                  <Shield className="text-indigo-600" size={12} />
                </div>
                <div className="ml-3">
                  <p className="font-medium text-gray-800 text-xs">Secure & Private</p>
                  <p className="text-xs text-gray-600">All data encrypted and processed securely</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex justify-between mt-8">
          <button
            type="button"
            onClick={prevStep}
            className="inline-flex items-center px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all duration-300 text-sm"
          >
            <ChevronLeft className="mr-1" size={16} />
            Previous
          </button>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={isUploading || processing}
            className="inline-flex items-center px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
          >
            {isUploading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Uploading Files...
              </>
            ) : processing ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Running AI Analysis...
              </>
            ) : "Start Candidate Screening"}
          </button>
        </div>
      </div>
    );
  };

  const renderCompletedScreen = () => {
    return (
      <div className="text-center space-y-6 py-4">
        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-500 shadow-md">
          <Check className="h-8 w-8 text-white" />
        </div>

        <div>
          <h2 className="text-xl font-bold text-gray-800">Screening Completed!</h2>
          <p className="text-gray-600 mt-2 text-sm max-w-2xl mx-auto">
            We've successfully processed {resumeFiles.length} resumes against your job description.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
          <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm hover:shadow-md transition-all duration-300">
            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-100 mx-auto mb-3">
              <User className="text-blue-600" size={18} />
            </div>
            <h3 className="font-medium text-sm mb-1">75 Skills</h3>
            <p className="text-gray-600 text-xs">Unique skills identified</p>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm hover:shadow-md transition-all duration-300">
            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-purple-100 mx-auto mb-3">
              <Award className="text-purple-600" size={18} />
            </div>
            <h3 className="font-medium text-sm mb-1">3 Top Matches</h3>
            <p className="text-gray-600 text-xs">90%+ match to requirements</p>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm hover:shadow-md transition-all duration-300">
            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-green-100 mx-auto mb-3">
              <CheckCircle2 className="text-green-600" size={18} />
            </div>
            <h3 className="font-medium text-sm mb-1">100% Complete</h3>
            <p className="text-gray-600 text-xs">All resumes processed</p>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 max-w-3xl mx-auto shadow-md">
          <h3 className="font-medium text-gray-800 mb-4 flex items-center justify-center text-sm">
            <Award className="text-indigo-500 mr-2" size={18} />
            Top Candidates
          </h3>

          <div className="space-y-3">
            {screeningData?.slice(0,3)?.map((candidate, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-indigo-50 rounded-lg border border-indigo-100 hover:shadow-sm transition-all duration-300">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center mr-3 shadow-sm">
                    <span className="font-medium text-white text-xs">{index + 1}</span>
                  </div>
                  <div className="text-left">
                    <p className="font-medium text-gray-800 text-sm">{candidate.name}</p>
                    <div className="flex items-center mt-1">
                      <div className="w-24 bg-gray-200 rounded-full h-1.5 mr-2">
                        <div className="bg-indigo-600 h-1.5 rounded-full" style={{ width: `${candidate.match_score}%` }}></div>
                      </div>
                      <span className="text-xs text-indigo-700 font-medium">{candidate.match_score}%</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-gray-100 text-center">
            <button onClick={()=>navigate("/ai_screening_result",{ state: { screeningData: screeningData } })} className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-md hover:shadow-lg font-medium">
              View Complete Results
            </button>
          </div>
        </div>

        <div className="mt-6 flex justify-center">
          <button
            onClick={() => {
              setCurrentStep(1);
              setResumeFiles([]);
              setJobDescriptionFile([]);
              setUploadStatus(null);
              setCompleted(false);
            }}
            className="inline-flex items-center px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all duration-300 text-sm"
          >
            Start New Screening
          </button>
        </div>
      </div>
    );
  };

  const renderContent = () => {
    if (completed) {
      return renderCompletedScreen();
    }

    switch (currentStep) {
      case 1:
        return renderStep1();
      case 2:
        return renderStep2();
      case 3:
        return renderStep3();
      default:
        return renderStep1();
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen px-4 py-8">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg p-6 md:p-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-indigo-700 text-center mb-2">AI Resume Screening</h1>
          <p className="text-gray-500 text-center text-sm">
            Match the best candidates to your job openings with AI-powered resume screening
          </p>
        </div>

        {!completed && renderStepIndicator()}
        {renderContent()}
      </div>

      {uploadStatus === 'error' && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-red-50 border-l-4 border-red-500 rounded-lg px-4 py-3 shadow-md flex items-center">
          <AlertCircle className="text-red-500 mr-2" size={20} />
          <div>
            <p className="text-sm font-medium text-red-800">Error</p>
            <p className="text-xs text-red-700">
              Please upload both resumes and job description to continue.
            </p>
          </div>
          <button 
            className="ml-4 text-red-500 hover:text-red-700"
            onClick={() => setUploadStatus(null)}
          >
            <X size={16} />
          </button>
        </div>
      )}
    </div>
  );
}