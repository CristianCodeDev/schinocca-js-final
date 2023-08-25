let productos = `
[
    {
        "id": "button-one",
        "img": "../assets/cascos-product.webp",
       "name": "Cascos",
        "price": "$950"
    },

    {
        "id": "button-two",
        "img": "../assets/nike-product.webp",
        "name": "Nike Airforce 1",
        "price": "$400"
    },
    
    {
        "id": "button-tree",
        "img": "../assets/reloj-product.jpg",
        "name": "AppleWatch",
        "price": "$300"
    }
]`;

const jsonProductos = JSON.parse(productos);

let main = document.getElementById("of-cart");

let carritoDiv = document.createElement("div");
carritoDiv.id = "carrito";
carritoDiv.className = "carrito";

let titulo = document.createElement("h2");
titulo.textContent = "Carrito de compras";

carritoDiv.appendChild(titulo);

let lista = document.createElement("ul");
lista.id = "lista";
lista.className = "lista";

carritoDiv.appendChild(lista);

main.appendChild(carritoDiv);

let carrito = {
  productos: [],
  total: 0,
};

async function agregarProducto(img, name, price) {
  let producto = {
    img: img,
    name: name,
    price: price,
  };

  carrito.productos.push(producto);

  carrito.total += Number(price.replace("$", ""));

  Swal.fire({
    title: "",
    text: "Agregando producto al carrito...",
    icon: "info",
  });

  await new Promise((resolve) => setTimeout(resolve, 2000));

  Swal.fire({
    title: "",
    text: `Producto agregado al carrito. El total es: $${carrito.total}`,
    icon: "success",
  });

  let carritoJSON = JSON.stringify(carrito);

  window.localStorage.setItem("carrito", carritoJSON);
  mostrarCarrito();
}

window.addEventListener("load", function () {
  let carritoJSON = window.localStorage.getItem("carrito");

  if (carritoJSON) {
    carrito = JSON.parse(carritoJSON);

    let lista = document.getElementById("lista");
    for (let producto of carrito.productos) {
      let item = document.createElement("li");
      item.className = "item";

      let imagen = document.createElement("img");
      imagen.src = producto.img;
      imagen.alt = producto.name;
      imagen.classList.add("image-cart");

      let nombre = document.createElement("p");
      nombre.textContent = producto.name;

      let precio = document.createElement("p");
      precio.textContent = producto.price;

      item.appendChild(imagen);
      item.appendChild(nombre);
      item.appendChild(precio);

      lista.appendChild(item);
    }
  }
  let comprar = document.createElement("button");
  comprar.textContent = "Comprar";
  comprar.classList.add("comprar-producto");

  comprar.addEventListener("click", function () {
    if (carrito.productos.length > 0) {
      let nombres = "";

      for (let producto of carrito.productos) {
        nombres += producto.name + ", ";
      }

      nombres = nombres.slice(0, -2);

      Swal.fire({
        title: "",
        text: `Gracias por su compra. El total es: $${carrito.total}. Los productos comprados son: ${nombres}.`,
        icon: "success",
      });

      carrito.productos = [];
      carrito.total = 0;
      window.localStorage.removeItem("carrito");

      let lista = document.getElementById("lista");

      while (lista.firstChild) {
        lista.removeChild(lista.firstChild);
      }
    } else {
      Swal.fire({
        title: "",
        text: "No hay productos en el carrito.",
        icon: "error",
      });
    }
  });

  carritoDiv.appendChild(comprar);
});

let buttonOne = document.getElementById("button-one");
let buttonTwo = document.getElementById("button-two");
let buttonTree = document.getElementById("button-tree");

buttonOne.addEventListener("click", () =>
  agregarProducto("../assets/cascos-product.webp", "Cascos", "$950")
);
buttonTwo.addEventListener("click", () =>
  agregarProducto("../assets/nike-product.webp", "Nike Airforce 1", "$400")
);
buttonTree.addEventListener("click", () =>
  agregarProducto("../assets/reloj-product.jpg", "AppleWatch", "$300")
);

function mostrarCarrito() {
  let lista = document.getElementById("lista");
  lista.innerHTML = "";

  for (let i = 0; i < carrito.productos.length; i++) {
    let producto = carrito.productos[i];

    let item = document.createElement("li");
    item.className = "item";

    let imagen = document.createElement("img");
    imagen.src = producto.img;
    imagen.alt = producto.name;
    imagen.classList.add("image-cart");

    let nombre = document.createElement("p");
    nombre.textContent = producto.name;

    let precio = document.createElement("p");
    precio.textContent = producto.price;

    let boton = document.createElement("button");
    boton.textContent = "Eliminar";
    boton.classList.add("boton-eliminar");
    boton.dataset.indice = i;

    boton.addEventListener("click", function () {
      let indice = this.dataset.indice;

      carrito.productos.splice(indice, 1);
      carrito.total -= Number(producto.price.replace("$", ""));

      let carritoJSON = JSON.stringify(carrito);
      window.localStorage.setItem("carrito", carritoJSON);

      lista.removeChild(item);

      Swal.fire({
        title: "",
        text: `Producto eliminado del carrito. El total es: $${carrito.total}`,
        icon: "success",
      });
    });

    item.appendChild(boton);
    item.appendChild(imagen);
    item.appendChild(nombre);
    item.appendChild(precio);

    lista.appendChild(item);
  }
  if (window.localStorage.getItem("carrito")) {
    let carritoJSON = window.localStorage.getItem("carrito");
    carrito = JSON.parse(carritoJSON);
    mostrarCarrito();
  } else {
    carrito = {
      productos: [],
      total: 0,
    };
  }
}
