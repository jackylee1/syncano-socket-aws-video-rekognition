import { assert } from 'chai';
import { run } from 'syncano-test';
import 'dotenv/config';

import config from './utils/helpers';

describe('get-label-detection', () => {
  it('should return label detection results of video if input parameters are valid',
    (done) => {
      const { TEST_VIDEO_JOB_ID } = process.env;
      const args = { JobId: TEST_VIDEO_JOB_ID, MaxResults: 10 };
      run('get-label-detection', { args, config })
        .then((res) => {
          assert.propertyVal(res, 'code', 200);
          assert.property(res.data, 'JobStatus');
          assert.isArray(res.data.Labels);
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

  it('should return "ResourceNotFoundException" if JobId not found',
    (done) => {
      const invalidArgs = { JobId: 'wrong-job-id', MaxResults: 10 };
      run('get-label-detection', { args: invalidArgs, config })
        .then((res) => {
          assert.propertyVal(res, 'code', 400);
          assert.property(res.data, 'message');
          assert.propertyVal(res.data, 'message', 'Could not find JobId');
          assert.propertyVal(res.data, 'code', 'ResourceNotFoundException');
          done();
        })
        .catch((err) => {
          done(err);
        });
    });
});
