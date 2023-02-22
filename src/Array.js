import React from "react";
import './Array.css'

class Array extends React.Component {
    constructor() {
        super();
        this.state={
            l : [1,2,3,4,5],
        };
    }
    
    getNew() {
        var l = []
        for (let index = 0; index < 5; index++) {
            const randomNum = Math.floor(Math.random() * 100) + 1;
            l.push(randomNum);
        }
        this.setState({l : l});
    }


    render() {
        const numBoxes = 5;
        const boxes = [];
        const arrayValues = this.state.l;

        for (let i = 0; i < numBoxes; i++) {
            boxes.push(
            <div key={i} className="square">
                <div className='random'>{arrayValues[i]}</div>
            </div>
            );
        }
      return (
        <div>
            <button onClick={()=>this.getNew()}>Generate New Array</button>
            {boxes}
        </div>
      )
    }
}

export default Array;