// Copyright 2021 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import * as yaml from 'js-yaml';
import {logger as defaultLogger, Logger} from '../../util/logger';
import {DefaultUpdater} from '../default';

/**
 * Updates a Helm chart.yaml file.
 */
export class ChartYaml extends DefaultUpdater {
  /**
   * Given initial file contents, return updated contents.
   * @param {string} content The initial content
   * @returns {string} The updated content
   */
  updateContent(content: string, logger: Logger = defaultLogger): string {
    const data = yaml.load(content, {json: true});
    if (data === null || data === undefined) {
      return '';
    }
    const parsed = JSON.parse(JSON.stringify(data));
    logger.info(`updating from ${parsed.version} to ${this.version}`);
    parsed.version = this.version.toString();
    return yaml.dump(parsed);
  }
}
