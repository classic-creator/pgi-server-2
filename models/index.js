import sequelize from '../database/index.js';

// Model definitions
import defineMaterials from './Inventory/materials.js';
import defineCategories from './Inventory/categories.js';
import defineVariants from './Inventory/variants.js';
import defineDepartment from './Inventory/department.js';
import defineVendor from './Inventory/vendors.js';
import defineLocation from './Inventory/location.js';
import defineStock from './Inventory/stock.js';
import defineFactory_location from './Inventory/factory_location.js';
import defineRawMaterialOrder from './Order/rawmaterialorder.js';
import defineOrderStatus from './Order/orderStatues.js';
import defineJobStatus from './Production/JobStatus.js';
import defineFactoryJob from './Production/FactoryJob.js';
import defineProduct from './Production/Product.js';
import defineProductionTarget from './Production/ProductionTarget.js';
import defineProductionReview from './Production/ProductionTargetReview.js';
import defineProductVariant from './Production/ProductVariant.js';
import defineProductionTargetItems from './Production/ProductionTargetItems.js';
import defineEmployee from './Employee/employee.js';
import defineBatch from './Production/batch.js';
import MaterialRequestModel from './Inventory/materialRequest.js';
import MaterialRequestStatusModel from './Inventory/MaterialRequestStatus.js';
import defineFinished_goods from './Inventory/finished_goods.js';
import defineUser from './Employee/user.js';

// Initialize all models
const Materials = defineMaterials(sequelize);
const Categories = defineCategories(sequelize);
const Variants = defineVariants(sequelize);
const Department = defineDepartment(sequelize);
const RawMaterialOrder = defineRawMaterialOrder(sequelize);
const Vendors = defineVendor(sequelize);
const Location = defineLocation(sequelize);
const Factorys = defineFactory_location(sequelize);
const OrderStatus = defineOrderStatus(sequelize);
const Stock = defineStock(sequelize);
const Product = defineProduct(sequelize);
const ProductVarient = defineProductVariant(sequelize);
const ProductionTarget = defineProductionTarget(sequelize);
const ProductionReview = defineProductionReview(sequelize);
const FactoryJob = defineFactoryJob(sequelize);
const JobStatus = defineJobStatus(sequelize);
const ProductionTargetItems = defineProductionTargetItems(sequelize);
const Employee = defineEmployee(sequelize);
const Batch = defineBatch(sequelize);
const MaterialRequest = MaterialRequestModel(sequelize);
const MaterialRequestStatus = MaterialRequestStatusModel(sequelize);
const Finished_goods = defineFinished_goods(sequelize);
const User = defineUser(sequelize);

// Bundle models into one object
const models = {
  sequelize,
  Materials,
  Categories,
  Variants,
  Department,
  RawMaterialOrder,
  Vendors,
  Location,
  Factorys,
  OrderStatus,
  Stock,
  Product,
  ProductVarient,
  ProductionTarget,
  ProductionReview,
  FactoryJob,
  JobStatus,
  ProductionTargetItems,
  Employee,
  Batch,
  MaterialRequest,
  MaterialRequestStatus,
  Finished_goods,
  User
};

// Setup associations if defined
Object.values(models).forEach(model => {
  if (model.associate) {
    model.associate(models);
  }
});

// Connect DB
const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connected to DB');
    await sequelize.sync(); // { force: true } to reset
  } catch (err) {
    console.error('DB Connection Error:', err);
  }
};
RawMaterialOrder.hasMany(OrderStatus, {
  foreignKey: 'order_id',
  as: 'statuses'
});
OrderStatus.belongsTo(RawMaterialOrder, {
  foreignKey: 'order_id',
});

ProductionTarget.hasMany(ProductionTargetItems, {
  foreignKey: 'production_target_id',
  as: 'items',
});
ProductionTargetItems.belongsTo(ProductionTarget, {
  foreignKey: 'production_target_id',
});

export {
  connectDB,
  sequelize,
  Materials,
  Categories,
  Variants,
  Department,
  RawMaterialOrder,
  Vendors,
  Location,
  Factorys,
  OrderStatus,
  Stock,
  Product,
  ProductVarient,
  ProductionTarget,
  ProductionReview,
  FactoryJob,
  JobStatus,
  ProductionTargetItems,
  Employee,
  Batch,
  MaterialRequest,
  MaterialRequestStatus,
  Finished_goods,
  User
};
