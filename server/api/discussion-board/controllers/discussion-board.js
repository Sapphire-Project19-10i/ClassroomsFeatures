'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async discussion_posts(ctx) {
    const { id } = ctx.params;
    const discussion = await strapi.services.discussion-board.findOne({id: id});
    // check if the discussion exists
    let response;
    if (discussion) {
      response = discussion.discussion_posts;
    }

    return response;
  },
};
