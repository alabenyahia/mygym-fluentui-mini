/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "a28q1qyghdqdtf0",
    "created": "2023-10-25 17:23:46.480Z",
    "updated": "2023-10-25 17:23:46.480Z",
    "name": "memberships",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "ddpq0oe0",
        "name": "name",
        "type": "text",
        "required": true,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "zat1oqip",
        "name": "price",
        "type": "number",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "noDecimal": false
        }
      },
      {
        "system": false,
        "id": "6wzdydjo",
        "name": "membershipType",
        "type": "select",
        "required": true,
        "presentable": false,
        "unique": false,
        "options": {
          "maxSelect": 1,
          "values": [
            "time",
            "session"
          ]
        }
      },
      {
        "system": false,
        "id": "das8kyir",
        "name": "timeType",
        "type": "select",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "maxSelect": 1,
          "values": [
            "day",
            "month"
          ]
        }
      },
      {
        "system": false,
        "id": "m6vy5ryk",
        "name": "timeQuantity",
        "type": "number",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "noDecimal": false
        }
      },
      {
        "system": false,
        "id": "mjawbaqu",
        "name": "sessionQuantity",
        "type": "number",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "noDecimal": false
        }
      },
      {
        "system": false,
        "id": "xcvcragc",
        "name": "deletedAt",
        "type": "date",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": "",
          "max": ""
        }
      },
      {
        "system": false,
        "id": "2qzphdzm",
        "name": "assignedTo",
        "type": "relation",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "collectionId": "_pb_users_auth_",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": null
        }
      }
    ],
    "indexes": [],
    "listRule": "@request.auth.id = assignedTo && deletedAt != \"\"",
    "viewRule": "@request.auth.id = assignedTo && deletedAt != \"\"",
    "createRule": "@request.auth.id != \"\"",
    "updateRule": "@request.auth.id = assignedTo",
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("a28q1qyghdqdtf0");

  return dao.deleteCollection(collection);
})
