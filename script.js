let forms = document.querySelectorAll('form'),
    onlyNumbers = document.querySelectorAll('input[type="tel"]'),
    onlyRussionLetters = document.querySelectorAll('input[type="text"]');


//form
forms.forEach((item)=>{
    item.addEventListener('submit', possted);
});

//Russion Letters
onlyRussionLetters.forEach((item)=>[
    item.addEventListener('input', function(){
        this.value = this.value.replace(/[^А-Яа-яЁё ]/, '');
    }) 
]);

//numbers
onlyNumbers.forEach((item)=>[
    item.addEventListener('input', function(){
        this.value = this.value.replace(/[^0-9\+]/, '');
        this.value = this.value.substr(0, 11);
    }) 
]);

function possted (event) {
    event.preventDefault();
    let a =this,
        formData = new FormData(a),
        json = {}; 
    // we take information from users and create object for backend part
    formData.forEach((value, key) => { 
        json[key] = value;
    });
    sent(json, a);
}

function sent(json, a){
    let url = 'server.php';
    fetch(url, {
        method: 'POST',
        body: JSON.stringify(json),
        headers: {
        "Content-type": "application/json; charset=UTF-8"
        }
    })
    .then(
      function (res) {
          if (!res.ok) {
              alert(`Looks like there was a problem. Status Code: 
                  ${res.status}`);
          } else {
              alert('Data was created and successfully sent');
          }

          if(a !== undefined){
            a
              .querySelectorAll('input')
              .forEach(item => item.value = '');
            } else{
                alert("we don't have an argument a ");
            }
      }
  )
    .catch(function(err) {  
    console.log('Fetch Error :-S', err);  
    });
}