import express from 'express';
//model reference
import Cheese from '../models/cheese.js';

const router = express.Router();

//mock data
//let cheeses = [
//{ id: 1, name:'Marble' },
//{ id: 2, name:'Camembert' }, 
//  { id: 3, name:'leicester' },
//];

/**
 * @swagger
 * /cheeses:
 *   get:
 *     summary: Retrive all cheeeses
 *     responses:
 *       200:
 *         description: A list of all cheeses
 */
router.get('/', async (req,res)=>{
    //use cheese model to fetch all documentd from cheeses collection in db
        let cheeses = await Cheese.find();
        if(!cheeses){
            return res.status(204).json({err: 'Not Results'});
        }
        return res.status(200).json(cheeses);
    
    
});

/**
 *  @swagger
 *  /api/v1/cheeses/{id}:
 *    get:
 *      summary: Find cheese by its id
 *      parameters:
 *        - name: id
 *          in: path
 *          schema:
 *            type: integer
 *            required: true
 *      responses:
 *        200:
 *          description: Returns a single cheese
 *        404: 
 *          description: Not found 
 */
router.get('/:id',async (req,res)=>{
    let cheese = await Cheese.findById(req.params.id);

    if(!cheese){
        return res.status(404).json({msg:'Not Found'});
    }

    return res.status(200).json(cheese);    
});

/**
 *  @swagger
 *  /api/v1/cheeses:
 *    post:
 *      summary: add new chese from POST body
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                id:
 *                  type: integer
 *                name:
 *                  type: string
 *      responses:
 *        201:
 *          description: Resources created
 *        400:
 *          description: Bad request    
 */
router.post('/', async (req,res)=>{
    try{
        await Cheese.create(req.body);
        return res.status(201); // 201: resource created
    }
    catch(err){
        return res.status(400).json({err: `Bad Request ${err}`});
    }
});


/**
 *  @swagger
 *  /api/v1/cheeses/{id}:
 *    put:
 *      summary: update selected cheese from request body
 *      parameters:
 *        -name: id
 *        in: path
 *        required: true
 *        schema: 
 *          type: integer 
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                id:
 *                  type: integer
 *                name:
 *                  type: string
 *      responses:
 *        204:
 *          description: Resource updated
 *        400:
 *          description: Bad request
 *        404:
 *          description: Not Found
 */
router.put('/:id',async(req,res)=>{
    try{
        let cheese = await Cheese.findById(req.params.id);  
        
        if(!cheese){
            return res.status(404).json({msg:"Not found"});
        }
        if(req.params.id != req.body._id){
            return res.status(400).json({msg:"Bad Request"});
        }
        
        await Cheese.findByIdAndUpdate(req.params.id, req.body);
        return res.status(204).json();// 204: resource was modified
    }
    catch(err){
        return res.status(400).json({err:`Bad Request: ${err}`});
    }
});

/**
 *  @swagger
 *  /api/v1/cheeses/{id}:
 *    delete:
 *      summary: remove selected cheese by its id
 *      parameters:
 *        - name: id
 *          in: path
 *          schema:
 *            type: integer
 *            required: true
 *      responses:
 *        204:
 *          description: Resource updated(removed)
 *        404: 
 *          description: Not found 
 */
router.delete('/:id',async(req,res)=>{
    let cheese = await Cheese.findById(req.params.id);

    if(!cheese){
        return res.status(404).json({msg:'Not Found'});
    }

    await Cheese.findByIdAndDelete(req.params.id);
    return res.status(204).json();
});

//make controller public to rest of app 
export default router;

