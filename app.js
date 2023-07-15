const mysql = require('mysql2');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();


const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'shivakumar',
  database: 'registration'
});

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database: ' + err.stack);
    return;
  }
  console.log('Connected to the database with id ' + connection.threadId);
});

// Serve the HTML file for the registration form
app.get('/', (req, res) => {
  res.sendFile('D:/Programs/Javascript/user_registration.html');
});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Handle form submission
app.post('/register', (req, res) => {
  // Get the form data
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;

  // Insert the user data into the table
  connection.query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, password], (err, result) => {
    if (err) {
      console.error('Error inserting data: ' + err.stack);
      res.status(500).send('Error inserting data');
      return;
    }
    console.log('Data inserted successfully');
    res.sendFile("D:/Programs/Javascript/sample.html");
  });
});
app.get('/login', (req, res) => {
  res.sendFile('D:/Programs/Javascript/login.html');
});

app.post('/login', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  connection.query(
    'SELECT * FROM users WHERE email = ? AND password = ?',
    [email, password],
    (err, results) => {
      if (err) {
        console.error('Error querying the database: ' + err.stack);
        res.status(500).send('Error querying the database');
        return;
      }

      if (results.length === 1) {
        console.log('Login successful');
        res.sendFile('D:/Programs/Javascript/sample.html');
      } else {
        console.log('Invalid email or password');
        res.status(401).send('Invalid email or password');
      }
    }
  );
});


// Start the server
app.listen(8080, () => {
  console.log('Server started on port 8080');
});
