import { Injectable } from '@nestjs/common';
import { SharedIniFileCredentials, SNS, Config } from 'aws-sdk';

@Injectable()
export class SnsProviderService {
  private myConfig = {
    apiVersion: process.env.SNS_API_VERSION,
    maxRetries: Number(process.env.SNS_MAX_RETIRES),
    httpOptions: {
      connectTimeout: Number(process.env.SNS_CONNECT_TIMEOUT),
      timeout: Number(process.env.SNS_TIMEOUT),
    },
    credentials: new SharedIniFileCredentials({
      filename: process.env.AWS_CREDENTIAL_LOC,
      profile: process.env.AWS_CREDENTIAL_SNS_PROFILE,
    }),
    region: process.env.AWS_REGION,
  };

  private instance: SNS = null;

  getInstance(): SNS {
    console.log(`CONFIG=${this.myConfig}`);
    if (!this.instance) {
      const fullConfig = new Config(this.myConfig);
      this.instance = new SNS(fullConfig);
    }
    return this.instance;
  }
}
