import * as prismic from '@prismicio/client'

// Fill in your repository name
export const repositoryName = 'personal-henrique'

export const client = prismic.createClient(repositoryName, {
  // If your repository is private, add an access token
  accessToken:
    'MC5aekFBZUJBQUFDY0EyYnZ1.YnUC77-9Du-_vW5C77-9RzHvv73vv73vv73vv71pMQ_vv73vv73vv71fQ--_ve-_ve-_vSbvv70PNkTvv70',

  // This defines how you will structure URL paths in your project.
  // Update the types to match the custom types in your project, and edit
  // the paths to match the routing in your project.
  //
  // If you are not using a router in your project, you can change this
  // to an empty array or remove the option entirely.
  //   routes: [
  //     {
  //       type: 'homepage',
  //       path: '/',
  //     },
  //   ],
})
