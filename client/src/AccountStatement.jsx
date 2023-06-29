import React, {useState, useEffect} from "react";
import axios from "axios"
import HistoryListItem from "./HistoryListItem.jsx"



const AccountStatement = ({getStatementHistoryReq, statementHistory, accountBalance, findTotalAccountBalance, setSeePage}) => {

  useEffect(() => {
    getStatementHistoryReq();
  }, []);

  useEffect(() => {
    findTotalAccountBalance();
  }, [statementHistory]);



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

    <section className="flex-container">
      <h3>Checking Balance</h3>
      <div>
        TOTAL AMOUNT ${accountBalance}
        {/* <p>Details</p> */}
      </div>
      <form>
        <input type="search"/>
        <ul>
          {statementHistory?.map((statementItem, index) => (
            <HistoryListItem statementItem={statementItem} key={index}/>
          ))}
        </ul>
      </form>
    </section>
  </div>
  )
}
export default AccountStatement;
