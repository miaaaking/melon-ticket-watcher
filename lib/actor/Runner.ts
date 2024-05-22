import Worker from './Worker.ts';
import Config from '../Config.ts';
import {sleep} from '../common/utils.ts';
import Fetcher from './Fetcher.ts';
import Notifier from './Notifier.ts';
import PerfRepository from './PerfRepository.ts';

export default class Runner {
  async run() {
    Config.parseCommandLineArguments();

    console.log('시작');

    const fetcher = new Fetcher(Config.current);
    const repo = new PerfRepository(fetcher);

    const notifier = new Notifier(Config.current);
    const worker = new Worker(repo, notifier, Config.current);

    await notifier.notifyText('wake up');

    while (true) {
      await worker.tick();

      await sleep(Config.current.pollIntervalMillis);
    }
  }
}
