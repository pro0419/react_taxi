import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {fetchData, editData, createData, resetLoading} from '../../../actions/actions-township-common'
import Body from '../../../../common/components/body/body'

class GenericPage extends React.Component {

  constructor(props) {
    super(props);
    window.scrollTo(0, 0);

    this.state = {
      rowData: null
    }

    this.handleSuccess = this.handleSuccess.bind(this);
    this.renderFormComponent = this.renderFormComponent.bind(this);
  }

  componentWillMount() {
    this.props.fetchData(this.props.ajaxURI);
  }

  componentDidUpdate() {
    if (!this.props.dataCreated.isLoading) {
      this.handleSuccess();
    }
  };

  handleSuccess(){
    this.props.resetLoading();
    this.props.fetchData(this.props.ajaxURI);
    $('#modal-success').openModal();
  }

  renderFormComponent() {
    if(this.props.dataFetched.data.meta !== undefined) {
      let fields = this.props.dataFetched.data.meta.schema.field;
      return this.props.formComponent(this, fields);
    } else {
      return this.props.formComponent(this);
    }
  }

  render() {
    return (
      <div className="blue-body marginless-row">
        <Body showHeader={true}>
          {this.props.listComponent(this)}
        </Body>

        {this.props.dataFetched.isLoading ? <div></div> : this.renderFormComponent()}

        <div id="modal-success" className="modal">
          <div className="modal-content">
            <h4>Success!</h4>
            <p>You've successfully sent the request!</p>
          </div>
          <div className="modal-footer">
            <button 
            href="#" 
            className=" modal-action modal-close waves-effect waves-green btn-flat">Close</button>
          </div>
        </div>

      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    dataFetched: state.dataFetched,
    dataCreated: state.dataCreated,
    dataEdited: state.dataEdited
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchData,
    createData,
    editData,
    resetLoading
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(GenericPage);
