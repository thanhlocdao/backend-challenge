import express, { NextFunction, Request, Response } from 'express';
import * as mongoose from 'mongoose';
import Route from './interfaces/route.interface';
import HttpException from './exceptions/httpException';
import helmet from 'helmet';

class App {
  public app: express.Application;
  public port: (string | number);
  public env: boolean;

  constructor(routes: Route[]) {
    this.app = express();
    this.port = process.env.PORT || 3000;
    this.env = process.env.NODE_ENV === 'production' ? true : false;

    this.connectToDatabase();
    this.initializeMiddlewares();
    // this.initSwaggerDocs();
    this.initializeRoutes(routes);   
    this.initializeErrorHandling();

   
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`App listening on the port ${this.port}`);
    });
  }

  public getServer() {
    return this.app;
  }

//   public initSwaggerDocs() {
//     swaggerIgnite(this.app);
//   }

  private initializeMiddlewares() {
    if (this.env) {
      this.app.use(hpp());
      this.app.use(helmet());
    //   this.app.use(logger('combined'));
    //   this.app.use(cors({ origin: 'your.domain.com', credentials: true }));
    } else {
    //   this.app.use(logger('dev'));
    //   this.app.use(cors({ origin: true, credentials: true }));
    }

    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  private initializeRoutes(routes: Route[]) {
    routes.forEach((route) => {
      this.app.use('/', route.router);
    });
  }

  private initializeErrorHandling() {
    this.app.use((error: HttpException, req: Request, res: Response, next: NextFunction) => {
        const status = error.status || 500;
        const message = error.message || 'Something went wrong';
        res.status(status).send({
            statusCode: status,
            message,
        });
    });
  }

  private connectToDatabase() {
    const { MONGO_URL } = process.env;
    if (!MONGO_URL) {
        throw new Error('MONGO_URL is not defined');
    }
    if (this.env) {
        // production database
    } else {
        mongoose.set('strictQuery', false);
        mongoose.connect(MONGO_URL, {
        }).then(() => {
            console.log('Connected to the database');
        })
        .catch((error: Error) => {
            console.log('Database connection failed');
            console.log(error);
        });
    }
  }
}

export default App;
function hpp(): any {
    throw new Error('Function not implemented.');
}

