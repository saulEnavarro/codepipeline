/* import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class PipelinetestStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    // example resource
    // const queue = new sqs.Queue(this, 'PipelinetestQueue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });
  }
}
 */

import {Stack, StackProps} from 'aws-cdk-lib';
import {Construct} from 'constructs';
import {Pipeline} from "aws-cdk-lib/aws-codepipeline";
import {PipelineConfig} from "../configcicd";
import {SourceStage} from "./stages/src-stage";
import {BuildStage} from "./stages/build-stage";

export class PipelinetestStack extends Stack {
    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);
        const appName = this.node.tryGetContext('palacewebsite');
        const config = PipelineConfig;

        //CodePipeline object
        const codePipeline = new Pipeline(this, `${appName}-CodePipeline`, {
            crossAccountKeys: false
        });

        //Source stage
        const sourceStage = new SourceStage(this, appName, config);
        codePipeline.addStage({
            stageName: "Source-GitHub",
            actions: [sourceStage.getGithubSourceAction()]
        });

        //Build stage
        const buildStage = new BuildStage(this, appName, config);
        codePipeline.addStage({
            stageName: "Copy-to-S3",
            actions: [buildStage.getCodeBuildAction(sourceStage.getSourceOutput())]
        });
    }
}