import webpack from 'webpack';

import { BuildOptions } from './types/optionsConfig';
import { buildLoaders } from './buildLoaders';
import { buildResolvers } from './buildResolvers';
import { buildPlugins } from './buildPlugins';
import { buildDevServer } from './buildDevServer';

export function buildWebpackConfig(options: BuildOptions): webpack.Configuration {
  const { mode, paths, isDev } = options;

  return {
    entry: paths.entry,
    mode,
    output: {
      path: paths.dist,
      filename: '[name].[contenthash].js',
      clean: true,
      publicPath: '/',
    },
    module: {
      rules: buildLoaders(options),
    },
    resolve: buildResolvers(options),
    plugins: buildPlugins(options),
    devtool: 'inline-source-map',
    devServer: isDev ? buildDevServer(options) : undefined,
  };
}
