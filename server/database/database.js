import mysql from "mysql";
import { promisify } from "util";

let connectedToDatabase;

const connection = mysql.createConnection ({
    host: "localhost",
    user: "root",
    password: "",
    database: "reconnecting"
});

export async function connectDatabase() {
    return new Promise((resolve, reject) => {
        connection.connect((err) => {
            if (err) {
                console.error("Error connecting to database!");
                connectedToDatabase = false;
                reject(err);
            } else {
                console.log(`Connected to database!`);
                connectedToDatabase = true;
                resolve(connectedToDatabase);
            }
        })
    });
}

const query = promisify(connection.query).bind(connection);

export async function insertUser(obj) {
    try {
        const results = await query(`SELECT id FROM users WHERE username = ?`, [obj.username]);

        if (results.length > 0) {
            console.log("Username already exists!");
            return 0;
        } else {
            const results = await query(
                `INSERT INTO users (username, name, password, school, interests, hometown, age) VALUES (?, ?, ?, ?, ?, ?, ?)`,
                [obj.username, obj.name, obj.password, obj.school, obj.interests, obj.hometown, obj.age]
              );
            console.log(`Data inserted successfully: `, results);
            return obj;
        }
    } catch(error) {
        console.error(`Error: ${err}`);
        throw err;
    }
}

export async function loginUser(obj) {
    try {
        const results = await query(`SELECT name, interests, school, age FROM users WHERE username = ? AND password = ?`, [obj.username, obj.password]);
        if (results.length > 0) {
            console.log(`Fetched ${results} from database!`);
            return results[0];
          } else {
            console.error(`Error getting the homepage data!`);
            return 0;
          }
    } catch(error) {
        console.error(`Error fetching homepage data! ${error}`);
        throw error;
    }
}

export async function fetchHomepage(obj) {
    console.log(`Homepage data: ${obj}`);
  
    try {
      const results = await query(`SELECT username, name, interests, school, age, hometown FROM users where username = ? AND password = ?`, [obj.username, obj.password]);
  
      if (results.length > 0) {
        // console.log(`Fetched ${results} from database!`);
        return results;
      } else {
        console.error(`Error getting the homepage data!`);
        return 0;
      }
    } catch (error) {
      console.error(`Error fetching homepage data! ${error}`);
      throw error;
    }
  }

  export async function friendsPage(obj) {
    try {
        //const results = await query(`SELECT * from`); // select a whole row which has the said attribute in the incoming obect
        if (results.length > 0) {
            return results;
        } else {
            console.error(`Error getting the friends page!`);
            return 0
        }
    } catch (error) {
        
    }
  }
  
  // connection.end(); // call this function when user has finnished all the database connection I dont think the application will reach a time when this is needed
  