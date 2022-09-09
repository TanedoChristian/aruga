import Header from "./Header";
import {ReactSession} from 'react-client-session';
import { useEffect, useState } from "react";
import axios from "axios";
import $ from 'jquery';

const Postjob = () =>{


    


    const [jobTitle, setJobTitle] = useState('');
    const [jobAddr1, setJobAddr1] = useState('');
    const [jobAddr2, setJobAddr2] = useState('');
    const [jobQualifications, setJobQualification] = useState('')
    const [jobDescription, setJobDescription] = useState('')
    const [jobSalary, setJobSalary] = useState('')
    const [errorAddr2, setErrorAddr2] = useState('')

    const onChangeTitle = (e) =>{
        setJobTitle(e.target.value);
    }

    const onChangeAddr1 = (e) =>{
        setJobAddr1(e.target.value);
    }

    const onChangeAddr2 = (e) =>{

        if(e.target.value.length < 3){
            setErrorAddr2("Input must be 8 characters long");
        } else {
            setErrorAddr2("")
        }

        setJobAddr2(e.target.value);
    }

    const onChangeQual = (e) =>{
        setJobQualification(e.target.value);
    }

    const onChangeDesc = (e) =>{
        setJobDescription(e.target.value);
    }

    const onChangeSalary = (e) =>{
        setJobSalary(e.target.value);
    }


    const postJob = () => {

        var isValid = true;

        $('input').each(function() {
            if(!$(this).val()){
                isValid = false;
                return false;
            } 
        });

        
        
        
        if(isValid){
            axios({
                method: "post",
                url: "http://localhost/aruga/post-job",
                body: 'Content-Type: application/json',
                data: {
                    jobtitle: jobTitle,
                    jobaddress1: jobAddr1,
                    jobaddress2: jobAddr2,
                    qualifications: jobQualifications,
                    jobdescription: jobDescription,
                    salary: jobSalary
                }
            }, [])
            .then((res)=>{
                console.log(res.data.message)
                if(res.data.message == true){
                    $(':input').val('');
                    $('.modal-container').css({ display: "flex"});   
                }
                })
        } else {

        }

               

                
            
                
        
            
        

        
    }

    const displayNone = () => {
        $('.modal-container').css({ display: "none"});
    }



    return (
        <div>
            <Header email={ReactSession.get("email")} logout={"Logout"}/>
            <div className="postjob-container">
                <div className="modal-container">
                    <div className="modal" onClick={displayNone}>
                        <h1> JOB POST SUCCESS</h1>
                        <span class="material-symbols-outlined check">
                        task_alt
                        </span>
                    </div>
                </div>
                <div className="postjob-wrapper">
                    <div className="postjob-info-container">
                        <h1> POST JOB </h1>
                            <div class="input-container">
                                <label> Job Title</label>
                                <input type="text" name="job-title" placeholder = "Job Title" onChange={onChangeTitle} id="input-job" required/>
                            </div>

                            <div class="input-container">
                                <label> Job Address 1</label>
                                <input type="text" name="job-address1" placeholder = "Job Address 1" onChange={onChangeAddr1} id="inputjob" required/>
                            </div>

                            <div class="input-container">
                                <label> Job Address 2</label>
                                <input type="text" name="job-address2" placeholder = "Job Address 2" onChange={onChangeAddr2} className="inputjob" required/>
                                <p> {errorAddr2}</p>
                            </div>
                            
                            <div class="input-container">
                                <label> Qualifications</label>
                                <input type="text" name="qualifications" placeholder = "Qualifications" onChange={onChangeQual} className="inputjob" required/>
                            </div>

                            <div class="input-container">
                                <label> Job Description</label>
                                <textarea name="job-description" placeholder="Input Job Description" onChange={onChangeDesc} className="inputjob" required/>
                            </div>

                            <div class="input-container">
                                <label> Salary </label>
                                <input type="number" name="salary" placeholder = "PHP" onChange={onChangeSalary} className="inputjob" required/>
                            </div>

                            <button onClick={postJob}>Post Job</button>
                    </div>
                </div>
            </div>
        </div>
        


    )

}

export default Postjob;