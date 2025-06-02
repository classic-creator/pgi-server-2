import { MaterialRequest, MaterialRequestStatus, Product, ProductVarient } from '../../models/index.js'
export const createProductService = async (productData) => {
    try {
        // Extract the names from incoming data
        const {
// id,
            name,     // e.g. "Metals"
            description,      // e.g. "Type A"
            category,   // e.g. "Manufacturing"

        } = productData;


        // Now create the material with these IDs
        const createProduct = await Product.create({
// id,
            name,
            description,
            category
        });

        return createProduct;
    } catch (error) {
        throw error;
    }
};


// product varient
export const createProductVarientService = async (product_id,productVarientData) => {
    try {
        const {

            model,     // e.g. "Metals"
            kva,      // e.g. "Type A"
            kw,
            phase,
            voltage,
            frequency,
            fuel_type,
            cooling_type,
            enclosure,
           


            // e.g. "Manufacturing"

        } = productVarientData;
const generateSKU = (model, kva, voltage) => {
  return `KIR-${model}-${kva}KVA-${voltage}PHASE-${phase}`;
};
const sku = generateSKU(model, kva, voltage);

    const product = await Product.findOne({ where: { id: product_id} });

        const createProductVarient = await ProductVarient.create({
            product_id:product.id,
            model,    
            kva,      
            kw,
            phase,
            voltage,
            frequency,
            fuel_type,
            cooling_type,
            enclosure,
            sku
           
        });

        return createProductVarient;
    } catch (error) {
        throw error;
    }
};

// approve product 

