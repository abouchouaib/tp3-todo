const formulaire = document.forms['formulaire'];

let compteur = 0;
let compteurSliding = 0;
let todoStorage = [];
if (JSON.parse(localStorage.getItem('todoListe')) != null) {
    todoStorage = JSON.parse(localStorage.getItem('todoListe'));
    if(todoStorage.length != 0){
        const {cpt} = todoStorage[todoStorage.length-1];
        compteur = cpt;       
        generateTodo(todoStorage);
      
    }
}

formulaire.addEventListener('submit', (e) => {
    e.preventDefault();
    const userInput = formulaire.text.value;
    if(JSON.parse(localStorage.getItem('todoListe')) != null && todoStorage.length != 0){
        todoStorage = JSON.parse(localStorage.getItem('todoListe'));
    }
        if(userInput.length>3){           
            compteur++;
            todoStorage.push(new Todo(userInput, compteur));
            generateTodo(todoStorage,compteurSliding);
            localStorage.setItem('todoListe', JSON.stringify(todoStorage));
            formulaire.reset();
        };
})


document.querySelector('.aria').addEventListener('click', ()=>{
    const {type,id}= event.target;

    if (type === "checkbox") {
        eventTreatmentCheckBox (id, compteurSliding);
    }

    if (type === "button") {
        eventTreatmentDelete(id, compteurSliding);
     
    }
});

document.querySelector('#previous').addEventListener('click', ()=>{
    compteurSliding -=1;
    generateTodo(JSON.parse(localStorage.getItem('todoListe')), compteurSliding);

});

document.querySelector('#next').addEventListener('click', ()=>{
    compteurSliding +=1;
generateTodo(JSON.parse(localStorage.getItem('todoListe')), compteurSliding);
    
});

   
