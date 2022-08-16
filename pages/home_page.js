import Image from 'next/image'
import Link from 'next/link'

export default function UserHome() {

 const username = localStorage.getItem('username');
 const email = localStorage.getItem('email');
 const roles = localStorage.getItem('roles');
 const isLogged = localStorage.getItem('isLogged');
  return (
   <div className="container">
      <h1>Hello {username}</h1>
      <h2>your email : {email}</h2>
      <h3>your role : {roles}</h3>
      <h4>your are {isLogged}</h4>
    </div>  
    )
}