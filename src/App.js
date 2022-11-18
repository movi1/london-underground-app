

import { Dropdown } from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Form from 'react-bootstrap/Form';
import { useState, useEffect, } from 'react';
import DepartureDropdown from './components/DepartureDropdown';
import ArriveDropdown from './components/ArriveDropdown';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Sky from '../src/skyline.jpg';

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



  const [departure, setDeparture] = useState("noStation");
  const [line, setLine] = useState("noLine");
  const [arrival, setArrival] = useState("noStation");
  const [departureStationClass, setDepartureStationClass] = useState("noStation");
  const [lineClass, setLineClass] = useState("noLine");
  const [arrivalStationClass, setArrivalStationClass] = useState("noStation");
  const [time, setTime] = useState('');
  const [cost, setCost] = useState('');
  const [lines, setLines] = useState({
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
  })

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


  // the useEffect watch the state and if any update happened to those state it will run the code
  useEffect(() => {
    //Runs on the first render
    //And any time any dependency value changes


    if (line !== "noLine" && line !== "No route exists") {
      let currentLine = lines[line]

      let startingKey = arraySearch(currentLine, departure)
      console.log(startingKey)
      let arrivalKey = arraySearch(currentLine, arrival)
      console.log(arrivalKey)

      let myTime = 0;
      // nesting state
      if (startingKey > arrivalKey) {
        myTime = currentLine.slice(arrivalKey, startingKey);
      }
      else {
        myTime = currentLine.slice(startingKey, arrivalKey);
      }


      console.log(currentLine.slice(startingKey, arrivalKey))
      setCost(4.23)
      setTime(myTime.length * 4)
      console.log(myTime)
      console.log(myTime.length)
      console.log(myTime.length * 4)

    }
    else {
      setTime(0)
      setCost(0)

    }


  }, [line, arrival, departure, lines]
  );




  const handleSubmit = (event) => {
    event.preventDefault();

    getRouteLine(lines)

  };


  function arraySearch(array, station) {

    for (var key = 0; key < array.length; key++)
      if (array[key] === station)
        return key;
    return false;

  }


  return (
    <>
      <Container>

        <h1>London Underground


        </h1>
        <img src={Sky} width="900px" height="300px" alt="Logo" />
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col>
              <DepartureDropdown stations={stations} setDeparture={setDeparture} />
              <ArriveDropdown stations={stations} setArrival={setArrival} />
              <Button variant="primary" className="btn" type="submit" >Check Route</Button>
              <div className='time'>Time travel is {time} minutes</div>
              <div className='cost'>The cost is {cost} £</div>

            </Col>
          </Row>
        </Form>

        <Row >

          <Col className='svg'>
            <svg width="100" height="100" className={departureStationClass} id="departure">
              <circle cx="50" cy="50" r="50" className='departureBox' />
              <text x="20" y="50" fontFamily='Alexandria' fontSize="13" fill="white">{departure}</text>
            </svg>



            <svg height="400" width="400" >
              <line x1="400" y1="200" x2="0" y2="200" className={`${lineClass} line`} id='stationLine' />
              <text x="180" y="180" fontFamily='Alexandria' fontSize="25" fill="black">{line}</text>
              Sorry, your browser does not support inline SVG.
            </svg>



            <svg width="100" height="100">
              <circle cx="50" cy="50" r="50" width="200" height="200" className={arrivalStationClass} id="arrival" />
              <text x="20" y="50" fontFamily='Alexandria' fontSize="13" fill="white">{arrival}</text>
              Sorry, your browser does not support inline SVG.
            </svg>
          </Col>


          {/* <svg height="400" width="400" >
              <line x1="400" y1="200" x2="0" y2="200" className={`${lineClass} line`} id='stationLine2' />
              <text x="180" y="180" fontFamily="Johnston Sans" fontSize="20" fill="black">{line}</text>
              Sorry, your browser does not support inline SVG.
            </svg>




            <svg width="100" height="100">
              <circle cx="50" cy="50" r="50" width="200" height="200" className={arrivalStationClass} id='station2' />
              <text x="20" y="50" fontFamily="Johnston Sans" fontSize="13" fill="white">{arrival}</text>
              Sorry, your browser does not support inline SVG.
            </svg>
         */}

        </Row>

        {/* <p>This is : {line}</p> */}


      </Container>
    </>




  );
}

export default App;
