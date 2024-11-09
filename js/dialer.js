export default {
	reachableKeys,
	countPaths,
	listAcyclicPaths
};


// ****************************


const nearbyKeys = [
	[4, 6],
	[6, 8],
	[7, 9],
	[4, 8],
	[3, 9, 0],
	[],
	[1, 7, 0],
	[2, 6],
	[1, 3],
	[2, 4]
]

// countPaths = memoize(countPaths)

function reachableKeys(startingDigit) {
	return nearbyKeys[startingDigit]
}

function countPaths(startingDigit, hopCount) {
	if (hopCount === 0) return 1
	let priorPathCounts = Array(10).fill(1)


	for (let hops = 0; hops < hopCount; hops++) {
		let pathCounts = Array(10).fill(0)

		for (let digit = 0; digit < 10; digit++) {
			for (let n of nearbyKeys[digit]) {
				pathCounts[digit] += priorPathCounts[n]
			}
		}
		priorPathCounts = pathCounts
	}

	return priorPathCounts[startingDigit]
}

function listAcyclicPaths(startingDigit) {
	let paths = []
	let nextHops = nearbyKeys[startingDigit]

	for (let nextHop of nextHops) {
		let path = [startingDigit, nextHop]
		followPath(path, paths)
	}

	return paths;
}

function followPath(path, paths) {
	let nextHops = nearbyKeys[path[path.length - 1]];
	let pathForwardFound = false

	for (let nextHop of nextHops) {
		if (!path.includes(nextHop)) {
			pathForwardFound = true;
			let nextPath = [...path, nextHop];
			followPath(nextPath, paths);
		}
	}

	if (!pathForwardFound) {
		paths.push(path)
	}
}


// function memoize(fn) {
// 	let cache = {}

// 	return function memoized(start, length) {
// 		let key = `${start}:${length}`
// 		if (!cache[key]) {
// 			cache[key] = fn(start, length)
// 		}

// 		return cache[key]
// 	}
// }