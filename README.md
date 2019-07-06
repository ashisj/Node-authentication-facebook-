1. cookie-parser
```
cookie-parser looks at the header in between the client and server transaction.
read those headers and parses out the cookie that are being send
```

2. express-session
```
It allows us to authenticate the transaction between the client and server
```

3.passport
```
It is a middleware for node js that uses strategy to authenticate user

Serializing User means creating unique id by using unique data for identification so no need to check for username.

Deserializing user means looking into unique id bring back all the details of the user
```