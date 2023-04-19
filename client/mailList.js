function emailGenerator () {
  const letters = 'abcdefghijklmnopqrstuvwxyz';
  const emailList = []
  for (let i = 0; i < 100; i++) {
    let r = Math.round(Math.random() * letters.length);
    let rr = Math.round(Math.random() * letters.length);
    emailList.push(r + letters[rr] + '@fakemail.com');
  }
  return emailList;
}

console.log(emailGenerator()); 
