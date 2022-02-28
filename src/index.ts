import express from "express";
import { Request, Response } from "express";
import { createConnection, createQueryBuilder } from "typeorm";
import { QuestionTable } from "./entity/QuestionTable";
import { StatusCounts } from "./entity/StatusCounts";
const app = express();

createConnection()
  .then((connection) => {
    const jaDate = new Date().toLocaleString('ja-JP')
    console.log(jaDate + " in Japan.DB connect");
    app.use(express.json());

    app.get("/getQuestion", async function (req: Request, res: Response) {
      const questionRepository = connection.getRepository(QuestionTable);
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

    app.get("/getResult", async function (req: Request, res: Response) {
      const questionRepository = connection.getRepository(QuestionTable);
      const countsRepository = connection.getRepository(StatusCounts);
      try {
        const resultData = await questionRepository.find({ relations: ["statusCounts"] });

          console.log("2")
        res.header({ "Content-Type": "application/json" });
        return res.json(resultData);
      } catch (err) {
        res.json("指定されたIDはありませんでした。");
        err.statusCode = 400;
        console.log(err.stack)
        return res(err);
      }
    });

    app.get("/getSoFarResults", async function (req: Request, res: Response) {
      try {
        const countsRepository = connection.getRepository(StatusCounts);
        const qIdArray = req.query.qId;
        let reqJson = [];

        const carvingDatas = [];
        for (let qIdArray_i = 0; qIdArray_i <= 9; qIdArray_i++) {
          const loadedCounts = await countsRepository.find({
            questionId: qIdArray[qIdArray_i],
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
        const countsRepository = connection.getRepository(StatusCounts);
        const fullData = await countsRepository.find();
        let addId = fullData.slice(-1)[0].id + 1;
        console.log("OK");

        let insertValues = [];
        for (let reqDataCount_i = 0; reqDataCount_i <= 9; reqDataCount_i++) {
          let tmpValue = new StatusCounts();
          tmpValue.id = addId;
          addId += 1;
          tmpValue.questionId = reqData[reqDataCount_i].questionId;
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
    app.listen(8080);
  })
  .catch((err) => console.log(err));

// これを使ってFilterメソッドで絞り込めないか？
// const loadedAllcounts = await countsRepository
//   .createQueryBuilder("StatusCounts")
//   .where("StatusCounts.questionId IN (:...questionIds)", { questionIds: qIdArray })
//   .orderBy(StatusCounts.questionId,"ASC")
//   .getMany()
//   .catch(e => console.error("error connecting: " + e.stack));

// 何故か10飛びでインサートされるのでインクリメントを設定している。DB側で設定したいので要修正
// set @@auto_increment_offset=1;
// set @@auto_increment_increment=1;
// SHOW VARIABLES LIKE 'auto_inc%';
