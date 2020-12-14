# MERN Chat application

This is the chat application server using Socket.io. The chat provides the ability to send audio messages, images, emoji. Also you can remove messages, track user's network status, messages checked status, etc.

## Live Demo

[Demo](https://messenger-app-mern.herokuapp.com)
(Note: use the email that you have access for confirmation)

## Tech stack

Front-end:

- React / Redux
- Typescript
- Antd
- Formik
- Axios
- Media recorder
- Emoji-mart

[Front-end repository](https://github.com/VovaNguyen11/chat-app-client.git)

Back-end:

- Node.js
- Typescript
- Express
- MongoDB / Mongoose
- Socket.io
- Nodemailer
- Cloudinary
- JWT

## Installation

1. Run `npm install`
2. Create `.env` file by typing command `cp .env.example .env`.
3. Create MongoDB account and connect to your project
   
   Add `mongodb+srv://<username>:<password>@<your-cluster-url>/chat` to your DB_CONNECTION variable in `.env` file
   See [guide](https://www.mongodb.com/blog/post/quick-start-nodejs-mongodb--how-to-get-connected-to-your-database) for more details.

4. To use email confirmation we use `nodemailer`. Add Gmail account info to `.env` file

```
NODEMAILER_USER=<your mail>@gmail.com
NODEMAILER_USER=<password>
```

5. For storing media, you have to sign up on [cloudinary.com](https://cloudinary.com/)

Then add Cloudinary data to .env file. You can find it on [Cloudinary Dashboard](https://cloudinary.com/console). See the screen below

![](https://res.cloudinary.com/drw1xjz6m/image/upload/v1607973303/cloudinary-data_xtcc0q.jpg)

6. Run `npm start`.
