import mongoose from "mongoose";
import bcrypt from "bcrypt";

const personSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number },
    work: { type: String, enum: ['waiter', 'chef', 'manager'], required: true },
    mobile: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    address: { type: String, required: true },
    salary: { type: Number, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true }
});

// Hash password before saving
personSchema.pre('save', async function (next) {
    const person = this;
    if (!person.isModified('password')) return next();
    try {
        const salt = await bcrypt.genSalt(10);
        person.password = await bcrypt.hash(person.password, salt);
        next();
    } catch (error) {
        next(error); // ✅ Proper error handling
    }
});

// Compare password method
personSchema.methods.comparePassword = async function (candidatePassword) {
    try {
        return await bcrypt.compare(candidatePassword, this.password);
    } catch (error) {
        throw error;
    }
};

const Person = mongoose.model('Person', personSchema);
export { Person };
