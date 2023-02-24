export function getInsertionSortAnimations(array) {
    const animations = [];
    insertionSort(array, array.length, animations);
    return animations;
}

export function insertionSort(arr, n, animations)
{
	let i, key, j;
	for (i = 1; i < n; i++)
	{
		
		key = arr[i];
		j = i - 1;

		while (j >= 0 && arr[j] > key)
		{
			animations.push([j+1, j , 1]); // to change color to red
			animations.push([j+1, j, 2]); // to revert the color
			arr[j + 1] = arr[j]; // height has to be changed
			j = j - 1;
		}
		animations.push([j + 1, key, 'key', 1]); // to change color to red
		animations.push([j + 1, key, 'key', 2]); // to revert back original color
		arr[j + 1] = key; // height change
	}
}