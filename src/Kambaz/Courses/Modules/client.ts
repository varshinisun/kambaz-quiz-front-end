import axios from "axios";

const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
const MODULES_API = `${REMOTE_SERVER}/api/modules`;
const ASSIGNMENTS_API = `${REMOTE_SERVER}/api/assignments`;

export const updateModule = async (module: any) => {
     const { data } = await axios.put(`${MODULES_API}/${module._id}`, module);
     return data;
   };
   
export const deleteModule = async (moduleId: string) => {
 const response = await axios.delete(`${MODULES_API}/${moduleId}`);
 return response.data; };

 export const findAssignmentsForCourse = async (assignmentId: string) => {
     const response = await axios
       .get(`${ASSIGNMENTS_API}/${assignmentId}/assignments`);
     return response.data;
   };
   