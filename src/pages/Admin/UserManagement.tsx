import { Card,Table, Button,Form } from 'react-bootstrap'
import {useState, useEffect} from 'react'
import ModalHtml from '../../components/forms/modal'

function User() {

    interface IUser { 
        id : number,
        FirstName : string
        LastName : string
        Username : string
    }

    const [userList, setUserList] = useState<IUser[]>([
        {
          id: 1,
          FirstName: 'John',
          LastName: 'Doe',
          Username: 'johndoe'
        },
        {
          id: 2,
          FirstName: 'Alice',
          LastName: 'Smith',
          Username: 'alicesmith'
        },
        {
          id: 3,
          FirstName: 'Bob',
          LastName: 'Johnson',
          Username: 'bobjohnson'
        },
        {
          id: 4,
          FirstName: 'Emily',
          LastName: 'Davis',
          Username: 'emilydavis'
        },
        {
          id: 5,
          FirstName: 'Michael',
          LastName: 'Brown',
          Username: 'michaelbrown'
        }
    ])
    const [modalOpen, setModalOpen] = useState(false)
    const [modalOpenUpdate, setModalOpenUpdate] = useState(false)

    const [userFormState, setUserFormState] = useState<IUser>({
        id: 0,
        FirstName: '',
        LastName: '',
        Username: ''
    })

    const [userUpdateFormState, setUserUpdateFormState] = useState<IUser>({
        id: 0,
        FirstName: '',
        LastName: '',
        Username: ''
    })

    const initialUserState: IUser = {
        id: 0,
        FirstName: '',
        LastName: '',
        Username: ''
    }

    const AddUser = (newUser : IUser) => {
        // Create a new user object
    
        // Update the user list by adding the new user
        setUserList([...userList, newUser])

        //reset the user
        setUserFormState(initialUserState)
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setUserFormState(prevUser => ({
          ...prevUser,
          [name]: value // Dynamically update the correct property based on the input name
        }));
    };

    const handleChangeUpdate = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setUserUpdateFormState(prevUser => ({
          ...prevUser,
          [name]: value // Dynamically update the correct property based on the input name
        }));
    };

    function OpenUpdateModal(user : IUser){
        setUserUpdateFormState(user)
        setModalOpenUpdate(true)
    }

    function UpdateUser(){

    }

    const GetFilteredUsers = (): IUser[] => {
        if (!search.trim()) return userList;
        return userList.filter(user =>
            user.FirstName.toLowerCase().includes(search.toLowerCase()) ||
            user.LastName.toLowerCase().includes(search.toLowerCase()) ||
            user.Username.toLowerCase().includes(search.toLowerCase())
        );
    };

    useEffect(()=>{
        const newUser: IUser = {
            id: userList.length + 1, // Assign a unique ID
            FirstName: 'New',
            LastName: 'User',
            Username: 'newuser' + (userList.length + 1) // Assign a unique username
        };
        AddUser(newUser)
    },[])

    const [search, setSearch] = useState<string>('')

    // Function to update the state
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value)
  }


    return (
        <>
            <Form.Group className='mb-3' >
                <Form.Label>Search</Form.Label>
                <Form.Control type="search" onChange={handleInputChange} placeholder="Search here" value={search} />
            </Form.Group>
            <Card>
                <Card.Header className='fw-bold d-flex justify-content-between align-items-center'> 
                    <h6>User Management</h6>
                    <Button variant='primary' onClick={() => setModalOpen(true)} ><i className='fa-solid fa-plus'></i> Add</Button>
                </Card.Header>
                <Card.Body>

                    <Table striped bordered hover>
                        <thead>
                            <tr>
                            <th>#</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Username</th>
                            <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                        {GetFilteredUsers().map((user, i) => (
                            <tr key={i} >
                                <td>{user.id}</td>
                                <td>{user.FirstName}</td>
                                <td>{user.LastName}</td>
                                <td>{user.Username}</td>
                                <td>
                                    <span className='fw-bold text-primary pe-1 small' onClick={() => OpenUpdateModal(user)} > <i className='fa-solid fa-pencil'></i> Update</span>
                                    <span className='fw-bold text-danger small'><i className='fa-solid fa-trash'></i> Delete</span>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>

            <ModalHtml
                isOpen={modalOpen}
                size='lg'
                onClose={() => setModalOpen(false)}
                header={<span> <i className='fa-solid fa-plus'></i> Add User</span>}
            >
                {{
                body: 
                    <form>
                        <div className='form-group'>
                            <label className='fw-bold'>First Name</label>
                            <input
                            className='form-control'
                            type="text"
                            name="FirstName"
                            value={userFormState.FirstName}
                            onChange={handleChange}
                            placeholder="First Name"
                            />
                        </div>
                        <div className='form-group'>
                            <label className='fw-bold'>Last Name</label>
                            <input
                            className='form-control'
                            type="text"
                            name="LastName"
                            value={userFormState.LastName}
                            onChange={handleChange}
                            placeholder="Last Name"
                            />
                        </div>
                        <div className='form-group'>
                            <label className='fw-bold'>User Name</label>
                            <input
                            className='form-control'
                            type="text"
                            name="Username"
                            value={userFormState.Username}
                            onChange={handleChange}
                            placeholder="Username"
                            />
                        </div>
                    </form>,
                footer: (
                    <>
                    <Button variant='secondary' onClick={() => setModalOpen(false)}>Close</Button>
                    <Button variant='primary' onClick={() => {
                        console.log('Changes saved!');
                        userFormState.id = userList.length + 1
                        AddUser(userFormState)
                        setModalOpen(false);
                    }}>Save Changes</Button>
                    </>
                )
                }}
            </ModalHtml>

            <ModalHtml
                isOpen={modalOpenUpdate}
                size='lg'
                onClose={() => setModalOpenUpdate(false)}
                header={<span> <i className='fa-solid fa-plus'></i> Update User</span>}
            >
                {{
                body: 
                    <form>
                        <div className='form-group'>
                            <label className='fw-bold'>First Name</label>
                            <input
                            className='form-control'
                            type="text"
                            name="FirstName"
                            value={userUpdateFormState.FirstName}
                            onChange={handleChangeUpdate}
                            placeholder="First Name"
                            />
                        </div>
                        <div className='form-group'>
                            <label className='fw-bold'>Last Name</label>
                            <input
                            className='form-control'
                            type="text"
                            name="LastName"
                            value={userUpdateFormState.LastName}
                            onChange={handleChangeUpdate}
                            placeholder="Last Name"
                            />
                        </div>
                        <div className='form-group'>
                            <label className='fw-bold'>User Name</label>
                            <input
                            className='form-control'
                            type="text"
                            name="Username"
                            value={userUpdateFormState.Username}
                            onChange={handleChangeUpdate}
                            placeholder="Username"
                            />
                        </div>
                    </form>,
                footer: (
                    <>
                    <Button variant='secondary' onClick={() => setModalOpen(false)}>Close</Button>
                    <Button variant='primary' onClick={() => {
                        console.log('Changes saved!');
                        UpdateUser()
                        setModalOpenUpdate(false);
                    }}>Save Changes</Button>
                    </>
                )
                }}
            </ModalHtml>
        </>
    )
}

export default User
