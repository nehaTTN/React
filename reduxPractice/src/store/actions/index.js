export {
 add,
 subtract,
 increment,
 decrement

} from './counter';
export {
    storeResult,
    deleteResult
} from './result';
// We are creating seperate actionCreator files for different use cases
// because it will be easier to manage
// Also we have bundled them altogether here so that we can import everthing from index.js