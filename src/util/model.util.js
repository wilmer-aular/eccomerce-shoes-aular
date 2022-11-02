export const withId = (model) => {
  if (model) {
    const newModel = { ...model["_doc"] };
    newModel.id = newModel["_id"];
    return newModel;
  }
  return model;
};

export const manyWithId = (data) => {
  if (data && data.length) {
    return data.map(withId);
  }
  return data;
};
