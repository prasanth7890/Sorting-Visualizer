import React from "react";
import "./SortingVisualizer.css";
import { Button } from "react-bootstrap";
import { getQuickSortAnimations } from "../Algorithms/quickSort";
import { getMergeSortAnimations } from "../Algorithms/mergesort";
import { getBubbleSortAnimations } from "../Algorithms/bubblesort";

// Change this value for the speed of the animations.
const ANIMATION_SPEED_MS = 10;

// Change this value for the number of bars (value) in the array.
const NUMBER_OF_ARRAY_BARS = 50;

// This is the main color of the array bars.
const PRIMARY_COLOR = "turquoise";

// This is the color of array bars that are being compared throughout the animations.
const SECONDARY_COLOR = "red";

// This is the color of array bars of pivot in quicksort
const PIVOT_COLOR = 'yellow';


export default class SortingVisualizer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      array: [],
    };
  }

  componentDidMount() {
    this.resetArray();
  }

  resetArray() {
    const array = [];
    for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
      array.push(randomIntFromInterval(5, 600));
    }
    this.setState({ array: array});
  }

  mergeSort() {
    const animations = getMergeSortAnimations(this.state.array);
    // console.log(animations);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName("array-bar");
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight}px`;
        }, i * ANIMATION_SPEED_MS);
      }
    }

  }

  quickSort() {
    const animations = getQuickSortAnimations(this.state.array);
    console.log(animations);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName("array-bar");
      if(animations[i].length === 3) {
        const [barOneIdx, barTwoIdx, p] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style; 
        if(p === 'PIVOT') {
           // swapping of the heights
          setTimeout(()=> {
            const temp = barOneStyle.height;
            barOneStyle.height = barTwoStyle.height;
            barTwoStyle.height = temp;
            // color change
            barOneStyle.backgroundColor = PRIMARY_COLOR;
            barTwoStyle.backgroundColor = PRIMARY_COLOR;
          }, i * ANIMATION_SPEED_MS);
        }
        else {
          setTimeout(()=> {
            const temp = barOneStyle.height;
            barOneStyle.height = barTwoStyle.height;
            barTwoStyle.height = temp;
          }, i * ANIMATION_SPEED_MS); 

        }
      }
      else {
        const [First,Second] = animations[i];
        if(First === 'pivot') {
          const barSecondStyle = arrayBars[Second].style;
          setTimeout(() => {
            barSecondStyle.backgroundColor = PIVOT_COLOR;
            barSecondStyle.innerHTML = "Prasanth";
          }, i * ANIMATION_SPEED_MS);
        }
        else {
          const barONESTYLE = arrayBars[First].style;
          const barSECONDSTYLE = arrayBars[Second].style;
          setTimeout(() => {
            var color = this.getColorChange(animations[i], animations[i+1]);
            barONESTYLE.backgroundColor = color;
            barSECONDSTYLE.backgroundColor = color;
          }, i * ANIMATION_SPEED_MS);
        }
      }
    }

  }

  getColorChange(one, two) {
    const [a, b] = one;
    const [c, d] = two;
      if((a === c) && (b===d)) {
        return SECONDARY_COLOR;
      }
      else return PRIMARY_COLOR;
  }

  heapSort() {}

  bubbleSort() {
    const animations = getBubbleSortAnimations(this.state.array);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName("array-bar");
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      } else {
        setTimeout(() => {
          const [barOneIdx, barTwoIdx] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          const barTwoStyle = arrayBars[barTwoIdx].style;
          if (barOneIdx > barTwoIdx) {
            // swapping of the heights
            const temp = barOneStyle.height;
            barOneStyle.height = barTwoStyle.height;
            barTwoStyle.height = temp;
          }
        }, i * ANIMATION_SPEED_MS);
      }
    }
    
  }

  render() {
    const { array } = this.state;
    return (
      <>
        <div className="array-container">
          {array.map((value, idx) => {
            let h = value + "px";
            return (
              <div className="array-bar" key={idx} style={{ height: h }}>
                &nbsp;
              </div>
            );
          })}
        </div>
        <Button size="sm" onClick={() => this.resetArray()}>
          Generate New Array
        </Button>
        &nbsp;&nbsp;&nbsp;
        <Button size="sm" onClick={() => this.mergeSort()}>
          Merge Sort
        </Button>
        <Button size="sm" onClick={() => this.heapSort()}>
          Heap Sort
        </Button>
        <Button size="sm" onClick={() => this.quickSort()}>
          Quick Sort
        </Button>
        <Button size="sm" onClick={() => this.bubbleSort()}>
          Bubble Sort
        </Button>
      </>
    );
  }
}

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
