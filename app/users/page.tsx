import React from 'react'

interface User {
    id: number;
    name: string;
    email: string;
    address: any;
    company: any;
    phone: string;
    
}

const UsersPage = async () => {
    const res = await fetch('https://jsonplaceholder.typicode.com/users', {cache: 'no-store'});
    const users: User[] = await res.json();

  return (
    

<div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th>

        </th>
        <th>Name</th>
        <th>Job</th>
        <th>Contact</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
      {users.map(user => <tr key={user.id}>
        <th>
          <label>
            <input type="checkbox" className="checkbox checkbox-secondary" />
          </label>
        </th>
        <td>
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="mask mask-squircle h-12 w-12">
                <img
                  src="https://img.daisyui.com/images/profile/demo/2@94.webp"
                  alt="Avatar Tailwind CSS Component" />
              </div>
            </div>
            <div>
              <div className="font-bold">{user.name}</div>
              <div className="text-sm opacity-50">{user.address.city}, {user.address.street}</div>
            </div>
          </div>
        </td>
        <td>
          {user.company.name}
          <br />
          <span className="badge badge-accent badge-sm">{user.company.bs}</span>
        </td>
        <td>{user.email}
        <br />
        <span className="badge badge-accent badge-sm">{user.phone}</span>
        </td>
        
        <th>
          <button className="btn btn-ghost btn-xs">details</button>
        </th>
      </tr>)}
    </tbody>
    </table>
    </div>
    
    // <div>
    //     <h1>User</h1>
    //     <table className='table table-bordered table-zebra'>
    //         <thead>
    //             <tr>
    //                 <th>Name</th>
    //                 <th>Email</th>
    //             </tr>
    //         </thead>
    //         <tbody>{users.map(user => <tr key={user.id}>
    //             <td>{user.name}</td>
    //             <td>{user.email}</td> 
    //         </tr>)}
    //         </tbody>
            
    //     </table>
        
    // </div>
  )
}

export default UsersPage