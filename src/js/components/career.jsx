import React, {Component} from "react";
import List from "../components/list.jsx";

export default class Career extends Component {
  render() {
    return (
      <section className="career">
        <h2>Lists</h2>
        <List />
      </section>
    );
  }
}