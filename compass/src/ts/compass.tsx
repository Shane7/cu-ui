/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */
import {client, restAPI} from 'camelot-unchained';
import {Promise} from 'es6-promise';
import * as React from 'react';
import vec2 from './vec2'

export interface CompassState {
  facing: number;
}

export interface CompassProps { }

class Compass extends React.Component<CompassProps, CompassState> {

  private updateSpeed: number = 100;

  constructor(props: CompassProps) {
    super(props);
  }

  angleToPercentage = (facing: number, angle: number): number => {
    if (angle >= facing) {
      var diff = angle - facing;
      return 50 - diff * 0.75;
    } else {
      var diff = facing - angle;
      var d2 = facing - 360 - angle;
      return Math.abs(d2) < diff ? 50 + d2 * 0.75 : 50 + diff * 0.75;
    }
  }

  updateClientFacing() {
    let facing = client.facing;
    if (this.state.facing != facing) {
      this.setState({ facing: facing })
    };
  }

  componentWillMount() {
    this.setState({ facing: 0 });
  }

  componentDidMount() {
    this.updateClientFacing();
    var callback = this;
    setInterval(() => {
      callback.updateClientFacing();
    }, this.updateSpeed);
  }

  position(facing: number, angle: number) {
    return { left: this.angleToPercentage(facing, angle) + '%' };
  }

  render() {
    let facing = this.state.facing;
    let enemy = 230;
    let friend = 20;

    return (
      <div className="compass">
        <div className="cardinal-direction">
          <h1 className="cardinal" style={this.position(facing, 90) }>N</h1>
          <h1 className="cardinal" style={this.position(facing, 0) }>E</h1>
          <h1 className="cardinal" style={this.position(facing, 180) }>S</h1>
          <h1 className="cardinal" style={this.position(facing, 270) }>W</h1>
        </div>
        <div className="bar"/>
      </div>
    );
  }
}

export default Compass
