import {program} from 'commander';

const options = program
  .requiredOption('--product-id <number>', '209736')
  .option('--schedule-no <number>', '100001')
  .requiredOption('--webhook-url <string>', 'https://hooks.slack.com/services/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')
  .option('--poll-interval-millis <number>', '폴링 간격(밀리초)', '500');

export default class Config {
  static current: Config;

  readonly productId: number;
  readonly scheduleNo?: number;

  readonly webhookUrl: string;
  readonly pollIntervalMillis: number;

  static parseCommandLineArguments() {
    this.current = Config.fromCommandLineArguments();
  }

  private static fromCommandLineArguments() {
    const opts = options.parse().opts();

    return this.of({
      productId: parseInt(opts.productId),
      scheduleNo: opts.scheduleNo != null ? parseInt(opts.scheduleNo) : undefined,
      webhookUrl: opts.webhookUrl,
      pollIntervalMillis: parseInt(opts.pollIntervalMillis),
    });
  }

  static of(partial: Partial<Config>) {
    return Object.assign(new Config(), partial);
  }
}
