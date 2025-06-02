
import { createRawMaterialOrder,updateOrderStatus , getAllMaterialOrders} from '../service/createRawMaterialOrder.js'
//create order
export const RawMaterialOrder = async (req, res) => {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ 
        success: false,
        message: "Request body is missing",
        data: null
      });
    }

    const result = await createRawMaterialOrder(req.body);

    res.status(201).json({
      success: true,
      message: "Order created successfully",
      data: result
    });
  } catch (error) {
    console.error("Error creating Order:", error);

    res.status(500).json({
      success: false,
      message: "Failed to create Order. Please try again later.",
      error: error.message || error,
      data: null
    });
  }
};
//get  order 
export const getMaterialOrders = async (req, res) => {
  try {
    const {id} = req.params;
    const result = await getAllMaterialOrders(id);

    res.status(200).json({
      success: true,
      message: "Order fetched successfully",
      data: result
    });
  } catch (error) {
    console.error("Error fetching Order:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch Order. Please try again later.",
      error: error.message || error,
      data: null
    });
  }
};
//track order 


export const TrackOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const { action } = req.body; // e.g. { action: "finish" }

    if (!id || !action) {
      return res.status(400).json({ success: false, message: 'Missing parameters' });
    }

    const updatedStatus = await updateOrderStatus(id, action);

    res.status(200).json({
      success: true,
      message: 'Order status updated',
      data: updatedStatus,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to update status',
    });
  }
};
