import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './MonthlyStatistics.css';
import { getMonthlyStatistics } from '../../store/actions/statisticsActions';

const MonthlyStatistics = () => {
  const stats = useSelector((state) => state.statisticsReducer);
  const dispatch = useDispatch();

  const [date, setDate] = useState('');

  useEffect(() => {
    if (date) {
      dispatch(getMonthlyStatistics({
        startDate: new Date(date).setDate(1),
        endDate: new Date(date).setDate(30),
      }));
    }
  }, [date]);

  const getTotalSum = () => {
    let sum = 0;

    stats.monthlyStats.forEach((stat) => {
      sum += stat.total;
    });

    return sum;
  };

  return (
    <>
      <div className="sellerStats-wrapper container ui">
        <center>
          <h1 className="ui dividing header">
            Seller Monthly Statistics
          </h1>

          <div className="date-container mt-3">
            <p>Select a date from month for getting the monthly sales data:</p>
            <div className="ui input">
              <input type="date" name="data" id="date" onChange={(e) => setDate(e.target.value)} />
            </div>
          </div>

          <div className="details-container mt-5 ui header">
            {
              stats.monthlyStats.length
                ? `Your Monthly Amount Earned: $${getTotalSum()}`
                : 'No Products sold!'
            }
          </div>

        </center>
      </div>
    </>
  );
};

export default MonthlyStatistics;
