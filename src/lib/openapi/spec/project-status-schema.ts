import type { FromSchema } from 'json-schema-to-ts';
import { projectActivitySchema } from './project-activity-schema';

export const projectStatusSchema = {
    $id: '#/components/schemas/projectStatusSchema',
    type: 'object',
    additionalProperties: false,
    required: ['activityCountByDate', 'resources', 'averageHealth'],
    description:
        'Schema representing the overall status of a project, including an array of activity records. Each record in the activity array contains a date and a count, providing a snapshot of the project’s activity level over time.',
    properties: {
        activityCountByDate: {
            $ref: '#/components/schemas/projectActivitySchema',
            description:
                'Array of activity records with date and count, representing the project’s daily activity statistics.',
        },
        averageHealth: {
            type: 'integer',
            minimum: 0,
            description:
                'The average health score over the last 4 weeks, indicating whether features are stale or active.',
        },
        resources: {
            type: 'object',
            additionalProperties: false,
            required: [
                'connectedEnvironments',
                'apiTokens',
                'members',
                'segments',
            ],
            description: 'Key resources within the project',
            properties: {
                connectedEnvironments: {
                    type: 'integer',
                    minimum: 0,
                    description:
                        'The number of environments that have received SDK traffic in this project.',
                },
                apiTokens: {
                    type: 'integer',
                    minimum: 0,
                    description:
                        'The number of API tokens created specifically for this project.',
                },
                members: {
                    type: 'integer',
                    minimum: 0,
                    description:
                        'The number of users who have been granted roles in this project. Does not include users who have access via groups.',
                },
                segments: {
                    type: 'integer',
                    minimum: 0,
                    description:
                        'The number of segments that are scoped to this project.',
                },
            },
        },
    },
    components: {
        schemas: {
            projectActivitySchema,
        },
    },
} as const;

export type ProjectStatusSchema = FromSchema<typeof projectStatusSchema>;
