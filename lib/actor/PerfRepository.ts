import Schedule from '../model/Schedule.ts';
import Fetcher from './Fetcher.ts';
import Seat from '../model/Seat.ts';
import ScheduleParser from './ScheduleParser.ts';
import SeatMapParser from './SeatMapParser.ts';

export default class PerfRepository {
  constructor(private readonly fetcher: Fetcher) {}

  async getSchedules(): Promise<Schedule[]> {
    const fetched = await this.fetcher.fetchSchedules();

    return new ScheduleParser(fetched).allSchedules();
  }

  async getSeats(scheduleNo: number): Promise<Seat[]> {
    const fetched = await this.fetcher.fetchSeatMap(scheduleNo);

    return new SeatMapParser(fetched).allSeats();
  }
}
