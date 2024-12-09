const objeto ={
  "products": [
    {"id": 1, "name": "Laptop", "price": 1200},
    {"id": 2, "name": "Phone", "price": 800},
    {"id": 3, "name": "Tablet", "price": 600}
  ]
}

// ¿Cómo podrías extraer solo los nombres de los productos utilizando una línea de código en JavaScript?

const { products } = objeto

products.forEach((item)=>console.log(item.name))
