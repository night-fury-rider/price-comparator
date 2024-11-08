import React from 'react';
import {Appbar, BottomNavigation, useTheme} from 'react-native-paper';

import ErrorBoundary from '$clubhouse/components/ErrorBoundary';
import StorageService from '$clubhouse/services/StorageService';
import DashboardScreen from 'dashboard/DashboardScreen';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import SettingsScreen from '$settings/SettingsScreen';
import {BLUE_COLOR_THEME} from 'clubhouse/constants/colors.constants';
import {SETTINGS} from '$clubhouse/constants/strings.constants';

StorageService.init();

function App() {
  const theme = useTheme();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {
      key: 'dashboard',
      title: 'Dashboard',
      focusedIcon: 'currency-inr',
      unfocusedIcon: 'currency-inr',
    },
    {
      key: 'settings',
      title: 'Settings',
      focusedIcon: 'wrench',
      unfocusedIcon: 'wrench-outline',
    },
  ]);

  const renderAppBar = () => {
    // Only show Appbar for Settings Screen
    if (index === routes.length - 1) {
      return (
        <Appbar.Header>
          <Appbar.Content title={SETTINGS.title} />
        </Appbar.Header>
      );
    }
    return null; // Don't render Appbar for other screens
  };

  const renderScene = BottomNavigation.SceneMap({
    dashboard: DashboardScreen,
    settings: SettingsScreen,
  });

  return (
    <ErrorBoundary>
      <SafeAreaProvider>
        {renderAppBar()}
        <BottomNavigation
          navigationState={{index, routes}}
          onIndexChange={setIndex}
          renderScene={renderScene}
          barStyle={{
            backgroundColor: theme.dark
              ? theme.colors.inverseOnSurface
              : BLUE_COLOR_THEME.background4,
          }}
          activeIndicatorStyle={{
            backgroundColor: theme.dark
              ? theme.colors.surface
              : BLUE_COLOR_THEME.background3,
          }}
        />
      </SafeAreaProvider>
    </ErrorBoundary>
  );
}
export default App;
