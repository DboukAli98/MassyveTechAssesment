import Image from 'next/image'
import Link from 'next/link'
import { useEffect } from 'react';

export default function UserHome() {

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [roles , setRoles] = useState();


  useEffect(() => {
    // Perform localStorage action
     setUsername(localStorage.getItem('username'));
    setEmail(localStorage.getItem('email'));
    setRoles(localStorage.getItem('roles'));
    
    
  }, [])
 
  return (
   <div className="container">
      <h1>Hello {username}</h1>
      <h2>your email : {email}</h2>
      <h3>your role : {roles}</h3>
    </div>  
    )
}