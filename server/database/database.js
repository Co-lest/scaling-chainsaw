import mysql from "mysql";
import { promisify } from "util";

//change age to be string

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
        const results = await query(`SELECT name, username, interests, school, hometown, age FROM users WHERE username = ? AND password = ?`, [obj.username, obj.password]);
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
        return results[0];
      } else {
        console.error(`Error getting the homepage data!`);
        return 0;
      }
    } catch (error) {
      console.error(`Error fetching homepage data! ${error}`);
      throw error;
    }
  }

export async function connectUser(obj) {
    try { 
        // friendsBe
        const results = await query(`SELECT friends
            WHERE username = ?`, [obj.username]
        );

        if (results.length > 0) {
            console.log(results);
            console.log(`${obj.username} is now a friend of ${obj.usernameToConnect}`);
        } else {
            throw new Error("Weird username doesnt exist!");
        } 

        const results2 = await query(`UPDATE users
                                    SET friends = ?
                                    WHERE username = ?`, [obj.usernameToConnect, obj.username]
                                );

        if (results2.length > 0) {
            console.log(`${obj.username} is now a friend of ${obj.usernameToConnect}`);
        }
    } catch (error) {
        console.error(`Error fetching homepage data! ${error}`);
        return;
    }
}

  export async function friendsPage(obj) {
    try {
        if (obj.type === "recommend") {
            const results = await query(`SELECT username, name, interests, school, age, hometown
                FROM users 
                WHERE school = ?
                  OR hometown = ?
                  OR age = ?
                  OR interests = ?`, [obj.school, obj.hometown, obj.age, obj.interests]        
                );
            if (results.length > 0) {
                console.log(`From friends fetched: ${results[0]}`);
                return results;
            } else {
                return 0;
            }
        } else if (obj.type === "search") {
            let names = obj.name?.split(" ") || [];
            let hometowns = obj.hometown?.split(",") || [];
            let schools = obj.school?.split(",") || [];
            let interestsArr = obj.interests?.split(",") || [];

            names = names.map((n) => n.trim()).filter(Boolean);
            hometowns = hometowns.map((h) => h.trim()).filter(Boolean);
            schools = schools.map((s) => s.trim()).filter(Boolean);
            interestsArr = interestsArr.map((i) => i.trim()).filter(Boolean);

            const allValues = [...names, ...hometowns, ...schools, ...interestsArr];

            if (allValues.length > 0) {
                const conditions = [];
                const params = [];

                names.forEach((ns) => {
                    conditions.push(`name LIKE ?`);
                    params.push(`%${ns}%`);
                });

                hometowns.forEach((ht) => {
                    conditions.push(`hometown LIKE ? OR hometown LIKE ? OR hometown LIKE ? OR hometown LIKE ?`);
                    params.push(`%, ${ht},%`, `${ht}`, `${ht},%`, `%, ${ht}`);
                });

                schools.forEach((sc) => {
                    conditions.push(`school LIKE ? OR school LIKE ? OR school LIKE ? OR school LIKE ?`);
                    params.push(`${sc}`, `%, ${sc},%`, `${sc},%`, `%, ${sc}`);
                });

                interestsArr.forEach((interest) => {
                    conditions.push(`interests LIKE ? OR interests LIKE ? OR interests LIKE ? OR interests LIKE ?`);
                    params.push(`%, ${interest},%`, `${interest}`, `${interest},%`, `%, ${interest}`);
                });

                const queryStr = `
                    SELECT username, name, interests, school, age, hometown
                    FROM users
                    WHERE ${conditions.join(' OR ')}
                `;
                const results = await query(queryStr, params);

                if (results.length > 0) {
                    console.log(results);
                    return results;
                } else {
                    console.log("No matching users found.");
                    return 0;
                }
            } else {
                console.log("No name, hometowns, schools, or interests provided.");
            }

        }
    } catch (error) {
        console.error(`Error fetching the friends data!`);
        return;
    }
  }
  
  // connection.end(); // call this function when user has finnished all the database connection I dont think the application will reach a time when this is needed
  