import React, { useEffect, useState, useTransition } from "react";
import axios, { Axios } from "axios";


function App() {
  const [todolar, setTodolar] = useState(null)
  const [title, setTitle] = useState("")
  const [editDate, setEditDate] = useState()
  const [result, setResult] = useState(false)
  const [resultMessage, setResultMessage] = useState("")
  const [error, setError] = useState(false)
  const [editTodo, setEdiTodo] = useState(null)
  const [isEditTodo, setIsEditTodo] = useState(false)


  const todoCopmleted=(todo)=>{
    const updateTodo={
      ...todo,
      copmlated: !todo.copmlated,
    }
    axios.put(`http://localhost:3004/todos/${todo.id}`, updateTodo)
      .then((response)=>{
        setResult(true)
        setResultMessage("Güncelleme işlemi başarılı")

      })
      .catch((error)=>{
        setError(true)
        setResultMessage("HATA: Güncellme işlemi gerçekleşmedi ")

      })


  }

  const todoDelete = (id)=>{
    axios.delete(`http://localhost:3004/todos/${id}`)
    .then((reponse)=>{
      setResult(true)
      setResultMessage("Silme işlemi tamamlandı.")
      
     })
     .catch((error)=>{
      setError(true)
      setResultMessage("HATA: Silme işlme yapılırken bir hata oluştu lüften yönetici ile iletişme geçiniz.")


     })

  };

  useEffect(() => {
    axios.get("http://localhost:3004/todos")
      .then((response) => {
        console.log(response.data)
        setTodolar((response.data).reverse())


      })
      .catch((error) => {
        console.log(error)
      })

  }, [result])

  const handleSubmit = (event) => {
    event.preventDefault()
    if (title === "") {
      alert("yapılacak iş boş bırakılamaz.")
      return
    }
    const newTodo = {
      id: String(new Date().getTime()),
      title: title,
      date: new Date(),
      copmlated: false,
      editDate: null

    }



    axios.post("http://localhost:3004/todos", newTodo)
      .then((reponse) => {
      
        setTitle("")
        setResult(true)
        setResultMessage("kaydetme işlemi başarılı")

      })
      .catch((error) => {
        setError(true)
        setResultMessage("işlem başarısız! Bir hata ile karılışıldı. Lütfen sistem yöneticisine durumu iletin.")
      })
  }

  if (todolar === null) {
    return null
  }


  return (
    <div className="container py-5 w-50">

      {
        error === true && (
          <div style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100vh",
            backgroundColor: "rgba(0,0,0,0.3)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1
          }}>
            <div className="alert alert-danger" role="alert">
              <p>{resultMessage}</p>
              <div className="d-flex justify-content-center">
                <button className="btn btn-sm btn-outline-warning" onClick={() => setError(false)}>
                  CLOSE
                </button>
              </div>

            </div>
          </div>
        )}




      {
        result === true && (
          <div style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100vh",
            backgroundColor: "rgba(0,0,0,0.3)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1
          }}>
            <div className="alert alert-success" role="alert">
              <p>{resultMessage}</p>
              <div className="d-flex justify-content-center">
                <button className="btn btn-sm btn-outline-primary" onClick={() => setResult(false)}>
                  CLOSE
                </button>
              </div>

            </div>
          </div>
        )}
      <div className="row">
        <form onSubmit={handleSubmit}>
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Type your todo"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
            <button
              className="btn btn-primary"
              type="submit">
              Add
            </button>
          </div>
        </form>
      </div>
      {todolar.map((todo) => (
        <div key={todo.id} className="alert alert-secondary" role="alert">

          <div className="d-flex justify-content-between">
            <div>
              <h3>{todo.title}</h3>
              <p>{new Date(todo.date).toLocaleString()}</p>
            </div>
            <div className="d-flex align-items-end">
              <button
                className="btn btn-sm btn-warning mx-1"
                type="button">
                EDIT
              </button>
              <button
                onClick={()=>todoDelete(todo.id)}
                className="btn btn-sm btn-danger mx-1"
                type="button">
                DELETE
              </button>
              <button
                onClick={()=>todoCopmleted(todo)}
                className="btn btn-sm btn-success mx-1"
                type="button">
                {todo.copmlated === true ? "NOT DONE" : "DONE"}
              </button>
            </div>
          </div>
        </div>
      ))}



      {

      }

    </div>





  );
}

export default App;
