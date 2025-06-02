
// import  {Materials}  from '../../models/index.js';


import { Categories, Variants, Department, Location, Materials, Stock, Vendors, MaterialRequestStatus, MaterialRequest, Batch, Employee, Factorys, FactoryJob } from '../../models/index.js';

export const createMaterialService = async (materialData) => {
  try {
    // Extract the names from incoming data
    const {

      categorie,     // e.g. "Metals"
      variant,      // e.g. "Type A"
      department,   // e.g. "Manufacturing"
      condition_id,
      location,     // e.g. "Warehouse 1"
      name,
      uom,
      reorder_level,
      storage_temperature
    } = materialData;

    // Fetch IDs by name from respective tables
    const categoryRecord = await Categories.findOne({ where: { category_name: categorie } });
    const variantRecord = await Variants.findOne({ where: { variant_name: variant } });
    const departmentRecord = await Department.findOne({ where: { name: department } });
    // const conditionRecord = await Condition.findOne({ where: { name: condition } });
    const locationRecord = await Location.findOne({ where: { location_name: location } });

    if (!categoryRecord || !variantRecord || !departmentRecord || !locationRecord) {
      throw new Error('One or more related records not found');
    }

    // Now create the material with these IDs
    const createdMaterial = await Materials.create({

      name,
      category_id: categoryRecord.category_id,
      variant_id: variantRecord.variant_id,
      department_id: departmentRecord.department_id,  // If your material has this field
      // condition_id: conditionRecord.id,
      location_id: locationRecord.location_id,
      condition_id,
      uom,
      reorder_level,
      storage_temperature,
    });

    return createdMaterial;
  } catch (error) {
    throw error;
  }
};

// get all material service by stock

export const getAllMaterialsServicebystock = async (factory_id) => {
  try {
    // Step 1: Get all material IDs from stock table for the factory
    const allStockEntries = await Stock.findAll({
      where: { factory_id },
      attributes: ['material_id', 'quantity_available', 'last_updated'],
      order: [['last_updated', 'DESC']]
    });

    // Keep only latest stock per material
    const stockMap = {};
    for (const stock of allStockEntries) {
      if (!stockMap[stock.material_id]) {
        stockMap[stock.material_id] = stock.quantity_available;
      }
    }

    const materialIdsInStock = Object.keys(stockMap).map(id => Number(id));

    if (materialIdsInStock.length === 0) {
      return []; // No materials in stock for this factory
    }

    // Step 2: Fetch materials whose ID is in stock
    const allMaterials = await Materials.findAll({
      where: {
        material_id: materialIdsInStock
      },
      include: [
        {
          model: Categories,
          as: 'category',
          attributes: ['category_id', 'category_name']
        },
        {
          model: Variants,
          as: 'variant',
          attributes: ['variant_id', 'variant_name']
        },
        {
          model: Location,
          as: 'location',
          attributes: ['location_id', 'location_name']
        }
      ]
    });

    // Step 3: Add latest stock to each material
    const materials = allMaterials.map(material => {
      const mat = material.toJSON();
      mat.current_stock = stockMap[material.material_id] || 0;
      return mat;
    });

    return materials;
  } catch (error) {
    throw error;
  }
};


// get all material

export const getAllMaterialsService = async () => {
  try {
    const allMaterials = await Materials.findAll({
      include: [
        {
          model: Categories,
          as: 'category',
          attributes: ['category_id', 'category_name']
        },
        {
          model: Variants,
          as: 'variant',
          attributes: ['variant_id', 'variant_name']
        },
        {
          model: Location,
          as: 'location',
          attributes: ['location_id', 'location_name']
        }
      ]
    });

    // Fetch latest stock for each material for the given factory
    const stockMap = {};
    const allStockEntries = await Stock.findAll({
      where: { factory_id },
      order: [['last_updated', 'DESC']]
    });

    for (const stock of allStockEntries) {
      if (!stockMap[stock.material_id]) {
        stockMap[stock.material_id] = stock.quantity_available;
      }
    }

    // Add latest stock to materials
    const materials = allMaterials.map(material => {
      const mat = material.toJSON();
      mat.current_stock = stockMap[material.material_id] || 0;
      return mat;
    });

    return materials;
  } catch (error) {
    throw error;
  }
};



// get vendor 

export const getAllvendorService = async () => {
  try {
    const Vendor = await Vendors.findAll();

    return Vendor;
  } catch (error) {
    throw error;
  }
};
export const getAllfactoryService = async () => {
  try {
    const Factory = await Factorys.findAll();

    return Factory;
  } catch (error) {
    throw error;
  }
};
// raw material approved
export const approveMaterialRequestsByBatch = async (batchId, user) => {
  const materialRequests = await MaterialRequest.findAll({
    where: { batch_id: batchId },
    include: [
      {
        model: Batch,
        as: 'batch',
        include: [
          {
            model: FactoryJob,
            as :'job',
            attributes: ['factory_id'], // Only fetch factory_id
          },
        ],
      },
    ],
  });

  if (!materialRequests.length) {
    throw new Error('No material requests found for this batch');
  }

  const approvedRequests = [];

  for (const mr of materialRequests) {
    // Check if already approved
    const alreadyApproved = await MaterialRequestStatus.findOne({
      where: {
        material_request_id: mr.id,
        status: 'approved',
      },
    });

    if (alreadyApproved) continue;

    // Create approval status
    await MaterialRequestStatus.create({
      material_request_id: mr.id,
      status: 'approved',
      changed_by: user.employee_id,
    });

    // Get factory_id from related Job
    const factoryId = mr.batch?.job?.factory_id;

    if (!factoryId) {
      throw new Error(`Missing factory_id for material request ID ${mr.id}`);
    }

    // Find latest stock
    const latestStock = await Stock.findOne({
      where: { material_id: mr.material_id },
      order: [['last_updated', 'DESC']],
    });

    const previousQty = latestStock ? latestStock.quantity_available : 0;
    const newQty = previousQty - 1;

    // Create new stock entry
    await Stock.create({
      factory_id: factoryId,
      material_id: mr.material_id,
      quantity_available: newQty,
      last_updated: new Date(),
    });

    approvedRequests.push(mr);
  }

  if (approvedRequests.length === 0) {
    return {
      message: 'All material requests were already approved.',
    };
  }

  return approvedRequests;
};


import { Op } from 'sequelize';

export const getAllMaterialRequests = async (factory_id) => {
  const requests = await MaterialRequest.findAll({
    include: [
      {
        model: MaterialRequestStatus,
        as: 'statuses',
        attributes: ['id'],
        required: false,
      },
      {
        model: Materials,
        as: 'material',
        attributes: ['material_id', 'name', 'department_id'],
        include: [
          {
            model: Department,
            as: 'department',
            attributes: ['department_id', 'name'],
          },
        ],
      },
      {
        model: Batch,
        as: 'batch',
        attributes: ['id', 'job_id'],
        include: [
          {
            model: FactoryJob,
            as: 'job',
            attributes: ['job_id', 'factory_id'],
           
          },
        ],
      },
      {
        model: Employee,
        as: 'employee',
        attributes: ['employee_id', 'name'],
      },
    ],
    where: {
      '$statuses.id$': { [Op.is]: null },
        '$batch.job.factory_id$': factory_id,
    },
    order: [['createdAt', 'DESC']],
  });

  const groupMap = new Map();

  for (const req of requests) {
    const batchId = req.batch_id;
    const departmentId = req.material.department_id;
    const key = `batch-${batchId}_dept-${departmentId}`;

    if (!groupMap.has(key)) {
      groupMap.set(key, {
        key,
        batch_id: batchId,
        department_id: departmentId,
        department_name: req.material.department?.name || null,
        employee_id: req.employee?.employee_id || null,
        employee_name: req.employee?.name || null,
        requests: [],
      });
    }

    groupMap.get(key).requests.push(req);
  }

  return Array.from(groupMap.values());
};
