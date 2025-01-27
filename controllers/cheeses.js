import express from 'express';

const router = express.Router();

//mock data
let cheeses =[
    { id: 1, name:'Marble' },
    { id: 2, name:'Camembert' }, 
    { id: 3, name:'leicester' },
] 

/**
 * @swagger
 * /cheeses:
 *   get:
 *     summary: Retrive all cheeeses
 *     responses:
 *       200:
 *         description: A list of all cheeses
 */
router.get('/',(req,res)=>{
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
router.get('/:id',(req,res)=>{
    let index = cheeses.findIndex(c=>c.id == req.params.id);    
    
    if(index ===-1){
        return res.status(404).json({msg:"Not found"});
    }
    
    return res.status(200).json(cheeses[index]);
    
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
router.post('/', (req,res)=>{
    cheeses.push(req.body);
    return res.status(201); // 201: resource created
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
router.put('/:id',(req,res)=>{
    let index = cheeses.findIndex(c=>c.id == req.params.id);    
    
    if(index ===-1){
        return res.status(404).json({msg:"Not found"});
    }

    cheeses[index].name = req.body.name;
    return res.status(204).json();// 204: resource was modified
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
router.delete('/:id',(req,res)=>{
    let index = cheeses.findIndex(c=>c.id == req.params.id);    
    
    if(index ===-1){
        return res.status(404).json({msg:"Not found"});
    }

    cheeses.splice(index, 1);
    return res.status(204).json();
});

//make controller public to rest of app 
export default router;

