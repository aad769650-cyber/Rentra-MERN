import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "sonner";

export const apiCall=async (actualData) => {
    console.log(actualData);
    // for (let [key, val] of actualData.entries()) console.log(key, val)

    const resp=await axios.post("https://rentra-mern.onrender.com/host/detail",actualData)
    console.log("resp",resp);
    
}



export const getAllData=async()=>{
       const resp=await axios.get("https://rentra-mern.onrender.com/host/detail")
    console.log("resp",resp.data.msg[0]);
    return resp.data.msg[0];
}



export const registerHost=async(actualData)=>{
     for (let [key, val] of actualData.entries()) console.log(key, val)

   try {
     const resp=await axios.post("https://rentra-mern.onrender.com/owner/register",actualData,{withCredentials:true})
    console.log("resp",resp);
    return  resp
   } catch (error) {
    console.log("err api",error);
    
   }


}

export const verifyHostLogin=async(formData)=>{
  
   try {
    console.log(formData);
   
     const resp=await axios.post("https://rentra-mern.onrender.com/owner/login",formData,{withCredentials:true})
    console.log("resp",resp);
  
    return  resp
   } catch (error) {
    console.log(error);
    
   }

}


export const AccessDashBoard=async()=>{
try {
     const response=axios.get("https://rentra-mern.onrender.com/owner/dashBoard",{withCredentials:true})
     .then((resp)=>{
    console.log("resp",resp);



    if (resp.status==204) {
      console.log("refreshing...");
      
      axios.get("https://rentra-mern.onrender.com/refresh",{withCredentials:true})
      .then((data)=>{
         if(data.status==204){
            toast.info("please Login")
window.location.href = "https://rentra-mern-frontend.onrender.com/hostLogin";
         }
      })
 
    }
 if(resp.status==200){
           toast.info("Welcome to your DashBoard")
window.location.href = "https://rentra-mern-frontend.onrender.com/hostDashboard";
 }
 
 
 
 
 
 
 
   }).catch((err)=>{
      console.log("err",err);
          toast.error("Your Tokens Expired Please Login again")
window.location.href = "https://rentra-mern-frontend.onrender.com/hostLogin";
     })

} catch (error) {
   console.log(error);
   
}
  
}


export const getProfileInfo=async()=>{
          const resp=await axios.get("https://rentra-mern.onrender.com/owner/profileInfo",{withCredentials:true})
    console.log("resp",resp.data.msg[0]);
    return resp.data.msg[0];
}



export const getAllPostData=async()=>{
          const resp=await axios.get("https://rentra-mern.onrender.com/owner/AllPost",{withCredentials:true})
    console.log("resp",resp.data);
    return resp.data;
}


export const ApproveRoom=async(id)=>{
        const resp=await axios.patch("https://rentra-mern.onrender.com/owner/updateStatus",{id},{withCredentials:true})
    console.log("resp",resp.data);
    return resp.data;
}
export const RejectRoom=async(id)=>{
        const resp=await axios.patch("https://rentra-mern.onrender.com/owner/updateStatusReject",{id},{withCredentials:true})
    console.log("resp",resp.data);
    return resp.data;
}
export const DeleteRoom=async(id)=>{
        const resp=await axios.delete("https://rentra-mern.onrender.com/owner/delete",{id},{withCredentials:true})
    console.log("resp",resp.data);
    return resp.data;
}



export const Logout=async()=>{
        const resp=await axios.get("https://rentra-mern.onrender.com/owner/logout",{withCredentials:true})
    console.log("resp",resp.data);
    return resp.data;
}


export const sendMailToAdmin=async(data)=>{
    console.log(data);
    
        const resp=await axios.post("https://rentra-mern.onrender.com/sendMail",{data},{withCredentials:true})
    console.log("resp",resp.data);
    return resp.data;
}
