import React,{useState,useEffect} from 'react';
import axios from 'axios';
import springbootUrl from '../config/apiURL';

const CarList = () => {
    const [cars, setCars] = useState([]);

    useEffect(()=>{
    fetchCars();
  },[]);

  const fetchCars = async()=>{
      const result = await axios.get(`${springbootUrl}/cars`);
      setCars(result.data);
      console.log(result.data);
    }

  return <>
    <h3>Car List</h3>
    {
      cars.map ((car)=>{
        return <li>{car.brand} #{car.model}</li>
      })
    }
  </>
}

export default CarList;