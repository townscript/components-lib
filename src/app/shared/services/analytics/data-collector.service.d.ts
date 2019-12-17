import { UserService } from '../user-service';
export declare class DataCollectorService {
    private userService;
    constructor(userService: UserService);
    user: any;
    initKinesisDataCollector: (awsAccessKeyId: string, awsSecretAccessKey: string, awsRegion: string, awsKinesisStreamName: string, recordForKinesis: boolean) => void;
    sendPageViewDataToKinesis: () => void;
    sendClickDataToKinesis: (eventLabel: string, clickedLocation: string) => void;
}
export declare function initializeDataCollector(awsAccessKeyId: string, awsSecretAccessKey: string, awsRegion: string, awsKinesisStreamName: string, recordForKinesis: boolean, dataCollectorService: DataCollectorService): () => void;
