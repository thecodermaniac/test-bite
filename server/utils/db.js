const { Pool } = require("pg");

console.log(String(process.env.DBUSER));

const pool = new Pool({
  user: String(process.env.DBUSER),
  password: String(process.env.DBPASS),
  host: String(process.env.DBHOST),
  port: String(process.env.DBPORT),
  database: String(process.env.DATABASE),
  ssl: {
    rejectUnauthorized: true,
    ca: `-----BEGIN CERTIFICATE-----
MIIEQTCCAqmgAwIBAgIULk/omu5e8QjW0PDAILoxXwAsEH4wDQYJKoZIhvcNAQEM
BQAwOjE4MDYGA1UEAwwvMWU0NTZiNWItNzFkYy00MzE5LTkxNDQtMjk1ZjIxZjEz
YWQzIFByb2plY3QgQ0EwHhcNMjQwNzExMTY0MDU0WhcNMzQwNzA5MTY0MDU0WjA6
MTgwNgYDVQQDDC8xZTQ1NmI1Yi03MWRjLTQzMTktOTE0NC0yOTVmMjFmMTNhZDMg
UHJvamVjdCBDQTCCAaIwDQYJKoZIhvcNAQEBBQADggGPADCCAYoCggGBAIaMAh5w
+9nJEvC4eFRhcPT0637sNJT39rJPFQn05TpUoXjsXmVrXulECsXbfV0yqKzJHh3O
vd9kA/GbD0zmX1xk5oc2SmGmu7prC5zow4rCaucuQHg0jr7u5fSg5b4mhVIwMY/n
1c2pu8ei9Ap8BotDCOe6/SCvrif75EO87AmVLlupPALD8YQXNkyvxxu+LoBuW9BO
Sdl6Z85c5uPsyqXFWznEf69OVJO1hdzvWk0LjIMno8Rq9WtEa6X92kWFgvSVBqle
iGjSpUTGJKGYQqbilGIF3Mhkde/QQrtk/COJi8S/dDMkCf4UAfAICsvIvLwZbeJe
6c5WuJd1Gi8mcWhDhkCKmHep217h8pD/DByPYqn4nBQqqsEqgfO3CAeEGutW6Ysr
IwPfHxaf4wyMhfREzZ37oV5CVzPCmxBqrv+GfpjeaN2E/gTm+XXFzDAFILG76rGv
wO9qDTAWz6c+qPXe120ysOV2cJ1PiuWK08GKutkZsMzeNlTuFekptHvS+wIDAQAB
oz8wPTAdBgNVHQ4EFgQUfdllZV7I5WLpJS/Csg50L7EaxM8wDwYDVR0TBAgwBgEB
/wIBADALBgNVHQ8EBAMCAQYwDQYJKoZIhvcNAQEMBQADggGBADHjBQ9x7dSBxsaO
YDqq62rjPwnT40groPAlqJ76zlukRP+EcekhXh3pT5nnkzuxPUuq8TAKnMikjvEg
UgpH+mw/y8z8/GxvOXtpzjF6oFDuJsvORk1Yts/9zuaIJZB1p4qCpMBDlE7otZKT
12gffQz7xog+HGfqi+NGwwPiFfoRQsJwt4JfyZ8AalmxhXgkxNT7fqiQo5Bvgo+W
hwF2jJ1gYX1pWmnyQzpal/z9r80uDdcOlwCjeQ994g+PdJyVxEKUqB2SbL5K4Khw
AbZ6aQTFeU6wZxpNW0//UxOdk6uXLiPeTpsVdU0mbFsvZvpcDXXJLwShunKHfvjY
vW6Byym2lpif6d3/Bx+bnqG4T8oijl2sM+AF7MDEKkxe0nVbQliF06MaE2VOwj5j
9Cy0hmYtO1ARZQe9cdqiqhi63mIqQA6MyJI4MDKraNKDsgzehzYQxeda4ypy9rA3
qy6fj+/CpKiPv3BqiPGg1jIFZOPNrBUIkFPBjRbEq6uY745pnQ==
-----END CERTIFICATE-----`,
  },
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
