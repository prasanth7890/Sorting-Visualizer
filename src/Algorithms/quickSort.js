export function getQuickSortAnimations(array) {
    const animations = [];
    quickSort(array,0, array.length - 1, animations);
    return animations;
}


function partition(array, start, end, animations) {
    var pivot = array[end];
    var i = (start - 1);
    // pivot is inserted at the starting of every function call
    animations.push(['pivot', end]);
    for(let j = start; j <= end-1; j++) {
        animations.push([j, end]); //to change color
        animations.push([j, end]); // to revert colors
        if (array[j] < pivot)
        {
            i++;
            animations.push([i, j, 'IN']); // swapping...
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
    }
    animations.push([i+1, end, 'PIVOT']); // swapping and color has to be changed..
    temp = array[i+1];
    array[i+1] = array[end];
    array[end] = temp;

    return i+1;
}


function quickSort(array, start, end, animations) {
    if(start < end) {
        var p = partition(array, start, end, animations);
        quickSort(array, start, p - 1, animations);
        quickSort(array, p + 1, end, animations);
    }
}




