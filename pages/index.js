import Layout from '../components/MyLayout';
import { Chart } from "react-google-charts";
import moment from "moment";
import uuid from 'uuid/v1';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faTimes } from '@fortawesome/free-solid-svg-icons';

export default class Shiftalizer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      teamMembers: [

      ],
      form: {
        name: "",
        role: "",
        inTime: "",
        outTime: ""
      },
      error: {
        name: false,
        role: false,
        inTime: false,
        outTime: false
      }
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      ...this.state,
      form: {
        ...this.state.form,
        [name]: value
      }
    });
  }

  render() {
    let chart;
    if (this.state.teamMembers.length === 0) {
      chart = <div className="columns is-centered">
          <div className="column is-half">
              <img src="/static/no-data.svg" />
          </div>
        </div>
    } else {
      chart = <Chart
        width={'100%'}
        height={900}
        chartType="Timeline"
        loader={<div>Loading Chart</div>}
        data={[
          [
            {type: 'string', id: 'Role'},
            {type: 'string', id: 'Name'},
            {type: 'date', id: 'InTime'},
            {type: 'date', id: 'OutTime'}
          ],
          ...this.state.teamMembers.map((teamMember, index) => (
            [
              teamMember.role,
              teamMember.name,
              teamMember.inTime,
              teamMember.outTime
            ]
          ))
        ]}
        options={{
          backgroundColor: '#212121',
          colors: ['#FFA000', '#00ACC1', '#EC407A', '#e53935', '#42A5F5', '#FFB74D'],
          timeline: {
            rowLabelStyle: {
              color: '#EEEEEE'
            },
            colorByRowLabel: true,
          }
        }}
        rootProps={{ 'data-testid': '5' }}
      />
    }

    return (
      <Layout>
        <section className="section">
          <div className="container">
            <div className="columns">
              <div className="column">
                <h1 className="is-size-3">Add Team Member</h1>
                <div className="field">
                  <label className="label">Name</label>
                  <div className="control">
                    <input className={!this.state.error.name ? "input" : "input is-danger"} name="name" type="text" placeholder="e.g Cody" onChange={this.handleInputChange} value={this.state.form.name} />
                  </div>
                </div>
                <div className="field">
                  <label className="label">Role</label>
                  <div className="control">
                    <input className={!this.state.error.role ? "input" : "input is-danger"} name="role" type="text" placeholder="e.g. Shift Leader" onChange={this.handleInputChange} value={this.state.form.role} />
                  </div>
                </div>
                <div className="field">
                  <label className="label">In Time</label>
                  <div className="control">
                    <input className={!this.state.error.inTime ? "input" : "input is-danger"} name="inTime" type="time" onChange={this.handleInputChange} value={this.state.form.inTime} />
                  </div>
                </div>
                <div className="field">
                  <label className="label">Out TIme</label>
                  <div className="control">
                    <input className={!this.state.error.outTime ? "input" : "input is-danger"} name="outTime" type="time" onChange={this.handleInputChange} value={this.state.form.outTime} />
                  </div>
                </div>
                <div className="field">
                  <button className="button is-success" onClick={(event) => {
                    event.preventDefault();

                    if (this.state.form.name === "") {
                      this.setState({
                        ...this.state,
                        error: {
                          ...this.state.error,
                          name: true
                        }
                      })
                    } else if (this.state.form.role === "") {
                      this.setState({
                        ...this.state,
                        error: {
                          ...this.state.error,
                          role: true
                        }
                      })
                    } else if (!moment(this.state.form.inTime, 'hh:mm').isValid()) {
                      this.setState({
                        ...this.state,
                        error: {
                          ...this.state.error,
                          inTime: true
                        }
                      })
                    } else if (!moment(this.state.form.outTime, 'hh:mm').isValid()) {
                      this.setState({
                        ...this.state,
                        error: {
                          ...this.state.error,
                          outTime: true
                        }
                      })
                    } else {
                      this.setState({
                        ...this.state,
                        teamMembers: [
                          ...this.state.teamMembers,
                          {
                            id: uuid(),
                            name: this.state.form.name,
                            role: this.state.form.role,
                            inTime: moment(this.state.form.inTime, 'hh:mm'),
                            outTime: moment(this.state.form.outTime, 'hh:mm')
                          }
                        ],
                        error: {
                          name: false,
                          role: false,
                          inTime: false,
                          outTime: false
                        }
                      })
                    }
                  }}>Add Team Member</button>
                </div>
              </div>
              <div className="column">
                <h1 className="is-size-3">Team Members</h1>
                <table className="table">
                  <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Role</th>
                    <th>In Time</th>
                    <th>Out Time</th>
                    <th></th>
                  </tr>
                  </thead>
                  <tbody>
                  {this.state.teamMembers.map((teamMember, index) => (
                    <tr key={index}>
                      <th>{index + 1}</th>
                      <td>{teamMember.name}</td>
                      <td>{teamMember.role}</td>
                      <td>{teamMember.inTime.format('hh:mm a')}</td>
                      <td>{teamMember.outTime.format('hh:mm a')}</td>
                      <td>
                        <a className="button is-danger is-outlined" onClick={(event) => {
                          this.setState({
                            ...this.state,
                            teamMembers: this.state.teamMembers.filter((tm) => (
                              tm.id !== teamMember.id
                            ))
                          })
                        }}>
                          <span>Delete</span>
                          <span className="icon is-small">
                           <FontAwesomeIcon icon={faTimes} />
                          </span>
                        </a>
                      </td>
                    </tr>
                  ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/*Chart Component*/}
        <section className="section">
          <div className="container">
            {chart}
          </div>
        </section>

      </Layout>
    );
  }
}