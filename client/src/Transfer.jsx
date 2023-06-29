import React, {useState} from "react";
import axios from "axios"



const Transfer = ({group, username, setSeePage}) => {
  const [selectAccountTransferValue, setSelectAccountTransferValue] = useState('')
  const [selectUserValue, setSelectUserValue] = useState('')
  const [inputAmountTransferVal, setInputAmountTransferVal] = useState('')

  const handleChangeAccountTransfer = function(e) {
    setSelectAccountTransferValue(e.target.value)
  }
  const handleChangeUserTransfer = function(e) {
    setSelectUserValue(e.target.value)
  }
  const handleChangeAmountTransfer = function(e) {
    setInputAmountTransferVal(e.target.value)
  }
  const handleSubmitTransfer = function() {
    setSeePage('Accounts')
    sendMoneyReq()
  }

  let sendMoneyReq = function() {
    axios.post('/api/sendMoney', {selectUserValue, inputAmountTransferVal, username})
    .then((response) => {
      console.log("seeeend money", response.data)
    })
    .catch((error) => {
      console.log(error)
    });
  }



  return (
    <div className="bank-webpage-format">
    <aside>
      <div >
        <div onClick={() => setSeePage('Accounts')} className="flex-container aside-padding-top">
          <i className="fa-solid fa-piggy-bank" style={{color: "#ffffff",}}></i>
          <p >Accounts</p>
        </div>
        <div onClick={() => setSeePage('Transfer')} className="flex-container">
          <i className="fa-solid fa-money-bill-transfer" style={{color: "#ffffff",}}></i>
          <p >Transfer</p>
        </div>
        <div onClick={() => setSeePage('Deposit')} className="flex-container">
          <i className="fa-solid fa-circle-dollar-to-slot" style={{color: "#ffffff",}}></i>
          <p >Deposit</p>
        </div>
        <div onClick={() => setSeePage('Deposit')} className="flex-container">
          <i className="fa-solid fa-hand-holding-dollar" style={{color: "#ffffff",}}></i>
          <p >Withdraw</p>
        </div>
        <div className="flex-container">
          <i className="fa-solid fa-phone" style={{color: "#ffffff",}}></i>
          <p>contact</p>
        </div>
        <div className="flex-container">
          <i className="fa-solid fa-circle-info" style={{color: "#ffffff",}}></i>
          <p>More</p>
        </div>
      </div>
    </aside>

    <section>
      <form className="transaction-form-box">
        <label>
          Choose an account
          <select value={selectAccountTransferValue} onChange={handleChangeAccountTransfer}>
            <option> Select</option>
            <option value="checking">checking</option>
          </select>
        </label>
        <label>
          Send to
          <select value={selectUserValue} onChange={handleChangeUserTransfer}>
            <option>Select User</option>
            {group && group.length > 0 && group?.map((user, index) => {
              if (user.username !== username) {
                return (
                  <option value={user.customer_id} key={index}>{user.username}</option>
                );
              }
              return null;
            })}
          </select>
        </label>
        <label>
          Amount
          <input value={inputAmountTransferVal} onChange={handleChangeAmountTransfer} type="number"/>
        </label>
        <button onClick={handleSubmitTransfer} type="submit">Send</button>
      </form>
    </section>
  </div>
  )
}

export default Transfer;