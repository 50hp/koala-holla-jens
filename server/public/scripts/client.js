console.log( 'js' );

$( document ).ready( function(){
  console.log( 'JQ' );
  $('#addButton').on('click', postKoala)
    
  // Establish Click Listeners
  // setupClickListeners()
  // load existing koalas on page load
  getKoalas();
  $('#viewKoalas').on('click', '.transferBtn', isReady)
}); // end doc ready 


function postKoala(){
  console.log('click works!')
  let kInputs = {
    kName: $('#nameIn').val(),
    kAge: $('#ageIn').val(),
    kGender: $('#genderIn').val(),
    kReadyTrans: $('#readyForTransferIn').val(),
    kNotes: $('#notesIn').val(),


  }
  console.log(kInputs)
$.ajax({
  method: 'POST',
  url: '/koalas',
  data: kInputs
}).then(function(response) {
  console.log(response);
  $('#nameIn').val('')
  $('#ageIn').val('')
  $('#genderIn').val('')
  $('#readyForTransferIn').val('')
  $('#notesIn').val('')
  getKoalas()
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


    $.ajax({
        method: 'GET',
        url: '/koalas',
    }).then((response) => {
        renderToDom(response);
        console.log('success');
    }).catch((err) => {
        alert('koalas get request failed');
        console.log('koals get request failed', err);
    });

}// end getKoalas

function renderToDom(array){
    $('#viewKoalas').empty();
        console.log('in renderToDom');
    let readyToggle = '<button class="transferBtn">Not Ready</button>';
    for ( let item of array) {

        if(item.readyToTransfer ==='true') {
            readyToggle = '<button class="transferBtn">Ready for Transfer</button>';
        }

        $('#viewKoalas').append(`

            <tr data-id=${item.id}>
                <td class="koalaName">${item.name}</td>
                <td class="koalaAge">${item.age}</td>
                <td class="koalaGender">${item.gender}</td>
                <td class="koalareadyToTransfer">${item.readyToTransfer}</td>
                <td class="koalanotes">${item.notes}</td>
                <td class="transferBtn">${readyToggle}</td>
                <td class="remove"><button class="removeBtn">Remove</button></td>
            </tr>
        `);
    }
} //end of renderToDom

let isLoading = false;

function saveKoala( newKoala ){
  console.log( 'in saveKoala', newKoala );
  // ajax call to server to get koalas
 
}

// beginning PUT function
function isReady() {
  if (isLoading === false){
    isLoading = true;
  console.log( 'Ready to transfer clicked')
  let idToUpdate = $(this).closest('tr').data('id');
  console.log( idToUpdate )

  // let data = {
  //   readyToTransfer: false
  // }

  $.ajax({
      method: 'PUT',
      url: `/koalas/${idToUpdate}`,
      data: { // data should be an object
          readyToTransfer: false
      }

  }).then(function(response){
    isLoading = false;
      console.log(response)
      getKoalas();
  }).catch(function(err){
      console.log(err)
  })
}
}
