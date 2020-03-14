import React, { Component } from "react";
import { connect } from "react-redux";
import { previousStep, nextStep } from "../../actions/wizActions";
class Wiz extends Component {
  state = {
    formStep: 0
  };

  render() {
    const renderProps = {
      navigateBack: this._navigateBack,
      navigateNext: this._navigateNext,
      formStep: this.props.wiz.formStep,
      renderPage: this._renderPage
    };
    return this.props.children(renderProps);
  }

  _navigateBack = () => {
    // this.setState(prevState => ({
    //   formStep: prevState.formStep - 1 < 0 ? prevState.formStep - 1 : 0
    // }));
    if (this.props.wiz.formStep - 1 <= 0) this.props.dispatch(previousStep());
  };

  _navigateNext = () => {
    // this.setState(prevState => ({
    //   formStep: prevState.formStep + 1
    // }));
    this.props.dispatch(nextStep());
  };

  _renderPage = formProps => {
    const formStep = this.props.wiz.formStep;

    const Page = this.props.pages[formStep];

    return (
      <Page
        {...formProps}
        navigateBack={this._navigateBack}
        navigateNext={this._navigateNext}
        formStep={formStep}
      />
    );
  };
}
function mapStateToProps(state) {
  return { wiz: state.wiz };
}

export default connect(mapStateToProps)(Wiz);
