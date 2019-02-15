export const fetchPickups = () =>
  Promise.resolve([
    { id: 0, name: "En Ruche", price: 0 },
    { id: 1, name: "Livraison à domicile", price: 900 },
    { id: 2, name: "Lulu dans ma ruche", price: 250 }
  ]);
