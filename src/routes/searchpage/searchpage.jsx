import { useSearchParams } from "react-router";
import Gallery from "../../components/galery/galery";
import './searchpage.css'
import axios from "axios";
import {useQuery,useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

const fetchPins = async ({ pageParam, search, username }) => {
    console.log('p',search);
    
 const res = await axios.get(`https://nestjs-peach.vercel.app/pins?search=${search || ''}&username=${'' || ''}`,//pageParam=${pageParam || ''}
) 
console.log(res.data);  
return res.data
}

const Searchpage = () => {
    
    let [searchParams] = useSearchParams()  
    const search = searchParams.get('search')
    
     const queryClient = useQueryClient()    
        const { data,  status, error } = useQuery({      
        queryKey: ['pins', search],
        queryFn: ({ pageParam = 0 }) =>{console.log(search);
         fetchPins({ pageParam, search, username })},
    })

    if (status === "error") return <div>error occurred {error.message}</div>
    if (status === 'panding') return <div>"loading..."</div>


    return (
        <Gallery search={search} />
            )
   
}

export default Searchpage;