let inputs = document.querySelectorAll("header input");
let textArea = document.querySelector("header textArea");
let buttons = document.querySelectorAll("header button");
let Search = document.querySelector(".search input");
let tbody = document.querySelector("table tbody");
let index;
let box = [];

if(getLocation() !== null){
    box = JSON.parse(getLocation());
    display();
}

// ========== add product ==========
buttons[0].addEventListener('click',function(){
    let user = {
        name:inputs[0].value,
        calalog:inputs[1].value,
        price:inputs[2].value,
        desc:textArea.value
    };

    if(validation.valid(inputs[0] , validation.validName) & validation.valid(inputs[1] , validation.validcatalog) & validation.valid(inputs[2] , validation.validPrice) & validation.valid(textArea , validation.validDesc)){
        box.push(user);
        $("tbody").append(
            `<tr>
            <td class="align-middle">${box.length}</td>
            <td class="align-middle">${user.name}</td>
            <td class="align-middle">${user.calalog}</td>
            <td class="align-middle">${user.price}</td>
            <td class="align-middle">${user.desc}</td>
            <td class="align-middle"><button onclick="update(${box.length-1})" class="btn btn-warning"><i class="fa-solid fa-pen-to-square"></i></button></td>
            <td class="align-middle"><button onclick="del(${box.length-1})" class="btn btn-danger"><i class="fa-solid fa-trash"></i></button></td>
        </tr>`
        );
        reset();
        setLocation();
    };

});


// ========== update product ==========
buttons[1].addEventListener('click',function(){
    let user = {
        name:inputs[0].value,
        calalog:inputs[1].value,
        price:inputs[2].value,
        desc:textArea.value
    };

    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success mx-1',
          cancelButton: 'btn btn-danger mx-1'
        },
        buttonsStyling: false
      })
      
      swalWithBootstrapButtons.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          swalWithBootstrapButtons.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )

          // ========== update ==========
          if(validation.valid(inputs[0] , validation.validName) & validation.valid(inputs[1] , validation.validcatalog) & validation.valid(inputs[2] , validation.validPrice) & validation.valid(textArea , validation.validDesc)){
            box.splice(index , 1 , user);
            $("tbody").children().eq(index).before(
                `<tr>
            <td class="align-middle">${index+1}</td>
            <td class="align-middle">${user.name}</td>
            <td class="align-middle">${user.calalog}</td>
            <td class="align-middle">${user.price}</td>
            <td class="align-middle">${user.desc}</td>
            <td class="align-middle"><button onclick="update(${index})" class="btn btn-warning"><i class="fa-solid fa-pen-to-square"></i></button></td>
            <td class="align-middle"><button onclick="del(${index})" class="btn btn-danger"><i class="fa-solid fa-trash"></i></button></td>
        </tr>`
            );
            $("tbody").children().eq(index+1).remove();
            reset();
            setLocation();
            buttons[1].classList.add("d-none");
            buttons[0].classList.remove("d-none");
        };


        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            'Cancelled',
            'Your imaginary file is safe :)',
            'error'
          )
          // ========== reset ==========
          reset();
          buttons[1].classList.add("d-none");
          buttons[0].classList.remove("d-none");
        }
      })
      



});

// ========== display ==========

function display(){
    var result ="";
    for(let i = 0 ; i<box.length  ; i++){
        if(box[i].name.toLowerCase().startsWith(Search.value.toLowerCase())){
            let reg = new RegExp(Search.value , "i");
            result +=`<tr>
            <td class="align-middle">${i+1}</td>
            <td class="align-middle">${box[i].name.replace(reg, match => `<span class="text-warning">${match}</span>` )}</td>
            <td class="align-middle">${box[i].calalog}</td>
            <td class="align-middle">${box[i].price}</td>
            <td class="align-middle">${box[i].desc}</td>
            <td class="align-middle"><button onclick="update(${i})" class="btn btn-warning"><i class="fa-solid fa-pen-to-square"></i></button></td>
            <td class="align-middle"><button onclick="del(${i})" class="btn btn-danger"><i class="fa-solid fa-trash"></i></button></td>
        </tr>`;
        };
    };
    tbody.innerHTML = result;
}


// ========== update ==========
function update(i){

    inputs[0].value = box[i].name;
    inputs[1].value = box[i].calalog;
    inputs[2].value = box[i].price;
    textArea.value = box[i].desc;
    index = i;
    buttons[0].classList.add("d-none");
    buttons[1].classList.remove("d-none");
};



// ========== dalete ==========
function del(i){

    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
          box.splice(i , 1);
          display();
          setLocation();
        }
      });
};

// ========== reset ==========

buttons[2].addEventListener('click',function(){
    reset();
});

function reset(){
    inputs[0].value = "";
    inputs[1].value = "";
    inputs[2].value = "";
    textArea.value = "";
    inputs[0].classList.remove("is-invalid","is-valid");
    inputs[1].classList.remove("is-invalid","is-valid");
    inputs[2].classList.remove("is-invalid","is-valid");
    textArea.classList.remove("is-invalid","is-valid");
};

// ========== search ==========
Search.addEventListener('input',function(){
    display();
});

// ========== getlocation ==========
function getLocation(){
    return localStorage.getItem("box");
}

// ========== setlocation ==========
function setLocation(){
    localStorage.setItem("box" , JSON.stringify(box));
}



// ========== validation ==========
const validation = {
    validName:/^[\w\s]{2,15}$/,
    validcatalog:/^[\w\s]{3,15}$/,
    validPrice:/^[\d]{0,10}$/,
    validDesc:/^[\w\s]{3,15}$/,

    valid:function(input , style){
        if(style.test(input.value)){
            input.classList.add("is-valid");
            input.classList.remove("is-invalid");
            return true;
        }else{
            input.classList.add("is-invalid");
            input.classList.remove("is-valid");
            return false;
        };
    }
};


inputs[0].addEventListener('input',function(){
    validation.valid(this , validation.validName);
});
inputs[1].addEventListener('input',function(){
    validation.valid(this , validation.validcatalog);
});
inputs[2].addEventListener('input',function(){
    validation.valid(this , validation.validPrice);
});
textArea.addEventListener('input',function(){
    validation.valid(this , validation.validDesc);
});