console.log( 'js' );
// import swal from "sweetalert";

$( document ).ready( function(){
  console.log( 'JQ' );
  $('#addButton').on('click', postKoala)
  $('#viewKoalas').on('click', '.transferBtn', isReady)
  $('#viewKoalas').on('click','.removeBtn', removeKoala)
  getKoalas();
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
    if(kInputs.kAge >18 || kInputs.kAge < 0 ) {
        alert("age is wrong")
        return
    }
    if(kInputs.kGender === 'M' || kInputs.kGender === 'F') {

    }else{
        alert('Gender needs to be equal to M or F')
        return
    }

    if(kInputs.kReadyTrans === 'true' || kInputs.kReadyTrans === 'false'){

    }else {
        alert('Ready status must be true or false');
        return
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
    let readyToggle = '';
    for ( let item of array) {
        console.log(item.readyToTransfer);

        if(item.readyToTransfer === true) {
            readyToggle = '<button class="transferBtn">Not Ready</button>';
        }else {
            readyToggle = '<button class="transferBtn">Ready To Transfer</button>';
        }

        $('#viewKoalas').append(`

            <tr data-id=${item.id}>
                <td class="koalaName">${item.name}</td>
                <td class="koalaAge">${item.age}</td>
                <td class="koalaGender">${item.gender}</td>
                <td class="koalareadyToTransfer">${item.readyToTransfer}</td>
                <td class="koalanotes">${item.notes}</td>
                <td class="transferBtn" data-value="${item.readyToTransfer}">${readyToggle}</td>
                <td class="remove"><button class="removeBtn">Remove</button></td>
            </tr>
        `);
    }
} //end of renderToDom


// beginning PUT function
function isReady() {
        console.log( 'Ready to transfer clicked')
        let idToUpdate = $(this).closest('tr').data('id');
        let isReadyValue = $(this).data().value;
        console.log('idToUpdate',idToUpdate, isReadyValue);

 
    
     if ( isReadyValue === false){
         console.log('idTOUpdate false', idToUpdate )
    
         $.ajax({
             method: 'PUT',
             url: `/koalas/${idToUpdate}`,
             data: { // data should be an object
                 readyToTransfer: false,
             }
         }).then(function(response){
             // isLoading = false;
             console.log(response)
             getKoalas();
         }).catch(function(err){
             console.log(err)
         })
     }else{
         console.log('idToUpdate true', idToUpdate )
         $.ajax({
             method: 'PUT',
             url: `/koalas/${idToUpdate}`,
             data: { // data should be an object
                 readyToTransfer: true
             }
         }).then(function(response){
             console.log(response)
             getKoalas();
         }).catch(function(err){
             console.log(err)
         })
     } 
}

function removeKoala(){
  const idToRemove = $(this).closest('tr').data('id');
  swal({
    title: "Are you sure? You want to delete this Koala?! 🐨",
    text: "Once deleted, you will not be able to recover this Koala ever again!! You monster!!",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  })
  .then((willDelete) => {
    if (willDelete) {
      swal("BANG!!! BANG!!! You're a MONSTER!!!! ", {
        icon: "success",
      });
      $.ajax({
      type: 'DELETE',
      url: `/koalas/${idToRemove}`
  }).then(function (response){
    getKoalas();
  }).catch(function (error){
      console.log('Error with delete', error)
  })
    } else {
      swal("Thank you for coming back to your senses!");
    }
  });
  
  
}
