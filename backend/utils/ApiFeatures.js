class ApiFeatures {
  constructor(query, queryStr) {
    this.query = query
    this.queryStr = queryStr
  }

  search() {
    const search = this.queryStr.search
      ? {
          name: {
            $regex: this.queryStr.search,
            $options: 'i',
          },
        }
      : {}

    this.query = this.query.find({ ...search })
    return this
  }

  filter() {
    const queryCopy = { ...this.queryStr }

    // Fields to remove that are not part of filtering
    const removeFields = ['search', 'page', 'limit']
    removeFields.forEach((key) => delete queryCopy[key])

    // Category filter
    if (queryCopy.category) {
      const category = queryCopy.category.split(',').map((cat) => cat.trim())
      queryCopy.category = { $in: category }
    }

    // Apply filter to query
    this.query = this.query.find(queryCopy)

    return this
  }

  pagination(resultPerPage = 8) {
    const currentPage = Number(this.queryStr.page) || 1
    const skip = resultPerPage * (currentPage - 1)
    this.query = this.query.limit(resultPerPage).skip(skip)
    return this
  }
}

module.exports = ApiFeatures
