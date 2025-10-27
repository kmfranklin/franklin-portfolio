import type { CollectionConfig, CollectionBeforeValidateHook } from 'payload'

// Hook to generate a slug from the title if slug field is empty
const generateSlug: CollectionBeforeValidateHook = ({ data }) => {
    if (data?.title && !data.slug) {
        data.slug = data.title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-') // replace spaces/symbols with hyphens
            .replace(/^-+|-+$/g, '')     // trim leading/training hyphens
    }
    return data
}

export const Projects: CollectionConfig = {
    slug: 'projects',
    hooks: {
        beforeValidate: [generateSlug],
    },
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
            minLength: 3,
            maxLength: 100,
            admin: {
                description: 'Project name — must be 3-100 characters.',
            },
        },
        {
            name: 'slug',
            type: 'text',
            unique: true,
            admin: {
                description: 'URL-friendly ID (auto-generated if left empty).',
            },
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
            validate: (value: string | undefined | null) => {
                if (!value) return true // allow blank
                try {
                    new URL(value)
                    return true
                } catch {
                    return 'Please enter a valid URL (include http:// or https://).'
                }
            },
        },
        {
            name: 'techStack',
            label: 'Tech Stack',
            type: 'array',
            required: true,
            fields: [
                {
                    name: 'tech', 
                    type: 'text', 
                    required: true,
                    admin: {
                        placeholder: 'e.g., React',
                    },
                },
            ],
        },
    ],
}