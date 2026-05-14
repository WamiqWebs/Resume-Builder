"use client"
import { useRouter } from "next/navigation";
import { useState } from "react";
interface UserData{
  name:string;
  email:string;
  phone:string;
  location:string;
  skill:string;
  education:string;
  experience:string;
  personal_statement:string;
  
}
export default function GetStartedForm() {
    const fields = [
        {
          name: "name",
          type: "text",
          placeholder: "Name",
        },
        {
          name: "email",
          type: "email",
          placeholder: "Email...",
        },
         {
          name: "phone",
          type: "text",
          placeholder: "Phone number...",
      
        },
      ]
      const skillset = [
         {
          name: "location",
          type: "text",
          placeholder: "Address...",
      
        },
        {
          name: "skill",
          type: "text",
          placeholder: "Skill...",
        },
        {
          name: "education",
          type: "text",
          placeholder: "Education...",
        },
        {
          name: "experience",
          type: "text",
          placeholder: "Experience...",
        },
         {
          name: "personal_statement",
          type: "text",
          placeholder:"Your opinion...",
        }
      ]
 const [userdata,setUserdata] = useState<UserData>((
   {
     name:"",
     email:"",
     phone:"",
     location:"",
     skill:"",
     education:"",
     experience:"",
     personal_statement:""
   }
 ));
const handleChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
) => {
  const { name, value } = e.target;

  setUserdata({
    ...userdata,
    [name]: value
  });
};
const router = useRouter();
 const handleSubmit = (e:React.FormEvent<HTMLFormElement>)=>{
  e.preventDefault();
  localStorage.setItem("userdata",JSON.stringify(userdata));
  router.push("/templates");
  console.log(userdata); 
 }
  return(
    <>
     <form onSubmit={handleSubmit} className="py-2 md:py-5 border-2 text-white shadow-teal-600 border-teal-500 grid grid-cols-1 font-semibold gap-1 bg-linear-to-b from-lime-500 to-lime-300 rounded-lg shadow-lg">
      {fields.map(((field)=>
      <input 
      required
      key={field.name}
      name={field.name}
      type={field.type}
      value={userdata[field.name as keyof UserData]}  
      onChange={handleChange}
      placeholder={field.placeholder}
      className="p-2 rounded-2xl text-md"
     />
      ))}
     {skillset.map(((skill)=>
      <textarea
      required 
      rows={1}
      key={skill.name}
      name={skill.name}
      value={userdata[skill.name as keyof UserData]}  
      onChange={handleChange}
      placeholder={skill.placeholder}
      className="p-2 rounded-2xl"
     />
     ))}
     <div className="flex justify-center items-center">
     <button type="submit" className="bg-teal-500 hover:bg-lime-600 px-5 py-3 mt-2 rounded-2xl text-md">Submit</button>
     </div>
     </form>
    </>
  )
}