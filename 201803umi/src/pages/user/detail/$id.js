import React, { Component } from 'react';
export default class User extends Component {
    render() {
        let id = this.props.match.params.id;
        return (
            <div>
                <p>ID:{id}</p>
                <p>姓名:{id}</p>
            </div>
        )
    }
}