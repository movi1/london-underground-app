
import './App.css';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';

const stations = [{
  "name": "Highbury & Islington",
  "lines": ["Victoria"],
  "zones": [2]
},
{
  "name": "King's Cross St. Pancras",
  "lines": ["Metropolitan", "Northern", "Piccadilly", "Circle", "Victoria", "Hammersmith & City"],
  "zones": [1]
},
{
  "name": "Oxford Circus",
  "lines": ["Central", "Bakerloo", "Victoria"],
  "zones": [1]
},
{
  "name": "Debden",
  "lines": ["Central"],
  "zones": [6]
},
{
  "name": "Paddington",
  "lines": ["Hammersmith & City", "District", "Circle", "Bakerloo"],
  "zones": [1]
}]

const lines = {
  "Victoria": ["Oxford Circus", "King's Cross St. Pancras", "Highbury & Islington"],
  "Metropolitan": ["King's Cross St. Pancras"],
  "Northern": ["King's Cross St. Pancras"],
  "Piccadilly": ["King's Cross St. Pancras"],
  "Circle": ["Paddington", "King's Cross St. Pancras"],
  "Central": ["Oxford Circus"],
  "Bakerloo": ["Paddington", "Oxford Circus"],
  "Hammersmith & City": ["Paddington", "King's Cross St. Pancras"],
  "District": ["Paddington"]
}


function App() {

  const [departure, setDeparture] = useState("noStation");
  const [line, setLine] = useState("noLine");
  const [arrival, setArrival] = useState("noStation");

  const [departureStationClass, setDepartureStationClass] = useState("noStation");
  const [lineClass, setLineClass] = useState("noLine");
  const [arrivalStationClass, setArrivalStationClass] = useState("noStation");

  const TrainLineFunction = (props) => {
    // console.log(props)

  }

  const StationsFunction = (props) => {
    // console.log(props)
    props.map(station => {
      // console.log(station.name)
      // console.log(station)
      console.log(station.lines)

      station.lines.forEach(line => {
        // console.log(line)
      });
    });
  }

  StationsFunction(stations)

  function DepartureDropdown(lines) {
    return (
      <Form.Select aria-label="Select your Departure Station" name="departure-stations-select">

        <option>Select your Departure Station</option>
        {
          stations.map((station, i) => {
            return (
              <option value={station.name} key={i} href={'#/ + station.name'}>{station.name}</option>
            )
          })
        };
      </Form.Select>


    );
  }
  function ArriveDropdown() {
    return (
      <Form.Select aria-label="Select your Destination Station" name="arrive-stations-select">

        <option>Select your Destination Station</option>
        {
          stations.map((station, i) => {
            return (
              <option value={station.name} key={i} href={'#/ + station.name'}>{station.name}</option>
            )
          })
        };
      </Form.Select>


    );
  }

  //Takes an array as first input and items stations as second ([lineArray], station1, station2)
  function doesStationsExistOnSameLine(arr, ...items) {
    
    return items.every(i => arr.includes(i))
  }

  function doesStationsExistOnSameLine2(lines) {
    
    for(var key in lines){
      console.log(key); // alerts key
      console.log(lines[key]); //alerts key's value
    }
  }

  doesStationsExistOnSameLine2(lines)

  const handleSubmit = (event) => {
    event.preventDefault();



    const form = event.currentTarget;

    // Stations --------------------------------------------------------------------------------------------------------------------------------

    //getting the stations name from the form select with the name of stations-select
    let departureStation = form["departure-stations-select"].value;
    let arrivalStation = form["arrive-stations-select"].value;


    // set departure class for each station
    if (departureStation === "Highbury & Islington") {
      setDepartureStationClass("highburyIslington")
    }

    if (departureStation === "Oxford Circus") {
      setDepartureStationClass("oxford")

    }

    // set arrival class for each station
    if (arrivalStation === "Highbury & Islington") {
      setArrivalStationClass("highburyIslington")
    }

    if (arrivalStation === "Oxford Circus") {
      setArrivalStationClass("oxford")
    }

    // Lines --------------------------------------------------------------------------------------------------------------------------------

    const victoriaArray = lines.Victoria

    let stationsExist = doesStationsExistOnSameLine(victoriaArray, departureStation, arrivalStation)

    if (stationsExist === true) {

      // console.log('✅ all conditions are met');
      setLine("Victoria")
      setLineClass("victoria")
    } else {
      //if it is not true
      setLine("not exist")
      // console.log('⛔️ neither condition is met');
    }

    // console.log(victoriaArray)

    // console.log(doesDepartureStationExist);

    setDeparture(departureStation)
    setArrival(arrivalStation)


    // console.log(Object.keys(lines));
  };


  // TrainLineFunction(lines)
  // StationsFunction(stations)
  return (
    <>
      <Form

        onSubmit={handleSubmit}>
        <DepartureDropdown />
        <ArriveDropdown />
        <Button type="submit" variant="primary" >Check Route</Button>{' '}
      </Form>

      <svg width="100" height="100" className={departureStationClass}>
        <circle cx="50" cy="50" r="50" className='departureBox' />
        <text x="0" y="50" fontFamily="Verdana" fontSize="13" fill="white">{departure}</text>
      </svg>
      <svg height="400" width="400" >
        <line x1="400" y1="200" x2="0" y2="200" className={`${lineClass} line`} id='stationLine' />
        <text x="180" y="180" fontFamily="Verdana" fontSize="13" fill="black">{line}</text>
        Sorry, your browser does not support inline SVG.
      </svg>
      <svg width="100" height="100">
        <circle cx="50" cy="50" r="50" width="200" height="200" className={arrivalStationClass} />
        <text x="0" y="50" fontFamily="Verdana" fontSize="13" fill="white">{arrival}</text>
        Sorry, your browser does not support inline SVG.
      </svg>


      {/* <p>This is : {line}</p> */}


    </>
    //   <DropdownButton id="dropdown-basic-button" title="Dropdown button">
    //   <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
    //   <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
    //   <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
    // </DropdownButton>



  );
}

export default App;
