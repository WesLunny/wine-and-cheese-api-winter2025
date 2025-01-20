import express from 'express';

const router = express.Router();

//mock data
let cheeses =[
    { id: 1, name:'Marble' },
    { id: 2, name:'Camembert' }, 
    { id: 3, name:'leicester' },
] 

// GET: return all cheeses

router.get('/',(req,res)=>{
    return res.status(200).json(cheeses);
});

// GET: return a cheese {id}
router.get('/:id',(req,res)=>{
    let index = cheeses.findIndex(c=>c.id == req.params.id);    
    
    if(index ===-1){
        return res.status(404).json({msg:"Not found"});
    }
    
    return res.status(200).json(cheeses[index]);
    
});

//POST: add a new cheese
router.post('/', (req,res)=>{
    cheeses.push(req.body);
    return res.status(201); // 201: resource created
});

//PUT: {id} update selected cheese
router.put('/:id',(req,res)=>{
    let index = cheeses.findIndex(c=>c.id == req.params.id);    
    
    if(index ===-1){
        return res.status(404).json({msg:"Not found"});
    }

    cheeses[index].name = req.body.name;
    return res.status(204).json();// 204: resource was modified
});

//DELETE
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

