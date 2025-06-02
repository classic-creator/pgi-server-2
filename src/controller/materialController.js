
import { approveMaterialRequestsByBatch, createMaterialService,getAllfactoryService,getAllMaterialRequests,getAllMaterialsService,getAllMaterialsServicebystock,getAllvendorService } from '../service/createMaterial.js'

export const createMaterial = async (req, res) => {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ 
        success: false,
        message: "Request body is missing",
        data: null
      });
    }

    const result = await createMaterialService(req.body);

    res.status(201).json({
      success: true,
      message: "Material created successfully",
      data: result
    });
  } catch (error) {
    console.error("Error creating material:", error);

    res.status(500).json({
      success: false,
      message: "Failed to create material. Please try again later.",
      error: error.message || error,
      data: null
    });
  }
};


// getall material  by stock


export const getAllMaterialsbyStock = async (req, res) => {
  try {

    const {factory_id} = req.params;
    const result = await getAllMaterialsServicebystock(factory_id);

    res.status(200).json({
      success: true,
      message: "Materials fetched successfully",
      data: result
    });
  } catch (error) {
    console.error("Error fetching materials:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch materials. Please try again later.",
      error: error.message || error,
      data: null
    });
  }
};

// get all material
export const getAllMaterials = async (req, res) => {
  try {

    const result = await getAllMaterialsService();

    res.status(200).json({
      success: true,
      message: "Materials fetched successfully",
      data: result
    });
  } catch (error) {
    console.error("Error fetching materials:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch materials. Please try again later.",
      error: error.message || error,
      data: null
    });
  }
};


export const getAllfactory = async (req, res) => {
  try {
    const result = await getAllfactoryService();

    res.status(200).json({
      success: true,
      message: "factory fetched successfully",
      data: result
    });
  } catch (error) {
    console.error("Error fetching factory:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch factory. Please try again later.",
      error: error.message || error,
      data: null
    });
  }
};

export const getAllvendor = async (req, res) => {
  try {
    const result = await getAllvendorService();

    res.status(200).json({
      success: true,
      message: "vendor fetched successfully",
      data: result
    });
  } catch (error) {
    console.error("Error fetching vendor:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch vendor. Please try again later.",
      error: error.message || error,
      data: null
    });
  }
};
//get all material request

export const getAllMaterialRequestsController = async (req, res) => {
  try {
    const {id} = req.params
    const requests = await getAllMaterialRequests(id);
    res.status(200).json(requests);
  } catch (error) {
    console.error('Error fetching material requests:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};

//approve material
export const finishMaterialRequestsForBatch = async (req, res) => {
  try {
    const {id} = req.params;  // Assuming batchId is a URL param
    const { action } = req.body;
     const user = req.user;

    if (action !== 'finish') {
      return res.status(400).json({ error: 'Unsupported action' });
    }

    const materialRequests = await approveMaterialRequestsByBatch(id, user);

    res.json({
      message: `Material requests for batch ${id} approved`,
      data: materialRequests,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
