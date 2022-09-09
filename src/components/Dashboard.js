import axios from 'axios';
import { data } from 'jquery';
import { useEffect, useState } from 'react';
import {ReactSession} from 'react-client-session'
import Header from './Header';
import $  from 'jquery';

const DashBoard = () => {


    const [jobs, setJobs] = useState([]);
    const [isLoad, setLoaded] = useState('');

    let data = {
        'title': '',
        'add1': '',
        'add2': '',
        'qualifications': '',
        'desc': '',
        'salary': ''
    }

    useEffect(()=>{
        axios.get("http://192.168.1.50:80/aruga/jobs")
        .then((res)=>{
            data.title = res.data.title;
            data.add1 = res.data.address1;
            data.add2 = res.data.address2;
            data.qualifications = res.data.qualifications;
            data.desc = res.data.description;
            data.salary = res.data.salary;
            console.log(res.data);
            setJobs(res.data);
            
        })
        .catch((err)=>{
            console.log(err)
        })
    },[])

    const showJob = () => {
        $(".dashboard-card-container").show("slow", function(){

        });
    }


    

    if(!ReactSession.get("email")){
        window.location.href = "/"
    }
    return (
        <div>
            <Header second={"Post Job"}email={ReactSession.get("email")} logout={"Logout"}/>
            <div className="dashboard-container">
                    <div className='dashboard-wrapper'> 
                    <div className='dashboard-search-container'>
                    <div className='dashboard-search-wrapper'>
                        <input type="text" placeholder='Where?' />
                        <button onClick={showJob}>
                        <span class="material-symbols-outlined search-icon">
                        search
                        </span>
                        </button>
                        
                    </div>
                    </div>
                    <div className='dashboard-jobpost-container'>
                        <div className='dashboard-jobpost-wrapper'>


                        {
                            jobs.map(dat => 
                                <div className='dashboard-card-container'>
                                <div className='job-info-container'>
                                <div className='job-info-1 job-info'>
                                    <h1> {dat.job_title}</h1>
                                    <p> {dat.job_address1} </p>
                                    <p> {dat.job_address2} </p>
                                </div>
                                
                                <div className='job-info-2 job-info'>
                                    <h1> Qualifications </h1>
                                    <li>{dat.qualifications}</li>
                                </div>

                                <div className='job-info-3 job-info'>
                                    <h1> Job Description </h1>
                                    <p> {dat.job_desc}</p>
                                </div>

                                <div className='job-info-4 job-info'>
                                    <h1> Salary </h1>
                                    <h4>{dat.salary}</h4>
                                </div>
                                </div>
                                <button> Apply Now! </button>
                            </div>
                                )
                        }
                        
                        
                            
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DashBoard;