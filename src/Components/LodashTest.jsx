import React from 'react';
import _ from 'lodash';

const firstArray = [0,1,2,3,4,5,6,7,8,9,10]
const chunkedArray = _.chunk(firstArray, 3)
const compactedArray = _.compact(firstArray)

export default function LodashTest (props) {
    
    console.log(compactedArray)
    
    return (
        <div></div>
    )
}