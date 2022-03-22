const minutoHora = 24;
const diaMes= 30;
let addCarrito = [];
let calcular = [];



class Userdd { 
    constructor(email,psw,estado) {
        this.email = email;
        this.psw = psw;
        this.estado = estado;
    }
    loguearse(){
        console.log(`${this.email} este user esta logueado`)
    }
}
// Consulto si hay usuario sino los crea 
let arrayUsuarios = [];

if(localStorage.getItem('usuarios')){
     arrayUsuarios = JSON.parse(localStorage.getItem('usuarios'))
 } else {
     localStorage.setItem('usuarios', JSON.stringify('arrayUsuarios'))
}


let formularioAdd = document.getElementById("idAddUser");

formularioAdd.addEventListener('submit', (e) => {
    e.preventDefault()
    let dataForm = new FormData(e.target)
    let email  = dataForm.get('email')
    let psw = dataForm.get('psw')
    let pswrepeat = dataForm.get('pswrepeat')
    let estado = "logout"

    if (psw == pswrepeat) {
        if(!arrayUsuarios.some(usuariosEnStorage => usuariosEnStorage.email == email)) {
            const usuario = new Userdd(email,psw,estado)
            console.log(usuario)
            arrayUsuarios.push(usuario)
            localStorage.setItem('usuarios', JSON.stringify(arrayUsuarios))
            formularioAdd.reset()
            Swal.fire({
                icon: 'success',
                title: 'El usuario se agrego corretamente',
                showConfirmButton: false,
                timer: 1500
              })

        } else {
            Swal.fire({
                icon: 'error',
                title: 'El Usuario ya esta registrado',
                showConfirmButton: false,
                timer: 1500
              })
            console.log("usuarios ya esta registrado")
        }
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Las claves ingresadas son diferentes',
            showConfirmButton: false,
            timer: 1500
          })
    }
})

let formularioLogin = document.getElementById("idLogin");

formularioLogin.addEventListener('submit', (e) => {
    e.preventDefault()
    let dataForm1 = new FormData(e.target)
    let email  = dataForm1.get('emaill')
    let psw = dataForm1.get('pswl')

    if(
    arrayUsuarios.find( eachUser => {
        return eachUser.email === email && eachUser.psw === psw;
    })){
        document.getElementById('id01').style.display = "none";
        let IdWelcome = document.getElementById('IdWelcome')
        IdWelcome.innerHTML=`
        <h3><strong>Hola vas a iniciar la contratacion de instancias Ec2</strong></h3>
        <h3><strong>Welcome ${email} </strong></h3>
        `
        Swal.fire({
            icon: 'success',
            title: 'Usuario autenticado',
            showConfirmButton: false,
            timer: 1500
          })
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Error en la autenticacion',
            showConfirmButton: false,
            timer: 1500
          })
    }
})

//Titulo con HTML dinamico

let IdWelcome = document.getElementById('IdWelcome')
IdWelcome.innerHTML=`<h3><strong>Hola vas a iniciar la contratacion de instancias Ec2</strong></span>`


//Recorro el arreglo y armo las card
let idCard = document.getElementById('idCard')

async function obtenerInstancias() { 
    const response = await fetch("json/instancias.json", {
        method: 'GET', mode: 'no-cors'
    })
    return await response.json()

}

obtenerInstancias().then (instancias => {
    instancias.forEach((instancias) => 
    { idCard.innerHTML += `
  <div class="col-sm-6 w-25 mb-1" >
        <div class="card">
            <div class="card-body" id="idInst" >
                <h5 class="card-title text-center" >ID: ${instancias.id}</h5>
                <h5 class="card-title text-center">Instancia Tipo: ${instancias.tipo}</h5>
                <p class="card-text text-center">${instancias.description}</p>
                <p class="card-text text-center"><strong> ${instancias.precio}</strong></p>
                <div class="text-center" id="idBottom"> 
                    <a href="#" onclick="addToCart(${instancias.id});" class="btn btn-success" >Agregar Instancia</a>
                </div>
            </div>  
        </div>
   </div>
  `
})
})

function addToCart(id){
   id = id

   obtenerInstancias().then (arregloInstancias => {
       const buscarID = arregloInstancias.find(awsID => awsID.id === id)
       
       Swal.fire({
           title: '¿Añadir este producto al carrito de la compra?',
           icon: 'question',
           showCancelButton: true,
           confirmButtonColor: '#3085d6',
           cancelButtonColor: '#d33',
           confirmButtonText: 'Agregar'
        }).then((result) => {
            if (result.isConfirmed) {        

                var idaws = ((document.getElementById("cantidad")||{}).value)||"";

                document.getElementById('hiddenThead').style.display = "block";
                addcarrito = document.getElementById('caritoAdd')
                addcarrito.innerHTML += `
                <tr>
                <th scope="row" id="awsid">${buscarID.id}</th>
                <td>${buscarID.tipo}</td>
                <td>${buscarID.precio} USD</td>
                <td><input type="number" id="dias" value="0" min="0" max="30" oninput="calcularInstancia(${buscarID.id},${buscarID.precio},document.getElementById('dias').value,document.getElementById('cantidad').value)"/></td>
                <td><input type="number" id="cantidad" value="1" min="0" max="30" oninput="calcularInstancia(${buscarID.id},${buscarID.precio},document.getElementById('dias').value,document.getElementById('cantidad').value)"/></td>
                <td id="${buscarID.id}"></td>
                <td><input type="button" value="Contratar" onclick="buytoCard('${buscarID.id}','${buscarID.tipo}','${buscarID.precio}',document.getElementById('dias').value,document.getElementById('cantidad').value)"/></td>
                </tr>
                `
       
                var addCantidad = 2 + 1
                document.getElementById("cantidad").value = addCantidad 

                Swal.fire(
                    `La ${buscarID.tipo} Se agrego corretamente`,)
                }
            }
            )
        
    })
}

const calcularInstancia = (id,precio, dias, cantidad, ) => {
   
    const calcular = ((((precio* minutoHora) *diaMes)* dias)*cantidad)
    totalizarCarrito = document.getElementById(id)
    console.log(totalizarCarrito)

    totalizarCarrito.innerText = `${calcular.toFixed(2)}` 
    console.log(calcular)

}

const totalizarCard = () => {
 
}


const buytoCard = (idInst, tipo, precio, dias, cantidad) => {

   const idInstan = idInst;
   const tipoInstan = tipo;
   const precioInstan = precio;
   const diasContratar = dias;
   const cantidadInstan = cantidad;

   console.log(idInstan,tipoInstan,precioInstan,diasContratar,cantidadInstan)

    product = {
        "productID": idInstan,
        "productName": tipoInstan,
        "productPrice": precioInstan,
        "dias" : diasContratar,
        "cantidad" : cantidadInstan,
        // "total": total
        }    
        addCarrito.push(product);
        localStorage.setItem("addcarrito", JSON.stringify(addCarrito));
        var cart = localStorage.getItem("addcarrito");
        console.log(cart);
}