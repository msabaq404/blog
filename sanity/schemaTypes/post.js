// schemas/post.js
export default {
  name: 'post', // Unique name for the schema
  title: 'Post', // Title displayed in the Sanity Studio
  type: 'document', // This is a document type
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required() // Make this field required
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug', // Special type for URL-friendly slugs
      options: {
        source: 'title', // Automatically generate slug from the title
        maxLength: 96
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'isPopular',
      title: 'Is Popular?',
      type: 'boolean',
      description: 'Check if this post is popular',
    },
    {
      name: 'author',
      title: 'Author',
      type: 'reference', // Link to another document
      to: { type: 'author' } // Reference the 'author' schema
    },
    {
      name: 'mainImage',
      title: 'Main image',
      type: 'image',
      options: {
        hotspot: true // Enable image cropping and focus point
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          description: 'Important for SEO and accessibility.',
          options: {
            isHighlighted: true // Makes this field more prominent in the image editor
          }
        }
      ]
    },
    {
      name: 'categories',
      title: 'Categories',
      type: 'array', // Array of references to categories
      of: [{ type: 'reference', to: { type: 'category' } }]
    },
    {
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime'
    },
    {
      name: "tags",
      title: "Tags",
      type: "array",
      of: [
        {
          type: 'reference',
          to: { type: 'tag' } // Reference to the 'tag' schema
        }
      ],
    },
    {
      name: 'body',
      title: 'Body',
      type: 'array', // Use array of block types for rich text
      of: [
        {
          type: 'block', // Standard text blocks
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H1', value: 'h1' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
            { title: 'H4', value: 'h4' },
            { title: 'Quote', value: 'blockquote' }
          ],
          lists: [{ title: 'Bullet', value: 'bullet' }, { title: 'Number', value: 'number' }],
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' }
            ],
            annotations: [
              {
                title: 'URL',
                name: 'link',
                type: 'object',
                fields: [
                  {
                    title: 'URL',
                    name: 'href',
                    type: 'url'
                  }
                ]
              }
            ]
          }
        },
        {
          type: 'image', // Allow embedding images within the rich text
          options: { hotspot: true },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative text',
              description: 'Important for SEO and accessibility.'
            }
          ]
        }
      ]
    }
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'mainImage'
    },
    prepare(selection) {
      const { author } = selection;
      return Object.assign({}, selection, {
        subtitle: author && `by ${author}`
      });
    }
  }
};