import { ProductionTarget, ProductVarient, Product, Department, ProductionTargetItems, ProductionReview, FactoryJob, JobStatus, Batch, Materials, MaterialRequest, Finished_goods, Employee, Factorys } from '../../models/index.js';
import { Op, Sequelize } from 'sequelize';

/**
 * Create a production target with variant quantities
 * @param {{
 *   deadline: Date,
 *   sales_user_id: number,
 *   items: { product_variant_id: number, quantity: number }[]
 * }} data
 */

// create target service 

export const createProductionTargetService = async (data) => {
  const {
    deadline,
    sales_user_id,
    items,
    factory_id
  } = data;

  try {
    // Verify factory_id exists in Factorys table
    const factoryExists = await Factorys.findByPk(factory_id);
    if (!factoryExists) {
      throw new Error(`Factory with id ${factory_id} does not exist.`);
    }

    // 1. Create the production target
    const productionTarget = await ProductionTarget.create({
      deadline,
      sales_user_id,
      factory_id
    });

    // 2. Map items to add production_target_id
    const ProductionTargetitems = items.map((item) => ({
      production_target_id: productionTarget.id,
      product_variant_id: item.product_variant_id,
      quantity: item.quantity,
    }));

    // 3. Bulk insert into target_items table
    await ProductionTargetItems.bulkCreate(ProductionTargetitems);

    return { productionTarget, ProductionTargetitems };
  } catch (error) {
    throw error;
  }
};



//get all target 
export const getAllProductionTargetsService = async (factory_id) => {
  try {
    const targets = await ProductionTarget.findAll({
      where: {
        factory_id,
        id: {
          [Op.notIn]: Sequelize.literal(`(SELECT target_id FROM jobs WHERE target_id IS NOT NULL)`)
        }
      },
      include: [
        {
          model: ProductionTargetItems,
          as: 'items',
          include: [
            {
              model: ProductVarient,
              as: 'product_variant',
              include: [
                {
                  model: Product,
                  as: 'product',
                  attributes: ['name'],
                },
              ],
            },
          ],
        },
        {
          model: ProductionReview,
          as: 'status_info',
          required: false,
          attributes: ['status'],
        },
        // {
        //   model: Factorys,     // Include FactoryLocation model (make sure association is defined)
        //   as: 'factory',    // alias for association, adjust if different
        //   attributes: ['factory_location_id', 'area_name', 'floor_number', 'manager_name', 'contact_number'],
        //   required: false,
        // }
      ],
      order: [['createdAt', 'DESC']]
    });

    const formattedTargets = targets.map(target => {
      const plain = target.toJSON();

      if (!plain.status_info) {
        plain.status_info = {
          status: 'pending',
        };
      }

      return plain;
    });

    return formattedTargets;
  } catch (error) {
    throw error;
  }
};


//get all job 
export const getAllJobsWithBatchAndStatusService = async (factory_id) => {
  try {
    const jobs = await FactoryJob.findAll({
      where: {
        factory_id, // Filter jobs by factory_id
      },
      include: [
        {
          model: Batch,
          as: 'batches',
          include: [
            {
              model: ProductVarient,
              as: 'product_variant',
            },
            {
              model: JobStatus,
              as: 'statuses', // Matches Batch.hasMany alias
            },
          ],
        },
      ],
      order: [['createdAt', 'DESC']],
    });

    return jobs;
  } catch (error) {
    throw error;
  }
};


//get all batch
export const getBatchesByJobIdService = async (id) => {
  try {
    const batches = await Batch.findAll({
      where: { job_id: id },
      include: [
        {
          model: ProductVarient,
          as: 'product_variant',
        },
        {
          model: JobStatus,
          as: 'statuses',
          include: [
            {
              model: Employee,
              as: 'employee',
              attributes: ['employee_id', 'name'],
            },
          ],
        },
        {
          model: FactoryJob,
          as: 'job', // Ensure this alias matches the association in your model
          attributes: ['factory_id'],
        },
      ],
      order: [['createdAt', 'ASC']],
    });

    return batches;
  } catch (error) {
    console.error("Error fetching batches by job ID:", error);
    throw error;
  }
};

export const TargetReviewService = async (id, data) => {
  const {
    review_notes,
    status, // 'approved', 'rejected', etc.
    production_user_id
  } = data;

  try {
    // 1. Find the production target
    const productionTarget = await ProductionTarget.findByPk(id);

    if (!productionTarget) {
      throw new Error('Production target not found');
    }

    // 2. Check for existing review
    let productionReview = await ProductionReview.findOne({
      where: {
        sales_target_id: productionTarget.id
      }
    });

    if (productionReview) {
      // Update existing review
      await productionReview.update({
        review_notes,
        status,
        production_user_id
      });
    } else {
      // Create new review
      productionReview = await ProductionReview.create({
        sales_target_id: productionTarget.id,
        review_notes,
        status,
        production_user_id
      });
    }

    // 3. If approved, create job and batches if they don't exist
    let job = null;
    if (status === 'approved') {
      const existingJob = await FactoryJob.findOne({
        where: { target_id: productionTarget.id }
      });

      if (!existingJob) {
        job = await FactoryJob.create({
          target_id: productionTarget.id,
          status: 'approved',
          assigned_to: null,
          scheduled_end: productionTarget.deadline,
          factory_id: productionTarget.factory_id, 
        });

        // Get the target items related to this production target
        const targetItems = await ProductionTargetItems.findAll({
          where: { production_target_id: productionTarget.id }
        });

        // Group by product_variant_id
        const groupedItems = {};
        for (const item of targetItems) {
          const variantId = item.product_variant_id;
          if (!groupedItems[variantId]) {
            groupedItems[variantId] = 0;
          }
          groupedItems[variantId] += item.quantity;
        }

        // Create batches: 7 units per batch
        const batchData = [];
        for (const [variantId, totalQty] of Object.entries(groupedItems)) {
          let remaining = totalQty;
          while (remaining > 0) {
            batchData.push({
              job_id: job.job_id,
              product_variant_id: parseInt(variantId), // ✅ make sure this is a number
              quantity: Math.min(7, remaining),         // ✅ make sure this is a number
            });
            remaining -= 7;
          }
        }

        // Bulk insert batches
        await Batch.bulkCreate(batchData);
      }
    }

    return {
      message: 'Review processed successfully',
      review: productionReview,
      job: job || 'Job already exists or not required'
    };
  } catch (error) {
    throw error;
  }
};



const STEP_SEQUENCE = [
  'Line Up',
  'cnc',
  'fabrication and grinding',
  'powder coating and treatment plant',
  'engine and canopy assembling',
  'rockwool and foam fitting',
  'electrical and panel',
  'testing',
  'ready to dispatch'
];

const STEP_TO_DEPARTMENT = {
  'Line Up': 'production',
  'cnc': 'cnc',
  'fabrication and grinding': 'fabrication and grinding',
  'powder coating and treatment plant': 'powder coating and treatment plant',
  'engine and canopy assembling': 'engine and canopy assembling',
  'rockwool and foam fitting': 'rockwool and foam fitting',
  'electrical and panel': 'electrical and panel',
  'testing': 'testing',
  'ready to dispatch': 'production',
};



export const TrackWorkFlowService = async (batchId, action, user) => {
  if (action !== 'finish') {
    throw new Error('Unsupported action');
  }

  const latestStatus = await JobStatus.findOne({
    where: { batch_id: batchId },
    order: [['id', 'DESC']],
  });

  const normalize = (str) => str?.toLowerCase().trim();
  const currentStep = latestStatus ? latestStatus.status : 'Line Up';
  const currentIndex = STEP_SEQUENCE.findIndex(
    (step) => normalize(step) === normalize(currentStep)
  );
  if (currentIndex === -1) {
    throw new Error(`Invalid current step: ${currentStep}`);
  }

  const departmentRequired = STEP_TO_DEPARTMENT[currentStep];
  const department = await Department.findByPk(user.department_id);
  if (!department) throw new Error('Department not found for the user');

  if (
    user.role !== 'admin' &&
    (!['manager', 'supervisor'].includes(user.role) ||
      department.name !== departmentRequired)
  ) {
    throw new Error(
      `Unauthorized: Only ${departmentRequired} manager or supervisor can update this step`
    );
  }

  if (currentIndex === STEP_SEQUENCE.length - 1) {
    return { message: 'Job already at final step', step: currentStep };
  }

  const nextStep = STEP_SEQUENCE[currentIndex + 1];

  const newStatus = await JobStatus.create({
    batch_id: batchId,
    status: nextStep,
    created_by: user.employee_id,
  });

  const nextDepartmentName = STEP_TO_DEPARTMENT[nextStep];
  if (!nextDepartmentName) {
    throw new Error(`No department mapped for step: ${nextStep}`);
  }

  const departmentForMaterial = await Department.findOne({
    where: { name: nextDepartmentName },
  });

  const materials = await Materials.findAll({
    where: { department_id: departmentForMaterial.department_id },
  });

  const materialRequestCreates = materials.map((material) =>
    MaterialRequest.create({
      batch_id: batchId,
      material_id: material.material_id,
      requested_by: user.employee_id,
    })
  );
  await Promise.all(materialRequestCreates);

  //  If status is "Ready to Dispatch", create finished goods record
  if (nextStep === 'ready to dispatch') {
    const job = await Batch.findOne({ where: { id: batchId } });

    if (!job) {
      throw new Error('Job not found for this batch');
    }

    const existingFinishedGood = await Finished_goods.findOne({
      where: { variant_id: job.product_variant_id },
    });

    if (existingFinishedGood) {
      existingFinishedGood.quantity += job.quantity;
      existingFinishedGood.completion_date = new Date();
      await existingFinishedGood.save();
    } else {
      await Finished_goods.create({
        // job_id: job.job_id,
        name: job.name,
        quantity: job.quantity,
        completion_date: new Date(),
        variant_id: job.product_variant_id,
      });
    }
  }


  return newStatus;
}

// finish goods 

export const getAllFinishedGoodsWithVariantService = async () => {
  const goods = await Finished_goods.findAll({
    include: [
      {
        model: ProductVarient,
        as: 'variant',
        required: true,
        include: [
          {
            model: Product,
            as: 'product',   // alias for product association (make sure it's defined in your model)
            attributes: ['name'], // fetch only product name
            required: true,
          }
        ],
      },
    ],
  });
  return goods;
};
