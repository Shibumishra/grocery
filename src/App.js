import React,{useState , useEffect} from 'react';
import { Alert } from './Alert';
import { List } from './List';
import ProductTitle from './ProductTitle';
import ProductName from './ProductName';
import Description from './Description';
import Priority from './Priority';

const getLocalStorage = () => {
  let list = localStorage.getItem('list');
  if(list){
    return JSON.parse(localStorage.getItem('list'))
  }
  else{
    return []
  }
}


function App() {
  const [name, setName] = useState('');
  const [list, setList] = useState(getLocalStorage);
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(null);
  const [alert, setAlert] = useState({
    show: true, 
    msg: '', 
    type: '',
  })

  const haldleSubmit = (e) => {
    e.preventDefault()
    if(!name){
      //display alert
      showAlert(true, 'danger', 'please enter value')
      setAlert({show: true, msg: 'please enter value', type: 'denger'})
    }
    else if(name && isEditing){
      //deal with edit
      setList(list.map((item)=> {
        if(item.id=== editID){
          return{ ...item, title: name}
        }
        return item
      })
      )
      setName('');
      setEditID(null);
      setIsEditing(false);
      showAlert(true,'Success','value changed')
    }
    else{
      showAlert(true, 'success', 'item added to the list')
      const newItem = {id: new Date().getTime().toString(), title: name};
      setList([...list, newItem]);
      setName('');
    }
  }

  const showAlert = (show=false, type="", msg="") =>{
    setAlert({show: show,type,msg})
  }
  const clearList =()=>{
    showAlert(true, 'danger', 'empty list');
    setList([])
  }
  const removeItem = (id) =>{
    showAlert(true, 'danger', 'item removed');
    setList(list.filter((item)=> item.id !== id))
  }

  const editiItem = (id)=> {
    const specificItem = list.find((item)=> item.id === id);
    setIsEditing(true)
    setEditID(id)
    setName(specificItem.title)

  }

  useEffect(() => {
    localStorage.setItem('list',JSON.stringify(list))
  }, [list])

  return (
    <section className="section-center">
      <form action="grocery-form" onSubmit={haldleSubmit}>
        {alert.show && <Alert {...alert} removeAlert={showAlert} list={list} />}
        <h3>project Name</h3>
        <div className="form-control">
          <input  type="text" className="grocery" placeholder="Project Name" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
          <button type="submit" className="submit-btn" >
            {isEditing ? 'edit' : 'submit'}
          </button>
      </form>
      <div className="grocery-container">
        <List items={list} removeItem={removeItem} editiItem={editiItem} />
        <button className="clear-btn" onClick={clearList}>clear item</button>
      </div>
      <ProductTitle />
      <ProductName />
      <Description />
      <Priority />
    </section>
  );
}

export default App;
