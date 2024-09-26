import type { FromSchema } from 'json-schema-to-ts';
import { projectSchema } from './project-schema';

export const personalDashboardProjectDetailsSchema = {
    $id: '#/components/schemas/personalDashboardProjectDetailsSchema',
    type: 'object',
    description: 'Project details in personal dashboard',
    additionalProperties: false,
    required: ['owners', 'roles'],
    properties: {
        owners: projectSchema.properties.owners,
        roles: {
            type: 'array',
            description: 'The list of roles that the user has in this project.',
            minItems: 1,
            items: {
                type: 'object',
                description: 'An Unleash role.',
                additionalProperties: false,
                required: ['name', 'id', 'type'],
                properties: {
                    name: {
                        type: 'string',
                        example: 'Owner',
                        description: 'The name of the role',
                    },
                    id: {
                        type: 'integer',
                        example: 4,
                        description: 'The id of the role',
                    },
                    type: {
                        type: 'string',
                        enum: ['custom', 'project', 'root', 'custom-root'],
                        example: 'project',
                        description: 'The type of the role',
                    },
                },
            },
        },
    },
    components: {
        schemas: {},
    },
} as const;

export type PersonalDashboardProjectDetailsSchema = FromSchema<
    typeof personalDashboardProjectDetailsSchema
>;
