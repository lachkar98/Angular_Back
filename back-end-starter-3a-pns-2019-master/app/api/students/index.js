const { Router } = require('express');
const { Student } = require('../../models');
const { Ticket } = require('../../models');

function attchementTicket(student) {
  return Object.assign({},
    student, { tickets: Ticket.get().filter(ticket => ticket.studentId === student.id) });
}
const router = new Router();
router.get('/', (req, res) => res.status(200).json(Student.get()));
router.get('/:studentId', (req, res) => res.status(200).json(Student.getById(req.params.studentId)));
router.delete('/:studentId', (req, res) => res.status(200).json(Student.delete(req.params.studentId)));
router.put('/:studentId', (req, res) => res.status(200).json(Student.update(req.params.studentId, req.body)));
router.post('/', (req, res) => {
  try {
    const student = Student.create(req.body);
    res.status(201).json(attchementTicket(student));
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).json(err.extra);
    } else {
      res.status(500).json(err);
    }
  }
});

module.exports = router;
