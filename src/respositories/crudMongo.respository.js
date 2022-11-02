import { manyWithId, withId } from "../util/model.util.js";
class CrudMongo {

    constructor(model) {
        this.model = model;
    }

    async find(id) {
        if (id) {
            const data = await this.model.findById(id);
            return withId(data);
        }
        return await this.model.find({}).sort({ createdDate: -1 }).exec().then(manyWithId);
    };

    async byId(id) {
        const data = await this.model.findById(id);
        return withId(data);
    };

    async create(data) {
        data.timestamp = new Date();
        const modelInstance = new this.model(data);
        await modelInstance.validate();
        return modelInstance.save();
    };

    async update(id, newData) {
        return await this.model.findByIdAndUpdate(id, newData, { new: true });
    };

    async deleteById(id) {
        await this.model.findByIdAndDelete(id);
        return { success: true, id };
    };

};

export default CrudMongo;