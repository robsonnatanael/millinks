export default {
  docSidebar: [
    'intro',
    {
      type: 'category',
      label: 'Getting Started',
      items: [
        'getting-started/installation',
        'getting-started/running-locally'
      ]
    },
    {
      type: 'category',
      label: 'Configuration',
      items: [
        'configuration/environment-variables',
        'configuration/agents'
      ]
    },
    {
      type: 'category',
      label: 'Architecture',
      items: [
        'architecture/overview',
        'architecture/project-structure',
        {
          type: 'category',
          label: 'Core Services',
          items: [
            'core-services/TokenService',
            'core-services/UserAuthentication'
          ]
        },
      ]
    },
    {
      type: 'category',
      label: 'Project Skills',
      items: [
        'skills/overview',
        'skills/documentation-management',
      ]
    },
    {
      type: 'category',
      label: 'Deployment',
      items: [
        'deployment/deployment-guide',
        'deployment/docker',
        'deployment/docker-compose',
      ]
    },
    {
      type: 'category',
      label: 'Contributing',
      items: [
        'contributing/contributing',
        'contributing/localization',
      ]
    },
    'project-info',
  ],
};
