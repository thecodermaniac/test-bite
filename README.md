## Live Link (test on postman)
https://test-bite.onrender.com

### sample request

post request endpoint :- https://test-bite.onrender.com/identify
```bash
  {
  "email": "george@hillvalley.edu",
  "phoneNumber": "7171712719"
  }

```

## To run on local 

```bash
git clone  https://github.com/thecodermaniac/test-bite.git
```
### Change folder 
```bash
cd .\server\
```
### install dependencies
```bash
npm install
```
### create a .env file to and add the following
```bash
PORT=
DBUSER=
DBHOST=
DBPORT=
DBPASS=
DATABASE=
```
### run the server 
``` bash
npm run dev
```
