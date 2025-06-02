import { createProductionTargetService,getAllFinishedGoodsWithVariantService,getAllJobsWithBatchAndStatusService,getAllProductionTargetsService,getBatchesByJobIdService,TargetReviewService,TrackWorkFlowService } from '../service/CreateProductionLine.js';


// create target
export const createTarget = async (req, res) => {
  try {
    const {factory_id, deadline, sales_user_id, items } = req.body;

    // Basic validation
    if (!deadline || !sales_user_id || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields: 'deadline', 'sales_user_id', or 'items'.",
        data: null
      });
    }

    // Validate each item
    for (const item of items) {
      if (!item.product_variant_id || typeof item.quantity !== 'number') {
        return res.status(400).json({
          success: false,
          message: "Each item must include 'product_variant_id' and a numeric 'quantity'.",
          data: null
        });
      }
    }

    // Call the service
    const result = await createProductionTargetService({ deadline, sales_user_id, items ,factory_id});

    return res.status(201).json({
      success: true,
      message: "Production target created successfully.",
      data: result
    });
  } catch (error) {
    console.error("Error creating production target:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create production target. Please try again later.",
      error: error.message || error,
      data: null
    });
  }
};

//get all target 

// get all targets
export const getAllTargets = async (req, res) => {
  try {
    const {id} = req.params
    const targets = await getAllProductionTargetsService(id);

    return res.status(200).json({
      success: true,
      message: "All production targets fetched successfully.",
      data: targets
    });
  } catch (error) {
    console.error("Error fetching production targets:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch production targets. Please try again later.",
      error: error.message || error,
      data: null
    });
  }
};
//get all job 
export const getAllJobsWithBatchAndStatus = async (req, res) => {
  try {
    const {id} = req.params;
    const jobs = await getAllJobsWithBatchAndStatusService(id);

    return res.status(200).json({
      success: true,
      message: 'All jobs with batch and status details fetched successfully.',
      data: jobs,
    });
  } catch (error) {
    console.error('Error fetching jobs with batch and status details:', error);

    return res.status(500).json({
      success: false,
      message: 'Failed to fetch jobs. Please try again later.',
      error: error.message || error,
      data: null,
    });
  }
};

//get all batch
export const getBatchesByJobId = async (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({
      success: false,
      message: 'Missing job ID.',
      data: null,
    });
  }

  try {
    const data = await getBatchesByJobIdService(id);
    res.json({
      success: true,
      message: 'Batches fetched successfully.',
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch batches.',
      error: error.message || error,
      data: null,
    });
  }
};


// target review  

export const TargetReview = async (req, res) => {
  try {
    const { id } = req.params;


    // Basic validation
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Missing id",
        data: null
      });
    }

 
    // Call the service
    const result = await TargetReviewService( id, req.body);

    return res.status(201).json({
      success: true,
      message: "Review Update successfully.",
      data: result
    });
  } catch (error) {
    console.error("Error creating production review:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to review production target. Please try again later.",
      error: error.message || error,
      data: null
    });
  }
};



export const workflowTracking = async (req, res) => {
  try {
    const { id } = req.params;
    const { action } = req.body;
    const user = req.user;
    if (!id || !action || !user) {
      return res.status(400).json({ success: false, message: 'Missing parameters' });
    }

    const updatedStatus = await TrackWorkFlowService(id, action,user); // pass logged-in user

    res.status(200).json({
      success: true,
      message: 'Order status updated',
      data: updatedStatus,
    });
  } catch (error) {
    res.status(403).json({
      success: false,
      message: error.message || 'Failed to update status',
    });
  }
};
// get finish goods 

export const getAllFinishedGoodsWithVariant = async (req, res) => {
  try {
    const finishedGoods = await getAllFinishedGoodsWithVariantService();
    res.json(finishedGoods);
  } catch (error) {
    console.error('Error fetching finished goods:', error);
    res.status(500).json({ error: error.message });
  }
};
