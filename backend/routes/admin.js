const express = require('express');
// import express from 'express';
const router = express.Router();
// import router from 'express.Router';

const adminController = require('../controllers/admin');
const authMiddleware = require('../utils/authMiddleware');

// router.get('/admin/services', authMiddleware, adminController.getServices);
// register
router.post('/register', adminController.register);


// login
router.post('/login', adminController.login);
// logout
router.get('/admin/logout', authMiddleware, adminController.logout);
// CRUD operations for services
router.get('/admin/services', authMiddleware, adminController.getServices);
router.post('/admin/services', authMiddleware, adminController.addService);
router.put('/admin/services/:id', authMiddleware, adminController.updateService);
router.delete('/admin/services/:id', authMiddleware, adminController.deleteService);
// CRUD operations for projects
router.get('/admin/projects', authMiddleware, adminController.getProjects);
router.post('/admin/projects', authMiddleware, adminController.addProject);
router.put('/admin/projects/:id', authMiddleware, adminController.updateProject);
router.delete('/admin/projects/:id', authMiddleware, adminController.deleteProject);
// CRUD operations for clients
router.get('/admin/clients', authMiddleware, adminController.getClients);
router.post('/admin/clients', authMiddleware, adminController.addClient);
router.put('/admin/clients/:id', authMiddleware, adminController.updateClient);
router.delete('/admin/clients/:id', authMiddleware, adminController.deleteClient);
// update contact information
router.put('/admin/contact', authMiddleware, adminController.updateContact);
// get statistics
router.get('/admin/statistics', authMiddleware, adminController.getStatistics);
// update password
router.put('/admin/password', authMiddleware, adminController.updatePassword);
// delete account
router.delete('/admin/account', authMiddleware, adminController.deleteAccount);
// export the router
module.exports = router;
