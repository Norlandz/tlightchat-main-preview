// import dotenv from 'dotenv';
import dotenvFlow from 'dotenv-flow';
// dotenv.config({ override: true }); // must not call else // [dotenv-flow@4.1.0]: environment variable `TEST_LOCAL_OVERWRITE` is predefined and not being overwritten
dotenvFlow.config({ debug: true });