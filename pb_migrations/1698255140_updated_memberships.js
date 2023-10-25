/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("a28q1qyghdqdtf0")

  collection.listRule = "@request.auth.id = assignedTo && deletedAt = \"\""
  collection.viewRule = "@request.auth.id = assignedTo && deletedAt = \"\""

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("a28q1qyghdqdtf0")

  collection.listRule = "@request.auth.id = assignedTo && deletedAt != \"\""
  collection.viewRule = "@request.auth.id = assignedTo && deletedAt != \"\""

  return dao.saveCollection(collection)
})
