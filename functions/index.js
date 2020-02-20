const functions = require("firebase-functions");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
/* 
const { username, password } = functions.config().mongo */
const mongouri = `mongodb://joel:jenis1986@ds113179.mlab.com:13179/rest-api`;

mongoose.connect(mongouri, { useNewUrlParser: true });

const app = express();

const Wallet = require("./wallet");
const History = require("./history");

const createServer = () => {
  app.use(cors({ origin: true }));

  /* ------------------WALLET-------------*/
  //GET wallet
  app.get("/wallet", async (req, res) => {
    const result = await Wallet.find({}).exec();
    res.send(result);
  });

  // UPDATE WALLET
  app.put("/wallet/:id", async (req, res) => {
    Wallet.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
      (err, todo) => {
        if (err) return res.status(500).send(err);
        return res.send(todo);
      }
    );
  });

  //POST WALLET
  app.post("/wallet", async (req, res) => {
    const { body } = req;
    const btc = new Wallet(body);
    await btc.save();
    res.sendStatus(204);
  });

  /* --------------- HISTORY -------------*/
  //GET HISTORY
  app.get("/history", async (req, res) => {
    const result = await History.find({}).exec();
    res.send(result);
  });

  // UPDATE HISTORY
  app.put("/history/:id", async (req, res) => {
    History.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
      (err, todo) => {
        if (err) return res.status(500).send(err);
        return res.send(todo);
      }
    );
  });

  //POST HISTORY
  app.post("/history", async (req, res) => {
    const { body } = req;
    const history = new History(body);
    await history.save();
    res.sendStatus(204);
  });

  //DELETE
  app.delete("/history/:id", async (req, res) => {
    const { id } = req.params;
    await History.deleteOne({ _id: id }).exec();
    res.sendStatus(204);
  });

  return app;
};

exports.api = functions.https.onRequest(createServer());
