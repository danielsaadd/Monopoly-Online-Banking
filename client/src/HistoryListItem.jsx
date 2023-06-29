import React, {useState} from "react";
import axios from "axios"



const HistoryListItem = ({statementItem}) => {
  console.log("🚀 ~ file: HistoryListItem.jsx:7 ~ HistoryListItem ~ statementItem:", statementItem)
  return (
    <li className="li-box">
      <div className="inline-li">
        {statementItem.money_from}
      </div>
      <div className={statementItem.deposit ? 'green-money inline-li' : "inline-li"}>
        {statementItem.transaction_amount}
      </div>
    </li>
  )
}
export default HistoryListItem;
