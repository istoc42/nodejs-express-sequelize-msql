const { tutorials } = require('../models')
const db = require('../models')
const Tutorial = db.tutorials
const Op = db.Sequelize.Op

// Create and Save a new Tutorial
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: 'Content can not be empty!',
    })
    return
  }

  // Create a tutorial
  const tutorial = {
    title: req.body.title,
    description: req.body.description,
    published: req.body.published ? req.body.published : false,
  }

  // Save tutorial in the database
  Tutorial.create(tutorial)
    .then((data) => {
      res.send(data)
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occured while creating the Tutorial',
      })
    })
}
// Retrieve all Tutorials from the database
exports.findAll = (req, res) => {
  const title = req.query.title
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null

  Tutorial.findAll({ where: condition })
    .then((data) => {
      res.send(data)
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occured while retrieveing tutorials',
      })
    })
}

// Find a single Tutorial with an ID
exports.findOne = (req, res) => {
  const id = req.params.id

  Tutorial.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data)
      } else {
        res.status(404).send({
          message: `Cannot find tutorial with id=${id}`,
        })
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error retrieving Tutorial with id=' + id,
      })
    })
}

// Update a Tutorial by the ID in the request
exports.update = (req, res) => {
  const id = req.params.id

  Tutorial.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: 'Tutorial was updated successfully',
        })
      } else {
        res.send({
          message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found or req.body is empty!`,
        })
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error updating Tutorial with id=' + id,
      })
    })
}

// Delete a Tutorial with a specific ID from the database
exports.delete = (req, res) => {
  const id = req.params.id

  Tutorial.destroy({
    where: { id: id },
  }).then((num) => {
    if (num == 1) {
      res.send({
        message: 'Tutorial was deleted successfully!',
      })
    } else {
      res.send({
        message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`,
      })
    }
  })
}

// Delete all Tutorials from the database
exports.deleteAll = (req, res) => {
  Tutorial.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Tutorials were deleted successfully` })
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occured while removing all tutorials.',
      })
    })
}

// Find all published Tutorials
exports.findAllPublished = (req, res) => {
  Tutorial.findAll({ where: { published: true } })
    .then((data) => {
      res.send(data)
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving tutorials.',
      })
    })
}
