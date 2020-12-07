const Employee = require("../models/employee.model.js");

// Trae todos los empleados
exports.findAll = (req, res) => {
    Employee.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving employees."
            });
        else res.json(data);
    });
};

// Trae un empleado segun el id
exports.findOne = (req, res) => {
    Employee.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Employee with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Employee with id " + req.params.id
                });
            }
        } else res.json(data);
    });
};

// Crea un nuevo empleado
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    // Crea un empleado
    const employee = new Employee({
        id: req.body.id,
        name: req.body.name,
        salary: req.body.salary
    });

    // Crea un empleado en la base de datos
    Employee.create(employee, (err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Employee."
            });
        else res.json(data);
    });
};

// Actualiza un empleado
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    console.log(req.body);

    Employee.updateById(
        req.params.id,
        new Employee(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found Employee with id ${req.params.id}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating Employee with id " + req.params.id
                    });
                }
            } else res.json(data);
        }
    );
};

// Elimina un empleado segun el id
exports.delete = (req, res) => {
    Employee.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Employee with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete Employee with id " + req.params.id
                });
            }
        } else res.json({ message: `Employee was deleted successfully!` });
    });
};