document.querySelector('#getAll').addEventListener('click', getAll);
document.querySelector('#getOne').addEventListener('click', getUserID);


//Show all user
function getAll(){

    var url = "https://reqres.in/api/users/";
    const xhr = new XMLHttpRequest();

    xhr.open('GET',url,true);
    xhr.onload = function(){

        if(this.status ===200)
        {
            let posts = JSON.parse(this.responseText);
            let html="";
            let postsData = posts.data;
             
            postsData.forEach(element => {
                html +=`
            
                <div class="card" style="width: 18rem; margin-left:50px">
      <img class="card-img-top" src="${element.avatar}" alt="Card image cap">
      <ul class="list-group list-group-flush">
        <li class="list-group-item"><h3>${element.first_name} ${element.last_name}</h3></li>
        <li class="list-group-item">${element.email}</li>
      </ul>
    
    </div>
                
                `;

            });
            
           
          
      
            document.querySelector("#ShowData").innerHTML = html;

        };
      
        
    }
    
    xhr.send();

}

//serach user with userid
function getUserID(){

    var url = "https://reqres.in/api/users/";
    const xhr = new XMLHttpRequest();
    xhr.open('GET',url,true);
    xhr.onload = function(){

        if(this.status ===200)
        {
            
            var input= document.getElementById("inputurl").value;
            let post = JSON.parse(this.responseText);
            let html="";
            var postData = post.data;
           
            postData.forEach(element=>{
                
                if(element.id == input || element.first_name == input || element.last_name == input){
                   
                    html +=
                    `<div class="card" style="width: 18rem; margin-left:50px">
                     <img class="card-img-top" src="${element.avatar}" alt="Card image cap">
                        <ul class="list-group list-group-flush">
                        <li class="list-group-item"><h3>${element.first_name} ${element.last_name}</h3></li>
                        <li class="list-group-item">${element.email}</li>
                         </ul>
                    </div>`;
                   
                document.getElementById("ShowData").innerHTML = html;
                //console.log(element);
            }else{
                html+="";
                document.getElementById("ShowData").innerHTML = html;
            }
            });
        }
    }
    xhr.send();
}


//if you are press Enter for search the user
document.getElementById("inputurl").addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
       getUserID();
    }
});