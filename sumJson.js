const objeto = {
  orders: [
    {
      id: 101,
      customer: "John Doe",
      items: [
        { product: "Laptop", quantity: 1, price: 1200 },
        { product: "Mouse", quantity: 2, price: 25 },
      ],
    },
    {
      id: 102,
      customer: "Jane Smith",
      items: [
        { product: "Phone", quantity: 1, price: 800 },
        { product: "Charger", quantity: 3, price: 20 },
      ],
    },
  ],
};

// ¿Cómo calcularías el total gastado por cada cliente utilizando JavaScript, en una línea?
const { orders } = objeto;

const totalesPorCliente = objeto.orders.map((order) => ({customer: order.customer,totalSpent: order.items.reduce((total, item) => total + item.price * item.quantity, 0),}));

totalesPorCliente.forEach((item) =>console.log(`${item.customer} gastó un total de $${item.totalSpent}`));


