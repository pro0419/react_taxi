import React, {Component} from 'react';
import ReactTooltip from 'react-tooltip'

let animation = null;
class MapMarker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hover: false
    }
  }
  
  componentDidMount() {
    animation = "animated bounceIn";
  }

  render() {
    const defaultStyle = {
      width: this.props.width,
      height: this.props.height, 
    }
    const hoverStyle = {
      width: this.props.width,
      height: this.props.height, 
      transform: "scale(2,2)"
    }

    let currentStyle;
    if (this.state.hover) {
      currentStyle = hoverStyle;
      animation = null;
    } else {
      currentStyle = defaultStyle;
    }

    return (
      <div style={{width: this.props.width * 2, height: this.props.width * 2, left: "20%", top: "20%"}}>
        <ReactTooltip />
        <img 
          src={this.props.iconUrl}
          className={animation}
          style={currentStyle}
          data-tip={this.props.plateNo}
          onClick={() => this.props.handleCarClick()}
          onMouseEnter={() => this.setState({hover: true})}
          onMouseLeave={() => this.setState({hover: false})}
        >
        </img>

      </div>
    );
  }
}

export default MapMarker;

/*
import React, {Component} from 'react';
import ReactTooltip from 'react-tooltip'

class MapMarker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: this.props.height,
      width: this.props.width,
    }
  }

  render() {
    return (
      <div>
        <ReactTooltip />
        <img 
          src={this.props.iconUrl} 
          alt="Car Image" 
          style={{transformOrigin: "center center center"}}
          height={this.state.height} 
          width={this.state.width} 
          data-tip={this.props.plateNo}
          onClick={() => this.props.handleCarClick()}
          onMouseEnter={() => this.setState({height: this.props.height * 2, width: this.props.width * 2})}
          onMouseLeave={() => this.setState({height: this.props.height, width: this.props.width})}
        />
      </div>
    );
  }
}

export default MapMarker;
*/