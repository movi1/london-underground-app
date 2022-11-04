
import './App.css';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Form from 'react-bootstrap/Form';

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

const TrainLineFunction = (props) => {
  console.log(props)
}

const StationsFunction = (props) => {
  console.log(props)
  props.map(station => {
    console.log(station.name)
    console.log(station)
    console.log(station.lines)

    station.lines.forEach(line => {
      console.log(line)
    });
  });
}

StationsFunction(stations)

function DepartureDropdown(lines) {
  return (
    <Form.Select aria-label="Select your Departure Station"  name="departure-stations-select">

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
const handleSubmit = (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  // if (form.checkValidity() === false) {
 
  //   event.stopPropagation();
  // }

  //getting the stations name from the form select with the name of stations-select
  var departureStation = form["departure-stations-select"].value
  console.log(departureStation)
  console.log(form["arrive-stations-select"].value)

  // setValidated(true);
};


function App() {

  // TrainLineFunction(lines)
  // StationsFunction(stations)
  return (
    <>
      <Form onSubmit={handleSubmit}>
        <DepartureDropdown />
        <ArriveDropdown />
        <Button type="submit" variant="primary" >Check Route</Button>{' '}
      </Form>

    </>
    //   <DropdownButton id="dropdown-basic-button" title="Dropdown button">
    //   <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
    //   <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
    //   <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
    // </DropdownButton>



  );
}

export default App;
