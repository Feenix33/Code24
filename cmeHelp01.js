// cmeHelper functions
// 01 - base to tell when changed 

    // log start time
function cmeLogTime(msg) {
    var now = new Date();
    console.log(
        msg + now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds(),
    );
}

const cmeHelpers=
{
  crayons8: ['#ee204d','#fce883','#1f75fe','#b5674d','#ff7538','#1cac78','#926eae','#232323'],
  crayons16:[
    '#ee204d','#fce883','#1f75fe','#b5674d','#ff7538','#1cac78','#926eae','#232323',
    '#co448f','#ff5349','#c5e384','#7366bd','#ffaacc','#ffb653','#199ebd','#ededed'],
  crayons24:[
    '#ee204d','#fce883','#1f75fe','#b5674d','#ff7538','#1cac78','#926eae','#232323',
    '#co448f','#ff5349','#c5e384','#7366bd','#ffaacc','#ffb653','#199ebd','#ededed',
    '#f75394','#fdd9b5','#1dacd6','#5d76cb','#fc2847','#f0e891','#2e5090','#95918c'],
  crayons32:[
    '#ee204d','#fce883','#1f75fe','#b5674d','#ff7538','#1cac78','#926eae','#232323',
    '#co448f','#ff5349','#c5e384','#7366bd','#ffaacc','#ffb653','#199ebd','#ededed',
    '#f75394','#fdd9b5','#1dacd6','#5d76cb','#fc2847','#f0e891','#2e5090','#95918c',
    '#bc6d69','#ffcfab','#90daeb','#b0b8c+','#fdbcb4','#faa76c','#cda4de','#dbd7d2' ],
  crayons48:[
    '#ee204d','#fce883','#1f75fe','#b5674d','#ff7538','#1cac78','#926eae','#232323',
    '#co448f','#ff5349','#c5e384','#7366bd','#ffaacc','#ffb653','#199ebd','#ededed',
    '#f75394','#fdd9b5','#1dacd6','#5d76cb','#fc2847','#f0e891','#2e5090','#95918c',
    '#bc6d69','#ffcfab','#90daeb','#b0b8c+','#fdbcb4','#faa76c','#cda4de','#dbd7d2',
    '#fcb4d5','#ea7e5d','#bab86c','#9d81ba','#ff9baa','#ffbd88','#a8e4a0','#a5694f',
    '#ef98aa','#fcd975','#9fe2bf','#d68a59','#cd4a4a','#eceabe','#9aceeb','#deaa88'],
  getRandomColor: function () {
    return '#' + (((1<<24)*Math.random()) | 0).toString(16).padStart(6, 0);
  },
};

//export default cmeHelpers;
