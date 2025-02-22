// Import required libraries
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

// Connect to MongoDB Atlas
const mongoURI =
	"mongodb+srv://mrshaktiman01:nK5Epooo7G2rk5zo@cluster0.2edlu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose
	.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => console.log("Connected to MongoDB Atlas"))
	.catch((err) => console.error("MongoDB connection error:", err));

// Define User schema
const userSchema = new mongoose.Schema(
	{
		email: String,
		username: String,
		mobileNo: String,
		role: String,
		password: String,
		address: String,
		longitude: Number,
		latitude: Number,
		photo: String,
		fullName: String,
		profession: String,
		regNo: String,
		orgType: String,
		foodType: String,
		motive: String,
		employeeNos: String,
		isVerifiedNgo: { type: Boolean, default: false },
		history: [
			{
				eventName: String,
				photo: String,
				address: String,
				longitude: Number,
				latitude: Number,
				details: String,
			},
		],
		location: {
			type: { type: String, default: "Point" },
			coordinates: { type: [Number], default: [0, 0] },
		},
	},
	{ timestamps: true }
);

// Create User model
const User = mongoose.model("User", userSchema);

// Insert initial user
const insertUsers = async () => {
	try {
		const users = [
			{
				email: "pass1@gmail.com",
				username: "user00",
				mobileNo: "1111111111",
				role: "ngo",
				password:
					"$2b$12$pHhkZsb7uzPixmEVpuXHFesVQucpPitToqZq7W.Yq1hPugEDukWnO", // already hashed password
				address: "Bhalekar Chawl, Erandwane, Pune, Maharashtra 411004",
				latitude: 18.5094,
				longitude: 73.8326,
				isVerifiedNgo: false,
			},
		];

		const result = await User.insertMany(users);
		console.log("Users inserted:", result);
	} catch (err) {
		console.error("Error inserting users:", err);
	}
};

// Insert another user with hashed password ("pass@123")
const insertAnotherUser = async () => {
	try {
		const plainPassword = "pass@123";
		// Hash the password with a salt rounds of 10
		const hashedPassword = await bcrypt.hash(plainPassword, 10);

		const newUser = {
			email: "pass2@gmail.com",
			username: "user01",
			mobileNo: "2222222222",
			role: "ngo",
			password: hashedPassword,
			address: "Some Address, Pune, Maharashtra",
			latitude: 18.5204,
			longitude: 73.8567,
			isVerifiedNgo: false,
		};

		const result = await User.create(newUser);
		console.log("New user inserted:", result); 
	} catch (err) {
		console.error("Error inserting new user:", err);
	}
};

// Run both insertions sequentially then close the connection
const runInsertions = async () => {
	await insertUsers();
	await insertAnotherUser();
	mongoose.connection.close();
};

runInsertions();
