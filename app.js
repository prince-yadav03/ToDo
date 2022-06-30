console.log("Welcome to the notes App");
shownotes(); //bcz when we reload page it removes all so we have to call this here

//if user add a note add it to local storage

let adbtn = document.getElementById('addbtn');
adbtn.addEventListener("click", function (e) {

    let adtxt = document.getElementById("addtxt");
    let notes = localStorage.getItem("notes");     //it is array
    if (notes == null) {
        notesObj = [];  //basically stores in form of array so if notes are nulll then pass empty arrya else push in the form of array bcz notes print in form of array in your notes
    }
    else {
        notesObj = JSON.parse(notes);
    }
    notesObj.push(adtxt.value);
    //now add to localsotrage
    localStorage.setItem("notes", JSON.stringify(notesObj));
    adtxt.value = "";   //after add up then clear from edit section
    console.log(notesObj);
    shownotes();

})

//show notes

function shownotes() {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];  //basically stores in form of array so if notes are nulll then pass empty arrya else push in the form of array bcz notes print in form of array in your notes
    }
    else {
        notesObj = JSON.parse(notes);
    }
    let html = "";
    notesObj.forEach(function(element, index) {
        html += `
                <div class="noteCard my-2 mx-2 card" style="width: 18rem;">
                        <div class="card-body">
                            <h5 class="card-title">Note ${index + 1}</h5>
                            <p class="card-text"> ${element}</p>
                            <button id="${index}"onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
                        </div>
                    </div>`;
      });
      let notesEle=document.getElementById('notes');
      if(notesObj.length!=0)
      {
        notesEle.innerHTML=html;
      }
      else{
        notesEle.innerHTML='nothing to show';
      }
}

//delete notes
function deleteNote(index)
{
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];  //basically stores in form of array so if notes are nulll then pass empty arrya else push in the form of array bcz notes print in form of array in your notes
    }
    else {
        notesObj = JSON.parse(notes);
    }
    //now we have all notes in notesObj
    notesObj.splice(index,1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    shownotes();
    //and also we have to update local storage after delete
}


//now search the particular note 
let search = document.getElementById('searchtxt');
search.addEventListener("input", function(){

    let inputVal = search.value.toLowerCase();
    // console.log('Input event fired!', inputVal);
    let noteCards = document.getElementsByClassName('noteCard');
    Array.from(noteCards).forEach(function(element){
        let cardTxt = element.getElementsByTagName("p")[0].innerText;
        if(cardTxt.includes(inputVal)){
            element.style.display = "block";
        }
        else{
            element.style.display = "none";
        }
        // console.log(cardTxt);
    })
})