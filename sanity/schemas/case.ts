// sanity/schemas/case.ts

export default {
  name: 'case',
  title: 'Case',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'procedure',
      title: 'Procedure',
      type: 'reference',
      to: [{ type: 'procedure' }],
    },
    {
      name: 'media',
      title: 'Media',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
        },
        {
          type: 'file',
          title: 'Video',
        },
      ],
    },
  ],
};
