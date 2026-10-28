const products = require('../models/ProcutsModel');


function getProducts(req, res) {
  try {
  res.json({ products: products, length: products.length });
} catch (error) {
  console.log(error);
  res.status(500).json({ message: "erreur du serveur" });
}}


function addProduct(req, res) { 
  try {
    const new_product = req.body;

    // 1. vérifier que name et price existent
    if (!new_product.name || new_product.price === undefined) {
      return res.status(400).json({ message: "name et price sont obligatoires" });
    }

    // 2. vérifier que le nom a plus de 3 caractères
    if (new_product.name.length <= 3) {
      return res.status(400).json({ message: "le nom doit contenir plus de 3 caractères" });
    }

    // 3. vérifier que le prix est un nombre positif
    if (typeof new_product.price !== "number" || new_product.price <= 0) {
      return res.status(400).json({ message: "le prix doit être un nombre positif" });
    }

    // 4. vérifier si le produit existe déjà
    const existingProduct = products.find((p) => p.name === new_product.name);

    if (existingProduct) {
      return res.status(400).json({ message: "produit existe déjà" });
    }

    // 5. vérifier le prix (800 minimum)
    if (new_product.price < 800) {
      return res.status(400).json({ message: "le prix doit être supérieur ou égal à 800" });
    }

    // 6. ajouter le produit avec un id
    const product = {
      id: products.length + 1,
      name: new_product.name,
      price: new_product.price
    };

    products.push(product);

    res.status(201).json({ message: "produit ajouté", product });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "erreur du serveur" });
  }
}

module.exports = { getProducts, addProduct};