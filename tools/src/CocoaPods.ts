import { spawnAsync, spawnJSONCommandAsync } from './Utils';

/**
 * JSON representation of the podspec.
 */
export type Podspec = {
  name: string;
  version: string;
  platforms: Record<string, string>;
  source_files: string | string[];
  exclude_files: string | string[];
  compiler_flags: string;
  frameworks: string | string[];
  pod_target_xcconfig: Record<string, string>;
  dependencies: Record<string, any>;
  info_plist: Record<string, string>;
};

/**
 * Reads the podspec and returns it in JSON format.
 */
export async function readPodspecAsync(podspecPath: string): Promise<Podspec> {
  return await spawnJSONCommandAsync('pod', ['ipc', 'spec', podspecPath]);
}

type PodInstallOptions = {
  /**
   * Whether to use `--no-repo-update` flag.
   */
  noRepoUpdate: boolean;
};

/**
 * Installs pods under given project path.
 */
export async function podInstallAsync(
  projectPath: string,
  options: PodInstallOptions = { noRepoUpdate: false }
): Promise<void> {
  const args = ['install'];

  if (options.noRepoUpdate) {
    args.push('--no-repo-update');
  }
  await spawnAsync('pod', args, {
    cwd: projectPath,
  });
}
