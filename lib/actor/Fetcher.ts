import fetch from 'node-fetch';
import Config from '../Config.ts';
import {interceptParameter} from '../common/utils.ts';

export default class Fetcher {
  constructor(private readonly config: Config) {}

  private urls = {
    schedules: () =>
      `https://tktapi.melon.com/api/product/schedule/daylist.json?prodId=${this.config.productId}&pocCode=SC0002&perfTypeCode=GN0001&sellTypeCode=ST0001&corpCodeNo=&prodTypeCode=PT0001&reflashYn=N&requestservicetype=P`,
    seats: (scheduleNo: number) =>
      `https://m.ticket.melon.com/tktapi/product/seat/seatMapList.json?v=1&prodId=${this.config.productId}&pocCode=SC0002&scheduleNo=${scheduleNo}&blockTypeCode=SE0001&callback=getSeatListCallBack`,
      // `https://ticket.melon.com/tktapi/product/block/summary.json?v=1&callback=getBlockSummaryCountCallBack`
    // `https://ticket.melon.com/tktapi/product/block/summary.json?v=1&callback=getBlockSummaryCountCallBack&prodId=${this.config.productId}&pocCode=SC0002&scheduleNo=100001&perfDate=20240629&corpCodeNo=`
  };

  async fetchSchedules(): Promise<any> {
    const response = await fetch(this.urls.schedules(), {
      method: 'GET',
      headers: {'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36'}
    });

    return await response.json();
  }

  async fetchSeatMap(scheduleNo: number): Promise<any> {
    const response = await fetch(this.urls.seats(scheduleNo), {
      method: 'POST',
      headers: {'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'Accept': '*/*',
        'Referer': 'https://ticket.melon.com/reservation/popup/onestop.htm',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36'}
      // body: 'prodId=209736,pocCode=SC0002,scheduleNo=100001,perfDate=20240629,corpCodeNo=',
    });

    return interceptParameter('getSeatListCallBack', await response.text());
    // return interceptParameter('getBlockSummaryCountCallBack', await response.text());
  }
}
