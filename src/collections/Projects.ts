import type { CollectionConfig } from 'payload'

export const Projects: CollectionConfig = {
    slug: 'projects',
    labels: {
        singular: 'Project',
        plural: 'Projects',
    },
    admin: {
        useAsTitle: 'title',
        defaultColumns: ['title', 'slug', 'updatedAt'],
    },
    fields: [
        {
            name: 'title',
            type: 'text',
            required: true,
        },
        {
            name: 'slug',
            type: 'text',
            unique: true,
        },
        {
            name: 'description',
            type: 'textarea',
        },
        {
            name: 'featuredImage',
            type: 'upload',
            relationTo: 'media',
        },
        {
            name: 'url',
            type: 'text',
            label: 'Project URL',
        },
        {
            name: 'techStack',
            label: 'Tech Stack',
            type: 'array',
            fields: [{ name: 'tech', type: 'text', required: true},
            ],
        },
    ],
}