const express = require('express');
const Project = require('../models/Project');
const auth = require('../middleware/auth');
const router = express.Router();

const missing = (res, text) => res.status(404).json({ message: text });

// Apply auth middleware to all routes in this router
router.use(auth);

router.get('/', async (req, res, next) => {
  try { res.json(await Project.find({ userId: req.user._id }).sort({ updatedAt: -1 })); } catch (error) { next(error); }
});

router.post('/', async (req, res, next) => {
  try { 
    const project = new Project({ ...req.body, userId: req.user._id });
    res.status(201).json(await project.save()); 
  } catch (error) { next(error); }
});

router.put('/:projectId', async (req, res, next) => {
  try {
    const project = await Project.findOneAndUpdate({ _id: req.params.projectId, userId: req.user._id }, req.body, { new: true, runValidators: true });
    if (!project) return missing(res, 'Project not found');
    res.json(project);
  } catch (error) { next(error); }
});

router.delete('/:projectId', async (req, res, next) => {
  try {
    const project = await Project.findOneAndDelete({ _id: req.params.projectId, userId: req.user._id });
    if (!project) return missing(res, 'Project not found');
    res.status(204).end();
  } catch (error) { next(error); }
});

router.post('/:projectId/components', async (req, res, next) => {
  try {
    const project = await Project.findOne({ _id: req.params.projectId, userId: req.user._id });
    if (!project) return missing(res, 'Project not found');
    project.components.push(req.body); await project.save(); res.status(201).json(project);
  } catch (error) { next(error); }
});

router.put('/:projectId/components/:componentId', async (req, res, next) => {
  try {
    const project = await Project.findOne({ _id: req.params.projectId, userId: req.user._id }); if (!project) return missing(res, 'Project not found');
    const component = project.components.id(req.params.componentId); if (!component) return missing(res, 'Component not found');
    Object.assign(component, req.body); await project.save(); res.json(project);
  } catch (error) { next(error); }
});

router.post('/:projectId/components/:componentId/deployments', async (req, res, next) => {
  try {
    const project = await Project.findOne({ _id: req.params.projectId, userId: req.user._id }); if (!project) return missing(res, 'Project not found');
    const component = project.components.id(req.params.componentId); if (!component) return missing(res, 'Component not found');
    component.deployments.push(req.body); await project.save(); res.status(201).json(project);
  } catch (error) { next(error); }
});

router.put('/:projectId/components/:componentId/deployments/:deploymentId', async (req, res, next) => {
  try {
    const project = await Project.findOne({ _id: req.params.projectId, userId: req.user._id }); if (!project) return missing(res, 'Project not found');
    const component = project.components.id(req.params.componentId); if (!component) return missing(res, 'Component not found');
    const deployment = component.deployments.id(req.params.deploymentId); if (!deployment) return missing(res, 'Deployment not found');
    Object.assign(deployment, req.body); await project.save(); res.json(project);
  } catch (error) { next(error); }
});

router.delete('/:projectId/components/:componentId', async (req, res, next) => {
  try {
    const project = await Project.findOne({ _id: req.params.projectId, userId: req.user._id });
    if (!project) return missing(res, 'Project not found');
    const component = project.components.id(req.params.componentId);
    if (!component) return missing(res, 'Component not found');
    component.deleteOne();
    await project.save();
    res.status(204).end();
  } catch (error) { next(error); }
});

router.delete('/:projectId/components/:componentId/deployments/:deploymentId', async (req, res, next) => {
  try {
    const project = await Project.findOne({ _id: req.params.projectId, userId: req.user._id });
    if (!project) return missing(res, 'Project not found');
    const component = project.components.id(req.params.componentId);
    if (!component) return missing(res, 'Component not found');
    const deployment = component.deployments.id(req.params.deploymentId);
    if (!deployment) return missing(res, 'Deployment not found');
    deployment.deleteOne();
    await project.save();
    res.status(204).end();
  } catch (error) { next(error); }
});

module.exports = router;
