import express from "express";
import { Request, Response } from "express";
import { createConnection, createQueryBuilder } from "typeorm";
import { question_table } from "./entity/question_table";
import { status_counts } from "./entity/status_counts";
const app = express();

createConnection()
  .then((connection) => {
    console.log("DB connect");
    app.use(express.json());

    app.get("/getQuestion", async function (req: Request, res: Response) {
      const questionRepository = connection.getRepository(question_table);
      try {
        const fullData = await questionRepository.find();
        const maxDataLength = fullData.length;
        let outputData = [];
        let existNumber = [];
        do {
          let tmp = intRandom(0, maxDataLength - 1);
          if (!existNumber.includes(tmp)) {
            existNumber.push(tmp);
          }
        } while (existNumber.length !== 10);
        for (let i = 0; existNumber.length - 1 >= i; i++) {
          let tmpData = fullData[existNumber[i]];
          outputData.push(tmpData);
        }
        res.header({ "Content-Type": "application/json" });
        res.json(outputData);

        function intRandom(min, max) {
          return Math.floor(Math.random() * (max - min + 1)) + min;
        }
      } catch (err) {
        err.statusCode = 400;
        return res(err);
      }
    });

    app.get("/getSoFarResults", async function (req: Request, res: Response) {
      try {
        const countsRepository = connection.getRepository(status_counts);
        const qIdArray = req.query.qId;
        let reqJson = [];
        console.log("Test")

        const carvingDatas = [];
        for (let qIdArray_i = 0; qIdArray_i <= 9; qIdArray_i++) {
          const loadedCounts = await countsRepository.find({
            question_id: qIdArray[qIdArray_i],
          });
          let trueSum = loadedCounts.filter(
            (DataObjRecord) => DataObjRecord.status === 1
          );
          let resultRatio = Math.floor(
            (trueSum.length / loadedCounts.length) * 100
          );
          reqJson.push({
            id: qIdArray[qIdArray_i],
            trueRatio: resultRatio,
          });
        }
        res.status(201);
        return res.send(reqJson);
      } catch (err) {
        console.error(err);
        err.statusCode = 400;
        return res(err);
      }
    });

    app.post("/sendResult", async function (req: Request, res: Response) {
      try {
        const reqData = JSON.parse(JSON.stringify(req.body));
        const countsRepository = connection.getRepository(status_counts);
        const fullData = await countsRepository.find();
        let addId = fullData.slice(-1)[0].id + 1;
        console.log("OK");

        let insertValues = [];
        for (let reqDataCount_i = 0; reqDataCount_i <= 9; reqDataCount_i++) {
          let tmpValue = new status_counts();
          tmpValue.id = addId;
          addId += 1;
          tmpValue.question_id = reqData[reqDataCount_i].question_id;
          tmpValue.status = reqData[reqDataCount_i].status;
          insertValues.push(tmpValue);
        }

        await countsRepository.save(insertValues);
        res.status(201);
        return res.send("POST OK");
      } catch (err) {
        console.error(err);
        err.statusCode = 400;
        return res(err);
      }
    });

    // start express server
    app.listen(5000);
  })
  .catch((err) => console.log(err));

// これを使ってFilterメソッドで絞り込めないか？
// const loadedAllcounts = await countsRepository
//   .createQueryBuilder("status_counts")
//   .where("status_counts.question_id IN (:...question_ids)", { question_ids: qIdArray })
//   .orderBy(status_counts.question_id,"ASC")
//   .getMany()
//   .catch(e => console.error("error connecting: " + e.stack));
