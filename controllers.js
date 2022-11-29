const User = require('./model'),
     APIFeatures = require('./utility/apiFeature'),
     AppError = require('./utility/appError'),
     catchAsync = require('./utility/catchAsync');

// CREATE
exports.createNewUser = catchAsync(async (req, res, next) => {
     const { name, email, about } = req.body;
     User.create({ name, email, about }, (err, todo) => {
          if (err) {
               return next(new AppError('No user created!.', 404));
          } else {
               res.status(201).json({
                    status: 'success',
                    message: "User Created",
                    User: todo
               })
          }
     });
});

// Get 
exports.getUser = catchAsync(async (req, res, next) => {
     const user = await User.find().select('-__v').select('-_id');
     res.status(200).json({
          message: 'Success',
          result: user.length,
          data: {
               user
          }
     })
});

// Get User By email

exports.getUserByEmail = catchAsync(async (req, res, next) => {
     const email = req.query.email;
     console.log(email);
     await User.find({ email: email }, (err, todo) => {
          if (err) {
               return next(new AppError(`${err.message}`, 404));
          } else {
               if (!todo.length) {
                    return next(new AppError('No user found!.', 404));
               } else {
                    res.status(200).json({
                         status: "success",
                         result: todo.length,
                         data: {
                              todo
                         }
                    })
               }
          }
     })
});

// patch user
// PATCH does partial update e.g. Fields that need to be updated by the client, only that field is updated without modifying the other field.
exports.userUpdata = catchAsync(async (req, res, next) => {
     // The findOneAndUpdate searches the document and updates just the entries in the given update document. The other entries in the found document will remain.
     const user = await User.findOneAndUpdate({ email: req.query.email }, req.body, {
          new: true,
          runValidators: true
     });
     if (!user) {
          return next(new AppError('No user found!.', 404));
     }
     res.status(200).json({
          status: 'success',
          user: user
     });
});

// PUT user
// PUT is a method of modifying resources where the client sends data that updates the entire resource. PUT is similar to POST in that it can create resources, but it does so when there is a defined URL wherein PUT replaces the entire resource if it exists or creates new if it does not exist.

exports.putUser = catchAsync(async (req, res, next) => {
     // The findOneAndReplace searches the document, removes everything inside this document and sets the entries of the given replacement document
     //  Remove data 
     // const user = await User.findOneAndReplace({ email: req.query.email }, {
     //      name: name,
     //      email: email,
     //      about: about
     // }, {
     //      returnDocument: true
     // });

     const user = await User.findOneAndReplace({ email: req.query.email }, req.body);
     if (!user) {
          return next(new AppError('No user that email', 404));
     }
     res.status(200).json({
          status: 'success',
          user: user
     });
});

// Delete user
exports.deleteUser = catchAsync(async (req, res, next) => {
     const _id = req.query.id;
     const user = await User.findByIdAndDelete(_id);
     if (!user) {
          return next(new AppError('No user this email!.', 404));
     }
     res.status(200).json({
          status: 'success',
          message: 'User is delete',
          DeletedUser: { user }
     });
});

exports.filter = catchAsync(async (req, res, next) => {
     const features = new APIFeatures(User.find(), req.query).filter().sort().limitField().paginate();

     const user = await features.query;
     if (!user.length) {
          return next(new AppError('No User found!.', 404));
     }

     res.status(200).json({
          status: 'success',
          result: user.length,
          data: {
               user
          }
     })
});