// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import RegisterImage from '../assets/CompanyRegisterImage.png'
// import axios from "axios";
// import { toast } from 'react-toastify';
// import { BASEURL } from "../utility/config";
// import { Loader2 } from "lucide-react";

// const CompanyRegistration = ({ navigateToLogin }) => {

//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     company_name: "",
//     company_email: "",
//     company_password: "",
//     confirmPassword: "",
//   });
//   const [loading, setLoading] = useState(false);
//   const [errors, setErrors] = useState({});

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//     setErrors((prev) => ({ ...prev, [name]: "" }));
//   };

//   const validateForm = () => {
//     const newErrors = {};
//     if (!formData.company_name.trim()) {
//       newErrors.company_name = "Company Name is required.";
//     }
//     if (!formData.company_email.trim()) {
//       newErrors.company_email = "Company Email is required.";
//     } else if (
//       !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.company_email)
//     ) {
//       newErrors.company_email = "Invalid email address.";
//     }
//     if (!formData.password?.trim()) {
//       newErrors.password = "Password is required.";
//     }
//     if (!formData.confirmPassword?.trim()) {
//       newErrors.confirmPassword = "Confirm Password is required.";
//     } else if (formData.password !== formData.confirmPassword) {
//       newErrors.confirmPassword = "Passwords do not match.";
//     }
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     console.log(formData)

//     try {
//       setLoading(true)
//       const res = await axios.post(`${BASEURL}/employers/Employer_Signup`, formData, {
//         headers: {
//           "Content-Type": "application/json"
//         },
//         withCredentials: true
//       })

//       if (res?.data?.success) {
//         toast.success(res?.data?.message, {
//           duration: 4000,
//           position: 'top-right'
//         });
//         navigate("/company_login");
//         setLoading(false)
//       }
//     } catch (err) {
//       console.log(err);
//       setLoading(false)
//       toast.error(err.response?.data?.error , {
//         duration: 4000,
//         position: 'top-right',
//       });
//     } finally {
//       setLoading(false)
//     }
//   };

//   return (
//     <div className="min-h-screen w-full flex items-center justify-center bg-white ">
//       <div className="flex flex-row md:flex-row w-full justify-center overflow-hidden">
//         {/* Image Section */}
//         <div className="w-full md:w-1/2 lg:flex justify-start items-stretch hidden md:block bg-orange-500">
//           <img
//             src={RegisterImage}
//             alt="Register"
//             className="w-full h-screen object-cover"
//           />
//         </div>

//         {/* Form Section */}
//         <div className="w-full md:w-1/2 flex justify-center items-center p-8">
//           <div className="w-full">
         
//             <div className="max-w-md mx-auto">
//               <h2 className="text-2xl font-bold text-black mb-6 text-center">
//                 Registration
//               </h2>

//               <form onSubmit={handleSubmit} noValidate>
//                 {/* Company Name */}
//                 <div className="relative mt-4">
//                   <input
//                     type="text"
//                     id="company_name"
//                     name="company_name"
//                     value={formData.company_name}
//                     onChange={handleChange}
//                     className={`block w-full p-2 border-black border-b-[1.5px] focus:outline-none peer ${
//                       errors.company_name ? 'border-b-red-500' : 'border-b-black'
//                     } ${formData.company_name ? 'pt-4 pb-0' : ''}`}
//                     placeholder=" "
//                   />
//                   <label
//                     htmlFor="company_name"
//                     className={`absolute text-md text-black duration-300 transform origin-[0] ${
//                       formData.company_name
//                         ? 'top-0 -translate-y-4 scale-75'
//                         : 'peer-focus:top-0 peer-focus:-translate-y-4 peer-focus:scale-75 top-2 scale-100 translate-y-0'
//                     }`}
//                   >
//                     Company Name
//                   </label>
//                   {errors.company_name && (
//                     <p className="text-red-500 text-sm mt-1">
//                       {errors.company_name}
//                     </p>
//                   )}
//                 </div>

//                 {/* Company Email */}
//                 <div className="relative mt-4">
//                   <input
//                     type="email"
//                     id="company_email"
//                     name="company_email"
//                     value={formData.company_email}
//                     onChange={handleChange}
//                     className={`block w-full p-2 border-black border-b-[1.5px] focus:outline-none peer ${
//                       errors.company_email ? 'border-b-red-500' : 'border-b-black'
//                     } ${formData.company_email ? 'pt-4 pb-0' : ''}`}
//                     placeholder=" "
//                   />
//                   <label
//                     htmlFor="company_email"
//                     className={`absolute text-md text-black duration-300 transform origin-[0] ${
//                       formData.company_email
//                         ? 'top-0 -translate-y-4 scale-75'
//                         : 'peer-focus:top-0 peer-focus:-translate-y-4 peer-focus:scale-75 top-2 scale-100 translate-y-0'
//                     }`}
//                   >
//                     Company Email
//                   </label>
//                   {errors.company_email && (
//                     <p className="text-red-500 text-sm mt-1">
//                       {errors.company_email}
//                     </p>
//                   )}
//                 </div>

//                 {/* Password */}
//                 <div className="relative mt-4">
//                   <input
//                     type="password"
//                     id="password"
//                     name="company_password"
//                     value={formData.company_password}
//                     onChange={handleChange}
//                     className={`block w-full p-2 border-black border-b-[1.5px] focus:outline-none peer ${
//                       errors.company_password ? 'border-b-red-500' : 'border-b-black'
//                     } ${formData.company_password ? 'pt-4 pb-0' : ''}`}
//                     placeholder=" "
//                   />
//                   <label
//                     htmlFor="password"
//                     className={`absolute text-md text-black duration-300 transform origin-[0] ${
//                       formData.company_password
//                         ? 'top-0 -translate-y-4 scale-75'
//                         : 'peer-focus:top-0 peer-focus:-translate-y-4 peer-focus:scale-75 top-2 scale-100 translate-y-0'
//                     }`}
//                   >
//                     Password
//                   </label>
//                   {errors.company_password && (
//                     <p className="text-red-500 text-sm mt-1">
//                       {errors.company_password}
//                     </p>
//                   )}
//                 </div>

//                 {/* Confirm Password */}
//                 <div className="relative mt-4">
//                   <input
//                     type="password"
//                     id="confirmPassword"
//                     name="confirmPassword"
//                     value={formData.confirmPassword}
//                     onChange={handleChange}
//                     className={`block w-full p-2 border-black border-b-[1.5px] focus:outline-none peer ${
//                       errors.confirmPassword ? 'border-b-red-500' : 'border-b-black'
//                     } ${formData.confirmPassword ? 'pt-4 pb-0' : ''}`}
//                     placeholder=" "
//                   />
//                   <label
//                     htmlFor="confirmPassword"
//                     className={`absolute text-md text-black duration-300 transform origin-[0] ${
//                       formData.confirmPassword
//                         ? 'top-0 -translate-y-4 scale-75'
//                         : 'peer-focus:top-0 peer-focus:-translate-y-4 peer-focus:scale-75 top-2 scale-100 translate-y-0'
//                     }`}
//                   >
//                     Confirm Password
//                   </label>
//                   {errors.confirmPassword && (
//                     <p className="text-red-500 text-sm mt-1">
//                       {errors.confirmPassword}
//                     </p>
//                   )}
//                 </div>

//                 {/* Submit Button */}
//                 {/* <button
//                   type="submit"
//                   className="w-full mt-4 bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 >
//                   Register
//                 </button> */}

//                 {loading ? (
//               <button
//                 type="submit"
//                 className="w-full mt-4 bg-orange-600 text-white py-3 rounded-lg hover:bg-orange-700 transition flex items-center justify-center"
//                 disabled
//               >
//                 <Loader2 className='mr-2 h-5 w-5 animate-spin' />Please Wait
//               </button>
//             ) : (
//               <button
//                 type="submit"
//                  className="w-full mt-4 bg-orange-500 text-white py-3 px-4 rounded-md hover:bg-blue-600 transition duration-200"
//               >
//                 Register
//               </button>
//             )}
//               </form>

//               <div className="text-center mt-4">
//                 <p className="text-gray-600">
//                   Already have an account?{" "}
//                   <Link to="/company_login">
//                     <span className="text-orange-500 hover:text-blue-600 font-medium cursor-pointer">
//                       Log in
//                     </span>
//                   </Link>
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );



// };

// export default CompanyRegistration;


// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import RegisterImage from '../assets/CompanyRegisterImage.png';
// import axios from "axios";
// import { toast } from 'react-toastify';
// import { BASEURL } from "../utility/config";
// import { Loader2, Building2, Mail, Lock, EyeOff, Eye, Check, X } from "lucide-react";

// const CompanyRegistration = ({ navigateToLogin }) => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     company_name: "",
//     company_email: "",
//     company_password: "",
//     confirmPassword: "",
    
//     terms_accepted: false
//   });
  
//   const [loading, setLoading] = useState(false);
//   const [errors, setErrors] = useState({});
//   const [focused, setFocused] = useState({});
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [passwordStrength, setPasswordStrength] = useState({
//     score: 0,
//     hasMinLength: false,
//     hasUppercase: false,
//     hasLowercase: false,
//     hasNumber: false,
//     hasSpecial: false
//   });

  

  

//   const handleFocus = (name) => {
//     setFocused(prev => ({ ...prev, [name]: true }));
//   };

//   const handleBlur = (name) => {
//     setFocused(prev => ({ ...prev, [name]: false }));
//     validateField(name, formData[name]);
//   };

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     const newValue = type === 'checkbox' ? checked : value;
    
//     setFormData(prev => ({ ...prev, [name]: newValue }));
    
//     if (name === 'company_password') {
//       checkPasswordStrength(value);
//     }
    
//     if (focused[name]) {
//       validateField(name, newValue);
//     }
//   };

//   const checkPasswordStrength = (password) => {
//     const hasMinLength = password.length >= 8;
//     const hasUppercase = /[A-Z]/.test(password);
//     const hasLowercase = /[a-z]/.test(password);
//     const hasNumber = /[0-9]/.test(password);
//     const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    
//     let score = 0;
//     if (hasMinLength) score++;
//     if (hasUppercase) score++;
//     if (hasLowercase) score++;
//     if (hasNumber) score++;
//     if (hasSpecial) score++;
    
//     setPasswordStrength({
//       score,
//       hasMinLength,
//       hasUppercase,
//       hasLowercase,
//       hasNumber,
//       hasSpecial
//     });
//   };

//   const validateField = (name, value) => {
//     let error = "";
    
//     switch (name) {
//       case "company_name":
//         if (!value.trim()) {
//           error = "Company Name is required";
//         } else if (value.trim().length < 2) {
//           error = "Company Name must be at least 2 characters";
//         }
//         break;
        
//       case "company_email":
//         if (!value.trim()) {
//           error = "Company Email is required";
//         } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
//           error = "Invalid email address";
//         }
//         break;
        
//       case "company_password":
//         if (!value) {
//           error = "Password is required";
//         } else if (value.length < 8) {
//           error = "Password must be at least 8 characters";
//         } else if (!/[A-Z]/.test(value)) {
//           error = "Password must contain at least one uppercase letter";
//         } else if (!/[a-z]/.test(value)) {
//           error = "Password must contain at least one lowercase letter";
//         } else if (!/[0-9]/.test(value)) {
//           error = "Password must contain at least one number";
//         } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
//           error = "Password must contain at least one special character";
//         }
//         break;
        
//       case "confirmPassword":
//         if (!value) {
//           error = "Confirm Password is required";
//         } else if (value !== formData.company_password) {
//           error = "Passwords do not match";
//         }
//         break;
        
      
        
//       case "terms_accepted":
//         if (!value) {
//           error = "You must accept the Terms and Conditions";
//         }
//         break;
        
//       default:
//         break;
//     }
    
//     setErrors(prev => ({ ...prev, [name]: error }));
//     return error === "";
//   };

//   const validateForm = () => {
//     const fieldsToValidate = [
//       "company_name", 
//       "company_email", 
//       "company_password", 
//       "confirmPassword",
//       "industry",
//       "company_size",
//       "terms_accepted"
//     ];
    
//     const newErrors = {};
//     let isValid = true;
    
//     fieldsToValidate.forEach(field => {
//       if (!validateField(field, formData[field])) {
//         isValid = false;
//       }
//     });
    
//     return isValid;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     if (!validateForm()) {
//       toast.error("Please fix the errors in the form", {
//         position: 'top-right',
//         duration: 4000
//       });
//       return;
//     }
    
//     try {
//       setLoading(true);
      
//       // Create payload with necessary fields for the API
//       const payload = {
//         company_name: formData.company_name,
//         company_email: formData.company_email,
//         company_password: formData.company_password,
        
//       };
      
//       const res = await axios.post(`${BASEURL}/employers/Employer_Signup`, payload, {
//         headers: {
//           "Content-Type": "application/json"
//         },
//         withCredentials: true
//       });

//       console.log(payload)
//       if (res?.data?.success) {
//         toast.success(res?.data?.message, {
//           duration: 4000,
//           position: 'top-right'
//         });
//         navigate("/company_login");
//       }
//     } catch (err) {
//       console.log(err);
//       toast.error(err.response?.data?.error || "Registration failed", {
//         duration: 4000,
//         position: 'top-right',
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Calculate password strength percentage for progress bar
//   const passwordStrengthPercentage = (passwordStrength.score / 5) * 100;
  
//   return (
//     <div className="min-h-screen w-full flex items-center justify-center bg-white">
//       <div className="flex flex-row md:flex-row w-full justify-center overflow-hidden  rounded-xl">
//         {/* Image Section */}
//         <div className="w-full md:w-1/2 lg:flex justify-start items-stretch hidden md:block bg-orange-500 ">
//           <img
//             src={RegisterImage}
//             alt="Register"
//             className="w-full h-screen object-cover"
//           />
//           {/* <div className="absolute top-0 left-0 w-1/2 h-screen bg-gradient-to-r from-black/40 to-transparent flex flex-col justify-center pl-12  md:flex">
//             <h1 className="text-4xl font-bold text-white mb-4">Join Our Network</h1>
//             <p className="text-white text-lg max-w-md">Register your company to access top talent and grow your team with qualified professionals.</p>
//           </div> */}
//         </div>

//         {/* Form Section */}
//         <div className="w-full md:w-1/2 flex justify-center items-center p-8 bg-white">
//           <div className="w-full max-w-md">
//             <div className="mb-8">
//               <h2 className="text-3xl font-bold text-gray-800 mb-2 text-center">
//                 Company Registration
//               </h2>
//               <p className="text-gray-600 text-center">Create your employer account to start hiring</p>
//             </div>

//             <form onSubmit={handleSubmit} noValidate className="space-y-5">
//               {/* Company Name */}
//               <div className="relative">
//                 <label htmlFor="company_name" className="text-sm font-medium text-gray-700 mb-1 block">
//                   Company Name
//                 </label>
//                 <div className="relative">
//                   <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
//                   <input
//                     type="text"
//                     id="company_name"
//                     name="company_name"
//                     value={formData.company_name}
//                     onChange={handleChange}
//                     onFocus={() => handleFocus("company_name")}
//                     onBlur={() => handleBlur("company_name")}
//                     className={`pl-10 pr-4 py-3 w-full rounded-lg border ${
//                       errors.company_name ? 'border-red-500' : 'border-gray-300'
//                     } focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all`}
//                     placeholder="Enter your company name"
//                   />
//                 </div>
//                 {errors.company_name && (
//                   <p className="text-red-500 text-sm mt-1">
//                     {errors.company_name}
//                   </p>
//                 )}
//               </div>

//               {/* Company Email */}
//               <div className="relative">
//                 <label htmlFor="company_email" className="text-sm font-medium text-gray-700 mb-1 block">
//                   Company Email
//                 </label>
//                 <div className="relative">
//                   <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
//                   <input
//                     type="email"
//                     id="company_email"
//                     name="company_email"
//                     value={formData.company_email}
//                     onChange={handleChange}
//                     onFocus={() => handleFocus("company_email")}
//                     onBlur={() => handleBlur("company_email")}
//                     className={`pl-10 pr-4 py-3 w-full rounded-lg border ${
//                       errors.company_email ? 'border-red-500' : 'border-gray-300'
//                     } focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all`}
//                     placeholder="company@example.com"
//                   />
//                 </div>
//                 {errors.company_email && (
//                   <p className="text-red-500 text-sm mt-1">
//                     {errors.company_email}
//                   </p>
//                 )}
//               </div>


//               {/* Password */}
//               <div className="relative">
//                 <label htmlFor="company_password" className="text-sm font-medium text-gray-700 mb-1 block">
//                   Password
//                 </label>
//                 <div className="relative">
//                   <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
//                   <input
//                     type={showPassword ? "text" : "password"}
//                     id="company_password"
//                     name="company_password"
//                     value={formData.company_password}
//                     onChange={handleChange}
//                     onFocus={() => handleFocus("company_password")}
//                     onBlur={() => handleBlur("company_password")}
//                     className={`pl-10 pr-10 py-3 w-full rounded-lg border ${
//                       errors.company_password ? 'border-red-500' : 'border-gray-300'
//                     } focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all`}
//                     placeholder="Create a strong password"
//                   />
//                   <button
//                     type="button"
//                     className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
//                     onClick={() => setShowPassword(!showPassword)}
//                   >
//                     {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
//                   </button>
//                 </div>
//                 {errors.company_password && (
//                   <p className="text-red-500 text-sm mt-1">
//                     {errors.company_password}
//                   </p>
//                 )}
                
//                 {/* Password strength meter */}
//                 {formData.company_password && (
//                   <div className="mt-2">
//                     <div className="w-full bg-gray-200 rounded-full h-2">
//                       <div
//                         className={`h-2 rounded-full ${
//                           passwordStrengthPercentage < 40
//                             ? 'bg-red-500'
//                             : passwordStrengthPercentage < 80
//                             ? 'bg-yellow-500'
//                             : 'bg-green-500'
//                         }`}
//                         style={{ width: `${passwordStrengthPercentage}%` }}
//                       ></div>
//                     </div>
//                     <div className="flex flex-col space-y-1 text-xs mt-2">
//                       <div className="flex items-center gap-1">
//                         {passwordStrength.hasMinLength ? 
//                           <Check className="h-3 w-3 text-green-500" /> : 
//                           <X className="h-3 w-3 text-red-500" />} 
//                         <span>At least 8 characters</span>
//                       </div>
//                       <div className="flex items-center gap-1">
//                         {passwordStrength.hasUppercase ? 
//                           <Check className="h-3 w-3 text-green-500" /> : 
//                           <X className="h-3 w-3 text-red-500" />} 
//                         <span>Uppercase letter</span>
//                       </div>
//                       <div className="flex items-center gap-1">
//                         {passwordStrength.hasLowercase ? 
//                           <Check className="h-3 w-3 text-green-500" /> : 
//                           <X className="h-3 w-3 text-red-500" />} 
//                         <span>Lowercase letter</span>
//                       </div>
//                       <div className="flex items-center gap-1">
//                         {passwordStrength.hasNumber ? 
//                           <Check className="h-3 w-3 text-green-500" /> : 
//                           <X className="h-3 w-3 text-red-500" />} 
//                         <span>Number</span>
//                       </div>
//                       <div className="flex items-center gap-1">
//                         {passwordStrength.hasSpecial ? 
//                           <Check className="h-3 w-3 text-green-500" /> : 
//                           <X className="h-3 w-3 text-red-500" />} 
//                         <span>Special character</span>
//                       </div>
//                     </div>
//                   </div>
//                 )}
//               </div>

//               {/* Confirm Password */}
//               <div className="relative">
//                 <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700 mb-1 block">
//                   Confirm Password
//                 </label>
//                 <div className="relative">
//                   <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
//                   <input
//                     type={showConfirmPassword ? "text" : "password"}
//                     id="confirmPassword"
//                     name="confirmPassword"
//                     value={formData.confirmPassword}
//                     onChange={handleChange}
//                     onFocus={() => handleFocus("confirmPassword")}
//                     onBlur={() => handleBlur("confirmPassword")}
//                     className={`pl-10 pr-10 py-3 w-full rounded-lg border ${
//                       errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
//                     } focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all`}
//                     placeholder="Confirm your password"
//                   />
//                   <button
//                     type="button"
//                     className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
//                     onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                   >
//                     {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
//                   </button>
//                 </div>
//                 {errors.confirmPassword && (
//                   <p className="text-red-500 text-sm mt-1">
//                     {errors.confirmPassword}
//                   </p>
//                 )}
//               </div>

//               {/* Terms and Conditions Checkbox */}
//               <div className="flex items-start mt-4">
//                 <div className="flex items-center h-5">
//                   <input
//                     id="terms_accepted"
//                     name="terms_accepted"
//                     type="checkbox"
//                     checked={formData.terms_accepted}
//                     onChange={handleChange}
//                     onFocus={() => handleFocus("terms_accepted")}
//                     onBlur={() => handleBlur("terms_accepted")}
//                     className={`h-4 w-4 text-orange-500 focus:ring-orange-500 border-gray-300 rounded ${
//                       errors.terms_accepted ? 'border-red-500' : ''
//                     }`}
//                   />
//                 </div>
//                 <div className="ml-3 text-sm">
//                   <label htmlFor="terms_accepted" className="font-medium text-gray-700">
//                     I agree to the <a href="#" className="text-orange-500 hover:text-orange-700">Terms and Conditions</a> and <a href="#" className="text-orange-500 hover:text-orange-700">Privacy Policy</a>
//                   </label>
//                   {errors.terms_accepted && (
//                     <p className="text-red-500 text-xs mt-1">
//                       {errors.terms_accepted}
//                     </p>
//                   )}
//                 </div>
//               </div>

//               {/* Submit Button */}
//               {loading ? (
//                 <button
//                   type="button"
//                   className="w-full mt-6 bg-orange-600 text-white py-3 rounded-lg flex items-center justify-center"
//                   disabled
//                 >
//                   <Loader2 className="mr-2 h-5 w-5 animate-spin" />Please Wait
//                 </button>
//               ) : (
//                 <button
//                   type="submit"
//                   className="w-full mt-6 bg-orange-500 text-white py-3 px-4 rounded-lg hover:bg-orange-600 transition duration-200 font-medium shadow-md"
//                 >
//                   Create Account
//                 </button>
//               )}
//             </form>

//             <div className="text-center mt-6">
//               <p className="text-gray-600">
//                 Already have an account?{" "}
//                 <Link to="/company_login">
//                   <span className="text-orange-500 hover:text-orange-700 font-medium cursor-pointer">
//                     Log in
//                   </span>
//                 </Link>
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CompanyRegistration;


// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import RegisterImage from '../assets/CompanyRegisterImage.png';
// import axios from "axios";
// import { toast } from 'react-toastify';
// import { BASEURL } from "../utility/config";
// import { Loader2, Building2, Mail, Lock, EyeOff, Eye, Check, X, Briefcase, Users } from "lucide-react";

// // CSS for background pattern
// const backgroundPatternCSS = `
//   .bg-pattern {
//     background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.2'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
//   }
// `;

// const CompanyRegistration = ({ navigateToLogin }) => {
//   // Insert the background pattern CSS into the document head
//   useEffect(() => {
//     const style = document.createElement('style');
//     style.textContent = backgroundPatternCSS;
//     document.head.appendChild(style);
//     return () => {
//       document.head.removeChild(style);
//     };
//   }, []);
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     company_name: "",
//     company_email: "",
//     company_password: "",
//     confirmPassword: "",
//     industry: "",
//     company_size: "",
//     terms_accepted: false
//   });
  
//   const [loading, setLoading] = useState(false);
//   const [errors, setErrors] = useState({});
//   const [focused, setFocused] = useState({});
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [passwordStrength, setPasswordStrength] = useState({
//     score: 0,
//     hasMinLength: false,
//     hasUppercase: false,
//     hasLowercase: false,
//     hasNumber: false,
//     hasSpecial: false
//   });

//   const industryOptions = [
//     "Technology",
//     "Healthcare",
//     "Finance",
//     "Education",
//     "Manufacturing",
//     "Retail",
//     "Construction",
//     "Transportation",
//     "Hospitality",
//     "Other"
//   ];

//   const companySizeOptions = [
//     "1-10 employees",
//     "11-50 employees",
//     "51-200 employees",
//     "201-500 employees",
//     "501-1000 employees",
//     "1000+ employees"
//   ];

//   const handleFocus = (name) => {
//     setFocused(prev => ({ ...prev, [name]: true }));
//   };

//   const handleBlur = (name) => {
//     setFocused(prev => ({ ...prev, [name]: false }));
//     validateField(name, formData[name]);
//   };

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     const newValue = type === 'checkbox' ? checked : value;
    
//     setFormData(prev => ({ ...prev, [name]: newValue }));
    
//     if (name === 'company_password') {
//       checkPasswordStrength(value);
//     }
    
//     if (focused[name]) {
//       validateField(name, newValue);
//     }
//   };

//   const checkPasswordStrength = (password) => {
//     const hasMinLength = password.length >= 8;
//     const hasUppercase = /[A-Z]/.test(password);
//     const hasLowercase = /[a-z]/.test(password);
//     const hasNumber = /[0-9]/.test(password);
//     const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    
//     let score = 0;
//     if (hasMinLength) score++;
//     if (hasUppercase) score++;
//     if (hasLowercase) score++;
//     if (hasNumber) score++;
//     if (hasSpecial) score++;
    
//     setPasswordStrength({
//       score,
//       hasMinLength,
//       hasUppercase,
//       hasLowercase,
//       hasNumber,
//       hasSpecial
//     });
//   };

//   const validateField = (name, value) => {
//     let error = "";
    
//     switch (name) {
//       case "company_name":
//         if (!value.trim()) {
//           error = "Company Name is required";
//         } else if (value.trim().length < 2) {
//           error = "Company Name must be at least 2 characters";
//         }
//         break;
        
//       case "company_email":
//         if (!value.trim()) {
//           error = "Company Email is required";
//         } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
//           error = "Invalid email address";
//         }
//         break;
        
//       case "company_password":
//         if (!value) {
//           error = "Password is required";
//         } else if (value.length < 8) {
//           error = "Password must be at least 8 characters";
//         } else if (!/[A-Z]/.test(value)) {
//           error = "Password must contain at least one uppercase letter";
//         } else if (!/[a-z]/.test(value)) {
//           error = "Password must contain at least one lowercase letter";
//         } else if (!/[0-9]/.test(value)) {
//           error = "Password must contain at least one number";
//         } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
//           error = "Password must contain at least one special character";
//         }
//         break;
        
//       case "confirmPassword":
//         if (!value) {
//           error = "Confirm Password is required";
//         } else if (value !== formData.company_password) {
//           error = "Passwords do not match";
//         }
//         break;
        
//       case "industry":
//         if (!value) {
//           error = "Please select your industry";
//         }
//         break;
        
//       case "company_size":
//         if (!value) {
//           error = "Please select your company size";
//         }
//         break;
        
//       case "terms_accepted":
//         if (!value) {
//           error = "You must accept the Terms and Conditions";
//         }
//         break;
        
//       default:
//         break;
//     }
    
//     setErrors(prev => ({ ...prev, [name]: error }));
//     return error === "";
//   };

//   const validateForm = () => {
//     const fieldsToValidate = [
//       "company_name", 
//       "company_email", 
//       "company_password", 
//       "confirmPassword",
//       "industry",
//       "company_size",
//       "terms_accepted"
//     ];
    
//     const newErrors = {};
//     let isValid = true;
    
//     fieldsToValidate.forEach(field => {
//       if (!validateField(field, formData[field])) {
//         isValid = false;
//       }
//     });
    
//     return isValid;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     if (!validateForm()) {
//       toast.error("Please fix the errors in the form", {
//         position: 'top-right',
//         duration: 4000
//       });
//       return;
//     }
    
//     try {
//       setLoading(true);
      
//       // Create payload with necessary fields for the API
//       const payload = {
//         company_name: formData.company_name,
//         company_email: formData.company_email,
//         company_password: formData.company_password,
//         industry: formData.industry,
//         company_size: formData.company_size
//       };
      
//       const res = await axios.post(`${BASEURL}/employers/Employer_Signup`, payload, {
//         headers: {
//           "Content-Type": "application/json"
//         },
//         withCredentials: true
//       });

//       if (res?.data?.success) {
//         toast.success(res?.data?.message, {
//           duration: 4000,
//           position: 'top-right'
//         });
//         navigate("/company_login");
//       }
//     } catch (err) {
//       console.log(err);
//       toast.error(err.response?.data?.error || "Registration failed", {
//         duration: 4000,
//         position: 'top-right',
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Calculate password strength percentage for progress bar
//   const passwordStrengthPercentage = (passwordStrength.score / 5) * 100;
  
//   return (
//     <div className="min-h-screen w-full flex items-center justify-center bg-white">
//       <div className="flex flex-row md:flex-row w-full justify-center overflow-hidden ">
//         {/* Image Section */}
//         <div className="flex flex-row md:flex-row md:w-1/2 w-full justify-center overflow-hidden  rounded-xl">
//           <div className="absolute inset-0 bg-pattern opacity-10"></div>
//           {/* <img
//             src={RegisterImage}
//             alt="Register"
//             className="w-full h-screen object-cover opacity-90 mix-blend-multiply"
//           /> */}
//           <div className="absolute top-0 left-0 w-1/2 h-screen bg-gradient-to-r from-black/60 to-transparent flex flex-col justify-center pl-12  md:flex">
//             <div className="space-y-8">
//               <div className="space-y-3">
//                 <h1 className="text-5xl font-bold text-white leading-tight">Grow Your Team With Top Talent</h1>
//                 <p className="text-white text-xl max-w-md opacity-90">Join thousands of leading companies finding the perfect candidates.</p>
//               </div>
              
//               <div className="space-y-6 mt-8">
//                 <div className="flex items-start space-x-3">
//                   <div className="bg-white/20 p-2 rounded-full backdrop-blur-sm">
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
//                     </svg>
//                   </div>
//                   <div>
//                     <h3 className="text-white font-semibold text-lg">Post Unlimited Jobs</h3>
//                     <p className="text-white/80 text-sm max-w-sm">Create and manage job postings to attract qualified candidates.</p>
//                   </div>
//                 </div>
                
//                 <div className="flex items-start space-x-3">
//                   <div className="bg-white/20 p-2 rounded-full backdrop-blur-sm">
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
//                     </svg>
//                   </div>
//                   <div>
//                     <h3 className="text-white font-semibold text-lg">Access Talent Pool</h3>
//                     <p className="text-white/80 text-sm max-w-sm">Search through our database of pre-screened professionals.</p>
//                   </div>
//                 </div>
                
//                 <div className="flex items-start space-x-3">
//                   <div className="bg-white/20 p-2 rounded-full backdrop-blur-sm">
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
//                     </svg>
//                   </div>
//                   <div>
//                     <h3 className="text-white font-semibold text-lg">Streamlined Hiring</h3>
//                     <p className="text-white/80 text-sm max-w-sm">Manage applications, interviews, and hiring all in one place.</p>
//                   </div>
//                 </div>
//               </div>
              
//               <div className="pt-6">
//                 <div className="flex items-center space-x-4">
//                   <div className="flex -space-x-2">
//                     <img className="w-10 h-10 rounded-full border-2 border-white" src="/api/placeholder/40/40" alt="User" />
//                     <img className="w-10 h-10 rounded-full border-2 border-white" src="/api/placeholder/40/40" alt="User" />
//                     <img className="w-10 h-10 rounded-full border-2 border-white" src="/api/placeholder/40/40" alt="User" />
//                   </div>
//                   <p className="text-white text-sm">Join <span className="font-bold">3,000+</span> employers already hiring</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Form Section */}
//         <div className="w-full md:w-1/2 flex justify-center items-center p-8 bg-white">
//           <div className="w-full max-w-md">
//             <div className="mb-8">
//               <h2 className="text-3xl font-bold text-gray-800 mb-2 text-center">
//                 Company Registration
//               </h2>
//               <p className="text-gray-600 text-center">Create your employer account to start hiring</p>
//             </div>

//             <form onSubmit={handleSubmit} noValidate className="space-y-5">
//               {/* Company Name */}
//               <div className="relative">
//                 <label htmlFor="company_name" className="text-sm font-medium text-gray-700 mb-1 block">
//                   Company Name
//                 </label>
//                 <div className="relative">
//                   <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
//                   <input
//                     type="text"
//                     id="company_name"
//                     name="company_name"
//                     value={formData.company_name}
//                     onChange={handleChange}
//                     onFocus={() => handleFocus("company_name")}
//                     onBlur={() => handleBlur("company_name")}
//                     className={`pl-10 pr-4 py-3 w-full rounded-lg border ${
//                       errors.company_name ? 'border-red-500' : 'border-gray-300'
//                     } focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all`}
//                     placeholder="Enter your company name"
//                   />
//                 </div>
//                 {errors.company_name && (
//                   <p className="text-red-500 text-sm mt-1">
//                     {errors.company_name}
//                   </p>
//                 )}
//               </div>

//               {/* Company Email */}
//               <div className="relative">
//                 <label htmlFor="company_email" className="text-sm font-medium text-gray-700 mb-1 block">
//                   Company Email
//                 </label>
//                 <div className="relative">
//                   <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
//                   <input
//                     type="email"
//                     id="company_email"
//                     name="company_email"
//                     value={formData.company_email}
//                     onChange={handleChange}
//                     onFocus={() => handleFocus("company_email")}
//                     onBlur={() => handleBlur("company_email")}
//                     className={`pl-10 pr-4 py-3 w-full rounded-lg border ${
//                       errors.company_email ? 'border-red-500' : 'border-gray-300'
//                     } focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all`}
//                     placeholder="company@example.com"
//                   />
//                 </div>
//                 {errors.company_email && (
//                   <p className="text-red-500 text-sm mt-1">
//                     {errors.company_email}
//                   </p>
//                 )}
//               </div>

             

//               {/* Password */}
//               <div className="relative">
//                 <label htmlFor="company_password" className="text-sm font-medium text-gray-700 mb-1 block">
//                   Password
//                 </label>
//                 <div className="relative">
//                   <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
//                   <input
//                     type={showPassword ? "text" : "password"}
//                     id="company_password"
//                     name="company_password"
//                     value={formData.company_password}
//                     onChange={handleChange}
//                     onFocus={() => handleFocus("company_password")}
//                     onBlur={() => handleBlur("company_password")}
//                     className={`pl-10 pr-10 py-3 w-full rounded-lg border ${
//                       errors.company_password ? 'border-red-500' : 'border-gray-300'
//                     } focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all`}
//                     placeholder="Create a strong password"
//                   />
//                   <button
//                     type="button"
//                     className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
//                     onClick={() => setShowPassword(!showPassword)}
//                   >
//                     {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
//                   </button>
//                 </div>
//                 {errors.company_password && (
//                   <p className="text-red-500 text-sm mt-1">
//                     {errors.company_password}
//                   </p>
//                 )}
                
//                 {/* Password strength meter */}
//                 {formData.company_password && (
//                   <div className="mt-2">
//                     <div className="w-full bg-gray-200 rounded-full h-2">
//                       <div
//                         className={`h-2 rounded-full ${
//                           passwordStrengthPercentage < 40
//                             ? 'bg-red-500'
//                             : passwordStrengthPercentage < 80
//                             ? 'bg-yellow-500'
//                             : 'bg-green-500'
//                         }`}
//                         style={{ width: `${passwordStrengthPercentage}%` }}
//                       ></div>
//                     </div>
//                     <div className="flex flex-col space-y-1 text-xs mt-2">
//                       <div className="flex items-center gap-1">
//                         {passwordStrength.hasMinLength ? 
//                           <Check className="h-3 w-3 text-green-500" /> : 
//                           <X className="h-3 w-3 text-red-500" />} 
//                         <span>At least 8 characters</span>
//                       </div>
//                       <div className="flex items-center gap-1">
//                         {passwordStrength.hasUppercase ? 
//                           <Check className="h-3 w-3 text-green-500" /> : 
//                           <X className="h-3 w-3 text-red-500" />} 
//                         <span>Uppercase letter</span>
//                       </div>
//                       <div className="flex items-center gap-1">
//                         {passwordStrength.hasLowercase ? 
//                           <Check className="h-3 w-3 text-green-500" /> : 
//                           <X className="h-3 w-3 text-red-500" />} 
//                         <span>Lowercase letter</span>
//                       </div>
//                       <div className="flex items-center gap-1">
//                         {passwordStrength.hasNumber ? 
//                           <Check className="h-3 w-3 text-green-500" /> : 
//                           <X className="h-3 w-3 text-red-500" />} 
//                         <span>Number</span>
//                       </div>
//                       <div className="flex items-center gap-1">
//                         {passwordStrength.hasSpecial ? 
//                           <Check className="h-3 w-3 text-green-500" /> : 
//                           <X className="h-3 w-3 text-red-500" />} 
//                         <span>Special character</span>
//                       </div>
//                     </div>
//                   </div>
//                 )}
//               </div>

//               {/* Confirm Password */}
//               <div className="relative">
//                 <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700 mb-1 block">
//                   Confirm Password
//                 </label>
//                 <div className="relative">
//                   <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
//                   <input
//                     type={showConfirmPassword ? "text" : "password"}
//                     id="confirmPassword"
//                     name="confirmPassword"
//                     value={formData.confirmPassword}
//                     onChange={handleChange}
//                     onFocus={() => handleFocus("confirmPassword")}
//                     onBlur={() => handleBlur("confirmPassword")}
//                     className={`pl-10 pr-10 py-3 w-full rounded-lg border ${
//                       errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
//                     } focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all`}
//                     placeholder="Confirm your password"
//                   />
//                   <button
//                     type="button"
//                     className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
//                     onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                   >
//                     {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
//                   </button>
//                 </div>
//                 {errors.confirmPassword && (
//                   <p className="text-red-500 text-sm mt-1">
//                     {errors.confirmPassword}
//                   </p>
//                 )}
//               </div>

//               {/* Terms and Conditions Checkbox */}
//               <div className="flex items-start mt-4">
//                 <div className="flex items-center h-5">
//                   <input
//                     id="terms_accepted"
//                     name="terms_accepted"
//                     type="checkbox"
//                     checked={formData.terms_accepted}
//                     onChange={handleChange}
//                     onFocus={() => handleFocus("terms_accepted")}
//                     onBlur={() => handleBlur("terms_accepted")}
//                     className={`h-4 w-4 text-orange-500 focus:ring-orange-500 border-gray-300 rounded ${
//                       errors.terms_accepted ? 'border-red-500' : ''
//                     }`}
//                   />
//                 </div>
//                 <div className="ml-3 text-sm">
//                   <label htmlFor="terms_accepted" className="font-medium text-gray-700">
//                     I agree to the <a href="#" className="text-orange-500 hover:text-orange-700">Terms and Conditions</a> and <a href="#" className="text-orange-500 hover:text-orange-700">Privacy Policy</a>
//                   </label>
//                   {errors.terms_accepted && (
//                     <p className="text-red-500 text-xs mt-1">
//                       {errors.terms_accepted}
//                     </p>
//                   )}
//                 </div>
//               </div>

//               {/* Submit Button */}
//               {loading ? (
//                 <button
//                   type="button"
//                   className="w-full mt-6 bg-orange-600 text-white py-3 rounded-lg flex items-center justify-center"
//                   disabled
//                 >
//                   <Loader2 className="mr-2 h-5 w-5 animate-spin" />Please Wait
//                 </button>
//               ) : (
//                 <button
//                   type="submit"
//                   className="w-full mt-6 bg-orange-500 text-white py-3 px-4 rounded-lg hover:bg-orange-600 transition duration-200 font-medium shadow-md"
//                 >
//                   Create Account
//                 </button>
//               )}
//             </form>

//             <div className="text-center mt-6">
//               <p className="text-gray-600">
//                 Already have an account?{" "}
//                 <Link to="/company_login">
//                   <span className="text-orange-500 hover:text-orange-700 font-medium cursor-pointer">
//                     Log in
//                   </span>
//                 </Link>
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CompanyRegistration;





import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import RegisterImage from '../assets/CompanyRegisterImage.png';
import axios from "axios";
import { toast } from 'react-toastify';
import { BASEURL } from "../utility/config";
import { Loader2, Building2, Mail, Lock, EyeOff, Eye, Check, X ,KeyRound,ArrowLeft, UserPlus} from "lucide-react";

const CompanyRegistration = ({ navigateToLogin }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    company_name: "",
    company_email: "",
    company_password: "",
    confirmPassword: "",

    terms_accepted: false
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [focused, setFocused] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    hasMinLength: false,
    hasUppercase: false,
    hasLowercase: false,
    hasNumber: false,
    hasSpecial: false
  });
  const [showOtpSection, setShowOtpSection] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [otpLoading, setOtpLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [timer, setTimer] = useState(0);
  const [generatedOtp, setGeneratedOtp] = useState('');


  // Handle OTP input change
  const handleOtpChange = (e, index) => {
    const value = e.target.value;

    // Allow only numbers
    if (value && !/^\d+$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(0, 1); // Ensure only one character is stored
    setOtp(newOtp);

    // Auto-move to next input if value is entered
    if (value && index < 5) {
      const nextInput = e.target.form.elements[index + 1];
      nextInput.focus();
    }
  };

  // Handle paste event for OTP
  const handleOtpPaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').trim();

    // Check if pasted content is numeric and has correct length
    if (/^\d+$/.test(pastedData) && pastedData.length <= 6) {
      const otpArray = pastedData.split('').slice(0, 6);
      const newOtp = [...otp];

      otpArray.forEach((char, index) => {
        if (index < 6) newOtp[index] = char;
      });

      setOtp(newOtp);

      // Focus the next empty input or the last one if all filled
      const lastFilledIndex = Math.min(otpArray.length, 5);
      if (lastFilledIndex < 5) {
        e.target.form.elements[lastFilledIndex + 1].focus();
      }
    }
  };

  // Handle key down for OTP input - for backspace and arrow navigation
  const handleOtpKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      // If current input is empty and backspace is pressed, focus previous input
      e.target.form.elements[index - 1].focus();
    } else if (e.key === 'ArrowLeft' && index > 0) {
      e.target.form.elements[index - 1].focus();
    } else if (e.key === 'ArrowRight' && index < 5) {
      e.target.form.elements[index + 1].focus();
    }
  };

  const generateOTP = () => {
    // Generate a random number between 0 and 999999
    // const randomNumber = Math.floor(Math.random() * 1000000);

    // // Format as a 6-digit string with leading zeros if needed
    // const formattedOTP = randomNumber.toString().padStart(6, '0');
    // setGeneratedOtp(formattedOTP);
    // console.log(generatedOtp)
    const randomNumber = Math.floor(Math.random() * 1000000);
    return randomNumber.toString().padStart(6, '0');
  };

  // Send OTP to user's email
  const sendOtpWithCode = async (otpCode) => {
    if (!formData.company_email) {
      toast.error('Email is required to send OTP', {
        duration: 4000,
        position: 'top-right',
        style: {
          background: '#FF6B6B',
          color: 'white',
          fontWeight: 'bold',
          padding: '16px',
          borderRadius: '8px'
        }
      });
      return;
    }

    try {

      setOtpLoading(true);
      // Replace with your actual API endpoint for sending OTP

console.log(formData)
      const res = await axios.post(`${BASEURL}/candidates/otp_verification`, {
        email: formData.company_email,
        otp: otpCode
      }, {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true
      });
      console.log(res)


      if (res?.data?.success) {
        setOtpSent(true);
        setTimer(60); // 60 seconds countdown for resend
        toast.success('OTP sent to your email!', {
          duration: 4000,
          position: 'top-right',
          
        });
      }
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.error || 'Failed to send OTP', {
        duration: 4000,
        position: 'top-right',
        
      });
    } finally {
      setOtpLoading(false);
    }
  };

  const sendOtp = async () => {
    const newOtp = generateOTP();
    setGeneratedOtp(newOtp);
    await sendOtpWithCode(newOtp);
  };

  // Initiate account creation process
  const initiateSignup = async (e) => {
    e.preventDefault();

    // Generate OTP immediately and store the value in a variable
    const newOtp = generateOTP();

    // Set the state for later verification
    setGeneratedOtp(newOtp);
    // Show OTP verification section
    // generateOTP()
    setShowOtpSection(true);
    // await sendOtp();
    await sendOtpWithCode(newOtp)
  };


  const verifyOtpAndSignup = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error("Please fix the errors in the form", {
        position: 'top-right',
        duration: 4000
      });
      return;
    }

    const otpValue = otp.join('');
    if (otpValue.length !== 6) {
      toast.error('Please enter the complete 6-digit OTP', {
        duration: 4000,
        position: 'top-right',
        
      });
      return;
    }

    try {
      setLoading(true);
      // First verify OTP


      // if (verifyRes?.data?.success) {
      if (otpValue === generatedOtp) {

        const payload = {
          company_name: formData.company_name,
          company_email: formData.company_email,
          company_password: formData.company_password,

        };

        // If OTP is verified, proceed with signup
        const res = await axios.post(`${BASEURL}/employers/Employer_Signup`, payload, {
          headers: {
            "Content-Type": "application/json"
          },
          withCredentials: true
        });
        console.log(formData)
        if (res?.data?.success) {
          toast.success(res?.data?.message, {
            duration: 4000,
            position: 'top-right'
          });
          navigate("/company_login");
        };


      } else {
        toast.error('Invalid OTP. Please try again.', {
          duration: 4000,
          position: 'top-right',

        });
      }
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.error || "Registration failed", {
        duration: 4000,
        position: 'top-right',
      });
      // toast.error(err.response?.data?.message || 'Verification failed', {
      //   duration: 4000,
      //   position: 'top-right',
      //   style: {
      //     background: '#FF6B6B',
      //     color: 'white',
      //     fontWeight: 'bold',
      //     padding: '16px',
      //     borderRadius: '8px'
      //   }
      // });
    } finally {
      setLoading(false);
    }
  };


  // Timer countdown for OTP resend
  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer(prevTimer => prevTimer - 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [timer]);


  const handleBackFromOtp = () => {
    setShowOtpSection(false);
    setOtp(['', '', '', '', '', '']);
    setOtpSent(false);
    setTimer(0);
};


  const handleFocus = (name) => {
    setFocused(prev => ({ ...prev, [name]: true }));
  };

  const handleBlur = (name) => {
    setFocused(prev => ({ ...prev, [name]: false }));
    validateField(name, formData[name]);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;

    setFormData(prev => ({ ...prev, [name]: newValue }));

    if (name === 'company_password') {
      checkPasswordStrength(value);
    }

    if (focused[name]) {
      validateField(name, newValue);
    }
  };

  const checkPasswordStrength = (password) => {
    const hasMinLength = password.length >= 8;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    let score = 0;
    if (hasMinLength) score++;
    if (hasUppercase) score++;
    if (hasLowercase) score++;
    if (hasNumber) score++;
    if (hasSpecial) score++;

    setPasswordStrength({
      score,
      hasMinLength,
      hasUppercase,
      hasLowercase,
      hasNumber,
      hasSpecial
    });
  };

  const validateField = (name, value) => {
    let error = "";

    switch (name) {
      case "company_name":
        if (!value.trim()) {
          error = "Company Name is required";
        } else if (value.trim().length < 2) {
          error = "Company Name must be at least 2 characters";
        }
        break;

      case "company_email":
        if (!value.trim()) {
          error = "Company Email is required";
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
          error = "Invalid email address";
        }
        break;

      case "company_password":
        if (!value) {
          error = "Password is required";
        } else if (value.length < 8) {
          error = "Password must be at least 8 characters";
        } else if (!/[A-Z]/.test(value)) {
          error = "Password must contain at least one uppercase letter";
        } else if (!/[a-z]/.test(value)) {
          error = "Password must contain at least one lowercase letter";
        } else if (!/[0-9]/.test(value)) {
          error = "Password must contain at least one number";
        } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
          error = "Password must contain at least one special character";
        }
        break;

      case "confirmPassword":
        if (!value) {
          error = "Confirm Password is required";
        } else if (value !== formData.company_password) {
          error = "Passwords do not match";
        }
        break;



      case "terms_accepted":
        if (!value) {
          error = "You must accept the Terms and Conditions";
        }
        break;

      default:
        break;
    }

    setErrors(prev => ({ ...prev, [name]: error }));
    return error === "";
  };

  const validateForm = () => {
    const fieldsToValidate = [
      "company_name",
      "company_email",
      "company_password",
      "confirmPassword",
      "industry",
      "company_size",
      "terms_accepted"
    ];

    const newErrors = {};
    let isValid = true;

    fieldsToValidate.forEach(field => {
      if (!validateField(field, formData[field])) {
        isValid = false;
      }
    });

    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fix the errors in the form", {
        position: 'top-right',
        duration: 4000
      });
      return;
    }

    try {
      setLoading(true);

      // Create payload with necessary fields for the API
      const payload = {
        company_name: formData.company_name,
        company_email: formData.company_email,
        company_password: formData.company_password,

      };

      const res = await axios.post(`${BASEURL}/employers/Employer_Signup`, payload, {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true
      });

      console.log(payload)
      if (res?.data?.success) {
        toast.success(res?.data?.message, {
          duration: 4000,
          position: 'top-right'
        });
        navigate("/company_login");
      }
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.error || "Registration failed", {
        duration: 4000,
        position: 'top-right',
      });
    } finally {
      setLoading(false);
    }
  };

  // Calculate password strength percentage for progress bar
  const passwordStrengthPercentage = (passwordStrength.score / 5) * 100;

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-white">
      <div className="flex flex-row md:flex-row w-full justify-center overflow-hidden  rounded-xl">
        {/* Image Section */}
        <div className="w-full md:w-1/2 lg:flex justify-start items-stretch hidden md:block bg-orange-500 ">
          <img
            src={RegisterImage}
            alt="Register"
            className="w-full h-screen object-cover"
          />
          {/* <div className="absolute top-0 left-0 w-1/2 h-screen bg-gradient-to-r from-black/40 to-transparent flex flex-col justify-center pl-12  md:flex">
            <h1 className="text-4xl font-bold text-white mb-4">Join Our Network</h1>
            <p className="text-white text-lg max-w-md">Register your company to access top talent and grow your team with qualified professionals.</p>
          </div> */}
        </div>

        {/* Form Section */}
        <div className="w-full md:w-1/2 flex justify-center items-center p-8 bg-white">
          <div className="w-full max-w-md">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-2 text-center">
                Company Registration
              </h2>
              <p className="text-gray-600 text-center">Create your employer account to start hiring</p>
            </div>

           {
            !showOtpSection ? (
              <form onSubmit={initiateSignup} noValidate className="space-y-5">
              {/* Company Name */}
              <div className="relative">
                <label htmlFor="company_name" className="text-sm font-medium text-gray-700 mb-1 block">
                  Company Name
                </label>
                <div className="relative">
                  <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="text"
                    id="company_name"
                    name="company_name"
                    value={formData.company_name}
                    onChange={handleChange}
                    onFocus={() => handleFocus("company_name")}
                    onBlur={() => handleBlur("company_name")}
                    className={`pl-10 pr-4 py-3 w-full rounded-lg border ${errors.company_name ? 'border-red-500' : 'border-gray-300'
                      } focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all`}
                    placeholder="Enter your company name"
                  />
                </div>
                {errors.company_name && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.company_name}
                  </p>
                )}
              </div>

              {/* Company Email */}
              <div className="relative">
                <label htmlFor="company_email" className="text-sm font-medium text-gray-700 mb-1 block">
                  Company Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="email"
                    id="company_email"
                    name="company_email"
                    value={formData.company_email}
                    onChange={handleChange}
                    onFocus={() => handleFocus("company_email")}
                    onBlur={() => handleBlur("company_email")}
                    className={`pl-10 pr-4 py-3 w-full rounded-lg border ${errors.company_email ? 'border-red-500' : 'border-gray-300'
                      } focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all`}
                    placeholder="company@example.com"
                  />
                </div>
                {errors.company_email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.company_email}
                  </p>
                )}
              </div>


              {/* Password */}
              <div className="relative">
                <label htmlFor="company_password" className="text-sm font-medium text-gray-700 mb-1 block">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type={showPassword ? "text" : "password"}
                    id="company_password"
                    name="company_password"
                    value={formData.company_password}
                    onChange={handleChange}
                    onFocus={() => handleFocus("company_password")}
                    onBlur={() => handleBlur("company_password")}
                    className={`pl-10 pr-10 py-3 w-full rounded-lg border ${errors.company_password ? 'border-red-500' : 'border-gray-300'
                      } focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all`}
                    placeholder="Create a strong password"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                {errors.company_password && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.company_password}
                  </p>
                )}

                {/* Password strength meter */}
                {formData.company_password && (
                  <div className="mt-2">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${passwordStrengthPercentage < 40
                          ? 'bg-red-500'
                          : passwordStrengthPercentage < 80
                            ? 'bg-yellow-500'
                            : 'bg-green-500'
                          }`}
                        style={{ width: `${passwordStrengthPercentage}%` }}
                      ></div>
                    </div>
                    <div className="flex flex-col space-y-1 text-xs mt-2">
                      <div className="flex items-center gap-1">
                        {passwordStrength.hasMinLength ?
                          <Check className="h-3 w-3 text-green-500" /> :
                          <X className="h-3 w-3 text-red-500" />}
                        <span>At least 8 characters</span>
                      </div>
                      <div className="flex items-center gap-1">
                        {passwordStrength.hasUppercase ?
                          <Check className="h-3 w-3 text-green-500" /> :
                          <X className="h-3 w-3 text-red-500" />}
                        <span>Uppercase letter</span>
                      </div>
                      <div className="flex items-center gap-1">
                        {passwordStrength.hasLowercase ?
                          <Check className="h-3 w-3 text-green-500" /> :
                          <X className="h-3 w-3 text-red-500" />}
                        <span>Lowercase letter</span>
                      </div>
                      <div className="flex items-center gap-1">
                        {passwordStrength.hasNumber ?
                          <Check className="h-3 w-3 text-green-500" /> :
                          <X className="h-3 w-3 text-red-500" />}
                        <span>Number</span>
                      </div>
                      <div className="flex items-center gap-1">
                        {passwordStrength.hasSpecial ?
                          <Check className="h-3 w-3 text-green-500" /> :
                          <X className="h-3 w-3 text-red-500" />}
                        <span>Special character</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Confirm Password */}
              <div className="relative">
                <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700 mb-1 block">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    onFocus={() => handleFocus("confirmPassword")}
                    onBlur={() => handleBlur("confirmPassword")}
                    className={`pl-10 pr-10 py-3 w-full rounded-lg border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                      } focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all`}
                    placeholder="Confirm your password"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>

              {/* Terms and Conditions Checkbox */}
              <div className="flex items-start mt-4">
                <div className="flex items-center h-5">
                  <input
                    id="terms_accepted"
                    name="terms_accepted"
                    type="checkbox"
                    checked={formData.terms_accepted}
                    onChange={handleChange}
                    onFocus={() => handleFocus("terms_accepted")}
                    onBlur={() => handleBlur("terms_accepted")}
                    className={`h-4 w-4 text-orange-500 focus:ring-orange-500 border-gray-300 rounded ${errors.terms_accepted ? 'border-red-500' : ''
                      }`}
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="terms_accepted" className="font-medium text-gray-700">
                    I agree to the <a href="#" className="text-orange-500 hover:text-orange-700">Terms and Conditions</a> and <a href="#" className="text-orange-500 hover:text-orange-700">Privacy Policy</a>
                  </label>
                  {errors.terms_accepted && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.terms_accepted}
                    </p>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              {loading ? (
                <button
                  type="button"
                  className="w-full mt-6 bg-orange-600 text-white py-3 rounded-lg flex items-center justify-center"
                  disabled
                >
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />Please Wait
                </button>
              ) : (
                <button
                  type="submit"
                  className="w-full mt-6 bg-orange-500 text-white py-3 px-4 rounded-lg hover:bg-orange-600 transition duration-200 font-medium shadow-md"
                >
                  Create Account
                </button>
              )}
            </form>
            ):(
              <form onSubmit={verifyOtpAndSignup} className="w-full max-w-4xl bg-white p-6">
              <div className="mb-8 text-center">
                  <div className="flex justify-center mb-4">
                      <div className="w-16 h-16 rounded-full flex items-center justify-center bg-orange-100 text-orange-500">
                          <KeyRound size={32} />
                      </div>
                  </div>
                  <h3 className="text-xl font-bold mb-2">OTP Verification</h3>
                  <p className="text-gray-600">
                      We've sent a 6-digit verification code to <span className="font-medium">{formData.email}</span>
                  </p>
              </div>

              <div className="mb-8">
                  <label className="block text-sm font-medium text-gray-700 mb-3 text-center">
                      Enter the 6-digit code
                  </label>
                  <div className="flex justify-center gap-2 sm:gap-4">
                      {otp.map((digit, index) => (
                          <input
                              key={index}
                              type="text"
                              inputMode="numeric"
                              maxLength={1}
                              value={digit}
                              onChange={(e) => handleOtpChange(e, index)}
                              onKeyDown={(e) => handleOtpKeyDown(e, index)}
                              onPaste={handleOtpPaste}
                              className="w-10 h-12 sm:w-12 sm:h-14 text-center text-xl font-bold border-2 border-blue-500 rounded-lg focus:border-orange-500 focus:ring-orange-500"
                              required
                          />
                      ))}
                  </div>
              </div>

              <div className="text-center mb-6">
                  {timer > 0 ? (
                      <p className="text-sm text-gray-600">
                          Resend code in <span className="font-medium">{timer}</span> seconds
                      </p>
                  ) : (
                      <button
                          type="button"
                          onClick={sendOtp}
                          disabled={otpLoading}
                          className="text-sm text-orange-500 font-medium hover:text-orange-600"
                      >
                          {otpLoading ? 'Sending...' : 'Resend OTP'}
                      </button>
                  )}
              </div>

              <div className="flex justify-between mt-8">
                  <button
                      type="button"
                      onClick={handleBackFromOtp}
                      className="inline-flex items-center px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 duration-300"
                  >
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Back
                  </button>

                  <button
                      type="submit"
                      disabled={loading || otp.some(digit => !digit)}
                      className={`inline-flex items-center px-6 py-2.5 ${loading || otp.some(digit => !digit)
                          ? 'bg-gray-400 cursor-not-allowed'
                          : 'bg-orange-500 hover:bg-orange-600'
                          } text-white rounded-lg duration-300`}
                  >
                      {loading ? (
                          <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Creating Account...
                          </>
                      ) : (
                          <>
                              <UserPlus className="mr-2 h-4 w-4" />
                              Verify & Create Account
                          </>
                      )}
                  </button>
              </div>
          </form>
            )
           }

            <div className="text-center mt-6">
              <p className="text-gray-600">
                Already have an account?{" "}
                <Link to="/company_login">
                  <span className="text-orange-500 hover:text-orange-700 font-medium cursor-pointer">
                    Log in
                  </span>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyRegistration;