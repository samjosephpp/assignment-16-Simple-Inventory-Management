let products = [];
let currentId = 1;


// to get all products
const getProducts = (req, res) => {
   
  const { page = 1, limit = 10 } = req.query; // Default values: page 1, limit 10
  // find the starting and ending indices
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  // Slice the customers array to get the paginated data
  const paginatedProducts = products.slice(startIndex, endIndex);

  res.status(200).json({
      page: parseInt(page),
      limit: parseInt(limit),
      totalProducts: products.length,
      totalPages: Math.ceil(products.length / limit),
      data: paginatedProducts
  }); 
}

// to get single product
const getProductById = (req, res) => {
  const id = req.params.id;
  const product = products.find(product => product.id === parseInt(id));
  if (!product) {
    return res.status(404).json({ message: `Product with id ${id} not found` });
  }
  res.status(200).json(product);
}

// to create new product
const createProduct = (req, res) => { 
    const { name, price, description , stockQty } = req.body;
    if (!name || !price || !description) {
        return res.status(400).json({ message: "Please provide name, price and description" });
    }
    if(products.find(product => product.name === name)){
        return res.status(400).json({ message: `Product with name ${name} already exists` });
    }
    try {
        const product = {
            id: currentId++,
            name,
            price,
            description,
            stockQty
        };
        products.push(product);
        res.status(201).json({data: product, message: "Product created successfully"});
     
    } catch (error) {
        next(error);
    }
 
}

// to update existing product
const updateProduct = (req, res) => {
    const id = req.params.id;
    const { name, price, description, stockQty } = req.body;
    const product = products.find(product => product.id === parseInt(id));
    if (!product) {
        return res.status(404).json({ message: `Product with id ${id} not found` });
    }   
    if (!name || !price || !description) {
        return res.status(400).json({ message: "Please provide name, price and description" });
    }   
    try {
        const updatedProduct = { id: parseInt(id), name, price, description , stockQty };
        products = products.map(product => product.id === parseInt(id) ? updatedProduct : product);
        res.status(200).json({data: updatedProduct, message: "Product updated successfully"});
    } catch (error) {
        next(error);
    }   
}

// to delete existing product
const deleteProduct = (req, res) => {
    const id = req.params.id;
    const product = products.find(product => product.id === parseInt(id));
    if (!product) {
        return res.status(404).json({ message: `Product with id ${id} not found` });
    }
    products = products.filter(product => product.id !== parseInt(id));
    res.status(200).json({ message: `Product with id ${id} deleted successfully` });
}

module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
}