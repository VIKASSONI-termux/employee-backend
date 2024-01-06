const express=require('express');
const cors=require('cors');
const mongoose=require('mongoose');
const empmodel = require('./Models/employee')
const post=require('./Models/post');
const bookmarkpost=require('./Models/bookmarkedpost');
const app=express();
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));

app.use(express.json());
app.use(cors());

mongoose.connect(
    'mongodb://0.0.0.0:27017/employeesystem'
  )
  .then(()=>console.log('connected'))
  .catch(e=>console.log(e));
    


  app.get('/api/read',(req,res)=>{
    empmodel.find({})
    .then(employees=>res.json(employees))
    .catch(err=>res.json(err))
  })


app.post('/api/insert',(req,res)=>{
    empmodel.create(req.body)
    .then(employees => res.json(employees))
    .catch(err => res.json(err))
})

app.post('/addpost', (req,res)=>{
    post.create(req.body)
    .then(posts => res.json("done"))
    .catch(err => res.json(err))
})
app.get('/getPost',(req,res)=>{
    post.find({})
    .then(posts=>res.json(posts))
    .catch(err=>res.json(err))
})
app.post('/bookmarkPost',(req,res)=>{
    console.log(req.body)
    bookmarkpost.create(req.body)
    .then(bookmarkposts => res.json("done"))
    .catch(err => res.json(err))
})
app.post('/login',(req,res)=>{
    const {empmail,emppassword}=req.body

    empmodel.findOne({email:empmail})
    .then(employee=>{
     
        if(employee){
          
            if(employee.password===emppassword){
                if(employee.status==='Active')
                {
                    res.json(employee)
                    
                }
                else{
                    res.json('Contact to Admin')
                
                }
                
            }else{
                res.json("The Password incorrect")
            }
        }else{
            res.json("No Record Existed")
        }
    })
})


app.put('/api/changeStatus/:id',(req,res)=>{
    const id=req.params.id;
    empmodel.findOne({_id:id})
    .then(employee=>{
     
        if(employee){
          
            if(employee.status==='Inactive'){
                empmodel.findOneAndUpdate({_id:id},{
                    status:'Active'
                },{new: true}).then(()=> res.json('Done')).catch(err => res.json(err))
              
                
                
            }else if(employee.status==='Active'){
                empmodel.findOneAndUpdate({_id:id},{
                    status:'Inactive'
                }, {new: true}).then(()=> res.json('Done')).catch(err => res.json(err))
              
            }
        }
    }).catch(err => res.json(err))
})

app.listen(5001,()=>{
    console.log('server Started')
})