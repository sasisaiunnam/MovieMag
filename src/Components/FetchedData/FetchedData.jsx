import React,{useState,useEffect} from 'react'

function useFetchedData(url) {
    const [data,setData] = useState([]);
    const [loading,setLoading] = useState(true)

    useEffect(() =>{
    const fetchData =async() =>{
        try {
                setLoading(true);
                const response = await fetch(url);
                const result = await response.json(); 
                setData(result);
            } catch (error) {
                console.error("Fetch error:", error);
            } finally {
                setLoading(false);
            }
    } 
    if (url) {
            fetchData();
        }
    },[url])

  return {data,loading}
  
}

export default useFetchedData
