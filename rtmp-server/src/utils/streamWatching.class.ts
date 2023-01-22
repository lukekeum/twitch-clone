interface StreamViewers {
  ip: string;
  date: Date;
}

export class StreamWatching {
  private static viewers: { [key: string]: StreamViewers[] } = {};

  public static refreshViewer(id: string, ip: string) {
    const date = new Date();

    if (this.viewers[id].find((item) => item.ip === ip)) {
      this.viewers[id] = [
        { ip: ip, date },
        ...this.viewers[id].filter((item) => item.ip !== ip),
      ];
    } else {
      this.viewers[id].push({ ip, date });
    }
  }

  public static getViewCount(id: string) {
    const date = new Date();
    const viewers = this.viewers[id].filter(
      (item) => Math.abs(date.getTime() - item.date.getTime()) <= 1000 * 10
    );

    return viewers.length;
  }
}
