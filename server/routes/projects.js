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

// Bulk import endpoint
router.post('/bulk', async (req, res, next) => {
  try {
    let items = Array.isArray(req.body) ? req.body : req.body.projects;
    if (!Array.isArray(items)) {
      return res.status(400).json({ message: 'Payload must be an array of projects or { projects: [...] }' });
    }

    const created = [];
    for (const item of items) {
      if (!item.name) continue;
      const doc = new Project({
        name: item.name,
        description: item.description || '',
        frameworks: item.frameworks || '',
        primaryLanguage: item.primaryLanguage || '',
        repositoryUrl: item.repositoryUrl || '',
        tags: Array.isArray(item.tags) ? item.tags : (typeof item.tags === 'string' ? item.tags.split(',').map(t => t.trim()).filter(Boolean) : []),
        customFields: Array.isArray(item.customFields) ? item.customFields : [],
        userId: req.user._id,
      });

      if (Array.isArray(item.components)) {
        doc.components = item.components.map(c => ({
          name: c.name || 'main',
          type: c.type || 'other',
          techStack: c.techStack || '',
          databaseUsed: c.databaseUsed || '',
          hostingProvider: c.hostingProvider || '',
          internalPort: c.internalPort,
          repositoryUrl: c.repositoryUrl || '',
          branch: c.branch || '',
          notes: c.notes || '',
          customFields: Array.isArray(c.customFields) ? c.customFields : [],
          deployments: Array.isArray(c.deployments) ? c.deployments.map(d => ({
            name: d.name || 'Production',
            environment: d.environment || 'production',
            provider: d.provider || '',
            url: d.url || '',
            notes: d.notes || '',
            customFields: Array.isArray(d.customFields) ? d.customFields : []
          })) : []
        }));
      }

      await doc.save();
      created.push(doc);
    }

    res.status(201).json({ count: created.length, projects: created });
  } catch (error) { next(error); }
});

module.exports = router;
