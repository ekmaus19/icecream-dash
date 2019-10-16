import React, { Component } from 'react';
import {Card, Button, ListGroup,DropdownButton, Dropdown} from 'react-bootstrap';
import axios from 'axios';
// var importedData =  "C:/Users/ekrav/desktop/codingChallenges/ice-dash/src/components/data/myjsonfile.json";

class SubmitCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nameVal: '',
      flavorVal: 'vanilla',
      lickVal: '',
      roomTempVal: '',
      iceTempVal: '',
      dateVal: '',
    };

    this.handleChangeNameVal = this.handleChangeNameVal.bind(this);
    this.handleChangeflavorVal = this.handleChangeflavorVal.bind(this);
    this.handleChangelickVal = this.handleChangelickVal.bind(this);
    this.handleChangeroomTempVal = this.handleChangeroomTempVal.bind(this);
    this.handleChangeroomiceTempVal = this.handleChangeroomiceTempVal.bind(this);
    this.handleChangeDateVal = this.handleChangeDateVal.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    // this.handleSubmit = this.handleSubmit.bind(this);
  }

// CHANGE HANDLERS //-----------------------------------------------------------
  handleChangeNameVal(event) {
    this.setState({nameVal: event.target.value});
  }
  handleChangeDateVal(event) {
    this.setState({dateVal: event.target.value});
  }
  handleChangeflavorVal(event) {
    this.setState({flavorVal: event.target ? event.target.value : event});
  }
  handleChangelickVal(event) {
    const lickVal = (event.target.validity.valid) ? event.target.value : this.state.lickVal
    this.setState({lickVal});
  }
  handleChangeroomTempVal(event) {
    const roomTempVal = (event.target.validity.valid) ? event.target.value : this.state.roomTempVal
    this.setState({roomTempVal});
  }
  handleChangeroomiceTempVal(event) {
    const iceTempVal = (event.target.validity.valid) ? event.target.value : this.state.iceTempVal
    this.setState({iceTempVal});
  }



// SEND FORM DATA TO BACKEND ---------------------------------------------------
onSubmit = (e) => {
  e.preventDefault();
  const { nameVal,flavorVal,lickVal,roomTempVal,iceTempVal, dateVal } = this.state
  const cardEntry = {
    nameVal,dateVal, flavorVal,lickVal,roomTempVal,iceTempVal
  }
  axios.post('http://localhost:9000/testAPI/api/formDataReceive', cardEntry)
      .then(() => console.log('Entry Created'))
      .catch(err => {
        console.error(err);
      });
  this.props.barChartUpdate()
}
// ////////////////////////////////////////////////////////////////////////////


// FORM RENDERING --------------------------------------------------------------
  render() {
    return (
      <Card style= {{
            background:"white",
            borderRadius: 25,
            padding: "10px",
            margin: "15px",
            outline: 0

        }}>
        <Card.Body style= {{
              background:"white",
              borderRadius: 25,
              padding: "10px",
              margin: "15px",
              outline: 0

          }}>
          <h2>Progress Tracker</h2>
          <Card.Text>
            <ListGroup variant="flush" style={{
              background:"white", borderRadius: 25, display: 'flex', justifyContent: 'center',
            }} >
            <ListGroup.Item style={{background:"white"}}></ListGroup.Item>
            <Card.Subtitle style = {{padding:"10px",background:"white"}}>Your info</Card.Subtitle>
              <ListGroup.Item style={{background:"white"}}>
              Name:
              <input type="text" value={this.state.nameVal} onChange={this.handleChangeNameVal}/>
              Date:
              <input type="text" value={this.state.dateVal} onChange={this.handleChangeDateVal}/>
              </ListGroup.Item>

              <Card.Subtitle style = {{padding:"10px",background:"white"}}>The Good Stuff!</Card.Subtitle>
              <ListGroup.Item style={{background:"white"}}>
                  <DropdownButton
                    id="dropdown-basic-button"
                    title="Flavor"
                    onSelect={this.handleChangeflavorVal} style={{
                      display: 'flex', justifyContent: 'center',
                      marginBottom: "7px", background:"white"
                    }}
                   >
                    <Dropdown.Item eventKey="strawberry">Strawberry</Dropdown.Item>
                    <Dropdown.Item eventKey="chocolate">Chocolate</Dropdown.Item>
                    <Dropdown.Item eventKey="vanilla">Vanilla</Dropdown.Item>
                    <Dropdown.Item eventKey="misc">Miscellaneous</Dropdown.Item>
                  </DropdownButton>
                  <label>
                    Lick Number:
                    <input type="text" pattern="[0-9]*" value={this.state.lickVal} onChange={this.handleChangelickVal} />
                  </label>

              <label>
                Room Temperature:
                <input type="text" pattern="[0-9]*" value={this.state.roomTempVal} onChange={this.handleChangeroomTempVal} />
              </label>
              <label>
              Ice Cream Temperature:
              <input type="text" pattern="[0-9]*" value={this.state.iceTempVal} onChange={this.handleChangeroomiceTempVal} />
            </label>
              </ListGroup.Item>

              <ListGroup.Item style={{background:"white"}}>
                <form style ={{display: 'flex', justifyContent: 'center', margin: "5px"}}
                  method="post"
                  onSubmit={this.onSubmit}>
                  <Button type="submit" className="buttonCenter" style = {{
                    "background-color": "#8E1537",
                    "border-color": "#8E1537",
                  }}>
                    SUBMIT</Button>
                </form>
              </ListGroup.Item>
            </ListGroup>
          </Card.Text>
        </Card.Body>

      </Card>
    );
  }
}

export default SubmitCard;
