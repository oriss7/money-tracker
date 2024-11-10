import './App.css';
import{useEffect, useState} from "react"

function App() {
  const [price,setPrice] = useState('');
  const [datetime,setDatetime] = useState('');
  const [description,setDescription] = useState('');
  const [transactions,setTransactions] = useState([]);

  useEffect(() => {
    getTransactions().then(setTransactions)
  }, [transactions])

  async function getTransactions(argument) {
    const response = await fetch('http://localhost:4040/api/transactions')
    return await response.json()
  }

  function addNewTransaction(ev) {
    ev.preventDefault()
    const url = 'http://localhost:4040/api/transaction'

    fetch(url, {
      method: 'POST',
      headers: {'Content-type':'application/json'},
      body: JSON.stringify({price, description, datetime})
    }).then(response => {
      response.json().then(json =>{
        setPrice('')
        setDatetime('')
        setDescription('')
        console.log('result', json)
      }).catch(error => {
        console.error('Error:', error);
  });
    })
  }

  let balance = 0
  for(const transaction of transactions){
    balance = balance + transaction.price
  }

  balance = balance.toFixed(2)
  const fraction = balance.split('.')[1]
  balance = balance.split('.')[0]

  return (
    <main>
      <h1>${balance}<span>{fraction}</span></h1>
      <form onSubmit={addNewTransaction}>
        <div className="basic">
          <input type="text" 
                  value={price} 
                  onChange={ev => setPrice(ev.target.value)}
                  placeholder={'+200'}/>
          <input value={datetime} 
                  onChange={ev => setDatetime(ev.target.value)} 
                  type="datetime-local"/>
        </div>
        <div className="description">
          <input type="text" 
                  value={description}
                  onChange={ev => setDescription(ev.target.value)}
                  placeholder={'description'}/>
        </div>
        <button type="submit">Add new transaction</button>
      </form>
      <div className="transactions">
        {transactions.length > 0 && transactions.map(transaction =>(
          <div className="transaction" key={transaction._id}>
            <div className="left">
              <div className="price">{transaction.price}</div>
              <div className="description">{transaction.description}</div>
            </div>
            <div className="right">
              <div className={"price " +(transaction.price<0?'red':'green')}>
                {transaction.price}
              </div>
              <div className="time">{transaction.datetime}</div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

export default App;