const categoriesMock = require("../mock/categories.json");
const propertiesMock = require("../mock/properties.json");
const productsMock = require("../mock/products.json");
const Category = require("../models/Category");
const Property = require("../models/Property");
const Product = require("../models/Product");

module.exports = async () => {
  const categories = await Category.find();
  if (categories.length !== categoriesMock.length) {
    await createInitialEntity(Category, categoriesMock);
  }
  const properties = await Category.find();

  if (properties.length !== propertiesMock.length) {
    await createInitialEntity(Property, propertiesMock);
  }
  // const products = await Product.find();
  // if (products.length !== productsMock.length) {
  //   await createInitialEntity(Product, productsMock);
  // }
};

async function createInitialEntity(Model, data) {
  await Model.collection.drop();
  return Promise.all(
    data.map(async (item) => {
      try {
        delete item._id;
        const newItem = new Model(item);
        await newItem.save();
        return newItem;
      } catch (error) {
        return error;
      }
    })
  );
}
