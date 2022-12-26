import React, { useEffect, useState } from "react";
import axios, { Axios } from "axios";


function App() {
  const [todolar, setTodolar] = useState(null)
  const [title, setTitle] = useState("")
  const [editDate, setEditDate] = useState()
  const [editDateUpdate, setEditDateUptade] = useState()
  const [result, setResult] = useState(false)
  const [resultMessage, setResultMessage] = useState("")
  const [error, setError] = useState(false)


  useEffect(() => {
    axios.get("http://localhost:3004/todos")
      .then((response) => {
        console.log(response.data)
        setTodolar(response.data)


      })
      .catch((error) => {
        console.log(error)
      })

  }, [])

  const formuDenetle = (event) => {
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
      editDate: false

    }



    axios.post("http://localhost:3004/todos", newTodo)
      .then((reponse) => {
        setTodolar([...todolar, newTodo])
        setTitle("")
        setResult(true)
        setResultMessage("kaydetme işlemi başarılı")

      })
      .catch((error) => {
        setError
        alert("işlem başarısız! Bir hata ile karılışıldı. Lütfen sistem yöneticisine durumu iletin.")
      })
  }

  if (todolar === null) {
    return null
  }


  return (
    <div className="container py-5 w-50">
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
        <form onSubmit={formuDenetle}>
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
          <div>
            <h3>{todo.title}</h3>

          </div>
        </div>
      ))}



      {

      }

    </div>





  );
}

export default App;
