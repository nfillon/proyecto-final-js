const minutoHora = 24;
const diaMes= 30;
let addCarrito = [];
let calcular = [];


let arregloInstancias = [{
    id: 1,
    tipo: "t2.nano2",
    description:  "Vcpu = 1 <br> Memoria = 0,5 GB <br> Storage = EBS",
    precio: "0.0058"
}, {
    id: 2,
    tipo: "t2.micro",
    description:  "Vcpu = 1 <br> Memoria = 1 GB <br> Storage = EBS ",
    precio: "0.0116"
},{
    id: 3,
    tipo: "t2.small",
    description:  "Vcpu = 1 <br> Memoria = 2 <br> Storage = EBS ",
    precio: "0.023"
},{
    id: 4,
    tipo : "t2.medium",
    description : "Vcpu <br> 2 Memoria = <br>  Storage = EBS" ,
    precio: "0.0464"
}];

//Titulo con HTML dinamico

let IdWelcome = document.getElementById('IdWelcome')
IdWelcome.innerHTML=`<h3><strong>Hola vas a iniciar la contratacion de instancias Ec2</strong></span>`


//Recorro el arreglo y armo las card
let idCard = document.getElementById('idCard')

arregloInstancias.forEach(instancias =>  { idCard.innerHTML += `
  <div class="col-sm-6 w-25 mb-1" >
        <div class="card">
            <div class="card-body" id="idInst" >
                <h5 class="card-title text-center" >ID: ${instancias.id}</h5>
                <h5 class="card-title text-center">Instancia Tipo: ${instancias.tipo}</h5>
                <p class="card-text text-center">${instancias.description}</p>
                <p class="card-text text-center"><strong> ${instancias.precio}</strong></p>
                <div class="text-center" id="idBottom"> 
                    <a href="#" onclick="addToCart(${instancias.id});" class="btn btn-success">Agregar Instancia</a>
                </div>
            </div>  
        </div>
   </div>
  `
})



function addToCart(id){
   id = id
   var result = confirm('¿Añadir este producto al carrito de la compra? ');
   if (result == false){
       return;
   }
   const buscarID = arregloInstancias.find(awsID => awsID.id === id)




   
   //Seteo desplay para que se vea el TR de la tabla
 


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


