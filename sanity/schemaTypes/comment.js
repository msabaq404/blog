export default {
    name: 'comment',
    title: 'Comment',
    type: 'document',
    fields: [
        {
            name: 'username',
            title: 'User Name',
            type: 'string',
            validation: Rule => Rule.required().min(1).max(50)
        },
        {
            name: 'text',
            title: 'Text',
            type: 'text',
            validation: Rule => Rule.required().min(1).max(500)
        },
        {
            name: 'postId',
            title: 'Post ID',
            type: 'reference',
            to: [{type: 'post'}],
            validation: Rule => Rule.required()
        },
        {
            name: 'timestamp',
            title: 'Timestamp',
            type: 'datetime',
            options: {
                dateFormat: 'YYYY-MM-DD',
                timeFormat: 'HH:mm:ss',
                calendarTodayLabel: 'Today'
            },
            validation: Rule => Rule.required()
        }

    ],
}