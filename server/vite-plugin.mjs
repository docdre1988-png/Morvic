import handler from './handler.mjs';
export default function adminApi() { return { name: 'local-admin-api', configureServer(server) { server.middlewares.use('/api/admin', handler); } }; }
