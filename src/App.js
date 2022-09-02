import React, {useEffect, useState} from 'react';
import { getRewardPerTransaction, useFetch } from './utils';

import './App.scss';

const getSum = (arr, field) => arr.reduce((acc, cur) => acc + getRewardPerTransaction(cur[field]), 0 );

function App() {
  const { response } = useFetch('test');
  const [customersData, updateCustomersData] = useState([]);
  const [selectedCustomer, updateSelectedCustomer] = useState(undefined);

  useEffect(() => {
    updateCustomersData(response);
  }, [ response ])

  console.log(customersData);

  return (
    <div className="app">
      <div className="app__side-navigation">
        <div className="side-navigation__header">
          Customers
        </div>
        <div className="side-navigation__body">
          { customersData?.map(customer => (
            <div className={`side-navigation__customer ${customer?.id === selectedCustomer?.id ? 'selected' : ''}`} key={customer.id} onClick={() => updateSelectedCustomer(customer)}>
              {customer?.first_name} {customer?.last_name}
            </div>)
          )}
        </div>
      </div>
      <div className="app__main">
        { selectedCustomer ? (
          <>
            <div className="main__customer-summary">
              <h3>Name: {selectedCustomer?.first_name} {selectedCustomer?.last_name}</h3>
              <h3>Email: {selectedCustomer?.email}</h3>
            </div>
            <div className="main__transactions-rewards">
              <table>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Amount Spent</th>
                    <th>Points</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedCustomer?.transactions?.map(transaction => {
                    return (
                      <tr key={transaction.id}>
                        <td>{transaction.date}</td>
                        <td>{transaction.transaction}</td>
                        <td>{getRewardPerTransaction(transaction.transaction)}</td>
                      </tr>
                    )
                  })}
                </tbody>
                <tfoot>
                  <tr>
                    <td></td>
                    <td>Total Rewards</td>
                    <td>{getSum(selectedCustomer?.transactions, 'transaction')}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </>
        ) : <div>Please select a customer</div> }

      </div>
    </div>
  );
}

export default App;
