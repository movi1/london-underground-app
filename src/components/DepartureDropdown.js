import Form from 'react-bootstrap/Form';

function DepartureDropdown(props) {

    const { setDeparture, stations } = props;


    const handleChange = event => {
        console.log(event.target.value);
        setDeparture(event.target.value);

    };

    // console.log(stations.stations)
    return (


        <>

            <Form.Select aria-label="Select your Departure Station" name="departure-stations-select" onChange={handleChange}>

                <option>Select your Departure Station</option>
                {
                    stations.map((station, i) => {
                       return(
                                              
                            <option value={station.name} key={i} href={'#/ + station.name'}>{station.name}</option>
                        )
                    })
                };
            </Form.Select>

        </>


    );

}
export default DepartureDropdown;