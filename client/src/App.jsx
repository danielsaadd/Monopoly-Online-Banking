import React, {useState, useEffect} from "react";
import axios from "axios"
import EnterGroupForm from "./EnterGroupForm.jsx"
import CreateUserForm from "./CreateUserForm.jsx"
import Transfer from "./Transfer.jsx"
import Accounts from "./Accounts.jsx"
import Deposit from "./Deposit.jsx"
import AccountStatement from "./AccountStatement.jsx"




const App = () => {
  const [seePage, setSeePage] = useState('EnterGroupForm')
  const [groupName, setGroupName] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [cust_id, setCust_id] = useState('')
  const [statementHistory, setStatementHistory] = useState([])
  const [group, setGroup] = useState([])
  const [accountBalance, setAccountBalance] = useState(0);

  let handleGroupInputChange = function(e) {
    setGroupName(e.target.value)
  }
  let handleUsernameInputChange = function(e) {
    setUsername(e.target.value)
  }
  let handlePasswordInputChange = function(e) {
    setPassword(e.target.value)
  }

  let createAnAccountReq = function() {
    axios.post('/api/createAccount', {groupName, username, password})
    .then((response) => {
      console.log('createAnAccountReq', response.data)
    })
    .catch((error) => {
      console.log(error)
    });
  }

  let getCurrCustomerInfoReq = async function(groupName, username) {
    axios.get('/api/getCurrentCustomerInfo', {
      params: { groupName, username }
    })
    .then(res => {
      // console.log("getCurrCustomerInfoReq", res.data.customer_id);
      setCust_id(res.data.customer_id)
    })
    .catch(error => {
      console.log(error);
    });
  };


  let getStatementHistoryReq = function() {
    axios.get('/api/getStatementHistory', {
      params: { cust_id }
    })
      .then(res => {
        // console.log("getStatementHistoryReq", res.data)
        setStatementHistory(res.data)
      })
      .catch(error => {
        console.log(error)
      });
  }

  let getGroupReq = function() {
    axios.get('/api/getGroupReq', {
      params: { groupName }
    })
      .then(res => {
        console.log("getGroupReq", res.data)
        setGroup(res.data)
      })
      .catch(error => {
        console.log(error)
      });
  }

  let findTotalAccountBalance = function () {
    let amountOfMoneyIn = [];
    let amountOfMoneyOut = [];
    for (var i = 0; i < statementHistory.length; i++) {
      if (statementHistory[i].deposit === true) {
        amountOfMoneyIn.push(statementHistory[i].transaction_amount);
      } else {
        amountOfMoneyOut.push(statementHistory[i].transaction_amount);
      }
    }

    let add = 0;
    let subtract = 0;
    for (var i = 0; i < amountOfMoneyIn.length; i++) {
      add += amountOfMoneyIn[i];
    }
    for (var j = 0; j < amountOfMoneyOut.length; j++) {
      subtract += amountOfMoneyOut[j];
    }
    let total = add - subtract;
    setAccountBalance(total);
    console.log("Total:", total);
  };

  let renderWebpage = function() {
    if (seePage === 'EnterGroupForm') {
      return <EnterGroupForm
        handleGroupInputChange={handleGroupInputChange} groupName={groupName} setSeePage={setSeePage}
      />
      // return <Transfer
      //   group={group} username={username} setSeePage={setSeePage}
      // />
    } else if (seePage === 'CreateUserForm') {
      return <CreateUserForm
        createAnAccountReq={createAnAccountReq} handleUsernameInputChange={handleUsernameInputChange} username={username}
        handlePasswordInputChange={handlePasswordInputChange} password={password} setSeePage={setSeePage}
      />
    } else if (seePage === 'Accounts') {
      // getCurrCustomerInfoReq(groupName, username);
      return <Accounts
        getStatementHistoryReq={getStatementHistoryReq} findTotalAccountBalance={findTotalAccountBalance} statementHistory={statementHistory}
        accountBalance={accountBalance} getGroupReq={getGroupReq} getCurrCustomerInfoReq={getCurrCustomerInfoReq}
        username={username} groupName={groupName} setSeePage={setSeePage}
      />
    } else if (seePage === 'Transfer') {
      return <Transfer
        group={group} username={username} setSeePage={setSeePage}
      />
    } else if (seePage === 'Deposit') {
      // getCurrCustomerInfoReq(groupName, username);
      return <Deposit
        cust_id={cust_id} setSeePage={setSeePage}
      />
    } else if (seePage === 'AccountStatement') {
      return <AccountStatement
        getStatementHistoryReq={getStatementHistoryReq} statementHistory={statementHistory} accountBalance={accountBalance}
        findTotalAccountBalance={findTotalAccountBalance} setSeePage={setSeePage}
      />
    }
  }

  return (
    <div className={seePage === 'CreateUserForm' || seePage === 'EnterGroupForm' ? 'create-user-background' : ''}>
      <div className="head-photo">
        {seePage !== 'CreateUserForm' && seePage !== 'EnterGroupForm' && (
          <div className="header-img">
            <div >
              <h1>Monopoly Online Bank</h1>
            </div>
          </div>
        )}
      </div>
      {renderWebpage()}
    </div>
  )
}
export default App;

