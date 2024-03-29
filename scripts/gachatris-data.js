
const kickData = {
	right: [
  [[0, 0], [-1, 0], [-1, -1], [0, 2], [-1, 2]],
  [[0, 0], [1, 0], [1, 1], [0, -2], [1, -2]],
  [[0, 0], [1, 0], [1, -1], [0, 2], [1, 2]],
  [[0, 0], [-1, 0], [-1, 1], [0, -2], [-1, -2]]],
  left: [
  [[0, 0], [1, 0], [1, -1], [0, 2], [1, 2]],
  [[0, 0], [1, 0], [1, 1], [0, -2], [1, -2]],
  [[0, 0], [-1, 0], [-1, -1], [0, 2], [-1, 2]],
  [[0, 0], [-1, 0], [-1, 1], [0, -2], [-1, -2]]],
  double: [
  [[0, 0], [1, 0], [2, 0], [1, 1], [2, 1], [-1, 0], [-2, 0], [-1, 1], [-2, 1], [0, -1], [3, 0], [-3, 0], [0, 0]],
  [[0, 0], [0, 1], [0, 2], [-1, 1], [-1, 2], [0, -1], [0, -2], [-1, -1], [-1, -2], [1, 0], [0, 3], [0, -3], [0, 0]],
  [[0, 0], [-1, 0], [-2, 0], [-1, -1], [-2, -1], [1, 0], [2, 0], [1, -1], [2, -1], [0, 1], [-3, 0], [3, 0], [0, 0]],
  [[0, 0], [0, 1], [0, 2], [1, 1], [1, 2], [0, -1], [0, -2], [1, -1], [1, -2], [-1, 0], [0, 3], [0, -3], [0, 0]]],
}
const kickDataI = {
	right: [
  [[0, 0], [-2, 0], [1, 0], [-2, 1], [1, -2]],
  [[0, 0], [-1, 0], [2, 0], [-1, -2], [2, 1]],
  [[0, 0], [2, 0], [-1, 0], [2, -1], [-1, 2]],
  [[0, 0], [1, 0], [-2, 0], [1, 2], [-2, -1]]],
  left: [
  [[0, 0], [-1, 0], [2, 0], [-1, -2], [2, 1]],
  [[0, 0], [2, 0], [-1, 0], [2, -1], [-1, 2]],
  [[0, 0], [1, 0], [-2, 0], [1, 2], [-2, -1]],
  [[0, 0], [-2, 0], [1, 0], [-2, 1], [1, -2]]],
  double: [
  [[0, 0], [-1, 0], [-2, 0], [1, 0], [2, 0], [0, 1], [0, 0]],
  [[0, 0], [0, 1], [0, 2], [0, -1], [0, -2], [-1, 0], [0, 0]],
  [[0, 0], [1, 0], [2, 0], [-1, 0], [-2, 0], [0, -1], [0, 0]],
  [[0, 0], [0, 1], [0, 2], [0, -1], [0, -2], [1, 0], [0, 0]]],

}

var SpinCheck = [
	{
	highX: [[1, 2, 2, 1], [1, 3, 1, 3], [1, 2, 2, 1], [0, 2, 0, 2]],
	highY: [[0, 2, 0, 2], [1, 2, 2, 1], [1, 3, 1, 3], [1, 2, 2, 1]],
	lowX: [[-1, 4, -1, 4], [2, 2, 2, 2], [-1, 4, -1, 4], [1, 1, 1, 1]],
	lowY: [[1, 1, 1, 1], [-1, 4, -1, 4], [2, 2, 2, 2], [-1, 4, -1, 4]]
},
{
	highX: [[1, 2], [2, 2], [1, 0], [0, 0]],
	highY: [[0, 0], [1, 2], [2, 2], [1, 0]],
	lowX: [[0, 2], [0, 0], [2, 0], [2, 2]],
	lowY: [[2, 2], [0, 2], [0, 0], [2, 0]]
},
{
	highX: [[1, 0], [2, 2], [1, 2], [0, 0]],
	highY: [[0, 0], [1, 0], [2, 2], [1, 2]],
	lowX: [[2, 0], [0, 0], [0, 2], [2, 2]],
	lowY: [[2, 2], [2, 0], [0, 0], [0, 3]]
},
{
	highX: [[0, 0], [0, 0], [0, 0], [0, 0]],
		highY: [[0, 0], [0, 0], [0, 0], [0, 0]],
		lowX: [[0, 0], [0, 0], [0, 0], [0, 0]],
		lowY: [[0, 0], [0, 0], [0, 0], [0, 0]]
},
{
	highX: [[0, 2], [1, 2], [2, 0], [1, 0]],
	highY: [[0, 1], [2, 0], [2, 1], [0, 2]],
	lowX: [[0, -1], [1, 2], [-1, 3], [1, 0]],
	lowY: [[0, 1], [-1, 3], [2, 1], [3, -1]]
},
{
	highX: [[0, 2], [2, 2], [0, 2], [0, 0]],
	highY: [[0, 0], [0, 2], [2, 2], [0, 2]],
	lowX: [[0, 2], [0, 0], [0, 2], [2, 2]],
	lowY: [[2, 2], [0, 2], [0, 0], [0, 2]]
},
{
	highX: [[2, 0], [2, 1], [0, 2], [0, 1]],
	highY: [[0, 1], [2, 0], [2, 1], [0, 2]],
	lowX: [[-1, 3], [2, 1], [3, -1], [0, 1]],
	lowY: [[0, 1], [-1, 3], [2, 1], [3, -1]]
},
]
var pieces = [
	{
		index: 0,
		x: 3,
		y: 0,
		spin: SpinCheck[0],
		kickData: kickDataI,
		tetro: [
    [ 0, 1, 0, 0],
    [ 0, 1, 0, 0],
    [ 0, 1, 0, 0],
    [ 0, 1, 0, 0],
    ],
},
	{
		index: 1,
		x: 3,
		y: 0,
		kickData: kickData,
		spin: SpinCheck[1],
		tetro: [
  [2, 2, 0],
  [0, 2, 0],
  [0, 2, 0]],
},
	{
		index: 2,
		x: 3,
		y: 0,
		spin: SpinCheck[2],
		kickData: kickData,
		tetro: [
  [0, 3, 0],
  [0, 3, 0],
  [3, 3, 0]],
},
	{
		index: 3,
		x: 4,
		y: 0,
		kickData: kickData,
		tetro: [
  [4, 4],
  [4, 4]
  ],
},
	{
		index: 4,
		x: 3,
		y: 0,
		spin: SpinCheck[4],
		kickData: kickData,
		tetro: [
		[0, 5, 0],
		[5, 5, 0],
		[5, 0, 0]],
},
	{
		index: 5,
		x: 3,
		y: 0,
		spin: SpinCheck[5],
		kickData: kickData,
		tetro: [
			[0, 6, 0],
			[6, 6, 0],
			[0, 6, 0]],
},
	{
		index: 6,
		x: 3,
		y: 0,
		spin: SpinCheck[6],
		kickData: kickData,
		tetro: [
		[7, 0, 0], 
		[7, 7, 0],
		[0, 7, 0]],
}
]

const finesseData = [
  [
    [1, 2, 1, 0, 1, 2, 1],
    [2, 2, 2, 2, 1, 1, 2, 2, 2, 2],
    [1, 2, 1, 0, 1, 2, 1],
    [2, 2, 2, 2, 1, 1, 2, 2, 2, 2],
  ],
  [
    [1, 2, 1, 0, 1, 2, 2, 1],
    [2, 2, 3, 2, 1, 2, 3, 3, 2],
    [2, 3, 2, 1, 2, 3, 3, 2],
    [2, 3, 2, 1, 2, 3, 3, 2, 2],
  ],
  [
    [1, 2, 1, 0, 1, 2, 2, 1],
    [2, 2, 3, 2, 1, 2, 3, 3, 2],
    [2, 3, 2, 1, 2, 3, 3, 2],
    [2, 3, 2, 1, 2, 3, 3, 2, 2],
  ],
  [
    [1, 2, 2, 1, 0, 1, 2, 2, 1],
    [1, 2, 2, 1, 0, 1, 2, 2, 1],
    [1, 2, 2, 1, 0, 1, 2, 2, 1],
    [1, 2, 2, 1, 0, 1, 2, 2, 1],
  ],
  [
    [1, 2, 1, 0, 1, 2, 2, 1],
    [2, 2, 2, 1, 1, 2, 3, 2, 2],
    [1, 2, 1, 0, 1, 2, 2, 1],
    [2, 2, 2, 1, 1, 2, 3, 2, 2],
  ],
  [
    [1, 2, 1, 0, 1, 2, 2, 1],
    [2, 2, 3, 2, 1, 2, 3, 3, 2],
    [2, 3, 2, 1, 2, 3, 3, 2],
    [2, 3, 2, 1, 2, 3, 3, 2, 2],
  ],
  [
    [1, 2, 1, 0, 1, 2, 2, 1],
    [2, 2, 2, 1, 1, 2, 3, 2, 2],
    [1, 2, 1, 0, 1, 2, 2, 1],
    [2, 2, 2, 1, 1, 2, 3, 2, 2],
  ],
];
