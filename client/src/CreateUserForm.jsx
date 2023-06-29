import React, {useState} from "react";
import axios from "axios"



const CreateUserForm = ({createAnAccountReq, setSeePage, username, password, handleUsernameInputChange, handlePasswordInputChange}) => {

  let handleOnClick = function(event) {
    event.preventDefault();
    createAnAccountReq()
    setSeePage('Accounts')
  }

  return (
    <div className="create-user-background">
      <div className="create-user-div">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1cje4gEgoAx0ckxywRdiT0zKUGfAxd5aFnA&usqp=CAU"></img>
        <h2>Monopoly Online Bank</h2>
        <form className="create-user-form">
          <label className="create-user-item">
            {/* Username */}
            <input onChange={handleUsernameInputChange} value={username} type="text" placeholder="Create a username"></input>
          </label>
          <label>
            {/* Password */}
            <input onChange={handlePasswordInputChange} value={password} type="password" placeholder="Create a password"></input>
          </label>
          <button className="btn" type="submit" onClick={(event) => handleOnClick(event)}>continue</button>
        </form>
      </div>
    </div>
  )
}
export default CreateUserForm;

