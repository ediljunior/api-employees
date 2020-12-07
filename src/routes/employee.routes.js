const express = require('express');
const router = express.Router();
const employeeController = require("../controllers/employee.controller.js");

// Trae todos los empleados
router.get("/", employeeController.findAll);

// Trae un empleado segun el id
router.get("/:id", employeeController.findOne);

// Crea un nuevo empleado
router.post("/", employeeController.create);

// Actualiza un empleado segun el id
router.put("/:id", employeeController.update);

// Elimina un empleado segun el id
router.delete("/:id", employeeController.delete);

module.exports = router;