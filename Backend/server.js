/* eslint-disable spaced-comment */
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const passport = require("passport");
const ejs = require("ejs");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const path = require("path");
const jwt = require("jsonwebtoken");
const LocalStrategy = require("passport-local").Strategy;
const { Strategy, ExtractJwt } = require("passport-jwt");
const session = require("express-session");
const MongoDBSession = require("connect-mongodb-session")(session);
const User = require("./models/authentication/user.model");
// ! --------------- nodemailer --------------------

// const nodemailer = require("nodemailer");
// const hbs = require("nodemailer-express-handlebars");

// const viewPath = path.resolve(__dirname, "./templates/views/");
// const partialsPath = path.resolve(__dirname, "./templates/partials");

// ! -----------------------------------
// require("dotenv").config();
require("dotenv").config({ path: ".env" });

//app config
const app = express();
const port = process.env.PORT || 5000;
app.set("view engine", "ejs");

app.use(cors());
app.use(bodyParser.json({ limit: "100mb" }));
app.use(express.json({ limit: "100mb" }));
// !
app.use(morgan("dev"));
app.use(cookieParser());
// !
app.use("/uploads", express.static("uploads")); // to acsses the uploades folder in the server
// Configure Mongo
// const dbUrl = "mongodb://localhost/HozlaDB";
const dbUrl = process.env.DB_URL;

// Connect to Mongo with Mongoose
// Connect to Mongo with Mongoose

const store = new MongoDBSession({
  uri: dbUrl,
  collection: "sessions",
});

mongoose
  .connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true,
  })
  .then(() =>
    console.log("MongoDB database connection established successfully")
  )
  .catch((err) => console.log(err));

//user routes
const authRoutes = require("./routes/authentication/auth");
const userRoutes = require("./routes/authentication/users");
app.use("/AtalReservesApi", authRoutes);
app.use("/AtalReservesApi", userRoutes);

app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    store: store,
    cookie: {
      maxAge: 60 * 60 * 1000 * 24, // 1 day
      secure: false, // Set to true if using HTTPS
      httpOnly: true,
    },
  })
);

passport.use(
  new Strategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.SECRET,
    },
    function (jwtPayload, done) {
      return done(null, jwtPayload);
    }
  )
);

// Configure the local strategy
passport.use(
  "local",
  new LocalStrategy(
    { usernameField: "personalnumber", passwordField: "adminpassword" },
    (personalnumber, adminpassword, done) => {
      console.log(personalnumber, adminpassword);
      if (adminpassword !== process.env.PASS) {
        return done(new Error("invalid admin password"), null);
      }
      User.findOne({ personalnumber })
        .then((user) => {
          if (!user || !user.approved) {
            if (!user) return done("not found", null);
            if (!user.approved) return done("not approved", null);
          } else {
            // let gdodsAproved = getUserGdodArray(
            //   user.toObject(),
            //   banks.Unit_bank
            // );
            // if (typeof gdodsAproved === "string") gdodsAproved = [gdodsAproved];
            done(null, user.toObject());
          }
        })
        .catch((err) => {
          // logger(err);
          return done(err, null);
        });
    }
  )
);

app.use(passport.initialize());
app.use(passport.session());

app.post("/public/sso_signin", async (req, res, next) => {
  const jwtToken = req.body.jwtToken;
  let data;
  try {
    if (process.env.DEFAULT_USER) {
      data = {
        lname: process.env.DEFAULT_USERLNAME,
        fname: process.env.DEFAULT_USERFNAME,
        pn: process.env.DEFAULT_USER,
      };
    } else {
      data = jwt.verify(jwtToken, process.env.SECRET_KEY_JWT);
    }
  } catch (e) {}

  if (!data) {
    res.json({ error: true, error_message: "wrongful_jwt" });
    return;
  }
  req.body.personalnumber = data.pn;
  req.body.adminpassword = process.env.PASS;
  passport.authenticate("local", { session: false }, (err, user, info) => {
    if (err) {
      if (err === "not validated")
        return res.status(400).json({
          error: false,
          error_message: "שגיאה - המשתמש לא מאושר. בקש ממנהל מערכת לאשר אותך",
        });
      if (err === "not found") {
        return res.json({ error: false, data: { found: false, ...data } });
      }
    }
    if (!user) {
      return res
        .status(400)
        .json({ error: true, error_message: "שגיאה - המשתמש לא נמצא" });
    }
    req.login(user, { session: false }, (err) => {
      if (err) {
        return res
          .status(400)
          .json({ error: true, error_message: err.message });
      }

      return res.json({
        error: false,
        data: {
          found: true,
          jwt: jwt.sign(user, process.env.SECRET),
          user: btoa(encodeURIComponent(JSON.stringify(user))),
        },
      });
    });
  })(req, res, next);
});

if (process.env.NODE_ENV === "production") {
  //set static folder
  app.use(express.static("frontend/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
}

app.post("/public/admin_signin", async (req, res, next) => {
  passport.authenticate("local", { session: false }, (err, user, info) => {
    if (err) {
      if (err === "not approved")
        return res
          .status(400)
          .json({ error: true, error_message: "שגיאה - המשתמש לא מאושר" });
      if (err === "not found") {
        return res
          .status(400)
          .json({ error: true, error_message: "שגיאה - המשתמש לא נמצא" });
      }
    }
    if (!user) {
      return res
        .status(400)
        .json({ error: true, error_message: "שגיאה - המשתמש לא נמצא" });
    }
    req.login(user, { session: false }, (err) => {
      if (err) {
        return res
          .status(400)
          .json({ error: true, error_message: err.message });
      }

      return res.json({
        error: false,
        data: {
          jwt: jwt.sign(user, process.env.SECRET),
          user: btoa(encodeURIComponent(JSON.stringify(user))),
        },
      });
    });
  })(req, res, next);
});

app.get(
  "/AtalReservesApi/get_user",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    if (req) {
      res.json({ data: req.user });
    } else {
      res.json({ error: true, error_message: "not authenticated" });
    }
  }
);

const arenas = require("./routes/arenas/arenas");
app.use(
  "/AtalReservesApi/arenas",
  // passport.authenticate("jwt", { session: false }),
  arenas
);

const centers = require("./routes/centers/centers");
app.use(
  "/AtalReservesApi/centers",
  // passport.authenticate("jwt", { session: false }),
  centers
);

const environments = require("./routes/environments/environments");
app.use(
  "/AtalReservesApi/environments",
  passport.authenticate("jwt", { session: false }),
  environments
);

const frames = require("./routes/frames/frames");
app.use(
  "/AtalReservesApi/frames",
  passport.authenticate("jwt", { session: false }),
  frames
);

const hativas = require("./routes/hativas/hativas");
app.use(
  "/AtalReservesApi/hativas",
  passport.authenticate("jwt", { session: false }),
  hativas
);

const registerunit = require("./routes/registerunit/registerunit");
app.use(
  "/AtalReservesApi/registerunit",
  passport.authenticate("jwt", { session: false }),
  registerunit
);

const professions = require("./routes/professions/professions");
app.use(
  "/AtalReservesApi/professions",
  passport.authenticate("jwt", { session: false }),
  professions
);

const refrence = require("./routes/refrence/refrence");
app.use(
  "/AtalReservesApi/refrence",
  passport.authenticate("jwt", { session: false }),
  refrence
);

const reserves = require("./routes/reserves/reserves");
app.use(
  "/AtalReservesApi/reserves",
  passport.authenticate("jwt", { session: false }),
  reserves
);

const occupations = require("./routes/occupations/occupations");
app.use(
  "/AtalReservesApi/occupations",
  passport.authenticate("jwt", { session: false }),
  occupations
);

//* file uploader Routes
// upload files
const fileuploaderRoutes = require("./routes/fileuploader/fileuploader");
app.use("/AtalReservesApi", fileuploaderRoutes);

// app.post(
//   // "/api/signin", async (req, res, next) => {
//   // 	// console.log(req.body);
//   // 	const visit = new Date().toISOString();
//   // 	let tmp = await User.findOne({ personalnumber: req.body.personalnumber });
//   // 	// console.log(tmp);

//   // 	if (!tmp) {
//   // 		res.clearCookie("session_cookie");
//   // 		res.status(400).json({ err: "deleted cookie, try again" });
//   // 		return;
//   // 	}
//   // 	const userGdodArr = await getUserGdodArray(tmp, Unit_bank);
//   // 	//* checking if user has a session and updating session if the user has changed premissions
//   // 	const sh = await Session.findOneAndUpdate(
//   // 		{
//   // 			"session.user.personalnumber": req.body.personalnumber,
//   // 		},
//   // 		{
//   // 			$set: {
//   // 				"session.user": tmp,
//   // 				"session.Lastvisit": visit,
//   // 				"session.gdodsAproved": userGdodArr,
//   // 				"session.active_session_id": req.session.id,
//   // 			},
//   // 		}
//   // 	);
//   // 	if (sh != null || sh != undefined) next();
//   // 	else
//   // 		try {
//   // 			if (tmp.approved === true) {
//   // 				//* making a new session in the db
//   // 				req.session.user = new User(tmp);
//   // 				req.session.Lastvisit = visit;
//   // 				req.session.gdodsAproved = userGdodArr;
//   // 				req.session.active_session_id = req.session.id;
//   // 			} else {
//   // 				res
//   // 					.status(400)
//   // 					.json({ err: "user not approved, please log in again" });
//   // 			}
//   // 		} catch (error) {
//   // 			console.log(
//   // 				"that's not a bad error ;) , just caching in case making a new user so there are no recoreds of user.approved"
//   // 			);
//   // 			console.error(error);
//   // 			res.status(400).json("send the request again");
//   // 		}
//   // 	next();
//   // }

//   "/api/admin_signin",
//   async (req, res, next) => {
//     passport.authenticate("local", { session: false }, (err, user, info) => {
//       if (err) {
//         return res
//           .status(400)
//           .json({ error: true, error_message: err.message });
//       }
//       if (!user) {
//         return res
//           .status(400)
//           .json({ error: true, error_message: "wrong credentials" });
//       }
//       req.login(user, { session: false }, (err) => {
//         if (err) {
//           return res
//             .status(400)
//             .json({ error: true, error_message: err.message });
//         }

//         return res.json({
//           error: false,
//           data: {
//             jwt: jwt.sign(user, process.env.SECRET),
//             user: btoa(encodeURIComponent(JSON.stringify(user))),
//           },
//         });
//       });
//     })(req, res, next);
//   }
// );

// app.get(
//   "/api/get_user",
//   passport.authenticate("jwt", { session: false }),
//   (req, res) => {
//     console.log(req.user);
//     if (req) {
//       res.json({ data: req.user });
//     } else {
//       res.json({ error: true, error_message: "not authenticated" });
//     }
//   }
// );

//! ----------------- nodemailer --------------------
// app.use(express.static(path.join(__dirname, "./public")));
// app.post("/AtalReservesApi/sendemail", (req, res) => {
//   console.log(req.body);
//   const { mail } = req.body;
//   const { type } = req.body;
//   const { msd } = req.body;
//   const { reportID } = req.body;
//   const { zadik } = req.body;
//   const { amlah } = req.body;
//   const mailList = mail.map((m) => m.mail);
//   res.status(200).send({
//     status: "200",
//     message: "Mail Sent!",
//   });
//   sendEmail(mailList, type, msd, reportID, zadik, amlah);
// });
// app.post("/AtalReservesApi/sendemail/sourceHoli", (req, res) => {
//   console.log("sendemail/sourceHoli");
//   console.log(req.body);
//   // const { sourceHoli } = req.body;
//   const { mail } = req.body;
//   const { msd } = req.body;
//   const { reportID } = req.body;
//   const { zadik } = req.body;
//   const { amlah } = req.body;
//   // const mailList = mail.map((m) => m.mail);
//   res.status(200).send({
//     status: "200",
//     message: "Mail Sent!",
//   });
//   sendEmailSourceHoli(mail, msd, reportID, zadik, amlah);
// });
// //FIXME_ARMY -  - uncomand the  process.env.MAIL and process.env.MAIL_PASS lines (the working mail and pass in the army)
// const transport = nodemailer.createTransport({
//   service: "Outlook",
//   // logger: true,
//   // debug: true,
//   // FIXME_ARMY - uncomand the host and the port, a copy from the given one in the manual
//   // host: "",
//   // port: ,
//   auth: {
//     user: "mail@outlook.com",
//     // user: "mail@outlook.com",
//     // user: process.env.MAIL,
//     pass: "pass",
//     // pass: "process.env.MAIL_PASS",
//   },
// });

// const sendEmail = (mailList, type, msd, reportID, zadik, amlah) => {
//   ejs.renderFile(
//     __dirname + "/templates/welcome.ejs",
//     { type, msd, reportID, zadik, amlah },
//     (err, data) => {
//       if (err) {
//         console.log(err);
//       } else {
//         var mailOptions = {
//           from: "mail@outlook.com",
//           // from: process.env.MAIL,
//           to: mailList,
//           subject: `עדכון לבקשת חוליה ${msd}`,
//           html: data,
//           attachments: [
//             {
//               filename: "Logo.png",
//               path: path.resolve(__dirname, "./image/HoliyotLogo.png"),
//               cid: "logo", //my mistake was putting "cid:logo@cid" here!
//             },
//           ],
//           // text: type,
//           // template: "index",
//           // attachments: [
//           //   { filename: "abc.jpg", path: path.resolve(__dirname, "./image/abc.jpg") },
//           // ],
//         };

//         transport.sendMail(mailOptions, (error, info) => {
//           if (error) {
//             return console.log(error);
//           }
//           console.log("Message sent: %s", info.messageId);
//         });
//       }
//     }
//   );
// };

// const sendEmailSourceHoli = (mailList, msd, reportID, zadik, amlah) => {
//   ejs.renderFile(
//     __dirname + "/templates/sourceHoli.ejs",
//     { msd, reportID, zadik, amlah },
//     (err, data) => {
//       if (err) {
//         console.log(err);
//       } else {
//         var mailOptions = {
//           from: "mail@outlook.com",
//           // from: process.env.MAIL,
//           to: mailList,
//           subject: `נדרש שיוך חוליה לבקשה מספר ${msd}`,
//           html: data,
//           attachments: [
//             {
//               filename: "Logo.png",
//               path: path.resolve(__dirname, "./image/HoliyotLogo.png"),
//               cid: "logo", //my mistake was putting "cid:logo@cid" here!
//             },
//           ],
//           // text: type,
//           // template: "index",
//           // attachments: [
//           //   { filename: "abc.jpg", path: path.resolve(__dirname, "./image/abc.jpg") },
//           // ],
//         };

//         transport.sendMail(mailOptions, (error, info) => {
//           if (error) {
//             return console.log(error);
//           }
//           console.log("Message sent: %s", info.messageId);
//         });
//       }
//     }
//   );
// };
// ! -------------------------------------

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

// to run type: npm run devStart
