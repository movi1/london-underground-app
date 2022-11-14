import Form from 'react-bootstrap/Form';

function ArriveDropdown(props) {

  const { setArrival, stations } = props;

  const handleChange = event => {
    console.log(event.target.value);
    setArrival(event.target.value);
  };


  return (
    <>
      <Form.Select  aria-label="Select your Destination Station" name="arrive-stations-select" onChange={handleChange}>

        <option>Select your Destination Station</option>
        {
          stations.map((station, i) => {
            return (
              <option value={station.name} key={i} href={'#/ + station.name'}>{station.name}</option>
            )
          })
        };
      </Form.Select>
    </>


  );
}

export default ArriveDropdown;