import React, {useState} from "react";
import axios from "axios"



const EnterGroupForm = ({setSeePage, groupName, handleGroupInputChange}) => {

  let handleOnClick = function(event) {
    event.preventDefault();
    setSeePage('CreateUserForm')
  }

  return (
    <div className="create-user-background">
      <div className="create-user-div">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1cje4gEgoAx0ckxywRdiT0zKUGfAxd5aFnA&usqp=CAU"></img>
        <h2>Monopoly Online Bank</h2>
        <form>
          <label>
            {/* Group Name */}
            <input type="text" onChange={handleGroupInputChange} value={groupName} placeholder="Enter your group name"></input>
          </label>
          <button className="btn" type="submit" onClick={(event) => handleOnClick(event)}>continue</button>
        </form>
      </div>
    </div>
  )
}
export default EnterGroupForm