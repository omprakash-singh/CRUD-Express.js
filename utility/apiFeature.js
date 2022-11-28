class APIFeatures {
     constructor(query, queryString) {
          this.query = query;
          this.queryString = queryString;
     }
     filter() {
          const qObj = { ...this.queryString };
          const excludeField = ['page', 'sort', 'limit', 'fields'];
          excludeField.forEach(el => delete qObj[el]);
          let queryStr = JSON.stringify(qObj);
          queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`)

          this.query.find(JSON.parse(queryStr));
          return this;
     }
     sort() {
          // Sorting 
          if (this.queryString.sort) {
               const sortBy = req.query.sort.split(',').join(' ');
               this.query = this.query.sort(sortBy);
          } else {
               this.query = this.query.sort('-createdAt');
          }
          return this;
     }
     limitField() {
          // Field limition
          if (this.queryString.fields) {
               const field = this.queryString.fields.split(',').join(' ');
               query = query.select(field);
          } else {
               this.query = this.query.select('-__v');
          }
          return this;
     }
     paginate() {
          // Pagination
          const page = this.queryString.page * 1 || 1;
          const limit = this.queryString.limit * 1 || 100;
          const skip = (page - 1) * limit;
          this.query = this.query.skip(skip).limit(limit);

          return this;
     }
};

module.exports = APIFeatures;