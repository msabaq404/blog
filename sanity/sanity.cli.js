import {defineCliConfig} from 'sanity/cli'

import projectId from './projectId'


export default defineCliConfig({
  api: {
    projectId: projectId , // Replace with your actual project ID
    dataset: 'production', 
  },
  /**
   * Enable auto-updates for studios.
   * Learn more at https://www.sanity.io/docs/cli#auto-updates
   */
  autoUpdates: true,
})
