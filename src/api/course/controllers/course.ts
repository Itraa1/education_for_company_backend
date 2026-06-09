/**
 * course controller
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::course.course',
    ({ strapi }) => ({
        async create(ctx) {
            
            const userId = ctx.state.user.id;

            ctx.request.body.data = {
                ...ctx.request.body.data,
                users_permissions_user: userId,
            };
            const response = await super.create(ctx);

            return response;
        },
    }));
