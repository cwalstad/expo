import { requireNativeViewManager } from '@unimodules/core';
import nullthrows from 'nullthrows';
import React from 'react';
import { View } from 'react-native';

import { AdIconViewContext, AdIconViewContextValue } from './withNativeAd';

type Props = React.ComponentProps<typeof View>;

export default class AdIconView extends React.Component<Props> {
  render() {
    return (
      <AdIconViewContext.Consumer>
        {(contextValue: AdIconViewContextValue | null) => {
          const context = nullthrows(contextValue);
          return <NativeAdIconView {...this.props} ref={context.nativeRef} />;
        }}
      </AdIconViewContext.Consumer>
    );
  }
}

// The native AdIconView has the same props as regular View
export type NativeAdIconView = React.Component<Props>;
// eslint-disable-next-line @typescript-eslint/no-redeclare -- the type and variable share a name
export const NativeAdIconView = requireNativeViewManager('AdIconView');
