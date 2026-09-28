import { useEffect, useState } from 'react';
import './App.css';

const types = ['frontend', 'backend', 'database', 'worker', 'mobile', 'other'];
const environments = ['production', 'staging', 'development', 'preview', 'other'];

/* Icons */
const SunIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>;
const MoonIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>;
const CloseIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>;
const ExternalLinkIcon = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: 4 }}><path d="M7 7h10v10"/><path d="M7 17 17 7"/></svg>;
const FolderIcon = () => <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"/></svg>;
const SearchIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>;
const EditIcon = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>;
const ProjectsIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>;
const InsightsIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>;
const ServersIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="8" x="2" y="2" rx="2" ry="2"/><rect width="20" height="8" x="2" y="14" rx="2" ry="2"/><line x1="6" x2="6.01" y1="6" y2="6"/><line x1="6" x2="6.01" y1="18" y2="18"/></svg>;
const ProfileIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 0 0-16 0"/></svg>;
const LogoutIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>;
const PlusIcon = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>;

/* Loading Spinners & Skeleton Components */
const Spinner = ({ size = 'sm', className = '' }) => {
  const dim = size === 'lg' ? 32 : size === 'md' ? 20 : 13;
  return (
    <svg className={`spinner ${className}`} width={dim} height={dim} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" opacity="0.2" />
      <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
};

function AppLoadingScreen() {
  return (
    <div className="app-loader-screen">
      <div className="app-loader-content animate-fade-in">
        <div className="app-loader-brand">
          <div className="brand-logo pulse">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>
          </div>
          <span className="brand-text" style={{ fontSize: 15, fontWeight: 700 }}>WebManager</span>
        </div>
        <div className="loader-ring-wrapper">
          <Spinner size="md" />
        </div>
        <span className="app-loader-text">Loading workspace...</span>
      </div>
    </div>
  );
}

function ProjectSkeleton() {
  return (
    <div className="project skeleton-card">
      <div className="project-header" style={{ cursor: 'default' }}>
        <div className="project-title-group" style={{ width: '65%' }}>
          <div className="skeleton-bar" style={{ width: '40%', height: 15, marginBottom: 6 }}></div>
          <div className="skeleton-bar" style={{ width: '80%', height: 11 }}></div>
        </div>
        <div className="project-actions">
          <div className="skeleton-pill" style={{ width: 74, height: 20 }}></div>
        </div>
      </div>
      <div className="meta" style={{ padding: '0 18px 12px' }}>
        <div className="skeleton-pill" style={{ width: 85, height: 16 }}></div>
        <div className="skeleton-pill" style={{ width: 60, height: 16 }}></div>
        <div className="skeleton-pill" style={{ width: 50, height: 16 }}></div>
      </div>
    </div>
  );
}

function ProjectSkeletonList() {
  return (
    <div className="projects-feed">
      <ProjectSkeleton />
      <ProjectSkeleton />
      <ProjectSkeleton />
    </div>
  );
}

function ProviderSkeletonList() {
  return (
    <div className="stats-grid">
      {[1, 2, 3].map(i => (
        <div key={i} className="stat-card skeleton-card" style={{ display: 'block', minHeight: 96 }}>
          <div className="flex-align" style={{ justifyContent: 'space-between', marginBottom: 10 }}>
            <div className="skeleton-bar" style={{ width: '45%', height: 14 }}></div>
            <div className="skeleton-pill" style={{ width: 36, height: 16 }}></div>
          </div>
          <div className="skeleton-bar" style={{ width: '65%', height: 11, marginBottom: 8 }}></div>
          <div className="skeleton-bar" style={{ width: '35%', height: 11 }}></div>
        </div>
      ))}
    </div>
  );
}

async function api(path = '', options = {}) {
  const token = localStorage.getItem('token');
  const headers = { 'Content-Type': 'application/json' };
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const response = await fetch(`/api${path}`, { headers, ...options });
  
  if (!response.ok) {
    if (response.status === 401) {
      localStorage.removeItem('token');
      window.location.reload();
    }
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Request failed');
  }
  
  return response.status === 204 ? null : response.json();
}

function CustomFieldBuilder({ fields, setFields }) {
  const addField = () => setFields([...fields, { key: '', value: '' }]);
  const removeField = (index) => setFields(fields.filter((_, i) => i !== index));
  const updateField = (index, key, val) => {
    const newFields = [...fields];
    newFields[index][key] = val;
    setFields(newFields);
  };

  return (
    <div className="custom-fields-builder">
      {fields.map((f, i) => (
        <div key={i} className="form-row flex-align" style={{ marginBottom: 8, gap: 8 }}>
          <input 
            placeholder="Key *" 
            value={f.key} 
            onChange={e => updateField(i, 'key', e.target.value)} 
            required 
            style={{ marginBottom: 0 }}
          />
          <input 
            placeholder="Value *" 
            value={f.value} 
            onChange={e => updateField(i, 'value', e.target.value)} 
            required 
            style={{ marginBottom: 0 }}
          />
          <button type="button" className="btn-icon" onClick={() => removeField(i)}><CloseIcon /></button>
        </div>
      ))}
      <button type="button" className="btn-link" style={{ fontSize: 13, marginBottom: 16 }} onClick={addField}>+ Add Custom Detail</button>
    </div>
  );
}

function CustomFieldsDisplay({ fields }) {
  if (!fields || fields.length === 0) return null;
  return (
    <div className="custom-fields-display">
      {fields.map((f, i) => (
        <div key={i} className="custom-field-tag">
          <strong>{f.key}:</strong> 
          {f.value.startsWith('http') ? (
            <a href={f.value} target="_blank" rel="noreferrer" className="link flex-align" style={{ gap: 0 }}>
              {f.value} <ExternalLinkIcon />
            </a>
          ) : (
            <span>{f.value}</span>
          )}
        </div>
      ))}
    </div>
  );
}

function Modal({ title, isOpen, onClose, children }) {
  if (!isOpen) return null;
  
  return (
    <div className="modal-overlay animate-fade-in" onClick={onClose}>
      <div className="modal-content animate-slide-up" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h3>{title}</h3>
          <button className="btn-icon" onClick={onClose}><CloseIcon /></button>
        </div>
        <div className="modal-body">
          {children}
        </div>
      </div>
    </div>
  );
}

function AddForm({ title, children, onSubmit, submitLabel, onCancel }) {
  return (
    <form className="add-form animate-fade-in" onSubmit={onSubmit}>
      <div className="form-header">
        <h4>{title}</h4>
        {onCancel && <button type="button" className="btn-icon" onClick={onCancel}><CloseIcon /></button>}
      </div>
      {children}
      <button type="submit" className="btn-primary full-width" style={{ marginTop: 8 }}>{submitLabel}</button>
    </form>
  );
}

function Project({ project, reload, onEditProject }) {
  const [open, setOpen] = useState(false);
  const [isAddingComponent, setIsAddingComponent] = useState(false);
  const [component, setComponent] = useState({ name: '', type: 'frontend', techStack: '', databaseUsed: '', hostingProvider: '', internalPort: '', repositoryUrl: '', branch: '', notes: '' });
  const [customFields, setCustomFields] = useState([]);
  
  const addComponent = async (event) => { 
    event.preventDefault(); 
    await api(`/projects/${project._id}/components`, { 
      method: 'POST', 
      body: JSON.stringify({ ...component, customFields }) 
    }); 
    setComponent({ name: '', type: 'frontend', techStack: '', databaseUsed: '', hostingProvider: '', internalPort: '', repositoryUrl: '', branch: '', notes: '' }); 
    setCustomFields([]);
    setIsAddingComponent(false);
    reload(); 
  };
  
  const remove = async () => { 
    if (confirm(`Delete ${project.name}?`)) { 
      await api(`/projects/${project._id}`, { method: 'DELETE' }); 
      reload(); 
    } 
  };
  
  return (
    <article className="project animate-slide-up">
      <div className="project-header" onClick={() => setOpen(!open)}>
        <div className="project-title-group">
          <h2>{project.name}</h2>
          <p>{project.description || 'No description provided.'}</p>
        </div>
        <div className="project-actions">
          <span className="badge counter">{project.components?.length || 0} components</span>
          <button className="btn-icon" onClick={(e) => { e.stopPropagation(); onEditProject(project); }} title="Edit"><EditIcon /></button>
          <button className="btn-delete" onClick={(e) => { e.stopPropagation(); remove(); }}>Delete</button>
        </div>
      </div>
      
      <div className="meta">
        {project.frameworks && <span className="badge tag">Frameworks: {project.frameworks}</span>}
        {project.primaryLanguage && <span className="badge tag">Lang: {project.primaryLanguage}</span>}
        {project.repositoryUrl && (
          <a href={project.repositoryUrl} target="_blank" rel="noreferrer" className="link flex-align" style={{ gap: 0 }} onClick={e => e.stopPropagation()}>
            Repository <ExternalLinkIcon />
          </a>
        )}
        {project.tags.map(tag => (
          <span className="badge tag" key={tag}>{tag}</span>
        ))}
      </div>
      <div className="project-custom-fields">
        <CustomFieldsDisplay fields={project.customFields} />
      </div>
      
      {open && (
        <div className="content animate-fade-in" style={{ background: 'var(--bg-subtle)' }}>
          <div className="flex-align" style={{ justifyContent: 'space-between', marginBottom: 16 }}>
            <h3 style={{ fontSize: 16, margin: 0 }}>Architecture</h3>
            {!isAddingComponent && (
              <button className="btn-secondary small" onClick={() => setIsAddingComponent(true)}>+ Add Component</button>
            )}
          </div>

          {isAddingComponent && (
            <AddForm title="Add New Component" submitLabel="Save Component" onSubmit={addComponent} onCancel={() => setIsAddingComponent(false)}>
              <div className="form-row">
                <input required placeholder="Component Name * (e.g. Backend API)" value={component.name} onChange={e => setComponent({ ...component, name: e.target.value })} />
                <select value={component.type} onChange={e => setComponent({ ...component, type: e.target.value })}>
                  {types.map(x => <option key={x} value={x}>{x}</option>)}
                </select>
              </div>
              <div className="form-row">
                <input placeholder="Tech Stack (e.g. Next.js)" value={component.techStack} onChange={e => setComponent({ ...component, techStack: e.target.value })} />
                <input placeholder="Database Used" value={component.databaseUsed} onChange={e => setComponent({ ...component, databaseUsed: e.target.value })} />
              </div>
              <div className="form-row">
                <input placeholder="Hosting Provider (e.g. AWS)" value={component.hostingProvider} onChange={e => setComponent({ ...component, hostingProvider: e.target.value })} />
                <input type="number" placeholder="Internal Port (e.g. 5000)" value={component.internalPort} onChange={e => setComponent({ ...component, internalPort: e.target.value })} />
              </div>
              <div className="form-row">
                <input type="url" placeholder="Repository URL" value={component.repositoryUrl} onChange={e => setComponent({ ...component, repositoryUrl: e.target.value })} />
                <input placeholder="Branch (e.g. main)" value={component.branch} onChange={e => setComponent({ ...component, branch: e.target.value })} />
              </div>
              <CustomFieldBuilder fields={customFields} setFields={setCustomFields} />
            </AddForm>
          )}
          
          <div className="components-list">
            {project.components?.map(c => (
              <ComponentCard key={c._id} project={project} component={c} reload={reload} />
            ))}
          </div>
        </div>
      )}
    </article>
  );
}

function ComponentCard({ project, component, reload }) {
  const [deployment, setDeployment] = useState({ name: '', environment: 'production', provider: '', url: '', notes: '' });
  const [customFields, setCustomFields] = useState([]);
  const [isAddingDeployment, setIsAddingDeployment] = useState(false);
  
  // Edit state for Component itself
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({ name: '', type: 'frontend', techStack: '', databaseUsed: '', hostingProvider: '', internalPort: '', repositoryUrl: '', branch: '', notes: '' });
  const [editCustomFields, setEditCustomFields] = useState([]);

  const add = async e => { 
    e.preventDefault(); 
    await api(`/projects/${project._id}/components/${component._id}/deployments`, { 
      method: 'POST', 
      body: JSON.stringify({ ...deployment, customFields }) 
    }); 
    setDeployment({ name: '', environment: 'production', provider: '', url: '', notes: '' });
    setCustomFields([]);
    setIsAddingDeployment(false); 
    reload(); 
  };

  const startEdit = () => {
    setEditData({ 
      name: component.name, type: component.type, techStack: component.techStack || '', databaseUsed: component.databaseUsed || '', 
      hostingProvider: component.hostingProvider || '', internalPort: component.internalPort || '', repositoryUrl: component.repositoryUrl || '', 
      branch: component.branch || '', notes: component.notes || '' 
    });
    setEditCustomFields(component.customFields || []);
    setIsEditing(true);
  };

  const saveEdit = async e => {
    e.preventDefault();
    await api(`/projects/${project._id}/components/${component._id}`, {
      method: 'PUT',
      body: JSON.stringify({ ...editData, customFields: editCustomFields })
    });
    setIsEditing(false);
    reload();
  };
  
  return (
    <div className="part-card" style={{ marginBottom: 16 }}>
      {isEditing ? (
        <AddForm title="Edit Component" submitLabel="Save Changes" onSubmit={saveEdit} onCancel={() => setIsEditing(false)}>
          <div className="form-row">
            <input required placeholder="Component name *" value={editData.name} onChange={e => setEditData({ ...editData, name: e.target.value })} />
            <select value={editData.type} onChange={e => setEditData({ ...editData, type: e.target.value })}>
              {types.map(x => <option key={x} value={x}>{x}</option>)}
            </select>
          </div>
          <div className="form-row">
            <input placeholder="Tech Stack" value={editData.techStack} onChange={e => setEditData({ ...editData, techStack: e.target.value })} />
            <input placeholder="Database Used" value={editData.databaseUsed} onChange={e => setEditData({ ...editData, databaseUsed: e.target.value })} />
          </div>
          <div className="form-row">
            <input placeholder="Hosting Provider" value={editData.hostingProvider} onChange={e => setEditData({ ...editData, hostingProvider: e.target.value })} />
            <input type="number" placeholder="Internal Port" value={editData.internalPort} onChange={e => setEditData({ ...editData, internalPort: e.target.value })} />
          </div>
          <div className="form-row">
            <input type="url" placeholder="Repository URL" value={editData.repositoryUrl} onChange={e => setEditData({ ...editData, repositoryUrl: e.target.value })} />
            <input placeholder="Branch" value={editData.branch} onChange={e => setEditData({ ...editData, branch: e.target.value })} />
          </div>
          <CustomFieldBuilder fields={editCustomFields} setFields={setEditCustomFields} />
        </AddForm>
      ) : (
        <>
          <div className="part-header">
            <div className="flex-align">
              <strong style={{ fontSize: 16 }}>{component.name}</strong> 
              <span className="badge type-badge">{component.type}</span>
              {component.repositoryUrl && (
                <a href={component.repositoryUrl} target="_blank" rel="noreferrer" className="link flex-align" style={{ gap: 0 }}>Source <ExternalLinkIcon /></a>
              )}
            </div>
            <div className="flex-align">
              {!isAddingDeployment && (
                <button className="btn-secondary tiny" onClick={() => setIsAddingDeployment(true)}>+ Deploy</button>
              )}
              <button className="btn-icon" onClick={startEdit} title="Edit"><EditIcon /></button>
            </div>
          </div>
          
          <div style={{ marginTop: 12, marginBottom: 12, fontSize: 13, display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            {component.techStack && <div><span style={{ color: 'var(--text-muted)' }}>Tech:</span> {component.techStack}</div>}
            {component.databaseUsed && <div><span style={{ color: 'var(--text-muted)' }}>DB:</span> {component.databaseUsed}</div>}
            {component.hostingProvider && <div><span style={{ color: 'var(--text-muted)' }}>Hosting:</span> {component.hostingProvider}</div>}
            {component.internalPort && <div><span style={{ color: 'var(--text-muted)' }}>Port:</span> {component.internalPort}</div>}
            {component.branch && <div><span style={{ color: 'var(--text-muted)' }}>Branch:</span> {component.branch}</div>}
          </div>

          <CustomFieldsDisplay fields={component.customFields} />
        </>
      )}
      
      {isAddingDeployment && (
        <AddForm title="Add Deployment" submitLabel="Save Deployment" onSubmit={add} onCancel={() => setIsAddingDeployment(false)}>
          <div className="form-row">
            <input required placeholder="Deployment name *" value={deployment.name} onChange={e => setDeployment({ ...deployment, name: e.target.value })} />
            <select value={deployment.environment} onChange={e => setDeployment({ ...deployment, environment: e.target.value })}>
              {environments.map(x => <option key={x} value={x}>{x}</option>)}
            </select>
          </div>
          <div className="form-row">
            <input placeholder="Provider (e.g. Vercel)" value={deployment.provider} onChange={e => setDeployment({ ...deployment, provider: e.target.value })} />
            <input type="url" placeholder="Live URL" value={deployment.url} onChange={e => setDeployment({ ...deployment, url: e.target.value })} />
          </div>
          <CustomFieldBuilder fields={customFields} setFields={setCustomFields} />
        </AddForm>
      )}

      <div className="deployments-grid" style={{ marginTop: 16 }}>
        {component.deployments?.map(d => (
          <Deployment key={d._id} project={project} component={component} deployment={d} reload={reload} />
        ))}
      </div>
    </div>
  );
}

function Deployment({ project, component, deployment, reload }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({ name: '', environment: 'production', provider: '', url: '', notes: '' });
  const [editCustomFields, setEditCustomFields] = useState([]);

  const startEdit = () => {
    setEditData({ name: deployment.name, environment: deployment.environment, provider: deployment.provider || '', url: deployment.url || '', notes: deployment.notes || '' });
    setEditCustomFields(deployment.customFields || []);
    setIsEditing(true);
  };

  const saveEdit = async e => {
    e.preventDefault();
    await api(`/projects/${project._id}/components/${component._id}/deployments/${deployment._id}`, {
      method: 'PUT',
      body: JSON.stringify({ ...editData, customFields: editCustomFields })
    });
    setIsEditing(false);
    reload();
  };

  if (isEditing) {
    return (
      <div className="deployment-item" style={{ display: 'block' }}>
        <AddForm title="Edit Deployment" submitLabel="Save Changes" onSubmit={saveEdit} onCancel={() => setIsEditing(false)}>
          <div className="form-row">
            <input required placeholder="Deployment name *" value={editData.name} onChange={e => setEditData({ ...editData, name: e.target.value })} />
            <select value={editData.environment} onChange={e => setEditData({ ...editData, environment: e.target.value })}>
              {environments.map(x => <option key={x} value={x}>{x}</option>)}
            </select>
          </div>
          <div className="form-row">
            <input placeholder="Provider" value={editData.provider} onChange={e => setEditData({ ...editData, provider: e.target.value })} />
            <input type="url" placeholder="Live URL" value={editData.url} onChange={e => setEditData({ ...editData, url: e.target.value })} />
          </div>
          <CustomFieldBuilder fields={editCustomFields} setFields={setEditCustomFields} />
        </AddForm>
      </div>
    );
  }

  return (
    <div className="deployment-item">
      <div className="deployment-header">
        <span className={`status-badge env-${deployment.environment}`}>{deployment.environment}</span>
        <b>{deployment.name}</b>
        <button className="btn-icon" onClick={startEdit} title="Edit"><EditIcon /></button>
      </div>
      {deployment.provider && <span className="provider-tag">{deployment.provider}</span>}
      {deployment.url && <a href={deployment.url} target="_blank" rel="noreferrer" className="link flex-align" style={{ gap: 0 }}>Visit <ExternalLinkIcon /></a>}
      {deployment.notes && <p className="deployment-notes">{deployment.notes}</p>}
      <CustomFieldsDisplay fields={deployment.customFields} />
    </div>
  );
}

function AuthScreen({ onAuthSuccess, theme, toggleTheme }) {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const submit = async e => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);
    try {
      const endpoint = isLogin ? '/users/login' : '/users/register';
      const data = await api(endpoint, { method: 'POST', body: JSON.stringify(form) });
      localStorage.setItem('token', data.token);
      onAuthSuccess(data.user);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-theme-toggle" style={{ position: 'absolute', top: 20, right: 20 }}>
        <button className="btn-icon" onClick={toggleTheme} title="Toggle Theme" style={{ display: 'flex', alignItems: 'center' }}>
          {theme === 'light' ? <MoonIcon /> : <SunIcon />}
        </button>
      </div>
      <div className="auth-card animate-slide-up">
        <h1>{isLogin ? 'Welcome Back' : 'Create Account'}</h1>
        <p className="auth-subtitle">Sign in to manage your deployment registry.</p>
        
        {error && <div className="error-banner">{error}</div>}
        
        <form onSubmit={submit} className="compact-form">
          {!isLogin && (
            <input required type="text" placeholder="Full Name *" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
          )}
          <input required type="email" placeholder="Email Address *" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
          <input required type="password" placeholder="Password *" value={form.password} onChange={e => setForm({...form, password: e.target.value})} />
          <button type="submit" className="btn-primary full-width" disabled={isSubmitting} style={{ marginTop: 12 }}>
            {isSubmitting ? (
              <><Spinner size="sm" /> <span>{isLogin ? 'Signing In...' : 'Registering...'}</span></>
            ) : (
              isLogin ? 'Sign In' : 'Register'
            )}
          </button>
        </form>
        
        <div className="auth-switch">
          <p>
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button className="btn-link" onClick={() => setIsLogin(!isLogin)}>
              {isLogin ? 'Create one' : 'Sign in'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

function ProfileSettings({ user, setUser }) {
  const [form, setForm] = useState({ name: user.name, email: user.email, password: '' });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    setIsSaving(true);
    try {
      const data = await api('/users/me', {
        method: 'PUT',
        body: JSON.stringify(form)
      });
      localStorage.setItem('token', data.token);
      setUser(data.user);
      setForm(prev => ({ ...prev, password: '' })); // clear password field
      setMessage('Profile updated successfully!');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="profile-container animate-fade-in">
      <h2 style={{ marginBottom: 8 }}>Profile Settings</h2>
      <p style={{ color: 'var(--text-secondary)', marginBottom: 24 }}>Update your account information and credentials.</p>
      
      {message && <div style={{ padding: 12, background: 'var(--bg-subtle)', color: 'var(--text-primary)', borderLeft: '3px solid var(--accent-base)', marginBottom: 16 }}>{message}</div>}
      {error && <div className="error-banner">{error}</div>}
      
      <form onSubmit={submit} className="compact-form">
        <label style={{ display: 'block', marginBottom: 4, fontSize: 13, color: 'var(--text-secondary)' }}>Full Name</label>
        <input required value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
        
        <label style={{ display: 'block', marginBottom: 4, fontSize: 13, color: 'var(--text-secondary)' }}>Email Address</label>
        <input required type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
        
        <label style={{ display: 'block', marginBottom: 4, fontSize: 13, color: 'var(--text-secondary)' }}>New Password</label>
        <input type="password" placeholder="Leave blank to keep current password" value={form.password} onChange={e => setForm({...form, password: e.target.value})} />
        
        <button type="submit" className="btn-primary full-width" disabled={isSaving} style={{ marginTop: 16 }}>
          {isSaving ? <><Spinner size="sm" /> <span>Saving Changes...</span></> : 'Save Changes'}
        </button>
      </form>
    </div>
  );
}

function InsightsDashboard({ projects }) {
  const totalProjects = projects.length;
  let totalComponents = 0;
  let activeDeployments = 0;
  const techStackCounts = {};
  const envCounts = {};
  const typeCounts = {};

  projects.forEach(p => {
    (p.components || []).forEach(c => {
      totalComponents++;
      if (c.type) typeCounts[c.type] = (typeCounts[c.type] || 0) + 1;
      
      if (c.techStack) {
        const stack = c.techStack.trim();
        techStackCounts[stack] = (techStackCounts[stack] || 0) + 1;
      }
      
      (c.deployments || []).forEach(d => {
        if (d.environment === 'production') activeDeployments++;
        if (d.environment) envCounts[d.environment] = (envCounts[d.environment] || 0) + 1;
      });
    });
  });

  return (
    <div className="tab-content-container animate-fade-in">
      <div className="section-header" style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 24, margin: 0 }}>Insights & Analytics</h1>
      </div>

      <div className="stats-grid" style={{ marginBottom: 40 }}>
        <div className="stat-card">
          <span className="stat-label">Total Projects</span>
          <span className="stat-value">{totalProjects}</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Total Components</span>
          <span className="stat-value">{totalComponents}</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Production Deployments</span>
          <span className="stat-value">{activeDeployments}</span>
        </div>
      </div>

      <div className="insights-grid">
        <div className="stat-card">
          <h3 style={{ marginTop: 0, marginBottom: 16 }}>Component Types</h3>
          {Object.entries(typeCounts).map(([type, count]) => (
            <div key={type} className="flex-align" style={{ justifyContent: 'space-between', marginBottom: 8 }}>
              <span style={{ textTransform: 'capitalize' }}>{type}</span>
              <span className="badge counter">{count}</span>
            </div>
          ))}
          {Object.keys(typeCounts).length === 0 && <p style={{ color: 'var(--text-muted)' }}>No data</p>}
        </div>

        <div className="stat-card">
          <h3 style={{ marginTop: 0, marginBottom: 16 }}>Top Tech Stacks</h3>
          {Object.entries(techStackCounts).sort((a, b) => b[1] - a[1]).slice(0, 5).map(([stack, count]) => (
            <div key={stack} className="flex-align" style={{ justifyContent: 'space-between', marginBottom: 8 }}>
              <span>{stack}</span>
              <span className="badge counter">{count}</span>
            </div>
          ))}
          {Object.keys(techStackCounts).length === 0 && <p style={{ color: 'var(--text-muted)' }}>No data</p>}
        </div>

        <div className="stat-card">
          <h3 style={{ marginTop: 0, marginBottom: 16 }}>Environments</h3>
          {Object.entries(envCounts).map(([env, count]) => (
            <div key={env} className="flex-align" style={{ justifyContent: 'space-between', marginBottom: 8 }}>
              <span className={`status-badge env-${env}`}>{env}</span>
              <span className="badge counter">{count}</span>
            </div>
          ))}
          {Object.keys(envCounts).length === 0 && <p style={{ color: 'var(--text-muted)' }}>No data</p>}
        </div>
      </div>
    </div>
  );
}

function ProvidersTab() {
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  
  const [form, setForm] = useState({ name: '', url: '', notes: '' });
  const [customFields, setCustomFields] = useState([]);

  const [editingId, setEditingId] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  const loadProviders = async () => {
    try {
      const data = await api('/providers');
      setProviders(data);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let active = true;
    api('/providers')
      .then(data => { if (active) setProviders(data); })
      .catch(err => { if (active) setError(err.message); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      if (editingId) {
        await api(`/providers/${editingId}`, {
          method: 'PUT',
          body: JSON.stringify({ ...form, customFields })
        });
      } else {
        await api('/providers', {
          method: 'POST',
          body: JSON.stringify({ ...form, customFields })
        });
      }
      setIsAdding(false);
      setEditingId(null);
      setForm({ name: '', url: '', notes: '' });
      setCustomFields([]);
      await loadProviders();
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSaving(false);
    }
  };

  const startEdit = (p) => {
    setForm({ name: p.name, url: p.url || '', notes: p.notes || '' });
    setCustomFields(p.customFields || []);
    setEditingId(p._id);
    setIsAdding(true);
  };

  const remove = async (id) => {
    if (confirm('Delete this provider?')) {
      await api(`/providers/${id}`, { method: 'DELETE' });
      await loadProviders();
    }
  };

  return (
    <div className="tab-content-container animate-fade-in">
      <div className="section-header" style={{ marginBottom: 18 }}>
        <h1 style={{ fontSize: 18, margin: 0 }}>Servers & Providers</h1>
        {!isAdding && (
          <button className="btn-primary" onClick={() => setIsAdding(true)}>+ Add Provider</button>
        )}
      </div>
      
      {error && <div className="error-banner">{error}</div>}

      {isAdding && (
        <div style={{ marginBottom: 20 }}>
          <AddForm title={editingId ? "Edit Provider" : "Add Provider"} submitLabel={isSaving ? "Saving..." : "Save Provider"} onSubmit={submit} onCancel={() => { setIsAdding(false); setEditingId(null); }}>
            <div className="form-row">
              <input required placeholder="Provider Name *" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
              <input type="url" placeholder="Login / Dashboard URL" value={form.url} onChange={e => setForm({...form, url: e.target.value})} />
            </div>
            <textarea placeholder="Notes (e.g. Account email, purpose)" value={form.notes} onChange={e => setForm({...form, notes: e.target.value})} />
            <CustomFieldBuilder fields={customFields} setFields={setCustomFields} />
          </AddForm>
        </div>
      )}

      <div className="projects-feed">
        {loading ? (
          <ProviderSkeletonList />
        ) : providers.length === 0 && !isAdding ? (
           <div className="empty-state">
             <div className="empty-icon"><FolderIcon /></div>
             <h3>No Providers</h3>
             <p>Track your AWS, Vercel, or database servers here.</p>
           </div>
        ) : (
          <div className="stats-grid">
            {providers.map(p => (
              <div key={p._id} className="stat-card" style={{ display: 'block' }}>
                <div className="flex-align" style={{ justifyContent: 'space-between', marginBottom: 12 }}>
                  <h3 style={{ margin: 0, fontSize: 16 }}>{p.name}</h3>
                  <div className="flex-align">
                    <button className="btn-icon" onClick={() => startEdit(p)}><EditIcon /></button>
                    <button className="btn-icon" onClick={() => remove(p._id)}><CloseIcon /></button>
                  </div>
                </div>
                {p.url && <a href={p.url} target="_blank" rel="noreferrer" className="link flex-align" style={{ gap: 0, marginBottom: 8, fontSize: 13 }}>Go to Dashboard <ExternalLinkIcon /></a>}
                {p.notes && <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 12 }}>{p.notes}</p>}
                <CustomFieldsDisplay fields={p.customFields} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState('');
  
  // Tab states
  const [activeTab, setActiveTab] = useState('projects');
  
  // Dashboard states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditingProject, setIsEditingProject] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [form, setForm] = useState({ name: '', description: '', frameworks: '', primaryLanguage: '', repositoryUrl: '', tags: '' });
  const [projectCustomFields, setProjectCustomFields] = useState([]);
  
  const getInitialTheme = () => {
    if (localStorage.getItem('theme')) return localStorage.getItem('theme');
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark';
    return 'light';
  };
  
  const [theme, setTheme] = useState(getInitialTheme);
  
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);
  
  const [isProjectsLoading, setIsProjectsLoading] = useState(false);
  const [isSubmittingProject, setIsSubmittingProject] = useState(false);

  const loadProjects = async () => {
    setIsProjectsLoading(true);
    try { 
      setProjects(await api('/projects')); 
      setError(''); 
    } catch (err) { 
      setError(`Failed to load projects: ${err.message}`); 
    } finally {
      setIsProjectsLoading(false);
    }
  };

  useEffect(() => {
    const init = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const userData = await api('/users/me');
          setUser(userData);
          await loadProjects();
        } catch {
          localStorage.removeItem('token');
        }
      }
      setLoading(false);
    };
    init();
  }, []);
  
  const handleOpenEditProject = (p) => {
    setForm({ name: p.name, description: p.description || '', frameworks: p.frameworks || '', primaryLanguage: p.primaryLanguage || '', repositoryUrl: p.repositoryUrl || '', tags: p.tags.join(', ') });
    setProjectCustomFields(p.customFields || []);
    setIsEditingProject(p);
    setIsModalOpen(true);
  };

  const handleOpenNewProject = () => {
    setForm({ name: '', description: '', frameworks: '', primaryLanguage: '', repositoryUrl: '', tags: '' });
    setProjectCustomFields([]);
    setIsEditingProject(null);
    setIsModalOpen(true);
  };

  const submitProject = async e => { 
    e.preventDefault(); 
    setIsSubmittingProject(true);
    try { 
      if (isEditingProject) {
        await api(`/projects/${isEditingProject._id}`, { 
          method: 'PUT', 
          body: JSON.stringify({ 
            ...form, 
            tags: form.tags.split(',').map(x => x.trim()).filter(Boolean),
            customFields: projectCustomFields
          }) 
        }); 
      } else {
        await api('/projects', { 
          method: 'POST', 
          body: JSON.stringify({ 
            ...form, 
            tags: form.tags.split(',').map(x => x.trim()).filter(Boolean),
            customFields: projectCustomFields
          }) 
        }); 
      }
      setForm({ name: '', description: '', frameworks: '', primaryLanguage: '', repositoryUrl: '', tags: '' }); 
      setProjectCustomFields([]);
      setIsModalOpen(false);
      setIsEditingProject(null);
      await loadProjects(); 
    } catch (err) { 
      setError(err.message); 
    } finally {
      setIsSubmittingProject(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setProjects([]);
  };

  if (loading) return <AppLoadingScreen />;
  if (!user) return <AuthScreen 
    onAuthSuccess={(u) => { setUser(u); loadProjects(); }} 
    theme={theme}
    toggleTheme={() => setTheme(prev => prev === 'light' ? 'dark' : 'light')}
  />;

  // Computed Stats
  const activeDeploymentsCount = projects.reduce((acc, p) => 
    acc + (p.components || []).reduce((pacc, pt) => 
      pacc + (pt.deployments || []).filter(d => d.environment === 'production').length, 0
    ), 0
  );

  const filteredProjects = projects.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (p.frameworks && p.frameworks.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="app-layout">
      <nav className="top-nav">
        <div className="nav-brand">
          <div className="brand-logo">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>
          </div>
          <span className="brand-text">WebManager</span>
        </div>
        <div className="nav-tabs desktop-only">
          <button className={`tab-btn ${activeTab === 'projects' ? 'active' : ''}`} onClick={() => setActiveTab('projects')}>
            <ProjectsIcon />
            <span>Projects</span>
          </button>
          <button className={`tab-btn ${activeTab === 'insights' ? 'active' : ''}`} onClick={() => setActiveTab('insights')}>
            <InsightsIcon />
            <span>Insights</span>
          </button>
          <button className={`tab-btn ${activeTab === 'providers' ? 'active' : ''}`} onClick={() => setActiveTab('providers')}>
            <ServersIcon />
            <span>Servers</span>
          </button>
          <button className={`tab-btn ${activeTab === 'profile' ? 'active' : ''}`} onClick={() => setActiveTab('profile')}>
            <ProfileIcon />
            <span>Profile</span>
          </button>
        </div>
        <div className="nav-user">
          <button className="btn-icon theme-toggle-btn" onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')} title="Toggle Theme" aria-label="Toggle Theme">
            {theme === 'light' ? <MoonIcon /> : <SunIcon />}
          </button>
          <div className="user-profile-badge" title={user.email}>
            <span className="user-avatar">{user.name?.charAt(0).toUpperCase() || 'U'}</span>
            <span className="user-name desktop-only">{user.name}</span>
          </div>
          <button className="btn-secondary small signout-btn" onClick={logout} title="Sign Out">
            <span className="desktop-only">Sign Out</span>
            <span className="mobile-only" style={{ display: 'flex', alignItems: 'center' }}><LogoutIcon /></span>
          </button>
        </div>
      </nav>

      <main className="dashboard">
        {error && <div className="error-banner">{error}</div>}
        
        {activeTab === 'profile' && <ProfileSettings user={user} setUser={setUser} />}
        {activeTab === 'insights' && <InsightsDashboard projects={projects} />}
        {activeTab === 'providers' && <ProvidersTab />}
        {activeTab === 'projects' && (
          <div className="dashboard-main animate-slide-up">
            <div className="section-header project-section-header">
              <div className="flex-align title-group">
                <h1 style={{ fontSize: 24, margin: 0 }}>Projects</h1>
                <span className="count-badge">{filteredProjects.length}</span>
                {activeDeploymentsCount > 0 && (
                  <span className="status-badge env-production" style={{ fontSize: 11, padding: '2px 8px' }} title="Active Production Deployments">
                    {activeDeploymentsCount} live
                  </span>
                )}
              </div>
              <div className="action-bar-group">
                <div className="search-bar">
                  <SearchIcon />
                  <input 
                    type="text" 
                    placeholder="Search projects, tags, stacks..." 
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                  />
                  {searchQuery && (
                    <button type="button" className="search-clear-btn" onClick={() => setSearchQuery('')} title="Clear search">
                      <CloseIcon />
                    </button>
                  )}
                </div>
                <button className="btn-primary new-project-btn" onClick={handleOpenNewProject}>
                  <PlusIcon /> <span>New Project</span>
                </button>
              </div>
            </div>
          
          <div className="projects-feed">
            {isProjectsLoading && projects.length === 0 ? (
              <ProjectSkeletonList />
            ) : filteredProjects.length ? (
              filteredProjects.map(p => <Project project={p} reload={loadProjects} key={p._id} onEditProject={handleOpenEditProject} />)
            ) : (
              <div className="empty-state">
                <div className="empty-icon"><FolderIcon /></div>
                <h3>No Projects Found</h3>
                <p>{searchQuery ? 'Try adjusting your search criteria.' : 'Create your first project to start tracking your deployments.'}</p>
              </div>
            )}
          </div>
        </div>
        )}
      </main>

      <Modal title={isEditingProject ? "Edit Project" : "Create New Project"} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <form onSubmit={submitProject} className="compact-form">
          <input required placeholder="Project Name * (e.g. Portfolio)" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
          <div className="form-row">
            <input placeholder="Frameworks (e.g. React, Django)" value={form.frameworks} onChange={e => setForm({ ...form, frameworks: e.target.value })} />
            <input placeholder="Primary Language (e.g. JS, Python)" value={form.primaryLanguage} onChange={e => setForm({ ...form, primaryLanguage: e.target.value })} />
          </div>
          <div className="form-row">
            <input type="url" placeholder="Repository URL" value={form.repositoryUrl} onChange={e => setForm({ ...form, repositoryUrl: e.target.value })} />
            <input placeholder="Tags (comma separated)" value={form.tags} onChange={e => setForm({ ...form, tags: e.target.value })} />
          </div>
          <textarea placeholder="Brief description of the project..." value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
          <CustomFieldBuilder fields={projectCustomFields} setFields={setProjectCustomFields} />
          <button type="submit" className="btn-primary full-width" disabled={isSubmittingProject} style={{ marginTop: 12 }}>
            {isSubmittingProject ? (
              <><Spinner size="sm" /> <span>{isEditingProject ? "Saving Changes..." : "Creating Project..."}</span></>
            ) : (
              isEditingProject ? "Save Changes" : "Create Project"
            )}
          </button>
        </form>
      </Modal>

      {/* Mobile Bottom Navigation */}
      <nav className="bottom-nav mobile-only">
        <button className={`bottom-tab-btn ${activeTab === 'projects' ? 'active' : ''}`} onClick={() => setActiveTab('projects')} aria-label="Projects">
          <ProjectsIcon />
          <span>Projects</span>
        </button>
        <button className={`bottom-tab-btn ${activeTab === 'insights' ? 'active' : ''}`} onClick={() => setActiveTab('insights')} aria-label="Insights">
          <InsightsIcon />
          <span>Insights</span>
        </button>
        <button className={`bottom-tab-btn ${activeTab === 'providers' ? 'active' : ''}`} onClick={() => setActiveTab('providers')} aria-label="Servers">
          <ServersIcon />
          <span>Servers</span>
        </button>
        <button className={`bottom-tab-btn ${activeTab === 'profile' ? 'active' : ''}`} onClick={() => setActiveTab('profile')} aria-label="Profile">
          <ProfileIcon />
          <span>Profile</span>
        </button>
      </nav>
    </div>
  );
}
