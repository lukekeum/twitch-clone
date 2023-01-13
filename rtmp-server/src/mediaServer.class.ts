import NodeMediaServer, { Config } from 'node-media-server';
import axios from 'axios';

export default class MediaServer {
  private readonly app: NodeMediaServer;

  constructor(config: Config) {
    this.app = new NodeMediaServer(config);

    this.app.on('donePublish', async (_, path) => {
      const streamKey = path.split('/')[2];
      const response = await axios.get('/v1/stream/user', {
        data: { stream_id: streamKey },
      });

      const user_id = response.data;
    });
  }

  run() {
    this.app.run();
  }
}
