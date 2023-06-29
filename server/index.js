require("dotenv").config();
const express = require("express");
const path = require("path");
const {pool} = require("./db.js");
const app = express();

app.use(express.static(path.join(__dirname, "../client/dist")));
app.use(express.json())

app.get('/api/getCurrentCustomerInfo', async (request, response) => {
  const { groupName, username } = request.query;

  try {
    const client = await pool.connect();

    const query = `
      SELECT customer_id
      FROM customer
      WHERE group_name = $1 AND username = $2;
    `;

    const result = await client.query(query, [groupName, username]);
    const customer = result.rows[0];
    // let customer = {"looooook_here": 0}

    client.release();

    if (customer) {
      response.status(200).json(customer);
    } else {
      response.status(404).json({ error: 'Customer not found' });
    }
  } catch (error) {
    response.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/getStatementHistory', async (request, response) => {
  try {
    const cust_id = request.query.cust_id;

    const client = await pool.connect();
    const result = await client.query(
      'SELECT * FROM checking_history WHERE customer_id = $1',
      [cust_id]
    );

    const statementHistory = result.rows;
    response.status(200).json(statementHistory);
    client.release();
  } catch (error) {
    console.log(error);
    response.status(500).send('Internal Server Error');
  }
});

app.get('/api/getGroupReq', async (request, response) => {
  try {
    const groupName = request.query.groupName;

    const client = await pool.connect();
    const result = await client.query(
      'SELECT customer_id, group_name, username FROM customer WHERE group_name = $1',
      [groupName]
    );

    const groupRes = result.rows;
    response.status(200).json(groupRes);
    client.release();
  } catch (error) {
    console.log(error);
    response.status(500).send('Internal Server Error');
  }
});

app.post('/api/createAccount', async (request, response) => {
  try {
    const { groupName, username, password } = request.body;

    const client = await pool.connect();

    const result = await client.query(
      'INSERT INTO customer (group_name, username, password, checking_amount, savings_amount) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [groupName, username, password, 0, 0]
    );

    client.release();

    console.log('Account created successfully.');

    response.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating account:', error);
    response.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/makeTransaction', async (request, response) => {
  try {
    console.log('Received POST: ' + JSON.stringify(request.body));

    const { selectTransactionValue, inputAmountVal, cust_id } = request.body;

    const client = await pool.connect();

    const insertQuery = `
      INSERT INTO checking_history (customer_id, deposit, transaction_amount, money_from)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;
    if (cust_id === ''|| inputAmountVal === '') {
      response.status(500).json({ error: 'Internal server error' });
    }
    const values = [parseInt(cust_id), selectTransactionValue === 'deposit', parseInt(inputAmountVal), ((selectTransactionValue === 'deposit') ? 'deposited' : 'withdrawn')];
    const result = await client.query(insertQuery, values);

    client.release();

    response.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating account:', error);
    response.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/sendMoney', async (request, response) => {
  try {
    console.log('send to Received POST: ' + JSON.stringify(request.body));

    const { selectUserValue, inputAmountTransferVal, username } = request.body;

    const client = await pool.connect();

    const insertQuery = `
      INSERT INTO checking_history (customer_id, deposit, transaction_amount, money_from)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;
    if (selectUserValue === ''|| inputAmountTransferVal === '') {
      response.status(500).json({ error: 'Internal server error' });
    }
    const values = [parseInt(selectUserValue),true , parseInt(inputAmountTransferVal), username];
    const result = await client.query(insertQuery, values);

    client.release();

    response.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating account:', error);
    response.status(500).json({ error: 'Internal server error' });
  }
});






app.listen(process.env.SERVERPORT);
console.log(`Listening at http://localhost:${process.env.SERVERPORT}`);


