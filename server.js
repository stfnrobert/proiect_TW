const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

const mongoURI = 'mongodb+srv://admin:admin123@programarecoafor.bay6z.mongodb.net/?retryWrites=true&w=majority&appName=ProgramareCoafor';
mongoose
    .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('MongoDB connection error:', err));

const appointmentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    service: { type: String, required: true },
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

app.post('/submit', async (req, res) => {
    console.log('Received data:', req.body);
    try {
        const newAppointment = new Appointment(req.body);
        await newAppointment.save();
        res.status(200).send('Appointment booked successfully!');
    } catch (error) {
        console.error('Error saving appointment:', error);
        res.status(500).send('Error booking appointment: ' + error.message);
    }
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
