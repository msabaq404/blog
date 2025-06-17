// schemas/schema.js (or index.js)
// import createSchema from 'part:@sanity/base/schema-creator';
// import schemaTypes from 'all:part:@sanity/base/schema-type';

// Import your custom schemas
import post from './post';
import author from './author';
import category from './category';
import tag from './tag';
import comment from './comment';

export const schemaTypes = [post, author, category,tag,comment];