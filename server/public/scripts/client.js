console.log( 'js' );

$( document ).ready( function(){
  console.log( 'JQ' );
  // Establish Click Listeners
  setupClickListeners()
  // load existing koalas on page load
  getKoalas();

}); // end doc ready

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
    }).catch((err) => {
        alert('koalas get request failed');
        console.log('koals get request failed', err);
    });

}// end getKoalas

function renderToDom(array){
        console.log('in renderToDom');
    let readyToggle = '<button class="transferBtn">Not Ready</button>';
    for ( let item of array) {

        if(item.readToTransfer ==='true') {
            readyToggle = '<button class="transferBtn">Ready for Transfer</button>';
        }

        $('#viewKoalas').append(`

            <tr>
                <td class="koalaId">${item.id}</td>
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

function saveKoala( newKoala ){
  console.log( 'in saveKoala', newKoala );
  // ajax call to server to get koalas
 
}
