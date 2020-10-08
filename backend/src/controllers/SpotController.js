const Spot = require('../models/Spot');
const User = require('../models/User');

module.exports = {
    async index(req,res){
        const { tech } = req.query;
        
        let spot = await Spot.find({techs: tech});

        return res.json(spot);
    },
    async store(req,res){
       const { filename } = req.file;
       const {company, price, techs} = req.body;
       const { user_id} = req.headers


       let user = await User.findById(user_id);

       if(!user){
           return res.status(400).send("User not Found");
       }

       let spot = await Spot.create({
           thumbnail: filename,
           user: user_id,
           company,
           price,
           techs: techs.split(',').map(techs => techs.trim())
       })

       return res.json(spot);

    },
    async destroy(req,res){
        const { user_id } = req.headers;
        const { spot_id } = req.params;
       
        const spot = await Spot.findById(spot_id)
        if(spot.user == user_id){
            let response = await Spot.deleteOne({_id: spot_id})
            return res.json(response);
        }else{
           return res.json({message: "not Allowed Operation"});
        }

    }
}