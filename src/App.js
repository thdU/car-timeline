import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import React, { useState, useEffect } from 'react';
import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import Timeline from './Timeline';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function App() {
  const [cars, setCars] = useState([{
    year: '',
    make: '',
    model: '',
    desc: '',
    startDate: (new Date()).getTime(),
    endDate: (new Date()).getTime(),
  }]);

  useEffect(() => {
    const item = localStorage.getItem('cars');
    if (item) {
      const savedCars = JSON.parse(item);
      setCars(savedCars);
    }
  }, []);

  const updateCars = (nextList) => {
    localStorage.setItem('cars', JSON.stringify(nextList))
    setCars(nextList);
  }

  const handleAddInput = () => {
    const nextCars = JSON.parse(JSON.stringify(cars));
    nextCars.push({
      year: '',
      make: '',
      model: '',
      desc: '',
      startDate: (new Date()).getTime(),
      endDate: (new Date()).getTime(),
    });

    updateCars(nextCars);
  }

  const handleDeleteInput = (index) => {
    const nextCars = JSON.parse(JSON.stringify(cars));
    if (nextCars.length > 1) {
      nextCars.splice(index, 1);
      updateCars(nextCars);
    }
  }

  const handleChange = (event, field, index) => {
    const nextCars = JSON.parse(JSON.stringify(cars));
    nextCars[index][field] = event.target.value;
    updateCars(nextCars);
  }

  const handleDateChange = (value, field, index) => {
    const nextCars = JSON.parse(JSON.stringify(cars));
    nextCars[index][field] = value.getTime();
    updateCars(nextCars);
  }

  const renderInputRows = () => {
    return cars.map((car, index) => {
      return (
        <div className='inputRow' key={`inputRow_${index}`}>
          <div className='carModelRow'>
            <Form.Control className='marginRight yearInput' placeholder="Year" value={car.year} onChange={(event) => handleChange(event, 'year', index)} />
            <Form.Control className='marginRight makeInput' placeholder="Make" value={car.make} onChange={(event) => handleChange(event, 'make', index)} />
            <Form.Control className='modelInput' placeholder="Model" value={car.model} onChange={(event) => handleChange(event, 'model', index)} />
          </div>
          <Form inline={true} className='descInputRow'>
            <Form.Group controlId="formDesc" >
              <Form.Label className='otherInfoLabel'>Other info:</Form.Label>
              <Form.Control className='descInput' placeholder="color/transmission/fun fact/etc" value={car.desc} onChange={(event) => handleChange(event, 'desc', index)} />
            </Form.Group>
          </Form>
          <div className='datepickerRow'>
            <div>Buy Date: </div>
            <DatePicker
              className='dateSelect marginRight'
              selected={cars[index].startDate}
              onChange={date => handleDateChange(date, 'startDate', index)}
              dateFormat="MM/yyyy"
              showMonthYearPicker
            />
            <div>Sell Date: </div>
            <DatePicker
              className='dateSelect'
              selected={cars[index].endDate}
              onChange={date => handleDateChange(date, 'endDate', index)}
              dateFormat="MM/yyyy"
              showMonthYearPicker
            />
            <Button className='deleteButton' onClick={() => handleDeleteInput(index)}>Remove</Button>
          </div>
        </div>
      );
    });
  }

  return (
    <div className="appWrapper">
      <div className='header'>
        <div className='title'>Car Ownership Timeline</div>
      </div>
      <div className='bodyWrapper'>
        <div className='inputSection'>
          {renderInputRows()}
          <Button className='addButton' onClick={handleAddInput}>Add</Button>
        </div>
        <Timeline cars={cars} />
      </div>
    </div>
  );
}

export default App;
