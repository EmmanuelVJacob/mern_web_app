import React,{useEffect,useState} from 'react'
import Hero from '../Components/Hero'
import axios from 'axios'
import { toast } from 'react-toastify'
import { InputGroup, FormControl, Button } from 'react-bootstrap';

function HomeScreen() {
  const deleteUser = async(id,name)=>{
    const confirmDelete = window.confirm(`Are you sure you want to delete   ${name}`)
    if(confirmDelete){
      await axios.delete(`api/admin/deleteUser/${id}`);
      setUser((undeletedUsers)=>undeletedUsers.filter((user)=>user._id!==id));
      toast.success('user deleted successfully')
    }else{
      toast.error('user not deleted')
    }
  }
  const [users,setUser] = useState([])
  const [search,setSearch] = useState('')
  useEffect(()=>{
    axios.get('api/admin/userTable').then((res)=>{
      setUser(res.data)
      console.log(users,'sdfs');
    })
  },[])

  // useEffect(() => {
  //   console.log(search);
  //   const filtered = users.filter((user) => user.name.toLowerCase().includes(search.toLowerCase()));
  //   setUser(filtered);
  //   console.log( users);
  
  //   // No need to return anything here, as we don't have any cleanup tasks
  // }, [search]);
  

  const filteredData = users.filter((user) => user.name.toLowerCase().includes(search.toLowerCase()))
  return (
    <>
    <InputGroup className="mb-3">
        <FormControl
          placeholder="Search..."
          value={search}
          onChange={(e)=>{setSearch(e.target.value)}}
        />
      </InputGroup>
          <div className="text-center">
                        <div className="row table-responsive col-lg-12">
                            <table className="table table-bordered" style={{ width: '100%' }} id="productsTable">
                                <thead>
                                    <tr>
                                        <th scope="col">Name</th>
                                        <th scope="col">Email</th>
                                        <th scope="col">Edit</th>
                                        <th scope="col">Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredData.map((user) => (
                                        <tr key={user._id}>
                                            <td>{user.name}</td>
                                            <td>{user.email}</td>
                                            <td>
                                                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                                                <a className="btn btn-primary">
                                                    Edit
                                                </a>
                                            </td>
                                            <td>
                                                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                                                <a className="delBtn btn btn-primary" onClick={()=>{deleteUser(user._id,user.name)}} >
                                                    Delete 
                                                </a>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
    </>
  )
}

export default HomeScreen
