import React from 'react';
import Moment from 'react-moment';

export default function Lastseen(props) {
    return (
        <Moment fromNow ago>{props.time}</Moment>
    );
}