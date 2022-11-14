
import './App.css';
import { Dropdown } from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Form from 'react-bootstrap/Form';
import { useState, useEffect } from 'react';
import DepartureDropdown from './components/DepartureDropdown';
import ArriveDropdown from './components/ArriveDropdown';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Sky from '../src/';

function App() {

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
  },
  {
    "name": "Aldgate",
    "lines": ["Metropolitan", "Circle"],
    "zones": [1]
  },
  {
    "name": "Baker Street",
    "lines": ["Metropolitan", "Circle", "Hammersmith & City", "Jubilee"],
    "zones": [1]
  },
  {
    "name": "Barbican",
    "lines": ["Metropolitan", "Circle", "Hammersmith & City"],
    "zones": [1]
  },
  {
    "name": "Angel",
    "lines": ["Northern"],
    "zones": [1]
  },
  {
    "name": "Archway",
    "lines": ["Northern"],
    "zones": [3]
  },
  {
    "name": "Bank",
    "lines": ["Central", "Northern", "Waterloo & City lines"],
    "zones": [1]
  },
  {
    "name": "Bond Street",
    "lines": ["Central", "Jubilee"],
    "zones": [1]
  },
  {
    "name": "Notting Hill Gate",
    "lines": ["Circle", "District", "Central"],
    "zones": [2]
  },
  {
    "name": "Waterloo",
    "lines": ["Jubelee", "Bakerloo", "Northern"],
    "zones": [1]
  }]

  const lines = {
    "Victoria": ["Oxford Circus", "King's Cross St. Pancras", "Highbury & Islington"],
    "Metropolitan": ["King's Cross St. Pancras", "Aldgate", "Baker Street", "Barbican"],
    "Northern": ["King's Cross St. Pancras", "Angel", "Archway", "Bank", "Waterloo"],
    "Piccadilly": ["King's Cross St. Pancras"],
    "Circle": ["Paddington", "King's Cross St. Pancras", "Notting Hill Gate", "Barbican", "Baker Street", "Aldgate"],
    "Central": ["Oxford Circus", "Bank", "Bond Street", "Notthing Hill Gate", "Debden"],
    "Bakerloo": ["Paddington", "Oxford Circus", "Waterloo"],
    "Hammersmith & City": ["Paddington", "King's Cross St. Pancras", "Barbican", "Baker Street"],
    "District": ["Notting Hill Gate", "Paddington"],
    "Waterloo & City lines": ["Waterloo", "Bank"],
    "Jubilee": ["Bond Street", "Baker Street", "Waterloo"]
  }

  const [departure, setDeparture] = useState("noStation");
  const [line, setLine] = useState("noLine");
  const [arrival, setArrival] = useState("noStation");
  const [departureStationClass, setDepartureStationClass] = useState("noStation");
  const [lineClass, setLineClass] = useState("noLine");
  const [arrivalStationClass, setArrivalStationClass] = useState("noStation");

  //Takes an array as first input and items stations as second ([lineArray], station1, station2)
  function existOnSameLine(arr, ...items) {

    return items.every(i => arr.includes(i))
  }

  // Updates/sets the state of the line if station route exists
  // Loop through the lines object that contains an array: {"nameOfLine": ["Station Name"]}
  // checks if both departure and arrival stations exist on current array
  // if they both exist, update state and show the direct line
  // else set the line as no direct line
  function getRouteLine(lines) {

    let stationCount = 0;

    for (var key in lines) {

      let stationsExist = existOnSameLine(lines[key], departure, arrival)

      if (stationsExist) {
        setLine(key)
        stationCount++


      }
      else if (stationCount === 0) {
        setLine("No route exists")
      }

    }

    if (stationCount > 0) {
      return true
    } else {
      return false
    }

  }

  useEffect(() => {

    const lineAllSpacesRemoved = line.replaceAll(' ', '');
    const lineNoSpecialCharactersOrSpaces = lineAllSpacesRemoved.replace(/[^a-zA-Z0-9 ]/g, '');

    setLineClass(lineNoSpecialCharactersOrSpaces + "Line") // Eg: VictoriaLine

    setDepartureStationClass(lineNoSpecialCharactersOrSpaces + "Station") // Eg: VictoriaStation
    setArrivalStationClass(lineNoSpecialCharactersOrSpaces + "Station") // eg: VictoriaLine
  });


  const handleSubmit = (event) => {
    event.preventDefault();

    getRouteLine(lines)

  };


  // TrainLineFunction(lines)
  // StationsFunction(stations)

  // var arr = []
  // stations.forEach(function(singleObject){
  //   Object.keys(lines).forEach(function(objectToMatch){
  //         if(objectToMatch.station?.includes(singleObject.key)){
  //             arr.push(singleObject.name);
  //             console.log(lines)
  //         }
  //     })
  // })

  return (
    <>
      <Container>

        <h1>London Underground 


        </h1>
        <img src={Sky} alt="Logo" />
        <Form

          onSubmit={handleSubmit}>
          <Row>
            <Col>
              <DepartureDropdown stations={stations} setDeparture={setDeparture} />
              <ArriveDropdown stations={stations} setArrival={setArrival} />
              <Button type="submit" variant="primary" >Check Route</Button>{' '}
            </Col>
          </Row>
        </Form>


        <Row>
          <Col>
            <svg width="100" height="100" className={departureStationClass}>
              <circle cx="50" cy="50" r="50" className='departureBox' />
              <text x="20" y="50" fontFamily="Johnston Sans" fontSize="13" fill="white">{departure}</text>
            </svg>



            <svg height="400" width="400" >
              <line x1="400" y1="200" x2="0" y2="200" className={`${lineClass} line`} id='stationLine' />
              <text x="180" y="180" fontFamily="Johnston Sans" fontSize="20" fill="black">{line}</text>
              Sorry, your browser does not support inline SVG.
            </svg>



            <svg width="100" height="100">
              <circle cx="50" cy="50" r="50" width="200" height="200" className={arrivalStationClass} />
              <text x="20" y="50" fontFamily="Johnston Sans" fontSize="13" fill="white">{arrival}</text>
              Sorry, your browser does not support inline SVG.
            </svg>



            <svg height="400" width="400" >
              <line x1="400" y1="200" x2="0" y2="200" className={`${lineClass} line`} id='stationLine2' />
              <text x="180" y="180" fontFamily="Johnston Sans" fontSize="20" fill="black">{line}</text>
              Sorry, your browser does not support inline SVG.
            </svg>




            <svg width="100" height="100">
              <circle cx="50" cy="50" r="50" width="200" height="200" className={arrivalStationClass} id='station2' />
              <text x="20" y="50" fontFamily="Johnston Sans" fontSize="13" fill="white">{arrival}</text>
              Sorry, your browser does not support inline SVG.
            </svg>
          </Col>

        </Row>

        {/* <p>This is : {line}</p> */}


      </Container>
    </>




  );
}

export default App;
