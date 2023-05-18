console.log( 'js' );

$( document ).ready( function(){
  console.log( 'JQ' );
  $('#addKoala').on('click', postKoala)
  
  
  
  
  // Establish Click Listeners
  // setupClickListeners()
  // load existing koalas on page load
  // getKoalas();

}); // end doc ready


function postKoala(){
  console.log('click works!')
  let kInputs = {
    kName: $('#nameIn').val(),
    kAge: $('#ageIn').val(),
    kGender: $('#genderIn').val(),
    kReadyTrans: $('#readyForTransferIn').val(),
    kNotes: $('#notesIn'),


  }
$.ajax({
  method: 'POST',
  url: '/koalas',
  data: kInputs
}).then(function(response) {
  console.log(response);
  
}).catch(function(error) {
  console.log('error in artist post', error); 
  alert('Error adding artist. Please try again later.')       
});

}






// function setupClickListeners() {
//   $( '#addButton' ).on( 'click', function(){
//     console.log( 'in addButton on click' );
//     // get user input and put in an object
//     // NOT WORKING YET :(
//     // using a test object
//     let koalaToSend = {
//       name: 'testName',
//       age: 'testName',
//       gender: 'testName',
//       readyForTransfer: 'testName',
//       notes: 'testName',
//     };
//     // call saveKoala with the new obejct
//     saveKoala( koalaToSend );
//   }); 
// }

function getKoalas(){
  console.log( 'in getKoalas' );
  // ajax call to server to get koalas
  
} // end getKoalas

function saveKoala( newKoala ){
  console.log( 'in saveKoala', newKoala );
  // ajax call to server to get koalas
 
}
