import React, { Component } from 'react';
import {Card, CardGroup, Button, Container, Row, Col} from 'react-bootstrap';
import { FaIceCream, FaTemperatureLow } from 'react-icons/fa';
import { MdLocationCity } from 'react-icons/md';

import SubmitCard from './components/SubmitCard';
import './App.css';

import createPlotlyComponent from 'react-plotlyjs';
import Plotly from 'plotly.js/dist/plotly-cartesian';
const PlotlyComponent = createPlotlyComponent(Plotly);


class App extends Component {
  constructor(props) {
    super(props);
    this.barChartData = this.barChartData.bind(this);
    this.state = {
      apiResponse: "",
      dataBarChart: []
    };
  }

  callAPI() {
    fetch("http://localhost:9000/testAPI")
        .then(res => res.text())
        .then(res => this.setState({ apiResponse: res }))
  }

  groupBy = (xs, key) => {
      var test = xs.reduce(function(rv, x) {
        (rv[x[key]] = rv[x[key]] || []).push(x);
        return rv;
      }, {});
      var nAKey =[]
      var nAVal =[]
      var use = Object.keys(test).forEach(
        function(item){
          nAVal.push(test[item].length)
          nAKey.push(item)
        }
      )
      var data = [
        {
          x: nAKey,
          y: nAVal,
          type: 'bar',
          marker: {
            color: ["rgb(254, 218, 101)", "rgb(176, 223, 225)", "rgb(0, 131, 117)", "rgb(245, 218, 244)","rgb(244, 153, 185)" ]
          }
        }
      ];
      return data
    };

  barChartData() {
    this.callAPI()
    var obj =  JSON.parse(this.state.apiResponse, null, 2); //convert it back to json
    var newJson = obj.replace(/([a-zA-Z0-9]+?):/g, '"$1":');
    newJson = newJson.replace(/'/g, '"');
    var obj2 = JSON.parse(newJson);
    const grouped = this.groupBy(obj2, "Flavor")
    this.setState({
      dataBarChart: grouped
    })
  }

  /* SET UP FUNCTIONS  --------------------------------------------------------------------- */

  componentWillMount() {
    this.callAPI();
  }

  componentDidMount() {
    this.interval = setInterval(() => this.barChartData(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

// COMPONENT RENDER ////////////////////////////////////////////////////////////
  render() {
    return (
      <div style ={{width:"100%"}}>
        <Container style ={{width:"100%"}}>
{/* HEADING -------------------------------------------------------------------- */}
          <Row>
            <h1 className="heading">Freestyle Ice Cream Eating Dashboard</h1>
            <h2 style={{fontSize:"20pt", textAlign:"left"}}>A tool for those developing best strategies for the new event in the 2020 Olympics</h2>
          </Row>
{/* SUMBIT CARD  -------------------------------------------------------------- */}
          <Row>
            <Col sm={4} >
              <SubmitCard style={{position:"center"}} barChartUpdate={this.barChartData} />
            </Col>
{/* SAMPLE STATS CARD  --------------------------------------------------------- */}

            <Col sm={8} >
              <Card border="light" style= {{
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
                  <Card.Title style= {{background:"white"}}><h2>Your Statistics</h2></Card.Title>


                  <Card.Text style={{margin:"5px"}}>
                    <h5 className="subtitles" style={{display:"inline-block", marginRight:"10px"}}>Least Licks</h5>
                    <h6 style={{display:"inline-block"}}>May 6th (12 licks)</h6>
                  </Card.Text>
                  <Card.Text style={{margin:"5px"}}>
                    <h5  className="subtitles">Favorite Temperatures</h5>
                    <div className="choicesDiv">
                      <h5 className="subtitlesTwo" style={{display:"inline-block", marginRight:"10px"}}>Room</h5>
                      <h6 style={{display:"inline-block"}}>68&deg;F</h6>
                    </div>
                    <div className="choicesDiv">
                      <h5 className="subtitlesTwo" style={{display:"inline-block", marginRight:"10px"}}>Ice Cream</h5>
                      <h6 style={{display:"inline-block"}}>-46&deg;F</h6>
                    </div>
                    <h5 className="subtitles" style={{display:"inline-block", marginRight:"10px"}}>User Status</h5>
                    <h6 style={{display:"inline-block"}}>Brain Freeze </h6>
                    <h6 style={{display:"inline-block"}}>(Regular Updates, Low Lick #)</h6>

                  </Card.Text>
                  <Card.Subtitle style={{background:"white", margin: "10px"}}>
                    <h7 className="accentText">Track your progress to freeze out the competition!</h7>
                  </Card.Subtitle>
                </Card.Body>
              </Card>

{/* PLOTLY PLOT CARD  -------------------------------------------------------------- */}
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
                <Card.Title style= {{background:"white"}}><h2>Favorite Flavors</h2></Card.Title>
                <PlotlyComponent data={this.state.dataBarChart}/>
              </Card.Body>
            </Card>
            </Col>
          </Row>
{/* BOTTOM ROW CARDS  -------------------------------------------------------------- */}

          <Row>
            <Col sm>
            <CardGroup>
              <Card>
                <Card.Body style= {{
                      background:"white",
                      borderRadius: 25,
                      padding: "10px",
                      margin: "15px",
                      outline: 0

                  }}>
                  <Card.Title style={{background:"#FFFFFF"}} className="bottomRowTitle"><h2 >Top Lickers</h2></Card.Title>
                    <Card.Text style={{margin:"5px"}}>
                      <h5 className="subtitles" style={{display:"inline-block", marginRight:"10px"}}>Jonathan W.</h5>
                      <h6 style={{display:"inline-block"}}>5 licks to completion</h6>
                    </Card.Text>
                    <Card.Text style={{margin:"5px"}}>
                      <h5 className="subtitles" style={{display:"inline-block", marginRight:"10px"}}>Samantha Q.</h5>
                      <h6 style={{display:"inline-block"}}>6 licks to completion</h6>
                    </Card.Text>
                    <Card.Text style={{margin:"5px"}}>
                      <h5 className="subtitles" style={{display:"inline-block", marginRight:"10px"}}>Allonso F.</h5>
                      <h6 style={{display:"inline-block"}}>6.5 licks to completion</h6>
                    </Card.Text>
                </Card.Body>

              </Card>
              <Card>
                <Card.Body style= {{
                      background:"white",
                      borderRadius: 25,
                      padding: "10px",
                      margin: "15px",
                      outline: 0

                  }}>
                <Card.Title style={{background:"#FFFFFF"}}>
                  <h2 className="bottomRowTitle" style={{fontSize:"30pt"}}>
                  Top Performing
                  <FaIceCream size={35}/> / <MdLocationCity size={35}/>
                  </h2>
                </Card.Title>
                  <Card.Text style={{display: 'flex', justifyContent: 'center'}}>

                    <h1 className="subtitles" style={{fontSize:"30pt"}}>-34&deg;F & 54&deg;F</h1>
                  </Card.Text>

                </Card.Body >
              </Card>
              <Card>
                <Card.Body style= {{
                      background:"white",
                      borderRadius: 25,
                      padding: "10px",
                      margin: "15px",
                      outline: 0

                  }}>
                  <Card.Title style={{background:"#FFFFFF"}} className="bottomRowTitle"><h2>Longest Streak</h2></Card.Title>
                  <Card.Text style={{margin:"5px"}}>
                    <h2 className="subtitles" style={{fontSize:"25pt"}}>4 days</h2>
                    <h6 className="accentText" style={{fontSize:"14pt"}}>Remember, regular practice increases your stamina!</h6>
                  </Card.Text>

                </Card.Body>
              </Card>
            </CardGroup>
            </Col>

          </Row>
        </Container>

      </div>
    );
  }
}

export default App;
