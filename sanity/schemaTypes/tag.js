export default {
    name: 'tag',
    title: 'Tag',
    type: 'document',
    fields: [
        {
            name: 'name',
            title: 'Name',
            type: 'string',
            validation: Rule => Rule.required().custom((value) => {
                if (!/^\w+$/.test(value)) {
                    return 'Tag must be a single word'
                }
                return true
            })
        },
        {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'name',
                maxLength: 96,
            },
        }
    ],
}