const client = require("./../utils/db.js");

const identifyUser = async (req, res) => {
  try {
    const { email, phoneNumber } = req.body;

    if (
      String(phoneNumber).length != 10 ||
      !String(email).match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
    ) {
      throw new Error("Your input is not valid");
    }
    // await client.connect(); // Connect to the database

    // Query to find matching row by email or phone number
    const findQuery = `
      SELECT *
      FROM contact
      WHERE email = $1 OR phone_number = $2
      ORDER BY created_at DESC
    `;

    const findRes = await client.query(findQuery, [email, phoneNumber]);

    let newEmail = email;
    let newPhoneNumber = phoneNumber;
    let linkPrecedence = "secondary";
    let linkedId = null;

    const emails = new Set();
    const phoneNumbers = new Set();
    const secondaryContactIds = new Set();
    let primaryContactId = null;

    if (findRes.rows.length > 0) {
      const matchedRow = findRes.rows[0];
      console.log("Matched row:", findRes.rows);
      linkedId = matchedRow.id;

      // Check if email or phone number matches and prepare new values
      if (
        matchedRow.email === email &&
        matchedRow.phone_number === phoneNumber
      ) {
        primaryContactId = findRes.rows[findRes.rowCount - 1].id;
        findRes.rows.forEach((row) => {
          emails.add(row.email);
          phoneNumbers.add(row.phone_number);
          if (row.link_precedence === "secondary") {
            secondaryContactIds.add(row.id);
          }
        });

        const result = {
          contact: {
            primaryContactId: primaryContactId,
            emails: Array.from(emails),
            phoneNumbers: Array.from(phoneNumbers),
            secondaryContactIds: Array.from(secondaryContactIds),
          },
        };

        res.status(200).send(result);
        return;
      } else if (matchedRow.phone_number === phoneNumber) {
        newPhoneNumber = matchedRow.phone_number; // Phone number matches, keep the same
      } else {
        newEmail = matchedRow.email; // Email matches, keep the same
      }
    } else {
      linkPrecedence = "primary";
    }

    const insertQuery = `
    INSERT INTO contact (phone_number, email,linked_id, link_precedence, created_at, updated_at)
    VALUES ($1, $2, $3,$4,$5 ,$6);
  `;
    await client.query(insertQuery, [
      newPhoneNumber,
      newEmail,
      linkedId,
      linkPrecedence,
      new Date(),
      new Date(),
    ]);

    // get the user list

    const existUser = await client.query(
      `SELECT *
      FROM contact
      WHERE email = $1 OR phone_number = $2 ORDER BY created_at`,
      [email, phoneNumber]
    );

    existUser.rows.forEach((row) => {
      emails.add(row.email);
      phoneNumbers.add(row.phone_number);
      if (row.link_precedence === "secondary") {
        secondaryContactIds.add(row.id);
      }
    });

    primaryContactId = existUser.rows[0].id;

    const result = {
      contact: {
        primaryContactId: primaryContactId,
        emails: Array.from(emails),
        phoneNumbers: Array.from(phoneNumbers),
        secondaryContactIds: Array.from(secondaryContactIds),
      },
    };

    res.status(200).send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

module.exports = {
  identifyUser,
};
