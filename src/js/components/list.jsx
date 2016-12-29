import React from "react";
import request from "superagent";

export default class List extends React.Component {
  constructor() {
    super();
    this.state = ({
      lists: []
    });
  }

  componentDidMount() {
    this.serverRequest =
      request.get("//codepen.io/jobs.json")
      .end( (err, res) => {
        const json = JSON.parse(res.text);
        this.setState({
          lists: json.jobs
        });
      });
  }

  componentWillUnmount() {
    this.serverRequest.abort();
  }

  render() {
    return (
      <ul>
        {this.state.lists.map(list => {
          return (
            <li key={list.url} className="list">
              {list.company_name} - {list.term} - 
              <a href={list.url}>{list.title}</a>
            </li>
          );
        })}
      </ul>
    );
  }
}