import {IPipelineConfig} from "./lib/IConfigcicd";

export const PipelineConfig: IPipelineConfig = {
    sourceStage: {
        repositoryName: 'cdcdwebsite',
        branchName: 'main',
        owner: 'saulEnavarro',
        codestarArn: 'arn:aws:codestar-connections:us-east-2:767397949373:connection/4bc1f09c-20bd-4817-b48c-57416a45e9bd'
    },
    buildStage: {
        buildCommand: 'npm run build',
        s3Bucket: 'ds-webapp',
        s3BucketRegion: 'eu-central-1'
    }
}