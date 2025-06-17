import { createClient } from '@sanity/client'
import { projectId, token } from './projectId.js';

export const sanity = createClient({
  projectId: projectId,
  dataset: 'production',
  apiVersion: '2024-06-01',
  token: token,
  useCdn: false
});
