// import winston from 'winston';
// const { timestamp, combine, colorize, printf, errors, label, json } = winston.format;
//
//
// // Typescript, merge object types? - Stack Overflow
// // https://stackoverflow.com/questions/49682569/typescript-merge-object-types
// // Union Type Merging in Typescript - DEV Community
// // https://dev.to/lucianbc/union-type-merging-in-typescript-9al
// // ~~~~// type just doesnt work, the Typescript cant recognize of 'key any' -- [key: string]: any property is missing
// // ~~~~//no_knowlres cannot overwrite type for inline var
// // >> Force Type
// interface TransformableInfo_CustomMeta extends winston.Logform.TransformableInfo {
//   topics: string[] | LoggerTopic[];
//   tags: string[];
// }
//
// const logFormat = printf((info: winston.Logform.TransformableInfo) => {
//   // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
//   const { timestamp, level, message, stack, topics, tags, label } = info as TransformableInfo_CustomMeta;
//   return `${timestamp} ${topics} ${tags} ${level}: ${stack || message}`;
// });
//
// export const logger = winston.createLogger({
//   level: 'debug',
//   // format: winston.format.simple(),
//   format: combine(
//     //
//     colorize(),
//     timestamp({ format: 'HH:mm:ss_SSS' }),
//     // label({ label: 'T@g' }),
//     errors({ stack: true }),
//     // json(),
//     logFormat
//   ),
//   // defaultMeta: { service: 'user-service' },
//   transports: [
//     //
//     new winston.transports.Console(),
//     // new winston.transports.File({ filename: 'combined.log' }),
//   ],
// });
//
// // //
// // // If we're not in production then log to the `console` with the format:
// // // `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
// // //
// // if (process.env.NODE_ENV !== 'production') {
// //   logger.add(new winston.transports.Console({
// //     format: winston.format.simple(),
// //   }));
// // }
//
// // @knowlres,intro: winstonjs/winston: A logger for just about everything.
// // @knowlres,intro: https://github.com/winstonjs/winston#profiling
// // @knowlres,intro:
// // @knowlres,intro: Node winston logging | logging in Node - YouTube
// // @knowlres,intro: https://www.youtube.com/watch?v=A5YiqaQbsyI
//
// // "outputCapture": "std", // for winston logger
//
// // []
// // Properties **besides level and message** are considered as "`meta`". i.e.:
// //
// // ```js
// // const { level, message, ...meta } = info;
// // ```
// //
// // Several of the formats in `logform` itself add additional properties:
// //
// // | Property | Format added by | Description |
// // | --- | --- | --- |
// // | `splat` | `splat()` | String interpolation splat for `%d %s`\-style messages. |
// // | `timestamp` | `timestamp()` | timestamp the message was received. |
// // | `label` | `label()` | Custom label associated with each message. |
// // | `ms` | `ms()` | Number of milliseconds since the previous log message. |
// // <>
// // https://github.com/winstonjs/winston#profiling
//
// // ;no_knowlres; const category1 = winston.loggers.get('category1');
// // ;no_knowlres; ~~~~// not tag logger; better just meta for now
//
// // logger.debug('Logger initialized');
// // logger.debug('Logger initialized');
// // logger.debug('Logger initialized');
// // logger.error('Logger initialized');
// // throw new Error('Logger initialized');
// // logger.debug('Logger initialized');

enum LoggerTopic {
  XstateParentChildMachineCommunication = 'XstateParentChildMachineCommunication',
}

class Logger {
  public readonly arr_LogGivenTopics: (string | LoggerTopic)[] = []; // @config
  public mode_LogAllTopics = false;
  public mode_PrintWithTopics = false;
  public mode_PrintWithTags = false;
  public mode_ShowEmptyTopicArr = false;
  public mode_ShowEmptyTagArr = false;

  public log(obj: unknown, topics: (string | LoggerTopic)[] = [], tags: string[] = []) {
    if (this.mode_LogAllTopics) {
      this.log_helper(obj, topics, tags);
    } else {
      for (const topic_curr of topics) {
        if (this.arr_LogGivenTopics.includes(topic_curr)) {
          this.log_helper(obj, topics, tags);
        }
      }
    }
  }

  private log_helper(obj: unknown, topics: (string | LoggerTopic)[] = [], tags: string[] = []) {
    let str_TopicPart: string | null = null;
    if (this.mode_PrintWithTopics && topics.length > 0) {
      str_TopicPart = `[${topics.join(', ')}]`;
    } else {
      if (this.mode_ShowEmptyTopicArr) {
        str_TopicPart = '[]';
      }
    }
    let str_TagPart: string | null = null;
    if (this.mode_PrintWithTags && tags.length > 0) {
      str_TagPart = `[${tags.join(', ')}]`;
    } else {
      if (this.mode_ShowEmptyTagArr) {
        str_TagPart = '[]';
      }
    }

    const str_separator = '::';
    let str_WholePrependPart: string | null = null;
    if (str_TopicPart && str_TagPart) {
      str_WholePrependPart = `${str_TopicPart} ${str_TagPart}${str_separator} `;
    } else if (str_TopicPart) {
      str_WholePrependPart = `${str_TopicPart}${str_separator} `;
    } else if (str_TagPart) {
      str_WholePrependPart = `${str_TagPart}${str_separator} `;
    }

    if (str_WholePrependPart) {
      console.log(`${str_WholePrependPart}${obj}`);
    } else {
      console.log(obj);
    }
  }
}

const logger = new Logger();
logger.mode_LogAllTopics = true;
logger.mode_PrintWithTopics = true;
logger.mode_PrintWithTags = true;
logger.mode_ShowEmptyTopicArr = true;
logger.mode_ShowEmptyTagArr = false;

export default logger;

// console.log('666');
// console.log(['alpha', 'beta', 'gamma']);
// console.log(['alpha', 'beta', 'gamma'] + 'Connn');
// console.log(['alpha', 'beta', 'gamma'].toString());
// logger.log({ msg: 'Sample go there.' }, ['Feat1', 'BookConstruction', LoggerTopic.XstateParentChildMachineCommunication], ['on fly', 'many dots']);
// logger.log({ msg: 'Sample go there.' }, ['Feat1', 'BookConstruction', LoggerTopic.XstateParentChildMachineCommunication]);
// logger.log({ msg: 'Sample go there.' });

// TODO use builder pattern & support original log syntax 
