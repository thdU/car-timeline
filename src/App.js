import logo from './logo.svg';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import React, { useState } from 'react';
import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import Timeline from './Timeline';

function App() {
  const [cars, setCars] = useState([{
    year: '',
    make: '',
    model: ''
  }]);

  const handleAddInput = () => {
    const nextCars = JSON.parse(JSON.stringify(cars));
    nextCars.push({
      year: '',
      make: '',
      model: ''
    });
    setCars(nextCars);
  }

  const handleChange = (event, field, index) => {
    const nextCars = JSON.parse(JSON.stringify(cars));
    nextCars[index][field] = event.target.value;
    setCars(nextCars);
  }

  const renderInputRows = () => {
    return cars.map((car, index) => {
      return (
        <div className='inputRow' key={`inputRow_${index}`}>
          <Form.Control className='marginRight yearInput' placeholder="Year" value={car.year} onChange={(event) => handleChange(event, 'year', index)} />
          <Form.Control className='marginRight makeInput' placeholder="Make" value={car.make} onChange={(event) => handleChange(event, 'make', index)} />
          <Form.Control placeholder="Model" value={car.model} onChange={(event) => handleChange(event, 'model', index)} />
        </div>
      );
    });
  }

  console.log(cars);

  return (
    <div className="appWrapper">
      <div className='header'>
        <div className='title'>Car Timeline Generator</div>
      </div>
      <div className='timelineWrapper'>
        <div className='inputSection'>
          {renderInputRows()}
          <Button className='addButton' onClick={handleAddInput}>Add</Button>
        </div>
        <Timeline />
      </div>
    </div>
  );
}

export default App;
