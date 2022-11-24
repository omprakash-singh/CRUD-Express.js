const User = require('./model');

// CREATE
exports.createNewUser = (req, res) => {
     try {
          const { name, email, about } = req.body;
          User.create({ name, email, about }, (err, todo) => {
               if (err) {
                    res.status(404).json({
                         message: "User not created",
                         Error: err.message
                    });
               } else {
                    res.status(201).json({
                         message: "User Created",
                         User: todo
                    })
               }
          });

     } catch (error) {
          res.status(500).json({
               message: 'Internal Server Error',
               Error: error.message
          })
     }
}
// Get 
exports.getUser = async (req, res) => {
     try {
          const user = await User.find();
          res.status(200).json({
               message: 'Success',
               user: user
          })
     } catch (error) {
          res.status(500).json({
               message: 'Internal Server Error',
               Error: error.message
          })
     }
}