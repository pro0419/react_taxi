import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Body from "../../../common/components/body/body.jsx";
import Spinner from "../../../admin/common/components/spinner"

import {fetchTownshipList, fetchTownshipDetails} from '../../actions/actions-township.js';
import {BursarPanelTiles} from './utils/bursar-panel-tiles.jsx'

class BursarPanelRoot extends React.Component {

  constructor(props) {
    super(props);
    window.scrollTo(0, 0)
  }

  render() {
    return (
      <div className="blue-body">
        <Body showHeader={true}>
          <div className="content-container">
            <div className="container">
                <BursarPanelTiles townshipCode={this.props.townshipCode}/>
            </div>
          </div>
        </Body>
      </div>
    );
  }
}

export default BursarPanelRoot;