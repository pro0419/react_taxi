import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import Body from "../../../../../common/components/body/body.jsx"
import {fetchTownshipPermitRequests} from '../../../../actions/actions-township-panel.jsx'

import PermitTypes from './utils/permit-types.jsx'
import ParkingPermits from './utils/parking-permits.jsx'
import TownshipPermits from './utils/township-permits.jsx'
import LocationsRate from './utils/locations-rate.jsx'

import {Tabbordion, Panel} from 'react-tabbordion'

var classNames = {
  content: 'traditional-tabs-content',
  panel: 'traditional-tabs-panel',
  title: 'traditional-tabs-title'
}

export default class TownshipPanelPermits extends React.Component {

  constructor(props) {
    super(props);
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <div className="blue-body marginless-row">
        <Body showHeader={true}>
          <div style={{marginTop: 40}}>
            <div className="row marginless-row">
              <Tabbordion className="traditional-tab col s12 z-depth-2" classNames={classNames} initialIndex={0} name="tabs">
                <Panel title={<span>Township Permits</span>}>
                    <div className="row marginless-row" style={{marginTop: 40}}>
                      <TownshipPermits className="col s12" townshipCode={this.props.townshipCode} />
                    </div>
                </Panel>
                <Panel title={<span>Parking Permits</span>}>
                    <div className="row marginless-row" style={{marginTop: 40}}>
                      <ParkingPermits className="col s12" townshipCode={this.props.townshipCode} />
                    </div>
                </Panel>
                <Panel title={<span>Locations Permit Rate</span>}>
                    <div className="row marginless-row" style={{marginTop: 40}}>
                      <LocationsRate className="col s12" townshipCode={this.props.townshipCode} />
                    </div>
                </Panel>
                <Panel title={<span>Permit Types</span>}>
                  <div className="row marginless-row" style={{marginTop: 40}}>
                    <PermitTypes className="col s12" townshipCode={this.props.townshipCode} />
                  </div>  
                </Panel>
              </Tabbordion>
            </div>
          </div>
        </Body>
      </div>
    );
  }
}
