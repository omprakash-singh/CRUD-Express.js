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

// Get User By email

exports.getUserByEmail = async (req, res) => {
     try {
          const email = req.query.email;
          console.log(email);
          await User.find({ email: email }, (err, todo) => {
               if (err) {
                    res.status(204).json({
                         status: 'Fail',
                         message: err.message
                    });
               } else {
                    if (!todo.length) {
                         return res.status(400).json({
                              status: 'Fail',
                              message: 'User Not Found'
                         })
                    } else {
                         res.status(200).json({
                              status: "success",
                              message: todo
                         })
                    }
               }
          })

     } catch (error) {
          res.status(500).json({
               message: 'Internal Server Error',
               Error: error.message
          })
     }
}

// patch user
// PATCH does partial update e.g. Fields that need to be updated by the client, only that field is updated without modifying the other field.
exports.userUpdata = async (req, res) => {
     try {
          // The findOneAndUpdate searches the document and updates just the entries in the given update document. The other entries in the found document will remain.
          const user = await User.findOneAndUpdate({ email: req.query.email }, req.body, {
               new: true,
               runValidators: true
          });
          if (user === null) {
               return res.status(400).json({
                    status: 'Fail',
                    message: "user not find.."
               });
          }
          res.status(200).json({
               status: 'success',
               user: user
          });


     } catch (error) {
          res.status(404).json({
               message: 'Internal Server Error',
               Error: error.message
          })
     }
}

// PUT user
// PUT is a method of modifying resources where the client sends data that updates the entire resource. PUT is similar to POST in that it can create resources, but it does so when there is a defined URL wherein PUT replaces the entire resource if it exists or creates new if it does not exist.

exports.putUser = async (req, res) => {
     try {
          // The findOneAndReplace searches the document, removes everything inside this document and sets the entries of the given replacement document
          //  Remove data 
          // const user = await User.findOneAndReplace({ email: req.query.email }, {
          //      name: name,
          //      email: email,
          //      about: about
          // }, {
          //      returnDocument: true
          // });

          const user = await User.findOneAndUpdate({ email: req.query.email }, req.body);
          if (!user) {
               return res.status(400).json({
                    status: 'Fail',
                    message: "user not find.."
               });
          }
          res.status(200).json({
               status: 'success',
               user: user
          });

     } catch (error) {
          res.status(404).json({
               message: 'Internal Server Error',
               Error: error.message
          })
     }
}

// Delete user
exports.deleteUser = async (req, res) => {
     try {
          const _id = req.query.id;
          const user = await User.findByIdAndDelete(_id);
          if (!user) {
               return res.status(400).json({
                    status: 'Fail',
                    message: "user not find.."
               });
          }
          res.status(200).json({
               status: 'success',
               message: 'User is delete',
               DeletedUser: { user }
          });


     } catch (error) {
          res.status(404).json({
               message: 'Internal Server Error',
               Error: error.message
          })
     }
}