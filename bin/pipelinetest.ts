#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { PipelinetestStack } from '../lib/pipelinetest-stack';

const app = new cdk.App();
new PipelinetestStack(app, 'PipelinetestStack', {
  env: { account:"767397949373", region: "ca-central-1"}
});