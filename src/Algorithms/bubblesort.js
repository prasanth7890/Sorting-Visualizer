export function getBubbleSortAnimations(array) {
    const animations = [];
    const anims = bubbleSort(array, animations);
    return anims;
}

function bubbleSort(arr, animations){
    
    for(var i = 0; i < arr.length; i++){
      for(var j = 0; j < ( arr.length - i - 1 ); j++){
        // these are the values we are comparing; we push them once to change their color.
         animations.push([j, j+1]);
        // these are the values we are comparing; we push them a second time to revert their color.
         animations.push([j, j+1]);
        if(arr[j] > arr[j+1]){
           
        // if items were swapped then, we push the swapped index into the animation array
        animations.push([j+1, j]);
          var temp = arr[j]
          arr[j] = arr[j + 1]
          arr[j+1] = temp
        }
        else {
            animations.push([j, j+1]);
        }
      }
    }
    return animations;
   }
