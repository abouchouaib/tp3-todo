
class Todo{
    constructor(text, cpt){
        this.text = text;
        this.done = false;
        this.cpt = cpt;
    }
}

function generateTodo(tableu, slider = 0) {
      tableu = todoView(tableu , slider);

       document.querySelector('.aria').innerHTML = `
        ${tableu.map(objet => `
        <div class= "todo_${objet.done ? 'done' : ''}">
        <input id ='${objet.cpt}' type="checkbox" ${objet.done ? 'checked' : ''}>
        <label for="${objet.cpt}" class ="${objet.done ? 'text_done' : ''}">${objet.text}</label>
        <input id ='${objet.cpt}' classe = "close" type ="button" value ="&times;">
        <hr color="darck">
        </div>       
        ` 
    ).join('')}`;
        
}

function todoView(tableu, slider){    
    let tab=[];
    let longueurTableu = tableu.length;
    if(longueurTableu <=5 ){
        document.querySelector('#previous').style.visibility = "hidden";
        document.querySelector('#next').style.visibility = "hidden";
        return tableu;
    }else{
        if(longueurTableu %5 == 0 ){
           let NbPage = longueurTableu/5;
           let start = 0;
           let end = 5;
           for (let i = 0; i < NbPage; i++) {
                tab.push(tableu.slice(start,end));
                start += 5;
                end += 5;               
            }
           
        }else{
            let NbPage = Math.trunc(longueurTableu/5)+1;
            let start = 0;
            let end = 5;
            for (let i = 0; i < NbPage; i++) {
                tab.push(tableu.slice(start,end));
                start += 5;
                end += 5;               
            }
        }
        if(slider <= 0){
            document.querySelector('#next').style.visibility = "visible";
            document.querySelector('#previous').style.visibility = "hidden";
            return tab[0];
        }        
        if(slider >= tab.length-1){
            document.querySelector('#previous').style.visibility = "visible";
            document.querySelector('#next').style.visibility = "hidden";
            return tab[tab.length -1];
        }
        if(slider<tab.length-1 && slider>0){
            document.querySelector('#previous').style.visibility = "visible";
            document.querySelector('#next').style.visibility = "visible";
            return tab[slider];
        }
    }
}



function eventTreatmentCheckBox(id, slider) {
        
    let tabb = JSON.parse(localStorage.getItem('todoListe'));    
    for(let objet of tabb){        
        let {cpt} = objet; 
        if (id == cpt) {
            if(document.getElementById(id).checked){
                objet.done = true;
            }else {
                objet.done = false;
            }
            localStorage.setItem('todoListe', JSON.stringify(tabb));                         
            generateTodo(tabb,slider);
        }
    }    
}


function eventTreatmentDelete(id, slider) {
    let tabb = JSON.parse(localStorage.getItem('todoListe'));
    for (const objet of tabb) {
        const {cpt, done} = objet;
        if (id == cpt && !done) {         
              
            if(confirm('Vous êtes sûr de vouloir supprimer cette tache ?')){  
                tabb.splice(tabb.indexOf(objet),1);               
                localStorage.setItem('todoListe', JSON.stringify(tabb));
                generateTodo(tabb, slider);
            }
              
        }
        if (id == cpt && done) { 
            tabb.splice(tabb.indexOf(objet),1);               
            localStorage.setItem('todoListe', JSON.stringify(tabb));
            generateTodo(tabb, slider);               
        }
    }
}
