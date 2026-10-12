// The repository owns storage and id generation. Replacing this Map with Prisma
// will change this file only; services, controllers, routes, and response shapes stay unchanged.

const posts = new Map([
  [1, { id: 1, title: 'First post', body: 'Repository boundaries protect change.', authorId: 7 }],
  [2, { id: 2, title: 'Second post', body: 'Services should speak in domain language.', authorId: 8 }],
]);

let nextId = 3;

function copyPost(post) {
  return post ? { ...post } : null;
}

function findAll() {
  return Array.from(posts.values(), copyPost);
}

function findById(id) {
  return copyPost(posts.get(Number(id)));
}

function create(fields) {
  const post = { id: nextId++, ...fields };
  posts.set(post.id, post);
  return copyPost(post);
}

function update(id, patch) {
  const numericId = Number(id);
  const existing = posts.get(numericId);
  if (!existing) return null;

  const updated = { ...existing, ...patch, id: existing.id };
  posts.set(numericId, updated);
  return copyPost(updated);
}

function remove(id) {
  return posts.delete(Number(id));
}

module.exports = { findAll, findById, create, update, remove };
