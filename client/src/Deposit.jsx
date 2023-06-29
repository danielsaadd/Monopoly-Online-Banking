import React, {useState} from "react";
import axios from "axios"
import HistoryListItem from "./HistoryListItem.jsx"



const Deposit = ({cust_id, setSeePage}) => {
  const [selectAccountValue, setSelectAccountValue] = useState('')
  const [selectTransactionValue, setSelectTransactionValue] = useState('')
  const [inputAmountVal, setInputAmountVal] = useState('')

  const handleChangeAccount = function(e) {
    setSelectAccountValue(e.target.value)
  }
  const handleChangeTransaction = function(e) {
    setSelectTransactionValue(e.target.value)
  }
  const handleChangeAmount = function(e) {
    setInputAmountVal(e.target.value)
  }
  const handleSubmitTransaction = function() {
    setSeePage('Accounts')
    makeTransactionReq()
  }

  let makeTransactionReq = function() {
    axios.post('/api/makeTransaction', {selectTransactionValue, inputAmountVal, cust_id})
    .then((response) => {
      console.log("makeTransactionReq", response.data)
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
          <select value={selectAccountValue} onChange={handleChangeAccount}>
            <option>Select</option>
            <option value="checking">Checking</option>
          </select>
        </label>
        <label>
          Transaction
          <select value={selectTransactionValue} onChange={handleChangeTransaction}>
            <option>Select</option>
            <option value="deposit">Deposit</option>
            <option value="withdraw">Withdraw</option>
          </select>
        </label>
        <label>
          Amount
          <input value={inputAmountVal} onChange={handleChangeAmount} type="number"/>
        </label>
        <button onClick={handleSubmitTransaction} type="submit">Submit</button>
      </form>
    </section>
  </div>
  )
}
export default Deposit