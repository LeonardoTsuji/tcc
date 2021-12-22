import { createConnection } from 'typeorm';
import Debug from 'debug';

const log = Debug('api:typeorm');

async function start() {
  try {
    await createConnection();
  } catch (error) {
    log(error);
  }
}
start();
