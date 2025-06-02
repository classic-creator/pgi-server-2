import { approveMaterialRequestsByBatch } from '../service/createMaterial.js';
import {  createProductService ,createProductVarientService} from '../service/createProduct.js'

export const createProduct = async (req, res) => {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ 
        success: false,
        message: "Request body is missing",
        data: null
      });
    }

    const result = await createProductService(req.body);

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: result
    });
  } catch (error) {
    console.error("Error creating Product:", error);

    res.status(500).json({
      success: false,
      message: "Failed to create Product. Please try again later.",
      error: error.message || error,
      data: null
    });
  }
};


// create varient 

export const createProductVarient = async (req, res) => {


  try {

 const { id } = req.params;

    if (!id) {
      return res.status(400).json({ success: false, message: 'Missing parameters' });
    }

    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ 
        success: false,
        message: "Request body is missing",
        data: null
      });
    }

    const result = await createProductVarientService(id,req.body);

    res.status(201).json({
      success: true,
      message: "Product varient created successfully",
      data: result
    });
  } catch (error) {
  console.error("Error creating Product varient:", error.errors || error);

  res.status(500).json({
    success: false,
    message: "Failed to create Product varient. Please try again later.",
    error: error.errors?.[0]?.message || error.message || error,
    data: null
  });
}

  
};

//import { approveMaterialRequestsByBatch } from '../services/materialRequestService.js';




// 

