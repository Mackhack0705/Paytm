import AppBar from '../components/AppBar'
import Balance from '../components/Balance'
import Users from '../components/Users'
import { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [amount, setAmount] = useState()

  useEffect(() => {
    axios.get('http://localhost:3000/api/v1/account/balance', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then((res) => {
      setAmount(res.data.balance)
    })
  })
  return (
    <div>
        <AppBar />
        <div className='m-8'>
          <Balance value={amount}/>
          <Users />
        </div>
    </div>
  )
}

export default Dashboard