import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "sonner";

export const apiCall=async (actualData) => {
    console.log(actualData);
    // for (let [key, val] of actualData.entries()) console.log(key, val)

    const resp=await axios.post("http://localhost:8000/host/detail",actualData)
    console.log("resp",resp);
    
}



export const getAllData=async()=>{
       const resp=await axios.get("http://localhost:8000/host/detail")
    console.log("resp",resp.data.msg[0]);
    return resp.data.msg[0];
}



export const registerHost=async(actualData)=>{
     for (let [key, val] of actualData.entries()) console.log(key, val)

   try {
     const resp=await axios.post("http://localhost:8000/owner/register",actualData,{withCredentials:true})
    console.log("resp",resp);
    return  resp
   } catch (error) {
    console.log("err api",error);
    
   }


}

export const verifyHostLogin=async(formData)=>{
  
   try {
    console.log(formData);
   
     const resp=await axios.post("http://localhost:8000/owner/login",formData,{withCredentials:true})
    console.log("resp",resp);
  
    return  resp
   } catch (error) {
    console.log(error);
    
   }

}


export const AccessDashBoard=async()=>{
try {
     const response=axios.get("http://localhost:8000/owner/dashBoard",{withCredentials:true})
     .then((resp)=>{
    console.log("resp",resp);



    if (resp.status==204) {
      console.log("refreshing...");
      
      axios.get("http://localhost:8000/refresh",{withCredentials:true})
      .then((data)=>{
         if(data.status==204){
            toast.info("please Login")
             window.location.href = "/hostLogin"
         }
      })
 
    }
 if(resp.status==200){
           toast.info("Welcome to your DashBoard")
             window.location.href = "/hostDashBoard"
 }
 
 
 
 
 
 
 
   }).catch((err)=>{
      console.log("err",err);
          toast.error("Your Tokens Expired Please Login again")
             window.location.href = "/hostLogin"
     })

} catch (error) {
   console.log(error);
   
}
  
}


export const getProfileInfo=async()=>{
          const resp=await axios.get("http://localhost:8000/owner/profileInfo",{withCredentials:true})
    console.log("resp",resp.data.msg[0]);
    return resp.data.msg[0];
}



export const getAllPostData=async()=>{
          const resp=await axios.get("http://localhost:8000/owner/AllPost",{withCredentials:true})
    console.log("resp",resp.data);
    return resp.data;
}


export const ApproveRoom=async(id)=>{
        const resp=await axios.patch("http://localhost:8000/owner/updateStatus",{id},{withCredentials:true})
    console.log("resp",resp.data);
    return resp.data;
}
export const RejectRoom=async(id)=>{
        const resp=await axios.patch("http://localhost:8000/owner/updateStatusReject",{id},{withCredentials:true})
    console.log("resp",resp.data);
    return resp.data;
}
export const DeleteRoom=async(id)=>{
        const resp=await axios.delete("http://localhost:8000/owner/delete",{id},{withCredentials:true})
    console.log("resp",resp.data);
    return resp.data;
}
export const Logout=async()=>{
        const resp=await axios.get("http://localhost:8000/owner/logout",{withCredentials:true})
    console.log("resp",resp.data);
    return resp.data;
}