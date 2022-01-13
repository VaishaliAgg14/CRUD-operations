import {useState , useEffect} from 'react';
import './App.css';
import {db} from './firebase.js';
import { collection , getDocs , addDoc , updateDoc, doc , deleteDoc ,} from 'firebase/firestore';
import { Container } from '@material-ui/core';

function App() {
  const [newName , setNewName] = useState('');
  const [newAge , setNewAge] = useState(0);

  const [users , setUsers] = useState([]);
  const userCollectionRef = collection(db , 'users')

  const createUser = async () => {
    await addDoc(userCollectionRef , { name: newName , age: Number(newAge)});
  }

  const updateUser = async (id , age ) => {
    const userDoc = doc(db , "users" , id);
    const newFields = {age: age + 1};
    await updateDoc(userDoc, newFields);
  }

  const decreaseAge = async (id , age ) => {
    const userDoc = doc(db , "users" , id);
    const newFields = {age: age - 1};
    await updateDoc(userDoc, newFields);
  }

  const deleteUser = async (id) => {
    const userDoc = doc(db , "users" , id);
    await deleteDoc(userDoc)
  }

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(userCollectionRef);
      setUsers(data.docs.map((doc) => ({...doc.data() , id: doc.id})))
    }
    getUsers()
  } ,[]);

  return (
    <div className="App">
      <input placeholder = "Name..." onChange= {(e) => setNewName(e.target.value)}/>
      <input type = 'number' placeholder = "Age..." onChange={(e) => setNewAge(e.target.value)} />
      <button onClick = {createUser}> Create User</button>
      {users.map((user) => {
        return(
          <div>
            <Container variant="outlined" >
              <h1> Name : {user.name} </h1>
              <h1> Age : {user.age} </h1>
              <button onClick={() => {updateUser(user.id , user.age)}}>Increase Age</button>
              <button onClick={() => {decreaseAge(user.id , user.age)}}>Decrease Age</button>
              <button onClick = {() => {deleteUser(user.id)}}>Delete User</button> 
            </Container> 
          </div>
        );
      })}
    </div>
  );
}

export default App;
