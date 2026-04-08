module.exports = {
  project: {
    read: ["admin", "user"],
    create: ["admin", "user"],
    update: ["admin"],
    delete: ["admin"]
  },

  instrument: {
    read: ["admin", "user"],
    create: ["admin", "user"],
    update: ["admin"],
    delete: ["admin"]
  },

  lab: {
    read: ["admin"],
    create: ["admin"],
    update: ["admin"],
    delete: ["admin"]
  },

  test: {
    read: ["admin"],
    create: ["admin"],
    update: ["admin"],
    delete: ["admin"]
  },

  user: {
    read: ["admin"],
    create: ["admin"],
    update: ["admin"],
    delete: ["admin"]
  },

  rawMaterial: {
  read: ["admin"],
  create: ["admin"],
  update: ["admin"],
  delete: ["admin"]
}
};