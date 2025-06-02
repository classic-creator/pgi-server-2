


import { RawMaterialOrder, Materials, Vendors, Factorys, OrderStatus, Stock } from '../../models/index.js';
import { Op } from 'sequelize';
import { literal } from 'sequelize';


//create order
export const createRawMaterialOrder = async (materialData) => {
  try {
    // Extract the names from incoming data
    const {

      material,     // e.g. "Metals"
      vendor,      // e.g. "Type A"
      factory,   // e.g. "Manufacturing"
      full_amount,     // e.g. "Warehouse 1"
      advance_payment,
      quantity

    } = materialData;

    // Fetch IDs by name from respective tables
    const materialRecord = await Materials.findOne({ where: { name: material } });
    const vendorsRecord = await Vendors.findOne({ where: { name: vendor } });
    const factoryRecord = await Factorys.findOne({ where: { factory_location_id: factory } });

    if (!materialRecord || !vendorsRecord || !factoryRecord) {
      throw new Error('One or more related records not found');
    }

    // Now create the material with these IDs
    const createOrder = await RawMaterialOrder.create({

      material_id: materialRecord.material_id,
      vendor_id: vendorsRecord.vendor_id,
      factory_id: factoryRecord.factory_location_id,  // If your material has this field
      full_amount,
      advance_payment,
      quantity

    });


    await OrderStatus.create({
      order_id: createOrder.id,   // or newOrder.material_id if your PK is material_id
      step: 'order',           // default first step
      time: new Date()         // current date and time
    });
    return createOrder;
  } catch (error) {
    throw error;
  }
};
// get order service 

export const getAllMaterialOrders = async (factory_id) => {
  try {
    const formatted = await RawMaterialOrder.findAll({
      include: [
        { model: Materials, as: 'material', attributes: ['name'] },
        { model: Vendors, as: 'vendor', attributes: ['name'] },
        {
          model: Factorys,
          as: 'factory',
          attributes: ['factory_location_id', 'area_name']
        },
        {
          model: OrderStatus,
          as: 'statuses',
          attributes: ['step', 'createdAt'],
          separate: true,
          order: [['createdAt', 'ASC']]
        }
      ],
      where: {
          factory_id,
        id: {
          [Op.notIn]: literal(`(
            SELECT order_id FROM order_statuses WHERE step = 'done'
          )`)
        }
      },
      order: [['createdAt', 'DESC']]
    });

    const orders = formatted.map(order => {
      const statuses = order.statuses.map(status => ({
        status: status.step,
        createdAt: status.createdAt
      }));

      const latestStep = statuses.length > 0
        ? statuses[statuses.length - 1].status
        : 'Pending';

      return {
        key: order.id,
        order_id: `ORD-${1000 + order.id}`,
        material: order.material?.name || 'Unknown',
        vendor: order.vendor?.name || 'N/A',
        factory: order.factory
          ? {
              factory_location_id: order.factory.factory_location_id,
              area_name: order.factory.area_name
            }
          : null,
        quantity: order.quantity,
        full_amount: order.full_amount,
        advance_payment: order.advance_payment,
        rejectQuantity: order.rejectQuantity ?? 0,
        date: order.createdAt.toISOString().split('T')[0],
        status: latestStep,
        statuses
      };
    });

    return orders;
  } catch (error) {
    console.error('Error fetching orders with status:', error);
    throw error;
  }
};



// update order status 
// update order status 
const STEP_SEQUENCE = ['order', 'delivered', 'quality check', 'quantity check', 'store', 'done'];

export const updateOrderStatus = async (orderId, action) => {
  if (action !== 'finish') {
    throw new Error('Unsupported action');
  }

  // Find latest status
  const latestStatus = await OrderStatus.findOne({
    where: { order_id: orderId },
    order: [['id', 'DESC']],
  });

  const currentStep = latestStatus ? latestStatus.step : 'order';
  const currentIndex = STEP_SEQUENCE.indexOf(currentStep);

  if (currentIndex === -1) {
    throw new Error(`Invalid current step: ${currentStep}`);
  }

  // Already finished
  if (currentIndex === STEP_SEQUENCE.length - 1) {
    return {
      message: 'Order already at final step, stock updated',
    };
  }

  const nextStep = STEP_SEQUENCE[currentIndex + 1];

  // Special case: 'store' -> 'done' = update stock
  if (currentStep === 'store' && nextStep === 'done') {
    const materialOrder = await RawMaterialOrder.findOne({ where: { id: orderId } });

    if (!materialOrder) {
      throw new Error(`Material not found for order ID: ${orderId}`);
    }

    const { material_id, quantity, factory_id } = materialOrder;

    if (!factory_id) {
      throw new Error(`Factory ID missing in order ID: ${orderId}`);
    }

    const existingStock = await Stock.findOne({
      where: { factory_id, material_id },
      order: [['last_updated', 'DESC']],
    });

    if (existingStock) {
      // Update quantity
      existingStock.quantity_available += quantity;
      existingStock.last_updated = new Date();
      await existingStock.save();
    } else {
      // Create new stock entry
      await Stock.create({
        factory_id,
        material_id,
        quantity_available: quantity,
        last_updated: new Date(),
      });
    }
  }

  // Create next step in status
  await OrderStatus.create({
    order_id: orderId,
    step: nextStep,
    time: new Date(),
  });

  return {
    message: `Order moved to next step: ${nextStep}`,
  };
};
