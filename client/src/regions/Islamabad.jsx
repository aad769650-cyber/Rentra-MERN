import axios from "axios";
import { ArrowLeft, ArrowRight, Star } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";

export default function Islamabad() {
  const [items, setItems] = useState([]);
// const isRender=useRef(true)


const [stIdx,setStIdx]=useState(0)
const [endIdx,setEndIdx]=useState(6)
const [isDesktop,setIsDesktop]=useState(true)

  const apiCall = async () => {
    try {
      const resp = await axios.get("https://rentra-mern.onrender.com/api/isl");
      // console.log(resp.data.data[0]);
      // keep same logic but ensure array
setItems(resp.data.data[0].slice(stIdx,endIdx));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };



useEffect(() => {
  const handleResize = () => {
    // console.log("change");
    
    if (window.innerWidth < "768") {
    
      // console.log("yes");
      
      setEndIdx(2);
      setStIdx(0)
    
    } else {
       setEndIdx(6);
      setStIdx(0)
    }
  };

  handleResize(); // initial check
  window.addEventListener("resize", handleResize);

  return () => window.removeEventListener("resize", handleResize);
}, []);



  useEffect(() => {

   
    apiCall();
    
    // console.log(stIdx,endIdx,items.length);


  }, [stIdx,endIdx]);

  // console.log(items.length);
  
  return (
    <>
      <div className="flex justify-between items-center p-4">
        <div className="p-2">Stay near Islamabad</div>

        <div className="flex gap-2">
          <button className="rounded-full bg-gray-200 cursor-pointer p-2 hover:bg-gray-300"
          
          disabled={stIdx<=0}
          onClick={()=>{
            setEndIdx(endIdx-1) 
            setStIdx(stIdx-1)
            }}
          >
            <ArrowLeft size={16} />
          </button>
          
          
          
          <button className="rounded-full bg-gray-200 cursor-pointer p-2 hover:bg-gray-300"
          disabled={endIdx==7}
          onClick={()=>{
            setEndIdx(endIdx+1) 
            setStIdx(stIdx+1)
            }}>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-6 gap-2 p-4">
        {items.map((curr) => {
          return (
            (
              <div key={curr.id} className="cursor-pointer relative">
            <NavLink to={`/city/islamabad/id/${curr.id}`}>
                  <img
                  src={curr.pic}
                  alt="room img"
                  className="rounded-xl  w-50 h-50 shrink-0  hover:-translate-y-2 object-cover transition-all duration-200"
                />
            </NavLink>

                <div className="absolute top-1 left-1 rounded-2xl px-2 font-semibold text-sm bg-gray-200 w-fit shrink-0">
                  {curr.type}
                </div>

                <div className="font-semibold whitespace-nowrap text-sm md:text-md">
                  Apartment in Islamabad
                </div>

                <div className="flex flex-col  text-gray-600">
                  <div className="whitespace-nowrap text-sm md:text-md">
                    {curr.rate}$ <span>for 17 nights</span>
                  </div>

                  <div className="flex  items-center whitespace-nowrap text-sm md:text-md">
                    <Star size={16} className="stroke-gray-600" />
                    {curr.rating}
                  </div>
                </div>
              </div>
            )
          );
        })}
      </div>
    </>
  );
}
