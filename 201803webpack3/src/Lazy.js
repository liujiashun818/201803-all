import React, { Component } from 'react';
export default class Lazy extends Component {
    state = {
        Mod: null
    }
    // componentWillMount() {
    //     this.props.load().then(m => {
    //         this.setState({ Mod: m.default });
    //     });
    // }
    componentDidMount() {
        this.props.load().then(m => {
            this.setState({ Mod: m.default });
        });
    }
    render() {
        let Mod = this.state.Mod;// About
        return Mod ? <Mod {...this.props} /> : null;
    }
}