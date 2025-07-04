import axios from "axios";
import { BASEURL } from "../../utility/config";

// In ./EmployerProfileSections/updateEmployerProfile.js
export const updateEmployerAPI = async (employerId, data) => {
    try {
        const response = await axios.post(`${BASEURL}/employers/Employer_Update_Profile/${employerId}`,data ,{
            withCredentials:true,
            headers: {
                'Content-Type': 'application/json',
            },
             
        });
        
        return await response.data;
    } catch (error) {
        console.error('API error:', error);
        return { success: false, error: error.message };
    }
};


// export const updateEmployerAPI = async (employerId, data, isFormData = false) => {
//     try {
//         console.log(data)
//       const headers = isFormData 
//         ? { 'Content-Type': 'multipart/form-data' }
//         : { 'Content-Type': 'application/json' };
      
//       const response = await axios.post(
//         // `${BASEURL}/employers/Employer_Update_Profile/${employerId}`,
//         `http://localhost:3000/employers/Employer_Update_Profile/${employerId}`,

//         data,
//         {
//           withCredentials: true,
//           headers: headers,
//         }
//       );
      
//       console.log(response)
      
//       return await response.data;
//     } catch (error) {
//       console.error('API error:', error);
//       return { success: false, error: error.message };
//     }
//   };


// Updated updateEmployerAPI function
// export const updateEmployerAPI = async (employerId, data, isFormData = false) => {
//     try {
//       console.log('Sending data to API:', data);
      
//       let requestData = data;
//       const headers = {};
//       console.log(data)
      
    
      
//       const response = await axios.post(
//         `http://localhost:3000/employers/Employer_Update_Profile/${employerId}`,
//         requestData,
//         {
//           withCredentials: true,
//           headers: {
//             'Content-Type': 'multipart/form-data'
//           },
//         }
//       );
      
//       console.log('API Response:', response);
      
//       return response.data;
//     } catch (error) {
//       console.error('API error:', error);
//       return { success: false, error: error.message };
//     }
//   };