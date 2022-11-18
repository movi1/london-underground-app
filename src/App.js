import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState, useEffect, } from 'react';
import DepartureDropdown from './components/DepartureDropdown';
import ArriveDropdown from './components/ArriveDropdown';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Sky from '../src/skyline.jpg';
import Lines from './data/lines';
import {Stations} from './data/stations';

function App() {

  const [departure, setDeparture] = useState("noStation");
  const [line, setLine] = useState("noLine");
  const [arrival, setArrival] = useState("noStation");
  const [departureStationClass, setDepartureStationClass] = useState("noStation");
  const [lineClass, setLineClass] = useState("noLine");
  const [arrivalStationClass, setArrivalStationClass] = useState("noStation");
  const [time, setTime] = useState('');
  const [cost, setCost] = useState('');
  const [lines, setlines] = useState(Lines);
  const [stations, setStations] = useState(Stations)

  // Updates/sets the state of the line if station route exists, loop through the lines object that contains an array: {"nameOfLine": ["Station Name"]}
  // if they both exist, update state and show the direct line, else set the line as no direct line
  function getRouteLine(lines) {

    let stationCount = 0;
    let stationsExistOnSameLine = null;

    for (var key in lines) {
      stationsExistOnSameLine = existOnSameLine(lines[key], departure, arrival);

      if (stationsExistOnSameLine) {
        setLine(key)
        stationCount++
      }
      else if (stationCount === 0) {
        setLine("No route exists")
      }
    }

  }

  //Takes an array as first input and items stations as second ([lineArray], station1, station2), checks if both departure and arrival stations exist on current array
  function existOnSameLine(arr, ...items) {
    return items.every(i => arr.includes(i))
  }

  const handleSubmit = (event) => {

    event.preventDefault();
    getRouteLine(lines)

  };


  // When the line state is updated, set the line class, departure class and arrival class for CSS
  useEffect(() => {
    const lineAllSpacesRemoved = line.replaceAll(' ', '');
    const lineNoSpecialCharactersOrSpaces = lineAllSpacesRemoved.replace(/[^a-zA-Z0-9 ]/g, '');

    setLineClass(lineNoSpecialCharactersOrSpaces + "Line") // Eg: VictoriaLine
    setDepartureStationClass(lineNoSpecialCharactersOrSpaces + "Station") // Eg: VictoriaStation
    setArrivalStationClass(lineNoSpecialCharactersOrSpaces + "Station") // eg: VictoriaLine


  }, [line]);

  function arraySearch(array, station) {

    for (var key = 0; key < array.length; key++)
      if (array[key] === station)
        return key;
    return false;

  }

  // the useEffect watch the state and if any update happened to those state it will run the code, runs on the first render And any time any dependency value changes

  useEffect(() => {

    if (line !== "noLine" && line !== "No route exists") {
      let currentLine = lines[line]
      let startingKey = arraySearch(currentLine, departure)
      let arrivalKey = arraySearch(currentLine, arrival)
      let journeyTime = 0;
      
      // nesting state
      if (startingKey > arrivalKey) {
        journeyTime = currentLine.slice(arrivalKey, startingKey);
      }
      else {
        journeyTime = currentLine.slice(startingKey, arrivalKey);
      }

      setCost(4.23)
      setTime(journeyTime.length * 4)
    }
    else {
      setTime(0)
      setCost(0)
    }

  }, [line, arrival, departure, lines]);

  return (
    <>
      <Container>

        <h1>London Underground</h1>
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
