import React, {useState, useEffect} from "react";
import axios from "axios"
import HistoryListItem from "./HistoryListItem.jsx"



const Accounts = ({statementHistory, getStatementHistoryReq, findTotalAccountBalance, accountBalance, getGroupReq, getCurrCustomerInfoReq, groupName, username, setSeePage}) => {
  useEffect(() => {
    getCurrCustomerInfoReq(groupName, username)
    getGroupReq(groupName)
  }, [])



  // useEffect(() => {
  //   getStatementHistoryReq();
  // }, []);

  // useEffect(() => {
  //   findTotalAccountBalance();
  // }, [statementHistory]);

  console.log('ballllllance', accountBalance)


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
      <div className="flex-container">
        <h3>Welcome {username}</h3>
        <button>Create Another Checking Account</button>
      </div>
      <ul onClick={() => setSeePage('AccountStatement')}>
        <li className="li-box">
          <div className="inline-li">
            CHECKING
          </div>
          <div className="inline-li">
            ${accountBalance}
          </div>
        </li>
      </ul>
    </section>
  </div>
  )
}
export default Accounts;