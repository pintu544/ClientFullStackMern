import React, { useEffect, useState } from 'react'
import '../style/home.css';
import { success } from '../Toast';
import { addUser, onDeleteUser, updateUser } from '../Utils/userApi';
import 'reactjs-popup/dist/index.css';



function Home() {
  
  const [allUserData, setAllUserData] = useState([])
  const [loading, setLoding] = useState(true)
  const [userData, setUserData] = useState({
    name: "",
    lastName: "",
    email:"",
    mobile:"",
    project:"",


  });
  const [edit, setEdit] = useState(false)
  const [idForUpdate, setIdForUpdate] = useState(0)

  const onHandleEvent = (event) => {
    setUserData({ ...userData, [event.target.name]: event.target.value, [event.target.name]: event.target.value })
  }

  // add new user
  const onAddUser = async () => {
    console.log("User");
    console.log(userData);
    const apiResponce = await addUser(userData)
    if (apiResponce.status === 200) {
      success(apiResponce.data.message)
      console.log("responcemessage", apiResponce.data.message);
    } else {
      // success(apiResponce.data.message)
      console.log("error", apiResponce);
    }
    setUserData({
        name: "",
        lastName: "",
        email:"",
        mobile:"",
        project:"",
    })
  }

  // on delete user
  const onDeteteUser = async (id) => {
    console.log(id);
    const apiResponce = await onDeleteUser(id)
    if (apiResponce.status === 200) {
      success(apiResponce.data.message)
      console.log("responcemessage", apiResponce.data.message);
    } else {
      // success(apiResponce.data.message)
      console.log("error", apiResponce);
    }
  }

  // show report


  // edit user detail
  const onEditUser = (id) => {
    const userList = [...allUserData]
    const user = userList.find(item => item._id === id);
    console.log(user);
    setUserData({ name:user.name,lastName:user.lastName,email:user.email,mobile:user.mobile, project:user.project })
    setEdit(true)
    setIdForUpdate(id)
  }

  // update the user
  const onUpdateUser = async () => {
    console.log(idForUpdate, userData);
    const res = await updateUser(idForUpdate, userData)
    if (res.status === 200) {
      success(res.data.message)
      console.log("responce message:", res.data.message);
    } else {
      console.log("error");
    }
    setEdit(false)
    setUserData({
        name: "",
        lastName: "",
        email:"",
        mobile:"",
        project:"",
    })
  }


  useEffect(() => {
    (async () => {
      const res = await fetch(`http://localhost:5000/getUsers`)
      const data = await res.json()
      console.log(data);
      setAllUserData(data.user)
      console.log(data.user);
      setLoding(false)
    })()
  }, [allUserData])


  return (
    <div className='bg'>
      <div className="sidebar-home">
        <a className="active fs-4 heading-text" href="#home">Create Client</a>

        <div>
        <form className="">
  <label htmlFor="name"> Name</label>
  <input
    type="text"
    name="name"
    id="name" // Add this
    value={userData.name}
   
    onChange={(e) => onHandleEvent(e)}
  />

  <label htmlFor="lastName">Last Name</label>
  <input
    type="text"
    name="lastName"
    id="lastName" // Add this
    value={userData.lastName}
   
    onChange={(e) => onHandleEvent(e)}
  />

  <label htmlFor="email">Email</label>
  <input
    type="text"
    name="email"
    id="email" // Add this
    value={userData.email}
   
    onChange={(e) => onHandleEvent(e)}
  />

  <label htmlFor="mobile">Phone Number</label>
  <input
    type="text"
    name="mobile"
    id="mobile" // Add this
    value={userData.mobile}
   
    onChange={(e) => onHandleEvent(e)}
  />

  <label htmlFor="project">Project Details</label>
  <textarea
    rows={4}
    cols={30}
    name="project"
    id="project" // Add this
    value={userData.project}
    
    onChange={(e) => onHandleEvent(e)}
  />
</form>

        </div>

        <div>
          {!edit ? <button className='add-btn' onClick={() => onAddUser()}><h5>Create Client</h5></button> : <button className='update-btn' onClick={() => onUpdateUser()}><h5>UPDATE</h5></button>}
        </div>

      </div>

      <div className="content-home">
        <div><h3 className='m-3 heading-text'>Clients </h3></div>
        <div className='margin'>
              <div className='row mt-2 ms-2'>
              
                <div className='col-2 fs-3 title-text'> Name</div>
                <div className='col-2 title-text fs-3 '>Last Name</div>
                <div className='col-2 fs-3 title-text'>Email</div>
                <div className='col-2 title-text fs-3 '>mobile</div>
                <div className='col-2 fs-3 title-text'>Project</div>
              
               
                
              </div>
            </div>
        {allUserData?.length === 0 ? <h3 className='text-danger'><i>  User details is Empty</i></h3>
          : <div className='container'>
            

            <div className='margin'>
              {loading
                ? (<p>Loading....</p>)
                : ( allUserData?.map((item) => (
                  <div className='row mt-2 ms-2' key={item._id}>
                  
                    <div className='col-2 fs-3 user-text'>{item.name}</div>
                    <div className='col-2 fs-3 user-text'>{item.lastName}</div>
                    <div className='col-2 fs-3 user-text'>{item.email}</div>
                    <div className='col-2 fs-3 user-text'>{item.mobile}</div>
                    <div className='col-2 fs-3 user-text'>{item.project}</div>
                    <div className='col-1 '>
                    <button onClick={() => onEditUser(item._id)} className=" ">Edit</button></div>
                    <div className='col-1 '><button onClick={() => onDeteteUser(item._id)} className="">Delete</button></div>
                    
                    
                  </div>
                )))}

            </div>
          </div>}
      </div>
    </div>
  )
}

export default Home