function preprocessDate(dates) {
  // Write your code here
  let datesArray = [];
  let month = ['Jan', 'Feb', 'Mars', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

  for (let i = 0; i < dates.length; i++) {
    let newData = '';
    let newStringArray = dates[i].split(" ");
    for (let j = 0; j < newStringArray.length; i++) {
      let day = '';
      newData = newStringArray[2] + '-' + month.indexOf(newStringArray[1]) - 1 + "-" + day;
    }
    datesArray.push(newData);
  }
  return newStringArray
}





console.log(preprocessDate(['1st Apr 2020', '27th May 1998']));