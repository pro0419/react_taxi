import session from 'express-session';
import bodyParser from 'body-parser';
import path from 'path';

export default function apiConfig(app) {
  // This is necessary to handle React-Router URL correctly since client uses Browser History
  app.get('*', function (request, response) {
    response.sendFile(path.resolve('./dist/index.html'))
  })

  app.use(bodyParser({ limit: '500mb' }));
  app.use(bodyParser.json({ type: 'application/json' }));
  app.use(session({ secret: '876345' }));

  var jsonParser = bodyParser.json({ limit: 1024 * 1024 * 20, type: 'application/json' });
  var urlencodedParser = bodyParser.urlencoded({ extended: true, limit: 1024 * 1024 * 20, type: 'application/x-www-form-urlencoding' })

  app.use(jsonParser);
  app.use(urlencodedParser);
  app.use(bodyParser.raw());
}
